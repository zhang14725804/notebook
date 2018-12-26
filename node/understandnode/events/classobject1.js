//ES5中的类和实例对象
var util=require('util')

function Person(){
    this.firstname="John"
    this.lastname='Doe'
}

Person.prototype.greet=function(){
    console.log('Hello '+this.firstname+' '+this.lastname)
}
//继承Person（哪几种继承方式）
function Policeman(){
    Person.call(this)
    this.badgenumber='1234'
}

util.inherits(Policeman,Person)
var officer=new Policeman()
officer.greet()

