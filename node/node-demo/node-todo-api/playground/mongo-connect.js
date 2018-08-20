//const MongoClient=require("mongodb").MongoClient
const {MongoClient,ObjectID}=require("mongodb")

//mongodb中的 id字段
var obj=new ObjectID()
console.log(obj)

//ES6对象拓展
var user={name:'Leborn',age:34}
var {name}=user
console.log(name)

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,client)=>{
  if(err){
    //加个return直接返回
    return console.log("Unable to connect mongodb!")
  }
  console.log('Connected to mongodb Server')
  // client.collection('Todos').insertOne({
  //   text:'Some thing to do',
  //   completed:false
  // },(err,res)=>{
  //   if(err){
  //     return console.log('unable to insert!')
  //   }
  //   console.log(res.ops)
  // })

  client.collection('Users').insertOne({
    name:'Leborn James',
    age:34,
    location:'Miami'
  },(err,res)=>{
    if(err){
      return console.log('unable to insert!')
    }
    console.log(res.ops)
    //还有这种操作
    console.log(res.ops[0]._id.getTimestamp())
    
  })
  client.close()
})