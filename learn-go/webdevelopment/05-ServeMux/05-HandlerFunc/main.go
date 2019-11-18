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
		type HandlerFunc func(ResponseWriter, *Request)
	*/
	http.Handle("/dog", http.HandlerFunc(d))
	http.Handle("/cat", http.HandlerFunc(c))

	http.ListenAndServe(":8080", nil)
}

/*

	type hotdog int

	func main() {
		var x hotdog
		x = 7

		var y int
		y = int(x)

		fmt.Println(y)
	}

	func main() {
		var x int
		x = 7

		var y hotdog
		y = hotdog(x)

		fmt.Println(y)
	}
*/
