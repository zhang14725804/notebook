package main

import "net/http"
import "fmt"

// go语言不支持函数重载
// 参数名写在参数类型前面
// Go 语言没有引用类型，有值类型和指针类型
func main() {
	http.HandleFunc("/", func(writer http.ResponseWriter, request *http.Request) {
		// fmt.Fprintln(writer, "<h1>Hello World %s！</h1>")
		// 读取url中的参数
		fmt.Fprintf(writer, "<h1>Hello World %s！</h1>", request.FormValue("name"))
	})
	http.ListenAndServe(":8888", nil)
}
