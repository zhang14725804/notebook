package main

import (
	"log"
	"net/http"
)

/*
	POST和get的区别
	https://stackoverflow.com/questions/3477333/what-is-the-difference-between-post-and-get
*/

func main() {
	handler := http.HandlerFunc(PlayerServer)
	if err := http.ListenAndServe(":5000", handler); err != nil {
		log.Fatalf("could not listen on port 5000 %v", err)
	}
}
