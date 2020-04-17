(function(){
    /*
        闭包方式实现单例模式（推荐这种）
        参考：https://segmentfault.com/a/1190000012842251
    */ 
    function Singleton(name){
        this.name = name
    }
    Singleton.prototype.getName = function(){
        return this.name
    }
    // 获取实例对象
    var getInstance = (function(){
        var instance = null // todo：这一句难理解
        return function(name){
            if(!instance){
                instance = new Singleton(name)
            }
            return instance
        }
    })()
    console.log("========推荐写法=======")
    // 因为单体模式是只实例化一次，所以下面的实例是相等的
    var a = getInstance("aa");
    var b = getInstance("bb");
    console.log(a === b); // true
    console.log(a.getName());// aa
    console.log(b.getName());// aa

    /*
        普通方式实现单例模式
    */ 
    function Singleton2(name){
        this.name = name
        this.instance = null
    }
    Singleton2.prototype.getName = function(){
        return this.name
    }
    // 获取实例对象
    Singleton2.getInstance = function(name){
        if(!this.instance){
            this.instance = new Singleton2(name)
        }
        return this.instance
    }
    console.log("========新手写法=======")
    var a = Singleton2.getInstance('a');
    var b = Singleton2.getInstance('b');
    console.log(a === b);

    // 
    var Singleton3 = (function(){
        var instance
        var CreateSingleton = function(name){
            this.name = name
            if(instance){
                return instance
            }
            this.getName()
            return instance = this
        }
        CreateSingleton.prototype.getName = function(){
            console.log(this.name)
        }
        return CreateSingleton
    })()
    console.log("========改进新手写法=======")
    var a = new Singleton3('a');
    var b = new Singleton3('b');
    console.log(a===b);
})()