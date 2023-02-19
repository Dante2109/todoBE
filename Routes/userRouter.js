const express=require("express");
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const {UserModel}=require("../Model/userSchema")
const {authenticate}=require("../Middleware/authenticate")
const userRouter=express.Router();

userRouter.post("/register",(req,res)=>{
    let data=req.body;
    console.log("sjd")
    try {
        bcrypt.hash(data.pass, 5, async (err, hash)=>{
            if(err){
                res.send(err.message)
            }else{
                let user=new UserModel({...req.body,pass:hash});
                await user.save()
                res.send(user)
            }     // Store hash in your password DB.
        });
    } catch (error) {
        console.log("ERror")
        res.send(error.message)
    }
})

userRouter.post("/login",async(req,res)=>{
    let {email,pass}=req.body;
    try {
        let user=await UserModel.find({email})
        if(user.length){
            bcrypt.compare(pass, user[0].pass, function(err, result) {
                if(result){
                    let token = jwt.sign({ userId: user[0]._id }, 'shhhhh');
                    res.send({msg:"Sign in successful",token})
                }else{
                    res.send("Wrong password")
                }
            });
        }else{
            res.send("Wrong Credentials")
        }
    } catch (error) {
        res.send(error.message)
    }
})


module.exports={
    userRouter
}