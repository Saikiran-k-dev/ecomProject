import bcrypt from "bcrypt"

import UserModel from "./users.model.js";
import jwt from "jsonwebtoken"
import UserRepository from "./user.repositories.js";
export default class UserController{
    constructor(){
        this.userRepository = new UserRepository()
    }

    async signUp(req,res){
        console.log(req.body)
        const {name,email,password,type}=req.body
        const hashedPass = await bcrypt.hash(password,12)
        const newUser =  new UserModel(name,email,hashedPass,type)
        await this.userRepository.signUp(newUser)
        res.status(201).send(newUser)
    }
    async signIn(req,res){
        const {email,password} = req.body
        const userFound = await this.userRepository.findEmail(email)
        console.log(userFound)
        if(!userFound){
            return res.status(400).send("user not found")
        } else {
            const result = await bcrypt.compare(password,userFound.password)
            if(result){
                const token = jwt.sign({userId:userFound._id,email:userFound.email},process.env.JWT_SECRET,{
                    expiresIn:"1h"
                })
                 res.status(200).send(token)
            } else {
                return res.status(400).send("user not found")
            }
        } 
        
        
    }
}