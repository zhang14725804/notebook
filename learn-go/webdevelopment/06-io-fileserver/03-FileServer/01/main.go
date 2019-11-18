package main

import (
	"io"
	"net/http"
)

/*
	这个有点意思
	列出当前目录下所有文件
*/
func main() {
	/*
		// FileServer returns a handler that serves HTTP requests
		// with the contents of the file system rooted at root.
		//
		// To use the operating system's file system implementation,
		// use http.Dir:
		//
		//     http.Handle("/", http.FileServer(http.Dir("/tmp")))
		//
		// As a special case, the returned file server redirects any request
		// ending in "/index.html" to the same path, without the final
		// "index.html".
	*/
	http.Handle("/", http.FileServer(http.Dir(".")))
	http.HandleFunc("/dog", dog)
	http.ListenAndServe(":8080", nil)
}

func dog(w http.ResponseWriter, req *http.Request) {
	w.Header().Set("Content-Type", "text/html; charset=utf-8")
	io.WriteString(w, `<img src="toby.jpg">`)
}
