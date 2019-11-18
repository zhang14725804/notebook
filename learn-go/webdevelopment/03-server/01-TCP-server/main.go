package main

import (
	"fmt"
	"io"
	"log"
	"net"
)

/*
	https://godoc.org/net
	https://godoc.org/net/http
*/

/*
	目标：：write to connection

	powershell 中运行 go run main.go
	另一个powershell中 telnet localhost 8080
	报错：：telnet : 无法将“telnet”项识别为 cmdlet、函数、脚本文件或可运行程序的名称。请检查名称的拼写，如果包括路径，请确保路径 正确，然后再试一次。
	解决方法：安装telnet服务

	on windows you can install telnet on Mac, should be there
	start main.go (go run main.go) then go to another terminal window and enter this: telnet localhost 8080
*/
func main() {
	/*
		func Listen(network, address string) (Listener, error)

		type Listener interface {
			Accept() (Conn, error)
			Close() error
			Addr() Addr
		}
	*/
	server, err := net.Listen("tcp", ":8080")
	if err != nil {
		log.Fatalln(err)
	}

	defer server.Close()

	//  goroutines
	for {
		/*
			Accept() (Conn, error)

			type Conn interface {
				Read(b []byte) (n int, err error)
				Write(b []byte) (n int, err error)
				Close() error
				LocalAddr() Addr
				RemoteAddr() Addr
				SetDeadline(t time.Time) error
				SetReadDeadline(t time.Time) error
				SetWriteDeadline(t time.Time) error
			}
		*/
		conn, err := server.Accept()
		if err != nil {
			log.Println(err)
			continue
		}
		/*
			func WriteString(w Writer, s string) (n int, err error)
		*/
		io.WriteString(conn, `\nHello from TCP server/n`)
		fmt.Fprintln(conn, `How is your day`)
		fmt.Fprintln(conn, "v%", `well, I hope`)
		conn.Close()
	}
}
