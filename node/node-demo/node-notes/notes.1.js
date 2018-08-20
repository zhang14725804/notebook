//module有很多属性
//console.log(module)

module.exports.age=25

module.exports.addNote=()=>{
  console.log('adding notes')
  return 'New note'
}
module.exports.add=(a,b)=>{
  return a+b
}