const UserService = require('../services/user.service');
const { v4: uuidv4 } = require('uuid');
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

// Send OTP
exports.sendOTPToEmail = async(req,res)=>{
        try {
            const {email}= req.body;
        const toSend =await UserService.sendOTP(email);
        res.status(200).json({toSend});
        
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: error.message });
        }
    }

    // verify OTP
exports.verifyOTP = async(req,res)=>{
    try {
        const{email,otp}=req.body;
       const result = await UserService.verifyOTP(email,otp);
               res.status(200).json({result});
    } catch (error) {
        console.log(error);
            res.status(500).json({ error: error.message });
    }
}

// Reset Pass word
exports.resetPasswordOfEmail = async(req,res)=>{
    try {
        const {email,newPassword }= req.body;
        if (!email ||!newPassword) {
                  return res.status(400).json({ error: 'Email and new password are required.' });
        }
        const result  = await UserService.resetPassword(email,newPassword);
                       res.status(200).json({result});
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
}