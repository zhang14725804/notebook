### http库优缺点

https://mp.weixin.qq.com/s/MVGAeTlsyQ2X_3Ng8QVeQg

1. 因为HTTP协议的版本是不断变化的，所以为了可扩展性，transport是一个接口类型，具体的是实现是Transport、http2Transport、fileTransport，这样实现扩展性变高，值得我们学习
2. HTTP客户端使用了连接池，避免频繁建立带来的大开销
3. HTTP服务端的路由只是一个静态索引匹配，对于动态路由匹配支持的不好
4. 每一个请求都会创建一个gouroutine进行处理，海量请求到来时需要考虑这块的性能瓶颈