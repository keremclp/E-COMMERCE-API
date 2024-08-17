const Order = require("../models/Order");
const Product = require("../models/Product");

const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const { checkPermissions } = require("../utils");

const fakeStripeAPI = async ({ amount, currency }) =>{
    const client_secret = "someRoandomValue"
    return { client_secret, amount, currency }
}

const createOrder = async (req,res) =>{
    const {items:cartItems, tax, shippingFee} = req.body;

    if(!cartItems || cartItems.length <1){
        throw new CustomError.BadRequestError("No items in cart");
    }

    if(!tax || !shippingFee){
        throw new CustomError.BadRequestError("Please provide tax and shipping fee");
    }

    let orderItems = []
    let subtotal = 0;
    
    for(const item of cartItems){
        const dbProduct = await Product.findOne({_id:item.product}); // check the orders.json
        if(!dbProduct){
            throw new CustomError.NotFoundError(`No product with ID: ${item.product}`);
        }
        const { name, price, image, _id } = dbProduct
        // console.log(name, price, image, _id);
        

        const singleOrder = {
            amount: item.amount,
            name,
            price,
            image,
            product:_id,
        };
        orderItems = [...orderItems, singleOrder] // add item to order 
        subtotal += price * item.amount; // calculate subtotal
    }
    // console.log(orderItems);
    // console.log(subtotal);
    const total =  tax + shippingFee + subtotal; // calculate total
    const paymentIntent = await fakeStripeAPI({
        amount: total,
        currency: "usd",
    })
    
    const order = await Order.create({
        orderItems,
        total,
        subtotal,
        tax,
        shippingFee,
        customer:req.user.userId,
        clientSecret:paymentIntent.client_secret,
        user: req.user.userId
        // customer:req.user.userId, // get the user id from the token
    });
    res.status(StatusCodes.CREATED).json({ order, clientSecret:order.clientSecret })
}
const getAllOrders = async (req,res) =>{
    const orders = await Order.find({});
    res.status(StatusCodes.OK).json({ orders, count: orders.length });
}
const getSingleOrder = async (req,res) =>{
    const { id: orderId } = req.params
    const order = await Order.findOne({ _id: orderId });
    if(!order){
        throw new CustomError.NotFoundError(`No order with ID: ${orderId}`)
    }
    checkPermissions(req.user, order.user);
    res.status(StatusCodes.OK).json({ order });
}
const getCurrentUserOrder = async (req,res) =>{
    const orders = await Order.find({ user: req.user.userId });
    res.status(StatusCodes.OK).json({ orders, count: orders.length });
}
const updateOrder = async (req,res) =>{
    const { id: orderId } = req.params;
    const { paymentIntendId } = req.body
    console.log();
    
    if(!paymentIntendId){
        throw new CustomError.BadRequestError('Please provide payment intent id')
    }
    const order = await Order.findOne({ _id: orderId });
    if (!order) {
      throw new CustomError.NotFoundError(`No order with ID: ${orderId}`);
    }

    checkPermissions(req.user, order.user);

    order.paymentIntentId = paymentIntendId;
    order.status = 'paid'
    await order.save();
    
    res.status(StatusCodes.OK).json({ order });
};

module.exports = {
  createOrder,
  getAllOrders,
  getSingleOrder,
  getCurrentUserOrder,
  updateOrder
};