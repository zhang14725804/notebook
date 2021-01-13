package main

import (
	. "fmt"
	"sync"
)

type UserAges struct {
	ages       map[string]int
	sync.Mutex // 继承锁
}

func (ua *UserAges) Add(name string, age int) {
	ua.Lock()
	defer ua.Unlock()
	ua.ages[name] = age
}

// 并发不安全
func (ua *UserAges) Get(name string) int {
	if age, ok := ua.ages[name]; ok {
		return age
	}
	return -1
}
func main() {
	ua := UserAges{ages: make(map[string]int)}
	//  🔥🔥🔥  等待主协程中创建的协程执行完毕之后再结束主协程（或者用channel也可以，sleep也行）
	var wg sync.WaitGroup
	wg.Add(20)
	for i := 0; i < 19; i++ {
		go func() {
			age := ua.Get("你好")
			Println(age)
			wg.Done()
		}()
	}
	go func() {
		ua.Add("你好", 18)
		wg.Done()
	}()
	wg.Wait()
}
