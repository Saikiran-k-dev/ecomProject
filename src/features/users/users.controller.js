import UserModel from "./users.model.js";

export default class UserController{
    signUp(req,res){
        console.log(req.body)
        const {name,email,password,type}=req.body
        const newUser = UserModel.signUp(name,email,password,type)
        res.status(201).send(newUser)
    }
    signIn(req,res){
        const {email,password} = req.body
        const userFound = UserModel.signIn(email,password)
        if(!userFound){
            return res.status(400).send("user not found")
        } else {
            res.status(200).send(userFound)
        }
    }
}