### 编码

总体原则分两步，首先定义需要编码的结构，然后调用encoding/json标准库的Marshal方法生成json byte数组，转换成string类型即可。

golang和json的大部分数据结构匹配，对于复合结构，go可以借助结构体和空接口实现json的数组和对象结构。通过struct tag可以灵活的修改json编码的字段名和输出控制。

### 解码

