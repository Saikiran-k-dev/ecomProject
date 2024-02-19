import {  ObjectId } from "mongodb";
import { getDb } from "../../config/mongodb.js";
import e from "express";

export default class ProductRepository{
     
    constructor(){
        this.collection="Product"
    }

    async add(newProduct){
        const db = getDb()
        const collection = db.collection(this.collection)
        await collection.insertOne(newProduct)
        return newProduct

    }
    async getAll(){
        const db = getDb()
        const collection = db.collection(this.collection)
        return await collection.find().toArray()
        

    }

    async get(id){
        const db = getDb()
        const collection = db.collection(this.collection)
        return await collection.findOne({_id: new ObjectId(id)})
    }

    async filter(minPrice,maxPrice,category){
        try {
            const db = getDb()
            const collection = db.collection(this.collection)
            let filterExpression = {};
            if(minPrice){
                filterExpression.price = {$gte: parseFloat(minPrice)}
            }
            if(maxPrice){
                filterExpression.price = {...filterExpression.price,$lte: parseFloat(maxPrice)}
            }
            if(category){
                filterExpression.price = category
            }
            return await collection.find((filterExpression).toArray)
        } catch (error) {
            console.log(error)
        }
    }

    async rateProduct(userId,productId,rating){
        try {
            const db  = getDb()
            const collection = db.collection(this.collection)
            console.log(productId,userId,rating)
            await collection.updateOne({ _id:new ObjectId(productId)},{
                $pull:{ratings:{userId:new ObjectId(userId)}}
            })
            await collection.updateOne({
                _id:new ObjectId(productId)
            },{
                $push:{ratings:{userId:new ObjectId(userId),rating}}
            }
            )
        }
         catch (error) {
            throw new Error(error)
            
        }
    }
    async averagePriceOfProduct(){
        const db = getDb()
        return await db.collection(this.collection).aggregate([
            {
                $group:{
                    _id:"$category",
                    averagePrice:{$avg:"$price"}
                }
            }
        ]).toArray
    }
}