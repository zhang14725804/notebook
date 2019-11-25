package model

/*
	自动迁移你的模型，使之保持最新状态，执行数据迁移
	就是自动创建表
*/
func migration() {
	// 自动迁移模式
	DB.Set("gorm:table_options", "charset=utf8mb4").
		AutoMigrate(&User{}).
		AutoMigrate(&Video{})
}
