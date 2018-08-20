const express=require('express')
const hbs=require("hbs")
const fs=require("fs")

//运行node server.js -e js,hbs
hbs.registerPartials(__dirname+'/views/partials')
hbs.registerHelper(('getCurrentYear'),()=>{
  return new Date().getFullYear()
})
hbs.registerHelper(('screamIT'),(text)=>{
  //全部转大写（都不用括号！！！）
  return text.toUpperCase()
})

var app=express()
//模板引擎
app.set('view engine','hbs')

//middleware
app.use((req,res,next)=>{
  var date=new Date().toString()
  var log=`${date}:${req.method}-${req.url}`
  console.log(log)
  fs.appendFile('server.log.txt',log+'\n')
  next()
})

//类似于404页面
app.use((req,res,next)=>{
  res.render('mintanace.hbs')
})

//静态文件(通过中间件之后再加载静态文件)
app.use(express.static(__dirname+'/public'))

app.get("/",(req,res)=>{
  res.render('home.hbs',{
    pageTitle:'Page pageTitle!',
    welcomeMessage:'welcomeMessage!',
  })
})

app.get('/about',(req,res)=>{
  res.render('about.hbs',{
    pageTitle:'Page pageTitle!',
  })
})
app.listen(3000,()=>{
  console.log('Server is up on 3000')
})