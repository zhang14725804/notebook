package main

import (
	"fmt"
	"net/http"
)

func main() {
	http.HandleFunc("/", foo)
	/*
		// NotFoundHandler returns a simple request handler
		// that replies to each request with a ``404 page not found'' reply.
	*/
	http.Handle("/favicon.ico", http.NotFoundHandler())
	http.ListenAndServe(":8080", nil)
}

func foo(w http.ResponseWriter, req *http.Request) {
	fmt.Println(req.URL.Path)
	fmt.Fprintln(w, "go look at your terminal")
}
