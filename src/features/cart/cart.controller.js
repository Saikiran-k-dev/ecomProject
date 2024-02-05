import CartModel from "./cart.model.js";

export default class CartController{
    addToCart(req,res){
        const userId = req.userId
        const productId = req.query.productId
        const quantity =  req.query.quantity

        const carting = CartModel.addToCart(userId,productId,quantity)
        res.status(200).send(carting)
    }
    getCart(req,res){
        const userId = req.userId
        const items = CartModel.getCart(userId)
        res.status(201).send(items)
    }
    deleteCart(req,res){
        const userId = req.userId
        const cartId = req.params.id 
        const error = CartModel.deleteCart(cartId,userId)
        if(error){
            return res.status(404).send(error)
        } else {
            res.status(200).send("item deleted")
        }
    }
}