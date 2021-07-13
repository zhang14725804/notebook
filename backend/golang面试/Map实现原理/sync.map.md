## sync.Map源码实现

### 并发写map会有什么问题？

```golang
// fatal error: concurrent map writes
func main() {
	m := map[int]int{1: 1}
	go do(m)
	go do(m)

	time.Sleep(1 * time.Second)
	fmt.Println(m)
}

func do(m map[int]int) {
	i := 0
	for i < 10000 {
		m[1] = 1
		i++
	}
}
```
### RWMutex + map

```golang
var s sync.RWMutex

func main() {
	m := map[int]int{1: 1}
	go do(m)
	go do(m)

	time.Sleep(1 * time.Second)
	fmt.Println(m)
}

func do(m map[int]int) {
	i := 0
	for i < 10000 {
		// 加锁
		s.Lock()
		m[1] = 1
		// 解锁
		s.Unlock()
		i++
	}
}
```

### sync.Map

```golang
func main() {
	// sync.Map
	m := sync.Map{}
	m.Store(1, 1)
	go do(m)
	go do(m)

	time.Sleep(1 * time.Second)
	fmt.Println(m.Load(1))
}

func do(m sync.Map) {
	i := 0
	for i < 10000 {
		m.Store(1, 1)
		i++
	}
}
```

### sync.Map源码实现(😅😅😅)

**写：直写。 读：先读read，没有再读dirty。**

sync.Map的实现有几个优化点：

    空间换时间。 通过冗余的两个数据结构(read、dirty),实现加锁对性能的影响。
    使用只读数据(read)，避免读写冲突。
    动态调整，miss次数多了之后，将dirty数据提升为read。
    double-checking。
    延迟删除。 删除一个键值只是打标记，只有在提升dirty的时候才清理删除的数据。
    优先从read读取、更新、删除，因为对read的读取不需要锁。

```golang
type Map struct {
	// 当涉及到dirty数据的操作的时候，需要使用这个锁
	mu Mutex
	// 一个只读的数据结构，因为只读，所以不会有读写冲突。
	// 所以从这个数据中读取总是安全的。
	// 实际上，实际也会更新这个数据的entries,如果entry是未删除的(unexpunged), 并不需要加锁。如果entry已经被删除了，需要加锁，以便更新dirty数据。
	read atomic.Value // readOnly
	// dirty数据包含当前的map包含的entries,它包含最新的entries(包括read中未删除的数据,虽有冗余，但是提升dirty字段为read的时候非常快，不用一个一个的复制，而是直接将这个数据结构作为read字段的一部分),有些数据还可能没有移动到read字段中。
	// 对于dirty的操作需要加锁，因为对它的操作可能会有读写竞争。
	// 当dirty为空的时候， 比如初始化或者刚提升完，下一次的写操作会复制read字段中未删除的数据到这个数据中。
	dirty map[interface{}]*entry
	// 当从Map中读取entry的时候，如果read中不包含这个entry,会尝试从dirty中读取，这个时候会将misses加一，
	// 当misses累积到 dirty的长度的时候， 就会将dirty提升为read,避免从dirty中miss太多次。因为操作dirty需要加锁。
	misses int
}

type readOnly struct {
	m       map[interface{}]*entry
	amended bool // Map.dirty的数据和这里的 m 中的数据不一样的时候，为true
}

type entry struct {
    // 可见value是个指针类型，虽然read和dirty存在冗余情况（amended=false），但是由于是指针类型，存储的空间应该不是问题
    p unsafe.Pointer // *interface{}
}

```

### 延申

mysql加锁，是不是有表级锁、行级锁。sync.RWMutex加锁方式相当于表级锁。而sync.Map其实也是相当于表级锁，只不过多读写分了两个map，本质还是一样的。

既然这样，那就自然知道优化方向了：就是把锁的粒度尽可能降低来提高运行速度。

思路：对一个大map进行hash，其内部是n个小map，根据key来来hash确定在具体的那个小map中，这样加锁的粒度就变成1/n了


### 参考

[Go 1.9 sync.Map揭秘](https://colobu.com/2017/07/11/dive-into-sync-Map/)

[由浅入深Golang的sync.Map](https://juejin.cn/post/6844903895227957262)



