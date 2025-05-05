import { db } from "../libs/db.js";
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";


export const isLogin = asyncHandler((req,res,next)=>{
    const {token} = req.cookies;
    console.log(token);
    if (!token){
        return res.status(404).json(new ApiError(404,"pls login again"))
    }

    const user = jwt.verify(token,process.env.JWT_SECRET);

    req.user = user;

    next();
})

export const isAdmin = asyncHandler(async(req,res,next)=>{
    const user = await db.user.findUnique({
        where:{
            id:req.user.id,

        }
    })

    if(user.role !== "ADMIN"){
        res.status(400).json(new ApiError(400,"admin can access this only"))
    }

    next();
})