package main

import (
	"fmt"
)

func main(){
	hmap:=make(map[int]int)
	hmap[0]=0
	hmap[1]=1
	hmap[2]=2
	fmt.Println(len(hmap))
}

// LogExtractor.exe -f "Start Time" -t "End Time" -i "Log file directory location"
// go读取大文件过程 😅😅😅 https://mp.weixin.qq.com/s/WsWPCfFCMre5HH6AkPhEAg
// https://medium.com/swlh/processing-16gb-file-in-seconds-go-lang-3982c235dfa2
// func main() {
// 	s := time.Now()
// 	args := os.Args[1:]
// 	if len(args) != 6 {
// 		fmt.Println("Please give proper command line arguments")
// 		return
// 	}
// 	// 获取命令行参数
// 	startTimeArg := args[1]
// 	endTimeArg := args[3]
// 	filename := args[5]
// 	readFile(filename, startTimeArg, endTimeArg)
// }

// func readFile(filename string, startTimeArg, endTimeArg string) {
// 	queryStartTime, err := time.Parse("2006-01-02T15:04:05.0000Z", startTimeArg)
// 	if err != nil {
// 		fmt.Println("Could not able to parse the start time", startTimeArg)
// 		return
// 	}

// 	queryEndTime, err := time.Parse("2006-01-02T15:04:05.0000Z", endTimeArg)
// 	if err != nil {
// 		fmt.Println("Could not able to parse the finish time", endTimeArg)
// 		return
// 	}

// 	file, err := os.Open(filename)
// 	if err != nil {
// 		fmt.Println("cannot able to read the file", err)
// 		return
// 	}
// 	// 记得关闭
// 	defer file.Close()
// 	// 获取文件信息
// 	filestat, err := file.Stat()
// 	if err != nil {
// 		fmt.Println("Could not able to get the file stat")
// 		return
// 	}
// 	fileSize := filestat.Size()
// 	offset := fileSize - 1
// 	lastLineSize := 0

// 	for {

// 	}
// }
