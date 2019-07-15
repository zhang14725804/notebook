package main

import (
	"bufio"
	"cmd/pipeline"
	"fmt"
	"os"
)

func main() {
	// 文件名
	// const filename = "large.in"
	const filename = "small.in"
	// 数据量100000000个数据800M
	// 数据量50个数据400byte
	// const number = 100000000
	const number = 64
	// 创建文件
	file, err := os.Create(filename)
	// 不做任何处理
	if err != nil {
		panic(err)
	}
	// 相当于finally
	defer file.Close()
	// 写数据
	p := pipeline.RandomSource(number)
	// bufio.NewReader增加读写速度，有一个默认的buffer size
	writer := bufio.NewWriter(file)
	pipeline.WriterSink(writer, p)
	writer.Flush()
	// 读数据
	file, err = os.Open(filename)
	if err != nil {
		panic(err)
	}
	defer file.Close()
	p = pipeline.ReaderSource(bufio.NewReader(file), -1)
	// 打印前100个数据
	count := 0
	for v := range p {
		fmt.Println(v)
		count++
		if count >= 100 {
			break
		}
	}
}

func MergeDemo() {
	p := pipeline.Merge(pipeline.InMemSort(pipeline.ArraySource(3, 8, 1)), pipeline.InMemSort(pipeline.ArraySource(4, 2, 5, 7)))
	// 需要判断channel是否还存在
	// for {
	// 	if num, ok := <-p; ok {
	// 		fmt.Println(num)
	// 	} else {
	// 		break
	// 	}
	// }
	// range简便写法
	for v := range p {
		fmt.Println(v)
	}
}
