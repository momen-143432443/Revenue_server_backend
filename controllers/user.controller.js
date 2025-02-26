const UserService = require('../services/user.service');

// Registeration
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

// Fetch

exports.select = async (req,res)=>{
    try {
        const  toSelect =  await UserService.getUser();
        res.json(toSelect);
    } catch (error) {
        throw error;
    }
}