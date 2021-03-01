/*
    全局变量陷阱
*/
function checkName(){}
function checkEmail(){}
function checkPassword(){}

var checkName = function(){}
var checkEmail = function(){}
var checkPassword = function(){}

/*
    用对象收编变量（减少全局变量）
*/
var checkObject = {
    checkName:function(){},
    checkEmail:function(){},
    checkPassword:function(){},
}

var checkObject = function(){}
checkObject.checkName = function(){}
checkObject.checkEmail = function(){}
checkObject.checkPassword = function(){}


/*
    使对象可以复制，新创建的对象同样继承这些方法
*/ 
var CheckObject = function(){
    return {
        checkName:function(){},
        checkEmail:function(){},
        checkPassword:function(){},
    }
}
var a = CheckObject() // a和CheckObject没有任何关系
a.checkName()


/*
    类的创建方式（缺点：没有共享属性和方法）
*/ 
var CheckObject = function(){
    this.checkName = function(){}
    this.checkEmail = function(){}
    this.checkPassword = function(){}
}
var a = new CheckObject()
a.checkEmail()


/*
    共享方法和属性
*/ 
var CheckObject = function(){}
CheckObject.prototype.checkName = function(){}
CheckObject.prototype.checkEmail = function(){}
CheckObject.prototype.checkPassword = function(){}
var a = new checkObject()
a.checkName()

/*
    共享方法和属性（重写原型对象的方式）
*/ 
var CheckObject = function(){}
CheckObject.prototype = {
    checkName:function(){},
    checkEmail:function(){},
    checkPassword:function(){},
}
var a = new CheckObject()
a.checkName()

/*
    链式调用
*/ 
var checkObject = {
    checkName:function(){
        return this
    },
    checkEmail:function(){
        return this
    },
    checkPassword:function(){
        return this
    },
}
checkObject.checkName().checkEmail().checkPassword()
// 或者
var CheckObject = function(){}
CheckObject.prototype = {
    checkName:function(){
        return this
    },
    checkEmail:function(){
        return this
    },
    checkPassword:function(){
        return this
    },
}
var a = new CheckObject()
a.checkName().checkEmail().checkPassword()


/*
    添加方法的功能方法（避免污染）
*/ 
Function.prototype.addMethod = function(name,fn){
    this[name] = fn
}
var methods = function(){}
methods.addMethod("checkName",function(){})
methods.checkName()

// 继续链式添加方法
Function.prototype.addMethod = function(name,fn){
    this[name] = fn
    return this
}
var methods = function(){}
methods.addMethod("checkName",function(){}).addMethod("checkEmail",function(){})


/*
    继续链式使用（函数式调用方式）
*/ 
var methods = function(){}
methods.addMethod("checkName",function(){
    return this
}).addMethod("checkEmail",function(){
    return this
})
methods.checkName().checkEmail()

/*
    类试调用方式，使用new创建对象
*/ 
Function.prototype.addMethod = function(name,fn){
    this.prototype[name] = fn
    return this
}
var methods = function(){}
methods.addMethod("checkName",function(){}).addMethod("checkEmail",function(){})
var m = new methods()
m.checkName()



/*
    JavaScript中new运算符工作流程：
    
    （1）创建一个空的简单JavaScript对象（即{}）；
    （2）链接该对象（即设置该对象的构造函数）到另一个对象 ；
    （3）将步骤1新创建的对象作为this的上下文 ；
    （4）如果该函数没有返回对象，则返回this。

    var obj = {};
    obj.__proto__ = Animal.prototype;
    var result = Animal.call(obj,"cat");
    return typeof result === 'obj'? result : obj;

*/
function Foo(age) {
    this.age = age;
}
var o = new Foo(111);
console.log(o); // {age: 111}

function Foo(age) {
    this.age = age;
    return { type: "我是显式返回的" };
}
var o = new Foo(222);
console.log(o); // {type: '我是显式返回的'}

function Foo(age) {
    this.age = age;
    return 1;
} 
var o = new Foo(333);
console.log(o); // {age: 333}
