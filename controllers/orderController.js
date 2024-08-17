const Order = require("../models/Order");
const Product = require("../models/Product");

const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const { checkPermissions } = require("../utils");

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
    res.send('createOrder')
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