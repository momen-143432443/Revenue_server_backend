const ProductModel = require('../models/product.model');
const mongoose = require('mongoose');
const {Schema} = mongoose;



exports.insertProductInfo = async (userId, userEmail,items)=>{

    const itemsWithUserId = items.map(item=>({
        ...item,
        _id:userId,
        userEmail:userEmail
        
    }));
    
    console.log("Incoming items:", items);
     await ProductModel.findByIdAndUpdate(userId,{
        email: userEmail,items:itemsWithUserId,createdAt: new Date()},{ upsert: true, new: true });
    
}

 exports.getOrderStatus = async(userId)=>{
    try {
        const getOrderStatusByUserId= await ProductModel.findById(userId);
        if (!getOrderStatusByUserId || !getOrderStatusByUserId.items || getOrderStatusByUserId.items.length === 0) {
            return null; // No order
        }
        if (!getOrderStatusByUserId) throw new Error("Order not found");
        return getOrderStatusByUserId;
    } catch (error) {
        throw error;
    }
}