//module有很多属性
//console.log(module)
const fs=require("fs")

var fetchNotes=()=>{
  //解决notes.json不存在的情况
  try{
    var notesString=fs.readFileSync("notes-data.json")
    return JSON.parse(notesString)
  }catch(e){
    //console.log(e)
    return [];
  }
}

var saveNotes=(notes)=>{
  fs.writeFileSync("notes-data.json",JSON.stringify(notes))
}
var addNote=(title,body)=>{
  var notes=fetchNotes()
  //这么写
  var note={
    title,
    body
  }
  //重复的duplicate  常规写法
  // var duplicateNote=notes.filter((note)=>{
  //   return note.title===title
  // })
  //ES6写法
  //filter()把传入的函数依次作用于每个元素，然后根据返回值是true还是false决定保留还是丢弃该元素
  var duplicateNote=notes.filter((note)=> note.title===title )
  //这就去重？？？？
  if(duplicateNote.length===0){
    notes.push(note)
    saveNotes(notes)
    return note;
  }
}
var removeNote=(title)=>{
  //获取，，过滤，，删除
  var notes=fetchNotes()
  var filterNotes=notes.filter((note)=>note.title!==title)
  saveNotes(filterNotes)

  return notes.length!==filterNotes.length;
}

var getNote=(title)=>{
  var notes=fetchNotes();
  var filterNotes=notes.filter((note)=>note.title===title)
  return filterNotes[0]
}
var logNote=(note)=>{
  console.log(`title::${note.title}`)
}
//必须放在最后（为什么）
// module.exports={
//   addNote:addNote,
//   add:add
// }
module.exports={
  addNote,
  removeNote,
  getNote,
  logNote
}