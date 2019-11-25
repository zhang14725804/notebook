package service

import (
	"giligili/model"
	"giligili/serializer"
)

/*
	CreateVideoService 视频投稿的服务
*/
type CreateVideoService struct {
	// binding:数据限制
	Title  string `form:"title" json:"title" binding:"required,min=2,max=100"`
	Info   string `form:"info" json:"info" binding:"max=3000"`
	URL    string `form:"url" json:"url"`
	Avatar string `form:"avatar" json:"avatar"`
}

/*
	CreateVideoService添加方法，返回serializer.Response类型的值

	Create 创建视频
*/
func (service *CreateVideoService) Create() serializer.Response {
	video := model.Video{
		Title:  service.Title,
		Info:   service.Info,
		URL:    service.URL,
		Avatar: service.Avatar,
	}
	// Create insert the value into database
	err := model.DB.Create(&video).Error

	if err != nil {
		return serializer.Response{
			// 业务状态码
			Status: 50001,
			Msg:    "视频保存失败",
			Error:  err.Error(),
		}
	}
	// 不写的会有默认值
	return serializer.Response{
		Data: serializer.BuildVideo(video),
	}
}
