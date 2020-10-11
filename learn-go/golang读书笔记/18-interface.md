### 1.接口是什么

Go 语言接口定义了一组方法集合，但是这些方法集合仅仅只是被定义，它们没有在接口中实现。

接口(interface)类型是Go语言的一种数据类型。而因为所有的类型包括自定义类型都实现了空接口interface{}，所以空接口interface{}可以被当做任意类型的数值。

- 隐式继承

在Go语言中，如果接口的所有方法在某个类型方法集中被实现，则认为该类型实现了这个接口。

类型不用显式声明实现了接口，只需要实现接口所有方法，这样的隐式实现解藕了实现接口的包和定义接口的包。

类型需要实现接口方法集中的所有方法，一定是接口方法集中所有方法。类型实现了这个接口，那么接口类型的变量也就可以存放该类型的值。

```go
type A struct {
    Books int
}

type B interface {
    f()
}

func (a A) f() {
    fmt.Println("A.f() ", a.Books)
}

type I int

func (i I) f() {
    fmt.Println("I.f() ", i)
}

func main() {
    var a A = A{Books: 9}
    a.f()

    var b B = A{Books: 99} // 接口类型可接受结构体A的值，因为结构体A实现了接口
    b.f()

    var i I = 199 // I是int类型引申出来的新类型
    i.f()

    var b2 B = I(299) // 接口类型可接受新类型I的值，因为新类型I实现了接口
    b2.f()
}
```

### 2.接口嵌套

一个接口可以包含一个或多个其他的接口，但是在接口内不能嵌入结构体(todo：这句有问题)，也不能嵌入接口自身，否则编译会出错。

```go
type ReadWrite interface {
    Read(b Buffer) bool
    Write(b Buffer) bool
}

type Lock interface {
    Lock()
    Unlock()
}

type File interface {
    ReadWrite
    Lock
    Close()
}
```

### 3.类型断言

前面我们可以把实现了某个接口的类型值保存在接口变量中，但反过来某个接口变量属于哪个类型呢？如何检测接口变量的类型呢？这就是类型断言（Type Assertion）的作用。

接口类型向普通类型转换有两种方式：Comma-ok断言和Type-switch测试。

```go
// Type-switch做类型判断
var value interface{}

switch str := value.(type) {
case string:
    fmt.Println("value类型断言结果为string:", str)

case Stringer:
    fmt.Println("value类型断言结果为Stringer:", str)

default:
    fmt.Println("value类型不在上述类型之中")
}

// Comma-ok断言
var varI I
varI = T("Tstring")
if v, ok := varI.(T); ok { // 类型断言
    fmt.Println("varI类型断言结果为：", v) // varI已经转为T类型
    varI.f()
}
```

### 4.接口与动态类型

在经典的面向对象语言（像 C++，Java 和 C#）中，往往将数据和方法被封装为类的概念：类中包含它们两者，并且不能剥离。

Go 语言中没有类，数据（结构体或更一般的类型）和方法是一种松耦合的正交关系。Go 语言中的接口必须提供一个指定方法集的实现，但是更加灵活通用：任何提供了接口方法实现代码的类型都隐式地实现了该接口，而不用显式地声明。该特性允许我们在不改变已有的代码的情况下定义和使用新接口

### 5.接口的提取

接口的提取，是非常有用的设计模式，良好的提取可以减少需要的类型和方法数量。而且在Go语言中不需要像传统的基于类的面向对象语言那样维护整个的类层次结构。

假设有一些拥有共同行为的对象，并且开发者想要抽象出这些行为，这时就可以创建一个接口来使用。

### 6.接口的继承

当一个类型包含（内嵌）另一个类型（实现了一个或多个接口）时，这个类型就可以使用（另一个类型）所有的接口方法。

类型可以通过继承多个接口来提供像多重继承一样的特性：

type ReaderWriter struct {
    io.Reader
    io.Writer
}

### struct和interface什么区别和联系