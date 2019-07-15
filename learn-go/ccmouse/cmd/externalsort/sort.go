package main

import (
	"bufio"
	"cmd/pipeline"
	"fmt"
	"os"
)

func main() {
	p := createPipeLine("large.in", 800000000, 4)
	writeToFile(p, "large.out")
	printFile("large.out")
}
func writeToFile(p <-chan int, filename string) {
	file, err := os.Create(filename)
	if err != nil {
		panic(err)
	}
	defer file.Close()
	writer := bufio.NewWriter(file)
	// 先执行Flush，后执行Close
	defer writer.Flush()
	pipeline.WriterSink(writer, p)
}
func printFile(filename string) {
	file, err := os.Open(filename)
	if err != nil {
		panic(err)
	}
	defer file.Close()
	p := pipeline.ReaderSource(file, -1)
	count := 0
	for v := range p {
		fmt.Println(v)
		count++
		if count >= 100 {
			break
		}
	}
}
func createPipeLine(filename string, fileSize, chunkCount int) <-chan int {
	// 每片大小
	chunkSize := fileSize / chunkCount
	pipeline.InitTime()
	// 搜集排序结果
	sortResult := []<-chan int{}
	for i := 0; i < chunkCount; i++ {
		file, err := os.Open(filename)
		if err != nil {
			panic(err)
		}
		file.Seek(int64(i*chunkSize), 0)
		source := pipeline.ReaderSource(bufio.NewReader(file), chunkSize)
		sortResult = append(sortResult, pipeline.InMemSort(source))
	}
	return pipeline.MergeN(sortResult...)
}
