# 并发编程

## context

### context包核心API

1. WithValue
2. WithCancel
3. WithDeadline
4. WithTimeout

### context

1. 传递数据
2. 控制链路
3. 控制从上到下，查找从下到上
4. 父context无法拿到子context的值，用map绕过这个限制
5. withValue实现原理，装饰器模式
6. cancelCtx实现原理
7. timerCtx实现原理

### context使用例子

6. DB.conn控制超时
7. http.Request
8. errgroup

## 并发编程

### Mutex，RWMutex

1. double check，读的时候检查一次，写的时候再检查一次
2. Mutex加锁实现原理：原子操作 + 自旋 + 等待队列
3. 正常模式和饥饿模式：保证效率和公平
4. Mutex，RWMutex都不可重入，也就是不能重复加锁
5. 释放锁原理

### Once

1. 初始化资源
2. 单例模式
3. 实现原理：double-check + 原子操作


### Pool😅

1. Pool实现原理：全局大锁，改为大锁 + 局部变量
2. TLB（thread-local-buffer）
3. Get原理
4. Put原理
5. Pool于GC 

### bytebufferpool原理

6. buffer缓存痛点：太小会扩容，太大会浪费

### WaitGroup

1. 实现原理：无锁，原子操作，64位分为高32和低32位两部分
2. noCopy，如何实现noCopy
3. add，done，wait

### channel

1. channel发布订阅模式的缺点
2. channel实现消息队列 😅😅😅
3. channel实现任务池 😅😅😅

# 