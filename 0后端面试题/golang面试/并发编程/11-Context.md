### Context使用场景

    上下文信息传递 （request-scoped），比如处理 http 请求、在请求处理链路上传递信息；
    控制子 goroutine 的运行；
    超时控制的方法调用；
    可以取消的方法调用。

### Context基本使用

包 context 定义了 Context 接口，Context 的具体实现包括 4 个方法，分别是 **Deadline、Done、Err 、Value**

在使用 Context 的时候，有一些约定俗成的规则：

    （1）一般函数使用 Context 的时候，会把这个参数放在第一个参数的位置。
    （2）从来不把 nil 当做 Context 类型的参数值，可以使用 context.Background() 创建一个空的上下文对象，也不要使用 nil。
    （3）Context 只用来临时做函数之间的上下文透传，不能持久化 Context 或者把 Context 长久保存。把 Context 持久化到数据库、本地文件或者全局变量、缓存中都是错误的用法。
    （4）key 的类型不应该是字符串类型或者其它内建类型，否则容易在包之间使用 Context 时候产生冲突。使用 WithValue 时，key 的类型应该是自己定义的类型。
    （5）常常使用 struct{}作为底层类型定义 key 的类型。对于 exported key 的静态类型，常常是接口或者指针。这样可以尽量减少内存分配。

### 几种创建特殊用途 Context 的方法：WithValue、WithCancel、WithTimeout 和 WithDeadline