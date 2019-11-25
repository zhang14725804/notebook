package api

import (
	"giligili/service"

	"github.com/gin-gonic/gin"
)

/*
	CreateVideo 发布视频
	TODOS：：这里前端表单数据如怎么传递呢，难道是Context
*/
func CreateVideo(c *gin.Context) {
	service := service.CreateVideoService{}
	/*
		https://github.com/gin-gonic/gin#model-binding-and-validation
		ShouldBind算是表单验证
		通过binding:"required"进行了必须绑定，就是请求时候，必须带上该参数
	*/
	if err := c.ShouldBind(&service); err == nil {
		res := service.Create()
		c.JSON(200, res)
	} else {
		c.JSON(200, ErrorResponse(err))
	}
}

/*
	Context这个东西好像货比较多
	ShowVideo 视频详情接口
*/
func ShowVideo(c *gin.Context) {
	service := service.ShowVideoService{}
	// c.Param获取参数
	res := service.Show(c.Param("id"))
	c.JSON(200, res)
}

/*
	ListVideo 视频列表接口
*/
func ListVideo(c *gin.Context) {
	service := service.ListVideoService{}
	if err := c.ShouldBind(&service); err == nil {
		res := service.List()
		c.JSON(200, res)
	} else {
		c.JSON(200, ErrorResponse(err))
	}
}

/*
	UpdateVideo 更新视频的接口
*/
func UpdateVideo(c *gin.Context) {
	service := service.UpdateVideoService{}
	if err := c.ShouldBind(&service); err == nil {
		// 根据id更新video
		res := service.Update(c.Param("id"))
		c.JSON(200, res)
	} else {
		c.JSON(200, ErrorResponse(err))
	}
}

// DeleteVideo 删除视频的接口
func DeleteVideo(c *gin.Context) {
	service := service.DeleteVideoService{}
	res := service.Delete(c.Param("id"))
	c.JSON(200, res)
}

/*
	controllers常用代码片段

	func common(c *gin.Context) {
		// 实例化service
		service := service.Service{}
		if err := c.ShouldBind(&service); err == nil {
			res := service.()
			c.JSON(200,res)
		} else {
			c.JSON(200,ErrorResponse(err))
		}
	}

	初步代码
	func common(c *gin.Context) {
		c.JSON(200, serializer.Response{
			Status: 0,
			Msg:    "成功",
		})
	}
*/
