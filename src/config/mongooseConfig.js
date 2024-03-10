import mongoose from "mongoose";
import dotenv from "dotenv"
import { categorySchema } from "../features/product/category.schema.js";

dotenv.config()

const url = process.env.DB_URL
export const connectUsingMongoose = async () =>{
    try {
        await mongoose.connect(url,{
            useNewUrlParser:true,
            useUnifiedTopology:true
        })
        console.log("MongoDb is connected using Mongoose")
        addCategories()
    } catch (error) {
        console.log(error)
    }
}

async function addCategories(){
    const CategoryModel = mongoose.model("category",categorySchema)
    const categories = await CategoryModel.find()
    // console.log(categories)
    if(!categories || categories.length==0){
       
        await CategoryModel.insertMany([{
            name:"books"},{name:"clothing"},{name:"food"}])
    }
}
