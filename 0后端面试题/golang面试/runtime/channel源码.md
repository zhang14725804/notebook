## channel

    不要通过共享内存来通信，而是通过通信来实现内存共享

### 1.what

channel 的关键字为 chan，数据流向的表现方式为 <-，代码解释方向是从左到右，据此就能明白通道的数据流转方向

```golang
func main() {
	ch := make(chan string)
	go func() {
		ch <- "fuck"
	}()
	msg := <-ch
	Println(msg)
}
```

channel 共有两种模式，分别是：**双向和单向**。channel 中还分为 【无缓冲 channel】 和 【缓冲 channel】

若缓冲区未满则不会阻塞，会源源不断的进行传输。当缓冲区满了后，发送者就会阻塞并等待。而当缓冲区为空时，接受者就会阻塞并等待，直至有新的数据

###  2.channel本质

channel本质是什么，怎么实现的跨 goroutine 通信，数据结构又是什么，两者又如何实现数据传输的

本质上 channel 是有锁的环形队列。其包含发送方队列、接收方队列，加上互斥锁 mutex 等结构

```golang
// src/runtime/chan.go
type hchan struct {
    qcount   uint           // 队列中的元素总数量。
    dataqsiz uint           // 循环队列的长度。
    buf      unsafe.Pointer // 指向长度为 dataqsiz 的底层数组，仅有当 channel 为缓冲型的才有意义。
    elemsize uint16         // 能够接受和发送的元素大小。
    closed   uint32         // 是否关闭。
    elemtype *_type         // 能够接受和发送的元素类型。
    sendx    uint           // 已发送元素在循环队列中的索引位置。
    recvx    uint           // 已接收元素在循环队列中的索引位置。
    recvq    waitq          // (双向链表结构)接受者的 sudog 等待队列（缓冲区不足时阻塞等待的 goroutine）。
    sendq    waitq          // (双向链表结构)发送者的 sudog 等待队列。

    lock mutex
}
```

###  3.channel原理（创建、发送、接收、关闭四大操作入手）

- 创建

makechan 方法的逻辑比较简单，就是创建 hchan 并分配合适的 buf 大小的堆上内存空间

channel 的创建都是调用的 mallocgc 方法，也就是 channel 都是创建在堆上的。因此 channel 是会被 GC 回收的，自然也不总是需要 close 方法来进行显示关闭了

- 发送

前置判断和处理 --> 加互斥锁 --> 直接发送/缓冲发送 --> 阻塞发送

- 接收

前置判断和处理 -->  直接接收/缓冲接收 --> 阻塞接收

- 关闭

前置处理保证边界 --> 释放接收方 --> 释放发送方 --> 协程调度

- send/recv


### 总结

在具体的数据传输上，都是围绕着 “边界上下限处理，上互斥锁，阻塞/非阻塞，缓冲/非缓冲，缓存出队列，拷贝数据，解互斥锁，协程调度” 在不断地流转处理。在基本逻辑上也是相对重合的，因为发送和接收，创建和关闭总是相对的

参考：

[channel源码分析](https://mp.weixin.qq.com/s/_mOOGOEhc8w7sbMaFuZV5w)