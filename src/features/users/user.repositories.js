import mongoose from "mongoose";
import { userSchema } from "./users.schema.js";

const UserModel = mongoose.model('user',userSchema)

export default class UserRepository{
    async signUp(user){
        try {
            const newUser = new UserModel(user)
            await newUser.save()
            return newUser
        } catch (error) {
            console.log(error)
        }
    }
    async findEmail(email){
        try {
           return await UserModel.findOne({email})
        } catch (error) {
            
        }

    }
}