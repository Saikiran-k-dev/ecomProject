import mongoose from "mongoose";
import { ObjectId } from "mongodb";
import { likeSchema } from "./like.schema.js";

const LikeModel = mongoose.model('like',likeSchema)
export default class LikeRepositories{
    async likeProduct(userId,productId){
        try {
           const newLike = new LikeModel({
            user:new ObjectId(userId),
            likeable:new ObjectId(productId),
            on_model:'Product'
            
           }) 
           await newLike.save()
        } catch (error) {
            console.log(error)
        }
    }
    async likeCategory(userId,categoryId){
        try {
           const newLike = new LikeModel({
            user:new ObjectId(userId),
            likeable:new ObjectId(categoryId),
            on_model:'Category'
            
           }) 
           await newLike.save()
        } catch (error) {
            console.log(error)
        }
    }
}