import express from "express"
import LikeController from "./like.controller.js"

const likeRouter = express.Router()

const likeController = new LikeController()

likeRouter.post('/like',(req,res)=>
likeController.likeItem(req,res))

export default likeRouter