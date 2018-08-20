const {mongoose} =require('../server/db/mongoose')
const {Todos} =require("../server/models/todo")
const {ObjectID}=require("mongodb")

const id="b4da97422598f318890793d"
//验证id是否有效
if(!ObjectID.isValid(id)){
  console.log('ID not valid')
}
// //返回一个数组
// Todos.find({
//   _id:id
// }).then((todos)=>{
//   if(!todos){
//     return console.log("find id not found")
//   }
//   console.log("todos:",todos)
// })

// //返回一个对象
// Todos.findOne({
//   _id:id
// }).then((todo)=>{
//   if(!todo){
//     return console.log("findOne id not found")
//   }
//   console.log("todo:",todo)
// })

Todos.findById(id).then((todo)=>{
  if(!todo){
    return console.log("findById id not found")
  }
  console.log("todo:",todo)
}).catch((e)=>{
  console.log(e)
})