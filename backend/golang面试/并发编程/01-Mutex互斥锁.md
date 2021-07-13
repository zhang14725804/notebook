### 互斥锁使用场景 

多个 goroutine 并发更新同一个资源，像计数器；同时更新用户的账户信息；秒杀系统；往同一个 buffer 中并发写入数据等等。如果没有互斥控制，就会出现一些异常情况，比如计数器的计数不准确、用户的账户可能出现透支、秒杀系统出现超卖、buffer 中的数据混乱，等等，后果都很严重

### 互斥锁的实现机制

- 临界区的概念

在并发编程中，如果程序中的一部分会被并发访问或修改，那么，为了避免并发访问导致的意想不到的结果，这部分程序需要被保护起来，这部分被保护起来的程序，就叫做【临界区】。可以说，临界区就是一个被共享的资源，或者说是一个整体的一组共享资源，比如对数据库的访问、对某一个共享数据结构的操作、对一个 I/O 设备的使用、对一个连接池中的连接的调用，等等。

- Mutex实现互斥锁

使用互斥锁，限定临界区只能同时由一个线程持有。当临界区由一个线程持有的时候，其它线程如果想进入这个临界区，就会返回失败，或者是等待。直到持有的线程退出临界区，这些等待线程中的某一个才有机会接着持有这个临界区。

- 常见同步原语

互斥锁 Mutex、读写锁 RWMutex、并发编排 WaitGroup、条件变量 Cond、Channel 等。

同步原语使用场景：

    共享资源。并发地读写共享资源，会出现数据竞争（data race）的问题，所以需要 Mutex、RWMutex 这样的并发原语来保护。
    任务编排。需要 goroutine 按照一定的规律执行，而 goroutine 之间有相互等待或者依赖的顺序关系，我们常常使用 WaitGroup 或者 Channel 来实现。
    消息传递。信息交流以及不同的 goroutine 之间的线程安全的数据交流，常常使用 Channel 来实现。

### Mutex使用

```golang
// Locker 的接口定义了锁同步原语的方法集
// RWMutex和Mutex都实现了Locker接口
type Locker interface { 
    Lock() Unlock()
}
```

并发读写的例子

```golang
func main() {
	var count int = 0
	// 使用WaitGroup等待10个goroutine完成
	var wg sync.WaitGroup
	wg.Add(10)
	for i := 0; i < 10; i++ {
		go func() {
			defer wg.Done()
			for j := 0; j < 100000; j++ {
                // count++ 不是一个原子操作，它至少包含几个步骤，比如读取变量 count 的当前值，对这个值加 1，把结果再保存到 count 中.
                // 因为不是原子操作，就可能有并发的问题。
				count++
			}
		}()
	}
	// 等待goroutine完成
	wg.Wait()
	Println(count)
}
```
- 检测并发问题

Go 提供了一个检测并发访问共享资源是否有问题的工具： race detector，它可以帮助我们自动发现程序有没有 data race 的问题

    go run -race counter.go

通过在编译的时候插入一些指令，在运行时通过这些插入的指令检测并发读写从而发现 data race 问题，就是这个工具的实现机制


- Mutex基本用法

```golang
func main() {
	// 互斥锁保护计数器
	var mu sync.Mutex
	var count int = 0
	// 使用WaitGroup等待10个goroutine完成
	var wg sync.WaitGroup
	wg.Add(10)
	for i := 0; i < 10; i++ {
		go func() {
			defer wg.Done()
			for j := 0; j < 100000; j++ {
				mu.Lock()
				count++
				mu.Unlock()
			}
		}()
	}
	// 等待goroutine完成
	wg.Wait()
	Println(count)
}
```

- Mutex嵌入struct

```golang
type Counter struct{
    mu      sync.Mutex
    count   int
}
```

- 采用嵌入字段方式

```golang
// 嵌入字段的方式枷锁
type Counter struct {
	sync.Mutex
	count int
}

func main() {
	var counter Counter
	// 使用WaitGroup等待10个goroutine完成
	var wg sync.WaitGroup
	wg.Add(10)
	for i := 0; i < 10; i++ {
		go func() {
			defer wg.Done()
			for j := 0; j < 100000; j++ {
				counter.Lock()
				counter.count++
				counter.Unlock()
			}
		}()
	}
	// 等待goroutine完成
	wg.Wait()
	Println(counter.count)
}
```

- 把获取锁、释放锁、计数加一的逻辑封装成一个方法

```golang
// 嵌入字段的方式枷锁
type Counter struct {
	sync.Mutex
	count int
}

func (c *Counter) Increase() {
	c.Lock()
	defer c.Unlock()
	c.count++
}

func (c *Counter) Count() int {
	c.Lock()
	defer c.Unlock()
	return c.count
}

func main() {
	var counter Counter
	// 使用WaitGroup等待10个goroutine完成
	var wg sync.WaitGroup
	wg.Add(10)
	for i := 0; i < 10; i++ {
		go func() {
			defer wg.Done()
			for j := 0; j < 100000; j++ {
				counter.Increase()
			}
		}()
	}
	// 等待goroutine完成
	wg.Wait()
	Println(counter.Count())
}
```


### 思考

如果 Mutex 已经被一个 goroutine 获取了锁，其它等待中的 goroutine 们只能一直等待。那么，等这个锁释放后，等待中的 goroutine 中哪一个会优先获取 Mutex 呢？