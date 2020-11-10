1.有关defer的几个题目

```golang
func deferFuncParameter() {
    var aInt = 1
    defer fmt.Println(aInt)
    aInt = 2
    return
}
```

输出1。延迟函数fmt.Println(aInt)的参数在defer语句出现时就已经确定了，所以无论后面如何修改aInt变量都不会影响延迟函数。

```golang
func printArray(array *[3]int) {
    for i := range array {
        fmt.Println(array[i])
    }
}
func deferFuncParameter() {
    var aArray = [3]int{1, 2, 3}
    defer printArray(&aArray)
    aArray[0] = 10
    return
}
func main() {
    deferFuncParameter()
}
```
输出10、2、3三个值。延迟函数printArray()的参数在defer语句出现时就已经确定了，即数组的地址，由于延迟函数执行时机是在return语句之前，所以对数组的最终修改值会被打印出来。

```golang
func deferFuncReturn() (result int) {
    i := 1
    defer func() {
       result++
    }()
    return i
}
```
函数输出2。函数的return语句并不是原子的，实际执行分为设置返回值—>ret，defer语句实际执行在返回前，即拥有defer的函数返回过程是：设置返回值—>执行defer—>ret。所以return语句先把result设置为i的值，即1，defer语句中又把result递增1，所以最终返回2。

### 2.defer规则

- 规则一：延迟函数的参数在defer语句出现时就已经确定下来了

```golang
func a() {
    i := 0
    defer fmt.Println(i)
    i++
    return
}
```

- 规则二：延迟函数执行按后进先出顺序执行，即先出现的defer最后执行

- 规则三：延迟函数可能操作主函数的具名返回值

若要理解延迟函数是如何影响主函数返回值的，只要明白函数是如何返回的就足够了。

有一个事实必须要了解，关键字return不是一个原子操作，实际上return只代理汇编指令ret，即将跳转程序执行。比如语句return i，实际上分两步进行，即将i值存入栈中作为返回值，然后执行跳转，而defer的执行时机正是跳转前，所以说defer执行时还是有机会操作返回值的。

```golang
func deferFuncReturn() (result int) {
    i := 1
    defer func() {
       result++
    }()
    return i
}
```

而延迟函数的执行正是在return之前，即加入defer后的执行过程如下：

    result = i
    result++
    return


2.3.1、主函数拥有匿名返回值，返回字面值

一个主函数拥有一个匿名的返回值，返回时使用字面值，比如返回”1”、”2”、”Hello”这样的值，这种情况下defer语句是无法操作返回值的。

```golang
func foo() int {
    var i int
    defer func() {
        i++
    }()
    return 1
}
```

2.3.2、主函数拥有匿名返回值，返回变量

一个主函数拥有一个匿名的返回值，返回使用本地或全局变量，这种情况下defer语句可以引用到返回值，但不会改变返回值。

```golang
func foo() int {
    var i int
    defer func() {
        i++
    }()
    return i
}
```

2.3.3、主函数拥有具名返回值

主函声明语句中带名字的返回值，会被初始化成一个局部变量，函数内部可以像使用局部变量一样使用该返回值。如果defer语句操作该返回值，可能会改变返回结果。

```golang
func foo() (ret int) {
    defer func() {
        ret++
    }()
    return 0
}
```

### 3.defer实现原理

```golang
type _defer struct {
    sp      uintptr   //函数栈指针
    pc      uintptr   //程序计数器
    fn      *funcval  //函数地址
    link    *_defer   //指向自身结构的指针，用于链接多个defer
}
```

defer后面一定要接一个函数的，所以defer的数据结构跟一般函数类似，也有栈地址、程序计数器、函数地址等等。

与函数不同的一点是它含有一个指针，可用于指向另一个defer，每个goroutine数据结构中实际上也有一个defer指针，该指针指向一个defer的单链表，每次声明一个defer时就将defer插入到单链表表头，每次执行defer时就从单链表表头取出一个defer执行。
