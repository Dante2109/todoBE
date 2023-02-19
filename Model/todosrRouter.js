const mongoose=require("mongoose");
const todosSchema=mongoose.Schema({
    title:{type:String},
    body:{type:String},
    user:{type:String}
},{
    versionKey:false
})

const TodosModel=mongoose.model("todo",todosSchema)

module.exports={
    TodosModel
}