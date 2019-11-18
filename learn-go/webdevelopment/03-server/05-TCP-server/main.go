package main

import (
	"fmt"
	"io/ioutil"
	"log"
	"net"
)

/*
	dial read

	run "01_write"
	run "06_dial-read"
*/
func main() {
	conn, err := net.Dial("tcp", ":8080")
	if err != nil {
		log.Fatalln(err)
	}
	defer conn.Close()

	bs, err := ioutil.ReadAll(conn)
	if err != nil {
		log.Fatalln(err)
	}
	fmt.Println(string(bs))
}
