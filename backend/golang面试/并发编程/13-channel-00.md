### channal应用场景

**执行业务处理的 goroutine 不要通过共享内存的方式通信，而是要通过 Channel 通信的方式分享数据**

“communicate by sharing memory”和“share memory by communicating”是两种不同的并发处理模式。“communicate by sharing memory”是传统的并发编程处理方式，就是指，共享的数据需要用锁进行保护，goroutine 需要获取到锁，才能并发访问数据。

“share memory by communicating”则是类似于 CSP 模型的方式，通过通信的方式，一个 goroutine 可以把数据的“所有权”交给另外一个 goroutine（虽然 Go 中没有“所有权”的概念，但是从逻辑上说，你可以把它理解为是所有权的转移）。

Channel 的应用场景分为五种类型：

**数据交流**：当作并发的 buffer 或者 queue，解决生产者 - 消费者问题。多个 goroutine 可以并发当作生产者（Producer）和消费者（Consumer）。

**数据传递**：一个 goroutine 将数据交给另一个 goroutine，相当于把数据的拥有权 (引用) 托付出去。

**信号通知**：一个 goroutine 可以将信号 (closing、closed、data ready 等) 传递给另一个或者另一组 goroutine 。

**任务编排**：可以让一组 goroutine 按照一定的顺序并发或者串行的执行，这就是编排的功能。

**锁**：利用 Channel 也可以实现互斥锁的机制。

### channel基本用法

你可以往 Channel 中发送数据，也可以从 Channel 中接收数据，所以，Channel 类型分为**只能接收、只能发送、既可以接收又可以发送**三种类型。

**这个箭头总是射向左边的，元素类型总在最右边。如果箭头指向 chan，就表示可以往 chan 中塞数据；如果箭头远离 chan，就表示 chan 会往外吐数据**
```golang
chan string // 可以发送接收string
chan<- struct{} // 只能发送struct{}
<-chan int // 只能从chan接收int
```

<-”有个规则，总是尽量和左边的 chan 结合（The <- operator associates with the leftmost chan possible:）
```golang
chan<- （chan int） // <- 和第一个chan结合
chan<- （<-chan int） // 第一个<-和最左边的chan结合，第二个<-和左边第二个chan结合
<-chan （<-chan int） // 第一个<-和最左边的chan结合，第二个<-和左边第二个chan结合 
chan (<-chan int) // 因为括号的原因，<-和括号内第一个chan结合
```

通过 make，我们可以初始化一个 chan，未初始化的 chan 的零值是 nil。你可以设置它的容量，比如下面的 chan 的容量是 9527，我们把这样的 chan 叫做 buffered chan；如果没有设置，它的容量是 0，我们把这样的 chan 叫做 unbuffered chan

```golang
make(chan int, 9527)
```

**nil 是 chan 的零值，是一种特殊的 chan，对值是 nil 的 chan 的发送接收调用者总是会阻塞**

- 基本操作
```golang
// 发送数据
ch <- 2000

// 接收数据
x := <-ch // 把接收的一条数据赋值给变量x
foo(<-ch) // 把接收的一个的数据作为参数传给函数
<-ch // 丢弃接收的一条数据

// close、cap、len

func main() {
    var ch = make(chan int, 10)
    for i := 0; i < 10; i++ {
        select {
        case ch <- i:
        case v := <-ch:
            fmt.Println(v)
        }
    }
}

for v := range ch {
    fmt.Println(v)
}
// 或者是忽略读取的值，只是清空 chan：
for range ch {
}
```

### channel实现原理（TODO 重点）

### 使用 Channel 容易犯的错误

    close 为 nil 的 chan；
    send 已经 close 的 chan；
    close 已经 close 的 chan。