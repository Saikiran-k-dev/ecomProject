import ProductModel from "./product.model.js";

export default class ProductController {
    getAllProducts(req, res) {
      const products  = ProductModel.getAll();
      res.status(200).send(products)
    }
  
    addProduct(req, res) {
      // Implementation for addProduct
      // console.log(req.body)
      const {name,price,sizes} = req.body
        const newProduct = {
          name,
          price:parseFloat(price),
          sizes:sizes.split(','),
          imageUrl:req.file.filename
        }
        const createdProduct = ProductModel.addNewProduct(newProduct)
        res.status(201).send(createdProduct)
    }
  
    rateProduct(req, res) {
      // Implementation for rateProduct
    }
  
    getOneProduct(req, res) {
      // Implementation for getOneProduct
    }
  
    filterProducts(req, res) {
      // Implementation for filterProducts
    }
  }
  