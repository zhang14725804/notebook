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