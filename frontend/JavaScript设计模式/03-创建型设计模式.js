/*
    3、简单工厂模式
*/ 
var Basketball = function(){
    this.famous = "Jordan"
}
Basketball.prototype = {
    getMember:function(){console.log("5名队员");},
    getBallSize:function(){console.log("篮球最大");},
}
var Football = function(){
    this.famous = "Beckham"
}
Football.prototype = {
    getMember:function(){console.log("11名队员");},
    getBallSize:function(){console.log("足球中等");},
}
var Tennis = function(){
    this.famous = "费德勒"
}
Tennis.prototype = {
    getMember:function(){console.log("1名队员");},
    getBallSize:function(){console.log("网球最小");},
}
// (1)通过类创建对象
var SportsFactory = function(name){
    switch(name){
        case "NBA":
            return new Basketball()
        case "worldcup":
            return new Football()
        case "frenchOpen":
            return new Tennis()
    }
}
// (1)通过寄生方式创建对象
function createSports(type,text){
    // 创建一个对象，并拓展属性方法
    var o = new Object()
    o.content = text
    o.show = function(){}

    switch(type){
        case "NBA":
            // 差异部分
        case "worldcup":
            // 差异部分
        case "frenchOpen":
            // 差异部分
    }
    return o
}



/*
    4、工厂方法模式
    将实际创建对象工作推迟到子类当中，核心类成了抽象类
    关心最终产出，不关心过程
*/
var Factory = function(type,content){
    // 安全模式
    if (this instanceof Factory){
        return new this[type](content)
    }else{
        return new Factory(type,content)
    }
}
Factory.prototype = {
    // 工厂原型中设置创建所有类型数据对象得基类
    A:function(contnet){},
    B:function(contnet){},
    C:function(contnet){},
}


/*
    5、抽象工厂模式
    定义了一种类，并定义了该类所必备的方法，却没有具体的实现。但是需要子类重写这些必备方法，不能直接调用
*/
// 抽象工厂方法
var AbstractFactory = function(Child,Super){
    if (typeof AbstractFactory[Super] === "function"){
        function F(){}
        F.prototype = new AbstractFactory[Super]()
        Child.constructor = Child
        Child.prototype = new F()
    }else{
        return new Error("未创建该抽象类")
    }
} 
// 抽象类
AbstractFactory.Car = function(){
    this.type = "car"
}
AbstractFactory.Car.prototype = {
    getPrice:function(){
        return new Error("抽象方法不能调用")
    },
    getSpeed:function(){
        return new Error("抽象方法不能调用")
    },
}
AbstractFactory.Bus = function(){
    this.type = "bus"
}
AbstractFactory.Bus.prototype = {
    getPrice:function(){
        return new Error("抽象方法不能调用")
    },
    getSpeed:function(){
        return new Error("抽象方法不能调用")
    },
}
var BMW = function(price,speed){
    this.price = price
    this.speed = speed
}
// 抽象工厂实现对抽象类的继承
AbstractFactory(BMW,'car')
BMW.prototype.getPrice = function(){}
BMW.prototype.getSpeed = function(){}



/*
    6、建造者模式（先跳过）
    7、原型模式（懵了）
*/




/*
    8、单例模式（只允许实例化一次得对象类）
    （1）定义命名空间（namespace）
    （2）管理代码库得各个模块
    用例：管理静态变量
*/
function CreateSingleton (name) {
    this.name = name;
};

// 获取实例的名字
CreateSingleton.prototype.getName = function() {
    console.log(this.name)
};
// 单例对象
var Singleton = (function(){
    var instance;
    return function (name) {
        if(!instance) {
            instance = new CreateSingleton(name);
        }
        return instance;
    }
})();
// 创建实例对象1
var a = new Singleton('a');
