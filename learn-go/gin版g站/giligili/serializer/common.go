package serializer

/*
	返回数据Response 基础序列化器
*/
type Response struct {
	Status int `json:"status"`
	// 具体返回数据
	Data interface{} `json:"data"`
	// 业务错误
	Msg string `json:"msg"`
	// 代码层面的错误
	Error string `json:"error"`
}

/*
	DataList 统一基础列表结构
	interface{} 任意类型
	uint 正整数
*/
type DataList struct {
	Items interface{} `json:"items"`
	Total uint        `json:"total"`
}

/*
	TrackedErrorResponse 有追踪信息的错误响应
*/
type TrackedErrorResponse struct {
	Response
	TrackID string `json:"track_id"`
}

/*
	BuildListResponse 列表构建器
	标准初始化方法
*/
func BuildListResponse(items interface{}, total uint) Response {
	return Response{
		Data: DataList{
			Items: items,
			Total: total,
		},
	}
}
