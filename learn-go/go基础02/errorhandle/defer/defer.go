package main

import (
	"bufio"
	"fmt"
	"function/fib"
	"os"
)

func tryDefer() {
	defer fmt.Println(1)
	defer fmt.Println(2)
	fmt.Println(3)
}

// 参数在defer语句时计算
func deferArguments() {
	for i := 0; i < 10; i++ {
		defer fmt.Println(i)
		if i == 6 {
			panic("print too many!")
		}
	}
}
func oldWriteFile(filename string) {
	file, err := os.Create(filename)
	if err != nil {
		panic(err)
	}
	defer file.Close()
	// 直接写文件比较慢，用bufio（缓冲流？）,先写入内存到一定大小再写入文件
	writer := bufio.NewWriter(file)
	// 写入文件
	defer writer.Flush()
	f := fib.Fabonacci()
	for i := 0; i < 20; i++ {
		fmt.Fprintln(writer, f())
	}
}
func writeFile(filename string) {
	file, err := os.OpenFile(filename, os.O_EXCL|os.O_CREATE, 0666)
	//err = errors.New("this is a costom error")
	if err != nil {
		// Type assertion
		if pathError, ok := err.(*os.PathError); !ok {
			panic(err)
		} else {
			// PathError records an error and the operation and file path that caused it
			fmt.Printf("%s，%s，%s\n", pathError.Op, pathError.Path, pathError.Err)
		}
		return
	}
	defer file.Close()
	// 直接写文件比较慢，用bufio（缓冲流？）,先写入内存到一定大小再写入文件
	writer := bufio.NewWriter(file)
	// 写入文件
	defer writer.Flush()
	f := fib.Fabonacci()
	for i := 0; i < 20; i++ {
		fmt.Fprintln(writer, f())
	}
}
func main() {
	// tryDefer()
	//deferArguments()
	writeFile("fib.txt")

}
