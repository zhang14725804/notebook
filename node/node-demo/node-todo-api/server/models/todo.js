var mongoose=require("mongoose")

var Todos=mongoose.model('todos',{
  text:{
    type:String,
    required:true,
    minlength:1,
    trim:true
  },
  completed:{
    type:Boolean,
    default:false
  },
  completedAt:{
    type:String,
    default:new Date()
  },
  /*making todo Routes Private*/
  _creator:{
    type:mongoose.Schema.Types.ObjectId,
    required:true
  }
})

module.exports={Todos}