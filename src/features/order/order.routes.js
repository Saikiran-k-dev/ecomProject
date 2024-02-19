import express from "express"
import OrderController from "./order.controller.js"

const orderRouter = express.Router()
const orderController = new  OrderController()

export default orderRouter