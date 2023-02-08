import express from "express";
import { loginController } from "../controller/loginController";
import { registerController } from "../controller/register.controller";
import { loginValidate } from "../validate/login.validate";
import { registerValidate } from "../validate/register.validate";
const Router = express.Router();

Router.post("/login", loginValidate, loginController);
Router.post('/register', registerValidate ,registerController)

export default Router;
