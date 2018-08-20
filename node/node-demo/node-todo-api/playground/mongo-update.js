//const MongoClient=require("mongodb").MongoClient
const {MongoClient,ObjectID}=require("mongodb")


MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,client)=>{
  if(err){
    //加个return直接返回
    return console.log("Unable to connect mongodb!")
  }

  client.collection('Users').findOneAndUpdate({
    _id:new ObjectID("5b4af88100ad77255c886a0a")
    },{
      $set:{
        location:"Los Angeles"
      },
      $inc:{
        age:1
      }
    },{
      returnOriginal:true
    }).then(res=>{
    console.log(res)
  })
  client.close()
})