package main

import (
	"io"
	"net/http"
)

/*
	也是路径代理
*/
func main() {
	http.HandleFunc("/", dog)
	http.Handle("/assets/", http.StripPrefix("/assets", http.FileServer(http.Dir("./assets"))))
	http.ListenAndServe(":8080", nil)
}

func dog(w http.ResponseWriter, req *http.Request) {
	w.Header().Set("Content-Type", "text/html; charset=utf-8")
	io.WriteString(w, `<img src="/assets/toby.jpg">`)
}
