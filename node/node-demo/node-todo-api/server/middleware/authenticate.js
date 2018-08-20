const {Users} = require('../models/user')
//中间件怎么这么写
var authenticate=(req,res,next)=>{
  var token=req.header('x-auth')
  
  Users.findByToken(token).then((user)=>{
    
    if(!user){
      return Promise.reject()
    }
    
    req.user=user
    req.token=token
    next()

  }).catch((err)=>{
    res.status(401).send(err)
  })
}
module.exports={authenticate}