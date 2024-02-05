// Importing the express framework
import express from "express";
import productRouter from "./src/features/product/product.routes.js";
import userRouter from "./src/features/users/users.routes.js";
import cartRouter from "./src/features/cart/cart.router.js";
import bodyParser from "body-parser";
import basicAuthorizer from "./src/middleware/basicAuth.middleware.js";
import jwtAuth from "./src/middleware/jwt.middleware.js";
// Using express

const app = express();
// app.use(express.json())
app.use(bodyParser.json())

// Using the productRouter as middleware for the "/api/products" route
app.use("/api/products",jwtAuth, productRouter);
app.use("/api/users",userRouter)
app.use("/api/cart",jwtAuth,cartRouter)

// Using express

// Using the productRouter as middleware for the "/api/products" route

// Server listening
app.listen(3000, () => {
  console.log("Server is listening at port 3000");
});