const fs=require('fs');
const notes=require('./notes')
//lodash库很强大，但是貌似我没有用过，山炮
const _=require('lodash')
const yargs=require('yargs')
//获取用户输入,,运行 node app.js list
// console.log("process.argv:")
// console.log(process.argv)

const argv=yargs.argv;
var command=argv._[0]
console.log("yargs:")
console.log(argv)
console.log("Command:")
console.log(command)
// node app.js add --title=secret --body="this is my secret"
if(command==='add'){
  notes.addNote(argv.title,argv.body)
}else if(command==='remove'){
  var noteRemoved=notes.removeNote(argv.title)
  var message=noteRemoved?'note removed':'not found'
  console.log(message)
}else if(command==='read'){
  var note=notes.getNote(argv.title)
  if(note){
    console.log('found')
    notes.logNote(note)
  }else{
    console.log('not found')
  }
}
