import express from "express"
import env from "dotenv"

import authRouter from"./routes/auth.routes.js"
import problemRouter from "./routes/Problem.routes.js"

import cookieParser from "cookie-parser"


env.config()

const app = express();

app.use(express.json())
app.use(cookieParser())

const port = process.env.PORT


app.get("/",(req,res)=>{
    res.send("working");
})

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/problem", problemRouter);




app.listen(port,()=>{

    console.log(`server running on ${port}`);

})