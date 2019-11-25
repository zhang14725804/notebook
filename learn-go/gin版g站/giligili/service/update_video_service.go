package service

import (
	"giligili/model"
	"giligili/serializer"
)

/*
	更新和创建分开写，不至于太复杂
	UpdateVideoService 更新视频的服务
*/
type UpdateVideoService struct {
	Title string `form:"title" json:"title" binding:"required,min=2,max=30"`
	Info  string `form:"info" json:"info" binding:"max=300"`
}

// Update 更新视频
func (service *UpdateVideoService) Update(id string) serializer.Response {
	var video model.Video
	/*
		查询视频，用指针传递数据
	*/
	err := model.DB.First(&video, id).Error
	if err != nil {
		return serializer.Response{
			Status: 404,
			Msg:    "视频不存在",
			Error:  err.Error(),
		}
	}
	/*
		todos：：form表单数据是怎么传递的
		Context和service之间怎么捣鼓的
	*/
	video.Title = service.Title
	video.Info = service.Info
	// 更新数据
	err = model.DB.Save(&video).Error
	if err != nil {
		return serializer.Response{
			Status: 50002,
			Msg:    "视频保存失败",
			Error:  err.Error(),
		}
	}

	return serializer.Response{
		Data: serializer.BuildVideo(video),
	}
}
