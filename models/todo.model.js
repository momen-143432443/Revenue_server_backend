const db = require('../config/db');
const mongoose = require('mongoose');
const {Schema} = mongoose;

const todoSchema = new Schema({
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
});

const Todo= db.model('To_do', todoSchema);

module.exports = Todo;