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

var Brief = function(_wepy$page) {
    _inherits(Brief, _wepy$page);
    function Brief() {
        var _ref;
        var _temp, _this, _ret;
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }
        _classCallCheck(this, Brief);
        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Brief.__proto__ || Object.getPrototypeOf(Brief)).call.apply(_ref, [ this ].concat(args))), 
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
    _createClass(Brief, [ {
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
    return Brief;
}(_wepy2.default.page);

Page(require("./../../npm/wepy/lib/wepy.js").default.$createPage(Brief, "pages/brief/brief"));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJyaWVmLmpzIl0sIm5hbWVzIjpbIkJyaWVmIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImVuYWJsZVB1bGxEb3duUmVmcmVzaCIsImJhY2tncm91bmRUZXh0U3R5bGUiLCJkYXRhIiwicGFnZUlkIiwiaXNTaG93IiwiYWxsb3dVc2VSZWNvcmQiLCJpc0Vycm9yIiwiaXNMb2FkaW5nIiwic2hvd1RpcHNUaW1lciIsImlzU2hvd0Rvd25UaXBzIiwiZG93blRpcHNDb250ZW50IiwiaXNWaWRlb1BsYXlpbmciLCJlcnJvclR5cGUiLCJicmllZkxpc3QiLCJjdXJyZWN0UGFnZSIsInN0YXJ0UGFnZSIsInBhZ2VTY3JvbGxUb3AiLCJ3aW5kb3dIZWlnaHQiLCJ0b3RhbENvdW50IiwiaXNTaG93VXBUaXBzIiwidXBUaXBzU3RhdHVzIiwidGFnSWQiLCJ0YWdOYW1lIiwicHNwU2RrIiwiaXNMb2dpbiIsInVwTGlzdCIsImlzUGxheWVyVW5Mb2FkIiwiY3VycmVjdElkIiwicGF1c2UiLCJ2aWQiLCJjb3ZlclVSTCIsImV2ZW50cyIsIiRldmVudCIsInJlc2V0U3RhdHVzIiwiZ2V0QnJpZWZEYXRhIiwicGxheVN0YXR1cyIsIiRhcHBseSIsIm9uUmVhY2hCb3R0b20iLCJzZXRUaW1lb3V0IiwibWV0aG9kcyIsImNsaWNrVXBIYW5kbGVyIiwiaW5kZXgiLCJfaXRlbSIsIl90eXBlIiwibG9jYWxVcCIsImkiLCJsZW5ndGgiLCJpZE51bSIsInNwbGljZSIsInBvcCIsInRpbWVzdGFtcCIsIkRhdGUiLCJnZXRUaW1lIiwiZXZlbnRDb2RlIiwibmV0d29ya1R5cGUiLCJvcHRpb25zIiwidXJsIiwiVklERU9fUFJBSVNFIiwic2lnbiIsIl9wYXJhbXMiLCJ0eXBlIiwiaWQiLCJyZXN1bHQiLCJnZXRUb2tlbiIsInB0b2tlbiIsInN0b2tlbiIsImNhbGxiYWNrIiwiY2xpY2tCcmllZkhhbmRsZXIiLCJjdXJyZWN0U3RhdHVzIiwiY2xpY2tTaG93SGFuZGxlciIsInNob3dJZCIsIm9iaiIsIl9zcG1Db25maWciLCJTUE1fQ09ORklHIiwic291cmNlIiwicGFnZSIsInNwbSIsInBhcmFtcyIsImtleSIsImVuY29kZVVSSUNvbXBvbmVudCIsInN1YnN0cmluZyIsIm5hdmlnYXRlVG8iLCJjbGlja1RhZ3NIYW5kbGVyIiwibGF1bmNoQXBwRXJyb3IiLCJlIiwic2hvd01vZGFsIiwidGl0bGUiLCJjb250ZW50Iiwic2hvd0NhbmNlbCIsIiRyZXBlYXQiLCIkcHJvcHMiLCIkZXZlbnRzIiwiY29tcG9uZW50cyIsImxpbmUiLCJwbGF5bG9hZGluZyIsImRhdGFlcnJvciIsInlvdWt1cGxheWVyIiwid2F0Y2giLCJuZXdWYWx1ZSIsIm9sZFZhbHVlIiwic2V0TmF2aWdhdGlvbkJhclRpdGxlIiwic2V0U3RvcmFnZVN5bmMiLCJKU09OIiwic3RyaW5naWZ5Iiwic2Nyb2xsVG9wTnVtIiwiYm90dG9tTnVtIiwicGFnZVNjcm9sbFRvIiwic2Nyb2xsVG9wIiwidGh1bWJuYWlsIiwiY2xlYXJUaW1lb3V0IiwiZ2V0U3lzdGVtSW5mbyIsInN1Y2Nlc3MiLCJyZXMiLCJnZXROZXR3b3JrVHlwZSIsImNvbXBsZXRlIiwib25OZXR3b3JrU3RhdHVzQ2hhbmdlIiwiR0VUX1JDTURfTElTVCIsIkdFVF9GRUVEX0xJU1QiLCJjb3VudCIsIl9mZWVkUGFyYW0iLCJuZXRfbmFtZSIsImdldFN5c3RlbUluZm9TeW5jIiwiZGV2aWNlX25hbWUiLCJicmFuZCIsImxhbmd1YWdlIiwib3MiLCJwbGF0Zm9ybSIsIm9zX3ZlciIsInN5c3RlbSIsInNwbGl0IiwidmlwIiwidmlwX2xldmVsIiwiaWRzIiwidXRkaWQiLCJnZXRTdG9yYWdlU3luYyIsImZlZWRSY21kUGFyYW0iLCJnZXREYXRhQ29tcGxldGUiLCJsaXN0IiwiZWxlbWVudCIsImoiLCJ2aWRlb0lkIiwidGFyZ2V0VXJsIiwib3BlbkFwcFBhcmFtIiwicGxheUNvdW50IiwiZHVyYXRpb24iLCJjb25jYXQiLCJrIiwic3RvcFB1bGxEb3duUmVmcmVzaCIsIl9kYXRhIiwiJGluc3RhbmNlIiwicGFyc2UiLCJjb25zb2xlIiwibG9nIiwiY2hlY2tMb2dpbiIsInNlbmRMb2ciLCJzaGFyZUltYWdlIiwicGF0aCIsInRhcmdldCIsImRhdGFzZXQiLCJpdGVtIiwiU0hBUkVfSU1BR0UiLCJpbWFnZVVybCIsImVyck1zZyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7SUFDcUJBLEs7Ozs7Ozs7Ozs7Ozs7O29MQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QixNQURqQjtBQUVQQyw2QkFBdUIsSUFGaEI7QUFHUEMsMkJBQXFCO0FBSGQsSyxRQUtUQyxJLEdBQU87QUFDTEMsY0FBUSxPQURIO0FBRUxDLGNBQVEsS0FGSDtBQUdMQyxzQkFBZ0IsS0FIWDtBQUlMO0FBQ0FDLGVBQVMsS0FMSjtBQU1MO0FBQ0FDLGlCQUFXLEtBUE47QUFRTDtBQUNBQyxxQkFBZSxDQVRWO0FBVUw7QUFDQUMsc0JBQWdCLEtBWFg7QUFZTEMsdUJBQWlCLEVBWlo7QUFhTDtBQUNBQyxzQkFBZ0IsS0FkWDtBQWVMO0FBQ0FDLGlCQUFXLEVBaEJOO0FBaUJMO0FBQ0FDLGlCQUFXLEVBbEJOO0FBbUJMO0FBQ0FDLG1CQUFhLENBcEJSO0FBcUJMO0FBQ0FDLGlCQUFXLENBdEJOO0FBdUJMO0FBQ0FDLHFCQUFlLENBeEJWO0FBeUJMO0FBQ0FDLG9CQUFjLENBMUJUO0FBMkJMO0FBQ0FDLGtCQUFZLENBNUJQO0FBNkJMO0FBQ0FDLG9CQUFjLEtBOUJUO0FBK0JMO0FBQ0FDLG9CQUFjLENBaENUO0FBaUNMO0FBQ0FDLGFBQU8sQ0FBQyxDQWxDSDtBQW1DTEMsZUFBUyxFQW5DSjtBQW9DTDtBQUNBQyxjQUFRLElBckNIO0FBc0NMO0FBQ0FDLGVBQVMsS0F2Q0o7QUF3Q0w7QUFDQUMsY0FBUSxFQXpDSDtBQTBDTDtBQUNBQyxzQkFBZ0IsS0EzQ1g7QUE0Q0xDLGlC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QkFBbkI5RSxLIiwiZmlsZSI6ImJyaWVmLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcbmltcG9ydCB7VVJMX0FERFJFU1MsIHJlcXVlc3REYXRhLCBzZW5kR29sZExvZywgc2VuZEV2ZW50TG9nfSBmcm9tICdAL0FQSS8nO1xuaW1wb3J0IFlvdWt1UGxheWVyIGZyb20gJ0AvY29tcG9uZW50cy9wbGF5ZXIveW91a3VQbGF5ZXInO1xuaW1wb3J0IERhdGFFcnJvciBmcm9tICdAL2NvbXBvbmVudHMvY29tbW9uL2RhdGFFcnJvcic7XG5pbXBvcnQgUGxheUxvYWRpbmcgZnJvbSAnQC9jb21wb25lbnRzL2NvbW1vbi9wbGF5TG9hZGluZyc7XG5pbXBvcnQgbGluZSBmcm9tICdAL2NvbXBvbmVudHMvaW5kZXgvbGluZSc7XG5pbXBvcnQgREVGQVVMVF9EQVRBIGZyb20gJ0AvY29uZmlnL2RlZmF1bHQtZGF0YSc7XG5pbXBvcnQgeyBmb3JtYXROdW1iZXIsIHNlY29uZHNUb1RpbWUgfSBmcm9tICdAL3V0aWxzL3V0aWwnO1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQnJpZWYgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICBjb25maWcgPSB7XG4gICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+S8mOmFt+inhumikScsXG4gICAgZW5hYmxlUHVsbERvd25SZWZyZXNoOiB0cnVlLFxuICAgIGJhY2tncm91bmRUZXh0U3R5bGU6ICdkYXJrJ1xuICB9O1xuICBkYXRhID0ge1xuICAgIHBhZ2VJZDogJ2JyaWVmJyxcbiAgICBpc1Nob3c6IGZhbHNlLFxuICAgIGFsbG93VXNlUmVjb3JkOiBmYWxzZSxcbiAgICAvLyDmmK/lkKblh7rplJlcbiAgICBpc0Vycm9yOiBmYWxzZSxcbiAgICAvLyDmmK/lkKbmlbDmja7liqDovb3kuK1cbiAgICBpc0xvYWRpbmc6IGZhbHNlLFxuICAgIC8vIOWAkuiuoeaXtlxuICAgIHNob3dUaXBzVGltZXI6IDAsXG4gICAgLy8g5pi+56S65bqV6YOo5peg5YaF5a655pu05pawXG4gICAgaXNTaG93RG93blRpcHM6IGZhbHNlLFxuICAgIGRvd25UaXBzQ29udGVudDogJycsXG4gICAgLy8g6KeG6aKR5piv5ZCm5pKt5pS+XG4gICAgaXNWaWRlb1BsYXlpbmc6IGZhbHNlLFxuICAgIC8vIOmUmeivr+exu+Wei1xuICAgIGVycm9yVHlwZTogJycsXG4gICAgLy8g6KeG6aKR5YiX6KGoXG4gICAgYnJpZWZMaXN0OiBbXSxcbiAgICAvLyDlvZPliY3pobVcbiAgICBjdXJyZWN0UGFnZTogMSxcbiAgICAvLyDlvIDlp4vpobXpnaJcbiAgICBzdGFydFBhZ2U6IDEsXG4gICAgLy8g5b2T5YmN6aG16Z2i5rua5Yqo5L2N572uXG4gICAgcGFnZVNjcm9sbFRvcDogMCxcbiAgICAvLyDlsY/luZXpq5jluqZcbiAgICB3aW5kb3dIZWlnaHQ6IDAsXG4gICAgLy8g5pu05paw5p2h5pWwXG4gICAgdG90YWxDb3VudDogMCxcbiAgICAvLyDmmK/lkKbmmL7npLrpobbpg6jmj5DnpLpcbiAgICBpc1Nob3dVcFRpcHM6IGZhbHNlLFxuICAgIC8vIOmhtumDqOaPkOekuueKtuaAgVxuICAgIHVwVGlwc1N0YXR1czogMCxcbiAgICAvLyDmoIfnrb5cbiAgICB0YWdJZDogLTEsXG4gICAgdGFnTmFtZTogJycsXG4gICAgLy8gcGFzc3BvcnQgU0RLXG4gICAgcHNwU2RrOiBudWxsLFxuICAgIC8vIOeUqOaIt+aYr+WQpueZu+W9lVxuICAgIGlzTG9naW46IGZhbHNlLFxuICAgIC8vIOeCuei1nuinhumikeWIl+ihqFxuICAgIHVwTGlzdDogW10sXG4gICAgLy8g5pKt5pS+5Zmo55u45YWz77ya5b2T5YmN5pKt5pS+6KeG6aKR57Si5byVLGlkLOWwgemdou+8jOaaguWBnO+8jOWFqOWxj1xuICAgIGlzUGxheWVyVW5Mb2FkOiBmYWxzZSxcbiAgICBjdXJyZWN0SWQ6IC0xLFxuICAgIHBhdXNlOiBmYWxzZSxcbiAgICB2aWQ6ICcnLFxuICAgIGNvdmVyVVJMOiAnJ1xuICB9O1xuICBldmVudHMgPSB7XG4gICAgJ1JFRlJBU0gnOiAoJGV2ZW50LCAuLi5hcmdzKSA9PiB7XG4gICAgICB0aGlzLnJlc2V0U3RhdHVzKCk7XG4gICAgICB0aGlzLmdldEJyaWVmRGF0YSgncmVmcmFzaCcpO1xuICAgIH0sXG4gICAgJ1BMQVlFUlBMQVlFTkQnOiAoZGF0YSkgPT4ge1xuICAgICAgLy8g5pKt5pS+57uT5p2fIOaSreaUvuS4i+S4gOS4qlxuICAgICAgdGhpcy5icmllZkxpc3RbdGhpcy5jdXJyZWN0SWRdLnBsYXlTdGF0dXMgPSAnY29tcGxldGUnO1xuICAgICAgdGhpcy5pc1ZpZGVvUGxheWluZyA9IGZhbHNlO1xuICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICAgIGlmICgodGhpcy5jdXJyZWN0SWQgKyAyKSA9PT0gdGhpcy50b3RhbENvdW50KSB7XG4gICAgICAgIHRoaXMub25SZWFjaEJvdHRvbSgpO1xuICAgICAgfVxuICAgICAgaWYgKCh0aGlzLmN1cnJlY3RJZCArIDEpIDwgdGhpcy50b3RhbENvdW50KSB7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIHRoaXMuY3VycmVjdElkKys7XG4gICAgICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICAgICAgfSwgNTAwKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG4gIG1ldGhvZHMgPSB7XG4gICAgLyoqXG4gICAgICog54K56LWeXG4gICAgICovXG4gICAgY2xpY2tVcEhhbmRsZXIoaW5kZXgpIHtcbiAgICAgIGNvbnN0IF9pdGVtID0gdGhpcy5icmllZkxpc3RbaW5kZXhdO1xuICAgICAgLy8g6Ziy5q2idmlld+a4suafk+aFoueahOmXrumimO+8jOWPquS9v+eUqGluZGV4IOiHquWKqOWPlml0ZW3mlbDmja5cbiAgICAgIGxldCBfdHlwZSA9ICdjYW5jZWwnO1xuICAgICAgaWYgKF9pdGVtLmxvY2FsVXApIHtcbiAgICAgICAgX2l0ZW0ubG9jYWxVcCA9IGZhbHNlO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy51cExpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBpZiAodGhpcy51cExpc3RbaV0uaWROdW0gPT09IF9pdGVtLmRhdGEuaWROdW0pIHtcbiAgICAgICAgICAgIHRoaXMudXBMaXN0LnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgX3R5cGUgPSAnYWRkJztcbiAgICAgICAgX2l0ZW0ubG9jYWxVcCA9IHRydWU7XG4gICAgICAgIGlmICh0aGlzLnVwTGlzdC5sZW5ndGggPiA5OSkge1xuICAgICAgICAgIHRoaXMudXBMaXN0LnBvcCgpO1xuICAgICAgICB9XG4gICAgICAgIF9pdGVtLmRhdGEudGltZXN0YW1wID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgICAgIHRoaXMudXBMaXN0LnNwbGljZSgwLCAwLCBfaXRlbS5kYXRhKTtcbiAgICAgIH1cbiAgICAgIHNlbmRFdmVudExvZyh7ZXZlbnRDb2RlOiAnMDAwMDYnfSk7XG4gICAgICB0aGlzLmJyaWVmTGlzdFtpbmRleF0gPSBfaXRlbTtcbiAgICAgIGlmICh0aGlzLmlzTG9naW4pIHtcbiAgICAgICAgLy8g5Y+R6YCB5pyN5Yqh56uvXG4gICAgICAgIGlmICh0aGlzLm5ldHdvcmtUeXBlID09PSAnbm9uZScpIHJldHVybjtcbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHt9O1xuICAgICAgICBvcHRpb25zLnVybCA9IFVSTF9BRERSRVNTLlZJREVPX1BSQUlTRTtcbiAgICAgICAgb3B0aW9ucy5zaWduID0gdHJ1ZTtcbiAgICAgICAgY29uc3QgX3BhcmFtcyA9IHt9O1xuICAgICAgICBfcGFyYW1zLnR5cGUgPSBfdHlwZTtcbiAgICAgICAgX3BhcmFtcy52aWQgPSBfaXRlbS5kYXRhLmlkO1xuICAgICAgICBjb25zdCByZXN1bHQgPSB0aGlzLnBzcFNkay5nZXRUb2tlbigpO1xuICAgICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgICAgX3BhcmFtcy5wdG9rZW4gPSByZXN1bHQucHRva2VuO1xuICAgICAgICAgIF9wYXJhbXMuc3Rva2VuID0gcmVzdWx0LnN0b2tlbjtcbiAgICAgICAgfVxuICAgICAgICBvcHRpb25zLmRhdGEgPSBfcGFyYW1zO1xuICAgICAgICBvcHRpb25zLmNhbGxiYWNrID0gKGRhdGEpID0+IHtcblxuICAgICAgICB9XG4gICAgICAgIHJlcXVlc3REYXRhKG9wdGlvbnMpO1xuICAgICAgfVxuICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICB9LFxuICAgIC8qKlxuICAgICAqIOeCueWHu+aSreaUvlxuICAgICAqL1xuICAgIGNsaWNrQnJpZWZIYW5kbGVyKGN1cnJlY3RTdGF0dXMsIGRhdGEsIGluZGV4KSB7XG4gICAgICBpZiAoY3VycmVjdFN0YXR1cyA9PT0gJ2luaXQnKSB7XG4gICAgICAgIHRoaXMuaXNWaWRlb1BsYXlpbmcgPSBmYWxzZTtcblxuICAgICAgICBzZW5kRXZlbnRMb2coe2V2ZW50Q29kZTogJzAwMDA1J30pO1xuICAgICAgICB0aGlzLmN1cnJlY3RJZCA9IGluZGV4O1xuICAgICAgICB0aGlzLiRhcHBseSgpO1xuICAgICAgfVxuICAgIH0sXG4gICAgLyoqXG4gICAgICog5Ymn6ZuG5pKt5pS+XG4gICAgICovXG4gICAgY2xpY2tTaG93SGFuZGxlcihkYXRhKSB7XG4gICAgICBjb25zdCBzaG93SWQgPSBkYXRhLmRhdGEuc2hvd0lkO1xuICAgICAgaWYgKCFzaG93SWQpIHJldHVybjtcbiAgICAgIGNvbnN0IG9iaiA9IHt9O1xuICAgICAgY29uc3QgX3NwbUNvbmZpZyA9IERFRkFVTFRfREFUQS5TUE1fQ09ORklHW3RoaXMucGFnZUlkXTtcblxuICAgICAgb2JqLnNvdXJjZSA9IF9zcG1Db25maWcucGFnZTtcbiAgICAgIG9iai5zcG0gPSBfc3BtQ29uZmlnLnNwbSArICcuMC4wJztcblxuICAgICAgb2JqLnNob3dJZCA9IHNob3dJZDtcbiAgICAgIGxldCBwYXJhbXMgPSAnJztcbiAgICAgIGZvciAodmFyIGtleSBpbiBvYmopIHtcbiAgICAgICAgcGFyYW1zICs9ICcmJyArIGtleSArICc9JyArIGVuY29kZVVSSUNvbXBvbmVudChvYmpba2V5XSk7XG4gICAgICB9XG4gICAgICBwYXJhbXMgPSBwYXJhbXMuc3Vic3RyaW5nKDEsIHBhcmFtcy5sZW5ndGgpO1xuICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgdXJsOiBgL3BhZ2VzL3BsYXkvcGxheT8ke3BhcmFtc31gXG4gICAgICB9KTtcbiAgICB9LFxuICAgIC8qKlxuICAgICAqIOagh+etvuiBmuWQiOmhtVxuICAgICAqL1xuICAgIGNsaWNrVGFnc0hhbmRsZXIodGFnSWQsIHRhZ05hbWUpIHtcbiAgICAgIGlmICh0aGlzLnRhZ0lkICE9PSAwKSB7XG4gICAgICAgIHRoaXMudGFnSWQgPSB0YWdJZDtcbiAgICAgICAgdGhpcy50YWdOYW1lID0gdGFnTmFtZTtcbiAgICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgdXJsOiBgL3BhZ2VzL2JyaWVmL2JyaWVmVGFncz90YWdJZD0ke3RhZ0lkfSZ0YWdOYW1lPSR7dGFnTmFtZX1gXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0sXG4gICAgbGF1bmNoQXBwRXJyb3IoZSkge1xuICAgICAgd2VweS5zaG93TW9kYWwoe1xuICAgICAgICB0aXRsZTogJycsXG4gICAgICAgIGNvbnRlbnQ6ICfnlLHkuo7lubPlj7DpmZDliLbvvIzmgqjpnIDopoHmiYvliqjmiZPlvIDkvJjphbdBcHDop4LnnIvlrozmlbTniYgnLFxuICAgICAgICBzaG93Q2FuY2VsOiBmYWxzZVxuICAgICAgfSk7XG4gICAgfVxuICB9O1xuICRyZXBlYXQgPSB7XCJicmllZkxpc3RcIjp7XCJjb21cIjpcImxpbmVcIixcInByb3BzXCI6XCJcIn19O1xyXG4kcHJvcHMgPSB7XCJkYXRhZXJyb3JcIjp7XCJ4bWxuczp2LWJpbmRcIjpcIlwiLFwidi1iaW5kOmVycm9yVHlwZS5zeW5jXCI6XCJlcnJvclR5cGVcIn0sXCJ5b3VrdXBsYXllclwiOntcInYtYmluZDppc1Nob3cuc3luY1wiOlwiaXNTaG93XCIsXCJ2LWJpbmQ6dmlkLnN5bmNcIjpcInZpZFwiLFwidi1iaW5kOmNvdmVyVVJMLnN5bmNcIjpcImNvdmVyVVJMXCIsXCJ2LWJpbmQ6aXNVbkxvYWQuc3luY1wiOlwiaXNQbGF5ZXJVbkxvYWRcIixcInYtYmluZDpwYXVzZS5zeW5jXCI6XCJwYXVzZVwiLFwidi1iaW5kOnNvdXJjZS5zeW5jXCI6XCJwYWdlSWRcIixcInYtYmluZDphbGxvd1VzZVJlY29yZC5zeW5jXCI6XCJhbGxvd1VzZVJlY29yZFwifX07XHJcbiRldmVudHMgPSB7fTtcclxuIGNvbXBvbmVudHMgPSB7XG4gICAgbGluZTogbGluZSxcbiAgICBwbGF5bG9hZGluZzogUGxheUxvYWRpbmcsXG4gICAgZGF0YWVycm9yOiBEYXRhRXJyb3IsXG4gICAgeW91a3VwbGF5ZXI6IFlvdWt1UGxheWVyXG4gIH07XG4gIHdhdGNoID0ge1xuICAgIHRhZ0lkKG5ld1ZhbHVlLCBvbGRWYWx1ZSkge1xuICAgICAgaWYgKG5ld1ZhbHVlICE9PSBvbGRWYWx1ZSkge1xuICAgICAgICB0aGlzLnJlc2V0U3RhdHVzKCk7XG4gICAgICAgIHRoaXMuZ2V0QnJpZWZEYXRhKCd0YWdpZCcpO1xuICAgICAgfVxuICAgIH0sXG4gICAgdGFnTmFtZShuZXdWYWx1ZSkge1xuICAgICAgd2VweS5zZXROYXZpZ2F0aW9uQmFyVGl0bGUoe1xuICAgICAgICB0aXRsZTogbmV3VmFsdWVcbiAgICAgIH0pO1xuICAgIH0sXG4gICAgdXBMaXN0KG5ld1ZhbHVlKSB7XG4gICAgICB3ZXB5LnNldFN0b3JhZ2VTeW5jKCd5b3VrdS11cExpc3QnLCBKU09OLnN0cmluZ2lmeShuZXdWYWx1ZSkpO1xuICAgIH0sXG4gICAgY3VycmVjdElkKG5ld1ZhbHVlLCBvbGRWYWx1ZSkge1xuICAgICAgaWYgKG5ld1ZhbHVlID09PSBvbGRWYWx1ZSB8fCBuZXdWYWx1ZSA9PT0gLTEpIHJldHVybjtcbiAgICAgIC8vIOWIpOaWrea7muWKqOS9jee9rlxuICAgICAgY29uc3Qgc2Nyb2xsVG9wTnVtID0gbmV3VmFsdWUgKiAyNzU7XG4gICAgICBpZiAoc2Nyb2xsVG9wTnVtID4gKHRoaXMucGFnZVNjcm9sbFRvcCArIHRoaXMud2luZG93SGVpZ2h0IC0gMjIwKSB8fCBzY3JvbGxUb3BOdW0gPCB0aGlzLnBhZ2VTY3JvbGxUb3ApIHtcbiAgICAgICAgY29uc3QgYm90dG9tTnVtID0gc2Nyb2xsVG9wTnVtIC0gMjE1O1xuICAgICAgICB3ZXB5LnBhZ2VTY3JvbGxUbyh7XG4gICAgICAgICAgc2Nyb2xsVG9wOiBib3R0b21OdW1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5pc1Nob3dVcFRpcHMpIHtcbiAgICAgICAgdGhpcy5pc1Nob3dVcFRpcHMgPSBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5icmllZkxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKHRoaXMuYnJpZWZMaXN0W2ldLnBsYXlTdGF0dXMgPT09ICdwbGF5aW5nJykge1xuICAgICAgICAgIHRoaXMuYnJpZWZMaXN0W2ldLnBsYXlTdGF0dXMgPSAnaW5pdCc7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHRoaXMuYnJpZWZMaXN0W25ld1ZhbHVlXS5wbGF5U3RhdHVzID0gJ3BsYXlpbmcnO1xuICAgICAgdGhpcy52aWQgPSB0aGlzLmJyaWVmTGlzdFtuZXdWYWx1ZV0uZGF0YS5pZDtcbiAgICAgIHRoaXMuY292ZXJVUkwgPSB0aGlzLmJyaWVmTGlzdFtuZXdWYWx1ZV0uZGF0YS50aHVtYm5haWw7XG4gICAgICB0aGlzLmlzVmlkZW9QbGF5aW5nID0gdHJ1ZTtcbiAgICAgIHRoaXMuJGFwcGx5KCk7XG4gICAgfVxuICB9O1xuICAvKipcbiAgICog6I635Y+W5rua5Yqo5p2h5b2T5YmN5L2N572uXG4gICAqL1xuICBvblBhZ2VTY3JvbGwoZSkge1xuICAgIHRoaXMucGFnZVNjcm9sbFRvcCA9IGUuc2Nyb2xsVG9wO1xuICAgIHRoaXMuJGFwcGx5KCk7XG4gIH07XG4gIC8qKlxuICAgKiDlupXpg6jliqDovb3mm7TlpJpcbiAgICovXG4gIG9uUmVhY2hCb3R0b20oKSB7XG4gICAgaWYgKHRoaXMuaXNMb2FkaW5nKSByZXR1cm47XG4gICAgaWYgKHRoaXMuY3VycmVjdFBhZ2UgPiB0aGlzLnN0YXJ0UGFnZSArIDgpIHtcbiAgICAgIHRoaXMuaXNTaG93RG93blRpcHMgPSB0cnVlO1xuICAgICAgdGhpcy5kb3duVGlwc0NvbnRlbnQgPSAn5pqC5peg5paw5YaF5a65JztcbiAgICAgIHRoaXMuJGFwcGx5KCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICh0aGlzLm5ldHdvcmtUeXBlID09PSAnbm9uZScpIHtcbiAgICAgIHRoaXMuaXNTaG93RG93blRpcHMgPSB0cnVlO1xuICAgICAgdGhpcy5kb3duVGlwc0NvbnRlbnQgPSAn572R57uc5pyq6L+e5o6lJztcbiAgICAgIHRoaXMuJGFwcGx5KCk7XG4gICAgICByZXR1cm47XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuaXNTaG93RG93blRpcHMgPSBmYWxzZTtcbiAgICB9XG4gICAgdGhpcy5pc0xvYWRpbmcgPSB0cnVlO1xuICAgIHRoaXMuY3VycmVjdFBhZ2UrKztcbiAgICB0aGlzLmdldEJyaWVmRGF0YSgnYm90dG9tJyk7XG4gIH1cbiAgLyoqXG4gICAqIOmhtumDqOS4i+aLieWIt+aWsFxuICAgKi9cbiAgb25QdWxsRG93blJlZnJlc2goKSB7XG4gICAgaWYgKHRoaXMuaXNMb2FkaW5nKSByZXR1cm47XG4gICAgdGhpcy5pc0xvYWRpbmcgPSB0cnVlO1xuICAgIGlmICh0aGlzLnNob3dUaXBzVGltZXIpIHtcbiAgICAgIGNsZWFyVGltZW91dCh0aGlzLnNob3dUaXBzVGltZXIpO1xuICAgICAgdGhpcy5pc1Nob3dVcFRpcHMgPSBmYWxzZTtcbiAgICB9XG4gICAgaWYgKHRoaXMudGFnSWQpIHtcbiAgICAgIHRoaXMuc3RhcnRQYWdlID0gdGhpcy5jdXJyZWN0UGFnZSArIDE7XG4gICAgICBpZiAodGhpcy5zdGFydFBhZ2UgPiAxMCkge1xuICAgICAgICB0aGlzLnN0YXJ0UGFnZSA9IDE7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMucmVzZXRTdGF0dXMoKTtcbiAgICBpZiAodGhpcy50YWdJZCkge1xuICAgICAgdGhpcy5jdXJyZWN0UGFnZSA9IHRoaXMuc3RhcnRQYWdlO1xuICAgIH1cbiAgICB0aGlzLmdldEJyaWVmRGF0YSgndXAnKTtcbiAgfVxuICBvbkxvYWQocGFyYW1zKSB7XG4gICAgd2VweS5nZXRTeXN0ZW1JbmZvKHtcbiAgICAgIHN1Y2Nlc3M6IChyZXMpID0+IHtcbiAgICAgICAgLy8g6K6h566X5Li75L2T6YOo5YiG6auY5bqmLOWNleS9jeS4unB4LOeUseS6juS4u+S9k3B45ZKM5b6u5L+hcnB45LmL6Ze05o2i566X5beu5a+86Ie06K6+572u55qEXG4gICAgICAgIHRoaXMud2luZG93SGVpZ2h0ID0gcmVzLndpbmRvd0hlaWdodDtcbiAgICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICB3ZXB5LmdldE5ldHdvcmtUeXBlKHtcbiAgICAgIGNvbXBsZXRlOiAocmVzKSA9PiB7XG4gICAgICAgIGlmIChyZXMubmV0d29ya1R5cGUpIHtcbiAgICAgICAgICB0aGlzLm5ldHdvcmtUeXBlID0gcmVzLm5ldHdvcmtUeXBlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMubmV0d29ya1R5cGUgPSAnbm9uZSc7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHBhcmFtcy50YWdJZCkge1xuICAgICAgICAgIHRoaXMudGFnSWQgPSBwYXJhbXMudGFnSWQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy50YWdJZCA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHBhcmFtcy50YWdOYW1lKSB7XG4gICAgICAgICAgdGhpcy50YWdOYW1lID0gcGFyYW1zLnRhZ05hbWU7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICB3ZXB5Lm9uTmV0d29ya1N0YXR1c0NoYW5nZSgocmVzdWx0KSA9PiB7XG4gICAgICB0aGlzLm5ldHdvcmtUeXBlID0gcmVzdWx0Lm5ldHdvcmtUeXBlO1xuICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICB9KTtcbiAgfVxuICAvLyDliqDovb3mlbDmja5cbiAgZ2V0QnJpZWZEYXRhKHNvdXJjZSA9ICdyZWZyYXNoJykge1xuICAgIGlmICh0aGlzLm5ldHdvcmtUeXBlID09PSAnbm9uZScpIHJldHVybjtcbiAgICBjb25zdCBvcHRpb25zID0ge307XG4gICAgb3B0aW9ucy51cmwgPSB0aGlzLnRhZ0lkID8gVVJMX0FERFJFU1MuR0VUX1JDTURfTElTVCA6IFVSTF9BRERSRVNTLkdFVF9GRUVEX0xJU1Q7XG4gICAgb3B0aW9ucy5zaWduID0gdHJ1ZTtcbiAgICBjb25zdCBfcGFyYW1zID0ge307XG4gICAgX3BhcmFtcy5wYWdlID0gdGhpcy5jdXJyZWN0UGFnZTtcbiAgICBfcGFyYW1zLmNvdW50ID0gMjA7XG4gICAgaWYgKHRoaXMuaXNMb2dpbikge1xuICAgICAgY29uc3QgcmVzdWx0ID0gdGhpcy5wc3BTZGsuZ2V0VG9rZW4oKTtcbiAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgX3BhcmFtcy5wdG9rZW4gPSByZXN1bHQucHRva2VuO1xuICAgICAgICBfcGFyYW1zLnN0b2tlbiA9IHJlc3VsdC5zdG9rZW47XG4gICAgICB9XG4gICAgfVxuICAgIGlmICh0aGlzLnRhZ0lkKSBfcGFyYW1zLnRhZ0lkID0gdGhpcy50YWdJZDtcbiAgICBjb25zdCBfZmVlZFBhcmFtID0ge307XG4gICAgX2ZlZWRQYXJhbS5uZXRfbmFtZSA9IHRoaXMubmV0d29ya1R5cGU7XG4gICAgdHJ5IHtcbiAgICAgIHZhciByZXMgPSB3ZXB5LmdldFN5c3RlbUluZm9TeW5jKCk7XG4gICAgICBfZmVlZFBhcmFtLmRldmljZV9uYW1lID0gcmVzLmJyYW5kO1xuICAgICAgX2ZlZWRQYXJhbS5sYW5ndWFnZSA9IHJlcy5sYW5ndWFnZTtcbiAgICAgIF9mZWVkUGFyYW0ub3MgPSByZXMucGxhdGZvcm07XG4gICAgICBfZmVlZFBhcmFtLm9zX3ZlciA9IHJlcy5zeXN0ZW0uc3BsaXQoJyAnKVsxXTtcbiAgICAgIF9mZWVkUGFyYW0udmlwID0gMFxuICAgICAgX2ZlZWRQYXJhbS52aXBfbGV2ZWwgPSAwO1xuICAgICAgX2ZlZWRQYXJhbS5pZHMgPSAnJztcbiAgICAgIF9mZWVkUGFyYW0udXRkaWQgPSB3ZXB5LmdldFN0b3JhZ2VTeW5jKCd5b3VrdS11dWlkJyk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgLy8gZXJyb3JcbiAgICB9XG4gICAgX3BhcmFtcy5mZWVkUmNtZFBhcmFtID0gSlNPTi5zdHJpbmdpZnkoX2ZlZWRQYXJhbSk7XG4gICAgb3B0aW9ucy5kYXRhID0gX3BhcmFtcztcbiAgICBvcHRpb25zLmNhbGxiYWNrID0gKGRhdGEpID0+IHtcbiAgICAgIHRoaXMuZ2V0RGF0YUNvbXBsZXRlKGRhdGEsIHNvdXJjZSk7XG4gICAgfVxuICAgIHJlcXVlc3REYXRhKG9wdGlvbnMpO1xuICB9XG4gIGdldERhdGFDb21wbGV0ZShkYXRhLCBzb3VyY2UpIHtcbiAgICBpZiAoZGF0YS5yZXN1bHQuZGF0YSAmJiBkYXRhLnJlc3VsdC5kYXRhLmRhdGEgJiYgZGF0YS5yZXN1bHQuZGF0YS5kYXRhLmxpc3QgJiYgZGF0YS5yZXN1bHQuZGF0YS5kYXRhLmxpc3QubGVuZ3RoID4gMCkge1xuICAgICAgY29uc3QgYnJpZWZMaXN0ID0gZGF0YS5yZXN1bHQuZGF0YS5kYXRhLmxpc3Q7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGJyaWVmTGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBlbGVtZW50ID0gYnJpZWZMaXN0W2ldO1xuICAgICAgICBjb25zdCBfcGFyYW1zID0ge307XG4gICAgICAgIC8vIOWmguaenOacqueZu+mZhlxuICAgICAgICBlbGVtZW50LmxvY2FsVXAgPSBmYWxzZTtcbiAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCB0aGlzLnVwTGlzdC5sZW5ndGg7IGorKykge1xuICAgICAgICAgIGlmIChlbGVtZW50LmRhdGEuaWROdW0gPT09IHRoaXMudXBMaXN0W2pdLmlkTnVtKSB7XG4gICAgICAgICAgICBlbGVtZW50LmxvY2FsVXAgPSB0cnVlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIF9wYXJhbXMudmlkZW9JZCA9IGVsZW1lbnQuZGF0YS5pZDtcbiAgICAgICAgX3BhcmFtcy50YXJnZXRVcmwgPSAneW91a3U6Ly9wbGF5JztcbiAgICAgICAgZWxlbWVudC5vcGVuQXBwUGFyYW0gPSBKU09OLnN0cmluZ2lmeShfcGFyYW1zKTtcbiAgICAgICAgZWxlbWVudC5wbGF5U3RhdHVzID0gJ2luaXQnO1xuICAgICAgICBpZiAoZWxlbWVudC5kYXRhLnBsYXlDb3VudCkge1xuICAgICAgICAgIGVsZW1lbnQucGxheUNvdW50ID0gZm9ybWF0TnVtYmVyKGVsZW1lbnQuZGF0YS5wbGF5Q291bnQpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChlbGVtZW50LmRhdGEuZHVyYXRpb24pIHtcbiAgICAgICAgICBlbGVtZW50LmR1cmF0aW9uID0gc2Vjb25kc1RvVGltZShlbGVtZW50LmRhdGEuZHVyYXRpb24sIDQpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoc291cmNlID09PSAnYm90dG9tJykge1xuICAgICAgICB0aGlzLmJyaWVmTGlzdCA9IHRoaXMuYnJpZWZMaXN0LmNvbmNhdChicmllZkxpc3QpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5icmllZkxpc3QgPSBicmllZkxpc3Q7XG4gICAgICB9XG4gICAgICB0aGlzLnRvdGFsQ291bnQgPSB0aGlzLmJyaWVmTGlzdC5sZW5ndGg7XG4gICAgICB0aGlzLnVwVGlwc1N0YXR1cyA9IDE7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh0aGlzLmJyaWVmTGlzdC5sZW5ndGggPiAwKSB7XG4gICAgICAgIHRoaXMudXBUaXBzU3RhdHVzID0gMjtcbiAgICAgICAgaWYgKHNvdXJjZSA9PT0gJ3VwJykge1xuICAgICAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgdGhpcy5icmllZkxpc3QubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmJyaWVmTGlzdFtrXS5wbGF5U3RhdHVzID09PSAncGxheWluZycpIHtcbiAgICAgICAgICAgICAgdGhpcy5icmllZkxpc3Rba10ucGxheVN0YXR1cyA9ICdpbml0JztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMudXBUaXBzU3RhdHVzID0gMztcbiAgICAgICAgdGhpcy5pc0Vycm9yID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5lcnJvclR5cGUgPSAnZGF0YWxvYWRlcnJvcic7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChzb3VyY2UgPT09ICd1cCcpIHtcbiAgICAgIHRoaXMuaXNTaG93VXBUaXBzID0gdHJ1ZTtcbiAgICAgIHRoaXMuc2hvd1RpcHNUaW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB0aGlzLmlzU2hvd1VwVGlwcyA9IGZhbHNlO1xuICAgICAgICB0aGlzLiRhcHBseSgpO1xuICAgICAgfSwgMTUwMCk7XG4gICAgfVxuICAgIHdlcHkuc3RvcFB1bGxEb3duUmVmcmVzaCgpO1xuICAgIGlmICh0aGlzLmlzTG9hZGluZykge1xuICAgICAgdGhpcy5pc0xvYWRpbmcgPSBmYWxzZTtcbiAgICB9XG4gICAgdGhpcy4kYXBwbHkoKTtcbiAgfVxuICAvKipcbiAgICog6YeN572u5pWw5o2u54q25oCBXG4gICAqL1xuICByZXNldFN0YXR1cygpIHtcbiAgICBpZiAodGhpcy5uZXR3b3JrVHlwZSA9PT0gJ25vbmUnKSB7XG4gICAgICB0aGlzLmlzTG9hZGluZyA9IGZhbHNlO1xuICAgICAgd2VweS5zdG9wUHVsbERvd25SZWZyZXNoKCk7XG4gICAgICB0aGlzLmlzRXJyb3IgPSB0cnVlO1xuICAgICAgdGhpcy5lcnJvclR5cGUgPSAnbm9uZXR3b3JrJztcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5pc0Vycm9yID0gZmFsc2U7XG4gICAgfVxuICAgIGlmICh3ZXB5LnBhZ2VTY3JvbGxUbyAmJiB0aGlzLnBhZ2VTY3JvbGxUb3AgPiAwKSB7XG4gICAgICB3ZXB5LnBhZ2VTY3JvbGxUbyh7XG4gICAgICAgIHNjcm9sbFRvcDogMFxuICAgICAgfSlcbiAgICB9XG4gICAgdGhpcy5pc1BsYXllclVuTG9hZCA9IHRydWU7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLmlzUGxheWVyVW5Mb2FkID0gZmFsc2U7XG4gICAgfSwgMTAwMCk7XG4gICAgdGhpcy5jdXJyZWN0SWQgPSAtMTtcbiAgICB0aGlzLmlzVmlkZW9QbGF5aW5nID0gZmFsc2U7XG4gICAgdGhpcy5pc1Nob3dEb3duVGlwcyA9IGZhbHNlO1xuICAgIHRoaXMuY3VycmVjdFBhZ2UgPSAxO1xuICAgIHRoaXMuJGFwcGx5KCk7XG4gIH1cbiAgLyoqXG4gICAqIOWPkemAgemhtemdoum7hOmHkeS7pOeurXB2XG4gICAqL1xuICBzZW5kTG9nKCkge1xuICAgIGNvbnN0IF9kYXRhID0ge307XG4gICAgY29uc3QgX3NwbUNvbmZpZyA9IERFRkFVTFRfREFUQS5TUE1fQ09ORklHW3RoaXMucGFnZUlkXTtcbiAgICBfZGF0YS50aXRsZSA9ICfkvJjphbfnn63op4bpopEnO1xuICAgIF9kYXRhLnVybCA9IF9zcG1Db25maWcucGFnZTtcbiAgICBfZGF0YS5zcG0gPSBgJHtfc3BtQ29uZmlnLnNwbX0uMC4wYDtcbiAgICBzZW5kR29sZExvZyhfZGF0YSk7XG4gIH1cbiAgb25TaG93KCkge1xuICAgIHRoaXMucHNwU2RrID0gd2VweS4kaW5zdGFuY2UucHNwU2RrO1xuICAgIHRoaXMuaXNTaG93ID0gdHJ1ZTtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuaXNTaG93ID0gZmFsc2U7XG4gICAgICB0aGlzLiRhcHBseSgpO1xuICAgIH0sIDMwMDApO1xuICAgIC8vIOiOt+WPlueCuei1nuaVsOebrlxuICAgIGlmICh3ZXB5LmdldFN0b3JhZ2VTeW5jKCd5b3VrdS11cExpc3QnKSkge1xuICAgICAgY29uc3QgdXBMaXN0ID0gd2VweS5nZXRTdG9yYWdlU3luYygneW91a3UtdXBMaXN0Jyk7XG4gICAgICB0cnkge1xuICAgICAgICB0aGlzLnVwTGlzdCA9IEpTT04ucGFyc2UodXBMaXN0KTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY29uc29sZS5sb2coZSk7XG4gICAgICB9XG4gICAgfVxuICAgIC8vIOaYvuekuueahOaXtuWAmemHjee9ruacrOWcsOeCuei1nueKtuaAgVxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5icmllZkxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgIHRoaXMuYnJpZWZMaXN0W2ldLmxvY2FsVXAgPSBmYWxzZTtcbiAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgdGhpcy51cExpc3QubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgaWYgKHRoaXMuYnJpZWZMaXN0W2ldLmRhdGEuaWROdW0gPT09IHRoaXMudXBMaXN0W2pdLmlkTnVtKSB7XG4gICAgICAgICAgdGhpcy5icmllZkxpc3RbaV0ubG9jYWxVcCA9IHRydWU7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5wc3BTZGsuY2hlY2tMb2dpbih7XG4gICAgICBzdWNjZXNzOiAoaXNMb2dpbikgPT4ge1xuICAgICAgICBpZiAoaXNMb2dpbikge1xuICAgICAgICAgIHRoaXMuaXNMb2dpbiA9IHRydWU7XG4gICAgICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICAgIHRoaXMuc2VuZExvZygpO1xuICAgIHRoaXMuJGFwcGx5KCk7XG4gIH1cbiAgb25IaWRlKCkge1xuICAgIC8vIG1hcmsgdG9kbyDmiYvliqjlgZzmraLmkq3mlL7op4bpopFcbiAgICBpZiAoIXRoaXMucGF1c2UpIHtcbiAgICAgIHRoaXMucGF1c2UgPSB0cnVlO1xuICAgIH1cbiAgICB0aGlzLiRhcHBseSgpO1xuICB9XG4gIC8vIOWIhuS6q1xuICBvblNoYXJlQXBwTWVzc2FnZShvcHRpb25zKSB7XG4gICAgbGV0IHRpdGxlID0gJ+S8mOmFt+efreinhumikSc7XG4gICAgbGV0IHNoYXJlSW1hZ2UgPSBudWxsO1xuICAgIGxldCBwYXRoID0gJy9wYWdlcy9icmllZi9icmllZic7XG4gICAgaWYgKG9wdGlvbnMudGFyZ2V0ICYmIG9wdGlvbnMudGFyZ2V0LmRhdGFzZXQpIHtcbiAgICAgIGNvbnN0IGRhdGEgPSBvcHRpb25zLnRhcmdldC5kYXRhc2V0Lml0ZW07XG4gICAgICB0aXRsZSA9IGRhdGEuZGF0YS50aXRsZTtcbiAgICAgIGlmIChkYXRhLmRhdGEudGh1bWJuYWlsKSB7XG4gICAgICAgIHNoYXJlSW1hZ2UgPSBgJHtVUkxfQUREUkVTUy5TSEFSRV9JTUFHRX0/dXJsPSR7ZGF0YS5kYXRhLnRodW1ibmFpbH1gO1xuICAgICAgfVxuICAgICAgY29uc3Qgb2JqID0ge307XG4gICAgICBjb25zdCBfc3BtQ29uZmlnID0gREVGQVVMVF9EQVRBLlNQTV9DT05GSUdbdGhpcy5wYWdlSWRdO1xuICAgICAgb2JqLnNvdXJjZSA9IF9zcG1Db25maWcucGFnZTtcbiAgICAgIG9iai5zcG0gPSBfc3BtQ29uZmlnLnNwbTtcbiAgICAgIG9iai52aWRlb0lkID0gZGF0YS5kYXRhLmlkO1xuICAgICAgbGV0IHBhcmFtcyA9ICcnO1xuICAgICAgZm9yICh2YXIga2V5IGluIG9iaikge1xuICAgICAgICBwYXJhbXMgKz0gJyYnICsga2V5ICsgJz0nICsgZW5jb2RlVVJJQ29tcG9uZW50KG9ialtrZXldKTtcbiAgICAgIH1cbiAgICAgIHBhcmFtcyA9IHBhcmFtcy5zdWJzdHJpbmcoMSwgcGFyYW1zLmxlbmd0aCk7XG4gICAgICBwYXRoID0gYHBhZ2VzL3BsYXkvcGxheT8ke3BhcmFtc31gO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBkYXRhID0gdGhpcy5icmllZkxpc3RbMF07XG4gICAgICBpZiAoZGF0YS5kYXRhLnRodW1ibmFpbCkge1xuICAgICAgICBzaGFyZUltYWdlID0gYCR7VVJMX0FERFJFU1MuU0hBUkVfSU1BR0V9P3VybD0ke2RhdGEuZGF0YS50aHVtYm5haWx9YDtcbiAgICAgIH1cbiAgICB9XG4gICAgc2VuZEV2ZW50TG9nKHtldmVudENvZGU6ICcwMDAwNyd9KTtcbiAgICByZXR1cm4ge1xuICAgICAgdGl0bGU6IHRpdGxlLFxuICAgICAgcGF0aDogcGF0aCxcbiAgICAgIGltYWdlVXJsOiBzaGFyZUltYWdlLFxuICAgICAgc3VjY2VzczogKHJlcykgPT4ge1xuICAgICAgICBpZiAocmVzLmVyck1zZyA9PT0gJ3NoYXJlQXBwTWVzc2FnZTpvaycpIHtcbiAgICAgICAgICBzZW5kRXZlbnRMb2coe2V2ZW50Q29kZTogJzAwMDA4J30pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgfVxufVxuIl19