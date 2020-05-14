/*
    技巧型设计模式
*/


/*
    27、链式调用（链模式）
    理解jQuery链式调用的精髓，理解原型原型链，构造函数，new关键字
    todo：
    原型对象中的方法实在构造函数通过new关键字执行时才能被构造函数获取到。平时构造函数获取不到原型对象中的方法（why）
*/



/*
    28、委托模式（代理模式）
*/


/*
    29、数据访问对象模式（DAO）
    应用：
        （1）前端基于localstorage的本地存储
        （2）后端mongodb中的dao层的封装
*/

// 基于localstorage的本地存储方案
var BasicLocalStorage = function(preId,timeSign){
    // 定义本地存储数据库前缀
    this.preId = preId
    // 定义时间戳与数据库之间的拼接符
    this.timeSign = timeSign || "|-|"
}
BasicLocalStorage.prototype = {
    // 操作状态
    status:{
        SUCCESS:0, // 成功
        FAILURE:1, // 失败
        OVERFLOW:2, // 溢出
        TIMEOUT:3, // 过期
    },
    // 保存本地存储链接
    storage:localStorage || window.localStorage,
    // 获取本地存储数据库真是字段
    getKey:function(key){
        return this.preId + key
    },
    set:function(key,value,callback,time){
        var status = this.status.SUCCESS
        var key = this.getKey(key)
        try{
            time = new Date(time) || time.getTime()
        }catch(e){
            // 默认有效时间：一个月
            time = new Date().getTime + 1000*60*60*24*30 
        }
        try{
            this.storage.setItem(key,time+this.timeSign+value)
        }catch(e){
            status = this.state.OVERFLOW
        }
        // 执行回调函数
        callback && callback.call(this,status,key,value)
    },
    get:function(key,callback){
        var status = this.status.SUCCESS
        var key = this.getKey(key)
        var value = null
        var that = this
        var timeSignLen =this.timeSign,length
        var index,time,result

        try{
            value = that.localStorage.getItem(key)
        }catch(e){
            result = {
                status:that.status.FAILURE,
                value:null
            }
            callback && callback.call(this,result.status,result.value)
            return result
        }
        if (value){
            index = value.indexOf(that.timeSign)
            time = value.slice(0,index)
            // 是否有效
            if(new Date(time).getTime() > new Date().getTime() || time ==0){
                value = value.slice(index+timeSignLen)
            }else{
                value = null
                status = that.status.TIMEOUT
                that.remove(key)
            }
        }else{
            status = that.status.FAILURE
        }
        result = {
            status:status,
            value:value
        }
        // 执行回调函数
        callback && callback.call(this,result.status,result.value)
        return result
    },
    remove:function(key,callback){
        var status = this.status.FAILURE
        var key = this.getKey(key)
        var value = null
        try{
            value = this.localStorage.getItem(key)
        }catch(e){}
        if (value){
            try{
                this.localStorage.removeItem(key)
                status = this.status.SUCCESS
            }catch(e){}
        }
        // 执行回调函数
        callback && callback.call(this,status,status > 0 ? null : value.slice(value.indexOf(this.timeSign)+this.timeSign.length))
    },
}
var LS = new BasicLocalStorage("LS__")
LS.set("key1","value1",function(){console.log(arguments)})



/*
    30、节流模式（执行最后一次操作并取消其他操作）
    典型应用：
        （1）节流页面滚动事件中的回调函数
        （2）图片懒加载（可视范围内的图片优先加载）
*/
var throttle = function(){
    var isClear = arguments[0]
    var fn
    // 如果第一个参数事boolean类型，那么第一个参数标识是否清除计时器
    if(typeof isClear === "boolean"){
        fn = arguments[1]
        // 函数的计时器句柄存在，清除计时器
        fn._throttleID && clearTimeout(fn._throttleID)
    }else{
        // 第一个参数为函数
        fn = isClear
        // 第二个参数为执行时的参数
        params = arguments[1]
        var p = extend({
            content:null,
            args:[],
            time:30
        },params)
        // 清除执行函数计时器句柄
        arguments.callee(true,fn)
        fn._throttleID = setTimeout(function(){
            fn.apply(p.content,p.args)
        },p.time)
    }
}
$(window).on("scroll",function(){
    throttle(someFuncction)
})

// 图片懒加载
function LazyLoad(id){
    this.container = document.getElementById(id)
    // 缓存图片
    this.imgs = this.getImgs()
    this.init()
}
LazyLoad.prototype = {
    init:function(){
        this.update()
        this.bindEvent()
    },
    getImgs:function(){},
    // 加载图片
    update:function(){},
    shouldShow:function(){},
    // 获取元素在页面中的纵坐标位置
    pageY:function(){},
    // 绑定事件
    on:function(){},
    // 为窗口绑定resize和scroll事件
    bindEvent:function(){}
}



/*
    31、简单模板模式（模板字符串的应用）
    简单来讲：用模板字符串操作代替DOM操作创建视图
*/



/*
    32、惰性模式
    第一次执行时已经判断过的，以后在执行不必要，在第一次执行时重新定义即可
    应用：（1）绑定事件时判断浏览器支持情况（2）创建XHR对象
*/
var A = {}
// 加载及执行（通过闭包执行），还有惰性执行（在第一次使用时重新定义对象）
A.on = (function(dom,type,fn){
    if(document.addEventListener){
        return function(dom,type,fn){
            dom.addEventListener(type,fn,false)
        }
    }else if(document.attachEvent){
        return function(dom,type,fn){
            dom.attachEvent('on'+type,fn)
        }
    }else{
        return function(dom,type,fn){
            dom['on'+type] = fn
        }
    }
})()

       

/*
    33、参与者模式
    侠义的解释：bind和apply的应用
*/



/*
    34、等待着模式（解决不确定先后完成的异步逻辑）
    todo：有些难理解😅
*/
var Waiter = function(){
    // 等待对象容器
    var dfd = []
    // 成功回调方法容器
    var doneArr = []
    // 失败回调方法容器
    var failArr = []
    
    slice = Array.prototype.slice
    that = this

    // 监控对象类
    var Promise = function(){
        // 成功
        this.resolved = false
        // 失败
        this.rejected = false
    }
    Promise.prototype = {
        resolve:function(){},
        reject:function(){},
    }

    that.Deferred = function(){
        return new Promise()
    }

    // 回调执行方法
    function _exec(arr){}
    // 监控异步方法
    that.when = function(){}
    that.done = function(){}
    that.fail = function(){}
}
