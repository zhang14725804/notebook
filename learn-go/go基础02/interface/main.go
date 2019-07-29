package main

import (
	"fmt"
	"interface/mock"
	"interface/real"
)

// 接口由使用者定义
type Retriever interface {
	Get(url string) string
}
type Poster interface {
	Post(url string, form map[string]string) string
}

const targeturl = "https://www.baidu.com"

func post(poster Poster) {
	poster.Post(targeturl, map[string]string{
		"name":   "ccmouse",
		"course": "golang",
	})
}

// 接口的组合
type RetrieverPoster interface {
	Retriever
	Poster
}

func session(s RetrieverPoster) string {
	s.Post(targeturl, map[string]string{
		"contents": "faked baidu.com",
	})
	return s.Get(targeturl)
}
func download(r Retriever) string {
	return r.Get(targeturl)
}
func main() {
	var r Retriever
	retriever := mock.Retriever{"this is content"}
	r = &retriever
	fmt.Println(download(r))
	r = real.Retriever{}
	fmt.Println(download(r))
	fmt.Println("try a session")
	fmt.Println(session(&retriever))

}
