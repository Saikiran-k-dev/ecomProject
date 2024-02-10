import { getDb } from "../../config/mongodb.js"

export default class UserModel{
    constructor(name,email,password,type){

        this.name  = name
        this.email = email
        this.password = password
        this.type = type
    }


    static getAll(){
        return users
    }
}
let users = [
    new UserModel(
    1,"sellerName","seller@gmail.com","password","seller"
    ),
    new UserModel(
        2,"sellerName","seller@gmail.com","password","seller"
        )
]