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


