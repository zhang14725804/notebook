#### channel
- channel:goroutine之间的交互，有发送方有接收方;channel也可以作为参数返回值
- buffered channel
- 检测channel关闭：：range
- 基于csp模型的并发
- 不要通过共享内存来通信，通过通信来共享内存

#### 使用channel来等待goroutine结束
- waitGroup

#### 使用channel遍历树

#### 使用Select进行调度
- Select的使用
- 定时器的使用
- 在Select中使用nil channel

#### go通过通信共享数据（csp模型）
- 传统同步机制（共享内存来通信）
    - waitGroup
    - Cond
    - Mutex