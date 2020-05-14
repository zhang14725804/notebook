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