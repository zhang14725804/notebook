### map的基本使用方法

map键值对中的key 类型的 K 必须是可比较的

在 Go 语言中，bool、整数、浮点数、复数、字符串、指针、Channel、接口都是可比较的，包含可比较元素的 【struct】 和【数组】，这俩也是可比较的，而 【slice】、【map】、【函数值】都是不可比较的。

如果使用 struct 类型做 key 其实是有坑的，因为如果 struct 的某个字段值修改了，查询 map 时无法获取它 add 进去的值。那该怎么办呢？如果要使用 struct 作为 key，我们要保证 struct 对象在逻辑上是不可变的，这样才会保证 map 的逻辑没有问题。

### 使用map的两种常见错误

- 未初始化

和 slice 或者 Mutex、RWmutex 等 struct 类型不同，map 对象必须在使用之前初始化

从一个 nil 的 map 对象中获取值不会 panic，而是会得到零值

```golang
    var m map[int]int
	// 0
	Println(m[100])
	// panic: assignment to entry in nil map
	m[100] = 1
	Println(m)
```

- 并发读写

```golang
    var m = make(map[int]int, 10)
    // fatal error: concurrent map read and map write
	go func() {
		for {
			m[1] = 1
		}
	}()
	go func() {
		for {
			_ = m[2]
		}
	}()
    select {}
```

- 加读写锁，扩展map，支持并发读写

```golang
// 查询和遍历可以看做读操作，增加、修改和删除可以看做写操作
type RWMap struct{
    sync.RWMutex
    m map[int]int
}
```

- 分片枷锁（尽量减少锁的粒度和锁的持有时间）

一把锁分成几把锁，每个锁控制一个分片


### sync.Map应用场景

在以下两个场景中使用 sync.Map，会比使用 map+RWMutex 的方式，性能要好得多：

    （1）只会增长的缓存系统中，一个 key 只写入一次而被读很多次；
    （2）多个 goroutine 为不相交的键集读、写和重写键值对。

### sync.Map实现原理（TODO）