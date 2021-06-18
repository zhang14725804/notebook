## GC原理( TODO 😅)

    Mark & Sweep（标记 & 清除）
    Tri-color Mark & Sweep
    Write Barrier
    Stop The World

主流的垃圾回收算法：**引用计数，追踪式垃圾回收**。Go 现在用的三色标记法就属于追踪式垃圾回收算法的一种

## Mark & Sweep

STW(stop the word):GC 的一些阶段需要停止所有的 mutator 以确定当前的引用关系

Root:全局对象和栈对象指向的堆上的对象。通过Root对象，可以追踪到其他存活的对象。

最大的问题是：GC 执行期间需要把整个程序完全暂停，朴素的 Mark Sweep 是整体 STW，并且分配速度慢，内存碎片率高

【并发 GC 分为两层含义】


## Tri-color Mark（三色标记） & Sweep



