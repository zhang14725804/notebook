package main

import "fmt"

// 切片
func main() {
	// make 函数创建切片，需要提供三个参数，分别是切片的类型、切片的长度和容量。
	// 其中第三个参数是可选的，如果不提供第三个参数，那么长度和容量相等，也就是说切片的满容的
	var s1 []int = make([]int,5,8)
	var s2 []int = make([]int,8)
	fmt.Println(s1,s2)
	
	var s11 = make([]int,5,8)
	s22 := make([]int,8)
	fmt.Println(s11,s22)
	
	// 切片的初始化,
	// question::切片和数组又有什么区别呢
	var s33 []int = []int{1,2,3,4,5}
	fmt.Println(s33,len(s33),cap(s33))
	
	// 空切片
	var eq1 []int
	var eq2 []int = []int{}
	var eq3 []int = make([]int,0)
	fmt.Println(eq1,eq2,eq3)
	fmt.Println(len(eq1),len(eq2),len(eq3))
	fmt.Println(cap(eq1),cap(eq2),cap(eq3))
	
	evaluate()
	rangefn()
	appendfn()
	splice()
	arrToslice()
	copyfn()
	extends()
}

func evaluate(){
	// 切片的赋值
	// 切片的赋值是一次浅拷贝操作，拷贝的是切片变量的三个域，你可以将切片变量看成长度为 3 的 int 型数组，数组的赋值就是浅拷贝。
	// 拷贝前后两个变量共享底层数组，对一个切片的修改会影响另一个切片的内容，这点需要特别注意
	var s1 = make([]int,5,8)
	for i:=1;i<len(s1);i++{
		s1[i] = i
	}
	var s2 = s1
	fmt.Println(s1, len(s1), cap(s1))
	fmt.Println(s2, len(s2), cap(s2))
	
	// 修改切片内容
	s2[0] = 9527
	fmt.Println(s1, s2)
}

func rangefn(){
	// 切片的遍历(这么看好像和数组没什么区别)
	var s = []int{1,2,3,4,5}
	for index := range s{
		fmt.Println(index,s[index])
	}
	for index,value := range s{
		fmt.Println(index,value)
	}
}

func appendfn(){
	// 切片每一次追加后都会形成新的切片变量，如果底层数组没有扩容，那么追加前后的两个切片变量共享底层数组，如果底层数组扩容了，那么追加前后的底层数组是分离的不共享的。
	// 如果底层数组是共享的，一个切片的内容变化就会影响到另一个切片
	// 正是因为切片追加后是新的切片变量，Go 编译器禁止追加了切片后不使用这个新的切片变量，以避免用户以为追加操作的返回值和原切片变量是同一个变量
	
	//如果你真的不需要使用这个新的变量，可以将 append 的结果赋值给下划线变量。下划线变量是 Go 语言特殊的内置变量，它就像一个黑洞，可以将任意变量赋值给它，但是却不能读取这个特殊变量
	var s1 = []int{1,2,3}
	var s2 = append(s1,6)
	var s3 = append(s2,7)
	
	fmt.Println(s1,len(s1),cap(s1))
	// 为什么增加一个之后cap早呢更加那么多
	fmt.Println(s2,len(s2),cap(s2))
	fmt.Println(s3,len(s3),cap(s3))

}

// 切片的「域」就是组成切片变量的三个部分，分别是底层数组的指针、切片的长度和切片的容量

func splice(){
	// python中见过这么搞得
	var s1 = []int{1,2,3,4,5,6,7,8}
	var s2 = s1[3:5]
	var s3 = s1[:5]
	var s4 = s1[3:]
	// 和普通的切片赋值,同样的共享底层数组，同样是浅拷贝
	var s5 = s1[:]
	fmt.Println(s1, len(s1), cap(s1))
 	fmt.Println(s2, len(s2), cap(s2))
	 fmt.Println(s3, len(s3), cap(s3))
	 fmt.Println(s4, len(s4), cap(s4))
	fmt.Println(s5, len(s5), cap(s5))
	
	var ss1 = make([]int,5,8)
	for i:=1;i<len(ss1);i++{
		ss1[i] = i
	}
 	fmt.Println(ss1, len(ss1), cap(ss1))

 	var ss2 = ss1
 	var ss3 = ss1[:]
 	fmt.Println(ss2, len(ss2), cap(ss2))
 	fmt.Println(ss3, len(ss3), cap(ss3))

 	// 修改母切片
 	ss1[0] = 255
 	fmt.Println(ss1, len(ss1), cap(ss1))
 	fmt.Println(ss2, len(ss2), cap(ss2))
 	fmt.Println(ss3, len(ss3), cap(ss3))
}

func arrToslice(){
	var a = [10]int{1, 2, 3, 4, 5, 6, 7, 8, 9, 10}
    	var b = a[2:6]
    	fmt.Println(b)
    	a[4] = 100
    	fmt.Println(b)
}
// copy函数不太懂
func copyfn(){
	var s = make([]int, 5, 8)
 	for i:=0;i<len(s);i++ {
  		s[i] = i+1
 	}
 	fmt.Println(s)
 	var d = make([]int, 2, 6)
 	var n = copy(d, s)
 	fmt.Println(n, d)
}

// 切片的扩容
// 当比较短的切片扩容时，系统会多分配 100% 的空间，也就是说分配的数组容量是切片长度的2倍。
// 但切片长度超过1024时，扩容策略调整为多分配 25% 的空间，这是为了避免空间的过多浪费
func extends(){
	s1 := make([]int, 6)
	s2 := make([]int, 1024)
	s1 = append(s1, 1)
	s2 = append(s2, 2)
	fmt.Println(len(s1), cap(s1))
	fmt.Println(len(s2), cap(s2))
}