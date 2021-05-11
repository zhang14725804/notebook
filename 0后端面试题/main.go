package main

import (
	"fmt"
	"sync"
)

var mutex sync.RWMutex
var data = 5

func readData() {
	mutex.Lock()
	defer mutex.Unlock()
	fmt.Println(data)
}

func writeData() {
	mutex.RLock()
	defer mutex.RUnlock()
	data = 6
}
func main() {
	writeData()
	readData()
}
