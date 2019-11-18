package main

import (
	"bufio"
	"fmt"
	"log"
	"net"
	"strings"
)

/*
	处理输入ascii

	run this file, then go to another terminal window and enter this: telnet localhost 8080
*/
func main() {
	// 创建TCP服务并监听端口
	server, err := net.Listen("tcp", ":8080")
	if err != nil {
		log.Fatal(err)
	}
	defer server.Close()
	// 死循环处理客户端请求
	for {
		// 等待客户端连接
		conn, err := server.Accept()
		if err != nil {
			log.Println(err)
			continue
		}
		// 通过goroutine来处理用户请求
		go handle(conn)
	}
}

func handle(conn net.Conn) {
	// 读取数据
	scanner := bufio.NewScanner(conn)
	/*
		Scanner.Scan方法，相当于其他语言的迭代器iterator，并把迭代器指向的数据存放到新的缓冲区里。
		新的缓冲区(token)可以通过scanner.Text()或者scanner.Bytes()获取到
	*/
	for scanner.Scan() {
		ln := strings.ToLower(scanner.Text())
		bs := []byte(ln)
		r := rot13(bs)

		fmt.Fprintf(conn, "%s - %s\n\n", ln, r)
	}
}

func rot13(bs []byte) []byte {
	var r13 = make([]byte, len(bs))
	for i, v := range bs {
		// https://zh.wikipedia.org/wiki/ASCII
		// ascii 97 -122
		if v <= 109 {
			r13[i] = v + 13
		} else {
			r13[i] = v - 13
		}
	}
	return r13
}
