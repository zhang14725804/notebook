/*这些应该放在config文件中*/
var env=process.env.NODE_ENV || 'development'
console.log("env====="+env)

if(env==='development'){
  process.env.PORT=3000
  process.env.MONGODB_URI='mongodb://localhost:27017/TodoApp'
}else if(env==='test'){
  process.env.PORT=3000
  process.env.MONGODB_URI='mongodb://localhost:27017/TodoAppTest'
}

const express=require("express")
const bodyParser=require("body-parser")
const {mongoose} = require('./db/mongoose')
const {Todos} = require('./models/todo')
const {Users} = require('./models/user')
const {ObjectID}=require('mongodb')
const {authenticate}=require('./middleware/authenticate')
const _=require("lodash")

const port=process.env.PORT || 3000

const app=express()
app.use(bodyParser.json())

/*添加中间件*/
app.post('/todos',authenticate,(req,res)=>{
  
  var todo=new Todos({
    text:req.body.text,
    _creator:req.user._id
  })

  todo.save().then((doc)=>{
    res.send(doc)
  },(err)=>{
    res.status(400).send(err)
  })
})
/*添加中间件*/
app.get('/todos',authenticate,(req,res)=>{
  Todos.find({
    _creator:req.user._id
  }).then((todos)=>{
    //这么写{}
    res.send({todos})
  },(err)=>{
    res.status(400).send(err)
  })
})

app.get('/todos/:id',authenticate,(req,res)=>{
  var id=req.params.id

  if(!ObjectID.isValid(id)){
    return res.status(404).send()
  }

  Todos.findOne({
    _id:id,
    _creator:req.user._id
  }).then((todo)=>{
    if(!todo){
      return res.status(404).send()
    }
    //返回数据
    res.send({todo})
  }).catch(e=>{
    res.status(400).send()
  })
})

app.delete('/todos/:id',authenticate,(req,res)=>{
  var id=req.params.id

  if(!ObjectID.isValid(id)){
    return res.status(404).send()
  }

  Todos.findOneAndRemove({
    _id:id,
    _creator:req.user._id
  }).then((todo)=>{
    if(!todo){
      return res.status(404).send()
    }
    //返回数据
    res.send({todo})
  }).catch(e=>{
    res.status(400).send()
  })
})

//更新数据
app.patch('/todos/:id',authenticate,(req,res)=>{
  var id=req.params.id
  //返回一个只有列入挑选key属性的对象
  var body=_.pick(req.body,['text','complete'])

  if(!ObjectID.isValid(id)){
    return res.status(404).send()
  }

  if(_.isBoolean(body.complate) && body.complete){
    body.complateAt=new Date().getTime()
  }else{
    body.complete=false
    body.completeAt=null
  }

  Todos.findOneAndUpdate({_id:id,_creator:req.user._id},{$set:body},{new:true}).then((todo)=>{
    if(!todo){
      return res.status(404).send()
    }
    //返回数据
    res.send({todo})
  }).catch((e)=>{
    res.status(400).send()
  })
})

//POST USERS
app.post("/users",(req,res)=>{
  var body=_.pick(req.body,['email','password'])
  var user=new Users(body)

  user.save().then(()=>{
    //res.send(user)
    //返回promise对象
    return user.generateAuthToken()
  }).then((token)=>{
    res.header("x-auth",token).send(user)
  }).catch((err)=>{
    res.status(400).send(err)
  })
})



// app.get('/users/me',(req,res)=>{
//   var token=req.header('x-auth')
  
//   Users.findByToken(token).then((user)=>{
    
//     if(!user){
//       return Promise.reject()
//     }
//     res.send(user)
//   }).catch((err)=>{
//     res.status(401).send(err)
//   })
// })

app.get('/users/me',authenticate,(req,res)=>{
  res.send(req.user)
})

app.post('/users/login',(req,res)=>{
  var body=_.pick(req.body,['email','password'])
  //res.send(body)
  Users.findByCredentials(body.email,body.password).then((user)=>{
    //res.send(user)
    return user.generateAuthToken().then((token)=>{
      res.header("x-auth",token).send(user)
    })
  }).catch((err)=>{
    res.status(400).send(err)
  })
})

app.delete('/users/me/token',authenticate,(req,res)=>{
  //教程写错了
  Users.removeToken(req.token).then(()=>{
    res.status(200).send()
  },()=>{
    res.status(400).send()
  })
})

app.listen(port,()=>{
  console.log(`Started on port ${port}`)
})

module.exports={app}