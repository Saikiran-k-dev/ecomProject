
import UserModel from "../users/users.model.js"

export default class ProductModel{
    constructor(name,desc,price,imageUrl,category,sizes){
        this.name = name
        this.desc = desc
        this.price = price
        this.imageUrl = imageUrl
        this.category = category
        this.sizes = sizes
    }
    static getAll(){
        return products
    }
    static addNewProduct(productData){
        productData.id = products.length+1
        products.push(productData)
        return products
    }

    static get(id){
      const product = products.find(p=>p.id==id)
      return product
    }
    static filter(minPrice, maxPrice, category){
      const result = products.filter((p)=>{
        return(
        (!minPrice || p.price>=minPrice) && (!maxPrice || p.price<=maxPrice )&& (!category || p.category==category))
      })
      return result
    }

    static rateProduct(userId,productId,rating){
        
        const isValidUser = UserModel.getAll().find(u=>u.id==userId)

        if(!isValidUser){
          throw new Error("user not found")
        }
        const isValidProduct = products.find(p=>p.id==productId)
        // console.log(isValidProduct)
        if(!isValidProduct){
          throw new Error("product not found")
        }
        if(!isValidProduct.rating){
          isValidProduct.rating = []
          isValidProduct.rating.push({userId:userId,rating:rating})
        } else {
          const existingUser =  isValidProduct.rating.findIndex(u=>u.userId==userId)
          if(existingUser>=0){
            isValidProduct.rating[existingUser] = {
              userId:userId,
              rating:rating
            } 
          } else {
            isValidProduct.rating.push({userId:userId,rating:rating})
          }
        }
        // console.log(isValidProduct.rating)
    }
}
var products = [
    new ProductModel(
      1,
      'Product 1',
      'Description for Product 1',
      19.99,
      'https://m.media-amazon.com/images/I/51-nXsSRfZL._SX328_BO1,204,203,200_.jpg',
      'category1',
    ),
    new ProductModel(
      2,
      'Product 2',
      'Description for Product 2',
      29.99,
      'https://m.media-amazon.com/images/I/51xwGSNX-EL._SX356_BO1,204,203,200_.jpg',
      'category2',
      ['M','XL']
    ),
    new ProductModel(
      3,
      'Product 3',
      'Description for Product 3',
      39.99,
      'https://m.media-amazon.com/images/I/31PBdo581fL._SX317_BO1,204,203,200_.jpg',
      'category3',
      ['M','XL','S']
    ),
  ]