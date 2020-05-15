/*
    9、外观模式（处理兼容问题）
*/
function addEvent(dom,type,fn){
    // 外观模式实现事件绑定
    if(dom.addEventListener){ // 支持DOM2级事件处理
        dom.addEventListener(type,fn,false)
    }else if(dom.attachEvent){ // IE
        dom.attachEvent('on'+type,fn)
    }else{
        dom['on'+type] = fn
    }
}
var getEvent = function(event){
    // 标准浏览器返回event、IE下window.event
    return event || window.event
}
var getTarget= function(event){
    var event = getEvent(event)
    return event.target || event.srcElement
}
var preventDefault = function(event){
    var event = getEvent(event)
    if(event.preventDefault){
        event.preventDefault()
    }else{
        event.returnValue = false
    }
}


/*
    10、适配器模式（要了解原来得方法实现的具体细节，对内部结构重组）
    应用：
    （1）适配（兼容）框架（比如：让类jQuery框架适配jQuery框架）
    （2）参数适配器：参数对象化之后用适配器处理
    （3）数据适配器：统一数据格式
*/




/*
   12、 装饰者模式（为原有功能添砖加瓦）
   无需了解原功能实现细节，良性拓展
*/
var decorator = function(element,fn){
    // 若事件源已绑定事件
    if(typeof element.onclick === "function"){
        // 缓存原有回调函数
        var oldClick = element.onclick
        element.onclick = function(){
            oldClick()
            // 执行新增回调函数
            fn()
        }
    }else{
        element.onclick = fn
    }
}



/*
    11、代理模式（起中介得作用）
    应用：
        （1）站长统计
        （2）JSONP
*/


/*
    13、桥接模式（体现面向对象对拓展得开放及对修改得关闭原则）
    应用：
        （1）代码解耦（使得各部分可以独立变化）
*/



/*
    14、组合模式（部分-整体模式）
    应用：
        （1）数据分级处理
*/
var News = function(){ // 虚拟类（抽象类）：定义而不实现
    // 将共有变量提前声明，简化子类
    this.children = []
    this.element = null
}
News.prototype = {
    init:function(){
        return new Error("请重写")
    },
    add:function(){
        return new Error("请重写")
    },
    getElement:function(){
        return new Error("请重写")
    },
}
// 容器类构造函数
var Container = function(id,parent){
    // 构造函数继承父类
    News.call(this)
    this.id = id
    this.parent = parent
    this.init
}
// 寄生式继承父类原型方法
inheritPrototype(Container,News)

// 构建方法
Container.prototype.init = function(){}
Container.prototype.add = function(){}
Container.prototype.getElement = function(){}

var Item = function(classname){
    // 构造函数继承父类
    News.call(this)
    this.classname = classname || ""
    this.init()
}
// 寄生式继承父类原型方法
inheritPrototype(Item,News)
Item.prototype.init = function(){}
Item.prototype.add = function(){}
Item.prototype.getElement = function(){}

var NewsGroup = function(classname){
    News.call(this)
    this.classname = classname || ""
    this.init()
}
// 寄生式继承父类原型方法
inheritPrototype(NewsGroup,News)
NewsGroup.prototype.init = function(){}
NewsGroup.prototype.add = function(){}
NewsGroup.prototype.getElement = function(){}




/*
    15、享元模式

    提取共有得数据和方法，提高页面效率
*/
