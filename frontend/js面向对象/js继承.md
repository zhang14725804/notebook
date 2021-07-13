###javascript继承
####1、原型链继承
```
function SuperType(){
  this.property=true;
}
SuperType.prototype.getSuperValue=function(){
  return this.property;
}
function SubType(){
  this.subproperty=false;
}
//继承了SuperType
SubType.prototype=new SuperType()
//必须在用SuperType的实例替换原型之后，在定义这两个方法
SubType.prototype.getSubValue=function(){
  return this.subproperty;
}
//通过原型链继承时，不能使用对象字面量创建原型方法（重写原型链）
var instance=new SubType()
console.log(instance.getSuperValue())
```
* 缺点：
   (1)包含引用类型值得原型
   (2)创建子类实例时，不能向超类的构造函数中传递参数

####2、借用构造函数(伪造对象或者经典继承)
```
function SuperType(){
  this.colors=['red','blue','green']
}

function SubType(){
  //继承了SuperType,,同时还可以传递参数
  SuperType.call(this)
}

var instance1=new SubType()
instance1.colors.push('black')
console.log(instance1.colors)

//解决了引用类型值的问题
var instance2=new SubType()
console.log(instance2.colors)
```
* 方法都在构造函数中定义，因此函数复用就无法谈起

####3、组合继承
```
function SuperType(name){
  this.name=name;
  this.colors=['red','blue']
}

SuperType.prototype.sayName=function(){
  console.log(this.name)
}

function SubType(name,age){
  //继承属性
  SuperType.call(this,name);
  this.age=age;
}
//继承方法
SubType.prototype=new SuperType();
SubType.prototype.constructor=SubType;

SubType.prototype.sayAge=function(){
  console.log(this.age)
}

var instance1=new SubType('Nicholas',29)
console.log(instance1.colors)
instance1.sayAge()
instance1.sayName()
```

####4、原型式继承（浅复制）
只想让一个对象与另一个对象保持类似的情况下，可以使用原型是继承；包含引用类型值得属性所存在的问题无法避免。ECMAScript5新增**Object.create方法**规范了原型式继承
```
function object(o){
  function F(){};
  F.prototype=o;
  return new F()
}
var person={
  name:'Nicholas',
  friends:['Shelly','Vans']
}
var anotherPerson=object(person)
anotherPerson.name='Greg';
anotherPerson.friends.push('Rob')
```

####5、寄生式继承
创建一个用于封装继承过程的函数，该函数内部使用某种方式增强对象
```
function createAnother(original){
  var clone=Object.create(original)
  clone.sayName=fucntion(){
    console.log('name')
  }
  return clone;
}
```

####寄生组合式继承
```
//组合继承
function SuperType(name){
  this.name=name;
  this.colors=['red','blue'];
}

SuperType.prototype.sayName=fucntion(){
  console.log(this.name)
}

function SubType(name,age) {
  //第二次调用SuperType()
  SuperType.call(this,name);
  this.age=age;
}
//第一次调用SuperType()
SubType.prototype=new SuperType();
SubType.prototype.constructor=SubType;
SubType.prototype.sayAge=function() {
  console.log(this.age)
}
//寄生式组合继承
通过借用构造函数继承属性，通过原型链来继承方法；不必为了指定子类的原型而调用超类的构造函数，我们需要的只是超类型原型的一个副本
function inheritPrototype(subType,superType){
  var prototype=Object.create(superType.prototype);
  prototype.constructor=subType;
  subType.prototype=prototype
}

function SuperType(name){
  this.name=name;
  this.colors=['red','blue'];
}

SuperType.prototype.sayName=fucntion(){
  console.log(this.name)
}

function SubType(name,age) {
  //继承属性
  SuperType.call(this,name);
  this.age=age;
}
//继承方法
inheritPrototype(SubType,SuperType)

SubType.prototype.sayAge=function() {
  console.log(this.age)
}
```