var Emitter = require('./emitter')
var emitter=new Emitter()

emitter.on('greet',function(){
    console.log('第一次打招呼')
})
emitter.on('greet',function(){
    console.log('再一次打招呼')
})
emitter.emit('greet')