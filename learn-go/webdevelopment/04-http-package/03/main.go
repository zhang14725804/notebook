package main

import (
	"fmt"
	"net/http"
)

type hotdog int

// 挂载方法？
func (m hotdog) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintln(w, "Any code you want in this func")
}

/*
	TODOS：：interface和struct如何应用
*/
func main() {
	var d hotdog
	// 底层用net
	http.ListenAndServe(":8080", d)
}
