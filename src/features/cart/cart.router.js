import express from "express"
import CartController from "./cart.controller.js";

const cartRouter = express.Router()

const cartController = new CartController

cartRouter.post("/",(req,res)=>{
cartController.addToCart(req,res)})
cartRouter.get("/",(req,res)=>{
    cartController.getCart(req,res)
})
cartRouter.delete("/:id",(req,res)=>{
    cartController.deleteCart(req,res)
})
export default cartRouter