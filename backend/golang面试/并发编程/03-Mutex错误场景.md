## Mutex常见错误场景

使用 Mutex 常见的错误场景有 4 类，分别是 【Lock/Unlock 不是成对出现】、【Copy 已使用的 Mutex】、【重入】和【死锁】

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

- 可重入锁

当一个线程获取锁时，如果没有其它线程拥有这个锁，那么，这个线程就成功获取到这个锁。之后，如果其它线程再请求这个锁，就会处于阻塞等待的状态。但是，如果拥有这把锁的线程再请求这把锁的话，不会阻塞，而是成功返回，所以叫可重入锁（有时候也叫做递归锁）。只要你拥有这把锁，你可以可着劲儿地调用，比如通过递归实现一些算法，调用者不会阻塞或者死锁。

- Mutex 不是可重入的锁

因为 Mutex 的实现中没有记录哪个 goroutine 拥有这把锁。理论上，任何 goroutine 都可以随意地 Unlock 这把锁，所以没办法计算重入条件

```golang
func foo(l sync.Locker) {
	fmt.Println("in foo")
	l.Lock()
	bar(l)
	l.Unlock()
}

func bar(l sync.Locker) {
	l.Lock()
	fmt.Println("in bar")
	l.Unlock()
}

func main() {
	l := &sync.Mutex{}
	foo(l)
}
```

- 实现可重入Mutex锁；关键在于实现的锁要能记住当前是哪个 goroutine 持有这个锁

方案一：通过 hacker 的方式获取到 goroutine id，记录下获取锁的 goroutine id，它可以实现 Locker 接口。

方案二：调用 Lock/Unlock 方法时，由 goroutine 提供一个 token，用来标识它自己，而不是我们通过 hacker 的方式获取到 goroutine id，但是，这样一来，就不满足 Locker 接口了。

可重入锁（递归锁）解决了代码重入或者递归调用带来的死锁问题，同时它也带来了另一个好处，就是我们可以要求，只有持有锁的 goroutine 才能 unlock 这个锁

### 4.死锁（哲学家就餐问题）

【死锁】：两个或两个以上的进程（或线程，goroutine）在执行过程中，因争夺共享资源而处于一种互相等待的状态，如果没有外部干涉，它们都将无法推进下去，此时，我们称系统处于死锁状态或系统产生了死锁

分析一下死锁产生的必要条件。如果你想避免死锁，只要破坏这四个条件中的一个或者几个，就可以了。

（1）互斥： 至少一个资源是被排他性独享的，其他线程必须处于等待状态，直到资源被释放。

（2）持有和等待：goroutine 持有一个资源，并且还在请求其它 goroutine 持有的资源，也就是咱们常说的“吃着碗里，看着锅里”的意思。

（3）不可剥夺：资源只能由持有它的 goroutine 来释放。

（4）环路等待：一般来说，存在一组等待进程，P={P1，P2，…，PN}，P1 等待 P2 持有的资源，P2 等待 P3 持有的资源，依此类推，最后是 PN 等待 P1 持有的资源，这就形成了一个环路等待的死结。