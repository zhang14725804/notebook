const express=require("express")
const mongoose=require("mongoose")
const DB_URL='mongodb://localhost:27017/imooc'
mongoose.connect(DB_URL)
mongoose.connection.on("connected",function(){
  console.log("connected!!")
})

//create remove update find
const User=mongoose.model('users',new mongoose.Schema({
  name:{required:true,type:String},
  age:{required:true,type:Number},
}))

User.create({
  name:"大锤",
  age:23
})

const app=express()

//直接用箭头函数不行？？
app.get("/",function(req,res){
  res.send("<h2>Hello World</h2>")
})
app.get("/data",function(req,res){
  res.json({name:'Leborn James',type:"hero"})
})

app.listen(9093,function(res){
  console.log('server is already loaded')
})