import ProductModel from "./product.model.js";

export default class ProductController {
    getAllProducts(req, res) {
      const products  = ProductModel.getAll();
      res.status(200).send(products)
    }
  
    addProduct(req, res) {
      // Implementation for addProduct
      console.log(req.body)
      const {name,price,sizes} = req.body
        const newProduct = {
          name,
          price:parseFloat(price),
          sizes:sizes.split(','),
          // imageUrl:req.file.filename
        }
        const createdProduct = ProductModel.addNewProduct(newProduct)
        res.status(201).send(createdProduct)
    }
  
    rateProduct(req, res) {
      // Implementation for rateProduct
      console.log(req.query)
      const userId = req.query.userId
      const productId = req.query.productId
      const rating = req.query.rating
      
      const error = ProductModel.rateProduct(userId,productId,rating)
      if(error){
        return res.status(400).send(error)
      } else {
        res.status(200).send("rating is added")
      }
    }
  
    getOneProduct(req, res) {
      // Implementation for getOneProduct

      const id = req.params.id
      const product = ProductModel.get(id)
      if(!product){
        res.status(404).send("product not found")

      } else {
        return res.status(200).send(product)
      }
    }
  
    filterProducts(req, res) {
      // Implementation for filterProducts
      const minPrice = req.query.minPrice;
      const maxPrice = req.query.maxPrice;
      const category = req.query.category;
      // console.log(minPrice,maxPrice,category)
      const result = ProductModel.filter(minPrice,maxPrice,category)
      res.status(200).send(result)
    }
  }
  