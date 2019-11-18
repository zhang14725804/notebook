package main

import (
	"log"
	"net/http"
)

/*
	github 下载某个文件夹
	https://minhaskamal.github.io/DownGit/#/home
*/
func main() {
	log.Fatal(http.ListenAndServe(":8080", http.FileServer(http.Dir("."))))
}
