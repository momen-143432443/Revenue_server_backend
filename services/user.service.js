const UserModel = require('../models/user.model');
const mongoose = require('mongoose');
const {Schema} = mongoose;
class UserService{

    static async registerUser(email,password,firstName,lastName){
        try{
        const createUser = new UserModel({email,password,firstName,lastName});
        //Will store in database revenue_database_users
        return await createUser.save();
        }catch(e){
            throw e;
        }
    }

    static async getUser(){
        try{
        const getUserData = await  UserModel.find();
        //Will fetch in database revenue_database_users
        return await getUserData;
        }catch(e){
            throw e;
        }
    }

};


module.exports = UserService;
