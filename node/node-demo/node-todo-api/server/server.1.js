var mongoose = require('mongoose')

mongoose.Promise=global.Promise
mongoose.connect('mongodb://localhost:27017/TodoApp')

var User=mongoose.model('stars',{
  name:{
    type:String,
    required:true,
    minlength:1,
    trim:true
  },
  age:{
    type:Number,
    default:28
  },
  location:{
    type:String
  }
})

//number boolean都会被转化为字符砖
var newUser=new User({
  //name:'Jordan',
  //name:23,
  name:true,
  location:'Shiago'
})

newUser.save().then((doc)=>{
  console.log("saved User")
  console.log(doc)
},(err)=>{
  console.log('Unable to save')
  console.log(err)
})

// var anotherUser=new User({
//   name:'LOVE'
// })

// anotherUser.save().then((doc)=>{
//   console.log("saved User")
//   console.log(doc)
// },(err)=>{
//   console.log('Unable to save')
//   console.log(err)
// })