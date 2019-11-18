package main

import (
	"io"
	"net/http"
)

type hotdog int
type hotcat int

func (d hotdog) ServeHTTP(res http.ResponseWriter, req *http.Request) {
	io.WriteString(res, "doggggg")
}

func (c hotcat) ServeHTTP(res http.ResponseWriter, req *http.Request) {
	io.WriteString(res, "cattttt")
}

func main() {
	var d hotdog
	var c hotcat
	/*
		func NewServeMux() *ServeMux { return new(ServeMux) }
		func Handle(pattern string, handler Handler) { DefaultServeMux.Handle(pattern, handler) }
	*/
	mux := http.NewServeMux()
	mux.Handle("/dog/", d)
	mux.Handle("/cat", c)
	/*
		ListenAndServe starts an HTTP server with a given address and handler.
		The handler is usually nil, which means to use DefaultServeMux. Handle and HandleFunc add handlers to DefaultServeMux
	*/
	http.ListenAndServe(":8080", mux)
}
