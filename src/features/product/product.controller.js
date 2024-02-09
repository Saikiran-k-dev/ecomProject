import ProductModel from "./product.model.js";
import ProductRepository from "./product.repositories.js";

export default class ProductController {

    constructor(){
      this.productRepository = new ProductRepository()
    }
    async getAllProducts(req, res) {
      const products  = await this.productRepository.getAll()
      res.status(200).send(products)
    }
  
    async addProduct(req, res) {
      // Implementation for addProduct
      console.log(req.body)
      const {name,price,sizes} = req.body
        // const newProduct = {
        //   name,
        //   price:parseFloat(price),
        //   sizes:sizes.split(','),
        //   // imageUrl:req.file.filename
        // }
        const createdProduct = new ProductModel(name,price,sizes)
        await this.productRepository.add(createdProduct)
        res.status(201).send(createdProduct)
    }
  
    rateProduct(req, res) {
      // Implementation for rateProduct
      // console.log(req.query)
      const userId = req.query.userId
      const productId = req.query.productId
      const rating = req.query.rating
      
      try{
        ProductModel.rateProduct(userId,productId,rating)
        res.status(200).send("rating is added")
      } catch (err) {
        return res.status(400).send(err.message)
      }
      
    }
  
    async getOneProduct(req, res) {
      // Implementation for getOneProduct

      const id = req.params.id
      const product = await this.productRepository.get(id)
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
  