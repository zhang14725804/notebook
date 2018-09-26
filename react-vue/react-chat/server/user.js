const express=require("express")
const utility=require("utility")
const Router=express.Router()

//过滤数据库返回字段
const _filter={pwd:0,__v:0}
const model=require("./model")
const User=model.getModel('user')
const Chat=model.getModel('chat')

Router.get("/list",function(req,res){
  const {type}=req.query
  //删除所有数据
  //User.remove({},function(e,d){})
  User.find({type},function(err,doc){
    return res.json({code:0,data:doc})
  })
})

//清空聊天消息
//Chat.remove({},function(err,doc){})
//聊天信息列表
Router.get("/getmsglist",function(req,res){
  const userid=req.cookies.userid
  User.find({},function(err,userdoc){
    let users={} //在这里是对象，不是数组
    userdoc.forEach((v)=>{
      users[v._id]={name:v.name,avatar:v.avatar}
    })
    //或查询{'$or':[{from:userid},{to:userid}]}
    Chat.find({'$or':[{from:userid},{to:userid}]},function(err,msgdoc){
      if(!err){
        return res.json({code:0,messages:msgdoc,users:users})
      }
    })
  })
})
//登录
Router.post("/login",function(req,res){
  const {name,pwd}=req.body
  //{pwd:0} 不返回pwd
  User.findOne({name,pwd:md5pwd(pwd)},_filter,function(err,doc){
    if(!doc){
      return res.json({code:1,message:'用户名或密码错误'})
    }
    //登陆成功之后写入cookie、
    res.cookie('userid',doc._id)
    return res.json({code:0,data:doc})
  })
})
Router.post('/readmsg',function(req,res) {
  const userid=req.cookies.userid
  const {from} =req.body
  //Chat.update({from,to:userid},{read:true})  //这么写也可以
  Chat.update(
    {from,to:userid},
    {'$set':{read:true}},
    {'multi':true},//修改多行
    function(err,doc){
      //console.log(doc)
      if(!err){
        //返回修改了多少航
        return res.json({code:0,num:doc.nModified})
      }
      return res.json({code:1,message:'修改失败'})
  })
})
Router.post("/update",function(req,res){
  //取cookie的时候注意cookie是复数
  const userid=req.cookies.userid
  //cookie不存在
  if(!userid){
    return json.dump({code:1})
  }
  const body=req.body
  //返回原来的对象
  User.findByIdAndUpdate(userid,body,function(err,doc){
    //这里为什么不直接是一个对象(拼接原来的数据和现在数据)
    const data=Object.assign({},{
      name:doc.name,
      type:doc.type
    },body)

    return res.json({code:0,data})
  })
})
//注册
Router.post("/register",function(req,res){
  console.log(req.body)
  const {name,pwd,type}=req.body
  User.findOne({name},function(err,doc){
    if(doc){
      return res.json({code:1,message:'用户名已存在'})
    }

    //这样获取不到_id
    // User.create({name,pwd:md5pwd(pwd),type},function(err,doc){
    //   if(err){
    //     return res.json({code:1,message:'网络错误'})
    //   }
    //   return res.json({code:0})
    // })

    const userModel=new User({name,pwd:md5pwd(pwd),type})
    userModel.save(function(err,doc){
      if(err){
        return res.json({code:1,message:'网络错误'})
      }
      const {name,type,_id}=doc
      //写cookie
      res.cookie("userid",_id)
      return res.json({code:0,data:{name,type,_id}})
    })
  })
})
//获取用户信息
Router.get("/info",function(req,res){
  //获取cookie req.cookies（注意是复数形式）
  const {userid}=req.cookies
  if(!userid){
    return res.json({code:1})
  }
  User.findOne({_id:userid},_filter,function(err,doc){
    if(err){
      return res.json({code:1,message:'网络错误'})
    }
    if(doc){
      return res.json({code:0,data:doc})
    }
  })
})

//加密密码
function md5pwd(pwd){
  const salt="qaz!@#$%xsw"
  return utility.md5(utility.md5(pwd+salt))
}

module.exports=Router