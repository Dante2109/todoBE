const express=require("express")
const cors=require("cors")
const jwt=require("jsonwebtoken")
const {connection}=require("./Configs/db")
const {userRouter}=require("./Routes/userRouter")
const {authenticate}=require("./Middleware/authenticate")
const { todorouter } = require("./Routes/todoRouter")
require("dotenv").config()

const app=express();
app.use(cors())
app.use(express.json());
app.use("/users",userRouter)
app.use(authenticate)
app.use("/notes",todorouter)

app.listen(process.env.PORT,async()=>{
    try {
        await connection
        console.log("DB has been connected")
    } catch (error) {
        console.log(error.message)
    }
    console.log("Server has been connected")
})