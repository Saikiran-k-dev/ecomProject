import express from "express";
import ProductController from "./product.controller.js";
import { upload } from "../../middleware/fileupload.middleware.js";

const productRouter = express.Router();
const productController = new ProductController();

productRouter.get('/filter',productController.filterProducts)

productRouter.get("/", productController.getAllProducts);
productRouter.post("/",  productController.addProduct);
productRouter.post("/rate", productController.rateProduct)
// productRouter.post("/", upload.single("imageUrl"), productController.addProduct);
productRouter.get("/:id", productController.getOneProduct); 



export default productRouter;
