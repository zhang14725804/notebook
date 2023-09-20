## ORM概览

### ORM主要职责

1. 对象 -> SQL
2. 结果集 -> 对象

### ORM功能点

- SQL：必须要支持的就是增删改查，DDL 一般是作为一个扩展功能，或者作为一个工具来提供。
- 映射：将结果集封装成对象，性能瓶颈。
- 事务：主要在于维护好事务状态。
- 元数据：SQL 和映射两个部分的基石。
- AOP：处理横向关注点。
- 关联关系：部分 ORM 框架会提供，性价比低。
- 方言：兼容不同的数据库，至少要兼容 MySQL、SQLite

## select

1. 【构造器模式】😅😅😅

### 反射

1. 反射，reflect.Value，reflect.Type 
2. 能不能通过反射修改方法？不能。
3. 反射解析模型数据
4. 反射，unsafe，ast，模板

### 元数据

1. 自定义字段名和列名实现的方式：
    - 标签
    - 接口
    - 编程注册
2. option模式

### SQL编程

1. 事务与隔离级别

## TODO 12周 之后都烂尾了


### select结果集处理 & unsafe 

1. unsafe.Pointer 和 uintptr 的区别，unsafe核心用法
2. 构造 SQL、设计元数据、处理结果集
3. 为什么 unsafe 要比反射更快
4. ORM 的性能瓶颈在哪里，以及怎么解决
5. ORM 框架怎么处理数据库返回的数据

### select列和聚合函数

1. Predicate和RawExpr设计
2. select 普通列，聚合函数，原生表达式
3. 

## insert

1. builder设计模式 😅
2. on duplicate实现 😅

## delete

### Dialect方言

1.  

## 事务

1. session上下文，用来组合tx和db
2. core结构体
3. 事务闭包API
4. 事务扩散，context实现

### AOP方案

1. web框架的middleware
2. 怎么使用责任链模式，怎么使用洋葱模式，怎么使用装饰器模式
3. GORM的Hook设计原理
4. AOP实现方案，和web的middleware方案类似
5. middleware实现debug
6. 慢查询，禁用delete，某些语句必须带where条件

### 测试

1. 单元测试
2. 基准测试
3. 集成测试

### 原生查询


### 复杂查询

1. join查询
2. tableReference
3. 二叉树构造左右
4. using
5. on
6. 重构selector

### protobuf定义模型

1. 修改protoc-gen-go

### 代码生成

1. AST+模板编程
2. go不支持【动态代理】
3. java、python支持动态修改类型定义，重写方法
😅😅😅






