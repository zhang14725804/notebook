package main

import (
	"fmt"
	"log"
	"net"
)

/*
	dial write

	run "02_read-scanner"
	run "07_dial-write"
*/
func main() {
	conn, err := net.Dial("tcp", ":8080")
	if err != nil {
		log.Fatalln(err)
	}
	defer conn.Close()

	fmt.Fprintln(conn, "I dialed you.")
}
