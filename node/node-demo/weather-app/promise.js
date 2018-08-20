// var somePromise=new Promise((resolve,reject)=>{
//   setTimeout(()=>{
//     //resolve("successful")
//     reject('失败了')
//   },1000)
// })

// somePromise.then((message)=>{
//   console.log('Hey:'+message)
// },(errorMessage)=>{
//   console.log('Fail:'+errorMessage)
// })

var asyncAdd=((a,b)=>{
  return new Promise((resolve,reject)=>{
    if(typeof a==='number' && typeof b==='number'){
      resolve(a+b)
    }else{
      reject('Arguemnt id not number!')
    }
  })
})
asyncAdd(5,'7').then((result)=>{
  console.log(result)
  return asyncAdd(result,22)
},(error)=>{
  //执行这里
  console.log(error)
}).catch((err)=>{
  //这里跳过
  console.log(err)
})
asyncAdd(5,7).then((result)=>{
  console.log(result)
  return asyncAdd(result,22)
},(error)=>{
  console.log(error)
}).then((result)=>{
  console.log(result)
  //因为之后没有then，所以没有执行结果
  return asyncAdd(result,22)
},(error)=>{
  console.log(error)
})