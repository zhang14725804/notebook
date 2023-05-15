## 参考文章

https://mp.weixin.qq.com/s/QgNndPgN1kqxWh-ijSofkw

### channel用法

```go

// 1.构造channel
ch := make(chan int) // 无缓冲
ch := make(chan int) // 有缓冲

// 2.读
val := <- ch
<- ch
val,ok := <- ch

// 3.写
var data int
ch <- data

// 4.关闭
close(ch)

// 5.select+channel
select{
case <- ch1:
    //     
case <- ch2:
    //   
case ch3 <- data:
    //  
default:
    //
}
```

### 核心数据结构
### 构造函数
### 写流程

1. 两类异常情况处理
    a. 对于未初始化的 chan，写入操作会引发死锁
    b. 对于已关闭的 chan，写入操作会引发 panic.

2. 写时存在阻塞【读】协程
3. 写时无阻塞读协程但环形缓冲区仍有空间
4. 写时无阻塞读协程且环形缓冲区无空间


### 读流程

1. 两类异常情况处理
    a. 读空 channel，引起死锁；
    b. channel 已关闭且内部无元素
2. 读时有阻塞的写协程
3. 读时无阻塞写协程且缓冲区有元素
4. 读时无阻塞写协程且缓冲区无元素

### 阻塞与非阻塞模式

默认情况下，读/写 channel 都是阻塞模式，只有在 select 语句组成的多路复用分支中，与 channel 的交互会变成非阻塞模式

### 两种读 channel 的协议
### 关闭
