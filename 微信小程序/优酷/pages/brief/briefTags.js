Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function() {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
        }
    }
    return function(Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);
        if (staticProps) defineProperties(Constructor, staticProps);
        return Constructor;
    };
}();

var _wepy = require("./../../npm/wepy/lib/wepy.js");

var _wepy2 = _interopRequireDefault(_wepy);

var _API = require("./../../API/index.js");

var _youkuPlayer = require("./../../components/player/youkuPlayer.js");

var _youkuPlayer2 = _interopRequireDefault(_youkuPlayer);

var _dataError = require("./../../components/common/dataError.js");

var _dataError2 = _interopRequireDefault(_dataError);

var _playLoading = require("./../../components/common/playLoading.js");

var _playLoading2 = _interopRequireDefault(_playLoading);

var _line = require("./../../components/index/line.js");

var _line2 = _interopRequireDefault(_line);

var _defaultData = require("./../../config/default-data.js");

var _defaultData2 = _interopRequireDefault(_defaultData);

var _util = require("./../../utils/util.js");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

function _possibleConstructorReturn(self, call) {
    if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
            value: subClass,
            enumerable: false,
            writable: true,
            configurable: true
        }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var BriefTags = function(_wepy$page) {
    _inherits(BriefTags, _wepy$page);
    function BriefTags() {
        var _ref;
        var _temp, _this, _ret;
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }
        _classCallCheck(this, BriefTags);
        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = BriefTags.__proto__ || Object.getPrototypeOf(BriefTags)).call.apply(_ref, [ this ].concat(args))), 
        _this), _this.config = {
            navigationBarTitleText: "优酷视频",
            enablePullDownRefresh: true,
            backgroundTextStyle: "dark"
        }, _this.data = {
            pageId: "brief",
            isShow: false,
            allowUseRecord: false,
            // 是否出错
            isError: false,
            // 是否数据加载中
            isLoading: false,
            // 倒计时
            showTipsTimer: 0,
            // 显示底部无内容更新
            isShowDownTips: false,
            downTipsContent: "",
            // 视频是否播放
            isVideoPlaying: false,
            // 错误类型
            errorType: "",
            // 视频列表
            briefList: [],
            // 当前页
            currectPage: 1,
            // 开始页面
            startPage: 1,
            // 当前页面滚动位置
            pageScrollTop: 0,
            // 屏幕高度
            windowHeight: 0,
            // 更新条数
            totalCount: 0,
            // 是否显示顶部提示
            isShowUpTips: false,
            // 顶部提示状态
            upTipsStatus: 0,
            // 标签
            tagId: -1,
            tagName: "",
            // passport SDK
            pspSdk: null,
            // 用户是否登录
            isLogin: false,
            // 点赞视频列表
            upList: [],
            // 播放器相关：当前播放视频索引,id,封面，暂停，全屏
            isPlayerUnLoad: false,
            currectId: -1,
            pause: false,
            vid: "",
            coverURL: ""
        }, _this.events = {
            REFRASH: function REFRASH($event) {
                _this.resetStatus();
                _this.getBriefData("refrash");
            },
            PLAYERPLAYEND: function PLAYERPLAYEND(data) {
                // 播放结束 播放下一个
                _this.briefList[_this.currectId].playStatus = "complete";
                _this.isVideoPlaying = false;
                _this.$apply();
                if (_this.currectId + 2 === _this.totalCount) {
                    _this.onReachBottom();
                }
                if (_this.currectId + 1 < _this.totalCount) {
                    setTimeout(function() {
                        _this.currectId++;
                        _this.$apply();
                    }, 500);
                }
            }
        }, _this.methods = {
            /**
       * 点赞
       */
            clickUpHandler: function clickUpHandler(index) {
                var _item = this.briefList[index];
                // 防止view渲染慢的问题，只使用index 自动取item数据
                                var _type = "cancel";
                if (_item.localUp) {
                    _item.localUp = false;
                    for (var i = 0; i < this.upList.length; i++) {
                        if (this.upList[i].idNum === _item.data.idNum) {
                            this.upList.splice(i, 1);
                            break;
                        }
                    }
                } else {
                    _type = "add";
                    _item.localUp = true;
                    if (this.upList.length > 99) {
                        this.upList.pop();
                    }
                    _item.data.timestamp = new Date().getTime();
                    this.upList.splice(0, 0, _item.data);
                }
                (0, _API.sendEventLog)({
                    eventCode: "00006"
                });
                this.briefList[index] = _item;
                if (this.isLogin) {
                    // 发送服务端
                    if (this.networkType === "none") return;
                    var options = {};
                    options.url = _API.URL_ADDRESS.VIDEO_PRAISE;
                    options.sign = true;
                    var _params = {};
                    _params.type = _type;
                    _params.vid = _item.data.id;
                    var result = this.pspSdk.getToken();
                    if (result) {
                        _params.ptoken = result.ptoken;
                        _params.stoken = result.stoken;
                    }
                    options.data = _params;
                    options.callback = function(data) {};
                    (0, _API.requestData)(options);
                }
                this.$apply();
            },
            /**
       * 点击播放
       */
            clickBriefHandler: function clickBriefHandler(currectStatus, data, index) {
                if (currectStatus === "init") {
                    this.isVideoPlaying = false;
                    (0, _API.sendEventLog)({
                        eventCode: "00005"
                    });
                    this.currectId = index;
                    this.$apply();
                }
            },
            /**
       * 剧集播放
       */
            clickShowHandler: function clickShowHandler(data) {
                var showId = data.data.showId;
                if (!showId) return;
                var obj = {};
                var _spmConfig = _defaultData2.default.SPM_CONFIG[this.pageId];
                obj.source = _spmConfig.page;
                obj.spm = _spmConfig.spm + ".0.0";
                obj.showId = showId;
                var params = "";
                for (var key in obj) {
                    params += "&" + key + "=" + encodeURIComponent(obj[key]);
                }
                params = params.substring(1, params.length);
                _wepy2.default.navigateTo({
                    url: "/pages/play/play?" + params
                });
            },
            /**
       * 标签聚合页
       */
            clickTagsHandler: function clickTagsHandler(tagId, tagName) {
                if (this.tagId !== 0) {
                    this.tagId = tagId;
                    this.tagName = tagName;
                    this.$apply();
                } else {
                    _wepy2.default.navigateTo({
                        url: "/pages/brief/briefTags?tagId=" + tagId + "&tagName=" + tagName
                    });
                }
            },
            launchAppError: function launchAppError(e) {
                _wepy2.default.showModal({
                    title: "",
                    content: "由于平台限制，您需要手动打开优酷App观看完整版",
                    showCancel: false
                });
            }
        }, _this.$repeat = {
            briefList: {
                com: "line",
                props: ""
            }
        }, _this.$props = {
            dataerror: {
                "xmlns:v-bind": "",
                "v-bind:errorType.sync": "errorType"
            },
            youkuplayer: {
                "v-bind:isShow.sync": "isShow",
                "v-bind:vid.sync": "vid",
                "v-bind:coverURL.sync": "coverURL",
                "v-bind:isUnLoad.sync": "isPlayerUnLoad",
                "v-bind:pause.sync": "pause",
                "v-bind:source.sync": "pageId",
                "v-bind:allowUseRecord.sync": "allowUseRecord"
            }
        }, _this.$events = {}, _this.components = {
            line: _line2.default,
            playloading: _playLoading2.default,
            dataerror: _dataError2.default,
            youkuplayer: _youkuPlayer2.default
        }, _this.watch = {
            tagId: function tagId(newValue, oldValue) {
                if (newValue !== oldValue) {
                    this.resetStatus();
                    this.getBriefData("tagid");
                }
            },
            tagName: function tagName(newValue) {
                _wepy2.default.setNavigationBarTitle({
                    title: newValue
                });
            },
            upList: function upList(newValue) {
                _wepy2.default.setStorageSync("youku-upList", JSON.stringify(newValue));
            },
            currectId: function currectId(newValue, oldValue) {
                if (newValue === oldValue || newValue === -1) return;
                // 判断滚动位置
                                var scrollTopNum = newValue * 275;
                if (scrollTopNum > this.pageScrollTop + this.windowHeight - 220 || scrollTopNum < this.pageScrollTop) {
                    var bottomNum = scrollTopNum - 215;
                    _wepy2.default.pageScrollTo({
                        scrollTop: bottomNum
                    });
                }
                if (this.isShowUpTips) {
                    this.isShowUpTips = false;
                }
                for (var i = 0; i < this.briefList.length; i++) {
                    if (this.briefList[i].playStatus === "playing") {
                        this.briefList[i].playStatus = "init";
                    }
                }
                this.briefList[newValue].playStatus = "playing";
                this.vid = this.briefList[newValue].data.id;
                this.coverURL = this.briefList[newValue].data.thumbnail;
                this.isVideoPlaying = true;
                this.$apply();
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }
    _createClass(BriefTags, [ {
        key: "onPageScroll",
        /**
     * 获取滚动条当前位置
     */
        value: function onPageScroll(e) {
            this.pageScrollTop = e.scrollTop;
            this.$apply();
        }
    }, {
        key: "onReachBottom",
        /**
     * 底部加载更多
     */
        value: function onReachBottom() {
            if (this.isLoading) return;
            if (this.currectPage > this.startPage + 8) {
                this.isShowDownTips = true;
                this.downTipsContent = "暂无新内容";
                this.$apply();
                return;
            }
            if (this.networkType === "none") {
                this.isShowDownTips = true;
                this.downTipsContent = "网络未连接";
                this.$apply();
                return;
            } else {
                this.isShowDownTips = false;
            }
            this.isLoading = true;
            this.currectPage++;
            this.getBriefData("bottom");
        }
        /**
     * 顶部下拉刷新
     */    }, {
        key: "onPullDownRefresh",
        value: function onPullDownRefresh() {
            if (this.isLoading) return;
            this.isLoading = true;
            if (this.showTipsTimer) {
                clearTimeout(this.showTipsTimer);
                this.isShowUpTips = false;
            }
            if (this.tagId) {
                this.startPage = this.currectPage + 1;
                if (this.startPage > 10) {
                    this.startPage = 1;
                }
            }
            this.resetStatus();
            if (this.tagId) {
                this.currectPage = this.startPage;
            }
            this.getBriefData("up");
        }
    }, {
        key: "onLoad",
        value: function onLoad(params) {
            var _this2 = this;
            _wepy2.default.getSystemInfo({
                success: function success(res) {
                    // 计算主体部分高度,单位为px,由于主体px和微信rpx之间换算差导致设置的
                    _this2.windowHeight = res.windowHeight;
                    _this2.$apply();
                }
            });
            _wepy2.default.getNetworkType({
                complete: function complete(res) {
                    if (res.networkType) {
                        _this2.networkType = res.networkType;
                    } else {
                        _this2.networkType = "none";
                    }
                    if (params.tagId) {
                        _this2.tagId = params.tagId;
                    } else {
                        _this2.tagId = 0;
                    }
                    if (params.tagName) {
                        _this2.tagName = params.tagName;
                    }
                    _this2.$apply();
                }
            });
            _wepy2.default.onNetworkStatusChange(function(result) {
                _this2.networkType = result.networkType;
                _this2.$apply();
            });
        }
        // 加载数据
        }, {
        key: "getBriefData",
        value: function getBriefData() {
            var _this3 = this;
            var source = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "refrash";
            if (this.networkType === "none") return;
            var options = {};
            options.url = this.tagId ? _API.URL_ADDRESS.GET_RCMD_LIST : _API.URL_ADDRESS.GET_FEED_LIST;
            options.sign = true;
            var _params = {};
            _params.page = this.currectPage;
            _params.count = 20;
            if (this.isLogin) {
                var result = this.pspSdk.getToken();
                if (result) {
                    _params.ptoken = result.ptoken;
                    _params.stoken = result.stoken;
                }
            }
            if (this.tagId) _params.tagId = this.tagId;
            var _feedParam = {};
            _feedParam.net_name = this.networkType;
            try {
                var res = _wepy2.default.getSystemInfoSync();
                _feedParam.device_name = res.brand;
                _feedParam.language = res.language;
                _feedParam.os = res.platform;
                _feedParam.os_ver = res.system.split(" ")[1];
                _feedParam.vip = 0;
                _feedParam.vip_level = 0;
                _feedParam.ids = "";
                _feedParam.utdid = _wepy2.default.getStorageSync("youku-uuid");
            } catch (e) {
                // error
            }
            _params.feedRcmdParam = JSON.stringify(_feedParam);
            options.data = _params;
            options.callback = function(data) {
                _this3.getDataComplete(data, source);
            };
            (0, _API.requestData)(options);
        }
    }, {
        key: "getDataComplete",
        value: function getDataComplete(data, source) {
            var _this4 = this;
            if (data.result.data && data.result.data.data && data.result.data.data.list && data.result.data.data.list.length > 0) {
                var briefList = data.result.data.data.list;
                for (var i = 0; i < briefList.length; i++) {
                    var element = briefList[i];
                    var _params = {};
                    // 如果未登陆
                                        element.localUp = false;
                    for (var j = 0; j < this.upList.length; j++) {
                        if (element.data.idNum === this.upList[j].idNum) {
                            element.localUp = true;
                            break;
                        }
                    }
                    _params.videoId = element.data.id;
                    _params.targetUrl = "youku://play";
                    element.openAppParam = JSON.stringify(_params);
                    element.playStatus = "init";
                    if (element.data.playCount) {
                        element.playCount = (0, _util.formatNumber)(element.data.playCount);
                    }
                    if (element.data.duration) {
                        element.duration = (0, _util.secondsToTime)(element.data.duration, 4);
                    }
                }
                if (source === "bottom") {
                    this.briefList = this.briefList.concat(briefList);
                } else {
                    this.briefList = briefList;
                }
                this.totalCount = this.briefList.length;
                this.upTipsStatus = 1;
            } else {
                if (this.briefList.length > 0) {
                    this.upTipsStatus = 2;
                    if (source === "up") {
                        for (var k = 0; k < this.briefList.length; k++) {
                            if (this.briefList[k].playStatus === "playing") {
                                this.briefList[k].playStatus = "init";
                            }
                        }
                    }
                } else {
                    this.upTipsStatus = 3;
                    this.isError = true;
                    this.errorType = "dataloaderror";
                }
            }
            if (source === "up") {
                this.isShowUpTips = true;
                this.showTipsTimer = setTimeout(function() {
                    _this4.isShowUpTips = false;
                    _this4.$apply();
                }, 1500);
            }
            _wepy2.default.stopPullDownRefresh();
            if (this.isLoading) {
                this.isLoading = false;
            }
            this.$apply();
        }
        /**
     * 重置数据状态
     */    }, {
        key: "resetStatus",
        value: function resetStatus() {
            var _this5 = this;
            if (this.networkType === "none") {
                this.isLoading = false;
                _wepy2.default.stopPullDownRefresh();
                this.isError = true;
                this.errorType = "nonetwork";
            } else {
                this.isError = false;
            }
            if (_wepy2.default.pageScrollTo && this.pageScrollTop > 0) {
                _wepy2.default.pageScrollTo({
                    scrollTop: 0
                });
            }
            this.isPlayerUnLoad = true;
            setTimeout(function() {
                _this5.isPlayerUnLoad = false;
            }, 1e3);
            this.currectId = -1;
            this.isVideoPlaying = false;
            this.isShowDownTips = false;
            this.currectPage = 1;
            this.$apply();
        }
        /**
     * 发送页面黄金令箭pv
     */    }, {
        key: "sendLog",
        value: function sendLog() {
            var _data = {};
            var _spmConfig = _defaultData2.default.SPM_CONFIG[this.pageId];
            _data.title = "优酷短视频";
            _data.url = _spmConfig.page;
            _data.spm = _spmConfig.spm + ".0.0";
            (0, _API.sendGoldLog)(_data);
        }
    }, {
        key: "onShow",
        value: function onShow() {
            var _this6 = this;
            this.pspSdk = _wepy2.default.$instance.pspSdk;
            this.isShow = true;
            setTimeout(function() {
                _this6.isShow = false;
                _this6.$apply();
            }, 3e3);
            // 获取点赞数目
                        if (_wepy2.default.getStorageSync("youku-upList")) {
                var upList = _wepy2.default.getStorageSync("youku-upList");
                try {
                    this.upList = JSON.parse(upList);
                } catch (e) {
                    console.log(e);
                }
            }
            // 显示的时候重置本地点赞状态
                        for (var i = 0; i < this.briefList.length; i++) {
                this.briefList[i].localUp = false;
                for (var j = 0; j < this.upList.length; j++) {
                    if (this.briefList[i].data.idNum === this.upList[j].idNum) {
                        this.briefList[i].localUp = true;
                        break;
                    }
                }
            }
            this.pspSdk.checkLogin({
                success: function success(isLogin) {
                    if (isLogin) {
                        _this6.isLogin = true;
                        _this6.$apply();
                    }
                }
            });
            this.sendLog();
            this.$apply();
        }
    }, {
        key: "onHide",
        value: function onHide() {
            // mark todo 手动停止播放视频
            if (!this.pause) {
                this.pause = true;
            }
            this.$apply();
        }
        // 分享
        }, {
        key: "onShareAppMessage",
        value: function onShareAppMessage(options) {
            var title = "优酷短视频";
            var shareImage = null;
            var path = "/pages/brief/brief";
            if (options.target && options.target.dataset) {
                var data = options.target.dataset.item;
                title = data.data.title;
                if (data.data.thumbnail) {
                    shareImage = _API.URL_ADDRESS.SHARE_IMAGE + "?url=" + data.data.thumbnail;
                }
                var obj = {};
                var _spmConfig = _defaultData2.default.SPM_CONFIG[this.pageId];
                obj.source = _spmConfig.page;
                obj.spm = _spmConfig.spm;
                obj.videoId = data.data.id;
                var params = "";
                for (var key in obj) {
                    params += "&" + key + "=" + encodeURIComponent(obj[key]);
                }
                params = params.substring(1, params.length);
                path = "pages/play/play?" + params;
            } else {
                var _data2 = this.briefList[0];
                if (_data2.data.thumbnail) {
                    shareImage = _API.URL_ADDRESS.SHARE_IMAGE + "?url=" + _data2.data.thumbnail;
                }
            }
            (0, _API.sendEventLog)({
                eventCode: "00007"
            });
            return {
                title: title,
                path: path,
                imageUrl: shareImage,
                success: function success(res) {
                    if (res.errMsg === "shareAppMessage:ok") {
                        (0, _API.sendEventLog)({
                            eventCode: "00008"
                        });
                    }
                }
            };
        }
    } ]);
    return BriefTags;
}(_wepy2.default.page);

Page(require("./../../npm/wepy/lib/wepy.js").default.$createPage(BriefTags, "pages/brief/briefTags"));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJyaWVmVGFncy5qcyJdLCJuYW1lcyI6WyJCcmllZlRhZ3MiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiZW5hYmxlUHVsbERvd25SZWZyZXNoIiwiYmFja2dyb3VuZFRleHRTdHlsZSIsImRhdGEiLCJwYWdlSWQiLCJpc1Nob3ciLCJhbGxvd1VzZVJlY29yZCIsImlzRXJyb3IiLCJpc0xvYWRpbmciLCJzaG93VGlwc1RpbWVyIiwiaXNTaG93RG93blRpcHMiLCJkb3duVGlwc0NvbnRlbnQiLCJpc1ZpZGVvUGxheWluZyIsImVycm9yVHlwZSIsImJyaWVmTGlzdCIsImN1cnJlY3RQYWdlIiwic3RhcnRQYWdlIiwicGFnZVNjcm9sbFRvcCIsIndpbmRvd0hlaWdodCIsInRvdGFsQ291bnQiLCJpc1Nob3dVcFRpcHMiLCJ1cFRpcHNTdGF0dXMiLCJ0YWdJZCIsInRhZ05hbWUiLCJwc3BTZGsiLCJpc0xvZ2luIiwidXBMaXN0IiwiaXNQbGF5ZXJVbkxvYWQiLCJjdXJyZWN0SWQiLCJwYXVzZSIsInZpZCIsImNvdmVyVVJMIiwiZXZlbnRzIiwiJGV2ZW50IiwicmVzZXRTdGF0dXMiLCJnZXRCcmllZkRhdGEiLCJwbGF5U3RhdHVzIiwiJGFwcGx5Iiwib25SZWFjaEJvdHRvbSIsInNldFRpbWVvdXQiLCJtZXRob2RzIiwiY2xpY2tVcEhhbmRsZXIiLCJpbmRleCIsIl9pdGVtIiwiX3R5cGUiLCJsb2NhbFVwIiwiaSIsImxlbmd0aCIsImlkTnVtIiwic3BsaWNlIiwicG9wIiwidGltZXN0YW1wIiwiRGF0ZSIsImdldFRpbWUiLCJldmVudENvZGUiLCJuZXR3b3JrVHlwZSIsIm9wdGlvbnMiLCJ1cmwiLCJWSURFT19QUkFJU0UiLCJzaWduIiwiX3BhcmFtcyIsInR5cGUiLCJpZCIsInJlc3VsdCIsImdldFRva2VuIiwicHRva2VuIiwic3Rva2VuIiwiY2FsbGJhY2siLCJjbGlja0JyaWVmSGFuZGxlciIsImN1cnJlY3RTdGF0dXMiLCJjbGlja1Nob3dIYW5kbGVyIiwic2hvd0lkIiwib2JqIiwiX3NwbUNvbmZpZyIsIlNQTV9DT05GSUciLCJzb3VyY2UiLCJwYWdlIiwic3BtIiwicGFyYW1zIiwia2V5IiwiZW5jb2RlVVJJQ29tcG9uZW50Iiwic3Vic3RyaW5nIiwibmF2aWdhdGVUbyIsImNsaWNrVGFnc0hhbmRsZXIiLCJsYXVuY2hBcHBFcnJvciIsImUiLCJzaG93TW9kYWwiLCJ0aXRsZSIsImNvbnRlbnQiLCJzaG93Q2FuY2VsIiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwibGluZSIsInBsYXlsb2FkaW5nIiwiZGF0YWVycm9yIiwieW91a3VwbGF5ZXIiLCJ3YXRjaCIsIm5ld1ZhbHVlIiwib2xkVmFsdWUiLCJzZXROYXZpZ2F0aW9uQmFyVGl0bGUiLCJzZXRTdG9yYWdlU3luYyIsIkpTT04iLCJzdHJpbmdpZnkiLCJzY3JvbGxUb3BOdW0iLCJib3R0b21OdW0iLCJwYWdlU2Nyb2xsVG8iLCJzY3JvbGxUb3AiLCJ0aHVtYm5haWwiLCJjbGVhclRpbWVvdXQiLCJnZXRTeXN0ZW1JbmZvIiwic3VjY2VzcyIsInJlcyIsImdldE5ldHdvcmtUeXBlIiwiY29tcGxldGUiLCJvbk5ldHdvcmtTdGF0dXNDaGFuZ2UiLCJHRVRfUkNNRF9MSVNUIiwiR0VUX0ZFRURfTElTVCIsImNvdW50IiwiX2ZlZWRQYXJhbSIsIm5ldF9uYW1lIiwiZ2V0U3lzdGVtSW5mb1N5bmMiLCJkZXZpY2VfbmFtZSIsImJyYW5kIiwibGFuZ3VhZ2UiLCJvcyIsInBsYXRmb3JtIiwib3NfdmVyIiwic3lzdGVtIiwic3BsaXQiLCJ2aXAiLCJ2aXBfbGV2ZWwiLCJpZHMiLCJ1dGRpZCIsImdldFN0b3JhZ2VTeW5jIiwiZmVlZFJjbWRQYXJhbSIsImdldERhdGFDb21wbGV0ZSIsImxpc3QiLCJlbGVtZW50IiwiaiIsInZpZGVvSWQiLCJ0YXJnZXRVcmwiLCJvcGVuQXBwUGFyYW0iLCJwbGF5Q291bnQiLCJkdXJhdGlvbiIsImNvbmNhdCIsImsiLCJzdG9wUHVsbERvd25SZWZyZXNoIiwiX2RhdGEiLCIkaW5zdGFuY2UiLCJwYXJzZSIsImNvbnNvbGUiLCJsb2ciLCJjaGVja0xvZ2luIiwic2VuZExvZyIsInNoYXJlSW1hZ2UiLCJwYXRoIiwidGFyZ2V0IiwiZGF0YXNldCIsIml0ZW0iLCJTSEFSRV9JTUFHRSIsImltYWdlVXJsIiwiZXJyTXNnIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7OztJQUNxQkEsUzs7Ozs7Ozs7Ozs7Ozs7NExBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCLE1BRGpCO0FBRVBDLDZCQUF1QixJQUZoQjtBQUdQQywyQkFBcUI7QUFIZCxLLFFBS1RDLEksR0FBTztBQUNMQyxjQUFRLE9BREg7QUFFTEMsY0FBUSxLQUZIO0FBR0xDLHNCQUFnQixLQUhYO0FBSUw7QUFDQUMsZUFBUyxLQUxKO0FBTUw7QUFDQUMsaUJBQVcsS0FQTjtBQVFMO0FBQ0FDLHFCQUFlLENBVFY7QUFVTDtBQUNBQyxzQkFBZ0IsS0FYWDtBQVlMQyx1QkFBaUIsRUFaWjtBQWFMO0FBQ0FDLHNCQUFnQixLQWRYO0FBZUw7QUFDQUMsaUJBQVcsRUFoQk47QUFpQkw7QUFDQUMsaUJBQVcsRUFsQk47QUFtQkw7QUFDQUMsbUJBQWEsQ0FwQlI7QUFxQkw7QUFDQUMsaUJBQVcsQ0F0Qk47QUF1Qkw7QUFDQUMscUJBQWUsQ0F4QlY7QUF5Qkw7QUFDQUMsb0JBQWMsQ0ExQlQ7QUEyQkw7QUFDQUMsa0JBQVksQ0E1QlA7QUE2Qkw7QUFDQUMsb0JBQWMsS0E5QlQ7QUErQkw7QUFDQUMsb0JBQWMsQ0FoQ1Q7QUFpQ0w7QUFDQUMsYUFBTyxDQUFDLENBbENIO0FBbUNMQyxlQUFTLEVBbkNKO0FBb0NMO0FBQ0FDLGNBQVEsSUFyQ0g7QUFzQ0w7QUFDQUMsZUFBUyxLQXZDSjtBQXdDTDtBQUNBQyxjQUFRLEVBekNIO0FBMENMO0FBQ0FDLHNCQUFnQixLQTNDWDtB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S3NCLEk7O2tCQUF2QjlFLFMiLCJmaWxlIjoiYnJpZWZUYWdzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcbmltcG9ydCB7VVJMX0FERFJFU1MsIHJlcXVlc3REYXRhLCBzZW5kR29sZExvZywgc2VuZEV2ZW50TG9nfSBmcm9tICdAL0FQSS8nO1xuaW1wb3J0IFlvdWt1UGxheWVyIGZyb20gJ0AvY29tcG9uZW50cy9wbGF5ZXIveW91a3VQbGF5ZXInO1xuaW1wb3J0IERhdGFFcnJvciBmcm9tICdAL2NvbXBvbmVudHMvY29tbW9uL2RhdGFFcnJvcic7XG5pbXBvcnQgUGxheUxvYWRpbmcgZnJvbSAnQC9jb21wb25lbnRzL2NvbW1vbi9wbGF5TG9hZGluZyc7XG5pbXBvcnQgbGluZSBmcm9tICdAL2NvbXBvbmVudHMvaW5kZXgvbGluZSc7XG5pbXBvcnQgREVGQVVMVF9EQVRBIGZyb20gJ0AvY29uZmlnL2RlZmF1bHQtZGF0YSc7XG5pbXBvcnQgeyBmb3JtYXROdW1iZXIsIHNlY29uZHNUb1RpbWUgfSBmcm9tICdAL3V0aWxzL3V0aWwnO1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQnJpZWZUYWdzIGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgY29uZmlnID0ge1xuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfkvJjphbfop4bpopEnLFxuICAgIGVuYWJsZVB1bGxEb3duUmVmcmVzaDogdHJ1ZSxcbiAgICBiYWNrZ3JvdW5kVGV4dFN0eWxlOiAnZGFyaydcbiAgfTtcbiAgZGF0YSA9IHtcbiAgICBwYWdlSWQ6ICdicmllZicsXG4gICAgaXNTaG93OiBmYWxzZSxcbiAgICBhbGxvd1VzZVJlY29yZDogZmFsc2UsXG4gICAgLy8g5piv5ZCm5Ye66ZSZXG4gICAgaXNFcnJvcjogZmFsc2UsXG4gICAgLy8g5piv5ZCm5pWw5o2u5Yqg6L295LitXG4gICAgaXNMb2FkaW5nOiBmYWxzZSxcbiAgICAvLyDlgJLorqHml7ZcbiAgICBzaG93VGlwc1RpbWVyOiAwLFxuICAgIC8vIOaYvuekuuW6lemDqOaXoOWGheWuueabtOaWsFxuICAgIGlzU2hvd0Rvd25UaXBzOiBmYWxzZSxcbiAgICBkb3duVGlwc0NvbnRlbnQ6ICcnLFxuICAgIC8vIOinhumikeaYr+WQpuaSreaUvlxuICAgIGlzVmlkZW9QbGF5aW5nOiBmYWxzZSxcbiAgICAvLyDplJnor6/nsbvlnotcbiAgICBlcnJvclR5cGU6ICcnLFxuICAgIC8vIOinhumikeWIl+ihqFxuICAgIGJyaWVmTGlzdDogW10sXG4gICAgLy8g5b2T5YmN6aG1XG4gICAgY3VycmVjdFBhZ2U6IDEsXG4gICAgLy8g5byA5aeL6aG16Z2iXG4gICAgc3RhcnRQYWdlOiAxLFxuICAgIC8vIOW9k+WJjemhtemdoua7muWKqOS9jee9rlxuICAgIHBhZ2VTY3JvbGxUb3A6IDAsXG4gICAgLy8g5bGP5bmV6auY5bqmXG4gICAgd2luZG93SGVpZ2h0OiAwLFxuICAgIC8vIOabtOaWsOadoeaVsFxuICAgIHRvdGFsQ291bnQ6IDAsXG4gICAgLy8g5piv5ZCm5pi+56S66aG26YOo5o+Q56S6XG4gICAgaXNTaG93VXBUaXBzOiBmYWxzZSxcbiAgICAvLyDpobbpg6jmj5DnpLrnirbmgIFcbiAgICB1cFRpcHNTdGF0dXM6IDAsXG4gICAgLy8g5qCH562+XG4gICAgdGFnSWQ6IC0xLFxuICAgIHRhZ05hbWU6ICcnLFxuICAgIC8vIHBhc3Nwb3J0IFNES1xuICAgIHBzcFNkazogbnVsbCxcbiAgICAvLyDnlKjmiLfmmK/lkKbnmbvlvZVcbiAgICBpc0xvZ2luOiBmYWxzZSxcbiAgICAvLyDngrnotZ7op4bpopHliJfooahcbiAgICB1cExpc3Q6IFtdLFxuICAgIC8vIOaSreaUvuWZqOebuOWFs++8muW9k+WJjeaSreaUvuinhumikee0ouW8lSxpZCzlsIHpnaLvvIzmmoLlgZzvvIzlhajlsY9cbiAgICBpc1BsYXllclVuTG9hZDogZmFsc2UsXG4gICAgY3VycmVjdElkOiAtMSxcbiAgICBwYXVzZTogZmFsc2UsXG4gICAgdmlkOiAnJyxcbiAgICBjb3ZlclVSTDogJydcbiAgfTtcbiAgZXZlbnRzID0ge1xuICAgICdSRUZSQVNIJzogKCRldmVudCwgLi4uYXJncykgPT4ge1xuICAgICAgdGhpcy5yZXNldFN0YXR1cygpO1xuICAgICAgdGhpcy5nZXRCcmllZkRhdGEoJ3JlZnJhc2gnKTtcbiAgICB9LFxuICAgICdQTEFZRVJQTEFZRU5EJzogKGRhdGEpID0+IHtcbiAgICAgIC8vIOaSreaUvue7k+adnyDmkq3mlL7kuIvkuIDkuKpcbiAgICAgIHRoaXMuYnJpZWZMaXN0W3RoaXMuY3VycmVjdElkXS5wbGF5U3RhdHVzID0gJ2NvbXBsZXRlJztcbiAgICAgIHRoaXMuaXNWaWRlb1BsYXlpbmcgPSBmYWxzZTtcbiAgICAgIHRoaXMuJGFwcGx5KCk7XG4gICAgICBpZiAoKHRoaXMuY3VycmVjdElkICsgMikgPT09IHRoaXMudG90YWxDb3VudCkge1xuICAgICAgICB0aGlzLm9uUmVhY2hCb3R0b20oKTtcbiAgICAgIH1cbiAgICAgIGlmICgodGhpcy5jdXJyZWN0SWQgKyAxKSA8IHRoaXMudG90YWxDb3VudCkge1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICB0aGlzLmN1cnJlY3RJZCsrO1xuICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XG4gICAgICAgIH0sIDUwMCk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuICBtZXRob2RzID0ge1xuICAgIC8qKlxuICAgICAqIOeCuei1nlxuICAgICAqL1xuICAgIGNsaWNrVXBIYW5kbGVyKGluZGV4KSB7XG4gICAgICBjb25zdCBfaXRlbSA9IHRoaXMuYnJpZWZMaXN0W2luZGV4XTtcbiAgICAgIC8vIOmYsuatonZpZXfmuLLmn5PmhaLnmoTpl67popjvvIzlj6rkvb/nlKhpbmRleCDoh6rliqjlj5ZpdGVt5pWw5o2uXG4gICAgICBsZXQgX3R5cGUgPSAnY2FuY2VsJztcbiAgICAgIGlmIChfaXRlbS5sb2NhbFVwKSB7XG4gICAgICAgIF9pdGVtLmxvY2FsVXAgPSBmYWxzZTtcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMudXBMaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgaWYgKHRoaXMudXBMaXN0W2ldLmlkTnVtID09PSBfaXRlbS5kYXRhLmlkTnVtKSB7XG4gICAgICAgICAgICB0aGlzLnVwTGlzdC5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIF90eXBlID0gJ2FkZCc7XG4gICAgICAgIF9pdGVtLmxvY2FsVXAgPSB0cnVlO1xuICAgICAgICBpZiAodGhpcy51cExpc3QubGVuZ3RoID4gOTkpIHtcbiAgICAgICAgICB0aGlzLnVwTGlzdC5wb3AoKTtcbiAgICAgICAgfVxuICAgICAgICBfaXRlbS5kYXRhLnRpbWVzdGFtcCA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgICAgICB0aGlzLnVwTGlzdC5zcGxpY2UoMCwgMCwgX2l0ZW0uZGF0YSk7XG4gICAgICB9XG4gICAgICBzZW5kRXZlbnRMb2coe2V2ZW50Q29kZTogJzAwMDA2J30pO1xuICAgICAgdGhpcy5icmllZkxpc3RbaW5kZXhdID0gX2l0ZW07XG4gICAgICBpZiAodGhpcy5pc0xvZ2luKSB7XG4gICAgICAgIC8vIOWPkemAgeacjeWKoeerr1xuICAgICAgICBpZiAodGhpcy5uZXR3b3JrVHlwZSA9PT0gJ25vbmUnKSByZXR1cm47XG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSB7fTtcbiAgICAgICAgb3B0aW9ucy51cmwgPSBVUkxfQUREUkVTUy5WSURFT19QUkFJU0U7XG4gICAgICAgIG9wdGlvbnMuc2lnbiA9IHRydWU7XG4gICAgICAgIGNvbnN0IF9wYXJhbXMgPSB7fTtcbiAgICAgICAgX3BhcmFtcy50eXBlID0gX3R5cGU7XG4gICAgICAgIF9wYXJhbXMudmlkID0gX2l0ZW0uZGF0YS5pZDtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gdGhpcy5wc3BTZGsuZ2V0VG9rZW4oKTtcbiAgICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICAgIF9wYXJhbXMucHRva2VuID0gcmVzdWx0LnB0b2tlbjtcbiAgICAgICAgICBfcGFyYW1zLnN0b2tlbiA9IHJlc3VsdC5zdG9rZW47XG4gICAgICAgIH1cbiAgICAgICAgb3B0aW9ucy5kYXRhID0gX3BhcmFtcztcbiAgICAgICAgb3B0aW9ucy5jYWxsYmFjayA9IChkYXRhKSA9PiB7XG5cbiAgICAgICAgfVxuICAgICAgICByZXF1ZXN0RGF0YShvcHRpb25zKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuJGFwcGx5KCk7XG4gICAgfSxcbiAgICAvKipcbiAgICAgKiDngrnlh7vmkq3mlL5cbiAgICAgKi9cbiAgICBjbGlja0JyaWVmSGFuZGxlcihjdXJyZWN0U3RhdHVzLCBkYXRhLCBpbmRleCkge1xuICAgICAgaWYgKGN1cnJlY3RTdGF0dXMgPT09ICdpbml0Jykge1xuICAgICAgICB0aGlzLmlzVmlkZW9QbGF5aW5nID0gZmFsc2U7XG5cbiAgICAgICAgc2VuZEV2ZW50TG9nKHtldmVudENvZGU6ICcwMDAwNSd9KTtcbiAgICAgICAgdGhpcy5jdXJyZWN0SWQgPSBpbmRleDtcbiAgICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIC8qKlxuICAgICAqIOWJp+mbhuaSreaUvlxuICAgICAqL1xuICAgIGNsaWNrU2hvd0hhbmRsZXIoZGF0YSkge1xuICAgICAgY29uc3Qgc2hvd0lkID0gZGF0YS5kYXRhLnNob3dJZDtcbiAgICAgIGlmICghc2hvd0lkKSByZXR1cm47XG4gICAgICBjb25zdCBvYmogPSB7fTtcbiAgICAgIGNvbnN0IF9zcG1Db25maWcgPSBERUZBVUxUX0RBVEEuU1BNX0NPTkZJR1t0aGlzLnBhZ2VJZF07XG5cbiAgICAgIG9iai5zb3VyY2UgPSBfc3BtQ29uZmlnLnBhZ2U7XG4gICAgICBvYmouc3BtID0gX3NwbUNvbmZpZy5zcG0gKyAnLjAuMCc7XG5cbiAgICAgIG9iai5zaG93SWQgPSBzaG93SWQ7XG4gICAgICBsZXQgcGFyYW1zID0gJyc7XG4gICAgICBmb3IgKHZhciBrZXkgaW4gb2JqKSB7XG4gICAgICAgIHBhcmFtcyArPSAnJicgKyBrZXkgKyAnPScgKyBlbmNvZGVVUklDb21wb25lbnQob2JqW2tleV0pO1xuICAgICAgfVxuICAgICAgcGFyYW1zID0gcGFyYW1zLnN1YnN0cmluZygxLCBwYXJhbXMubGVuZ3RoKTtcbiAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgIHVybDogYC9wYWdlcy9wbGF5L3BsYXk/JHtwYXJhbXN9YFxuICAgICAgfSk7XG4gICAgfSxcbiAgICAvKipcbiAgICAgKiDmoIfnrb7ogZrlkIjpobVcbiAgICAgKi9cbiAgICBjbGlja1RhZ3NIYW5kbGVyKHRhZ0lkLCB0YWdOYW1lKSB7XG4gICAgICBpZiAodGhpcy50YWdJZCAhPT0gMCkge1xuICAgICAgICB0aGlzLnRhZ0lkID0gdGFnSWQ7XG4gICAgICAgIHRoaXMudGFnTmFtZSA9IHRhZ05hbWU7XG4gICAgICAgIHRoaXMuJGFwcGx5KCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgIHVybDogYC9wYWdlcy9icmllZi9icmllZlRhZ3M/dGFnSWQ9JHt0YWdJZH0mdGFnTmFtZT0ke3RhZ05hbWV9YFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9LFxuICAgIGxhdW5jaEFwcEVycm9yKGUpIHtcbiAgICAgIHdlcHkuc2hvd01vZGFsKHtcbiAgICAgICAgdGl0bGU6ICcnLFxuICAgICAgICBjb250ZW50OiAn55Sx5LqO5bmz5Y+w6ZmQ5Yi277yM5oKo6ZyA6KaB5omL5Yqo5omT5byA5LyY6YW3QXBw6KeC55yL5a6M5pW054mIJyxcbiAgICAgICAgc2hvd0NhbmNlbDogZmFsc2VcbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcbiAkcmVwZWF0ID0ge1wiYnJpZWZMaXN0XCI6e1wiY29tXCI6XCJsaW5lXCIsXCJwcm9wc1wiOlwiXCJ9fTtcclxuJHByb3BzID0ge1wiZGF0YWVycm9yXCI6e1wieG1sbnM6di1iaW5kXCI6XCJcIixcInYtYmluZDplcnJvclR5cGUuc3luY1wiOlwiZXJyb3JUeXBlXCJ9LFwieW91a3VwbGF5ZXJcIjp7XCJ2LWJpbmQ6aXNTaG93LnN5bmNcIjpcImlzU2hvd1wiLFwidi1iaW5kOnZpZC5zeW5jXCI6XCJ2aWRcIixcInYtYmluZDpjb3ZlclVSTC5zeW5jXCI6XCJjb3ZlclVSTFwiLFwidi1iaW5kOmlzVW5Mb2FkLnN5bmNcIjpcImlzUGxheWVyVW5Mb2FkXCIsXCJ2LWJpbmQ6cGF1c2Uuc3luY1wiOlwicGF1c2VcIixcInYtYmluZDpzb3VyY2Uuc3luY1wiOlwicGFnZUlkXCIsXCJ2LWJpbmQ6YWxsb3dVc2VSZWNvcmQuc3luY1wiOlwiYWxsb3dVc2VSZWNvcmRcIn19O1xyXG4kZXZlbnRzID0ge307XHJcbiBjb21wb25lbnRzID0ge1xuICAgIGxpbmU6IGxpbmUsXG4gICAgcGxheWxvYWRpbmc6IFBsYXlMb2FkaW5nLFxuICAgIGRhdGFlcnJvcjogRGF0YUVycm9yLFxuICAgIHlvdWt1cGxheWVyOiBZb3VrdVBsYXllclxuICB9O1xuICB3YXRjaCA9IHtcbiAgICB0YWdJZChuZXdWYWx1ZSwgb2xkVmFsdWUpIHtcbiAgICAgIGlmIChuZXdWYWx1ZSAhPT0gb2xkVmFsdWUpIHtcbiAgICAgICAgdGhpcy5yZXNldFN0YXR1cygpO1xuICAgICAgICB0aGlzLmdldEJyaWVmRGF0YSgndGFnaWQnKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIHRhZ05hbWUobmV3VmFsdWUpIHtcbiAgICAgIHdlcHkuc2V0TmF2aWdhdGlvbkJhclRpdGxlKHtcbiAgICAgICAgdGl0bGU6IG5ld1ZhbHVlXG4gICAgICB9KTtcbiAgICB9LFxuICAgIHVwTGlzdChuZXdWYWx1ZSkge1xuICAgICAgd2VweS5zZXRTdG9yYWdlU3luYygneW91a3UtdXBMaXN0JywgSlNPTi5zdHJpbmdpZnkobmV3VmFsdWUpKTtcbiAgICB9LFxuICAgIGN1cnJlY3RJZChuZXdWYWx1ZSwgb2xkVmFsdWUpIHtcbiAgICAgIGlmIChuZXdWYWx1ZSA9PT0gb2xkVmFsdWUgfHwgbmV3VmFsdWUgPT09IC0xKSByZXR1cm47XG4gICAgICAvLyDliKTmlq3mu5rliqjkvY3nva5cbiAgICAgIGNvbnN0IHNjcm9sbFRvcE51bSA9IG5ld1ZhbHVlICogMjc1O1xuICAgICAgaWYgKHNjcm9sbFRvcE51bSA+ICh0aGlzLnBhZ2VTY3JvbGxUb3AgKyB0aGlzLndpbmRvd0hlaWdodCAtIDIyMCkgfHwgc2Nyb2xsVG9wTnVtIDwgdGhpcy5wYWdlU2Nyb2xsVG9wKSB7XG4gICAgICAgIGNvbnN0IGJvdHRvbU51bSA9IHNjcm9sbFRvcE51bSAtIDIxNTtcbiAgICAgICAgd2VweS5wYWdlU2Nyb2xsVG8oe1xuICAgICAgICAgIHNjcm9sbFRvcDogYm90dG9tTnVtXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMuaXNTaG93VXBUaXBzKSB7XG4gICAgICAgIHRoaXMuaXNTaG93VXBUaXBzID0gZmFsc2U7XG4gICAgICB9XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuYnJpZWZMaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmICh0aGlzLmJyaWVmTGlzdFtpXS5wbGF5U3RhdHVzID09PSAncGxheWluZycpIHtcbiAgICAgICAgICB0aGlzLmJyaWVmTGlzdFtpXS5wbGF5U3RhdHVzID0gJ2luaXQnO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICB0aGlzLmJyaWVmTGlzdFtuZXdWYWx1ZV0ucGxheVN0YXR1cyA9ICdwbGF5aW5nJztcbiAgICAgIHRoaXMudmlkID0gdGhpcy5icmllZkxpc3RbbmV3VmFsdWVdLmRhdGEuaWQ7XG4gICAgICB0aGlzLmNvdmVyVVJMID0gdGhpcy5icmllZkxpc3RbbmV3VmFsdWVdLmRhdGEudGh1bWJuYWlsO1xuICAgICAgdGhpcy5pc1ZpZGVvUGxheWluZyA9IHRydWU7XG4gICAgICB0aGlzLiRhcHBseSgpO1xuICAgIH1cbiAgfTtcbiAgLyoqXG4gICAqIOiOt+WPlua7muWKqOadoeW9k+WJjeS9jee9rlxuICAgKi9cbiAgb25QYWdlU2Nyb2xsKGUpIHtcbiAgICB0aGlzLnBhZ2VTY3JvbGxUb3AgPSBlLnNjcm9sbFRvcDtcbiAgICB0aGlzLiRhcHBseSgpO1xuICB9O1xuICAvKipcbiAgICog5bqV6YOo5Yqg6L295pu05aSaXG4gICAqL1xuICBvblJlYWNoQm90dG9tKCkge1xuICAgIGlmICh0aGlzLmlzTG9hZGluZykgcmV0dXJuO1xuICAgIGlmICh0aGlzLmN1cnJlY3RQYWdlID4gdGhpcy5zdGFydFBhZ2UgKyA4KSB7XG4gICAgICB0aGlzLmlzU2hvd0Rvd25UaXBzID0gdHJ1ZTtcbiAgICAgIHRoaXMuZG93blRpcHNDb250ZW50ID0gJ+aaguaXoOaWsOWGheWuuSc7XG4gICAgICB0aGlzLiRhcHBseSgpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAodGhpcy5uZXR3b3JrVHlwZSA9PT0gJ25vbmUnKSB7XG4gICAgICB0aGlzLmlzU2hvd0Rvd25UaXBzID0gdHJ1ZTtcbiAgICAgIHRoaXMuZG93blRpcHNDb250ZW50ID0gJ+e9kee7nOacqui/nuaOpSc7XG4gICAgICB0aGlzLiRhcHBseSgpO1xuICAgICAgcmV0dXJuO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmlzU2hvd0Rvd25UaXBzID0gZmFsc2U7XG4gICAgfVxuICAgIHRoaXMuaXNMb2FkaW5nID0gdHJ1ZTtcbiAgICB0aGlzLmN1cnJlY3RQYWdlKys7XG4gICAgdGhpcy5nZXRCcmllZkRhdGEoJ2JvdHRvbScpO1xuICB9XG4gIC8qKlxuICAgKiDpobbpg6jkuIvmi4nliLfmlrBcbiAgICovXG4gIG9uUHVsbERvd25SZWZyZXNoKCkge1xuICAgIGlmICh0aGlzLmlzTG9hZGluZykgcmV0dXJuO1xuICAgIHRoaXMuaXNMb2FkaW5nID0gdHJ1ZTtcbiAgICBpZiAodGhpcy5zaG93VGlwc1RpbWVyKSB7XG4gICAgICBjbGVhclRpbWVvdXQodGhpcy5zaG93VGlwc1RpbWVyKTtcbiAgICAgIHRoaXMuaXNTaG93VXBUaXBzID0gZmFsc2U7XG4gICAgfVxuICAgIGlmICh0aGlzLnRhZ0lkKSB7XG4gICAgICB0aGlzLnN0YXJ0UGFnZSA9IHRoaXMuY3VycmVjdFBhZ2UgKyAxO1xuICAgICAgaWYgKHRoaXMuc3RhcnRQYWdlID4gMTApIHtcbiAgICAgICAgdGhpcy5zdGFydFBhZ2UgPSAxO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLnJlc2V0U3RhdHVzKCk7XG4gICAgaWYgKHRoaXMudGFnSWQpIHtcbiAgICAgIHRoaXMuY3VycmVjdFBhZ2UgPSB0aGlzLnN0YXJ0UGFnZTtcbiAgICB9XG4gICAgdGhpcy5nZXRCcmllZkRhdGEoJ3VwJyk7XG4gIH1cbiAgb25Mb2FkKHBhcmFtcykge1xuICAgIHdlcHkuZ2V0U3lzdGVtSW5mbyh7XG4gICAgICBzdWNjZXNzOiAocmVzKSA9PiB7XG4gICAgICAgIC8vIOiuoeeul+S4u+S9k+mDqOWIhumrmOW6pizljZXkvY3kuLpweCznlLHkuo7kuLvkvZNweOWSjOW+ruS/oXJweOS5i+mXtOaNoueul+W3ruWvvOiHtOiuvue9rueahFxuICAgICAgICB0aGlzLndpbmRvd0hlaWdodCA9IHJlcy53aW5kb3dIZWlnaHQ7XG4gICAgICAgIHRoaXMuJGFwcGx5KCk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgd2VweS5nZXROZXR3b3JrVHlwZSh7XG4gICAgICBjb21wbGV0ZTogKHJlcykgPT4ge1xuICAgICAgICBpZiAocmVzLm5ldHdvcmtUeXBlKSB7XG4gICAgICAgICAgdGhpcy5uZXR3b3JrVHlwZSA9IHJlcy5uZXR3b3JrVHlwZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLm5ldHdvcmtUeXBlID0gJ25vbmUnO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwYXJhbXMudGFnSWQpIHtcbiAgICAgICAgICB0aGlzLnRhZ0lkID0gcGFyYW1zLnRhZ0lkO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMudGFnSWQgPSAwO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwYXJhbXMudGFnTmFtZSkge1xuICAgICAgICAgIHRoaXMudGFnTmFtZSA9IHBhcmFtcy50YWdOYW1lO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuJGFwcGx5KCk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgd2VweS5vbk5ldHdvcmtTdGF0dXNDaGFuZ2UoKHJlc3VsdCkgPT4ge1xuICAgICAgdGhpcy5uZXR3b3JrVHlwZSA9IHJlc3VsdC5uZXR3b3JrVHlwZTtcbiAgICAgIHRoaXMuJGFwcGx5KCk7XG4gICAgfSk7XG4gIH1cbiAgLy8g5Yqg6L295pWw5o2uXG4gIGdldEJyaWVmRGF0YShzb3VyY2UgPSAncmVmcmFzaCcpIHtcbiAgICBpZiAodGhpcy5uZXR3b3JrVHlwZSA9PT0gJ25vbmUnKSByZXR1cm47XG4gICAgY29uc3Qgb3B0aW9ucyA9IHt9O1xuICAgIG9wdGlvbnMudXJsID0gdGhpcy50YWdJZCA/IFVSTF9BRERSRVNTLkdFVF9SQ01EX0xJU1QgOiBVUkxfQUREUkVTUy5HRVRfRkVFRF9MSVNUO1xuICAgIG9wdGlvbnMuc2lnbiA9IHRydWU7XG4gICAgY29uc3QgX3BhcmFtcyA9IHt9O1xuICAgIF9wYXJhbXMucGFnZSA9IHRoaXMuY3VycmVjdFBhZ2U7XG4gICAgX3BhcmFtcy5jb3VudCA9IDIwO1xuICAgIGlmICh0aGlzLmlzTG9naW4pIHtcbiAgICAgIGNvbnN0IHJlc3VsdCA9IHRoaXMucHNwU2RrLmdldFRva2VuKCk7XG4gICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgIF9wYXJhbXMucHRva2VuID0gcmVzdWx0LnB0b2tlbjtcbiAgICAgICAgX3BhcmFtcy5zdG9rZW4gPSByZXN1bHQuc3Rva2VuO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAodGhpcy50YWdJZCkgX3BhcmFtcy50YWdJZCA9IHRoaXMudGFnSWQ7XG4gICAgY29uc3QgX2ZlZWRQYXJhbSA9IHt9O1xuICAgIF9mZWVkUGFyYW0ubmV0X25hbWUgPSB0aGlzLm5ldHdvcmtUeXBlO1xuICAgIHRyeSB7XG4gICAgICB2YXIgcmVzID0gd2VweS5nZXRTeXN0ZW1JbmZvU3luYygpO1xuICAgICAgX2ZlZWRQYXJhbS5kZXZpY2VfbmFtZSA9IHJlcy5icmFuZDtcbiAgICAgIF9mZWVkUGFyYW0ubGFuZ3VhZ2UgPSByZXMubGFuZ3VhZ2U7XG4gICAgICBfZmVlZFBhcmFtLm9zID0gcmVzLnBsYXRmb3JtO1xuICAgICAgX2ZlZWRQYXJhbS5vc192ZXIgPSByZXMuc3lzdGVtLnNwbGl0KCcgJylbMV07XG4gICAgICBfZmVlZFBhcmFtLnZpcCA9IDBcbiAgICAgIF9mZWVkUGFyYW0udmlwX2xldmVsID0gMDtcbiAgICAgIF9mZWVkUGFyYW0uaWRzID0gJyc7XG4gICAgICBfZmVlZFBhcmFtLnV0ZGlkID0gd2VweS5nZXRTdG9yYWdlU3luYygneW91a3UtdXVpZCcpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIC8vIGVycm9yXG4gICAgfVxuICAgIF9wYXJhbXMuZmVlZFJjbWRQYXJhbSA9IEpTT04uc3RyaW5naWZ5KF9mZWVkUGFyYW0pO1xuICAgIG9wdGlvbnMuZGF0YSA9IF9wYXJhbXM7XG4gICAgb3B0aW9ucy5jYWxsYmFjayA9IChkYXRhKSA9PiB7XG4gICAgICB0aGlzLmdldERhdGFDb21wbGV0ZShkYXRhLCBzb3VyY2UpO1xuICAgIH1cbiAgICByZXF1ZXN0RGF0YShvcHRpb25zKTtcbiAgfVxuICBnZXREYXRhQ29tcGxldGUoZGF0YSwgc291cmNlKSB7XG4gICAgaWYgKGRhdGEucmVzdWx0LmRhdGEgJiYgZGF0YS5yZXN1bHQuZGF0YS5kYXRhICYmIGRhdGEucmVzdWx0LmRhdGEuZGF0YS5saXN0ICYmIGRhdGEucmVzdWx0LmRhdGEuZGF0YS5saXN0Lmxlbmd0aCA+IDApIHtcbiAgICAgIGNvbnN0IGJyaWVmTGlzdCA9IGRhdGEucmVzdWx0LmRhdGEuZGF0YS5saXN0O1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBicmllZkxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3QgZWxlbWVudCA9IGJyaWVmTGlzdFtpXTtcbiAgICAgICAgY29uc3QgX3BhcmFtcyA9IHt9O1xuICAgICAgICAvLyDlpoLmnpzmnKrnmbvpmYZcbiAgICAgICAgZWxlbWVudC5sb2NhbFVwID0gZmFsc2U7XG4gICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgdGhpcy51cExpc3QubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICBpZiAoZWxlbWVudC5kYXRhLmlkTnVtID09PSB0aGlzLnVwTGlzdFtqXS5pZE51bSkge1xuICAgICAgICAgICAgZWxlbWVudC5sb2NhbFVwID0gdHJ1ZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBfcGFyYW1zLnZpZGVvSWQgPSBlbGVtZW50LmRhdGEuaWQ7XG4gICAgICAgIF9wYXJhbXMudGFyZ2V0VXJsID0gJ3lvdWt1Oi8vcGxheSc7XG4gICAgICAgIGVsZW1lbnQub3BlbkFwcFBhcmFtID0gSlNPTi5zdHJpbmdpZnkoX3BhcmFtcyk7XG4gICAgICAgIGVsZW1lbnQucGxheVN0YXR1cyA9ICdpbml0JztcbiAgICAgICAgaWYgKGVsZW1lbnQuZGF0YS5wbGF5Q291bnQpIHtcbiAgICAgICAgICBlbGVtZW50LnBsYXlDb3VudCA9IGZvcm1hdE51bWJlcihlbGVtZW50LmRhdGEucGxheUNvdW50KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZWxlbWVudC5kYXRhLmR1cmF0aW9uKSB7XG4gICAgICAgICAgZWxlbWVudC5kdXJhdGlvbiA9IHNlY29uZHNUb1RpbWUoZWxlbWVudC5kYXRhLmR1cmF0aW9uLCA0KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHNvdXJjZSA9PT0gJ2JvdHRvbScpIHtcbiAgICAgICAgdGhpcy5icmllZkxpc3QgPSB0aGlzLmJyaWVmTGlzdC5jb25jYXQoYnJpZWZMaXN0KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuYnJpZWZMaXN0ID0gYnJpZWZMaXN0O1xuICAgICAgfVxuICAgICAgdGhpcy50b3RhbENvdW50ID0gdGhpcy5icmllZkxpc3QubGVuZ3RoO1xuICAgICAgdGhpcy51cFRpcHNTdGF0dXMgPSAxO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAodGhpcy5icmllZkxpc3QubGVuZ3RoID4gMCkge1xuICAgICAgICB0aGlzLnVwVGlwc1N0YXR1cyA9IDI7XG4gICAgICAgIGlmIChzb3VyY2UgPT09ICd1cCcpIHtcbiAgICAgICAgICBmb3IgKHZhciBrID0gMDsgayA8IHRoaXMuYnJpZWZMaXN0Lmxlbmd0aDsgaysrKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5icmllZkxpc3Rba10ucGxheVN0YXR1cyA9PT0gJ3BsYXlpbmcnKSB7XG4gICAgICAgICAgICAgIHRoaXMuYnJpZWZMaXN0W2tdLnBsYXlTdGF0dXMgPSAnaW5pdCc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnVwVGlwc1N0YXR1cyA9IDM7XG4gICAgICAgIHRoaXMuaXNFcnJvciA9IHRydWU7XG4gICAgICAgIHRoaXMuZXJyb3JUeXBlID0gJ2RhdGFsb2FkZXJyb3InO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoc291cmNlID09PSAndXAnKSB7XG4gICAgICB0aGlzLmlzU2hvd1VwVGlwcyA9IHRydWU7XG4gICAgICB0aGlzLnNob3dUaXBzVGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdGhpcy5pc1Nob3dVcFRpcHMgPSBmYWxzZTtcbiAgICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICAgIH0sIDE1MDApO1xuICAgIH1cbiAgICB3ZXB5LnN0b3BQdWxsRG93blJlZnJlc2goKTtcbiAgICBpZiAodGhpcy5pc0xvYWRpbmcpIHtcbiAgICAgIHRoaXMuaXNMb2FkaW5nID0gZmFsc2U7XG4gICAgfVxuICAgIHRoaXMuJGFwcGx5KCk7XG4gIH1cbiAgLyoqXG4gICAqIOmHjee9ruaVsOaNrueKtuaAgVxuICAgKi9cbiAgcmVzZXRTdGF0dXMoKSB7XG4gICAgaWYgKHRoaXMubmV0d29ya1R5cGUgPT09ICdub25lJykge1xuICAgICAgdGhpcy5pc0xvYWRpbmcgPSBmYWxzZTtcbiAgICAgIHdlcHkuc3RvcFB1bGxEb3duUmVmcmVzaCgpO1xuICAgICAgdGhpcy5pc0Vycm9yID0gdHJ1ZTtcbiAgICAgIHRoaXMuZXJyb3JUeXBlID0gJ25vbmV0d29yayc7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuaXNFcnJvciA9IGZhbHNlO1xuICAgIH1cbiAgICBpZiAod2VweS5wYWdlU2Nyb2xsVG8gJiYgdGhpcy5wYWdlU2Nyb2xsVG9wID4gMCkge1xuICAgICAgd2VweS5wYWdlU2Nyb2xsVG8oe1xuICAgICAgICBzY3JvbGxUb3A6IDBcbiAgICAgIH0pXG4gICAgfVxuICAgIHRoaXMuaXNQbGF5ZXJVbkxvYWQgPSB0cnVlO1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5pc1BsYXllclVuTG9hZCA9IGZhbHNlO1xuICAgIH0sIDEwMDApO1xuICAgIHRoaXMuY3VycmVjdElkID0gLTE7XG4gICAgdGhpcy5pc1ZpZGVvUGxheWluZyA9IGZhbHNlO1xuICAgIHRoaXMuaXNTaG93RG93blRpcHMgPSBmYWxzZTtcbiAgICB0aGlzLmN1cnJlY3RQYWdlID0gMTtcbiAgICB0aGlzLiRhcHBseSgpO1xuICB9XG4gIC8qKlxuICAgKiDlj5HpgIHpobXpnaLpu4Tph5Hku6Tnrq1wdlxuICAgKi9cbiAgc2VuZExvZygpIHtcbiAgICBjb25zdCBfZGF0YSA9IHt9O1xuICAgIGNvbnN0IF9zcG1Db25maWcgPSBERUZBVUxUX0RBVEEuU1BNX0NPTkZJR1t0aGlzLnBhZ2VJZF07XG4gICAgX2RhdGEudGl0bGUgPSAn5LyY6YW355+t6KeG6aKRJztcbiAgICBfZGF0YS51cmwgPSBfc3BtQ29uZmlnLnBhZ2U7XG4gICAgX2RhdGEuc3BtID0gYCR7X3NwbUNvbmZpZy5zcG19LjAuMGA7XG4gICAgc2VuZEdvbGRMb2coX2RhdGEpO1xuICB9XG4gIG9uU2hvdygpIHtcbiAgICB0aGlzLnBzcFNkayA9IHdlcHkuJGluc3RhbmNlLnBzcFNkaztcbiAgICB0aGlzLmlzU2hvdyA9IHRydWU7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLmlzU2hvdyA9IGZhbHNlO1xuICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICB9LCAzMDAwKTtcbiAgICAvLyDojrflj5bngrnotZ7mlbDnm65cbiAgICBpZiAod2VweS5nZXRTdG9yYWdlU3luYygneW91a3UtdXBMaXN0JykpIHtcbiAgICAgIGNvbnN0IHVwTGlzdCA9IHdlcHkuZ2V0U3RvcmFnZVN5bmMoJ3lvdWt1LXVwTGlzdCcpO1xuICAgICAgdHJ5IHtcbiAgICAgICAgdGhpcy51cExpc3QgPSBKU09OLnBhcnNlKHVwTGlzdCk7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGUpO1xuICAgICAgfVxuICAgIH1cbiAgICAvLyDmmL7npLrnmoTml7blgJnph43nva7mnKzlnLDngrnotZ7nirbmgIFcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuYnJpZWZMaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICB0aGlzLmJyaWVmTGlzdFtpXS5sb2NhbFVwID0gZmFsc2U7XG4gICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHRoaXMudXBMaXN0Lmxlbmd0aDsgaisrKSB7XG4gICAgICAgIGlmICh0aGlzLmJyaWVmTGlzdFtpXS5kYXRhLmlkTnVtID09PSB0aGlzLnVwTGlzdFtqXS5pZE51bSkge1xuICAgICAgICAgIHRoaXMuYnJpZWZMaXN0W2ldLmxvY2FsVXAgPSB0cnVlO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMucHNwU2RrLmNoZWNrTG9naW4oe1xuICAgICAgc3VjY2VzczogKGlzTG9naW4pID0+IHtcbiAgICAgICAgaWYgKGlzTG9naW4pIHtcbiAgICAgICAgICB0aGlzLmlzTG9naW4gPSB0cnVlO1xuICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgICB0aGlzLnNlbmRMb2coKTtcbiAgICB0aGlzLiRhcHBseSgpO1xuICB9XG4gIG9uSGlkZSgpIHtcbiAgICAvLyBtYXJrIHRvZG8g5omL5Yqo5YGc5q2i5pKt5pS+6KeG6aKRXG4gICAgaWYgKCF0aGlzLnBhdXNlKSB7XG4gICAgICB0aGlzLnBhdXNlID0gdHJ1ZTtcbiAgICB9XG4gICAgdGhpcy4kYXBwbHkoKTtcbiAgfVxuICAvLyDliIbkuqtcbiAgb25TaGFyZUFwcE1lc3NhZ2Uob3B0aW9ucykge1xuICAgIGxldCB0aXRsZSA9ICfkvJjphbfnn63op4bpopEnO1xuICAgIGxldCBzaGFyZUltYWdlID0gbnVsbDtcbiAgICBsZXQgcGF0aCA9ICcvcGFnZXMvYnJpZWYvYnJpZWYnO1xuICAgIGlmIChvcHRpb25zLnRhcmdldCAmJiBvcHRpb25zLnRhcmdldC5kYXRhc2V0KSB7XG4gICAgICBjb25zdCBkYXRhID0gb3B0aW9ucy50YXJnZXQuZGF0YXNldC5pdGVtO1xuICAgICAgdGl0bGUgPSBkYXRhLmRhdGEudGl0bGU7XG4gICAgICBpZiAoZGF0YS5kYXRhLnRodW1ibmFpbCkge1xuICAgICAgICBzaGFyZUltYWdlID0gYCR7VVJMX0FERFJFU1MuU0hBUkVfSU1BR0V9P3VybD0ke2RhdGEuZGF0YS50aHVtYm5haWx9YDtcbiAgICAgIH1cbiAgICAgIGNvbnN0IG9iaiA9IHt9O1xuICAgICAgY29uc3QgX3NwbUNvbmZpZyA9IERFRkFVTFRfREFUQS5TUE1fQ09ORklHW3RoaXMucGFnZUlkXTtcbiAgICAgIG9iai5zb3VyY2UgPSBfc3BtQ29uZmlnLnBhZ2U7XG4gICAgICBvYmouc3BtID0gX3NwbUNvbmZpZy5zcG07XG4gICAgICBvYmoudmlkZW9JZCA9IGRhdGEuZGF0YS5pZDtcbiAgICAgIGxldCBwYXJhbXMgPSAnJztcbiAgICAgIGZvciAodmFyIGtleSBpbiBvYmopIHtcbiAgICAgICAgcGFyYW1zICs9ICcmJyArIGtleSArICc9JyArIGVuY29kZVVSSUNvbXBvbmVudChvYmpba2V5XSk7XG4gICAgICB9XG4gICAgICBwYXJhbXMgPSBwYXJhbXMuc3Vic3RyaW5nKDEsIHBhcmFtcy5sZW5ndGgpO1xuICAgICAgcGF0aCA9IGBwYWdlcy9wbGF5L3BsYXk/JHtwYXJhbXN9YDtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgZGF0YSA9IHRoaXMuYnJpZWZMaXN0WzBdO1xuICAgICAgaWYgKGRhdGEuZGF0YS50aHVtYm5haWwpIHtcbiAgICAgICAgc2hhcmVJbWFnZSA9IGAke1VSTF9BRERSRVNTLlNIQVJFX0lNQUdFfT91cmw9JHtkYXRhLmRhdGEudGh1bWJuYWlsfWA7XG4gICAgICB9XG4gICAgfVxuICAgIHNlbmRFdmVudExvZyh7ZXZlbnRDb2RlOiAnMDAwMDcnfSk7XG4gICAgcmV0dXJuIHtcbiAgICAgIHRpdGxlOiB0aXRsZSxcbiAgICAgIHBhdGg6IHBhdGgsXG4gICAgICBpbWFnZVVybDogc2hhcmVJbWFnZSxcbiAgICAgIHN1Y2Nlc3M6IChyZXMpID0+IHtcbiAgICAgICAgaWYgKHJlcy5lcnJNc2cgPT09ICdzaGFyZUFwcE1lc3NhZ2U6b2snKSB7XG4gICAgICAgICAgc2VuZEV2ZW50TG9nKHtldmVudENvZGU6ICcwMDAwOCd9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG4gIH1cbn1cbiJdfQ==