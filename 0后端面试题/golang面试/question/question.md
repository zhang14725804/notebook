```golang
// question 1
func main() {
	data, _ := json.Marshal(context.WithValue(context.Background(), "a", "b"))
	fmt.Println(string(data))
}
```

```golang
	// question 2
	var x int
	inc := func() int {
		fmt.Println("init==", x)
		x++
		return x
	}
	// 打印：1 2
	fmt.Println(func() (a, b int) {
		return inc(), inc()
	}())

	// question 3
	var (
		a int         = 0
		b int64       = 0
		c interface{} = int(0)
		d interface{} = int64(0)
	)

	println(c == 0) // true
	println(c == a) // true
	println(c == b) // false
	println(d == b) // true
	println(d == 0) // false
```

```golang
// question 4
type Stats struct {
    mutex sync.Mutex

    counters map[string]int
}

func (s *Stats) Snapshot() map[string]int {
    s.mutex.Lock()
    defer s.mutex.Unlock()

    return s.counters
}

func (s *Stats) Add(name string, num int) {
    s.mutex.Lock()
    defer s.mutex.Unlock()
    s.counters[name] = num
}
```


```golang
func main() {
	a, b, c := 2.0, 1.0, 0.0
	x, y := a/c, b/c     // infinity
	n := math.NaN()      // not a number
	m := math.Sqrt(-1.0) // not a number
	println(x == y, m == n) // true false
}
```

```golang
// Go 语言的函数参数传递，只有值传递，没有引用传递。
// 😅😅😅 question 这句话怎么理解。比如myAppendPtr，这里传递的不就是引用么
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