## singleFlight设计

[singleFlight设计](https://mp.weixin.qq.com/s/JUkxGbx1Ufpup3Hx08tI2w)

### 缓存击穿

大量请求同时查询一个key的情况。

【缓存雪崩】：大面积缓存失效问题。

### 如何解决缓存击穿问题

（1）设置热点数据永不过期，定时任务定期刷新数据

（2）查询的时候增加一个互斥锁，其余的查询请求被阻塞，知道锁被释放

（3）singleflight思路(TODO)
