import express from "express"
import env from "dotenv"

import authRouter from"./routes/auth.routes.js"
import problemRouter from "./routes/Problem.routes.js"
import executeRouter from "./routes/executeCode.routes.js"
import playlistRouter from "./routes/playlist.routes.js"

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
app.use("/api/v1/execute", executeRouter);
app.use("/api/v1/playlist", playlistRouter);




app.listen(port,()=>{

    console.log(`server running on ${port}`);

})