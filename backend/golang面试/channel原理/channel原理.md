## channel

    从一个关闭的 channel 仍然能读出数据吗
    channel应用场景
    如何优雅的关闭channel
    channel什么情况引起资源泄露
    什么事CSP
    channel底层数据结构
    channel发送接受本质
    channel的happend-before有哪些
    向channel发送数据的过程
    从channel接受数据的过程
    操作channel情况总结
    关闭一个channel的过程

### 从一个关闭的 channel 仍然能读出数据吗（有无缓冲都一样？）

从一个有缓冲的 channel 里读数据，当 channel 被关闭，依然能读出有效值。只有当返回的 ok 为 false 时，读出的数据才是无效的。


```go
func main() {
    // 有缓冲
	ch := make(chan int, 5)
	ch <- 18
	close(ch)
	x, ok := <-ch
	if ok {
		fmt.Println("received: ", x)
	}

	x, ok = <-ch
	if !ok {
		fmt.Println("channel closed, data invalid.")
    }

    // 无缓冲，直接写、关闭
    ch := make(chan int, 5)
    // fatal error: all goroutines are asleep - deadlock!
    ch <- 18
    close(ch)
    
	x, ok := <-ch
	if ok {
		fmt.Println("received: ", x)
	}
}

func main() {
    // 无缓冲，在goroutine中写、关闭
	ch := make(chan int)
	go func() {
		fmt.Println("开始写")
		ch <- 1
		close(ch)
		fmt.Println("关闭")
	}()
	fmt.Println("读数据")
	for i := 0; i < 5; i++ {
        // 关闭之后false
		v, ok := <-ch
		fmt.Println(v, ok)
	}
}
```

### channel应用场景

    停止信号
    任务定时（结合timer）:超时控制；定期执行某个任务。
    解耦生产者与消费者
    控制并发数

### 如何优雅的关闭channel（ question  😏😏😏）

关于 channel 的使用，有几点不方便的地方：

1. 在不改变 channel 自身状态的情况下，无法获知一个 channel 是否关闭。
2. 关闭一个 closed channel 会导致 panic。所以，如果关闭 channel 的一方在不知道 channel 是否处于关闭状态时就去贸然关闭 channel 是很危险的事情。
3. 向一个 closed channel 发送数据会导致 panic。所以，如果向 channel 发送数据的一方不知道 channel 是否处于关闭状态时就去贸然向 channel 发送数据是很危险的事情。

关闭 channel 的原则：

1. don't close a channel from the receiver side and don't close a channel if the channel has multiple concurrent senders.（不要从一个 receiver 侧关闭 channel，也不要在有多个 sender 时，关闭 channel。）

2. don't close (or send values to) closed channels.


有两个不那么优雅地关闭 channel 的方法：

1. 使用 defer-recover 机制，放心大胆地关闭 channel 或者向 channel 发送数据。即使发生了 panic，有 defer-recover 在兜底。
2. 使用 sync.Once 来保证只关闭一次。

根据 sender 和 receiver 的个数，分下面几种情况：

    一个 sender，一个 receiver
    一个 sender， M 个 receiver
    N 个 sender，一个 reciver
    N 个 sender， M 个 receiver


对于 1，2，只有一个 sender 的情况就不用说了，直接从 sender 端关闭就好了，没有问题。重点关注第 3，4 种情况。

第 3 种情形下，优雅关闭 channel 的方法是：the only receiver says "please stop sending more" by closing an additional signal channel。解决方案就是增加一个传递关闭信号的 channel，receiver 通过信号 channel 下达关闭数据 channel 指令。senders 监听到关闭信号后，停止接收数据。

第 4 种情形下，优雅关闭 channel 的方法是：any one of them says "let's end the game" by notifying a moderator to close an additional signal channel。

和第 3 种情况不同，这里有 M 个 receiver，如果直接还是采取第 3 种解决方案，由 receiver 直接关闭 stopCh 的话，就会重复关闭一个 channel，导致 panic。因此需要增加一个中间人，M 个 receiver 都向它发送关闭 dataCh 的“请求”，中间人收到第一个请求后，就会直接下达关闭 dataCh 的指令（通过关闭 stopCh，这时就不会发生重复关闭的情况，因为 stopCh 的发送方只有中间人一个）。另外，这里的 N 个 sender 也可以向中间人发送关闭 dataCh 的请求。


### channel 在什么情况下会引起资源泄漏

泄漏的原因是 goroutine 操作 channel 后，处于发送或接收阻塞状态，而 channel 处于满或空的状态，一直得不到改变。同时，垃圾回收器也不会回收此类资源，进而导致 gouroutine 会一直处于等待队列中，不见天日。

另外，程序运行过程中，对于一个 channel，如果没有任何 goroutine 引用了，gc 会对其进行回收操作，不会引起内存泄漏。

### 什么是CSP

    Do not communicate by sharing memory; instead, share memory by communicating.

大多数的编程语言的并发编程模型是基于线程和内存同步访问控制，Go 的并发编程的模型则用 goroutine 和 channel 来替代。Goroutine 和线程类似，channel 和 mutex (用于内存同步访问控制)类似。

### channel 底层的数据结构（ question 😏😏😏）

```golang
type hchan struct {
    // chan 里元素数量
    qcount   uint
    // chan 底层循环数组的长度
    dataqsiz uint
    // 😏 指向底层循环数组的指针
    // 只针对有缓冲的 channel
    buf      unsafe.Pointer
    // chan 中元素大小
    elemsize uint16
    // chan 是否被关闭的标志
    closed   uint32
    // chan 中元素类型
    elemtype *_type // element type
    // 😏 已发送元素在循环数组中的索引
    sendx    uint   // send index
    // 😏 已接收元素在循环数组中的索引
    recvx    uint   // receive index
    // 😏 等待接收的 goroutine 队列
    recvq    waitq  // list of recv waiters
    // 😏 等待发送的 goroutine 队列
    sendq    waitq  // list of send waiters

    // 😏 保护 hchan 中所有字段
    lock mutex
}

// waitq 是 sudog 的一个双向链表，而 sudog 实际上是对 goroutine 的一个封装
type waitq struct {
    first *sudog
    last  *sudog
}
```


我们可以创建一个只发送或只接收的通道，但是这种通道创建出来后，怎么使用呢？一个只能发的通道，怎么接收呢？同样，一个只能收的通道，如何向其发送数据呢？

```go
// 创建的 chan 是一个指针.所以我们能在函数间直接传递 channel，而不用传递 channel 的指针。
func makechan(t *chantype, size int64) *hchan
```

### channel 发送和接收元素的本质是什么(😏)

channel 的发送和接收操作本质上都是 “值的拷贝”，无论是从 sender goroutine 的栈到 chan buf，还是从 chan buf 到 receiver goroutine，或者是直接从 sender goroutine 到 receiver goroutine

```go
type user struct {
	name string
	age  int8
}

var u = user{name: "Ankur", age: 25}
var g = &u

func modifyUser(pu *user) {
	fmt.Println("modifyUser Received Vaule", pu)
	pu.name = "Anand"
}

func printUser(u <-chan *user) {
	time.Sleep(2 * time.Second)
	fmt.Println("printUser goRoutine called", <-u)
}

func main() {
	c := make(chan *user, 5)
	c <- g
	fmt.Println(g)
	// 修改g
	g = &user{name: "Ankur Anand", age: 100}
	go printUser(c)
	go modifyUser(g)
	time.Sleep(5 * time.Second)
	fmt.Println(g)
}
```

### 关于 channel 的 happened-before 有哪些( 没懂 😏😏😏)

### 向 channel 发送数据的过程是怎样的( question question question  源码 😏😏😏)

### 从 channel 接收数据的过程是怎样的( question question question 源码 😏😏😏)

### 操作 channel 的情况

发生【panic】 的情况有三种：

1. 向一个关闭的 channel 进行写操作；
2. 关闭一个 nil 的 channel；
3. 重复关闭一个 channel。


读、写一个 nil channel 都会被【阻塞】

### 关闭一个 channel 的过程（ question question question 😏）



### 参考

[channel](https://qcrao91.gitbook.io/go/channel)