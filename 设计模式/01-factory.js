/*
    工厂模式：为了解决多个类似对象声明的问题;也就是为了解决实列化对象产生重复的问题。
*/
(function(){
    // 简单工厂模式
    function createPerson(name,age){
        var obj = new Object()
        obj.name = name
        obj.age = age
        obj.sayName =  function(){
            return this.name
        }
        return obj
    }
    var p1 = new createPerson("tim",23)
    var p2 = new createPerson("gim",12)
    console.log(p1.sayName());
    console.log(p2.sayName());
    // 返回都是object 无法识别对象的类型 不知道他们是哪个对象的实列
    console.log(typeof p1)
    
    /**
     * 
        复杂的工厂模式：将其成员对象的实列化推迟到子类中，子类可以重写父类接口方法以便创建的时候指定自己的对象类型。

        父类只对创建过程中的一般性问题进行处理，这些处理会被子类继承，子类之间是相互独立的，具体的业务逻辑会放在子类中进行编写。

        父类就变成了一个抽象类，但是父类可以执行子类中相同类似的方法，具体的业务逻辑需要放在子类中去实现；
     *  */ 
})()
