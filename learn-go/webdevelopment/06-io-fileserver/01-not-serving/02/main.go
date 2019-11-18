package main

import (
	"io"
	"net/http"
)

func main() {
	http.HandleFunc("/", dog)
	http.ListenAndServe(":8080", nil)
}

func dog(w http.ResponseWriter, req *http.Request) {
	w.Header().Set("Content-Type", "text/html;charset=utf-8")
	// TODOS：：获取不到图片
	io.WriteString(w, `<img src="/toby.jpg">`)
}
