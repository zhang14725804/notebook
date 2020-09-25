### 1.channel

Go 奉行通过通信来共享内存，而不是共享内存来通信。所以，channel 是goroutine之间互相通信的通道，goroutine之间可以通过它发消息和接收消息。

channel是进程内（协程吧）的通信方式，因此通过channel传递对象的过程和调用函数时的参数传递行为比较一致，比如也可以传递指针等。

channel是类型相关的，一个channel只能传递（发送或接受 | send or receive）一种类型的值，这个类型需要在声明channel时指定。

默认的，信道的存消息和取消息都是阻塞的 (叫做无缓冲的信道)

```go
func main() {
    c := make(chan int) // 不使用带缓冲区的channel
    go send(c)
    go recv(c)
    time.Sleep(3 * time.Second)
close(c)
}

// 只能向chan里send数据
func send(c chan<- int) {
    for i := 0; i < 10; i++ {

        fmt.Println("send readey ", i)
        c <- i
        fmt.Println("send ", i)
    }
}

// 只能接收channel中的数据
func recv(c <-chan int) {
    for i := range c {
        fmt.Println("received ", i)
    }
}
```

```go
func main() {
    c := make(chan int, 10) // 使用带缓冲区的channel
    go send(c)
    go recv(c)
    time.Sleep(3 * time.Second)
    close(c)
}

// 只能向chan里send发送数据
func send(c chan<- int) {
    for i := 0; i < 10; i++ {

        fmt.Println("send readey ", i)
        c <- i
        fmt.Println("send ", i)
    }
}

// 只能接收channel中的数据
func recv(c <-chan int) {
    for i := range c {
        fmt.Println("received ", i)
    }
}
```

- 无缓冲的通道（unbuffered channel）是指在接收前没有能力保存任何值的通道。

- 有缓冲的通道（buffered channel）是一种在被接收前能存储一个或者多个值的通道。

### 2.close关闭channel

channel不像文件一样需要经常去关闭，只有当你确实没有任何发送数据了，或者你想显式的结束range循环之类的，才去关闭channel；

关闭channel后，无法向channel 再发送数据(引发 panic 错误后导致接收立即返回零值)；

关闭channel后，可以继续向channel接收数据，不能继续发送数据；

对于nil channel，无论收发都会被阻塞。