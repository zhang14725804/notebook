### golang内存分配

https://draveness.me/golang/docs/part3-runtime/ch07-memory/golang-memory-allocator/
https://segmentfault.com/a/1190000020338427
https://qiankunli.github.io/2020/11/22/go_mm.html

https://tigerb.cn/2022/04/10/go-base/memory-arch/

### TCMALLOC

由于多线程共享内存，线程申在请内存(虚拟内存)时，由于并行问题会产生竞争不安全。

TCMalloc全称Thread Cache Memory alloc线程缓存内存分配器。顾名思义就是给线程添加内存缓存，减少竞争从而提高性能，当线程内存不足时才会加锁去共享的内存中获取内存。

TCMalloc三层逻辑架构：

- ThreadCache：线程缓存
- CentralFreeList(CentralCache)：中央缓存
- PageHeap：堆内存

当给对象分配内存时：

- 先去线程缓存ThreadCache中分配
- 当线程缓存ThreadCache的内存不足时，从对应SizeClass的中央缓存CentralFreeList获取
- 最后，再从对应SizeClass的PageHeap中分配