### 单机锁

1. Mutex
2. RWMutex 读写分离，并发读共享

### Mutex

上锁解锁，上锁失败需要等待

加锁发现锁已经被抢占的情形：阻塞/唤醒（乐观，被动）；自旋+CAS（悲观，主动）；
先【自旋+CAS】，达到一定条件后【阻塞/唤醒】

正常模式 <--> 饥饿模式

state bitmap类型

lock 
    CAS
    lockSlow（极其复杂 😅）

unlock 
    原子操作
    unlockSlow

### RWMutex

读锁过程
写锁过程








