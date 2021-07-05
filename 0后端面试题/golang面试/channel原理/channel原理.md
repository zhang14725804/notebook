## channel

### 从一个关闭的 channel 读数据

### channel应用场景

    （1）停止信号
    （2）任务定时（结合timer）
    （3）解耦生产者与消费者
    （4）控制并发数

### 如何优雅的关闭channel（😏😏😏）

    （1）在不改变 channel 自身状态的情况下，无法获知一个 channel 是否关闭。
    （2）关闭一个 closed channel 会导致 panic。所以，如果关闭 channel 的一方在不知道 channel 是否处于关闭状态时就去贸然关闭 channel 是很危险的事情。
    （3）向一个 closed channel 发送数据会导致 panic。所以，如果向 channel 发送数据的一方不知道 channel 是否处于关闭状态时就去贸然向 channel 发送数据是很危险的事情。

根据 sender 和 receiver 的个数，分下面几种情况：

    一个 sender，一个 receiver
    一个 sender， M 个 receiver
    N 个 sender，一个 reciver
    N 个 sender， M 个 receiver


don't close a channel from the receiver side and don't close a channel if the channel has multiple concurrent senders.

don't close (or send values to) closed channels.


### channel 在什么情况下会引起资源泄漏

### 什么是CSP

    Do not communicate by sharing memory; instead, share memory by communicating.


### channel 底层的数据结构（😏😏😏）

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

### channel 发送和接收元素的本质是什么(😏)

channel 的发送和接收操作本质上都是 “值的拷贝”，无论是从 sender goroutine 的栈到 chan buf，还是从 chan buf 到 receiver goroutine，或者是直接从 sender goroutine 到 receiver goroutine

### 关于 channel 的 happened-before 有哪些(😏😏😏)

### 向 channel 发送数据的过程是怎样的(😏😏😏)

### 从 channel 接收数据的过程是怎样的(😏😏😏)

### 操作 channel 的情况

发生【panic】 的情况有三种：

    向一个关闭的 channel 进行写操作；
    关闭一个 nil 的 channel；
    重复关闭一个 channel。


读、写一个 nil channel 都会被【阻塞】

### 关闭一个 channel 的过程（😏）



### 参考

[channel原理](https://qcrao91.gitbook.io/go/channel/cong-yi-ge-guan-bi-de-channel-reng-ran-neng-du-chu-shu-ju-ma)