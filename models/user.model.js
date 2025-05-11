const mongoose = require('mongoose');
const db = require('../config/db');
const bcrypt = require('bcrypt');


//Making a schema 
const { Schema } = mongoose;

//Create a user schema
const userSchema = new Schema({
  _id:{
     type:String,
     required: true,
    //  unique: true,
    },
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


/// Decrypt The  Password Automatically

userSchema.pre('save',async function (params) {
  try{
    // Going to just refer the schema 
    var user = this;
    // Initialize encrypt passowrd
    const salt = await(bcrypt.genSalt(10));
    // Pass the user that entered the password  
    const hashPassword = await bcrypt.hash(user.password, salt);
    user.password = hashPassword;
  }catch (e){
    throw e;
  }
});

//Create a database with the Schema
const UserModel = db.model('revenue_database_user',userSchema);


module.exports = UserModel;