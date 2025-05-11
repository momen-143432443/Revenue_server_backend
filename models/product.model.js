const mongoose = require('mongoose');
const db = require("../config/db");

const {Schema}= mongoose;


const productInfo = new Schema({
    _id: { type: String, required: true },
    itemId:String,
    itemName:String,
    itemModel:String,
    itemPrice:String,
    itemImageAddress:String,
    itemColor:{
        type:String,
        required: true
    },
    itemSize:{
        type:String,
        required: true
    },
    itemCount:String,
    itemDeliverCompany:String,
    userId:{
        type:String,
        required:true
    },
    userEmail:{
        type:String,
        required:true
    },
});

const cartSchema = new Schema({
    _id:String,
    email:String,
    items :[productInfo],
    createdAt : {
        type:Date,
        default:Date.now
    }
});

const ProductModel= db.model('revenue_database_product',cartSchema);

module.exports = ProductModel;