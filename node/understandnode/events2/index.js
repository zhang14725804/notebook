//node Core中的events
var Emitter = require('events')
var eventConfig=require('./config')
var emitter=new Emitter()
//eventConfig.GREET 防止字符串引发的错误
emitter.on(eventConfig.GREET,function(){
    console.log('第一次打招呼')
})
emitter.on(eventConfig.GREET,function(){
    console.log('再一次打招呼')
})
emitter.emit(eventConfig.GREET)