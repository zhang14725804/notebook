## Mutex锁

### 1.mutex实例无需实例化，声明即可使用

```golang
func add() {
	var mutex sync.Mutex
	mutex.Lock()
	defer mutex.Unlock()
	fmt.Println("test lock")
}
```

### 2.mutex在传递给外部使用的时候，需要传指针,不然传的是拷贝，会引起锁失败。并且指针的mutex是一定要实例化过的。

```golang
func add() {
	mutex := bornMutex()
	mutex.Lock()
	defer mutex.Unlock()
	fmt.Println("test lock")
}
// 注意here
func bornMutex() *sync.Mutex {
	return &sync.Mutex{}
}
```

### 3.对同一个锁，进行多次锁，会死锁

```golang
func add() {
	var mutex sync.Mutex
	mutex.Lock()
	mutex.Lock() // fatal error: all goroutines are asleep - deadlock!
	defer mutex.Unlock()
	fmt.Println("test lock")
}
```


### 4.对一个RWLock进行同时Lock()和RLock()会死锁.

```golang
func add() {
	var mutex sync.RWMutex
	mutex.RLock()
	mutex.Lock() // fatal error: all goroutines are asleep - deadlock!
}
```

### 5.同一个函数中多次读写

```golang
type Object struct {
	Data []interface{}
	Lock sync.RWMutex
}
// 错误的写法
func RW(obj Object) {
    // 😅😅😅😅😅😅 因为defer是在return前执行，该段逻辑的锁顺序实际上是 Lock(), RLock(), UnLock(),RUnLock() 死锁了
	obj.Lock.Lock()
	defer obj.Lock.Unlock()
	obj.Data = append(obj.Data, 1)

	obj.Lock.RLock()
	defer obj.Lock.Unlock()
	fmt.Println(obj.Data[len(obj.Data)-1])
}

// 正确的写法
func RW(obj Object) {
	func() {
		obj.Lock.Lock()
		defer obj.Lock.Unlock()
		obj.Data = append(obj.Data, 1)
	}()
	func() {
		obj.Lock.RLock()
		defer obj.Lock.RUnlock()
		fmt.Println(obj.Data[len(obj.Data)-1])
	}()

}

```
### 6.读写锁的本质

```golang
// question 为什么这么设计 😅😅😅
// Lock()时，会阻塞另一个协程Rlock()和Lock()
// Rlock时，不会阻塞另一个协程Rlock()。但是会阻塞另一个协程的Lock()
```
### 7.假定有一个data，怎么做到，让他在读时不让写，写时让读?😅😅😅

```golang
// 因为读取函数的Lock会使得Rlock阻塞，所以就做到了，读取的时候不让写，写的时候时读锁，不影响readData的调用。
var mutex sync.RWMutex
var data = 5

func readData() {
	mutex.Lock()
	defer mutex.Unlock()
	fmt.Println(data)
}

func writeData() {
	mutex.RLock()
	defer mutex.RUnlock()
	data = 6
}
func main() {
	writeData()
	readData()
}

// 😅😅😅 怎么做到写的时候不让读，读的时候也不让写？读写时都加写锁。
```
