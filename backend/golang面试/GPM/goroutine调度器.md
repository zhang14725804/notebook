## goroutine调度器

    M 如何找工作
    goroutine 调度时机有哪些
    什么是 go shceduler
    goroutine 如何退出
    scheduler 的初始化过程
    什么是workstealing
    mian gorutine 如何创建
    什么是M:N模型
    g0 栈何用户栈如何切换
    schedule 循环如何运转
    GPM 是什么
    schedule 循环如何启动
    sysmon 后台监控线程做了什么
    goroutine和线程的区别

### M 如何找工作（复杂）

共经历三个过程：先从本地队列找，定期会从全局队列找，最后实在没办法，就去别的 P 偷。

### goroutine 调度时机有哪些

在四种情形下，goroutine 可能会发生调度，但也并不一定会发生，只是说 Go scheduler 有机会进行调度。

使用go关键字；GC；系统调用；内存同步访问；

### 什么是 go shceduler (复杂)

Go 程序的执行由两层组成：Go Program，Runtime，即用户程序和运行时。它们之间通过函数调用来实现内存管理、channel 通信、goroutines 创建等功能。用户程序进行的系统调用都会被 Runtime 拦截，以此来帮助它进行调度以及垃圾回收相关的工作。

有三个基础的结构体来实现 goroutines 的调度。**g，m，p**。

g 代表一个 goroutine，它包含：表示 goroutine 栈的一些字段，指示当前 goroutine 的状态，指示当前运行到的指令地址，也就是 PC 值。

m 表示内核线程，包含正在运行的 goroutine 等字段。

p 代表一个虚拟的 Processor，它维护一个处于 Runnable 状态的 g 队列，m 需要获得 p 才能运行 g。
当然还有一个核心的结构体：sched，它总览全局。

Runtime 起始时会启动一些 G：垃圾回收的 G，执行调度的 G，运行用户代码的 G；并且会创建一个 M 用来开始 G 的运行。随着时间的推移，更多的 G 会被创建出来，更多的 M 也会被创建出来。


**为什么需要 P 这个组件，直接把 runqueues 放到 M 不行吗？**当一个线程阻塞时，可以直接将和它绑定的 P 上的 goroutines 转移到其他线程


### goroutine 如何退出（难以理解）

main goroutine 以及普通 goroutine 从执行到退出的整个过程

### scheduler 的初始化过程 （难以理解）
### 什么是workstealing
### mian gorutine 如何创建 （难以理解）
### 什么是M:N模型

Runtime 会在程序启动的时候，创建 M 个线程（CPU 执行调度的单位），之后创建的 N 个 goroutine 都会依附在这 M 个线程上执行。这就是 M:N 模型：

在同一时刻，一个线程上只能跑一个 goroutine。当 goroutine 发生阻塞（例如上篇文章提到的向一个 channel 发送数据，被阻塞）时，runtime 会把当前 goroutine 调度走，让其他 goroutine 来执行

### g0 栈何用户栈如何切换 （难以理解）
### schedule 循环如何运转 (复杂)
### GPM 是什么
### schedule 循环如何启动（难以理解）
### sysmon 后台监控线程做了什么（难以理解）
### goroutine和线程的区别

**内存消耗、创建与销毀、切换**

### 
### 
### 
### 
### 
### 
### 
### 