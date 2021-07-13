### Once使用场景

Once 可以用来执行且仅仅执行一次动作，常常用于单例对象的初始化场景

很多时候我们是要延迟进行初始化的，所以有时候单例资源的初始化
```golang
// 使用互斥锁保证线程(goroutine)安全
var connMu sync.Mutex
var conn net.Conn

func getConn() net.Conn {
    connMu.Lock()
    defer connMu.Unlock()
    // 返回已创建好的连接
    if conn != nil {
        return conn
    }
    // 创建连接
    conn, _ = net.DialTimeout("tcp", "baidu.com:80", 10*time.Second)
    return conn
}

// 使用连接
func main() {
    conn := getConn()
    if conn == nil {
        panic("conn is nil")
    }
}
```
这种方式虽然实现起来简单，但是有性能问题。一旦连接创建好，每次请求的时候还是得竞争锁才能读取到这个连接，这是比较浪费资源的，因为连接如果创建好之后，其实就不需要锁的保护了。怎么办呢？

sync.Once 只暴露了一个方法 Do，你可以多次调用 Do 方法，但是只有第一次调用 Do 方法时 f 参数才会执行，这里的 f 是一个无参数无返回值的函数。

**Once 常常用来初始化单例资源，或者并发访问只需初始化一次的共享资源，或者在测试的时候初始化一次测试资源。**

### Once实现原理

**一个正确的 Once 实现要使用一个互斥锁，这样初始化的时候如果有并发的 goroutine，就会进入doSlow 方法**

### 使用 Once 可能出现的 2 种错误

### question

- 我已经分析了几个并发原语的实现，你可能注意到总是有些 slowXXXX 的方法，从 XXXX 方法中单独抽取出来，你明白为什么要这么做吗，有什么好处？

问题一：分离固定内容和非固定内容，使得固定的内容能被内联调用，从而优化执行过程。

- Once 在第一次使用之后，还能复制给其它变量使用吗？

问题二：Once被拷贝的过程中内部的已执行状态不会改变，所以Once不能通过拷贝多次执行。