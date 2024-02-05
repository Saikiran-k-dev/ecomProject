import UserModel from "./users.model.js";
import jwt from "jsonwebtoken"
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
            const token = jwt.sign({userId:userFound.id,email:userFound.email},"kxPcfUdXVZ6vrSkanQk3xEEZbd6iXLmp",{
                expiresIn:"1h"
            })
            res.status(200).send(token)
        }
    }
}