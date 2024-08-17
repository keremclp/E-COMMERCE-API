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
    res.send("getAllOrders");
}
const getSingleOrder = async (req,res) =>{
    res.send("getSingleOrder");
}
const getCurrentUserOrder = async (req,res) =>{
    res.send("getCurrentUserOrder");
}
const updateOrder = async (req,res) =>{
    res.send("updateOrder");
};

module.exports = {
  createOrder,
  getAllOrders,
  getSingleOrder,
  getCurrentUserOrder,
  updateOrder
};