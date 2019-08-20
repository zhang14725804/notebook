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
	/*
		cannot use NewInMemoryPlayerStore() (type *InMemoryPlayerStore) as type PlayerStore in field value:
		InMemoryPlayerStore does not implement PlayerStore (missing GetPlayerStore method)
	*/
	server := &PlayerServer{NewInMemoryPlayerStore()}
	if err := http.ListenAndServe(":5000", server); err != nil {
		log.Fatalf("could not listen on port 5000 %v", err)
	}
}
