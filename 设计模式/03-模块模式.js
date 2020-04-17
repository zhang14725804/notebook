(function(){
    /*
        模块模式：如果我们必须创建一个对象并以某些数据进行初始化，同时还要公开一些能够访问这些私有数据的方法

        增强的模块模式：适合那些单列必须是某种类型的实例，同时还必须添加某些属性或方法对其加以增强的情况。
    */
   var singleMode = (function(){
        // 创建私有变量
        var privateNum = 112;
        // 创建私有方法
        function privateFunc(){}
        // 创建公有方法
        function publicMethod1(){}
        function publicMethod2(){}
        // 返回一个对象包含公有方法和属性
        return {
            publicMethod1: publicMethod1,
            publicMethod2: publicMethod2
        };
    })();
})()