package model

import (
	"time"

	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"

	//
	_ "github.com/jinzhu/gorm/dialects/mysql"
)

/*
	单例模式
	DB 数据库链接
*/
var DB *gorm.DB

// Database 在中间件中初始化mysql链接
func Database(connString string) {
	// root:123456@tcp(127.0.0.1:3306)/goDB1113?charset=utf8
	db, err := gorm.Open("mysql", connString)
	db.LogMode(true)
	// Error
	if err != nil {
		panic(err)
	}
	if gin.Mode() == "release" {
		db.LogMode(false)
	}

	//设置连接池
	//空闲
	db.DB().SetMaxIdleConns(20)
	//打开
	db.DB().SetMaxOpenConns(100)
	//超时
	db.DB().SetConnMaxLifetime(time.Second * 30)

	DB = db

	migration()
}
