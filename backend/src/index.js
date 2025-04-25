import express from "express"
import env from "dotenv"

import authRouter from"./routes/auth.routes.js"

import {db} from "./libs/db.js"

env.config()

const app = express();

const port = process.env.PORT


app.get("/",(req,res)=>{
    res.send("working");
})

app.use("/api/v1/auth", authRouter);




app.listen(port,()=>{

    console.log(`server running on ${port}`);

})