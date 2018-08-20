const {SHA256} =require("crypto-js")
const jwt=require("jsonwebtoken")
const bcryptjs=require("bcryptjs")

// var data={
//   id:10
// }
// //加密
// var token=jwt.sign(data,'abc123')
// console.log(token)
// //解密
// var decoded=jwt.verify(token,'abc123')
// console.log(decoded)


/*bcryptjs加密密码*/
var password="123abc!"

// bcryptjs.genSalt(10,(err,salt)=>{
//   bcryptjs.hash(password,salt,(err,hash)=>{
//     console.log(hash)
//   })
// })

var hashedPassword="$2a$10$PfWsXq40btTnmGOZIeTeY.lQGYoNdy1l40KMAmmVu.I/si4HfCvOW"

bcryptjs.compare(password,hashedPassword,(err,res)=>{
  console.log(res)
})