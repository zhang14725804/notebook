package main

import (
	"fmt"
	"net/http"

	"github.com/julienschmidt/httprouter"
)

/*
	curl localhost:8080
*/
func main() {
	r := httprouter.New()
	r.GET("/", index)
	http.ListenAndServe(":8080", r)
}

func index(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
	fmt.Fprint(w, "Welcome!\n")
}
