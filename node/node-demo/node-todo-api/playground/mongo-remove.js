const {mongoose} =require('../server/db/mongoose')
const {Todos} =require("../server/models/todo")
const {ObjectID}=require("mongodb")

const id="b4da97422598f318890793d"

Todos.findByIdAndRemove(id).then((doc)=>{
  console.log(doc)
})

Todos.findOneAndRemove({_id:id}).then((doc)=>{
  console.log(doc)
})