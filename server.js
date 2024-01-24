// Importing the express framework
import express from "express";
import productRouter from "./src/features/product/product.routes.js";
import bodyParser from "body-parser";
// Using express

const app = express();

app.use(bodyParser.json())
// Using the productRouter as middleware for the "/api/products" route
app.use("/api/products", productRouter);

// Using express

// Using the productRouter as middleware for the "/api/products" route

// Server listening
app.listen(3000, () => {
  console.log("Server is listening at port 3000");
});