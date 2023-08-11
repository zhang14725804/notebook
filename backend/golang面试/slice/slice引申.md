[切片的容量是怎样增长的](https://qcrao91.gitbook.io/go/shu-zu-he-qie-pian/qie-pian-de-rong-liang-shi-zen-yang-zeng-chang-de)


### slice扩容谬论

当原 slice 容量小于 1024 的时候，新 slice 容量变成原来的 2 倍；原 slice 容量超过 1024，新 slice 容量变成原来的1.25倍。

```go
func main() {
	s := make([]int, 0)

	oldCap := cap(s)

	for i := 0; i < 2048; i++ {
		s = append(s, i)

		newCap := cap(s)

		if newCap != oldCap {
			fmt.Printf("[%d -> %4d] cap = %-4d  |  after append %-4d  cap = %-4d\n", 0, i-1, oldCap, i, newCap)
			oldCap = newCap
		}
	}
}

```

在老 slice 容量小于1024的时候，新 slice 的容量的确是老 slice 的2倍。目前还算正确。

但是，当老 slice 容量大于等于 1024 的时候，情况就有变化了。当向 slice 中添加元素 1280 的时候，老 slice 的容量为 1280，之后变成了 1696，两者并不是 1.25 倍的关系（1696/1280=1.325）。添加完 1696 后，新的容量 2304 当然也不是 1696 的 1.25 倍。

看到了吗？如果只看前半部分，现在网上各种文章里说的 newcap 的规律是对的。现实是，后半部分还对 newcap 作了一个内存对齐，这个和内存分配策略相关。进行内存对齐之后，新 slice 的容量是要 大于等于 老 slice 容量的 2倍或者1.25倍。

之后，向 Go 内存管理器申请内存，将老 slice 中的数据复制过去，并且将 append 的元素添加到新的底层数组中。

最后，向 growslice 函数调用者返回一个新的 slice，这个 slice 的长度并没有变化，而容量却增大了。

### 切片使用场景（注意看注释）

```go
func main() {
	slice := []int{0, 1, 2, 3, 4, 5, 6, 7, 8, 9}
	// s1 从 slice 索引2（闭区间）到索引5（开区间，元素真正取到索引4），长度为3，容量默认到数组结尾，为8
	s1 := slice[2:5] // {2, 3, 4}
	// s2 从 s1 的索引2（闭区间）到索引6（开区间，元素真正取到索引5），容量到索引7（开区间，真正到索引6），为5。
	s2 := s1[2:6:7] // {4, 5, 6, 7}

	// s2 容量刚好够，直接追加。不过，这会修改原始数组对应位置的元素。这一改动，数组和 s1 都可以看得到。
	s2 = append(s2, 100) // {4, 5, 6, 7,100}
	// s2 的容量不够用，该扩容了。于是，s2 另起炉灶，将原来的元素复制新的位置，扩大2容量
	s2 = append(s2, 200) // {4, 5, 6, 7,100, 200}

	// 这次只会影响原始数组相应位置的元素。它影响不到 s2 了
	s1[2] = 20 // {2, 3, 20}

	fmt.Println(s1)    // {2, 3, 20}
	fmt.Println(s2)    // [4 5 6 7 100 200]
	fmt.Println(slice) // [0 1 2 3 20 5 6 7 100 9]
}
```

### 切片作为函数参数

不管传的是 slice 还是 slice 指针，如果改变了 slice 底层数组的数据，会反应到实参 slice 的底层数据。
为什么能改变底层数组的数据？很好理解：底层数据在 slice 结构体里是一个指针，仅管 slice 结构体自身不会被改变，也就是说底层数据地址不会被改变。 但是通过指向底层数据的指针，可以改变切片的底层数据，没有问题。


```go
func myAppend(s []int) []int {
	// 这里 s 虽然改变了，但并不会影响外层函数的 s
	s = append(s, 100)
	return s
}

func myAppendPtr(s *[]int) {
	// 会改变外层 s 本身
	*s = append(*s, 100)
	return
}

func main() {
	s := []int{1, 1, 1}
	newS := myAppend(s)

	fmt.Println(s)
	fmt.Println(newS)

	s = newS

	myAppendPtr(&s)
	fmt.Println(s)
}
```

### append函数执行完后，返回的是一个全新的 slice，并且对传入的 slice 并不影响

```go
func main() {
    s := []int{5}
    s = append(s, 7)
    s = append(s, 9)
    x := append(s, 11)
    y := append(s, 12)
    fmt.Println(s, x, y)
}
```


### 扩容(question)

如果按网上各种文章中总结的那样：小于原 slice 长度小于 1024 的时候，容量每次增加 1 倍。添加元素 4 的时候，容量变为4；添加元素 5 的时候不变；添加元素 6 的时候容量增加 1 倍，变成 8。这是错误的说法

```go
func main() {
	s := []int{1, 2}
	s = append(s, 4, 5, 6)
	fmt.Printf("len=%d, cap=%d", len(s), cap(s))
}
```

### 向一个nil的slice添加元素会发生什么？为什么？

其实 nil slice 或者 empty slice 都是可以通过调用 append 函数来获得底层数组的扩容。最终都是调用 mallocgc 来向 Go 的内存管理器申请到一块内存，然后再赋给原来的nil slice 或 empty slice，然后摇身一变，成为“真正”的 slice 了。


