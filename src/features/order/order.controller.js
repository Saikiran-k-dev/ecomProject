import OrderRepositories from "./order.repositories.js";

export default class OrderController{
    constructor(){
        this.orderRepositories = new OrderRepositories()
    }

    async createOrder(req,res,next){
        try {
            userId = req.userId
            await this.orderRepositories.createOrder(userId)
            res.status(201).send("order is created")
        } catch (error) {
            return res.status(200).send("something went wrong")

        }
    }
}