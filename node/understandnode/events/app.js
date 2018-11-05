var EventEmitter=require('events')
//工具类库（我不知道）
var util=require('util')

function Greetr(){
    this.greeting='Hello World'
}

//继承
util.inherits(Greetr,EventEmitter)

Greetr.prototype.greet=function(data){
    console.log(this.greeting+"："+data)
    this.emit('greet',data)
}

var greeter1=new Greetr()

greeter1.on('greet',function(data){
    console.log('Someone greeted！'+"："+data)
})

greeter1.greet('James')