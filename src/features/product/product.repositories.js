import { ObjectId } from "mongodb";
import { getDb } from "../../config/mongodb.js";

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
            let filterExpression = {}
        } catch (error) {
            console.log(error)
        }
    }
}