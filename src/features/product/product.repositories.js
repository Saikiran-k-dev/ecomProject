import {  ObjectId } from "mongodb";
import { getDb } from "../../config/mongodb.js";
import mongoose from "mongoose";
import { productSchema } from "./product.schema.js";
import { reviewSchema } from "./reviews.schema.js";

const ProductModel = new mongoose.model("product",productSchema)
const ReviewModel = new mongoose.model("review",reviewSchema)

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
            const isValidProduct = await ProductModel.findById(productId)
            if (!isValidProduct){
                throw new Error("product Not Found")
            }
            const userReview = await ReviewModel.findOne({product: new ObjectId(productId),user: new ObjectId(userId)})
            if (userReview){
                userReview.rating=rating
                userReview.save()
            } else {
                const newReview = new ReviewModel(
                    {
                        product: new ObjectId(productId),
                        user: new ObjectId(userId),
                        rating
                    }
                    
                )
                newReview.save()
            }
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