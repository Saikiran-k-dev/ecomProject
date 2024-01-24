import express from "express";
import ProductController from "./product.controller.js";

const router = express.Router();
const productController = new ProductController();

router.get("/", productController.getAllProducts);

export default router;
