### init函数

    同一个包下可以有多个init，先执行main中的init
    导入的包init先执行
    导入包使用"_",只执行init初始化函数
    导入包的时候“ . "fmt" ”，使用时包名可以省略 “  Println("main init()")  ”
    导入包可以使用别名

```golang
. "fmt" // 包名可省略不写
_ "package_name" // 只执行init初始化函数
alias "package_name" // 包别名
```

### for用标号 label 跳出指定循环

```golang
fuck:
	for i := 0; i < 10; i++ {
		for j := 0; j < 10; j++ {
			if i == 5 {
				break fuck
			}
			if j == 6 {
				break
			}
			Printf("i=%d,j=%d\t", i, j)
		}
		Println()
    }
```

### 不定长参数

```golang
func main() {
	add(1, 2)
	add(1, 2, 3)
	add([]int{1, 2, 3}...)
	// cannot use []int literal (type []int) as type int in argument to add
	add([]int{1, 2, 3})
}

func add(args ...int) int {
	sum := 0
	for _, arg := range args {
		sum += arg
	}
	return sum
}
```

### 类型别名

```golang
    //  类型别名相当于【继承】关系
    type MyInt int
	var i int = 1
	// cannot use i (type int) as type MyInt in assignment
    var j MyInt = i
    

    type MyInt int
    func (mi MyInt) String() string {
        return Sprintf("这他么是%d", mi)
    }
    func main() {
        var j MyInt = 123
        Println(j)
    }
```

### switch case

switch 语句用于基于不同条件执行不同动作，每一个 case 分支都是唯一的，从上至下逐一测试，直到匹配为止。

switch 语句执行的过程从上至下，直到找到匹配项，匹配项后面也不需要再加 break。

switch 默认情况下 case 最后自带 break 语句，匹配成功后就不会执行其他 case，如果我们需要执行后面的 case，可以使用 【fallthrough】

### golang方法接收者【值】和【指针】的区别

是否会改变对象的值

### for...range遍历

```golang
strs := []string{"one", "two", "three"}
// goroutine 执行
for _, str := range strs {
    go func(str string) {
        time.Sleep(1 * time.Millisecond)
        Println(str)
    }(str)
    // 全部输出three
    go func() {
        time.Sleep(1 * time.Millisecond)
        Println(str)
    }()
}
time.Sleep(3 * time.Millisecond)
// 只有一个接受者的情况，只返回下标
for v := range strs {
    Println(v)
}
```


### 结构体序列化

```golang
type Person1 struct {
	job    string // 非导出变量
	Name   string // 采用默认字段名
	Age    int    `json:"age"` // 采用自定义字段名
	Gender bool   `json:"sex"`
}

func main() {
	p1 := Person1{"famer", "Tom", 23, false}
	bytes, _ := json.Marshal(p1) // 序列化
	Println(string(bytes))

	p := new(Person1)
	json.Unmarshal(bytes, p) // 反序列化，反序列化非导出变量会给空值
	Printf("p = %v \n", p)   // 简单形式，只有值
	Printf("p = %+v \n", p)  // 属性键值对
	Printf("p = %#v \n", p)  // 包+属性键值对
}
```

### 字符串无法修改，但可以读取

```golang
str := "你好"
Println(str[0]) // 逐字节访问
for _, v := range str {
    Printf("%c", v) // 你好
}
```

### goroutine处理注意处理异常

```golang
go func() {
    // 若没有此处异常处理，程序直接挂掉 panic: runtime error: integer divide by zero
    defer func() {
        if err := recover(); err != nil {
            Println("子协程挂了")
        }
    }()
    for i := 0; i < 3; i++ {
        time.Sleep(1 * time.Second)
        // panic: runtime error: integer divide by zero
        Println(3 / i)
    }

}()
for i := 0; i < 3; i++ {
    time.Sleep(1 * time.Second)
    Println(i)
}
```

