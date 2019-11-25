

## 项目来源
[让我们写个G站吧！Golang全栈编程实况](https://space.bilibili.com/10/channel/detail?cid=78794)

[singo框架](https://github.com/bydmm/singo)

https://github.com/bydmm/giligili

项目基于gin和gorm

## 重要: 如何运行（当前开发环境：windows10平台）
- 开启mysql服务
- 开启redis服务
- go run main.go

#### 1.Go Module管理依赖


#### 2.配置数据库

安装mysql和redis
[redis下载](https://github.com/MicrosoftArchive/redis/releases)

启动mysql和redis服务

#### 3.配置环境变量

> 设置环境变量，你可以参考singo框架的文档: https://singo.gourouting.com/quick-guide/set-env.html

由于每个用户的电脑环境不同，所以我们通过环境变量来改变着些容易变化的属性。

你需要复制项目根目录下的.env.example文件，然后建立.env文件，然后把内容帖进去

```ini
MYSQL_DSN="user:password@tcp(ip:port)/dbname?charset=utf8&parseTime=True&loc=Local" # mysql连接串
REDIS_ADDR="127.0.0.1:6379" # redis地址
REDIS_PW="" # redis密码(可以不填)
REDIS_DB="" # redis数据库(可以不填)
SESSION_SECRET="youneedtoset" # session密钥，开发环境可以不用改
GIN_MODE="debug" # 服务状态，开发环境不用改
# 下面是OSS对象存储的参数
# 参考本视频来管理上传文件：https://www.bilibili.com/video/av60189734/
OSS_END_POINT="oss-cn-hongkong.aliyuncs.com" # OSS端点
OSS_ACCESS_KEY_ID="xxx"
OSS_ACCESS_KEY_SECRET="qqqq"
OSS_BUCKET="lalalal"

```

#### Windows CMD 系统启动指令

```bash
set GOPROXY=https://mirrors.aliyun.com/goproxy/
set GO111MODULE=on

go run main.go
```

#### Windows Powershell 系统启动指令

```bash
$env:GOPROXY = 'https://mirrors.aliyun.com/goproxy/'
$env:GO111MODULE = 'on'

go run main.go
```

#### linux / OSX 系统启动

```bash
export GOPROXY=https://mirrors.aliyun.com/goproxy/
export GO111MODULE=on

go run main.go
```

### MVC

- controller控制器

- model模型，数据的抽象

- view视图，序列化器返回JSON数据

### gorm和gin文档

[gorm中文文档](http://gorm.io/zh_CN/docs/index.html)

[gorm官方文档](https://gorm.io/docs/)

[gin官方文档](https://github.com/gin-gonic/gin)

[gin框架介绍](https://www.yoytang.com/go-gin-doc.html),看起来不错的样子，可以看一看

[gin源码解析](https://www.cnblogs.com/yjf512/p/9670990.html)

[gin结构分析](https://juejin.im/post/5c7c923cf265da2dce1f5fe8)

### todos

docker部署和阿里云oss对象存储服务过于复杂，怯场怯场！！！

### 一些sql语句

查看表的所有字段：show full columns from giligili.videos;