####Understanding process.nextTick()
http://howtonode.org/understanding-process-next-tick
破题、承题、起讲、入手、起股、中股、后股、束股
<font color="#e85274">HEADS UP! This article was written for an older version of node. More up-to-date information may be available elsewhere.</font>
#####1、破题
I have seen quite a few people being confused about process.nextTick(). Let's take a look at what process.nextTick() does, and when to use it.
很多人搞不懂process.nextTick（我也搞不懂），一起看看process.nextTick干了些什么、如何使用它

As you might already know, every Node application runs on a single thread. What this means is that apart from I/O - at any time, only one task/event is processed by Node's event loop. You can imagine this event loop to be a queue of callbacks that are processed by Node on every tick of the event loop. So, even if you are running Node on a multi-core machine, you will not get any parallelism in terms of actual processing - all events will be processed only one at a time. This is why Node is a great fit for I/O bound tasks, and definitely not for CPU intensive tasks. For every I/O bound task, you can simply define a callback that will get added to the event queue. The callback will fire when the I/O operation is done, and in the mean time, the application can continue to process other I/O bound requests.

众所周知，每个Node应用程序都在一个线程上运行。 这意味着除了I / O之外 - 在任何时候，Node的事件循环只处理一个任务/事件。 你可以将此事件循环想象成一个回调队列，由Node在事件循环的每个tick上处理。 因此，即使您在多核计算机上运行Node，也不会在实际处理方面获得任何并行性 - 所有事件将一次只处理一个。 这就是Node非常适合I / O绑定任务的原因，绝对不适合CPU密集型任务。 对于每个I / O绑定任务，只需定义一个将添加到事件队列的回调。 I / O操作完成后将触发回调，同时应用程序可以继续处理其他I / O绑定请求。

#####2、承题
Given this model, what process.nextTick() actually does is defer the execution of an action till the next pass around the event loop. Let's take a simple example. If we had a function foo() which we wanted to invoke in the next tick, this is how we do it:

鉴于此模型，process.nextTick（）实际上做的是将动作的执行推迟到事件循环的下一次传递
If you ran the above snippet, you will notice that bar will be printed in your console before foo, as we have delayed the invokation of foo() till the next tick of the event loop:
```
function foo() {
    console.error('foo');
}
process.nextTick(foo);
console.error('bar');

bar
foo
```
#####3、起讲
<font color="blue">In fact, you can get the same result by using setTimeout() this way:</font>
```
setTimeout(foo, 0);
console.log('bar');
```
However, process.nextTick() is not just a simple alias to setTimeout(fn, 0) - it's far more efficient(效率更高).

More precisely, process.nextTick() defers the function until a completely new stack. You can call as many functions as you want in the current stack. The function that called nextTick has to return, as well as its parent, all the way up to the root of the stack. Then when the event loop is looking for a new event to execute, your nextTick'ed function will be there in the event queue and execute on a whole new stack.

更准确地说，process.nextTick（）将函数推迟到一个全新的堆栈。 你可以在当前堆栈中调用任意数量的函数。 调用nextTick的函数以及它的父函数必须一直返回到堆栈的根目录。 然后，当事件循环正在寻找要执行的新事件时，调用nextTick的函数将存在于事件队列中并在整个新堆栈上执行。

#####4、入手
Let's see where we can use process.nextTick()
**Interleaving execution of a CPU intensive task with other events(交叉执行CPU密集型任务与其他事件)**

Let's say we have a task compute() which needs to run almost continuously, and does some CPU intensive calculations. If we wanted to also handle other events, like serving HTTP requests in the same Node process, we can use process.nextTick() to interleave the execution of compute() with the processing of requests this way:

假设我们有一个任务compute（），它需要几乎连续运行，并进行一些CPU密集型计算。 如果我们还想处理其他事件，比如在同一个Node进程中提供HTTP请求，我们可以使用process.nextTick（）来交错执行compute（）和处理请求：
```
var http = require('http');

function compute() {
    // performs complicated calculations continuously
    // ...
    process.nextTick(compute);
}

http.createServer(function(req, res) {
     res.writeHead(200, {'Content-Type': 'text/plain'});
     res.end('Hello World');
}).listen(5000, '127.0.0.1');

compute();
```
In this model, instead of calling compute() recursively, we use process.nextTick() to delay the execution of compute() till the next tick of the event loop. By doing so, we ensure that if any other HTTP requests are queued in the event loop, they will be processed before the next time compute() gets invoked. If we had not used process.nextTick() and had simply called compute() recursively, the program would not have been able to process any incoming HTTP requests. Try it for yourself!

在这个模型中，我们不是递归地调用compute（），而是使用process.nextTick（）来延迟compute（）的执行，直到事件循环的下一个tick为止。 通过这样做，我们确保如果任何其他HTTP请求在事件循环中排队，它们将在下次调用compute（）之前被处理。 如果我们没有使用process.nextTick（）并且只是递归调用compute（），那么程序将无法处理任何传入的HTTP请求。(阻塞线程？)

So, alas, we don't really get any magical multi-core parallelism benefits by using process.nextTick(), but we can still use it to share CPU usage between different parts of our application.

通过使用process.nextTick（），我们并没有真正获得任何神奇的多核并行性优势，但我们仍然可以使用它来共享应用程序不同部分之间的CPU使用率。

#####5、起股
**Keeping callbacks truly asynchronous**
When you are writing a function that takes a callback, you should always ensure that this callback is fired asynchronously. Let's look at an example which violates this convention:
在编写需要回调的函数时，应始终确保以异步方式触发此回调。 让我们看一个违反这个约定的例子：
```
function asyncFake(data, callback) {        
    if(data === 'foo') callback(true);
    else callback(false);
}

asyncFake('bar', function(result) {
    // this callback is actually called synchronously!
});
```
Why is this inconsistency bad? Let's consider this example taken from Node's documentation:
```
var client = net.connect(8124, function() { 
    console.log('client connected');
    client.write('world!\r\n');
});
```
In the above case, if for some reason, net.connect() were to become synchronous, the callback would be called immediately, and hence the client variable will not be initialized when the it's accessed by the callback to write to the client!

在上面的例子中，如果由于某种原因，net.connect（）变为同步，则会立即调用回调，因此当回调访问客户端变量以写入客户端时，客户端变量将不会被初始化！

We can correct asyncFake() to be always asynchronous this way:
```
function asyncReal(data, callback) {
    process.nextTick(function() {
        callback(data === 'foo');       
    });
}
```
#####6、中股
**When emitting events**
Let's say you are writing a library that reads from a source and emits events that contains the chunks that are read. Such a library might look like this:

假设您正在编写一个从源读取的库，并发出包含所读取块的事件。 这样的库可能看起来像这样：
```
var EventEmitter = require('events').EventEmitter;

function StreamLibrary(resourceName) { 
    this.emit('start');

    // read from the file, and for every chunk read, do:        
    this.emit('data', chunkRead);       
}
StreamLibrary.prototype.__proto__ = EventEmitter.prototype;   // inherit from EventEmitter
```
Let's say that somewhere else, someone is listening to these events:
```
var stream = new StreamLibrary('fooResource');

stream.on('start', function() {
    console.log('Reading has started');
});

stream.on('data', function(chunk) {
    console.log('Received: ' + chunk);
});
```

In the above example, the listener will never get the start event as that event would be emitted by StreamLibrary immediately during the constructor call. At that time, we have not yet assigned a callback to the start event yet. Therefore, we would never catch this event! Once again, we can use process.nextTick() to defer the emit till the listener has had the chance to listen for the event.

在上面的示例中，侦听器永远不会获取start事件，因为在构造函数调用期间，StreamLibrary会立即发出该事件。 那时，我们还没有为start事件分配回调。 因此，我们永远不会抓住这个事件！ 再一次，我们可以使用process.nextTick（）来延迟发出，直到监听器有机会监听事件。

```
function StreamLibrary(resourceName) {      
    var self = this;

    process.nextTick(function() {
        self.emit('start');
    });

    // read from the file, and for every chunk read, do:        
    this.emit('data', chunkRead);       
}
```