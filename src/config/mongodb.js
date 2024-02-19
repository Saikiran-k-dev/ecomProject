import { MongoClient } from "mongodb";
import dotenv from "dotenv"

dotenv.config()

let client

export const connectToMongoDb = () =>{
    MongoClient.connect(process.env.DB_URL)
    .then(clientInstance=>{
        client = clientInstance
        console.log("mongodb is connected")
    }).catch(err=>{
        console.log(err)
    })
}

export const getClient =()=>{
    return client
}

export const getDb = () =>{
    return client.db()
}