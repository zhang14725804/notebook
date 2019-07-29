#### goroutine

### 协程 Coroutine
- 轻量级“线程”，子程序是协程的一个特例
- 非抢占式多任务处理，由协程主动交出控制权
- 编译器/解释器/虚拟机层面的多任务
- 多个协程可能在一个或者多个线程上运行

### goroutine的定义
- 使用race来检测数据访问冲突
- 调度器在合适的点进行切换
- 任何函数加上go就能送给调度器运行

### goroutine可能的切换点
- channel
- 等待所
- 函数调用
- runtime.Gosched
- IO、select