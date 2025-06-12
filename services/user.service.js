const UserModel = require('../models/user.model');
const nodeMailer = require('nodemailer');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const tempStore  = {};
const transporter = nodeMailer.createTransport({
    service:'gmail',
    auth:{
        user:process.env.GMAIL_USER,
        pass:process.env.GMAIL_PASS,
    },
});

class UserService{
    static async registerUser(_id,email,password,firstName,lastName){
        try{
            // const userId = uuidv4();
        const createUser = new UserModel({_id,email,password,firstName,lastName});
        //Will store in database revenue_database_users
         await createUser.save();
        //  console.log("User created with _id:", new User._id)
        }catch(e){
            throw e;
        }
    }

    static async getUser(email){
        try{
        const getUserData = await  UserModel.findOne({email});
        if (!getUserData) throw new Error("User not found");
        //Will fetch in database revenue_database_users
        return  getUserData;
        }catch(e){
            throw e;
        }
    }

    static async sendOTP(email){
        try {
            const otp =  crypto.randomInt(100000,999999).toString();
            const expires  = Date.now()+5*50*1000;
            tempStore[email]={otp,expires};
            await transporter.sendMail({
                to:email,
                subject:"Hi, Revenue Support Here, Here's Your OTP",
                text:`By This OTP ${otp}, You Can Reset Your Password`
            });
            console.log('Send Otp To'+email);
        } catch (error) {
            throw error;
        }
    }

    static async verifyOTP( email,otp){
        try {
            const record = tempStore[email];
            if(!record || record.otp !== otp||Date.now()>record.expires){
                      throw new Error('Invalid or expired OTP');
            }
        } catch (error) {
            throw error;
        }
    }

    static async resetPassword(email, newPassword){
        try {
            const hashPassword = await bcrypt.hash(newPassword,10);
            await UserModel.findOneAndUpdate({email},{password:hashPassword});
                // delete tempStore[email]; // Clean up after use
        } catch (error) {
                        throw error;
        }
    }
};


module.exports = UserService;