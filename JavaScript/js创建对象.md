###javascript如何创建对象
####1、工厂模式
```
function createPerson(name,age,job) {
  var o = new Object();
  o.name = name;
  o.age = age;
  o.job = job;
  o.sayName=function(){
    console.log(this.name)
  };
  return o;
}

var person1=createPerson('John',22,'doctor');
var person2=createPerson('Geo',32,'famer');
```
* 缺点：无法识别对象类型

####2、构造函数模式
```
function Person(name,age,job){
  this.name=name;
  this.age=age;
  this.job=job;
  this.sagName=function(){
    console.log(this.name)
  }
}
var person1=new Person('John',22,'doctor');
var person2=new Person('Geo',32,'famer');
```
对比工厂模式，存在以下不同之处：
* 没有显示的创建对象
* 直接将属性和方法复制给了this对象
* 没有return语句 

new Person经历以下四个步骤：
* 创建一个新对象
* 将构造函数的作用域赋值给新对象（this指向这个新对象）
* 执行构造函数中的代码
* 返回新对象

缺点：每个方法都要在每个实例上重新创建一遍

####3、原型模式（原型对象）
```
function Person(){}

Person.prototype={
  constructor:person,
  name:'NIcholas',
  age:'29',
  job:'Soft Engineer',
  friends:['Wolker','Shelly'],
  sayName:function(){
    console.log(this.name)
  }
}

var person1=new Person();
var person2=new Person();
```
缺点：初始化参数和引用类型属性

####4、组合使用构造函数模式和原型模式
```
function Person(name,age,job){
  this.name=name;
  this.age=age;
  this.job=job;
  this.friends=['Wolker','Shelly']
}
Person.prototype={
  constructor:Person,
  sayName:function(){
    console.log(this.name)
  }
}
var person1=new Person('John',22,'doctor');
var person2=new Person('Geo',32,'famer');
```

####5、动态原型模式
(检查某个应该存在的方法是否有效，来决定是否需要初始化原型)
```
function Person(name,age,job){
  this.name=name;
  this.age=age;
  this.job=job;
  //初次调用构造函数的时候才会执行
  if(typeof this.sayName!='function'){
    Person.prototype.sayName=function(){
      console.log(this.name)
    }
  }
}
```

####6、寄生构造函数模式
创建一个函数，该函数的作用仅仅是封装创建对象的代码，然后再返回新创建的对象.除了用new操作符和把包装函数叫做构造函数之外，此模式和工厂模式一模一样
```
function Person(name,age,job) {
  var o = new Object();
  o.name = name;
  o.age = age;
  o.job = job;
  o.sayName=function(){
    console.log(this.name)
  };
  return o;
}

var person1=new Person('John',22,'doctor');
var person2=new Person('Geo',32,'famer');
```

####7、稳妥构造函数模式
(1)没有公共属性
(2)其方法不引用this的对象
```
function Person(name,age,job){
  //创建要返回的对象
  var o = new Object();
  //可以在这里定义私有变量和方法
  //添加方法
  o.sayName=function(){
    console.log(name)
  }
  return o;
}
var person1=Person('John',22,'doctor');
```