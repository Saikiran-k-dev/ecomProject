// Importing the express framework
import express from "express";
import router from "./src/product/product.routes.js";

// Using express
const app = express();

// Using the productRouter as middleware for the "/api/products" route
app.use("/api/products", router);

// Server listening
app.listen(3000, () => {
  console.log("Server is listening at port 3000");
});
