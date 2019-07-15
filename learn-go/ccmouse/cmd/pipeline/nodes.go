package pipeline

import (
	"encoding/binary"
	"fmt"
	"io"
	"math/rand"
	"sort"
	"time"
)

var startTime time.Time

func InitTime() {
	startTime = time.Now()
}

// ...表示可变长参数 <- 表示只用做输出
func ArraySource(a ...int) <-chan int {
	// 创建channel ，用作goroutine之间的通信
	out := make(chan int)
	// 创建一个goroutine
	go func() {
		for _, v := range a {
			out <- v
		}
		close(out)
	}()
	return out
}

// 内部排序
// func首字母要大写
func InMemSort(in <-chan int) <-chan int {
	out := make(chan int, 1024)
	go func() {
		// read into memory
		a := []int{}
		for v := range in {
			a = append(a, v)
		}
		fmt.Println("Read Done:", time.Now().Sub(startTime))
		// sort
		sort.Ints(a)
		fmt.Println("InMemSort Done:", time.Now().Sub(startTime))
		// output
		for _, v := range a {
			out <- v
		}
		close(out)
	}()
	return out
}

// 外部排序（归并节点）
func Merge(in1, in2 <-chan int) <-chan int {
	out := make(chan int, 1024)
	// 同事从两个channel获取数据并比较大小
	go func() {
		v1, ok1 := <-in1
		v2, ok2 := <-in2
		// channel的关闭和检测
		for ok1 || ok2 {
			if !ok2 || (ok1 && v1 <= v2) {
				out <- v1
				v1, ok1 = <-in1
			} else {
				out <- v2
				v2, ok2 = <-in2
			}
		}
		fmt.Println("Merge Done:", time.Now().Sub(startTime))
		// fatal error: all goroutines are asleep - deadlock!
		close(out)
	}()
	return out
}

// 从reader读数据,chunkSize用来分块
func ReaderSource(reader io.Reader, chunkSize int) <-chan int {
	// 给channel增加buffer优化速度
	out := make(chan int, 1024)
	go func() {
		// 创建一个大小为8的slice
		buffer := make([]byte, 8)
		bytesRead := 0
		for {
			// go语言的函数可以返回两个值
			n, err := reader.Read(buffer)
			bytesRead += n
			if n > 0 {
				// 这里干了个啥
				v := int(binary.BigEndian.Uint64(buffer))
				out <- v
			}
			if err != nil || (chunkSize != -1 && bytesRead >= chunkSize) {
				break
			}
		}
		close(out)
	}()
	return out
}

// 写数据
func WriterSink(writer io.Writer, in <-chan int) {
	for v := range in {
		buffer := make([]byte, 8)
		binary.BigEndian.PutUint64(buffer, uint64(v))
		writer.Write(buffer)
	}
}

// 生成随机数
func RandomSource(count int) <-chan int {
	out := make(chan int)
	go func() {
		for i := 0; i < count; i++ {
			//  引入math/rand包，不能搞错了
			out <- rand.Int()
		}
		close(out)
	}()
	return out
}

// N个节点反复两两归并
func MergeN(inputs ...<-chan int) <-chan int {
	if len(inputs) == 1 {
		return inputs[0]
	}
	m := len(inputs) / 2
	// 合并[0,m)和[m,end)
	return Merge(MergeN(inputs[:m]...), MergeN(inputs[m:]...))
}
