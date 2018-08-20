//const MongoClient=require("mongodb").MongoClient
const {MongoClient,ObjectID}=require("mongodb")


MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,client)=>{
  if(err){
    //加个return直接返回
    return console.log("Unable to connect mongodb!")
  }

  //deleteMany
  // client.collection('Users').deleteMany({location:'LosAngles'}).then(res=>{
  //   console.log(res.result)
  // })

  //deleteOne(万一有字段重复怎么办),删除第一个
  // client.collection('Users').deleteOne({age:34}).then(res=>{
  //   console.log(res.result)
  // })
  //findOneAndDelete
  client.collection('Users').findOneAndDelete({age:34}).then(res=>{
    console.log(res)
  })
  client.close()
})