package main

import (
	"log"
	"net/http"
)

/*
	POST和get的区别
	https://stackoverflow.com/questions/3477333/what-is-the-difference-between-post-and-get
*/
/*
	收集内存中的用户信息
*/
type InMemoryPlayerStore struct{}

/*
	根据给定用户信息返回数据
*/
func (i *InMemoryPlayerStore) GetPlayerStore(name string) int {
	return 123
}
func main() {
	server := &PlayerServer{&InMemoryPlayerStore{}}
	if err := http.ListenAndServe(":5000", server); err != nil {
		log.Fatalf("could not listen on port 5000 %v", err)
	}
}
