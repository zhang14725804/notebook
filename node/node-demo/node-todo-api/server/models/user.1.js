const mongoose=require("mongoose")
const validator=require("validator")

// var Users=mongoose.model('users',{
//   name:{
//     type:String,
//     required:true,
//     minlength:1,
//     trim:true
//   },
//   age:{
//     type:Number,
//     default:28
//   },
//   location:{
//     type:String
//   }
// })
var user={
  email: '245840788@qq.com',
  password: '123456',
  tokens:[{
    access:'auth',
    token:'argsthsdrjthty436e5yjhsdg'
  }]
}

var Users=mongoose.model('users',{
  email:{
    type:String,
    required:true,
    minlength:1,
    trim:true,
    unique:true,
    validate:{
      validator:validator.isEmail,
      message:'{VALUE} is not a valid email'
    }
  },
  password:{
    type:String,
    required:true,
    minlength:6
  },
  tokens:[{
    access:{
      type:String,
      required:true
    },
    token:{
      type:String,
      required:true
    }
  }]
})
module.exports={Users}