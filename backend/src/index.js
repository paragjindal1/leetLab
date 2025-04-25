import express from "express"
import env from "dotenv"

import {db} from "./libs/db.js"

env.config()

const app = express();

const port = process.env.PORT


app.get("/",(req,res)=>{
    res.send("working");
})




app.listen(port,()=>{

    console.log(`server running on ${port}`);

})