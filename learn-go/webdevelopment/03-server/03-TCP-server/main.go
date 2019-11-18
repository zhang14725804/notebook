package main

import (
	"bufio"
	"fmt"
	"log"
	"net"
)

/*
	read-write


	An open connection blocks.

	The reader is reading from the open connection.

	How does the reader know when it should stop reading?

	Instructions: run this file, then go to another terminal window and enter this: telnet localhost 8080

*/
func main() {
	server, err := net.Listen("tcp", ":8080")
	if err != nil {
		log.Fatalln(err)
	}
	defer server.Close()

	for {
		conn, err := server.Accept()
		if err != nil {
			log.Println(err)
			continue
		}
		go handle(conn)
	}
}

/*
	TODOS：：这里做了什么，不懂
	结果：打印request信息
*/
func handle(conn net.Conn) {
	scanner := bufio.NewScanner(conn)
	for scanner.Scan() {
		ln := scanner.Text()
		fmt.Println(ln)

		// TODOS：： write 检测输入？
		fmt.Fprintf(conn, "I heard you say: %s\n", ln)
	}
	defer conn.Close()

	// we never get here
	// we have an open stream connection
	// how does the above reader know when it's done?
	fmt.Println("Code got here.")
}
