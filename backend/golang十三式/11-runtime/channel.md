## 深入浅出channel——kavya719 （精彩 😄）

多线程任务分发模型

### channel

channel底层hchan是一个【环形队列】

**chan,map,slice,数组需要make，其他数据结构都是new。**

make(chan Task,3),分配在heap堆上，返回一个指针，指向hchan

【sends and receives】过程：加锁 -> 入队/出队 -> 释放锁

“Do not communicate by sharing memory（仅仅是共享hchan，写代码的时候没有共享内存的代码）; instead, share memory by communicating（通过hchan）


goroutines are user-space threads（created and managed by the Go runtime, not the OS. 
lightweight compared to OS threads.）

GMP模型：

    M: OS thread 
    G: goroutine 
    P: context for scheduling（Ps hold the runqueues。In order to run goroutines (G),a thread (M) must hold a context (P).）

### 【sends and receives过程】😅😅😅

**过程涉及GMP调度，亲缘性调度**

sends发送过程、receives接受过程

### select；select无序随机


