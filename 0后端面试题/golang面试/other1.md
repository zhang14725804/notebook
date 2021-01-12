### 值方法和指针方法

```golang
type Integer int

func main() {
	var a Integer = 1
    var b Integer = 2
    // 使用【值】可以调用【值方法】和【指针方法】
	Println(a.Add1(b))
	Println(a.Add2(b))

    var i interface{} = &a
    // 使用【指针】可以调用【值方法】和【指针方法】
	Println(i.(*Integer).Add1(b))
	Println(i.(*Integer).Add2(b))

	var c interface{} = a
	Println(c.(Integer).Add1(b))
    // 🔥🔥🔥 类型断言时，无法使用 【值】调用【指针方法】 
    // cannot call pointer method on i.(Integer)
	Println(c.(Integer).Add2(b))
}
// 值方法
func (a Integer) Add1(b Integer) Integer {
	return a + b
}
// 指针方法(推荐)；（1）暗含this指针； （2）接口是引用类型，实现接口用指针方法
func (a *Integer) Add2(b Integer) Integer {
	return *a + b
}
```

### interface接口

```golang
type Name interface {
	GetName() string
}
type Person struct {
	Name string
}

// 🔥🔥🔥 用【指针】实现的接口，不能用【值】赋值
func (p *Person) GetName() string {
	return p.Name
}
func main() {
	var name Name
	// cannot use Person literal (type Person) as type Name in assignment
	// Person does not implement Name (GetName method has pointer receiver)
	name = Person{}
	Println(name)
}

// 用【值】实现的接口，可以同时用【指针】和【值】赋值
func (p Person) GetName() string {
	return p.Name
}
func main() {
	var name Name
	name = new(Person)
	name = &Person{}
	name = Person{}
	Println(name)
}
```