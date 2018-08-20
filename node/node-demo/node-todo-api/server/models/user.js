const mongoose=require("mongoose")
const validator=require("validator")
const jwt=require("jsonwebtoken")
const _=require("lodash")
const bcryptjs=require("bcryptjs")

// var user={
//   email: '245840788@qq.com',
//   password: '123456',
//   tokens:[{
//     access:'auth',
//     token:'argsthsdrjthty436e5yjhsdg'
//   }]
// }

var UserSchema=new mongoose.Schema({
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

//返回邮箱和密码（我的没有返回，，写错了）
//删除数据库，=重新试就好了
UserSchema.methods.toJSON=function(){
  var user=this
  var userObject=user.toObject()
  //返回数据？？我这里没有返回
  return _.pick(userObject,['_id','email'])
}

//这里有些跟不上路子了 Schema是个什么鬼，，model和他什么关系
UserSchema.methods.generateAuthToken=function(){
  //这个this是什么鬼
  var user=this
  var access='auth'
  var token=jwt.sign({_id:user._id.toHexString(),access},'abc123').toString()

  user.tokens.push({access,token})

  return user.save().then(()=>{
    return token;
  })
}

//这里又是不一样，获取不到数据(token解析后，没有token字段)
UserSchema.statics.findByToken=function(token){
  var User=this
  var decoded
  try{
    decoded=jwt.verify(token,'abc123')
  }catch(e){
    // return new Promise((resolve,reject)=>{
    //   reject()
    // })
    //和上面一样，同样的效果
    return Promise.reject()
  }
  console.log(decoded)
  return User.findOne({
    "_id":decoded._id,
    "tokens.token":token,
    "tokens.access":"auth",
  })
}

UserSchema.statics.findByCredentials=function(email,password){
  var User=this

  return User.findOne({email}).then((user)=>{
    if(!user){
      return Promise.reject()
    }
    return new Promise((resolve,reject)=>{
      bcryptjs.compare(password,user.password,(err,res)=>{
        if(res){
          resolve(user)
        }else{
          reject()
        }
      })
    })
  })
}
//www.mongoosejs.com/doc/middleware.html
//mongoose中间件
UserSchema.pre('save',function(next){
  var user=this
  if(user.isModified('password')){
    bcryptjs.genSalt(10,(err,salt)=>{
      bcryptjs.hash(user.password,salt,(err,hash)=>{
        user.password=hash
        next()
      })
    })
  }else{
    next()
  }
})


UserSchema.statics.removeToken=function(token){
  var user=this

  return user.update({
    $pull:{
      tokens:{token}
    }
  })
}

var Users=mongoose.model('users',UserSchema)
module.exports={Users}