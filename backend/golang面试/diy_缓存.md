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
4. channel实现生产者消费者模型 😅😅😅

### channel与gouroutine泄漏

1. 只发不收
2. 只收不发
3. 读写nil
4. goroutine泄漏是因为没有唤醒阻塞的goroutine

### channel与内存逃逸

1. 用channel发送指针，必然会导致内存逃逸，编译器无法确定最终被那个goroutine接受
2. 如何排查呢

### channel源码

1. channel底层要考虑几个问题：用缓冲存储数据；既能阻塞也要能唤醒；维护收发两个等待【队列】
2. hchan
3. chansend
4. chanrecv

# 缓存模块

## 本地缓存实现

### map实现本地缓存

1. API为什么不用范型 😅
2. go不支持范型方法
3. 如何处理key过期时间 😅：
    a. 每个key用一个goroutine盯着
    b. 一个goroutine盯着所有的，要控制检查的时间间隔，要控制遍历的资源开销
    c. get的时候检查是否过期，遍历key找出过期的key并删除
4. redis过期处理：get的时候检查是否过期，遍历key找出过期的key并删除
5. sql.DB空闲连接关闭处理：get的时候检查是否过期

### evict回调与关闭 😊

1. 【CDC】接口（change data capture）
2. delete、过期删除
3. 记得测试用例

### 控制本地缓存内存

1. LRU，LFU
2. 控制内存：控制整体键值对数量；控制整体内存
3. 装饰器模型，重写onEvicted
4. 重写set的时候注意并发问题
5. 缓存过期怎么处理：定期删除+懒惰删除 😅
6. 定期处理注意CPU开销
7. 延迟队列 😅


## redis实现缓存

### 封装redis缓存API

1. redis的Cmdable接口
2. 单元测试、集成测试
3. mockgen
4. redis测试繁琐
5. go:build标签的作用

### 组合式API

1. LoadOrStore、LoadAndDelete
2. 注意线程安全：本地缓存加锁，redis使用lua实现



## 缓存模式

### cache aside

1. cache aside：把cache当作普通的数据源（当前我的用法）
2. singleflight，半异步，异步   
3. read-through 😅
4. write-through 😅
4. 一致性问题 😅
6. write back 只操作缓存，后续利用onEvicted更新db
7. refresh-ahead


### 缓存异常

1. 缓存穿透，key不存在，伪造请求攻击
2. 缓存击穿，
3. 缓存雪崩，同一时刻大量key过期，过期时间加偏移量
4. singleflight
5. bloomfilter
6. 


### 分布式锁 TODO

## 微服务

### 网络编程

1. 创建连接阶段，通信阶段
2. 简单的client，server
3. silenseper/pool Get/Put
4. sql.DB连接池
5. 手写连接池 😅

### 微服务框架

1. 【微服务】和【模块化】有什么区别：
    a. 【模块化】部署还是整个合并在一起部署
    b. 【模块化】更细粒度控制
2. 微服务框架主要问题：【底层通信】，【服务治理】
3. go没有办法修改方法实现，可以通过反射生成代理
4. 简易RPC 😅😅😅

### RPC协议设计

1. 请求、响应设计，header、body设计
2. request，response编码解码
3. RPC序列化协议
4. json实现，proto实现
5. client支持一种序列化协议，server支持多种

### RPC调用语义

1. 异步调用、【单向调用】、回调
2. 

### RPC超时控制

1. 单一服务超时控制，链路超时控制
2. 客户端超时控制
3. 跨端传递超时时间
4. 传递剩余时间、传递超时时间戳
5. 网络传输时间难以估计
6. 

### 服务注册与发现演进

1. IP+端口
2. 域名解析
3. 分布式协调——注册中心
4. 经过中间件调用

5. 服务注册与发现，基本模型和难点

### gRPC服务注册与发现特征 😅

1. 推模型拉模型
2. 续租续约租约
3. 接口维度，应用维度
4. gRPC与注册中心的流程
5. Builder模式 😅😅😅

### 基于etcd的gRPC注册中心

1. 租约API，服务端主动发起


### 负载均衡
### 可观测性
