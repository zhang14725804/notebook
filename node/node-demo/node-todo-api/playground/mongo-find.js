//const MongoClient=require("mongodb").MongoClient
const {MongoClient,ObjectID}=require("mongodb")


MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,client)=>{
  if(err){
    //加个return直接返回
    return console.log("Unable to connect mongodb!")
  }
  //按照字段查询，也可以不穿值查询所有
  //client.collection('Users').find({age:34}).toArray().then((docs)=>{
  // client.collection('Users').find({_id:new ObjectID("5b4a4bbb0d19121fb818d93d")}).toArray().then((docs)=>{
  //   console.log(docs)
  // },(err)=>{
  //   console.log('Unable to fetch data')
  //   console.log(err)
  // })

  //查询collection长度
  client.collection('Users').find({location:'Miami'}).count().then((count)=>{
    console.log(count)
  },(err)=>{
    console.log('Unable to fetch data')
    console.log(err)
  })
  client.close()
})