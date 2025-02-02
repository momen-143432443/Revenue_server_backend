const UserService = require('../services/user.service');


exports.register = (req,res)=>{
    try{
    const {email,password,firstName,lastName} = req.body;
      UserService.registerUser(email,password,firstName,lastName);
     res.setHeader('Content-Type', 'application/json');
    res.json({status:true,success:"user registered success"});
    }catch(e){
        throw e;
    }
}