package main

import 	"fmt"


func main() {
	var arr [3]int
	fmt.Println(arr)
	
	var ar1 = [3]int{1,2,3}
	var ar2 [3]int = [3]int{1,2,3}
	ar3 := [3]int{1,2,3}
	
	fmt.Println(ar1,ar2,ar3)
	
	squarefn()
	copy()
	rangefn()
}
// Go 语言会对数组访问下标越界进行编译器检查
//  Go 会在编译后的代码中插入下标越界检查的逻辑，所以数组的下标访问效率是要打折扣的，比不得 C 语言的数组访问性能
func squarefn(){
	var square [9]int
	for i := 0;i<len(square);i++ {
		square[i] = (i+1)*(i+1)
	}
	fmt.Println(square)
}
// 同样的子元素类型并且是同样长度的数组才可以相互赋值，否则就是不同的数组类型，不能赋值。数组的赋值本质上是一种浅拷贝操作，赋值的两个数组变量的值不会共享
// 不同长度的数组之间赋值是禁止的，因为它们属于不同的类型
func copy(){
	var a = [3]int{1,2,3}
	var b [3]int
	b=a
	a[0] = 123
	fmt.Println(a,b)
}

// 数组遍历
func rangefn(){
	var square [9]int
	for i := 0;i<len(square);i++ {
		square[i] = (i+1)*(i+1)
	}	
	
	for index := range square{
		fmt.Println(index,square[index])
	}
	for index,value:=range square{
		fmt.Println(index,value)
	}
}