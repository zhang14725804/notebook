Object.defineProperty(exports, "__esModule", {
    value: true
});

/**
 * 播放服务数据
 * clientIp String 用户ip
 * playerSessionId String 播放服务生成标记唯一一次播放
 * isUpsLoadedAd Boolean 播放服务是否加载前贴广告
 */ var DefaultUPSData = {
    clientIp: "",
    psid: "",
    isUpsLoadedAd: false
};

/**
 * 错误数据
 * code  String  错误码
 * link  String  跳转链接
 * note  String  错误提示
 */ var DefaultErrorData = {
    code: "",
    link: "",
    note: ""
};

/**
 * 视频数据
 * id int 视频数字ID
 * encodeId  String  视频编码ID
 * title  String  视频标题
 * duration  Number  视频长度，单位：秒
 * videoType String 视频类型 媒资／UGC／PGC
 * isShare Boolean 是否广告分成视频 type中包涵 share && share_type = ad
 * isDanmaku  Boolean 是否弹幕视频
 * isPanorama Boolean 是否全景视频
 * isFee Boolean 是否付费视频
 * isChannelVip Boolean 是否自频道视频
 * isSubscribe Boolean 是否为订阅视频 trialData.type = subscribe && privacy = follower
 * isRtmp Boolean 是否为Rtmp视频
 * isLimition Boolean 是否限播
 * categoryId 视频分类id
 * categoryString 视频二级分类
 * tags 视频标签
 * coverURL String 封面图
 */ var DefaultVideoData = {
    id: 0,
    encodeId: "",
    title: "",
    duration: 0,
    videoType: "",
    isShareAd: false,
    isDanmaku: false,
    isPanorama: false,
    isFee: false,
    isChannelVip: false,
    isSubscribe: false,
    isRtmp: false,
    isTrial: false,
    categoryId: 0,
    categoryLetterId: "",
    categoryString: "",
    tags: [],
    coverURL: ""
};

/**
 * 剧集信息
 * id String 节目数字ID
 * encodeId String 节目编码ID
 * title String 节目标题
 * showCoverURL String 封面
 */ var DefaultShowData = {
    id: 0,
    encodeId: "",
    title: "",
    showCoverURL: ""
};

/**
 * 视频试看数据
 * time int 试看时长，单位：秒
 * type String 试看类型
 * note String 试看提示
 */ var DefaultTrialData = {
    type: "",
    time: 0,
    note: ""
};

/**
 * 单分片信息
 * duration 分片时长 单位：s
 * index 分片索引
 * size 分片大小
 * cdnURL cdn地址
 * backupURL cdn备份地址
 */ var DefaultSegmentData = {
    seconds: 0,
    index: -1,
    size: 0,
    src: "",
    backupURL: ""
};

var DefaultPlayListData = {
    upsData: null,
    errorData: null,
    videoData: null,
    showData: null,
    trialData: null,
    isError: false
};

exports.DefaultUPSData = DefaultUPSData;

exports.DefaultErrorData = DefaultErrorData;

exports.DefaultShowData = DefaultShowData;

exports.DefaultVideoData = DefaultVideoData;

exports.DefaultTrialData = DefaultTrialData;

exports.DefaultSegmentData = DefaultSegmentData;

exports.DefaultPlayListData = DefaultPlayListData;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlZmF1bHQtZGF0YS5qcyJdLCJuYW1lcyI6WyJEZWZhdWx0VVBTRGF0YSIsImNsaWVudElwIiwicHNpZCIsImlzVXBzTG9hZGVkQWQiLCJEZWZhdWx0RXJyb3JEYXRhIiwiY29kZSIsImxpbmsiLCJub3RlIiwiRGVmYXVsdFZpZGVvRGF0YSIsImlkIiwiZW5jb2RlSWQiLCJ0aXRsZSIsImR1cmF0aW9uIiwidmlkZW9UeXBlIiwiaXNTaGFyZUFkIiwiaXNEYW5tYWt1IiwiaXNQYW5vcmFtYSIsImlzRmVlIiwiaXNDaGFubmVsVmlwIiwiaXNTdWJzY3JpYmUiLCJpc1J0bXAiLCJpc1RyaWFsIiwiY2F0ZWdvcnlJZCIsImNhdGVnb3J5TGV0dGVySWQiLCJjYXRlZ29yeVN0cmluZyIsInRhZ3MiLCJjb3ZlclVSTCIsIkRlZmF1bHRTaG93RGF0YSIsInNob3dDb3ZlclVSTCIsIkRlZmF1bHRUcmlhbERhdGEiLCJ0eXBlIiwidGltZSIsIkRlZmF1bHRTZWdtZW50RGF0YSIsInNlY29uZHMiLCJpbmRleCIsInNpemUiLCJzcmMiLCJiYWNrdXBVUkwiLCJEZWZhdWx0UGxheUxpc3REYXRhIiwidXBzRGF0YSIsImVycm9yRGF0YSIsInZpZGVvRGF0YSIsInNob3dEYXRhIiwidHJpYWxEYXRhIiwiaXNFcnJvciJdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQTs7Ozs7O0FBTUEsSUFBTUEsaUJBQWlCO0FBQ3JCQyxZQUFVLEVBRFc7QUFFckJDLFFBQU0sRUFGZTtBQUdyQkMsaUJBQWU7QUFITSxDQUF2QjtBQUtBOzs7Ozs7QUFNQSxJQUFNQyxtQkFBbUI7QUFDdkJDLFFBQU0sRUFEaUI7QUFFdkJDLFFBQU0sRUFGaUI7QUFHdkJDLFFBQU07QUFIaUIsQ0FBekI7QUFLQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFvQkEsSUFBTUMsbUJBQW1CO0FBQ3ZCQyxNQUFJLENBRG1CO0FBRXZCQyxZQUFVLEVBRmE7QUFHdkJDLFNBQU8sRUFIZ0I7QUFJdkJDLFlBQVUsQ0FKYTtBQUt2QkMsYUFBVyxFQUxZO0FBTXZCQyxhQUFXLEtBTlk7QUFPdkJDLGFBQVcsS0FQWTtBQVF2QkMsY0FBWSxLQVJXO0FBU3ZCQyxTQUFPLEtBVGdCO0FBVXZCQyxnQkFBYyxLQVZTO0FBV3ZCQyxlQUFhLEtBWFU7QUFZdkJDLFVBQVEsS0FaZTtBQWF2QkMsV0FBUyxLQWJjO0FBY3ZCQyxjQUFZLENBZFc7QUFldkJDLG9CQUFrQixFQWZLO0FBZ0J2QkMsa0JBQWdCLEVBaEJPO0FBaUJ2QkMsUUFBTSxFQWpCaUI7QUFrQnZCQyxZQUFVO0FBbEJhLENBQXpCO0FBb0JBOzs7Ozs7O0FBT0EsSUFBTUMsa0JBQWtCO0FBQ3RCbEIsTUFBSSxDQURrQjtBQUV0QkMsWUFBVSxFQUZZO0FBR3RCQyxTQUFPLEVBSGU7QUFJdEJpQixnQkFBYztBQUpRLENBQXhCO0FBTUE7Ozs7OztBQU1BLElBQU1DLG1CQUFtQjtBQUN2QkMsUUFBTSxFQURpQjtBQUV2QkMsUUFBTSxDQUZpQjtBQUd2QnhCLFFBQU07QUFIaUIsQ0FBekI7QUFLQTs7Ozs7Ozs7QUFRQSxJQUFNeUIscUJBQXFCO0FBQ3pCQyxXQUFTLENBRGdCO0FBRXpCQyxTQUFPLENBQUMsQ0FGaUI7QUFHekJDLFFBQU0sQ0FIbUI7QUFJekJDLE9BQUssRUFKb0I7QUFLekJDLGFBQVc7QUFMYyxDQUEzQjs7QUFRQSxJQUFNQyxzQkFBc0I7QUFDMUJDLFdBQVMsSUFEaUI7QUFFMUJDLGFBQVcsSUFGZTtBQUcxQkMsYUFBVyxJQUhlO0FBSTFCQyxZQUFVLElBSmdCO0FBSzFCQyxhQUFXLElBTGU7QUFNMUJDLFdBQVM7QUFOaUIsQ0FBNUI7O1FBVUU1QyxjLEdBQUFBLGM7UUFDQUksZ0IsR0FBQUEsZ0I7UUFDQXVCLGUsR0FBQUEsZTtRQUNBbkIsZ0IsR0FBQUEsZ0I7UUFDQXFCLGdCLEdBQUFBLGdCO1FBQ0FHLGtCLEdBQUFBLGtCO1FBQ0FNLG1CLEdBQUFBLG1CIiwiZmlsZSI6ImRlZmF1bHQtZGF0YS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICog5pKt5pS+5pyN5Yqh5pWw5o2uXG4gKiBjbGllbnRJcCBTdHJpbmcg55So5oi3aXBcbiAqIHBsYXllclNlc3Npb25JZCBTdHJpbmcg5pKt5pS+5pyN5Yqh55Sf5oiQ5qCH6K6w5ZSv5LiA5LiA5qyh5pKt5pS+XG4gKiBpc1Vwc0xvYWRlZEFkIEJvb2xlYW4g5pKt5pS+5pyN5Yqh5piv5ZCm5Yqg6L295YmN6LS05bm/5ZGKXG4gKi9cbmNvbnN0IERlZmF1bHRVUFNEYXRhID0ge1xuICBjbGllbnRJcDogJycsXG4gIHBzaWQ6ICcnLFxuICBpc1Vwc0xvYWRlZEFkOiBmYWxzZVxufTtcbi8qKlxuICog6ZSZ6K+v5pWw5o2uXG4gKiBjb2RlICBTdHJpbmcgIOmUmeivr+eggVxuICogbGluayAgU3RyaW5nICDot7Povazpk77mjqVcbiAqIG5vdGUgIFN0cmluZyAg6ZSZ6K+v5o+Q56S6XG4gKi9cbmNvbnN0IERlZmF1bHRFcnJvckRhdGEgPSB7XG4gIGNvZGU6ICcnLFxuICBsaW5rOiAnJyxcbiAgbm90ZTogJydcbn07XG4vKipcbiAqIOinhumikeaVsOaNrlxuICogaWQgaW50IOinhumikeaVsOWtl0lEXG4gKiBlbmNvZGVJZCAgU3RyaW5nICDop4bpopHnvJbnoIFJRFxuICogdGl0bGUgIFN0cmluZyAg6KeG6aKR5qCH6aKYXG4gKiBkdXJhdGlvbiAgTnVtYmVyICDop4bpopHplb/luqbvvIzljZXkvY3vvJrnp5JcbiAqIHZpZGVvVHlwZSBTdHJpbmcg6KeG6aKR57G75Z6LIOWqkui1hO+8j1VHQ++8j1BHQ1xuICogaXNTaGFyZSBCb29sZWFuIOaYr+WQpuW5v+WRiuWIhuaIkOinhumikSB0eXBl5Lit5YyF5ra1IHNoYXJlICYmIHNoYXJlX3R5cGUgPSBhZFxuICogaXNEYW5tYWt1ICBCb29sZWFuIOaYr+WQpuW8ueW5leinhumikVxuICogaXNQYW5vcmFtYSBCb29sZWFuIOaYr+WQpuWFqOaZr+inhumikVxuICogaXNGZWUgQm9vbGVhbiDmmK/lkKbku5jotLnop4bpopFcbiAqIGlzQ2hhbm5lbFZpcCBCb29sZWFuIOaYr+WQpuiHqumikemBk+inhumikVxuICogaXNTdWJzY3JpYmUgQm9vbGVhbiDmmK/lkKbkuLrorqLpmIXop4bpopEgdHJpYWxEYXRhLnR5cGUgPSBzdWJzY3JpYmUgJiYgcHJpdmFjeSA9IGZvbGxvd2VyXG4gKiBpc1J0bXAgQm9vbGVhbiDmmK/lkKbkuLpSdG1w6KeG6aKRXG4gKiBpc0xpbWl0aW9uIEJvb2xlYW4g5piv5ZCm6ZmQ5pKtXG4gKiBjYXRlZ29yeUlkIOinhumikeWIhuexu2lkXG4gKiBjYXRlZ29yeVN0cmluZyDop4bpopHkuoznuqfliIbnsbtcbiAqIHRhZ3Mg6KeG6aKR5qCH562+XG4gKiBjb3ZlclVSTCBTdHJpbmcg5bCB6Z2i5Zu+XG4gKi9cbmNvbnN0IERlZmF1bHRWaWRlb0RhdGEgPSB7XG4gIGlkOiAwLFxuICBlbmNvZGVJZDogJycsXG4gIHRpdGxlOiAnJyxcbiAgZHVyYXRpb246IDAsXG4gIHZpZGVvVHlwZTogJycsXG4gIGlzU2hhcmVBZDogZmFsc2UsXG4gIGlzRGFubWFrdTogZmFsc2UsXG4gIGlzUGFub3JhbWE6IGZhbHNlLFxuICBpc0ZlZTogZmFsc2UsXG4gIGlzQ2hhbm5lbFZpcDogZmFsc2UsXG4gIGlzU3Vic2NyaWJlOiBmYWxzZSxcbiAgaXNSdG1wOiBmYWxzZSxcbiAgaXNUcmlhbDogZmFsc2UsXG4gIGNhdGVnb3J5SWQ6IDAsXG4gIGNhdGVnb3J5TGV0dGVySWQ6ICcnLFxuICBjYXRlZ29yeVN0cmluZzogJycsXG4gIHRhZ3M6IFtdLFxuICBjb3ZlclVSTDogJydcbn07XG4vKipcbiAqIOWJp+mbhuS/oeaBr1xuICogaWQgU3RyaW5nIOiKguebruaVsOWtl0lEXG4gKiBlbmNvZGVJZCBTdHJpbmcg6IqC55uu57yW56CBSURcbiAqIHRpdGxlIFN0cmluZyDoioLnm67moIfpophcbiAqIHNob3dDb3ZlclVSTCBTdHJpbmcg5bCB6Z2iXG4gKi9cbmNvbnN0IERlZmF1bHRTaG93RGF0YSA9IHtcbiAgaWQ6IDAsXG4gIGVuY29kZUlkOiAnJyxcbiAgdGl0bGU6ICcnLFxuICBzaG93Q292ZXJVUkw6ICcnXG59O1xuLyoqXG4gKiDop4bpopHor5XnnIvmlbDmja5cbiAqIHRpbWUgaW50IOivleeci+aXtumVv++8jOWNleS9je+8muenklxuICogdHlwZSBTdHJpbmcg6K+V55yL57G75Z6LXG4gKiBub3RlIFN0cmluZyDor5XnnIvmj5DnpLpcbiAqL1xuY29uc3QgRGVmYXVsdFRyaWFsRGF0YSA9IHtcbiAgdHlwZTogJycsXG4gIHRpbWU6IDAsXG4gIG5vdGU6ICcnXG59O1xuLyoqXG4gKiDljZXliIbniYfkv6Hmga9cbiAqIGR1cmF0aW9uIOWIhueJh+aXtumVvyDljZXkvY3vvJpzXG4gKiBpbmRleCDliIbniYfntKLlvJVcbiAqIHNpemUg5YiG54mH5aSn5bCPXG4gKiBjZG5VUkwgY2Ru5Zyw5Z2AXG4gKiBiYWNrdXBVUkwgY2Ru5aSH5Lu95Zyw5Z2AXG4gKi9cbmNvbnN0IERlZmF1bHRTZWdtZW50RGF0YSA9IHtcbiAgc2Vjb25kczogMCxcbiAgaW5kZXg6IC0xLFxuICBzaXplOiAwLFxuICBzcmM6ICcnLFxuICBiYWNrdXBVUkw6ICcnXG59O1xuXG5jb25zdCBEZWZhdWx0UGxheUxpc3REYXRhID0ge1xuICB1cHNEYXRhOiBudWxsLFxuICBlcnJvckRhdGE6IG51bGwsXG4gIHZpZGVvRGF0YTogbnVsbCxcbiAgc2hvd0RhdGE6IG51bGwsXG4gIHRyaWFsRGF0YTogbnVsbCxcbiAgaXNFcnJvcjogZmFsc2Vcbn07XG5cbmV4cG9ydCB7XG4gIERlZmF1bHRVUFNEYXRhLFxuICBEZWZhdWx0RXJyb3JEYXRhLFxuICBEZWZhdWx0U2hvd0RhdGEsXG4gIERlZmF1bHRWaWRlb0RhdGEsXG4gIERlZmF1bHRUcmlhbERhdGEsXG4gIERlZmF1bHRTZWdtZW50RGF0YSxcbiAgRGVmYXVsdFBsYXlMaXN0RGF0YVxufTtcbiJdfQ==