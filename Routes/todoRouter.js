const express=require("express");
const todorouter=express.Router();
const {TodosModel}=require("../Model/todosrRouter")
todorouter.get("/",async(req,res)=>{
    let user=req.body.user;
    try {
        let data=await TodosModel.find({user})
        res.send(data)
    } catch (error) {
        res.send(error.msg)
    }
})

todorouter.post("/create",async(req,res)=>{
    let data=req.body;
    console.log(data)
    try {
        let todo=new TodosModel(data)
        await todo.save();
        res.send({msg:"Todo has been added",todo})
    } catch (error) {
        res.send(error.message)
    }
})

todorouter.patch("/update/:id",async(req,res)=>{
    let noteid=req.params.id;
    let userId=req.body.user;
    try {
        
        let data=await TodosModel.find({_id:noteid});
        if(data[0].user===userId){
            try {
                let data=await TodosModel.findByIdAndUpdate({_id:id},req.body);
                res.send(data)
            } catch (error) {
                res.send(error.message)
            }
        }else{
            res.send({msg:"You are not authorized to perform the following actions"})
        }
    } catch (error) {
        res.send(error.message)
    }
    })

todorouter.delete("/delete/:id",async(req,res)=>{
    let noteid=req.params.id;
    let userId=req.body.user;
    try {
        let data=await TodosModel.find({_id:noteid});
        console.log(data.user,userId)
        if(data[0].user===userId){
            try {
                let data=await TodosModel.findByIdAndDelete({_id:noteid});
                res.send({msg:"todo has been deleted"})
            } catch (error) {
                res.send(error.message)
            }
        }else{
            res.send({msg:"You are not authorized to perform the following actions"})
        }
    } catch (error) {
        res.send(error.message)
    }
    })

module.exports={
    todorouter
}