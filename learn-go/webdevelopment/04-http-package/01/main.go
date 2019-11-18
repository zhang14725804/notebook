package main

import (
	"bufio"
	"fmt"
	"log"
	"net"
	"strings"
)

/*
	create a server that returns the URL of the GET request
*/
func main() {
	// 创建TCP服务并监听端口
	server, err := net.Listen("tcp", ":8080")
	if err != nil {
		log.Fatalln(err.Error())
	}
	defer server.Close()
	// 死循环处理客户端请求
	for {
		// 等待客户端连接
		conn, err := server.Accept()
		if err != nil {
			log.Fatalln(err.Error())
			continue
		}
		// 通过goroutine来处理用户请求
		go handle(conn)
	}
}

func handle(conn net.Conn) {
	defer conn.Close()
	request(conn)
	response(conn)
}

func request(conn net.Conn) {
	i := 0
	// 读取字节数据
	scanner := bufio.NewScanner(conn)
	/*
		Scanner.Scan方法，相当于其他语言的迭代器iterator，并把迭代器指向的数据存放到新的缓冲区里。
		新的缓冲区(token)可以通过scanner.Text()或者scanner.Bytes()获取到
	*/
	for scanner.Scan() {
		ln := scanner.Text()
		// 打印请求
		fmt.Println(ln)
		if i == 0 {
			// 分割字符串 [256]uint8{'\t': 1, '\n': 1, '\v': 1, '\f': 1, '\r': 1, ' ': 1}
			m := strings.Fields(ln)[0]
			/*
				请求行第一行：：GET /index.html HTTP/1.1
			*/
			fmt.Println("**METHOD**", m)
		}
		if ln == "" {
			break
		}
		i++
	}
}

func response(conn net.Conn) {
	body := `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title></title></head><body><strong>Hello World</strong></body></html>`
	fmt.Fprint(conn, "HTTP/1.1 200 OK\r\n")
	fmt.Fprintf(conn, "Content-Length: %d\r\n", len(body))
	fmt.Fprint(conn, "Content-Type: text/html\r\n")
	fmt.Fprint(conn, "\r\n")
	fmt.Fprint(conn, body)

}
