//ES6中的类和实例对象
'use strict'

class Person{
    constructor(firstname,lastname){
        this.firstname=firstname
        this.lastname=lastname
    }
    greet(){
        console.log('Hello '+this.firstname+' '+this.lastname)
    }
}

var john=new Person('John','Doe')
john.greet()

var james=new Person('james','wall')
james.greet()

console.log(john.__proto__)
console.log(james.__proto__)
console.log(john.__proto__===james.__proto__)