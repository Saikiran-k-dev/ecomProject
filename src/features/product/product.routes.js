import express from "express";
import ProductController from "./product.controller.js";
import { upload } from "../../middleware/fileupload.middleware.js";

const productRouter = express.Router();
const productController = new ProductController();

productRouter.get('/filter',productController.filterProducts)

productRouter.get("/", (req,res)=>{
    productController.getAllProducts(req,res)
});
productRouter.post("/",  (req,res)=>{
    productController.addProduct(req,res)
});
productRouter.post("/rate", productController.rateProduct)
// productRouter.post("/", upload.single("imageUrl"), productController.addProduct);
productRouter.get("/:id", (req,res)=>{
    productController.getOneProduct(req,res)
}); 



export default productRouter;
