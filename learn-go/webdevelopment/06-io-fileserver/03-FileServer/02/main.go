package main

import (
	"io"
	"net/http"
)

/*
	路径代理？
	./assets/toby.jpg
*/
func main() {
	/*
		// StripPrefix returns a handler that serves HTTP requests
		// by removing the given prefix from the request URL's Path
		// and invoking the handler h. StripPrefix handles a
		// request for a path that doesn't begin with prefix by
		// replying with an HTTP 404 not found error.
	*/
	http.Handle("/resources/", http.StripPrefix("/resources", http.FileServer(http.Dir("./assets"))))
	http.HandleFunc("/", dog)
	http.ListenAndServe(":8080", nil)
}

func dog(w http.ResponseWriter, req *http.Request) {
	w.Header().Set("Content-Type", "text/html; charset=utf-8")
	io.WriteString(w, `<img src="toby.jpg">`)
}
