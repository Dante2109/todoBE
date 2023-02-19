const mongoose=require("mongoose")
require("dotenv").config()
const connection=mongoose.connect(process.env.Mongodburl)
module.exports={
    connection
}