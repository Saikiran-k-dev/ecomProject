import CartModel from "./cart.model.js";
import CartRepositories from "./cartItems.repositories.js";

export default class CartController{
    constructor(){
        this.cartRepository = new CartRepositories()
    }
    async addToCart(req,res){
        const userId = req.userId
        const productId = req.body.productId
        const quantity =  req.body.quantity

        const carting = new CartModel(userId,productId,quantity)
        const added = await this.cartRepository.addToCart(carting)
        res.status(200).send(added)
    }
    async getCart(req,res){
        const userId = req.userId
        const items = await this.cartRepository.getCart(userId)
        res.status(201).send(items)
    }
    async deleteCart(req,res){
        const userId = req.userId
        const cartId = req.params.id 
        const error = await this.cartRepository.deleteCart(userId,cartId)
        if(error){
            return res.status(404).send(error)
        } else {
            res.status(200).send("item deleted")
        }
    }
}