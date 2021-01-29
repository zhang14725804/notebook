## Mutex常见错误场景

使用 Mutex 常见的错误场景有 4 类，分别是 Lock/Unlock 不是成对出现、Copy 已使用的 Mutex、重入和死锁

### 1.Lock/Unlock 不是成对出现

-  缺少 Unlock 的场景，常见的有三种情况

（1）代码中有太多的 if-else 分支，可能在某个分支中漏写了 Unlock；

（2）在重构的时候把 Unlock 给删除了；

（3）Unlock 误写成了 Lock。

- 直接 Unlock 一个未加锁的 Mutex 会 panic

### 2.Copy 已使用的 Mutex

那就是 Package sync 的同步原语在使用后是不能复制的。原因在于，Mutex 是一个有状态的对象，它的 state 字段记录这个锁的状态

如果你要复制一个已经加锁的 Mutex 给一个新的变量，那么新的刚初始化的变量居然被加锁了，这显然不符合你的期望，因为你期望的是一个零值的 Mutex。关键是在并发环境下，你根本不知道要复制的 Mutex 状态是什么，因为要复制的 Mutex 是由其它 goroutine 并发访问的，状态可能总是在变化。

```golang
type Counter struct {
	sync.Mutex
	count int
}

func main() {
	var counter Counter
	counter.Lock()
	defer counter.Unlock()
	counter.count++
	fn(counter) // 复制锁
}
// // 这里Counter的参数是通过复制的方式传入的
func fn(c Counter) {
	c.Lock()
	defer c.Unlock()
	c.count++
}
```

- 检测死锁问题


        go vet copy.go

检查是通过copylock分析器静态分析实现的。这个分析器会分析函数调用、range 遍历、复制、声明、函数返回值等位置，有没有锁的值 copy 的情景，以此来判断有没有问题。可以说，只要是实现了 Locker 接口，就会被分析


### 3.重入



