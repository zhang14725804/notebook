### golang垃圾回收

https://draveness.me/golang/docs/part3-runtime/ch07-memory/golang-garbage-collector/
https://zhuanlan.zhihu.com/p/297177002
https://golang.design/under-the-hood/zh-cn/part2runtime/ch08gc/basic/
https://developer.aliyun.com/article/775798
https://juejin.cn/post/7111515970669117447

[Golang 垃圾回收原理与优化](https://mp.weixin.qq.com/s/WBoU4v7dI29JX_2lETaw6A)
go tool pprof 😅 😅
go tool trace 😅 😅

## 垃圾回收算法

### 标记清除

1. 标记
2. 清除
3. STW (Stop The World)

### 三色标记法

1. 白色、灰色、黑色
2. STW
3. 可能错误地回收
4. 用户程序可能在标记执行的过程中修改对象的指针，所以三色标记清除算法本身是不可以并发或者增量执行的

### 屏障技术

1. 强三色不变式
2. 弱三色不变式
3. 插入写屏障满足强三色不变式
4. 删除写屏障满足满足弱三色不变式

### 混合写屏障

### 触发时机

1. 后台定时触发
2. 手动触发
3. 申请内存时