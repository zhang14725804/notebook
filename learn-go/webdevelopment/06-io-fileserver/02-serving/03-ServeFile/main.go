package main

import (
	"io"
	"net/http"
)

func main() {
	http.HandleFunc("/", dog)
	http.HandleFunc("/toby.jpg", dogPic)
	http.ListenAndServe(":8080", nil)
}

func dog(w http.ResponseWriter, req *http.Request) {
	w.Header().Set("Content-Type", "text/html; charset=utf-8")
	io.WriteString(w, `<img src="toby.jpg">	`)
}

func dogPic(w http.ResponseWriter, req *http.Request) {
	/*
		// ServeFile使用命名的内容回复请求
		//文件或目录。
		//
		//如果提供的文件或目录名称是相对路径，则为
		//相对于当前目录的解释，可能会升至
		//父目录。如果提供的名称是由用户构造的
		//输入，应在调用ServeFile之前清除它。
		//
		//作为预防措施，ServeFile将在r.URL.Path处拒绝请求
		//包含一个“ ..”路径元素；这样可以防止来电者
		//可能不安全地在r.URL.Path上使用filepath.Join而不进行清理
		//它，然后使用该文件路径。将结果作为名称参数。
		//
		//作为另一种特殊情况，ServeFile会在r.URL.Path处重定向任何请求
		//以“ /index.html”结尾到相同的路径，没有最后一个
		//“ index.html”。为避免此类重定向，请修改路径或
		//使用ServeContent。
		//
		//在这两种特殊情况下，ServeFile不使用
		// r.URL.Path，用于选择要提供的文件或目录；只有
		//使用name参数中提供的文件或目录。
	*/
	http.ServeFile(w, req, "toby.jpg")
}
