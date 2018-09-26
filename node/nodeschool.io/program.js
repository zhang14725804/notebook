/*Exercise 1*/
//console.log('HELLO WORLD')

/*Exercise 2*/
// const numArr=process.argv.splice(2)
// let num=0,i=0,len=numArr.length
// for(;i<len;i++){
//     num+=Number(numArr[i])
// }
// console.log(num)

/*Exercise 3*/
// var fs=require('fs')
// var fileBuffer=fs.readFileSync(process.argv[2])
// var result=fileBuffer.toString().split("\n")
// console.log(result.length-1)

/*Exercise 4*/
// var fs = require('fs')
// fs.readFile(process.argv[2],'utf8',function(err,data){
//     if(err){
//         return console.log(err)
//     }
//     var result=data.toString().split('\n').length-1
//     console.log(result)
// })

/*Exercise 5*/
// var fs = require("fs")
// path=require('path')
// var folder=process.argv[2]
// var extension='.'+process.argv[3]
// fs.readdir(folder,function(err,files){
//     if(err){
//         return console.log(err)
//     }
//     //方法一
//     // var len=files.length,i=0
//     // for(;i<len;i++){
//     //     if(files[i].endsWith(extension)){
//     //         console.log(files[i])
//     //     }
//     // }
//     //方法二
//     //数组forEach代替老土的for
//     //path.extname(file)===extension 代替 files[i].endsWith(extension)
//     files.forEach(file => {
//         if(path.extname(file)===extension){
//             console.log(file)
//         }
//     });

// })

/*Exercise 6*/
// var module6=require('./module6')
// var folder=process.argv[2]
// var extension=process.argv[3]
// //此处无需在此处理错误
// module6(folder,extension,function(err,datas){
//     datas.forEach(data=>{
//         console.log(data)
//     })
// })

/*Exercise 7*/
var http=require('http')
