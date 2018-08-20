const fs=require('fs');
const os=require('os');
const notes=require('./notes')
//lodash库很强大，但是貌似我没有用过，山炮
const _=require('lodash')

console.log(_.uniq([1,2,3,1,2,'a','b','a']))
console.log(_.isString(true))
console.log(_.isString("true"))
var res=notes.addNote()
console.log(res)
console.log('a+b='+notes.add(6,-2))
//输出系统信息
// var user=os.userInfo()
// console.log(user)
// //也可以用字符串模板
// fs.appendFile('greeting.txt',`hello ${user.username}! You are ${notes.age}`)