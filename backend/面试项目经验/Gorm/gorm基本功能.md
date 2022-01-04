## Gorm 基本功能

[官方文档](https://gorm.io/zh_CN/docs/create.html)

### 安装依赖

    //安装 MySQL 驱动包
    go get -u gorm.io/driver/mysql
    //安装 Gorm 包
    go get -u gorm.io/gorm 


### 连接数据库

### 绑定表明

TableName方法

### 插入

1. 单个插入 Create；如何获取新插入记录的自增 ID
2. 批量插入（TODO）

### 查询

- Query 查询方法

1. Take
2. First
3. Last
4. Find 返回多条记录
5. Pluck 查询一列

- 查询错误处理(ErrRecordNotFound 特殊处理)

```go
if errors.Is(err, gorm.ErrRecordNotFound) {
    fmt.Println("查询不到数据")
} else if err != nil {
// 如果err不等于record not found错误，又不等于nil，那说明sql执行失败了。
	fmt.Println("查询失败", err)
}
```

- where方法查询

```go
db.Where("id=?", 2).Take(&u)

db.Where("id in (?)", []int{1, 3}).Take(&u)

db.Where("name like ?", "赵%").Find(&us)
```

- select指定返回字段

- Order设置排序语句

- Limit，Offset

- Count放回匹配的行数

- Group 设置 group by 子句
- 直接执行sql语句

```go
sql := "SELECT type, count(*) as  total FROM `foods` where create_time > ? GROUP BY type HAVING (total > 0)"
// 因为sql语句使用了一个问号(?)作为绑定参数, 所以需要传递一个绑定参数(Raw第二个参数).
// Raw函数支持绑定多个参数
db.Raw(sql, "2018-11-06 00:00:00").Scan(&results)
```

### 更新

- Save（更新所有模型字段值）

- Update（更新单个字段值）

- Updates（更新多个字段值）

- 更新表达式

```go
db.Debug().Model(&us).Update("age", gorm.Expr("age+1"))
```

### Delete(TODO)

### 事务处理

1. db.Transaction 函数实现事务，如果闭包函数返回错误，则回滚事务
2. 手动事务处理，db.Begin()，tx.Rollback()，tx.Commit()

### 关联查询 （没懂）

Association，foreignkey，references

### 一对一关联查询 （没懂）

### 一对多 （没懂）

### 关联查询预加载

1. 预加载 Preload
2. 自动预加载 db.Set("gorm:auto_preload", true)
3. 嵌套预加载

### 自动建表

1. AutoMigrate 函数可以快速建表，如果表已经存在不会重复创建。
2. 检测表是否存在 db.Migrator().HasTable(&User{})
3. 建表 db.Migrator().CreateTable(&User{})
4. 删除表 db.Migrator().DropTable(&User{})
5. 删除表字段 db.Migrator().DropColumn(&User{}, "Name")
6. 添加索引，删除索引，判断索引是否存在
7. 修改表明 db.Migrator().RenameIndex(&User{}, "Name", "Name2")
8. 创建复合索引 两个字段使用同一个索引名，Migration将创建复合索引

###　错误处理

