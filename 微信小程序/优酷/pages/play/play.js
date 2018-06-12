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

var _defaultData = require("./../../config/default-data.js");

var _defaultData2 = _interopRequireDefault(_defaultData);

var _youkuPlayer = require("./../../components/player/youkuPlayer.js");

var _youkuPlayer2 = _interopRequireDefault(_youkuPlayer);

var _vipBanner = require("./../../components/play/vipBanner.js");

var _vipBanner2 = _interopRequireDefault(_vipBanner);

var _videoDetails = require("./../../components/play/videoDetails.js");

var _videoDetails2 = _interopRequireDefault(_videoDetails);

var _recommend = require("./../../components/play/recommend.js");

var _recommend2 = _interopRequireDefault(_recommend);

var _programList = require("./../../components/play/programList.js");

var _programList2 = _interopRequireDefault(_programList);

var _footer = require("./../../components/common/footer.js");

var _footer2 = _interopRequireDefault(_footer);

var _dataError = require("./../../components/common/dataError.js");

var _dataError2 = _interopRequireDefault(_dataError);

var _playLoading = require("./../../components/common/playLoading.js");

var _playLoading2 = _interopRequireDefault(_playLoading);

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

var Play = function(_wepy$page) {
    _inherits(Play, _wepy$page);
    function Play() {
        var _ref;
        var _temp, _this, _ret;
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }
        _classCallCheck(this, Play);
        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Play.__proto__ || Object.getPrototypeOf(Play)).call.apply(_ref, [ this ].concat(args))), 
        _this), _this.config = {
            navigationBarTitleText: "优酷视频",
            disableScroll: true
        }, _this.data = {
            pageId: "play",
            vid: "",
            showid: "",
            playPageData: null,
            retryCount: 0,
            pageConfig: null,
            coverURL: "",
            scrollHeight: 392,
            currectScrollY: 0,
            networkType: "",
            isLoadedData: false,
            isError: false,
            errorType: "",
            isLoading: true,
            isRefrash: false,
            openAppParam: "",
            videoData: {},
            // 来源spm page,可在组件中发生变化
            spmSource: "",
            // 来源 进入播放页的spm即使组件中变化此参数不变
            source: "",
            // 来源spm
            referSpm: ""
        }, _this.events = {
            REFRASH: function REFRASH($event) {
                _this.isRefrash = true;
                setTimeout(function() {
                    _this.isRefrash = false;
                }, 2e3);
                _this.resetData();
                _this.requestPageData();
            },
            NavigateToPlay: function NavigateToPlay($event) {
                var data = $event;
                var vid = data.action.extra.value;
                if (data.action.type === "JUMP_TO_PLAY_LIST") {
                    _this.vid = data.action.extra.videoId;
                } else if (data.action.type === "JUMP_TO_SHOW") {
                    _this.showid = vid;
                } else {
                    _this.vid = vid;
                }
                var _spmConfig = _defaultData2.default.SPM_CONFIG[_this.pageId];
                _this.spmSource = _spmConfig.page;
                if (data.spm) _this.referSpm = data.spm;
                _this.$apply();
            }
        }, _this.watch = {
            vid: function vid(newValue, oldValue) {
                if (newValue === oldValue) return;
                if (newValue === "") return;
                this.showid = "";
                this.resetData();
                this.requestPageData();
            },
            showid: function showid(newValue, oldValue) {
                if (newValue === oldValue) return;
                if (newValue === "") return;
                this.vid = "";
                this.resetData();
                this.requestPageData();
            }
        }, _this.$repeat = {}, _this.$props = {
            youkuplayer: {
                "xmlns:v-bind": "",
                "v-bind:vid.sync": "vid",
                "v-bind:showid.sync": "showid",
                "v-bind:coverURL.sync": "coverURL",
                "v-bind:isRefrash.sync": "isRefrash",
                "v-bind:source.sync": "pageId"
            },
            vipbanner: {
                "v-bind:vid.sync": "vid",
                "v-bind:pageConfig.sync": "pageConfig",
                "v-bind:playPageData.sync": "playPageData",
                "v-bind:openAppParam.sync": "openAppParam",
                "v-bind:coverURL.sync": "coverURL",
                "v-bind:videoData.sync": "videoData",
                "v-bind:source.sync": "source"
            },
            videodetails: {
                "v-bind:vid.sync": "vid",
                "v-bind:showid.sync": "showid",
                "v-bind:playPageData.sync": "playPageData",
                "v-bind:openAppParam.sync": "openAppParam",
                "v-bind:pageConfig.sync": "pageConfig",
                "v-bind:videoData.sync": "videoData"
            },
            recommend: {
                "v-bind:vid.sync": "vid",
                "v-bind:showid.sync": "showid",
                "v-bind:playPageData.sync": "playPageData",
                "v-bind:pageConfig.sync": "pageConfig"
            },
            ProgramList: {
                "v-bind:vid.sync": "vid",
                "v-bind:showid.sync": "showid",
                "v-bind:playPageData.sync": "playPageData",
                "v-bind:pageConfig.sync": "pageConfig"
            },
            dataerror: {
                "v-bind:errorType.sync": "errorType"
            },
            playloading: {}
        }, _this.$events = {}, _this.components = {
            youkuplayer: _youkuPlayer2.default,
            vipbanner: _vipBanner2.default,
            videodetails: _videoDetails2.default,
            recommend: _recommend2.default,
            ProgramList: _programList2.default,
            footer: _footer2.default,
            dataerror: _dataError2.default,
            playloading: _playLoading2.default
        }, _this.methods = {
            /**
       * 返回会员小程序
       */
            backToMiniProgram: function backToMiniProgram() {
                _wepy2.default.navigateBackMiniProgram({
                    extraData: {
                        foo: "bar"
                    },
                    success: function success(res) {
                        // 返回成功
                        console.log("返回成功");
                    }
                });
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }
    _createClass(Play, [ {
        key: "requestPageData",
        /**
     * 请求播放页渲染数据
     */
        value: function requestPageData() {
            var _this2 = this;
            if (this.networkType === "none") return;
            // sendPvLog
            // this.sendLog();
                        var args = {};
            args.url = _API.URL_ADDRESS.PLAY_DETAIL;
            args.sign = true;
            args.data = {
                vid: this.vid
            };
            if (this.showid !== "") {
                args.data = {
                    showid: this.showid
                };
            }
            args.callback = function(data) {
                _this2.onComplete(data);
            };
            (0, _API.requestData)(args);
        }
        /**
     * 发送页面黄金令箭pv
     */    }, {
        key: "sendLog",
        value: function sendLog() {
            var _data = {};
            var _spmConfig = _defaultData2.default.SPM_CONFIG[this.pageId];
            _data.title = this.videoData.title || "优酷视频";
            _data.url = _spmConfig.page;
            _data.spm = _spmConfig.spm + ".0.0";
            _data.referUrl = this.spmSource;
            _data.referSpm = this.referSpm;
            (0, _API.sendGoldLog)(_data);
        }
        /**
     * 配置接口请求完成
     */    }, {
        key: "onComplete",
        value: function onComplete(data) {
            if (data.isSuccess && data.result && data.result.data) {
                this.isLoadedData = true;
                this.isLoading = false;
                this.playPageData = this.translatePageData(data.result.data);
                this.$apply();
                this.sendLog();
            } else {
                this.retryCount++;
                if (this.retryCount <= 1) {
                    this.retryCount++;
                    this.requestPageData();
                    return false;
                }
                this.isError = true;
                this.isLoading = false;
                this.errorType = "noconnect";
                this.$apply();
            }
        }
        /**
     * 切换视频时数据重置
     */    }, {
        key: "resetData",
        value: function resetData() {
            this.playPageData = null;
            this.retryCount = 0;
            this.coverURL = "";
            this.isLoadedData = false;
            if (this.networkType === "none") {
                this.isLoading = false;
                this.isError = true;
                this.errorType = "nonetwork";
            } else {
                this.isLoading = true;
                this.isError = false;
            }
            var _params = {};
            if (this.showid) {
                _params.showId = this.showid;
            } else {
                _params.videoId = this.vid;
            }
            _params.targetUrl = "youku://play";
            this.openAppParam = JSON.stringify(_params);
        }
        /**
     * 转换播放页详情数据
     * @param {Object} res 返回数据资源
     */    }, {
        key: "translatePageData",
        value: function translatePageData(res) {
            var _this3 = this;
            var result = null;
            var tags = [];
            // 看是否在mt配置tag中
                        var _spmConfig = _defaultData2.default.SPM_CONFIG[this.pageId];
            for (var item in this.pageConfig) {
                var itemtag = this.pageConfig[item].tag;
                if (itemtag) {
                    var arr = itemtag.split(",");
                    tags = tags.concat(arr);
                }
            }
            if (res && res.data && res.data.data) {
                try {
                    var currentVid = res.data.data.extra.videoId;
                    var moduleResult = res.data.data.moduleResult;
                    var modules = moduleResult.modules;
                    var tempobj = new Map();
                    var _loop = function _loop(i) {
                        var components = modules[i].components || [];
                        var componentItem = components[0] || {};
                        var template = componentItem.template || {};
                        var tag = template.priorityTag || template.tag;
                        componentItem.title = modules[i].title;
                        componentItem.spm = _spmConfig.spm + "." + modules[i].moduleId + "." + componentItem.componentId;
                        var isIn = tags.find(function(value) {
                            return value === tag;
                        });
                        if (isIn) {
                            tempobj.set(tag, componentItem);
                            // 发送模块日志
                                                        var _data = {};
                            var _modulesTitle = _this3.videoData.title || "优酷视频";
                            _data.title = _modulesTitle + "_" + modules[i].title;
                            _data.url = _spmConfig.page;
                            _data.spm = _spmConfig.spm + "." + modules[i].moduleId + ".0";
                            _data.referUrl = _this3.spmSource;
                            _data.referSpm = _this3.referSpm;
                            (0, _API.sendGoldLog)(_data);
                        }
                    };
                    for (var i = 0; i < modules.length; i++) {
                        _loop(i);
                    }
                    result = {};
                    result.currentVid = currentVid;
                    result.playerModules = tempobj;
                    result.originData = res.data.data;
                } catch (e) {}
            }
            return result;
        }
        /**
     * 加载完成, 判断网络情况
     */    }, {
        key: "onLoad",
        value: function onLoad(params) {
            var _this4 = this;
            // 保证同步执行：请求播放页配置接口，设置视频id获取页面信息
                        _wepy2.default.getNetworkType({
                complete: function complete(res) {
                    if (res.networkType) {
                        _this4.networkType = res.networkType;
                    } else {
                        _this4.networkType = "none";
                    }
                    _this4.requestConfig(params);
                }
            });
            _wepy2.default.onNetworkStatusChange(function(result) {
                _this4.networkType = result.networkType;
                _this4.$apply();
            });
        }
        /**
     * 请求配置文件
     */    }, {
        key: "requestConfig",
        value: function requestConfig(params) {
            var _this5 = this;
            this.pageConfig = _defaultData2.default.PAGE_CONFIG;
            var options = {};
            options.url = _API.URL_ADDRESS.PLAY_PAGE_CONFIG;
            options.callback = function(data) {
                _this5.pageConfigComplete(data, params);
            };
            (0, _API.requestData)(options);
        }
        /**
     * 播放页配置加载完成
     */    }, {
        key: "pageConfigComplete",
        value: function pageConfigComplete(data, params) {
            var _this6 = this;
            if (data.isSuccess && data.result && data.result.data) {
                this.pageConfig = data.result.data;
            }
            if (params.source) {
                this.source = params.source;
                this.spmSource = params.source;
            }
            if (params.spm) {
                this.referSpm = params.spm;
            }
            if (params.videoId) {
                this.vid = decodeURIComponent(params.videoId);
                if (this.vid.indexOf("==") === -1) {
                    this.vid = this.vid + "==";
                }
            }
            // this.vid = 'XNjI3Nzk1OTM2==';
                        if (params.showId) {
                this.showid = decodeURIComponent(params.showId);
            }
            _wepy2.default.getSystemInfo({
                success: function success(res) {
                    // 计算主体部分高度,单位为px
                    _this6.scrollHeight = res.windowHeight - 211;
                    _this6.$apply();
                }
            });
            if (params.image) {
                this.coverURL = decodeURIComponent(params.image);
            }
            this.$apply();
        }
        // 分享
        }, {
        key: "onShareAppMessage",
        value: function onShareAppMessage() {
            var data = null;
            if (this.playPageData && this.playPageData.originData) {
                data = this.playPageData.originData.extra;
            }
            var title = data.shareText ? data.shareText : "优酷视频";
            var obj = {};
            var _spmConfig = _defaultData2.default.SPM_CONFIG[this.pageId];
            obj.source = _spmConfig.page + "_share";
            obj.spm = _spmConfig.spm + ".0.1";
            if (this.showid) {
                obj.showId = this.showid;
            } else {
                obj.videoId = this.vid;
            }
            var params = "";
            for (var key in obj) {
                params += "&" + key + "=" + encodeURIComponent(obj[key]);
            }
            params = params.substring(1, params.length);
            var path = "/pages/play/play?" + params;
            var shareImage = null;
            if (this.coverURL) {
                shareImage = _API.URL_ADDRESS.SHARE_IMAGE + "?url=" + this.coverURL;
            }
            switch (data.videoCategoryId) {
              case 97:
                // 电视剧
                if (data.videoTypeCode === 1) {
                    title = data.title + " 第" + data.videoStage + "集";
                }
                break;

              case 96:
                // 电影
                if (data.videoTypeCode === 1) {
                    // 正片
                    title = data.title;
                    if (data.showSubtitle) {
                        title += "：" + data.showSubtitle;
                    }
                    if (data.imgShow) {
                        shareImage = _API.URL_ADDRESS.SHARE_IMAGE + "?url=" + data.imgShow;
                    }
                }
                break;

              case 100:
 // 动漫
                              case 85:
                // 综艺
                title = data.title + " " + data.videoTitle;
                break;

              default:
                title = data.videoTitle;
                break;
            }
            return {
                title: title,
                path: path,
                imageUrl: shareImage
            };
        }
    } ]);
    return Play;
}(_wepy2.default.page);

Page(require("./../../npm/wepy/lib/wepy.js").default.$createPage(Play, "pages/play/play"));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBsYXkuanMiXSwibmFtZXMiOlsiUGxheSIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJkaXNhYmxlU2Nyb2xsIiwiZGF0YSIsInBhZ2VJZCIsInZpZCIsInNob3dpZCIsInBsYXlQYWdlRGF0YSIsInJldHJ5Q291bnQiLCJwYWdlQ29uZmlnIiwiY292ZXJVUkwiLCJzY3JvbGxIZWlnaHQiLCJjdXJyZWN0U2Nyb2xsWSIsIm5ldHdvcmtUeXBlIiwiaXNMb2FkZWREYXRhIiwiaXNFcnJvciIsImVycm9yVHlwZSIsImlzTG9hZGluZyIsImlzUmVmcmFzaCIsIm9wZW5BcHBQYXJhbSIsInZpZGVvRGF0YSIsInNwbVNvdXJjZSIsInNvdXJjZSIsInJlZmVyU3BtIiwiZXZlbnRzIiwiJGV2ZW50Iiwic2V0VGltZW91dCIsInJlc2V0RGF0YSIsInJlcXVlc3RQYWdlRGF0YSIsImFjdGlvbiIsImV4dHJhIiwidmFsdWUiLCJ0eXBlIiwidmlkZW9JZCIsIl9zcG1Db25maWciLCJTUE1fQ09ORklHIiwicGFnZSIsInNwbSIsIiRhcHBseSIsIndhdGNoIiwibmV3VmFsdWUiLCJvbGRWYWx1ZSIsIiRyZXBlYXQiLCIkcHJvcHMiLCIkZXZlbnRzIiwiY29tcG9uZW50cyIsInlvdWt1cGxheWVyIiwidmlwYmFubmVyIiwidmlkZW9kZXRhaWxzIiwicmVjb21tZW5kIiwiUHJvZ3JhbUxpc3QiLCJmb290ZXIiLCJkYXRhZXJyb3IiLCJwbGF5bG9hZGluZyIsIm1ldGhvZHMiLCJiYWNrVG9NaW5pUHJvZ3JhbSIsIm5hdmlnYXRlQmFja01pbmlQcm9ncmFtIiwiZXh0cmFEYXRhIiwiZm9vIiwic3VjY2VzcyIsInJlcyIsImNvbnNvbGUiLCJsb2ciLCJhcmdzIiwidXJsIiwiUExBWV9ERVRBSUwiLCJzaWduIiwiY2FsbGJhY2siLCJvbkNvbXBsZXRlIiwiX2RhdGEiLCJ0aXRsZSIsInJlZmVyVXJsIiwiaXNTdWNjZXNzIiwicmVzdWx0IiwidHJhbnNsYXRlUGFnZURhdGEiLCJzZW5kTG9nIiwiX3BhcmFtcyIsInNob3dJZCIsInRhcmdldFVybCIsIkpTT04iLCJzdHJpbmdpZnkiLCJ0YWdzIiwiaXRlbSIsIml0ZW10YWciLCJ0YWciLCJhcnIiLCJzcGxpdCIsImNvbmNhdCIsImN1cnJlbnRWaWQiLCJtb2R1bGVSZXN1bHQiLCJtb2R1bGVzIiwidGVtcG9iaiIsIk1hcCIsImkiLCJjb21wb25lbnRJdGVtIiwidGVtcGxhdGUiLCJwcmlvcml0eVRhZyIsIm1vZHVsZUlkIiwiY29tcG9uZW50SWQiLCJpc0luIiwiZmluZCIsInNldCIsIl9tb2R1bGVzVGl0bGUiLCJsZW5ndGgiLCJwbGF5ZXJNb2R1bGVzIiwib3JpZ2luRGF0YSIsImUiLCJwYXJhbXMiLCJnZXROZXR3b3JrVHlwZSIsImNvbXBsZXRlIiwicmVxdWVzdENvbmZpZyIsIm9uTmV0d29ya1N0YXR1c0NoYW5nZSIsIlBBR0VfQ09ORklHIiwib3B0aW9ucyIsIlBMQVlfUEFHRV9DT05GSUciLCJwYWdlQ29uZmlnQ29tcGxldGUiLCJkZWNvZGVVUklDb21wb25lbnQiLCJpbmRleE9mIiwiZ2V0U3lzdGVtSW5mbyIsIndpbmRvd0hlaWdodCIsImltYWdlIiwic2hhcmVUZXh0Iiwib2JqIiwia2V5IiwiZW5jb2RlVVJJQ29tcG9uZW50Iiwic3Vic3RyaW5nIiwicGF0aCIsInNoYXJlSW1hZ2UiLCJTSEFSRV9JTUFHRSIsInZpZGVvQ2F0ZWdvcnlJZCIsInZpZGVvVHlwZUNvZGUiLCJ2aWRlb1N0YWdlIiwic2hvd1N1YnRpdGxlIiwiaW1nU2hvdyIsInZpZGVvVGl0bGUiLCJpbWFnZVVybCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQkEsSTs7Ozs7Ozs7Ozs7Ozs7a0xBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCLE1BRGpCO0FBRVBDLHFC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RUx3RCxjQUFNQSxJQUZEO0FBR0xTLGtCQUFVUjtBQUhMLE9BQVA7QUFLRDs7OztFQXpXK0IsZUFBSzNGLEk7O2tCQUFsQnJDLEkiLCJmaWxlIjoicGxheS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XG5pbXBvcnQge1VSTF9BRERSRVNTLCByZXF1ZXN0RGF0YSwgc2VuZEdvbGRMb2d9IGZyb20gJ0AvQVBJLyc7XG5pbXBvcnQgREVGQVVMVF9EQVRBIGZyb20gJ0AvY29uZmlnL2RlZmF1bHQtZGF0YSc7XG5pbXBvcnQgWW91a3VQbGF5ZXIgZnJvbSAnQC9jb21wb25lbnRzL3BsYXllci95b3VrdVBsYXllcic7XG5pbXBvcnQgVmlwQmFubmVyIGZyb20gJ0AvY29tcG9uZW50cy9wbGF5L3ZpcEJhbm5lcic7XG5pbXBvcnQgVmlkZW9EZXRhaWxzIGZyb20gJ0AvY29tcG9uZW50cy9wbGF5L3ZpZGVvRGV0YWlscyc7XG5pbXBvcnQgUmVjb21tZW5kIGZyb20gJ0AvY29tcG9uZW50cy9wbGF5L3JlY29tbWVuZCc7XG5pbXBvcnQgUHJvZ3JhbUxpc3QgZnJvbSAnQC9jb21wb25lbnRzL3BsYXkvcHJvZ3JhbUxpc3QnO1xuaW1wb3J0IEZvb3RlciBmcm9tICdAL2NvbXBvbmVudHMvY29tbW9uL2Zvb3Rlcic7XG5pbXBvcnQgRGF0YUVycm9yIGZyb20gJ0AvY29tcG9uZW50cy9jb21tb24vZGF0YUVycm9yJztcbmltcG9ydCBQbGF5TG9hZGluZyBmcm9tICdAL2NvbXBvbmVudHMvY29tbW9uL3BsYXlMb2FkaW5nJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGxheSBleHRlbmRzIHdlcHkucGFnZSB7XG4gIGNvbmZpZyA9IHtcbiAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5LyY6YW36KeG6aKRJyxcbiAgICBkaXNhYmxlU2Nyb2xsOiB0cnVlXG4gIH07XG5cbiAgZGF0YSA9IHtcbiAgICBwYWdlSWQ6ICdwbGF5JyxcbiAgICB2aWQ6ICcnLFxuICAgIHNob3dpZDogJycsXG4gICAgcGxheVBhZ2VEYXRhOiBudWxsLFxuICAgIHJldHJ5Q291bnQ6IDAsXG4gICAgcGFnZUNvbmZpZzogbnVsbCxcbiAgICBjb3ZlclVSTDogJycsXG4gICAgc2Nyb2xsSGVpZ2h0OiAzOTIsXG4gICAgY3VycmVjdFNjcm9sbFk6IDAsXG4gICAgbmV0d29ya1R5cGU6ICcnLFxuICAgIGlzTG9hZGVkRGF0YTogZmFsc2UsXG4gICAgaXNFcnJvcjogZmFsc2UsXG4gICAgZXJyb3JUeXBlOiAnJyxcbiAgICBpc0xvYWRpbmc6IHRydWUsXG4gICAgaXNSZWZyYXNoOiBmYWxzZSxcbiAgICBvcGVuQXBwUGFyYW06ICcnLFxuICAgIHZpZGVvRGF0YToge30sXG4gICAgLy8g5p2l5rqQc3BtIHBhZ2Us5Y+v5Zyo57uE5Lu25Lit5Y+R55Sf5Y+Y5YyWXG4gICAgc3BtU291cmNlOiAnJyxcbiAgICAvLyDmnaXmupAg6L+b5YWl5pKt5pS+6aG155qEc3Bt5Y2z5L2/57uE5Lu25Lit5Y+Y5YyW5q2k5Y+C5pWw5LiN5Y+YXG4gICAgc291cmNlOiAnJyxcbiAgICAvLyDmnaXmupBzcG1cbiAgICByZWZlclNwbTogJydcbiAgfTtcbiAgZXZlbnRzID0ge1xuICAgICdSRUZSQVNIJzogKCRldmVudCwgLi4uYXJncykgPT4ge1xuICAgICAgdGhpcy5pc1JlZnJhc2ggPSB0cnVlO1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRoaXMuaXNSZWZyYXNoID0gZmFsc2U7XG4gICAgICB9LCAyMDAwKTtcbiAgICAgIHRoaXMucmVzZXREYXRhKCk7XG4gICAgICB0aGlzLnJlcXVlc3RQYWdlRGF0YSgpO1xuICAgIH0sXG4gICAgJ05hdmlnYXRlVG9QbGF5JzogKCRldmVudCwgLi4uYXJncykgPT4ge1xuICAgICAgY29uc3QgZGF0YSA9ICRldmVudDtcbiAgICAgIGNvbnN0IHZpZCA9IGRhdGEuYWN0aW9uLmV4dHJhLnZhbHVlO1xuICAgICAgaWYgKGRhdGEuYWN0aW9uLnR5cGUgPT09ICdKVU1QX1RPX1BMQVlfTElTVCcpIHtcbiAgICAgICAgdGhpcy52aWQgPSBkYXRhLmFjdGlvbi5leHRyYS52aWRlb0lkO1xuICAgICAgfSBlbHNlIGlmIChkYXRhLmFjdGlvbi50eXBlID09PSAnSlVNUF9UT19TSE9XJykge1xuICAgICAgICB0aGlzLnNob3dpZCA9IHZpZDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMudmlkID0gdmlkO1xuICAgICAgfVxuICAgICAgY29uc3QgX3NwbUNvbmZpZyA9IERFRkFVTFRfREFUQS5TUE1fQ09ORklHW3RoaXMucGFnZUlkXTtcbiAgICAgIHRoaXMuc3BtU291cmNlID0gX3NwbUNvbmZpZy5wYWdlO1xuICAgICAgaWYgKGRhdGEuc3BtKSB0aGlzLnJlZmVyU3BtID0gZGF0YS5zcG07XG4gICAgICB0aGlzLiRhcHBseSgpO1xuICAgIH1cbiAgfTtcbiAgd2F0Y2ggPSB7XG4gICAgdmlkKG5ld1ZhbHVlLCBvbGRWYWx1ZSkge1xuICAgICAgaWYgKG5ld1ZhbHVlID09PSBvbGRWYWx1ZSkgcmV0dXJuO1xuICAgICAgaWYgKG5ld1ZhbHVlID09PSAnJykgcmV0dXJuO1xuICAgICAgdGhpcy5zaG93aWQgPSAnJztcbiAgICAgIHRoaXMucmVzZXREYXRhKCk7XG4gICAgICB0aGlzLnJlcXVlc3RQYWdlRGF0YSgpO1xuICAgIH0sXG4gICAgc2hvd2lkKG5ld1ZhbHVlLCBvbGRWYWx1ZSkge1xuICAgICAgaWYgKG5ld1ZhbHVlID09PSBvbGRWYWx1ZSkgcmV0dXJuO1xuICAgICAgaWYgKG5ld1ZhbHVlID09PSAnJykgcmV0dXJuO1xuICAgICAgdGhpcy52aWQgPSAnJztcbiAgICAgIHRoaXMucmVzZXREYXRhKCk7XG4gICAgICB0aGlzLnJlcXVlc3RQYWdlRGF0YSgpO1xuICAgIH1cbiAgfTtcbiAkcmVwZWF0ID0ge307XHJcbiRwcm9wcyA9IHtcInlvdWt1cGxheWVyXCI6e1wieG1sbnM6di1iaW5kXCI6XCJcIixcInYtYmluZDp2aWQuc3luY1wiOlwidmlkXCIsXCJ2LWJpbmQ6c2hvd2lkLnN5bmNcIjpcInNob3dpZFwiLFwidi1iaW5kOmNvdmVyVVJMLnN5bmNcIjpcImNvdmVyVVJMXCIsXCJ2LWJpbmQ6aXNSZWZyYXNoLnN5bmNcIjpcImlzUmVmcmFzaFwiLFwidi1iaW5kOnNvdXJjZS5zeW5jXCI6XCJwYWdlSWRcIn0sXCJ2aXBiYW5uZXJcIjp7XCJ2LWJpbmQ6dmlkLnN5bmNcIjpcInZpZFwiLFwidi1iaW5kOnBhZ2VDb25maWcuc3luY1wiOlwicGFnZUNvbmZpZ1wiLFwidi1iaW5kOnBsYXlQYWdlRGF0YS5zeW5jXCI6XCJwbGF5UGFnZURhdGFcIixcInYtYmluZDpvcGVuQXBwUGFyYW0uc3luY1wiOlwib3BlbkFwcFBhcmFtXCIsXCJ2LWJpbmQ6Y292ZXJVUkwuc3luY1wiOlwiY292ZXJVUkxcIixcInYtYmluZDp2aWRlb0RhdGEuc3luY1wiOlwidmlkZW9EYXRhXCIsXCJ2LWJpbmQ6c291cmNlLnN5bmNcIjpcInNvdXJjZVwifSxcInZpZGVvZGV0YWlsc1wiOntcInYtYmluZDp2aWQuc3luY1wiOlwidmlkXCIsXCJ2LWJpbmQ6c2hvd2lkLnN5bmNcIjpcInNob3dpZFwiLFwidi1iaW5kOnBsYXlQYWdlRGF0YS5zeW5jXCI6XCJwbGF5UGFnZURhdGFcIixcInYtYmluZDpvcGVuQXBwUGFyYW0uc3luY1wiOlwib3BlbkFwcFBhcmFtXCIsXCJ2LWJpbmQ6cGFnZUNvbmZpZy5zeW5jXCI6XCJwYWdlQ29uZmlnXCIsXCJ2LWJpbmQ6dmlkZW9EYXRhLnN5bmNcIjpcInZpZGVvRGF0YVwifSxcInJlY29tbWVuZFwiOntcInYtYmluZDp2aWQuc3luY1wiOlwidmlkXCIsXCJ2LWJpbmQ6c2hvd2lkLnN5bmNcIjpcInNob3dpZFwiLFwidi1iaW5kOnBsYXlQYWdlRGF0YS5zeW5jXCI6XCJwbGF5UGFnZURhdGFcIixcInYtYmluZDpwYWdlQ29uZmlnLnN5bmNcIjpcInBhZ2VDb25maWdcIn0sXCJQcm9ncmFtTGlzdFwiOntcInYtYmluZDp2aWQuc3luY1wiOlwidmlkXCIsXCJ2LWJpbmQ6c2hvd2lkLnN5bmNcIjpcInNob3dpZFwiLFwidi1iaW5kOnBsYXlQYWdlRGF0YS5zeW5jXCI6XCJwbGF5UGFnZURhdGFcIixcInYtYmluZDpwYWdlQ29uZmlnLnN5bmNcIjpcInBhZ2VDb25maWdcIn0sXCJkYXRhZXJyb3JcIjp7XCJ2LWJpbmQ6ZXJyb3JUeXBlLnN5bmNcIjpcImVycm9yVHlwZVwifSxcInBsYXlsb2FkaW5nXCI6e319O1xyXG4kZXZlbnRzID0ge307XHJcbiBjb21wb25lbnRzID0ge1xuICAgIHlvdWt1cGxheWVyOiBZb3VrdVBsYXllcixcbiAgICB2aXBiYW5uZXI6IFZpcEJhbm5lcixcbiAgICB2aWRlb2RldGFpbHM6IFZpZGVvRGV0YWlscyxcbiAgICByZWNvbW1lbmQ6IFJlY29tbWVuZCxcbiAgICBQcm9ncmFtTGlzdDogUHJvZ3JhbUxpc3QsXG4gICAgZm9vdGVyOiBGb290ZXIsXG4gICAgZGF0YWVycm9yOiBEYXRhRXJyb3IsXG4gICAgcGxheWxvYWRpbmc6IFBsYXlMb2FkaW5nXG4gIH07XG4gIG1ldGhvZHMgPSB7XG4gICAgLyoqXG4gICAgICog6L+U5Zue5Lya5ZGY5bCP56iL5bqPXG4gICAgICovXG4gICAgYmFja1RvTWluaVByb2dyYW0oKSB7XG4gICAgICB3ZXB5Lm5hdmlnYXRlQmFja01pbmlQcm9ncmFtKHtcbiAgICAgICAgZXh0cmFEYXRhOiB7XG4gICAgICAgICAgZm9vOiAnYmFyJ1xuICAgICAgICB9LFxuICAgICAgICBzdWNjZXNzKHJlcykge1xuICAgICAgICAgIC8vIOi/lOWbnuaIkOWKn1xuICAgICAgICAgIGNvbnNvbGUubG9nKCfov5Tlm57miJDlip8nKTtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG4gIH1cbiAgLyoqXG4gICAqIOivt+axguaSreaUvumhtea4suafk+aVsOaNrlxuICAgKi9cbiAgcmVxdWVzdFBhZ2VEYXRhKCkge1xuICAgIGlmICh0aGlzLm5ldHdvcmtUeXBlID09PSAnbm9uZScpIHJldHVybjtcbiAgICAvLyBzZW5kUHZMb2dcbiAgICAvLyB0aGlzLnNlbmRMb2coKTtcbiAgICBjb25zdCBhcmdzID0ge307XG4gICAgYXJncy51cmwgPSBVUkxfQUREUkVTUy5QTEFZX0RFVEFJTDtcbiAgICBhcmdzLnNpZ24gPSB0cnVlO1xuICAgIGFyZ3MuZGF0YSA9IHsndmlkJzogdGhpcy52aWR9O1xuICAgIGlmICh0aGlzLnNob3dpZCAhPT0gJycpIHtcbiAgICAgIGFyZ3MuZGF0YSA9IHsnc2hvd2lkJzogdGhpcy5zaG93aWR9O1xuICAgIH1cbiAgICBhcmdzLmNhbGxiYWNrID0gKGRhdGEpID0+IHtcbiAgICAgIHRoaXMub25Db21wbGV0ZShkYXRhKTtcbiAgICB9XG4gICAgcmVxdWVzdERhdGEoYXJncyk7XG4gIH1cbiAgLyoqXG4gICAqIOWPkemAgemhtemdoum7hOmHkeS7pOeurXB2XG4gICAqL1xuICBzZW5kTG9nKCkge1xuICAgIGNvbnN0IF9kYXRhID0ge307XG4gICAgY29uc3QgX3NwbUNvbmZpZyA9IERFRkFVTFRfREFUQS5TUE1fQ09ORklHW3RoaXMucGFnZUlkXTtcbiAgICBfZGF0YS50aXRsZSA9IHRoaXMudmlkZW9EYXRhLnRpdGxlIHx8ICfkvJjphbfop4bpopEnO1xuICAgIF9kYXRhLnVybCA9IF9zcG1Db25maWcucGFnZTtcbiAgICBfZGF0YS5zcG0gPSBgJHtfc3BtQ29uZmlnLnNwbX0uMC4wYDtcbiAgICBfZGF0YS5yZWZlclVybCA9IHRoaXMuc3BtU291cmNlO1xuICAgIF9kYXRhLnJlZmVyU3BtID0gdGhpcy5yZWZlclNwbTtcbiAgICBzZW5kR29sZExvZyhfZGF0YSk7XG4gIH1cbiAgLyoqXG4gICAqIOmFjee9ruaOpeWPo+ivt+axguWujOaIkFxuICAgKi9cbiAgb25Db21wbGV0ZShkYXRhKSB7XG4gICAgaWYgKGRhdGEuaXNTdWNjZXNzICYmIGRhdGEucmVzdWx0ICYmIGRhdGEucmVzdWx0LmRhdGEpIHtcbiAgICAgIHRoaXMuaXNMb2FkZWREYXRhID0gdHJ1ZTtcbiAgICAgIHRoaXMuaXNMb2FkaW5nID0gZmFsc2U7XG4gICAgICB0aGlzLnBsYXlQYWdlRGF0YSA9IHRoaXMudHJhbnNsYXRlUGFnZURhdGEoZGF0YS5yZXN1bHQuZGF0YSk7XG4gICAgICB0aGlzLiRhcHBseSgpO1xuICAgICAgdGhpcy5zZW5kTG9nKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucmV0cnlDb3VudCsrO1xuICAgICAgaWYgKHRoaXMucmV0cnlDb3VudCA8PSAxKSB7XG4gICAgICAgIHRoaXMucmV0cnlDb3VudCsrO1xuICAgICAgICB0aGlzLnJlcXVlc3RQYWdlRGF0YSgpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICB0aGlzLmlzRXJyb3IgPSB0cnVlO1xuICAgICAgdGhpcy5pc0xvYWRpbmcgPSBmYWxzZTtcbiAgICAgIHRoaXMuZXJyb3JUeXBlID0gJ25vY29ubmVjdCc7XG4gICAgICB0aGlzLiRhcHBseSgpO1xuICAgIH1cbiAgfVxuICAvKipcbiAgICog5YiH5o2i6KeG6aKR5pe25pWw5o2u6YeN572uXG4gICAqL1xuICByZXNldERhdGEoKSB7XG4gICAgdGhpcy5wbGF5UGFnZURhdGEgPSBudWxsO1xuICAgIHRoaXMucmV0cnlDb3VudCA9IDA7XG4gICAgdGhpcy5jb3ZlclVSTCA9ICcnO1xuICAgIHRoaXMuaXNMb2FkZWREYXRhID0gZmFsc2U7XG5cbiAgICBpZiAodGhpcy5uZXR3b3JrVHlwZSA9PT0gJ25vbmUnKSB7XG4gICAgICB0aGlzLmlzTG9hZGluZyA9IGZhbHNlO1xuICAgICAgdGhpcy5pc0Vycm9yID0gdHJ1ZTtcbiAgICAgIHRoaXMuZXJyb3JUeXBlID0gJ25vbmV0d29yayc7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuaXNMb2FkaW5nID0gdHJ1ZTtcbiAgICAgIHRoaXMuaXNFcnJvciA9IGZhbHNlO1xuICAgIH1cbiAgICBjb25zdCBfcGFyYW1zID0ge307XG4gICAgaWYgKHRoaXMuc2hvd2lkKSB7XG4gICAgICBfcGFyYW1zLnNob3dJZCA9IHRoaXMuc2hvd2lkO1xuICAgIH0gZWxzZSB7XG4gICAgICBfcGFyYW1zLnZpZGVvSWQgPSB0aGlzLnZpZDtcbiAgICB9XG4gICAgX3BhcmFtcy50YXJnZXRVcmwgPSAneW91a3U6Ly9wbGF5JztcbiAgICB0aGlzLm9wZW5BcHBQYXJhbSA9IEpTT04uc3RyaW5naWZ5KF9wYXJhbXMpO1xuICB9XG4gIC8qKlxuICAgKiDovazmjaLmkq3mlL7pobXor6bmg4XmlbDmja5cbiAgICogQHBhcmFtIHtPYmplY3R9IHJlcyDov5Tlm57mlbDmja7otYTmupBcbiAgICovXG4gIHRyYW5zbGF0ZVBhZ2VEYXRhKHJlcykge1xuICAgIGxldCByZXN1bHQgPSBudWxsO1xuXG4gICAgbGV0IHRhZ3MgPSBbXTsgLy8g55yL5piv5ZCm5ZyobXTphY3nva50YWfkuK1cbiAgICBjb25zdCBfc3BtQ29uZmlnID0gREVGQVVMVF9EQVRBLlNQTV9DT05GSUdbdGhpcy5wYWdlSWRdO1xuICAgIGZvciAobGV0IGl0ZW0gaW4gdGhpcy5wYWdlQ29uZmlnKSB7XG4gICAgICBsZXQgaXRlbXRhZyA9IHRoaXMucGFnZUNvbmZpZ1tpdGVtXS50YWc7XG4gICAgICBpZiAoaXRlbXRhZykge1xuICAgICAgICBsZXQgYXJyID0gaXRlbXRhZy5zcGxpdCgnLCcpO1xuICAgICAgICB0YWdzID0gdGFncy5jb25jYXQoYXJyKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHJlcyAmJiByZXMuZGF0YSAmJiByZXMuZGF0YS5kYXRhKSB7XG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCBjdXJyZW50VmlkID0gcmVzLmRhdGEuZGF0YS5leHRyYS52aWRlb0lkO1xuXG4gICAgICAgIGNvbnN0IG1vZHVsZVJlc3VsdCA9IHJlcy5kYXRhLmRhdGEubW9kdWxlUmVzdWx0O1xuICAgICAgICBjb25zdCBtb2R1bGVzID0gbW9kdWxlUmVzdWx0Lm1vZHVsZXM7XG4gICAgICAgIGNvbnN0IHRlbXBvYmogPSBuZXcgTWFwKCk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbW9kdWxlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGNvbnN0IGNvbXBvbmVudHMgPSBtb2R1bGVzW2ldLmNvbXBvbmVudHMgfHwgW107XG4gICAgICAgICAgY29uc3QgY29tcG9uZW50SXRlbSA9IGNvbXBvbmVudHNbMF0gfHwge307XG4gICAgICAgICAgY29uc3QgdGVtcGxhdGUgPSBjb21wb25lbnRJdGVtLnRlbXBsYXRlIHx8IHt9O1xuICAgICAgICAgIGNvbnN0IHRhZyA9IHRlbXBsYXRlLnByaW9yaXR5VGFnIHx8IHRlbXBsYXRlLnRhZztcbiAgICAgICAgICBjb21wb25lbnRJdGVtLnRpdGxlID0gbW9kdWxlc1tpXS50aXRsZTtcbiAgICAgICAgICBjb21wb25lbnRJdGVtLnNwbSA9IGAke19zcG1Db25maWcuc3BtfS4ke21vZHVsZXNbaV0ubW9kdWxlSWR9LiR7Y29tcG9uZW50SXRlbS5jb21wb25lbnRJZH1gO1xuICAgICAgICAgIGNvbnN0IGlzSW4gPSB0YWdzLmZpbmQoKHZhbHVlKSA9PiB2YWx1ZSA9PT0gdGFnKTtcbiAgICAgICAgICBpZiAoaXNJbikge1xuICAgICAgICAgICAgdGVtcG9iai5zZXQodGFnLCBjb21wb25lbnRJdGVtKTtcbiAgICAgICAgICAgIC8vIOWPkemAgeaooeWdl+aXpeW/l1xuICAgICAgICAgICAgY29uc3QgX2RhdGEgPSB7fTtcbiAgICAgICAgICAgIGNvbnN0IF9tb2R1bGVzVGl0bGUgPSB0aGlzLnZpZGVvRGF0YS50aXRsZSB8fCAn5LyY6YW36KeG6aKRJztcbiAgICAgICAgICAgIF9kYXRhLnRpdGxlID0gX21vZHVsZXNUaXRsZSArICdfJyArIG1vZHVsZXNbaV0udGl0bGU7XG4gICAgICAgICAgICBfZGF0YS51cmwgPSBfc3BtQ29uZmlnLnBhZ2U7XG4gICAgICAgICAgICBfZGF0YS5zcG0gPSBgJHtfc3BtQ29uZmlnLnNwbX0uJHttb2R1bGVzW2ldLm1vZHVsZUlkfS4wYDtcbiAgICAgICAgICAgIF9kYXRhLnJlZmVyVXJsID0gdGhpcy5zcG1Tb3VyY2U7XG4gICAgICAgICAgICBfZGF0YS5yZWZlclNwbSA9IHRoaXMucmVmZXJTcG07XG4gICAgICAgICAgICBzZW5kR29sZExvZyhfZGF0YSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJlc3VsdCA9IHt9O1xuICAgICAgICByZXN1bHQuY3VycmVudFZpZCA9IGN1cnJlbnRWaWQ7XG4gICAgICAgIHJlc3VsdC5wbGF5ZXJNb2R1bGVzID0gdGVtcG9iajtcbiAgICAgICAgcmVzdWx0Lm9yaWdpbkRhdGEgPSByZXMuZGF0YS5kYXRhO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG4gIC8qKlxuICAgKiDliqDovb3lrozmiJAsIOWIpOaWree9kee7nOaDheWGtVxuICAgKi9cbiAgb25Mb2FkKHBhcmFtcykge1xuICAgIC8vIOS/neivgeWQjOatpeaJp+ihjO+8muivt+axguaSreaUvumhtemFjee9ruaOpeWPo++8jOiuvue9ruinhumikWlk6I635Y+W6aG16Z2i5L+h5oGvXG4gICAgd2VweS5nZXROZXR3b3JrVHlwZSh7XG4gICAgICBjb21wbGV0ZTogKHJlcykgPT4ge1xuICAgICAgICBpZiAocmVzLm5ldHdvcmtUeXBlKSB7XG4gICAgICAgICAgdGhpcy5uZXR3b3JrVHlwZSA9IHJlcy5uZXR3b3JrVHlwZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLm5ldHdvcmtUeXBlID0gJ25vbmUnO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucmVxdWVzdENvbmZpZyhwYXJhbXMpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHdlcHkub25OZXR3b3JrU3RhdHVzQ2hhbmdlKChyZXN1bHQpID0+IHtcbiAgICAgIHRoaXMubmV0d29ya1R5cGUgPSByZXN1bHQubmV0d29ya1R5cGU7XG4gICAgICB0aGlzLiRhcHBseSgpO1xuICAgIH0pO1xuICB9XG4gIC8qKlxuICAgKiDor7fmsYLphY3nva7mlofku7ZcbiAgICovXG4gIHJlcXVlc3RDb25maWcocGFyYW1zKSB7XG4gICAgdGhpcy5wYWdlQ29uZmlnID0gREVGQVVMVF9EQVRBLlBBR0VfQ09ORklHO1xuICAgIGNvbnN0IG9wdGlvbnMgPSB7fTtcbiAgICBvcHRpb25zLnVybCA9IFVSTF9BRERSRVNTLlBMQVlfUEFHRV9DT05GSUc7XG4gICAgb3B0aW9ucy5jYWxsYmFjayA9IChkYXRhKSA9PiB7XG4gICAgICB0aGlzLnBhZ2VDb25maWdDb21wbGV0ZShkYXRhLCBwYXJhbXMpO1xuICAgIH1cbiAgICByZXF1ZXN0RGF0YShvcHRpb25zKTtcbiAgfVxuICAvKipcbiAgICog5pKt5pS+6aG16YWN572u5Yqg6L295a6M5oiQXG4gICAqL1xuICBwYWdlQ29uZmlnQ29tcGxldGUoZGF0YSwgcGFyYW1zKSB7XG4gICAgaWYgKGRhdGEuaXNTdWNjZXNzICYmIGRhdGEucmVzdWx0ICYmIGRhdGEucmVzdWx0LmRhdGEpIHtcbiAgICAgIHRoaXMucGFnZUNvbmZpZyA9IGRhdGEucmVzdWx0LmRhdGE7XG4gICAgfVxuICAgIGlmIChwYXJhbXMuc291cmNlKSB7XG4gICAgICB0aGlzLnNvdXJjZSA9IHBhcmFtcy5zb3VyY2U7XG4gICAgICB0aGlzLnNwbVNvdXJjZSA9IHBhcmFtcy5zb3VyY2U7XG4gICAgfVxuICAgIGlmIChwYXJhbXMuc3BtKSB7XG4gICAgICB0aGlzLnJlZmVyU3BtID0gcGFyYW1zLnNwbTtcbiAgICB9XG4gICAgaWYgKHBhcmFtcy52aWRlb0lkKSB7XG4gICAgICB0aGlzLnZpZCA9IGRlY29kZVVSSUNvbXBvbmVudChwYXJhbXMudmlkZW9JZCk7XG4gICAgICBpZiAodGhpcy52aWQuaW5kZXhPZignPT0nKSA9PT0gLTEpIHtcbiAgICAgICAgdGhpcy52aWQgPSB0aGlzLnZpZCArICc9PSc7XG4gICAgICB9XG4gICAgfVxuICAgIC8vIHRoaXMudmlkID0gJ1hOakkzTnprMU9UTTI9PSc7XG4gICAgaWYgKHBhcmFtcy5zaG93SWQpIHtcbiAgICAgIHRoaXMuc2hvd2lkID0gZGVjb2RlVVJJQ29tcG9uZW50KHBhcmFtcy5zaG93SWQpO1xuICAgIH1cbiAgICB3ZXB5LmdldFN5c3RlbUluZm8oe1xuICAgICAgc3VjY2VzczogKHJlcykgPT4ge1xuICAgICAgICAvLyDorqHnrpfkuLvkvZPpg6jliIbpq5jluqYs5Y2V5L2N5Li6cHhcbiAgICAgICAgdGhpcy5zY3JvbGxIZWlnaHQgPSByZXMud2luZG93SGVpZ2h0IC0gMjExO1xuICAgICAgICB0aGlzLiRhcHBseSgpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIGlmIChwYXJhbXMuaW1hZ2UpIHtcbiAgICAgIHRoaXMuY292ZXJVUkwgPSBkZWNvZGVVUklDb21wb25lbnQocGFyYW1zLmltYWdlKTtcbiAgICB9XG4gICAgdGhpcy4kYXBwbHkoKTtcbiAgfVxuICAvLyDliIbkuqtcbiAgb25TaGFyZUFwcE1lc3NhZ2UoKSB7XG4gICAgbGV0IGRhdGEgPSBudWxsO1xuICAgIGlmICh0aGlzLnBsYXlQYWdlRGF0YSAmJiB0aGlzLnBsYXlQYWdlRGF0YS5vcmlnaW5EYXRhKSB7XG4gICAgICBkYXRhID0gdGhpcy5wbGF5UGFnZURhdGEub3JpZ2luRGF0YS5leHRyYTtcbiAgICB9XG4gICAgbGV0IHRpdGxlID0gZGF0YS5zaGFyZVRleHQgPyBkYXRhLnNoYXJlVGV4dCA6ICfkvJjphbfop4bpopEnO1xuICAgIGNvbnN0IG9iaiA9IHt9O1xuICAgIGNvbnN0IF9zcG1Db25maWcgPSBERUZBVUxUX0RBVEEuU1BNX0NPTkZJR1t0aGlzLnBhZ2VJZF07XG4gICAgb2JqLnNvdXJjZSA9IF9zcG1Db25maWcucGFnZSArICdfc2hhcmUnO1xuICAgIG9iai5zcG0gPSBgJHtfc3BtQ29uZmlnLnNwbX0uMC4xYDtcbiAgICBpZiAodGhpcy5zaG93aWQpIHtcbiAgICAgIG9iai5zaG93SWQgPSB0aGlzLnNob3dpZDtcbiAgICB9IGVsc2Uge1xuICAgICAgb2JqLnZpZGVvSWQgPSB0aGlzLnZpZDtcbiAgICB9XG4gICAgbGV0IHBhcmFtcyA9ICcnO1xuICAgIGZvciAodmFyIGtleSBpbiBvYmopIHtcbiAgICAgIHBhcmFtcyArPSAnJicgKyBrZXkgKyAnPScgKyBlbmNvZGVVUklDb21wb25lbnQob2JqW2tleV0pO1xuICAgIH1cbiAgICBwYXJhbXMgPSBwYXJhbXMuc3Vic3RyaW5nKDEsIHBhcmFtcy5sZW5ndGgpO1xuXG4gICAgbGV0IHBhdGggPSBgL3BhZ2VzL3BsYXkvcGxheT8ke3BhcmFtc31gO1xuICAgIGxldCBzaGFyZUltYWdlID0gbnVsbDtcbiAgICBpZiAodGhpcy5jb3ZlclVSTCkge1xuICAgICAgc2hhcmVJbWFnZSA9IGAke1VSTF9BRERSRVNTLlNIQVJFX0lNQUdFfT91cmw9JHt0aGlzLmNvdmVyVVJMfWA7XG4gICAgfVxuICAgIHN3aXRjaCAoZGF0YS52aWRlb0NhdGVnb3J5SWQpIHtcbiAgICAgIGNhc2UgOTc6IC8vIOeUteinhuWJp1xuICAgICAgICBpZiAoZGF0YS52aWRlb1R5cGVDb2RlID09PSAxKSB7XG4gICAgICAgICAgdGl0bGUgPSBgJHtkYXRhLnRpdGxlfSDnrKwke2RhdGEudmlkZW9TdGFnZX3pm4ZgXG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDk2OiAvLyDnlLXlvbFcbiAgICAgICAgaWYgKGRhdGEudmlkZW9UeXBlQ29kZSA9PT0gMSkge1xuICAgICAgICAgIC8vIOato+eJh1xuICAgICAgICAgIHRpdGxlID0gZGF0YS50aXRsZTtcbiAgICAgICAgICBpZiAoZGF0YS5zaG93U3VidGl0bGUpIHtcbiAgICAgICAgICAgIHRpdGxlICs9ICfvvJonICsgZGF0YS5zaG93U3VidGl0bGU7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChkYXRhLmltZ1Nob3cpIHtcbiAgICAgICAgICAgIHNoYXJlSW1hZ2UgPSBgJHtVUkxfQUREUkVTUy5TSEFSRV9JTUFHRX0/dXJsPSR7ZGF0YS5pbWdTaG93fWA7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAxMDA6IC8vIOWKqOa8q1xuICAgICAgY2FzZSA4NTogLy8g57u86Im6XG4gICAgICAgIHRpdGxlID0gYCR7ZGF0YS50aXRsZX0gJHtkYXRhLnZpZGVvVGl0bGV9YDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aXRsZSA9IGRhdGEudmlkZW9UaXRsZTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICB0aXRsZTogdGl0bGUsXG4gICAgICBwYXRoOiBwYXRoLFxuICAgICAgaW1hZ2VVcmw6IHNoYXJlSW1hZ2VcbiAgICB9O1xuICB9XG59XG4iXX0=