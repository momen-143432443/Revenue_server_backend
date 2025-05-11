const UserService = require('../services/user.service');
const { v4: uuidv4 } = require('uuid');
const UserModel = require('../models/user.model');
// Registeration
exports.register = async (req,res)=>{
    try{
    const {email,password,firstName,lastName} = req.body;
    const _id = uuidv4(); // To generate unique userId
      await UserService.registerUser(_id,email,password,firstName,lastName);
     res.setHeader('Content-Type', 'application/json');
    res.json({status:true,success:"user registered success"});
    }catch(e){
        throw e;
    }
}

// Fetch

exports.select = async (req,res)=>{
    try {
        const email  = req.params.email;
        const  toSelect =  await UserService.getUser(email);
        // res.json(user);
        res.status(200).json(toSelect);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}