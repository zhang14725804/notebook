#### 错误处理和资源管理
- 资源管理：打开关闭文件，连接释放数据库之类的成对出现的操作
- defer调用实现资源管理
    - 确保调用在函数结束时发生
    - 参数在defer语句时计算
    - defer列表为后进先出

- panic（尽量少用）
    - 停止当前函数执行
    - 一只向上返回，执行每一层的defer
    - 如果没有recover，程序退出

- recover
    - 仅在defer调用中使用
    - 获取panic的值
    - 若无法处理，可以重新panic
    
- error vs panic(分别在什么情况下使用)
    - 意料之中的：用error
    - 其他情况用panic