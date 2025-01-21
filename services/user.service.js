const UserModel = require('../models/user.model');

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

};

module.exports = UserService;
