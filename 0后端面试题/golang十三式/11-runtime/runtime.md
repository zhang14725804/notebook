## runtime

    Goroutine
    内存分配
    GC原理
    channel原理


## Goroutine

    Goroutine
    GMP调度模型
    work-stealing调度算法


### goroutine 和 thread的区别

    内存占用
    创建、销毁
    调度切换（前者runtime调度，后者由内核调度）
    复杂性


### M:N模型

用户态线程和内核态线程的映射关系；go中M个线程对应N个goroutine映射

【同一个时刻，一个线程只能跑一个 goroutine】。当 goroutine 发生阻塞(chan阻塞、mutext、syscall 等等)时，Go 会把当前的 goroutine 调度走，让其他 goroutine 来继续执行，而不是让线程阻塞休眠，尽可能多的分发任务出去，让 CPU 忙。

### GMP调度模型( TODO 😅 )

GMP概念

    G: goroutine runtime.g
    M: 工作线程(OS thread) runtime.m。 没P找P，有P找G
    P: 队列或者M的执行上下文

**【计算机科学中的每个问题都可以用一间接层解决】**

1.2以前的模型——GM调度器。为什么要引入P

### work-stealing调度算法

- P 创建、唤醒

P 的初始化：首先会创建**逻辑 CPU 核数（runtime.GOMAXPROCS）个 P** ，存储在 sched 的 空闲链表(pidle)。

- G 创建

M中的g0创建的goroutine

[Go：g0，特殊的 Goroutine](https://zhuanlan.zhihu.com/p/213745994)

- OS thread（M）创建（谁创建的，创建时机，存到何处）

有空闲的 Processor 而没有在 spinning 状态的 Machine 时候, 需要去唤醒一个空闲(睡眠)的 M 或者新建一个。

当使用了 Syscall，Go 无法限制 Blocked OS threads 的数量。使用 syscall 写程序要认真考虑 pthread exhaust 问题

- work-stealing调度算法

M 绑定的 P 没有可执行的 goroutine 时，它会去按照优先级去抢占任务（避免饥饿）：

    （1）全局
    （2）本地
    （3）其他的P（随机选择P 质数步长）
    （4）全局
    （5）网络（被阻塞的）goroutine

不知道是些什么（😅）

    Spining thread（线城自旋）
    syscall（系统调用）：当M执行系统调用时，避免M处于busy，P中的G无法被调用
    sysmon（协作式抢占、异步抢占）
    network poller：
    Scheduler Affinity（亲缘性）调度


【runq无锁队列】

[fasthttp 快在哪里](https://xargin.com/why-fasthttp-is-fast-and-the-cost-of-it/)

## 内存分配原理


