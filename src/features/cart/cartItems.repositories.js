import { getDb } from "../../config/mongodb.js"
import {  ObjectId } from "mongodb";
export default class CartRepositories{
    constructor(){
        this.collection = "cart"
    }
    async addToCart(cartItem){
        const db = getDb()
        const collection = db.collection(this.collection)
        await collection.updateOne({userId:cartItem.userId,productId:cartItem.productId},{$inc:{quantity:cartItem.quantity}},{upsert:true})
        return await collection.findOne({userId:cartItem.userId,productId:cartItem.productId})
        }
    
    async getCart(userId){
        const db = getDb()
        const collection = db.collection(this.collection)
        console.log(userId)
        return await collection.find({userId:userId}).toArray()
    }
    async deleteCart(userId,cartId){
        const db = getDb()
        const collection = db.collection(this.collection)
        await collection.deleteOne({userId:userId,_id:new ObjectId(cartId)})
    }
}