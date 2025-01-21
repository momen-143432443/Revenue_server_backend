const UserService = require('../services/user.service');


exports.register = async(req,res,next)=>{
    try{
    const {email,password,firstName,lastName} = req.body;
    const successRes = await UserService.registerUser(email,password,firstName,lastName);
    res.json({status:true,success:"user registered success"});
    }catch(e){
        throw e;
    }
};