import { asyncHandler } from "../utils/asyncHandler.js";
import { db } from "../libs/db.js";
import {ApiError} from "../utils/apiError.js"
import bcrypt from "bcrypt"
import {ApiResponse} from "../utils/apiResponse.js";
import jwt from "jsonwebtoken"
import cookieParser from "cookie-parser";


export const login = asyncHandler(async (req, res) => {

    const { email, password } = req.body;   
    
    if(!email || !password){
        return res.status(400).json(new ApiError(400,"all feild is required"))
    }

    const user = await db.User.findUnique({
        where: {
            email: email,
        },
        
    });

    if(!user){
        return res.status(400).json(new ApiError(400,"User not found"))
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch){
        return res.status(400).json(new ApiError(400,"Invalid credentials"))
    }


    const payload = {
        id: user.id
    }

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "1d"
    })

    res.cookie("token", token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000
    })

    return res.status(200).json(new ApiResponse(200,user.email,"User logged in"))




    
});

export const register = asyncHandler(async (req, res) => {

    const {name,email, password} = req.body;

    if (!email || !password) {
        return res.status(400).json(new ApiError(400,"all feild is required"))
        

    }

    const existingUser = await db.User.findUnique({
        where: {
            email,
        },
    });

    if(existingUser){
        return res.status(400).json(new ApiError(400,"User already exist"))
        

    }

    console.log(existingUser)

    const hashedPassword = await bcrypt.hash(password, 10);


    const user = await db.User.create({
        data:{
            name,
            email,
            password: hashedPassword

        }
    })

    console.log(user)

    if(user){
        return res.status(201).json(new ApiResponse(201,user.email,"User created"))
        

    }

    return res.status(400).json(new ApiError(400,"User not created"))

    return res.status(201).json(new ApiResponse(201,user.email,"User created"))



    

});

export const logout = asyncHandler(async (req, res) => {

    const user = await db.User.findUnique({
        where:{
            id:req.user.id,
        },
        omit : {
            password : true,
        }



    })

    console.log(user);

    res.clearCookie("token");

    res.status(200).json(new ApiResponse(200,user,"logout succesfully"))
});

export const me = asyncHandler(async (req, res) => {

    const user = await db.User.findUnique({
        where:{
            id:req.user.id
        },
        omit:{
            password:true
        }

    })

    if(!user){
        return res.status(404).josn(new ApiError(404,"user not found"))
    }

    res.status(200).json(new ApiResponse(200,{
        user
    },"user details"));
});
