package main

import (
	"io"
	"net/http"
	"os"
)

func main() {
	http.HandleFunc("/", dog)
	http.HandleFunc("/toby.jpg", dogPic)
	http.ListenAndServe(":8080", nil)
}

func dog(w http.ResponseWriter, req *http.Request) {
	w.Header().Set("Content-Type", "text/html,charset=utf-8")
	io.WriteString(w, `<img src="/toby.jpg">`)
}

func dogPic(w http.ResponseWriter, req *http.Request) {
	f, err := os.Open("toby.jpg")
	if err != nil {
		http.Error(w, "file not found", 404)
		return
	}
	defer f.Close()

	fi, err := f.Stat()
	if err != nil {
		http.Error(w, "file not found", 404)
		return
	}
	/*
		// ServeContent使用以下内容回复请求：
		//提供ReadSeeker。 ServeContent优于io.Copy的主要优点
		//是可以正确处理Range请求，设置MIME类型以及
		//处理If-Match，If-Unmodified-Since，If-None-Match，If-Modified-Since，
		//和If-Range请求。
		//
		//如果未设置响应的Content-Type标头，则ServeContent
		//首先尝试从名称的文件扩展名推断出类型，然后，
		//如果失败，则退回到读取内容的第一块
		//并将其传递给DetectContentType。
		//名称未使用；特别是它可以是空的并且是
		//从不发送响应。
		//
		//如果modtime不是零时间或Unix时代，则ServeContent
		//将其包含在响应的Last-Modified标头中。如果
		//请求包含一个If-Modified-Since标头，ServeContent使用
		// modtime决定是否完全需要发送内容。
		//
		//内容的Seek方法必须起作用：ServeContent使用
		//搜索内容的末尾以确定其大小。
		//
		//如果调用者设置了按照RFC 7232第2.3节格式化的w的ETag标头，
		// ServeContent使用它来处理使用If-Match，If-None-Match或If-Range的请求。
		//
		//注意* os.File实现了io.ReadSeeker接口。
	*/
	http.ServeContent(w, req, f.Name(), fi.ModTime(), f)
}
