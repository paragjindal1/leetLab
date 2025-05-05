import express from "express"
import { register,login,logout,me } from "../controllers/auth.controlller.js";
import { isLogin } from "../middleware/Auth.middleware.js";

const Router = express.Router();






Router.post("/register",register)


Router.post("/login",login)



Router.get("/logout",isLogin,logout)



Router.get("/me",isLogin,me)





export default Router