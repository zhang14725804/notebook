const {SHA256} =require("crypto-js")

//同一段字符串hash得到同一段密文
// var message="I Am a User"
// var hash=SHA256(message).toString()

// console.log(`message::${message}`)
// console.log(`hash::${hash}`)


//somesecret 秘钥之类的东西
// var data={
//   id:4
// }
// var token={
//   data,
//   hash:SHA256(JSON.stringify(data)+'somesecret').toString()
// }

// //模拟篡改数据
// token.data.id=5
// token.hash=SHA256(JSON.stringify(token.data)).toString()

// var resultHash=SHA256(JSON.stringify(token.data)+'somesecret').toString()

// if(resultHash===token.hash){
//   console.log('Data not changed')
// }else{
//   console.log("data changed do not trust!")
// }