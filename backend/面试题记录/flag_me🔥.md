
    1.项目中用到的锁
    2.介绍一下线程安全的共享内存方式
    3.介绍一下goroutine
    4.goroutine的自旋占用资源如何解决,gmp
    5.介绍Linux系统信号
    6.goroutine抢占时机,gc栈扫描
    7.Gc触发时机
    8.是否了解其他gc机制
    9.内存管理方式
    10.Channel分配在堆上还是在栈上？哪些对象分配在堆上？哪些对象分配在栈上？
    11.代码效率分析，考虑局部性原理
    12.多核CPU下，cache如何保持一致，不冲突
    13.uint类型溢出
    14.聊聊rune类型
    15.介绍一下channel，有缓冲和无缓冲的区别
    16.channel是否线程安全
    17.介绍一下Mutex的实现,是悲观锁还是乐观锁
    18.Mutex几种模式?
    19.Muxtex可以做自旋锁?
    20.介绍一下RWMutex
    21.介绍一下大对象和小对象，为什么小对象多了会造成gc压力？
    22.介绍项目中遇到的oop情况
    23.介绍项目中遇到的坑
    24.如何指定指令执行的顺序
    25.什么是写屏障、混合写屏障，如何实现？
    26.gc的stw是怎么回事
    27.协程之间是怎么调度的
    28.简单聊聊内存逃逸
    29.为sync.WaitGroup中Wait函数支持 WaitTimeout 功能.
    30.字符串转成byte数组，会发生内存拷贝吗？
    31.http包的内存泄漏
    32.Goroutine调度策略
    33.对已经关闭的的chan进行读写，会怎么样？为什么？
    34.实现阻塞读的并发安全Map
    35.什么是goroutine leak？
    36.data race问题怎么解决？能不能不加锁解决这个问题？
    37.epoll原理
    38.etcd怎么实现分布式锁?
    39.滑动窗口的概念以及应用?
    40.grpc内部原理是什么？
    41.http2的特点是什么,与http1.1的对比。
    42.time.Now有几次系统调用？如何优化
    43.空struct{}是否使用过？会在什么情况下使用，举例说明一下。
    44.聊聊runtime
    45.介绍下你平时都是怎么调试bug以及性能问题的?
    46.通过通信来共享内存，而不是通过共享内存而通信，怎么理解这句话，如何处理共享变量？
    47.chan比mutex更轻么？还有更轻量的方法么？
    48.什么时候用chan不如mutex效率高？

### 1.项目中用到的锁（😅）

### 2.介绍一下线程安全的共享内存方式（并发访问修改变量问题 加锁？）

```golang
// 方法1：多线程共享内存（加锁访问共享内存）
func TestCounterWaitGroup() {
    var mut sync.Mutex //创建锁对象
    var wg sync.WaitGroup
    counter := 0
    for i := 0; i < 5000; i++ {
        wg.Add(1) //每启动一个协程增加一个等待
        go func() {
            defer func() {
                mut.Unlock()//释放锁
            }()
            mut.Lock() //开启锁
            counter++
            wg.Done() //告诉协成等待的事务已经完成
        }()
    }
    wg.Wait() //等待协程
    fmt.Printf("counter = %d", counter)
}

// goroutine+channel 如何实现 😅
```

### 3.介绍一下goroutine（调度原理？）;32.Goroutine调度策略

（1）轻量级线城；Goroutine是Go中最基本的执行单元。事实上每一个Go程序至少有一个Goroutine：主Goroutine。当程序启动时，它会自动创建

（2）创建调度销毁执行都由runtime控制

（3）GMP调度

（4）Go实现了两种并发形式：多线程共享内存（加锁访问共享内存），其实就是Java或者C++等语言中的多线程开发；另外一种是CSP（communicating sequential processes）并发模型（goroutine+channel）。

### 4.goroutine的自旋占用资源如何解决，GMP（😅）

### 6.goroutine抢占时机（系统调用？网络请求？running抢占（死循环）？这些？）

http://xiaorui.cc/archives/6535

### 7.GC触发时机；是否了解其他gc机制（golang、javascript 😅😅😅 ）；21.介绍一下大对象和小对象，为什么小对象多了会造成gc压力？25.什么是写屏障、混合写屏障，如何实现？26.gc的stw是怎么回事

https://wingsxdu.com/post/golang/gc/#gsc.tab=0

[Golang垃圾回收 屏障技术](https://zhuanlan.zhihu.com/p/74853110)

[写屏障技术 !!! ](https://golang.design/under-the-hood/zh-cn/part2runtime/ch08gc/barrier/)

[Golang 混合写屏障原理深入剖析](https://www.huaweicloud.com/articles/9aa423940e224bc6ff57a0c63e2615fa.html)

触发时机：

    超过内存大小阈值
    达到定时时间

常用垃圾回收算法：

    引用计数
    标记清除
    分代搜索

通常小对象过多会导致GC三色法消耗过多的GPU。优化思路是，减少对象分配.

### 9.内存管理方式（😅😅😅）;28.简单聊聊内存逃逸

    堆栈 & 逃逸分析
    分段栈 & 连续栈
    内存结构（内存管理）

### 10.Channel分配在堆上还是在栈上？哪些对象分配在堆上？哪些对象分配在栈上？（ 😅😅😅 ）


### 11.代码效率分析，考虑局部性原理（这什么鬼 ）

### 12.多核CPU下，cache如何保持一致，不冲突（缓存一致性）

https://blog.csdn.net/reliveIT/article/details/50450136

缓存一致性：在多核CPU中，内存中的数据会在多个核心中存在数据副本，某一个核心发生修改操作，就产生了数据不一致的问题。而一致性协议正是用于保证多个CPU cache之间缓存共享数据的一致。

MESI（缓存一致性）协议为了保证多个CPU cache中共享数据的一致性，定义了cache line的四种状态，而CPU对cache的4种操作可能会产生不一致状态，因此cache控制器监听到本地操作和远程操作的时候，需要对地址一致的cache line状态做出一定的修改，从而保证数据在多个cache之间流转的一致性。

### 13.uint类型溢出（ 这是个什么鬼）

### 14.聊聊rune类型

int32的别名，几乎在所有方面等同于int32; **它用来区分字符值和整数值**

go语言的编码是按照UTF-8编码规则来的。UTF-8 顾名思义，是一套以 8 位为一个编码单位的可变长编码。会将一个码位编码为 1 到 4 个字节.

由于编码的原因我们如果按照一个个字节的方式去处理字符串会导致处理规则没办知道是按照一个字节处理、两个字节处理或者三个字节处理，处理不对输出的子字符串可能是乱码。

所以在go语言中引进了rune的概念。在我们对字符串进去处理的时候只需要将字符串通过range去遍历，会按照rune为单位自动去处理

```golang
var str = "go算法"
for k, v := range str {
    fmt.Printf("v type: %T\n；", v)
    fmt.Println(v,k)
}
```

### 15.介绍一下channel，有缓冲和无缓冲的区别; 16.channel是否线程安全(channel源码 😅)

https://www.cyhone.com/articles/analysis-of-golang-channel/

### 17.介绍一下Mutex的实现,是悲观锁还是乐观锁；18.Mutex几种模式？19.Muxtex可以做自旋锁？20.介绍一下RWMutex（Mutex源码 😅）

Mutex锁分为两种模式，正常模式 和 饥饿模式。

正常模式下，对于新来的goroutine而言，它有两种选择，要么抢到了锁，直接执行；要么抢不到锁，追加到阻塞队列尾部，等待被唤醒的。

饥饿模式下，对于新来的goroutine，它只有一个选择，就是追加到阻塞队列尾部，等待被唤醒的。而且在该模式下，所有锁竞争者都不能自旋。


### 22.介绍项目中遇到的oop情况；23.介绍项目中遇到的坑（ 😅😅😅😅😅😅 ）；45.介绍下你平时都是怎么调试bug以及性能问题的?

[面向对象的设计过程](http://tigerb.cn/2019/10/11/oop/)

### 29.为sync.WaitGroup中Wait函数支持 WaitTimeout 功能；31.http包的内存泄漏（之前遇到过 😅）
    
### 30.字符串转成byte数组，会发生内存拷贝吗？

字符串转成切片，会产生拷贝。严格来说，只要是发生类型强转都会发生内存拷贝。那么问题来了。

频繁的内存拷贝操作听起来对性能不大友好。有没有什么办法可以在字符串转成切片的时候不用发生拷贝呢？

https://blog.csdn.net/ilini/article/details/106494054

### 33.对已经关闭的chan进行读写，会怎么样？为什么？

（1）读已经关闭的chan能一直读到东西，但是读到的内容根据通道内关闭前是否有元素而不同。

    如果chan关闭前，buffer内有元素还未读,会正确读到chan内的值，且返回的第二个bool值（是否读成功）为true。
    如果chan关闭前，buffer内有元素已经被读完，chan内无值，接下来所有接收的值都会非阻塞直接成功，返回 channel 元素的零值，但是第二个bool值一直为false。

（2）写已经关闭的chan会panic

### 34.实现阻塞读的并发安全Map（如何实现map，如何实现阻塞读 😅）

https://liyangliang.me/posts/2015/01/concurrent-safe-map-in-golang/


### 35.什么是goroutine leak？

goroutine一致递增，而不退出，不释放资源，就造成了goroutine泄露

[Goroutine Leak和解决之道](https://hoverzheng.github.io/post/technology-blog/go/goroutine-leak%E5%92%8C%E8%A7%A3%E5%86%B3%E4%B9%8B%E9%81%93/)


### 36.data race问题怎么解决？能不能不加锁解决这个问题？(锁或者原子操作)

[Golang 中的 Data Race](https://ms2008.github.io/2019/05/12/golang-data-race/)


### 37.epoll原理(😅😅😅)

[彻底搞懂epoll高效运行的原理](https://mlog.club/article/21483)

[网络轮询器](https://draveness.me/golang/docs/part3-runtime/ch06-concurrency/golang-netpoller/)


### 47.chan比mutex更轻么？还有更轻量的方法么？(原子操作？ 😅) 48.什么时候用chan不如mutex效率高？

[Golang并发：再也不愁选channel还是选锁](https://segmentfault.com/a/1190000017890174)


### 41.http2的特点是什么,与http1.1的对比。(😅)


### 42.time.Now有几次系统调用？如何优化

[一次 Golang 的 time.Now 优化之旅](https://www.purewhite.io/2021/04/29/golang-time-now-optimize/)

### 43.空struct{}是否使用过？会在什么情况下使用，举例说明一下。

【空结构体 struct{} 实例不占据任何的内存空间】

空结构体的作用：

    (1) 实现集合(Set):集合来说，只需要 map 的键，而不需要值
    (2) 不发送数据的信道(channel):有时候使用 channel 不需要发送任何的数据，只用来通知子协程(goroutine)执行任务，或只用来控制协程并发度
    (3) 仅包含方法的结构体

### 44.聊聊runtime

[golang-goroutine](https://draveness.me/golang/docs/part3-runtime/ch06-concurrency/golang-goroutine/)

[深入浅出 Golang Runtime](https://zhuanlan.zhihu.com/p/95056679)

### 5.介绍Linux系统信号（😅😅😅）

http://gityuan.com/2015/12/20/signal/


