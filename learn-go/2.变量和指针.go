package main

import "fmt"

var globalint int = 24

func main() {
	// 局部变量和全局变量 
	var localint int = 22
	fmt.Println(globalint,localint)	
	
	// 变量与常量(必须初始化，无法二次赋值)
	const localconst int = 21
	localint = 32
	fmt.Println(localconst,localint )	
	
	// 指针类型;指针符号 * 和取地址符 &
	var pointervalue int = 66
	var pointer *int = &pointervalue
	fmt.Println(pointer ,*pointer )
	
	// * 操作符存在两次内存读写，第一次获取指针变量的值，也就是内存地址，然后再去拿这个内存地址所在的变量内容
	var pvalue int = 42 
	var p1 *int = &pvalue
	var p2 **int =&p1
	var p3 ***int =&p2
	fmt.Println(p1,p2,p3)
	fmt.Println(*p1,**p2,***p3)
	
}
