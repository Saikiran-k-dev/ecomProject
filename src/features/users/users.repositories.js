import { getDb } from "../../config/mongodb.js"

export default class UserRepository{
    async signUp(newUser){
        try {
            const db = getDb()
            const collection = db.collection("users")
            await collection.insertOne(newUser)
            return newUser
        } catch (error) {
            console.log(error)
        }
        
    }
    async signIn(email,password){
        try {
            const db = getDb()
            const collection = db.collection("users")
            return await collection.findOne({email,password})
    
        } catch (error) {
            console.log(error)
        }
        
    }

    async findEmail(email){
        try {
            const db = getDb()
            const collection = db.collection("users")
            return await collection.findOne({email})
    
        } catch (error) {
            console.log(error)
        }
        
    }
}