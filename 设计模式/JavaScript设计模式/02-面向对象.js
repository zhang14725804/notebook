/*
    通过对this变量添加属性方法来实现对类添加属性和方法
*/
var Book = function(id,name,price){
    // this指向当前对象
    this.id = id
    this.name = name
    this.price = price
}


/*
    通过在类的prototype上添加属性和方法
*/
Book.prototype.display = function(){}
// 或者
Book.prototype = {
    display : function(){}
}



/*
    通过this添加的属性和方法与在prototype中添加的属性和方法的区别：
    this添加的会多次创建
    prototype添加的只创建一次
*/ 


/*
    在类的外部通过点语法定义的属性方法和在外部通过prototype定义的属性和方法的作用：

    在类的外部通过点语法定义的属性方法：静态属性和方法（不会添加到新创建的对象上）
    通过prototype定义的属性和方法：共有的属性和方法，实例对象中可以通过this访问到

    todo:引出了对象方法、类方法、原型方法（他们之间有什么区别，各自有什么作用）

    每个类有三个部分：
    （1）构造函数内部的，供实例化对象复用
    （2）构造函数外部的，通过点语法添加的，供类使用，实例对象访问不到
    （3）原型中的，实例化对象可以通过原型链间接访问到，供所有实例对象公用
*/

var book = new Book(1,"javascript设计模式",23)
var Book = function(id,name,price){
    // 私有属性、方法
    var num = 1
    function checkId(){}
    // 特权方法
    this.getName = function(){}
    this.getPrice = function(){}
    this.setName = function(){}
    this.setPrice = function(){}
    // 对象共有属性、方法
    this.id= id
    this.copy = function(){}
    // 构造器
    this.setName(name)
    this.setPrice(price)
}
// 静态共有属性和方法（对象不能访问）
Book.isChinese = true
Book.resetTime = function(){}
Book.prototype = {
    // 共有属性和方法
    isJavascriptBook :false,
    display :function(){}
}
var b = new Book(2,"Golang高阶",23)
console.log(b.num) // undefined
console.log(b.isJavascriptBook)
console.log(b.id)
console.log(Book.isChinese)
console.log(Book.resetTime)

/*
    利用闭包实现类的静态变量
*/
var Book = (function(){
    // 静态私有变量、方法
    var bookNum = 0
    function checkBook(name){}
    // 返回构造函数
    return function(newId,newName,newPrice){
        // 私有变量、方法
        var name,price
        function checkId(id) {}
        // 特权方法
        this.setName = function(){}
        this.setPrice = function(){}
        this.getPrice = function(){}
        this.getName = function(){}
        // 共有属性方法
        this.id = newId
        this.copy = function(){}
        bookNum++
        // 构造器
        this.setName(name)
        this.setPrice(price)
    }
})()
// 闭包外部添加原型属性和方法看上去像是脱离了闭包这个类
Book.prototype = {
    // 静态共有属性和方法
    isJSBook : false,
    display:function(){}
}


// 在闭包内部实现一个完整的类，然后将其返回
var Book = (function(){
    // 静态私有变量、方法
    var bookNum = 0
    function checkBook(name){}
    // 创建类
    function _book(newId,newName,newPrice){
        // 私有变量、方法
        var name,price
        function checkBook(id){}
        // 特权方法
        this.setName = function(){}
        this.setPrice = function(){}
        this.getPrice = function(){}
        this.getName = function(){}
        // 共有属性、方法
        this.id = newId
        this.copy = function(){}
        bookNum++
        // 构造器
        this.setName(name)
        this.setPrice(price)
    }
    _book.prototype = {
        // 静态共有属性和方法
        isJSBook : false,
        display:function(){}
    }
    return _book
})()



/*
    创建对象的安全模式
*/
var Book = function(title,time,type){
    this.title = title
    this.time = time
    this.type = type
}
// 这里应该使用new（new关键字的作用：对当前对象this赋值😅）
var book = Book("javascript","2020","js")
console.log(book)  // undefined
console.log(window.title)
console.log(window.time)

// 安全模式下创建对象（解决忘记写new的问题）
var Book = function(title,time,type){
    if(this instanceof Book){
        this.title = title
        this.time = time
        this.type = type
    }else{
        return new Book(title,time,type)
    }
}




/*
    1、类式继承：将父类的实例赋值给子类的原型
    通过子类的原型prototype对父类实例化来实现

    类式继承的缺点：
    （1）影响父类中引用类型的共享属性的属性值
    （2）创建父类的时候，无法向父类传递参数
*/ 
function Super(){
    this.value = true
}
Super.prototype.getSuperValue = function(){
    return this.value
}
function Child(){
    this.value = false
}
// 继承父类（！！！！！！同时具有父类构造函数和原型中的属性和方法）
Child.prototype = new Super()
Child.prototype.getChildValue = function(){
    return this.value
}
var instance = new Child()
console.log(instance.getSuperValue())
console.log(instance.getChildValue())
// 判断前者是否是后者的实例，
console.log(instance instanceof Super)
console.log(instance instanceof Child)
console.log(Child instanceof Super) // false
console.log(Child.prototype instanceof Super)



/*
    2、构造函数继承：通过在子类的构造函数中执行一次父类的构造函数实现
    缺点：父类的原型方法不会被继承，如果想要被继承就要放到构造函数中
*/
function Super(id){
    // 引用类型共享属性
    this.books = ["js","html","css"]
    // 值类型共享属性
    this.id = id
}
Super.prototype.showBooks = function(){
    console.log(this.books);
}
function Child(id){
    // 继承父类(!!!!!!)
    Super.call(this,id)
}
var ins1 = new Child(10)
var ins2 = new Child(11)
ins1.books.push("设计模式")
console.log(ins1.books);
console.log(ins1.id);
// 这里books值没有被改变
console.log(ins2.books);
console.log(ins2.id);



/*
    3、组合式继承：通过原型prototype继承方法，通过构造函数继承属性

    缺点：父类构造函数调用了两遍
    问题：子类不是父类的实例，子类的原型对象是父类的实例
*/
function Super(name){
    // 引用类型共享属性
    this.books = ["js","html","css"]
    // 值类型共享属性
    this.name = name
}
Super.prototype.getName = function(){
    console.log(this.name);
}
function Child(name,time){
    // 构造函数继承属性
    Super.call(this,name)
    this.time = time
}
// 原型prototype继承方法
Child.prototype = new Super()
Child.prototype.getTime = function(){
    console.log(this.time);
}


/*
    4、原型式继承 Object.create()由来
    其实是对类式继承的封装（类式继承的缺点原型式继承也有）
*/
function inheritObject(o){
    function F(){}
    F.prototype = o
    return new F()
}

/*
    5、寄生式继承（对原型式继承的二次封装）
*/
var book = {
    name:"js book",
    sameBook:["css book","html book"]
}
function createBook(obj){
    // 通过原型继承方式创建新对象
    var o = inheritObject(obj)
    o.getName = function(){
        console.log(name);
    }
    return o
}

/*
    6、寄生组合式继承
    解决组合式继承问题：子类不是父类的实例，子类的原型对象是父类的实例
*/
function inheritPrototype(child, parent){
    var p = inheritObject(parent.prototype)
    // var p = Object.create(parent.prototype)
    // ！！！！修正因重写子类原型导致子类的constructor属性被修改
    p.constructor = child
    child.prototype = p
}
function Super(name){
    this.name = name
    this.colors = ["red","blue","green"]
}
Super.prototype.getName = function(){
    console.log(this.name);
}
function Child(name,time){
    // 构造函数式继承
    Super.call(this,name)
    this.time = time
}
// 寄生式继承父类原型
inheritPrototype(Child,Super)
Child.prototype.getTime = function(){
    console.log(this.time);
}

/*
    7、多继承：深拷贝（递归调用"浅拷贝"）
*/
function deepCopy(parent,child){
    var c = child || {}
    for (var i in parent){
        if (typeof parent[i] === "object"){
            c[i] = (parent[i].constructor === Array) ? []:{}
            deepCopy(parent[i],c[i])
        }else{
            c[i] = parent[i]
        }
    }
    return c
}
/*
    多态：javascript当中要对传入得参数做判断以实现多态
*/