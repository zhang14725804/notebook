package conf

import (
	"giligili/cache"
	"giligili/model"
	"giligili/tasks"
	"os"

	"github.com/joho/godotenv"
)

// Init 初始化配置项
func Init() {
	// 从本地读取环境变量
	godotenv.Load()

	// 读取翻译文件
	if err := LoadLocales("conf/locales/zh-cn.yaml"); err != nil {
		panic(err)
	}

	/*
		mysql错误：：dial tcp 127.0.0.1:3306: connectex: No connection could be made because the target machine actively refused it.
		redis错误：：dial tcp 127.0.0.1:6379: connectex: No connection could be made because the target machine actively refused it.
	*/
	// 连接数据库
	model.Database(os.Getenv("MYSQL_DSN"))
	// 连接redis
	cache.Redis()

	// 启动定时任务
	tasks.CronJob()
}
