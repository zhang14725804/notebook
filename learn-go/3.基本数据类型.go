package main

import "fmt"

func main() {
	// 有符号整数，可以表示正负
	var a int8 = 1   //1字节
	var b int16 = 2	 //2字节
	var c int32 = 3  //4字节
	var d int64 = 4  //8字节
	fmt.Println(a,b,c,d)
	
	// 无符号整数，只能表示非负数
	var ua uint8 = 1
	var ub uint16 = 2
	var uc uint32 = 3
	var ud uint64 = 4
	fmt.Println(ua,ub,uc,ud)
	
	// int类型，在32位机器上占4个字节，在64位机器上占8个字节
	var e int = 5
	var ue uint = 5
	fmt.Println(e,ue)
	
	// question::有这么多int类型，平时用哪一种呢
	
	// bool类型
	var bb bool =true
	fmt.Println(bb)
	
	//字节类型(不能用双引号)
	var j byte = 'a'
	fmt.Println(j)
	
	// 字符串类型(不能用单引号)
	var strrr string = "abcdefg"
	fmt.Println(strrr)
	
	// 浮点数
	var h float32 = 3.1466
	var i float64 = 3.146666
	fmt.Println(h,i)
}
