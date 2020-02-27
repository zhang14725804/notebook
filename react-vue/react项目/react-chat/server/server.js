const express=require("express")
const bodyParser=require("body-parser")
const cookieParser=require("cookie-parser")

const model=require("./model")
const Chat=model.getModel('chat')
//socket with express
const app=express()
const server=require('http').Server(app)
const io=require("socket.io")(server)

io.on('connection',function(socket){
  console.log('user login')
  //当前链接
  socket.on('sendMessage',function(message){
    console.log(message)
    //数据入库
    const {from,to,msg}=message
    const chatid=[from,to].sort().join('_')
    Chat.create({chatid,from,to,content:msg},function(err,doc){
      //广播到全局
      io.emit('receiveMessage',Object.assign({},doc._doc))
    })
  })
})

//解析cookie和body的中间件
app.use(cookieParser())
app.use(bodyParser.json())
const userRouter=require('./user')
//子路由
app.use('/user',userRouter)

//直接用箭头函数不行？？
// app.get("/",function(req,res){
//   res.send("<h2>Hello World</h2>")
// })

server.listen(9093,function(res){
  console.log('server is already loaded')
})