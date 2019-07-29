### 测试与性能调优（放在后面在详细深入）
#### 传统测试 vs 表格驱动测试
- 1、传统测试
    - 测试数据和测试逻辑混合在一起
    - 出错信息不明确
    - 一旦一个数据出错，测试全部结束

- 2、表格驱动测试
    - 测试数据和测试逻辑分离
    - 出错信息明确
    - 可以部分失败

#### 代码覆盖率和性能测试（Bench）
- go tool cover
- go test -bench
- http测试

#### 性能优化
- go test -bench . -cpuprofile
- go tool pprof cpu.out
#### 生成文档和测试代码
- go doc ***