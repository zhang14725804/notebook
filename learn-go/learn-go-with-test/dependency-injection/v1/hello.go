package main

import (
	"bytes"
	"fmt"
)

/*
	如何测试：：
	func Greet(name string) {
		fmt.Printf("Hello, %s", name)
	}

	那么我们该如何测试它呢？调用 fmt.Printf 会打印到标准输出，用测试框架来捕获它会非常困难。
	我们所需要做的就是注入（这只是一个等同于「传入」的好听的词）打印的依赖。
	我们的函数不需要关心在哪里打印，以及如何打印，所以我们应该接收一个接口，而非一个具体的类型。
	如果我们这样做的话，就可以通过改变接口的实现，控制打印的内容，于是就能测试它了。在实际情况中，你可以注入一些写入标准输出的内容
*/
func Greet(writer *bytes.Buffer, name string) {
	fmt.Fprintf(writer, "Hello, %s", name)
}
