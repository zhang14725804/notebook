package service

import (
	"giligili/model"
	"giligili/serializer"
)

// DeleteVideoService 删除投稿的服务
type DeleteVideoService struct {
}

/*
	先查询再删除，而不是上来就删除（万一没有就尴尬了）
	注意：：model.DB.Delete，这里是软删除（查询的时候带一个筛选条件）
*/
func (service *DeleteVideoService) Delete(id string) serializer.Response {
	var video model.Video
	err := model.DB.First(&video, id).Error
	if err != nil {
		return serializer.Response{
			Status: 404,
			Msg:    "视频不存在",
			Error:  err.Error(),
		}
	}

	err = model.DB.Delete(&video).Error
	if err != nil {
		return serializer.Response{
			Status: 50000,
			Msg:    "视频删除失败",
			Error:  err.Error(),
		}
	}
	// 返回值为空
	return serializer.Response{}
}
