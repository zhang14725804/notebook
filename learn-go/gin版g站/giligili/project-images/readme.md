### 1、gin+gorm开发的视频网站
[一起写个G站](https://github.com/Gourouting/giligili)

### 1.1、gin

Model bind And Validation

### 1.2、gorm（gorm.io）

auto migration

自动映射数据结构到数据库，创建相应的表和字段

默认软删除

### 1.3、MVC

view 页面由后端渲染，前后端未分离时期
model 模型，处理数据
controller 控制器

### 1.4、serializer序列化器

展示数据，相当于view层

将数据库中的数据返回到序列化后的JSON

### 1.5、命令实现mvc和serializer中所有代码

### 1.6、命名规则

文件名下划线，函数名驼峰命名

### 2、前端，Vue（Nodejs）

Vue3 + elementUI实现前端（颜值即正义）

### 3、运维部署（购买域名、购买服务器、部署前端代码，部署后端代码），可以先放在后面写，不要自己吓唬自己

(1) dns解析，域名-->IP，[阿里云公共DNS](www.alidns.com)

(2) nginx内容分发

(3) docker(包括前后端)

(4) 买域名，买服务器（注意地区），配置服务器有点繁琐

(5) 部署前端项目的docker镜像（nginx.conf、Dockerfile），nginx:alpine，容器镜像服务（仓库？），创建镜像仓库，复杂哟

(6) windows上远程Linux工具putty winscp、wsl、xshell

(7) 云服务部署后端服务docker镜像（go build编译成可执行文件），golang交叉编译(go build -o param)，复杂哟
二端构建（什么鬼）、docker ps(查看跑了几个镜像)、开启特殊端口并允许特殊ip和端口使用、portainer.io（管理仓库？）、
docker-compose（docker从入门到实践gitbook）

(8) 新建nginx.conf文件分发请求（3001、3002）、解析设置（将域名指向IP）、配置docker中mysql密码、volume映射本地数据到docker（docker-compose volume）（服务器重启之后数据还在本地，不至于丢失）、配置redis、htop服务器运行内存状况、golang mysql dsn

### 4、分布式和云计算

(1) 单机服务器 --> 小型机 --> 中型机 --> 大型机(早期，解决单机负载问题)

(2) 分布式服务 LVS均衡负载，对象存储（七牛，阿里OSS），polardb（多台数据库），集群（数据库集群，高速缓存集群，服务器集群），dns负载均衡

### 5、阿里云OSS对象存储和在线视频点播

oss创建Bucket，视频转码（Premute，mediacoder），移动浏览器web浏览器手机app支持的视频格式不同，vue-video-player插件，
上传oss对象存储（aliyun-oss-go-sdk）,阿里云子账号，限制上传类型，上传文件签名（存取都要获取签名），数据库存储文件路径

### 6、redis（视频点击数和排行榜）
两大用途：缓存（普通缓存、有序数组）、分布式锁

Redis（go-redis包）：安装redis，初始化redis链接，redis理论上有20个数据库但是不常用（why），保存redis中的key，key的命名空间

（1） 普通缓存（点击数：变化的快，消耗资源）：抽离视频被观看方法

（2） 有序数组（排行榜）

（3） 定时任务（清除前一天的排行）：cron包，golang泛型

### 7、go Modules（将go项目放在非安装目录下的src目录），解决环境变量问题

go.mod文件（go mod init类似于npm init），goproxy(类似于cnpm)（解决go get失败问题），windows设置goproxy有点坑

### 8、CORS跨域问题（403，浏览器cors跨域），

mdn-cors（mdn文档），同源的概念（协议，端口，ip）

options请求 + 正式请求（response header）

### 9、用户系统（用户注册登录验证，后期可以加第三方授权登录（github，微信））

Singo框架（封装gin + gorm），加密密码，登录成功之后设置cookie或者session，每次请求都会带cookie

拦截登录中间件（AuthRequire，CurrentUser），Context上下文（这个比较重要），session比cookie安全？SESSION_SECRET，session就是userid存到哪里的问题，session和cookie的关系

有很多种session管理的方式（cookie-base，redis，memcached。。）

### 10、分页（limit，start，total）

### TODOS！！！！！！！！！！：：爬虫项目
（1） 爬取自己QQ写的日记（文字，图片），放在github？
（2） 爬取天涯论坛（拖了很久）




