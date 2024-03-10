// Importing the express framework
import express from "express";
import swagger from "swagger-ui-express"
import cors from "cors"
import dotenv from "dotenv"
dotenv.config()
import productRouter from "./src/features/product/product.routes.js";
import userRouter from "./src/features/users/users.routes.js";
import cartRouter from "./src/features/cart/cart.router.js";
import bodyParser from "body-parser";
// import basicAuthorizer from "./src/middleware/basicAuth.middleware.js";
import jwtAuth from "./src/middleware/jwt.middleware.js";
import apiDocs from "./swagger.json" assert {type:'json'}
import { loggerMiddleware } from "./src/middleware/log.middleware.js";
import logger from "./src/middleware/log.middleware.js";
import { connectToMongoDb } from "./src/config/mongodb.js";
import orderRouter from "./src/features/order/order.routes.js";
import { connectUsingMongoose } from "./src/config/mongooseConfig.js";
import likeRouter from "./src/features/likes/like.router.js";


// import {loggerMiddleware,logger} from "./src/middleware/log.middleware.js";

// Using express

const app = express();

app.use(cors())
// app.use((req,res,next)=>{
//   res.header('Access-Control-Allow-Origin','*')
//   res.header('Access-Control-Allow-Headers','*')
//   if(req.method=="OPTIONS"){
//     return res.sendStatus(200)
//   }
//   next()
// })
// app.use(express.json())
app.use(bodyParser.json())

app.use(loggerMiddleware)

app.use("/api_docs",swagger.serve,swagger.setup(apiDocs))

// Using the productRouter as middleware for the "/api/products" route
app.use("/api/products",jwtAuth, productRouter);
app.use("/api/users",userRouter)
app.use("/api/cart",jwtAuth,cartRouter)
app.use("api/order",jwtAuth,orderRouter)
app.use("/api/likes",jwtAuth,likeRouter)

app.use((err,req,res,next)=>{
  logger.error(err.message)
  console.log(err)
  res.status(503).send("Something went wrong")
})
// Using express
app.use((req,res)=>{
  res.status(401).send("api not found")
})
// Using the productRouter as middleware for the "/api/products" route

// Server listening
app.listen(3000, () => {
  console.log("Server is listening at port 3000");
  // connectToMongoDb()
  connectUsingMongoose()
});