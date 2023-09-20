## web框架概览

1. 路由匹配：静态匹配，
2. AOP，middleware
3. Context
4. 页面渲染
5. 文件处理与静态资源
6. Session

### web框架面试题

1. web框架拿来做什么
2. 有了http包，为什么还要web框架
3. web框架的核心功能：路由树，上下文Context，Server
4. 路由树实现原理
5. 压缩前缀树

### diy web框架概览

1. server定义
2. 静态路由匹配
3. 通配符匹配
4. 参数路径
5. context
6. AOP方案 ,middleware，针对特定路径的middleware（实现use）
7. 页面渲染template
8. 文件处理与静态资源
9. session

### Context

1. 处理输入
2. 处理输出
3. request body
4. request query
5. request header
6. form表单

### AOP & Middleware

横向关注点：就是那些跟业务没啥关系，但是每个业务又必须要处理的。常见的有几类：

- 可观测性：logging、metric 和 tracing
- 安全相关：登录、鉴权与权限控制
- 错误处理：例如错误页面支持
- 可用性保证：熔断限流和降级等

### AOP面试

1. 什么是AOP
2. 洋葱模式，责任链模式
3. middleware顺序问题
4. middleware分路由问题

### 页面渲染

### 文件处理

1. 文件操作里面的 FileMode 和对应的 Flag 有什么用处？有什么区别？
2. 文件下载怎么实现？关键就是答出那几个 header 来
3. 怎么处理静态资源？优先 CDN，实在不行就自己部署静态资源服务器

### Session

- 管理 Session 的问题：如创建、查找、销毁和刷新
- Session 存储和查找用户数据：要考虑这些数据真实存储在什么地方
- session id 存储和提取的问题

