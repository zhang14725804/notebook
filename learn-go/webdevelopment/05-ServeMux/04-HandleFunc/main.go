package main

import (
	"io"
	"net/http"
)

func d(res http.ResponseWriter, req *http.Request) {
	io.WriteString(res, "doggggg")
}

func c(res http.ResponseWriter, req *http.Request) {
	io.WriteString(res, "cattttt")
}

func main() {
	/*
		func HandleFunc(pattern string, handler func(ResponseWriter, *Request)) {
			DefaultServeMux.HandleFunc(pattern, handler)
		}
	*/
	http.HandleFunc("/dog", d)
	http.HandleFunc("/cat", c)
	/*
		ListenAndServe starts an HTTP server with a given address and handler.
		The handler is usually nil, which means to use DefaultServeMux. Handle and HandleFunc add handlers to DefaultServeMux
	*/
	http.ListenAndServe(":8080", nil)
}
