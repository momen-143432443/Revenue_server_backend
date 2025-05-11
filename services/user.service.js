const UserModel = require('../models/user.model');
const { v4: uuidv4 } = require('uuid');
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

};


module.exports = UserService;