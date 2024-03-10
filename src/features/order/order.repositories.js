import { getClient, getDb } from "../../config/mongodb.js"
import OrderModel from "./order.model.js"
import {  ObjectId } from "mongodb";

export default class OrderRepositories{
    constructor(){
        this.collection = "orders"
    }

    async createOrder(userId){
        const client = getClient()
        const session = client.startSession()
        try {
            
            const db = getDb()
            session.startTransaction()
            const items = await this.getTotalAmount(userId,session)
            const finalAmount = items.reduce((acc,item)=>acc+item.totalAmount,0)
            const newOrder = new OrderModel(new ObjectId(userId),finalAmount,new Date())
            await db.collection(this.collection).insertOne(newOrder,{session})
            for(let item in items){
                await db.collection("product").updateOne({_id:item.productId},{$inc:{stock:-item.quantity}},{session})
            }
            await db.collection("cart").deleteMany({userId:userId},{session})
            session.commitTransaction()
            session.endSession()
        }   catch (error) {
                await session.abortTransaction()
                session.endSession()
        }
    }
    async getTotalAmount(userId,session){
        const db = getDb()
        const items = await db.collection("cart").aggregate([{
            $match:{userId:userId}
        },
    {
        $lookup:{
            from:"products",
            localField:"productId",
            foreighField:"_id",
            as:"productInfo"
        }
    },{
        $unwind:"$productInfo"
    },
{
    $addFields:{"totalAmount":{$multiply:["$productInfo.price",quantity]}}
},{session}
]).toArray()
return items
    }
}