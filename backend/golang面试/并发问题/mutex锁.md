## Mutex锁

[golang 关于锁 mutex,你可能还需要继续理解](https://blog.csdn.net/fwhezfwhez/article/details/82900498)

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


### 7.不同锁交叉

```golang

// 错误的用法1
var l1,l2,l3 sync.RWMutex
var data1,data2,data3 int
var count int

func Glock() {
    l1.Lock()
    l2.Lock()
    l3.Lock()
}

func GUnlock() {
    l1.Unlock()
    l2.Unlock()
    l3.Unlcok()
}
func CountIncr() {
   Glock()
   count ++
   Gunlock 
}

// 错误的用法2
func F() {
   var tmp int
   l3.lock()
   l1.RLock()
   data3 = data1
   l1.RUnlock()
   l3.Unlock()
}


// go里经常报cricle import，循环引用，解决方法就是层级关系。package A 作为上层，可以importB, B作为下层，永远不能import上层的额东西。保持规范，就能避免循环引用

// lock交叉也允许，那么我们只需要永远保证，A等待B，而B不能等待A，就不会死锁了
func Glock() {
    l1.Lock()
	    l2.Lock()
    		l3.Lock()
}

func GUnlock() {
   			l3.Unlcok()
    	l2.Unlock()
    l1.Unlcok()
}

// 我们约束，l1是上层锁，允许l1，等待l2，和l3，同时所以放锁顺序，就必须先放l3,再放l2，在放l1

// 其次，在交叉里，也是l1等l3
func F() {
   var tmp int
   l1.RLock()
	   l3.lock()
		   data3 = data1
	   l3.Unlock()
   l1.RUnlock()
}

```