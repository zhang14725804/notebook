package server

import (
	"giligili/api"
	"giligili/middleware"
	"os"

	"github.com/gin-gonic/gin"
)

// NewRouter 路由配置
func NewRouter() *gin.Engine {
	r := gin.Default()

	/*
		TODOS：：session使用方法（https://github.com/gin-contrib/sessions）
		（1）cookie中存储sessionID，session存储在服务器，均衡负载中会话保存，指定一台服务器
		（2）session存在用户本地，分布式和加密
		（3）session存储在redis
	*/
	// 中间件, 顺序不能改
	r.Use(middleware.Session(os.Getenv("SESSION_SECRET")))
	// 跨域问题
	r.Use(middleware.Cors())
	// 获取用户身份
	r.Use(middleware.CurrentUser())

	// 路由
	v1 := r.Group("/api/v1")
	{
		v1.POST("ping", api.Ping)

		// 用户登录
		v1.POST("user/register", api.UserRegister)

		// 用户登录
		v1.POST("user/login", api.UserLogin)

		// 需要登录保护的（需要用户登录）
		authed := v1.Group("/")
		authed.Use(middleware.AuthRequired())
		{
			// User Routing
			authed.GET("user/me", api.UserMe)
			authed.DELETE("user/logout", api.UserLogout)
		}

		// 视频操作
		v1.POST("videos", api.CreateVideo)
		v1.GET("video/:id", api.ShowVideo)
		v1.GET("videos", api.ListVideo)
		v1.PUT("video/:id", api.UpdateVideo)
		v1.DELETE("video/:id", api.DeleteVideo)
		// // 排行榜
		// v1.GET("rank/daily", api.DailyRank)
		/*
			获取token，直接上传文件到阿里云oss
			ps：：为了做分布式
		*/
		v1.POST("upload/token", api.UploadToken)
	}

	// swagger文档
	// 游览器打开 http://localhost:3000/swagger/index.html
	r.StaticFile("/swagger.json", "./swagger/swagger.json")
	r.Static("/swagger", "./swagger/dist")

	return r
}
