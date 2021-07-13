/*
    16、模板方法模式（将多个模型抽象化统一，从中抽取出一个模板）
    核心在于方法的重用，将核心方法封装在基类中以实现方法共享。是一种行为的约束。子类可以对基类方法重写达到扩展的目的
    todo：好像和组合模式有些神似
*/
var Alert = function(data){
    // 提示框模板（导航栏模板同样的道理）
    this.content = data.content
    this.success = data.success || function(){}
    this.fail = data.fail || function(){}
}
Alert.prototype = {
    init:function(){},
    bindEvent:function(){},
    hide:function(){},
    show:function(){},
}
// 根据模板创建类
var RightAlert = function(data){
    // 继承构造函数
    Alert.call(this)
    //
}
// 继承方法
RightAlert.prototype = new Alert()
RightAlert.prototype.init=function(){}
var TitleAlert = function(data){
    // 继承构造函数
    Alert.call(this)
    this.title = data.title
}
// 继承方法
TitleAlert.prototype = new Alert()
TitleAlert.prototype.init=function(){}
// 继承类也可作为模板
var CancelAlert = function(data){
    // 继承构造函数
    TitleAlert.call(this)
    this.cancel = data.cancel
}
CancelAlert.prototype = new TitleAlert()
CancelAlert.prototype.init = function(){}
new CancelAlert({
    title:"",
    content:"",
    success:function(){},
    fail:function(){},
}).init()




/*
    17、观察者模式（发布-订阅者模式，消息机制）
*/
// 将观察者放在闭包中，当页面加载就立即执行
var Observer = (function(){
    // 防止消息队列被篡改，将消息容器作为静态私有变量保存
    var _message = {}
    return {
        // 注册
        regist:function(type,fn){
            // 消息队列是否存在
            if(typeof _message[type] === "undefined"){
                _message[type] = [fn]
            }else{
                _message[type].push(fn)
            }
        },
        // 发布
        fire:function(type,args){
            if(!_message){
                return
            }
            var events = {
                type:type,
                args:args||{}
            }
            var i = 0
            var len = _message[type].length
            for(;i<len;i++){
                // 依次执行动作序列
                _message[type][i].call(this,events)
            }
        },
        // 移除
        remove:function(){
            // 消息队列是否存在
            if(_message[type] instanceof Array){
                var i = _message[type].length
                for(;i>0;i--){
                    _message[type][i] === fn && _message[type].splice(i,1)
                }
            }
        },
    }
})()



/*
    18、状态模式（消除多种分支判断的一种思路）
*/
// 状态模式例1：结果状态对象
var ResultState = function(){
    var States = {
        // 每种状态作为一种独立方法保存
        state0:function(){},
        state1:function(){},
        state2:function(){},
    }
    // 获取某一状态并执行对应方法
    function show(result){
        States['state'+result] && States['state'+result]()
    }
    return {
        show:show
    }
}

// 状态模式例2：创建状态类
var MarryState = function(){
    // 内部状态私有变量
    var _currentState = {}
    // 动作与状态方法映射
    var states = {
        jump:function(){},
        move:function(){},
        shoot:function(){},
        squat:function(){},
    }
    // 动作控制类
    var Action = {
        changeState:function(){
            // 组合动作通过传递多个参数实现
            var arg = arguments
            // 重置内部状态
            _currentState = {}
            // 如果有动作则添加动作
            if(arg.length){
                for(var i=0,len= arg.length;i<len;i++){
                    // 向内部状态中添加动作
                    _currentState[arg[i]] = true
                }
            }
            // 返回动作控制类
            return this
        },
        // 执行动作
        goes:function(){
            for(var i in _currentState){
                // 干掉一个if判断（great😄）
                states[i] && states[i]()
            }
            return this
        }    
    }
    return {
        change:Action.changeState,
        gose:Action.goes
    }
}
var marry = new MarryState()
marry.change("jump","shoot").goes().goes().change("shoot").goes()



/*
    19、策略模式（消除多种分支判断的一种思路）
    相比于状态模式，无需管理状态，策略之间可以相互替换，策略对象内部是独立的算法
    典型应用：
        （1）jQuery动画缓冲函数
        （2）表单验证
*/
// 策略模式例1：价格策略对象
var PriceStrategy = function(){
    var strategy = {
        return30:function(price){},
        return50:function(price){},
        percent90:function(price){},
        percent80:function(price){},
        percent50:function(price){},
    }
    return function(algoruthm,price){
        return strategy[algoruthm] && strategy[algoruthm](price)
    }
}
// 策略模式例2：表单验证策略对象
var AuthInputStrategy = function(){
    var strategy = {
        notNull:function(value){},
        email:function(value){},
        phone:function(value){},
        number:function(value){},
    }
    return {
        check:function(type,value){
            return strategy[type] &&strategy[type](value)
        },
        // 添加额外策略
        addStrategy:function(type,fn){
            strategy[type] = fn
        }
    }
}
AuthInputStrategy.addStrategy("username",function(value){})



/*
    20、职责链模式
    将需求分解成一部分一部分相互独立的模块需求，分工协作，每个对象只完成各自的事，无关的事传递到下一个对象中，知道需求完成。（需求颗粒化）
*/



/*
    21、命令模式
*/
var CanvasCommand = (function(){
    var canvas = document.getElementById("canvas")
    var ctx = canvas.getContext("2d")
    var Action = {
        fillStyle:function(c){},
        fillRect:function(c){},
        moveTo:function(c){},
        lineTo:function(c){},
    }
    return {
        excute:function(msg){
            // 如果没有指令
            if (!msg){
                return
            }
            // 指令是一个数组
            if(msg.length){
                for(var i=0;i<msg.length;i++){
                    arguments.callee(msg[i])
                }
            }else{
                msg.param = Object.prototype.toString(msg.param) === "[object] Array" ? msg.param : [msg.param]
                Action[msg.command].apply(Action,msg.param)
            }
        }
    }
})()
CanvasCommand([
    {command:"fillStyle",param:"res"},
    {command:"fillRect",param:[20,20,100,100]},
])



/*
    22、访问者模式（这个什么鬼）
*/



/*
    23、中介者模式（相比观察者模式，中介模式单向通信）
*/
// 中介者对象
var Mediator = (function(){
    // 消息对象
    var _msg = {}
    return {
        /*
            订阅消息方法
            type：消息名称
            action：消息回调函数
        */ 
       register:function(type,action){
           if(_msg[type]){
               _msg[type].push(action)
           }else{
               _msg[type] = []
               _msg[type].push(action)
           }
       },
       /*
            发布消息方法
            type：消息名称
       */
       send:function(type){
           if(_msg[type]){
               for(var i=0;i<_msg[type].length;i++){
                   _msg[type][i] &&  _msg[type][i]()
               }
           }
       }
    }
})()
Mediator.register("demo",function(){console.log("first");})
Mediator.register("demo",function(){console.log("second");})
Mediator.send("demo")



/*
    24、备忘录模式（人话就是缓存的意思）
*/
// Page备忘录类
var Page = function(){
    // 信息缓存对象
    var cache = {}
    return function(page,fn){
        if(cache[page]){
            showpage(page,cache[page])
            fn && fn()
        }else{
            // 请求数据
            // 存入缓存
            cache[page] = res.data
            fn && fn()
        }
    }
}



/*
    25、迭代器模式
    应用：
        （1）数组迭代器
        （2）对象迭代器
        （3）同步变量迭代器（😄）
        （4）分支循环嵌套问题(😅)
*/
// 迭代器
var Iterator = function(tag,container){
    var container = container && document.getElementById(container) || document
    var items = container.getElementByTagName(tag)
    len = items.length
    i = 0
    // 
    var splice = [].splice
    return {
        first:function(){},
        last:function(){},
        pre:function(){},
        next:function(){},
        get:function(){},
        dealEact:function(){},
        dealItem:function(){},
        // 排他方式处理某个元素
        exclusive:function(){},
    }
}

// 同步变量迭代取值器
var AGetter = function(key){
    if (!A){
        return undefined
    }
    var result = A
    // 解析属性层次数列
    key = key.split(".")
    // 迭代同步变量A对象属性,递归遍历
    for(var i=0;i<key.length;i++){
        if (result[key[i]]!==undefined){
            result = result[key[i]]
        }else{
            return undefined
        }
    }
    return result
}
var A = {
    client:{
        user:{
            name:"",
            id:0
        }
    },
    server:{}
}
console.log(AGetter("client.user.name")); // ""
console.log(AGetter("server.local.ip")); // undefined



/*
    26、解释器模式（😅）
*/
