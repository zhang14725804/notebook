const mongoose=require("mongoose")
const DB_URL='mongodb://localhost:27017/imooc'
mongoose.connect(DB_URL)

const models={
  user:{
    //用户名
    'name':{type:String,required:true},
    'pwd':{type:String,required:true},
    'type':{type:String,required:true},
    'avatar':{type:String},
    'desc':{type:String},
    //职位
    'title':{type:String},
    //boss特有字段
    'company':{type:String},
    'money':{type:String}
  },
  chat:{
    'chatid':{type:String,required:true},
    'read':{type:Boolean,default :false},
    'from':{type:String,required:true},
    'to':{type:String,required:true},
    'content':{type:String,required:true},
    'create_time':{type:Number,default:Date.now},
  }
}

for(let m in models){
  mongoose.model(m,new mongoose.Schema(models[m]))
}

module.exports={
  getModel:function(name){
    return mongoose.model(name)
  }
}