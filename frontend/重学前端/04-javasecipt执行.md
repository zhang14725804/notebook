## JavaScript执行

## Promise里的代码为什么比setTimeout先执行？

一个JavaScript引擎会常驻于内存中，它等待着我们（宿主）把JavaScript代码或者函数传递给它执行。

在ES3和更早的版本中，JavaScript本身还没有异步执行代码的能力，这也就意味着，宿主环境传递给JavaScript引擎一段代码，引擎就把代码直接顺次执行了，这个任务也就是宿主发起的任务。

但是，在ES5之后，JavaScript引入了Promise，这样，不需要浏览器的安排，JavaScript引擎本身也可以发起任务了。

由于我们这里主要讲JavaScript语言，那么采纳JSC引擎的术语，我们把宿主发起的任务称为【宏观任务】，把JavaScript引擎发起的任务称为【微观任务】。


### 宏任务和微任务

JavaScript引擎等待宿主环境分配宏观任务，在操作系统中，通常等待的行为都是一个事件循环，所以在Node术语中，也会把这个部分称为事件循环。

在宏观任务中，JavaScript的Promise还会产生异步代码，JavaScript必须保证这些异步代码在一个宏观任务中完成，因此，每个宏观任务中又包含了一个微观任务队列

有了宏观任务和微观任务机制，我们就可以实现JS引擎级和宿主级的任务了，例如：Promise永远在队列尾部添加微观任务。setTimeout等宿主API，则会添加宏观任务。

### Promise

Promise是JavaScript语言提供的一种标准化的异步管理方式，它的总体思想是，需要进行io、等待或者其它异步操作的函数，不返回真实结果，而返回一个“承诺”，函数的调用方可以在合适的时机，选择等待这个承诺兑现（通过Promise的then方法的回调）

```js
    // 【微任务始终先于宏任务 😅😅 】
    //  a b c
    var r = new Promise(function(resolve, reject){
        console.log("a");
        resolve()
    });
    console.log("b")
    r.then(() => console.log("c"));
    //  a b c d
    var r = new Promise(function(resolve, reject){
        console.log("a");
        resolve()
    });
    setTimeout(()=>console.log("d"), 0)
    r.then(() => console.log("c"));
    console.log("b")

    // c1 c2 d
    setTimeout(()=>console.log("d"), 0)
    var r1 = new Promise(function(resolve, reject){
        resolve()
    });
    r.then(() => { 
        var begin = Date.now();
        while(Date.now() - begin < 1000);
        console.log("c1") 
        new Promise(function(resolve, reject){
            resolve()
        }).then(() => console.log("c2"))
    });

    //  a b c
    function sleep(duration) {
        return new Promise(function(resolve, reject) {
            console.log("b");
            setTimeout(resolve,duration);
        })
    }
    console.log("a");
    sleep(5000).then(()=>console.log("c"));
```


## 闭包和执行上下文到底是怎么回事？

    闭包；
    作用域链；
    执行上下文；
    this值。

### 闭包

闭包其实只是一个绑定了执行环境的函数

### 执行上下文

JavaScript标准把一段代码（包括函数），执行所需的所有信息定义为：“执行上下文”。

在只有var，没有let的旧JavaScript时代，诞生了一个技巧，叫做：立即执行的函数表达式（IIFE），通过创建一个函数，并且立即执行，来构造一个新的域，从而控制var的范围。


## 你知道现在有多少种函数吗？

    第一种，普通函数：用function关键字定义的函数。
    第二种，箭头函数：用 => 运算符定义的函数。
    第三种，方法：在class中定义的函数。
    第四种，生成器函数：用function * 定义的函数。
    第五种，类：用class定义的类，实际上也是函数。
    第六/七/八种，异步函数：普通函数、箭头函数和生成器函数加上async关键字。


### this

调用函数时使用的引用，决定了函数执行时刻的this值。

- 操作this的内置函数（call、apply、bind）


## try里面放return，finally还会执行吗？

```js
// a 0
function foo(){
  try{
    return 0;
  } catch(err) {

  } finally {
    console.log("a")
  }
}

console.log(foo());

// 1。finally中的return “覆盖”了try中的return
function foo(){
  try{
    return 0;
  } catch(err) {

  } finally {
    return 1;
  }
}

console.log(foo());
```

### Completion Record （😅😅😅） 表示一个语句执行完之后的结果，它有三个字段：

    [[type]] 表示完成的类型，有break continue return throw和normal几种类型；
    [[value]] 表示语句的返回值，如果语句没有，则是empty；
    [[target]] 表示语句的目标，通常是一个JavaScript标签（标签在后文会有介绍）。

### 语句分类

    普通语句
    语句块
    控制型语句
    带标签的语句