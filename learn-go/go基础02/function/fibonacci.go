package main

import (
	"bufio"
	"fmt"
	"function/fib"
	"io"
	"strings"
)

func fabonacci2() intGen {
	a, b := 0, 1
	return func() int {
		a, b = b, a+b
		return a
	}
}

type intGen func() int

//实现read接口（函数实现了接口）
func (g intGen) Read(p []byte) (n int, err error) {
	// 这里不懂，不知道干了个什么
	next := g()
	if next > 10000 {
		return 0, io.EOF
	}
	s := fmt.Sprintf("%d\n", next)
	return strings.NewReader(s).Read(p)
}
func printFileContents(reader io.Reader) {
	scanner := bufio.NewScanner(reader)
	for scanner.Scan() {
		fmt.Println(scanner.Text())
	}
}
func main() {
	f := fib.Fabonacci()
	fmt.Println(f())
	fmt.Println(f())
	fmt.Println(f())
	fmt.Println(f())
	fmt.Println(f())
	fmt.Println(f())
	// 这种为什么能实现递归调用
	f2 := fabonacci2()
	printFileContents(f2)
}
