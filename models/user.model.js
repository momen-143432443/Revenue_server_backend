const mongoose = require('mongoose');
const db = require('../config/db');


//Making a schema 
const { Schema } = mongoose;

//Create a user schema
const userSchema = new Schema({
    email:{
      type:String,
      lowercase:true,
      required : true,
      unique:true
    },
    password:{
        type:String,
      required : true,
    },
    firstName:{
        type:String,
        required : true,
    },
    lastName:{
        type:String,
        required : true,
    }
});


//Create a database with the Schema
const UserModel = db.model('revenue_database_user',userSchema);


module.exports = UserModel;