import express from "express";
import UserController from "./users.controller.js";

const userRouter = express.Router();
const userController = new UserController();


userRouter.post("/signUp", userController.signUp);
userRouter.post("/signIn", userController.signIn);

export default userRouter;