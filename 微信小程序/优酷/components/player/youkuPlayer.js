Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = undefined;

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

var _upsModel = require("./ups-model/index.js");

var _upsModel2 = _interopRequireDefault(_upsModel);

var _youkuPlayerLayer = require("./youkuPlayerLayer.js");

var _youkuPlayerLayer2 = _interopRequireDefault(_youkuPlayerLayer);

var _API = require("./../../API/index.js");

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

var YoukuPlayer = function(_wepy$component) {
    _inherits(YoukuPlayer, _wepy$component);
    function YoukuPlayer() {
        var _ref;
        var _temp, _this, _ret;
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }
        _classCallCheck(this, YoukuPlayer);
        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = YoukuPlayer.__proto__ || Object.getPrototypeOf(YoukuPlayer)).call.apply(_ref, [ this ].concat(args))), 
        _this), _this.watch = {
            vid: function vid(newValue, oldValue) {
                if (newValue === "") return;
                this.showid = "";
                this.reset();
            },
            showid: function showid(newValue, oldValue) {
                if (newValue === "") return;
                this.vid = "";
                this.reset();
            },
            replay: function replay(newValue) {
                if (newValue) {
                    this.startTime = 0;
                    this.playerRefrash();
                    this.replay = false;
                    this.$apply();
                }
            },
            pause: function pause(newValue, oldValue) {
                if (newValue) {
                    if (this.videoContext) this.videoContext.pause();
                }
            },
            videoUrl: function videoUrl(newValue) {
                if (this.autoplay && newValue) this.play();
            },
            isRefrash: function isRefrash(newValue, oldValue) {
                if (newValue === oldValue) return;
                if (newValue) {
                    this.reset();
                }
            },
            isUnLoad: function isUnLoad(newValue, oldValue) {
                if (newValue === oldValue) return;
                if (newValue) {
                    this.vid = "";
                    this.showid = "";
                    this.reset();
                }
            },
            isShow: function isShow(newValue, oldValue) {
                if (newValue === oldValue) return;
                if (newValue) {
                    this.getHistoryList();
                    this.$apply();
                }
            },
            panelName: function panelName(newValue, oldValue) {
                if (newValue === oldValue) return;
                if (newValue === "end") {
                    this.$emit("PLAYERPLAYEND");
                }
            },
            historyList: function historyList(newValue, oldValue) {
                if (newValue !== oldValue) {
                    _wepy2.default.setStorageSync("youku-historyList", JSON.stringify(newValue));
                }
            }
        }, _this.props = {
            vid: String,
            showid: String,
            // 嵌入播放器的来源 brief 短视频，play 播放页
            source: String,
            // 允许使用本地历史记录
            allowUseRecord: {
                type: Boolean,
                default: true
            },
            replay: {
                type: Boolean,
                default: false
            },
            isRefrash: {
                type: Boolean,
                default: false
            },
            isUnLoad: {
                type: Boolean,
                default: false
            },
            pause: {
                type: Boolean,
                twoWay: true
            },
            coverURL: {
                type: String,
                twoWay: true
            },
            fullScreen: {
                type: String,
                twoWay: true,
                default: false
            },
            isShow: {
                type: Boolean,
                default: false
            }
        }, _this.data = {
            currectStream: {},
            // 当前视频播放url
            videoUrl: "",
            // 自动播放
            autoplay: true,
            // 播放重试次数
            retryCount: 0,
            // 请求ups重试次数
            upsRetryCount: 0,
            // 是否显示Layer
            isShowLayer: false,
            // 提示面板类型
            panelName: "",
            // video Context
            videoContext: null,
            // 是否出错
            isError: false,
            // 网络类型
            networkType: "",
            // 打开app参数
            openAppParam: "",
            // 播放历史记录
            historyList: null,
            // 上次记录历史记录的时间
            recodeVideoTime: 0,
            // 视频id 数字
            vidNum: 0,
            // 播放视频开始时间 采用video原生的开始播放时间initial-time， 安卓下无法自动播放
            startTime: 0,
            // 是否是第一次触发timeupdate，用于发送过vv日志，定位开始播放时间
            isFirstUpdate: false,
            playTimer: 0
        }, _this.$repeat = {}, _this.$props = {
            YoukuPlayerLayer: {
                "xmlns:wx": "",
                "xmlns:v-bind": "",
                "v-bind:panelName.sync": "panelName",
                "v-bind:coverURL.sync": "coverURL",
                "v-bind:openAppParam.sync": "openAppParam"
            }
        }, _this.$events = {}, _this.components = {
            YoukuPlayerLayer: _youkuPlayerLayer2.default
        }, _this.events = {
            PLAYER_REPLAY: function PLAYER_REPLAY($event) {
                _this.replay = true;
                _this.$apply();
            },
            PLAYER_REFRASH: function PLAYER_REFRASH($event) {
                _this.playerRefrash();
            },
            PLAY: function PLAY($event) {
                _this.autoplay = true;
                if (_this.videoUrl) _this.play();
            }
        }, _this.methods = {
            onErrorHandler: function onErrorHandler(data) {
                if (this.playTimer) clearTimeout(this.playTimer);
                if (this.videoContext) this.videoContext.pause();
                this.retryCount++;
                if (this.retryCount < 2) {
                    if (this.currectStream && this.currectStream.segs[0] && this.currectStream.segs[0].src) {
                        this.videoUrl = this.currectStream.segs[0].src;
                        this.$apply();
                    }
                } else {
                    this.showError();
                }
            },
            onTimerHandler: function onTimerHandler(data) {
                if (!this.isFirstUpdate) {
                    if (this.startTime !== 0) {
                        this.videoContext.seek(this.startTime);
                    }
                    // 发送vv日志
                                        this.isFirstUpdate = true;
                    var options = {};
                    var _params = {};
                    _params.videoid = this.vidNum;
                    _params.ctype = "0517";
                    _params.sourcePage = this.source;
                    options.url = _API.URL_ADDRESS.VV_LOG;
                    options.data = _params;
                    options.callback = function(res) {
                        // complete
                    };
                    (0, _API.requestData)(options);
                }
                if (data.detail.currentTime - this.recodeVideoTime > 5 || data.detail.currentTime < this.recodeVideoTime) {
                    this.updataRecodeTime(data.detail.currentTime);
                }
                if (this.pause) this.pause = false;
                if (this.source !== "brief" && data.detail.currentTime > 390 && this.panelName !== "end") {
                    this.isShowLayer = true;
                    this.videoContext.pause();
                    this.panelName = "end";
                }
                this.$apply();
            },
            onFullHandler: function onFullHandler(e) {
                if (e.detail.fullScreen) {
                    (0, _API.sendEventLog)({
                        eventCode: "00003"
                    });
                } else {
                    (0, _API.sendEventLog)({
                        eventCode: "00004"
                    });
                }
                this.$apply();
            },
            onEndHandler: function onEndHandler() {
                this.isShowLayer = true;
                this.panelName = "end";
                this.$apply();
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }
    _createClass(YoukuPlayer, [ {
        key: "playerRefrash",
        value: function playerRefrash() {
            if (this.isError) {
                this.reset();
            } else {
                this.isShowLayer = false;
                this.videoContext.seek(0);
                this.play();
            }
        }
    }, {
        key: "_requestUps",
        value: function _requestUps() {
            var _this2 = this;
            if (this.networkType === "none") return;
            var _data = {};
            if (this.showid) {
                _data.showid = this.showid;
            }
            _data.vid = this.vid;
            _data.ccode = "0517";
            _data.client_ip = "192.168.1.1";
            _data.utid = "eWrCEmi2cFsCAWoLI41wnWhW";
            _data.client_ts = Date.now();
            (0, _API.getUpsData)(_data, function(res) {
                if (res.isSuccess && res.result && res.result.data) {
                    _this2.parseMeidaData(res.result.data, _data.vid);
                } else {
                    _this2.upsRetryCount++;
                    if (_this2.upsRetryCount < 4) {
                        _this2._requestUps();
                    } else {
                        _this2.showError();
                    }
                }
            });
        }
        /**
     * 更新历史记录进度
     */    }, {
        key: "updataRecodeTime",
        value: function updataRecodeTime(_time) {
            this.recodeVideoTime = _time.toFixed(2);
            for (var i = 0; i < this.historyList.length; i++) {
                if (this.historyList[i].idNum === this.vidNum) {
                    var _videoData = this.historyList.splice(i, 1)[0];
                    _videoData.currentTime = this.recodeVideoTime;
                    var _process = _videoData.currentTime / _videoData.duration * 100;
                    if (_process > 100) _process = 100;
                    _videoData.playProcess = parseInt(_process);
                    _videoData.timestamp = new Date().getTime();
                    this.historyList.splice(0, 0, _videoData);
                }
            }
        }
        /**
     * 解析播放服务返回数据
     */    }, {
        key: "parseMeidaData",
        value: function parseMeidaData(data, vid) {
            if (vid !== this.vid) return;
            var playlistData = new _upsModel2.default(data.data);
            this.vidNum = playlistData.videoData.id;
            if (playlistData.videoData.coverURL) this.coverURL = playlistData.videoData.coverURL;
            if (playlistData.videoData.isChannelVip || playlistData.videoData.isFee) {
                if (!playlistData.videoData.isTrial) {
                    this.showError("vip");
                    return;
                }
            }
            // 获取历史记录中是否包含当前视频
                        var isContain = false;
            for (var i = 0; i < this.historyList.length; i++) {
                if (this.historyList[i].idNum === playlistData.videoData.id) {
                    // 包含将该记录更新到第一条
                    var _videoData = this.historyList.splice(i, 1)[0];
                    _videoData.timestamp = new Date().getTime();
                    this.historyList.splice(0, 0, _videoData);
                    if (this.allowUseRecord) {
                        this.startTime = _videoData.currentTime;
                    } else {
                        this.startTime = 0;
                    }
                    isContain = true;
                    break;
                }
            }
            if (!isContain) {
                this.addHistory(playlistData);
            }
            var _streamData = playlistData.getMediaStreamData("mp4");
            if (_streamData && _streamData[0]) {
                this.currectStream = playlistData.getStreamByQuality(_streamData[0].id, "480p");
                if (!this.currectStream || !this.currectStream.streamURL) {
                    this.currectStream = _streamData[0].qualityList[0];
                    // 取最低清晰度
                                }
                if (this.currectStream && this.currectStream.streamURL) {
                    // if (this.currectStream && this.currectStream.segs[0] && this.currectStream.segs[0].src) {
                    this.videoUrl = this.currectStream.streamURL.replace("http://", "https://");
                    this.$apply();
                    // this.videoUrl = this.currectStream.segs[0].src;
                                } else {
                    this.showError();
                }
                // this.videoUrl = 'https://video-dev.github.io/streams/x36xhzz/x36xhzz.m3u8';
                        } else {
                this.showError();
            }
            this.$apply();
        }
        // 新增历史记录
        }, {
        key: "addHistory",
        value: function addHistory(playlistData) {
            // 不包含新增记录，判断历史记录总长度是否超过50,添加记录
            if (this.historyList.length > 49) {
                this.historyList.pop();
            }
            var _newVideoData = {};
            _newVideoData.duration = playlistData.videoData.duration;
            _newVideoData.id = playlistData.videoData.encodeId;
            _newVideoData.idNum = playlistData.videoData.id;
            _newVideoData.title = playlistData.videoData.title;
            _newVideoData.thumbnail = playlistData.videoData.coverURL;
            _newVideoData.showId = playlistData.showData.encodeId;
            _newVideoData.showName = playlistData.showData.title;
            _newVideoData.showThumbnail = playlistData.showData.showCoverURL;
            _newVideoData.timestamp = new Date().getTime();
            _newVideoData.currentTime = 0;
            _newVideoData.playProcess = 0;
            this.historyList.splice(0, 0, _newVideoData);
        }
        // 显示错误
        }, {
        key: "showError",
        value: function showError() {
            var errorPanel = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "error";
            if (errorPanel === "4g" || errorPanel === "init") {
                this.isError = false;
            } else {
                this.isError = true;
            }
            this.isShowLayer = true;
            this.panelName = errorPanel;
            this.$apply();
        }
        /**
     * 重置状态
     */    }, {
        key: "reset",
        value: function reset() {
            var _panelName = "init";
            if (this.videoContext) this.videoContext.pause();
            if (this.playTimer) clearTimeout(this.playTimer);
            this.autoplay = true;
            switch (this.networkType) {
              case "none":
                _panelName = "nonetwork";
                break;

              case "wifi":
                break;

              default:
                _panelName = "4g";
                this.autoplay = false;
                break;
            }
            this.isFirstUpdate = false;
            this.videoUrl = "";
            this.retryCount = 0;
            this.upsRetryCount = 0;
            this.errorMassage = "视频暂时无法播放，小酷正全力修复中，非常抱歉";
            this.showError(_panelName);
            this.recodeVideoTime = 0;
            this.$apply();
            if (!this.vid && !this.showid) return;
            this.getHistoryList();
            var _params = {};
            if (this.showid) {
                _params.showId = this.showid;
            } else {
                _params.videoId = this.vid;
            }
            _params.targetUrl = "youku://play";
            this.openAppParam = JSON.stringify(_params);
            this.$apply();
            this._requestUps();
        }
    }, {
        key: "getHistoryList",
        value: function getHistoryList() {
            this.historyList = [];
            if (_wepy2.default.getStorageSync("youku-historyList")) {
                var _list = _wepy2.default.getStorageSync("youku-historyList");
                if (_list) {
                    try {
                        this.historyList = JSON.parse(_list);
                    } catch (e) {
                        console.log(e);
                    }
                }
            }
        }
        /**
     * 播放
     */    }, {
        key: "play",
        value: function play() {
            var _this3 = this;
            if (this.playTimer) clearTimeout(this.playTimer);
            if (this.isShowLayer) {
                this.isShowLayer = false;
            }
            this.playTimer = setTimeout(function() {
                _this3.videoContext.play();
            }, 1e3);
            this.$apply();
        }
    }, {
        key: "onLoad",
        value: function onLoad() {
            var _this4 = this;
            this.videoContext = _wepy2.default.createVideoContext("youku-player", this);
            _wepy2.default.getNetworkType({
                complete: function complete(res) {
                    if (res.networkType) {
                        _this4.networkType = res.networkType;
                    } else {
                        _this4.networkType = "none";
                    }
                    _this4.$apply();
                    _this4.reset();
                }
            });
            _wepy2.default.onNetworkStatusChange(function(result) {
                _this4.networkType = result.networkType;
                _this4.$apply();
            });
        }
    } ]);
    return YoukuPlayer;
}(_wepy2.default.component);

exports.default = YoukuPlayer;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInlvdWt1UGxheWVyLmpzIl0sIm5hbWVzIjpbIllvdWt1UGxheWVyIiwid2F0Y2giLCJ2aWQiLCJuZXdWYWx1ZSIsIm9sZFZhbHVlIiwic2hvd2lkIiwicmVzZXQiLCJyZXBsYXkiLCJzdGFydFRpbWUiLCJwbGF5ZXJSZWZyYXNoIiwiJGFwcGx5IiwicGF1c2UiLCJ2aWRlb0NvbnRleHQiLCJ2aWRlb1VybCIsImF1dG9wbGF5IiwicGxheSIsImlzUmVmcmFzaCIsImlzVW5Mb2FkIiwiaXNTaG93IiwiZ2V0SGlzdG9yeUxpc3QiLCJwYW5lbE5hbWUiLCIkZW1pdCIsImhpc3RvcnlMaXN0Iiwic2V0U3RvcmFnZVN5bmMiLCJKU09OIiwic3RyaW5naWZ5IiwicHJvcHMiLCJTdHJpbmciLCJzb3VyY2UiLCJhbGxvd1VzZVJlY29yZCIsInR5cGUiLCJCb29sZWFuIiwiZGVmYXVsdCIsInR3b1dheSIsImNvdmVyVVJMIiwiZnVsbFNjcmVlbiIsImRhdGEiLCJjdXJyZWN0U3RyZWFtIiwicmV0cnlDb3VudCIsInVwc1JldHJ5Q291bnQiLCJpc1Nob3dMYXllciIsImlzRXJyb3IiLCJuZXR3b3JrVHlwZSIsIm9wZW5BcHBQYXJhbSIsInJlY29kZVZpZGVvVGltZSIsInZpZE51bSIsImlzRmlyc3RVcGRhdGUiLCJwbGF5VGltZXIiLCIkcmVwZWF0IiwiJHByb3BzIiwiJGV2ZW50cyIsImNvbXBvbmVudHMiLCJZb3VrdVBsYXllckxheWVyIiwiZXZlbnRzIiwiJGV2ZW50IiwibWV0aG9kcyIsIm9uRXJyb3JIYW5kbGVyIiwiY2xlYXJUaW1lb3V0Iiwic2VncyIsInNyYyIsInNob3dFcnJvciIsIm9uVGltZXJIYW5kbGVyIiwic2VlayIsIm9wdGlvbnMiLCJfcGFyYW1zIiwidmlkZW9pZCIsImN0eXBlIiwic291cmNlUGFnZSIsInVybCIsIlZWX0xPRyIsImNhbGxiYWNrIiwicmVzIiwiZGV0YWlsIiwiY3VycmVudFRpbWUiLCJ1cGRhdGFSZWNvZGVUaW1lIiwib25GdWxsSGFuZGxlciIsImUiLCJldmVudENvZGUiLCJvbkVuZEhhbmRsZXIiLCJfZGF0YSIsImNjb2RlIiwiY2xpZW50X2lwIiwidXRpZCIsImNsaWVudF90cyIsIkRhdGUiLCJub3ciLCJpc1N1Y2Nlc3MiLCJyZXN1bHQiLCJwYXJzZU1laWRhRGF0YSIsIl9yZXF1ZXN0VXBzIiwiX3RpbWUiLCJ0b0ZpeGVkIiwiaSIsImxlbmd0aCIsImlkTnVtIiwiX3ZpZGVvRGF0YSIsInNwbGljZSIsIl9wcm9jZXNzIiwiZHVyYXRpb24iLCJwbGF5UHJvY2VzcyIsInBhcnNlSW50IiwidGltZXN0YW1wIiwiZ2V0VGltZSIsInBsYXlsaXN0RGF0YSIsInZpZGVvRGF0YSIsImlkIiwiaXNDaGFubmVsVmlwIiwiaXNGZWUiLCJpc1RyaWFsIiwiaXNDb250YWluIiwiYWRkSGlzdG9yeSIsIl9zdHJlYW1EYXRhIiwiZ2V0TWVkaWFTdHJlYW1EYXRhIiwiZ2V0U3RyZWFtQnlRdWFsaXR5Iiwic3RyZWFtVVJMIiwicXVhbGl0eUxpc3QiLCJyZXBsYWNlIiwicG9wIiwiX25ld1ZpZGVvRGF0YSIsImVuY29kZUlkIiwidGl0bGUiLCJ0aHVtYm5haWwiLCJzaG93SWQiLCJzaG93RGF0YSIsInNob3dOYW1lIiwic2hvd1RodW1ibmFpbCIsInNob3dDb3ZlclVSTCIsImVycm9yUGFuZWwiLCJfcGFuZWxOYW1lIiwiZXJyb3JNYXNzYWdlIiwidmlkZW9JZCIsInRhcmdldFVybCIsImdldFN0b3JhZ2VTeW5jIiwiX2xpc3QiLCJwYXJzZSIsImNvbnNvbGUiLCJsb2ciLCJzZXRUaW1lb3V0IiwiY3JlYXRlVmlkZW9Db250ZXh0IiwiZ2V0TmV0d29ya1R5cGUiLCJjb21wbGV0ZSIsIm9uTmV0d29ya1N0YXR1c0NoYW5nZSIsImNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7SUFDcUJBLFc7Ozs7Ozs7Ozs7Ozs7O2dNQUNuQkMsSyxHQUFRO0FBQ05DLFNBRE0sZUFD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QUFpQjBGLFdBQVcsWUFBTTtBQUNoQyxlQUFLN0gsWUFBTCxDQUFrQkcsSUFBbEI7QUFDRCxPQUZnQixFQUVkLElBRmMsQ0FBakI7QUFHQSxXQUFLTCxNQUFMO0FBQ0Q7Ozs2QkFDUTtBQUFBOztBQUNQLFdBQUtFLFlBQUwsR0FBb0IsZUFBSzhILGtCQUFMLENBQXdCLGNBQXhCLEVBQXdDLElBQXhDLENBQXBCO0FBQ0EscUJBQUtDLGNBQUwsQ0FBb0I7QUFDbEJDLGtCQUFVLGtCQUFDckUsR0FBRCxFQUFTO0FBQ2pCLGNBQUlBLElBQUk3QixXQUFSLEVBQXFCO0FBQ25CLG1CQUFLQSxXQUFMLEdBQW1CNkIsSUFBSTdCLFdBQXZCO0FBQ0QsV0FGRCxNQUVPO0FBQ0wsbUJBQUtBLFdBQUwsR0FBbUIsTUFBbkI7QUFDRDtBQUNELGlCQUFLaEMsTUFBTDtBQUNBLGlCQUFLSixLQUFMO0FBQ0Q7QUFUaUIsT0FBcEI7QUFXQSxxQkFBS3VJLHFCQUFMLENBQTJCLFVBQUN0RCxNQUFELEVBQVk7QUFDckMsZUFBSzdDLFdBQUwsR0FBbUI2QyxPQUFPN0MsV0FBMUI7QUFDQSxlQUFLaEMsTUFBTDtBQUNELE9BSEQ7QUFJRDs7OztFQWpic0MsZUFBS29JLFM7O2tCQUF6QjlJLFciLCJmaWxlIjoieW91a3VQbGF5ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xuaW1wb3J0IFBsYXlMaXN0RGF0YSBmcm9tICcuL3Vwcy1tb2RlbCc7XG5pbXBvcnQgWW91a3VQbGF5ZXJMYXllciBmcm9tICcuL3lvdWt1UGxheWVyTGF5ZXInO1xuaW1wb3J0IHsgZ2V0VXBzRGF0YSwgc2VuZEV2ZW50TG9nLCBVUkxfQUREUkVTUywgcmVxdWVzdERhdGEgfSBmcm9tICdAL0FQSS8nO1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgWW91a3VQbGF5ZXIgZXh0ZW5kcyB3ZXB5LmNvbXBvbmVudCB7XG4gIHdhdGNoID0ge1xuICAgIHZpZChuZXdWYWx1ZSwgb2xkVmFsdWUpIHtcbiAgICAgIGlmIChuZXdWYWx1ZSA9PT0gJycpIHJldHVybjtcbiAgICAgIHRoaXMuc2hvd2lkID0gJyc7XG4gICAgICB0aGlzLnJlc2V0KCk7XG4gICAgfSxcbiAgICBzaG93aWQobmV3VmFsdWUsIG9sZFZhbHVlKSB7XG4gICAgICBpZiAobmV3VmFsdWUgPT09ICcnKSByZXR1cm47XG4gICAgICB0aGlzLnZpZCA9ICcnO1xuICAgICAgdGhpcy5yZXNldCgpO1xuICAgIH0sXG4gICAgcmVwbGF5KG5ld1ZhbHVlKSB7XG4gICAgICBpZiAobmV3VmFsdWUpIHtcbiAgICAgICAgdGhpcy5zdGFydFRpbWUgPSAwO1xuICAgICAgICB0aGlzLnBsYXllclJlZnJhc2goKTtcbiAgICAgICAgdGhpcy5yZXBsYXkgPSBmYWxzZTtcbiAgICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIHBhdXNlKG5ld1ZhbHVlLCBvbGRWYWx1ZSkge1xuICAgICAgaWYgKG5ld1ZhbHVlKSB7XG4gICAgICAgIGlmICh0aGlzLnZpZGVvQ29udGV4dCkgdGhpcy52aWRlb0NvbnRleHQucGF1c2UoKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIHZpZGVvVXJsKG5ld1ZhbHVlKSB7XG4gICAgICBpZiAodGhpcy5hdXRvcGxheSAmJiBuZXdWYWx1ZSkgdGhpcy5wbGF5KCk7XG4gICAgfSxcbiAgICBpc1JlZnJhc2gobmV3VmFsdWUsIG9sZFZhbHVlKSB7XG4gICAgICBpZiAobmV3VmFsdWUgPT09IG9sZFZhbHVlKSByZXR1cm47XG4gICAgICBpZiAobmV3VmFsdWUpIHtcbiAgICAgICAgdGhpcy5yZXNldCgpO1xuICAgICAgfVxuICAgIH0sXG4gICAgaXNVbkxvYWQobmV3VmFsdWUsIG9sZFZhbHVlKSB7XG4gICAgICBpZiAobmV3VmFsdWUgPT09IG9sZFZhbHVlKSByZXR1cm47XG4gICAgICBpZiAobmV3VmFsdWUpIHtcbiAgICAgICAgdGhpcy52aWQgPSAnJztcbiAgICAgICAgdGhpcy5zaG93aWQgPSAnJztcbiAgICAgICAgdGhpcy5yZXNldCgpO1xuICAgICAgfVxuICAgIH0sXG4gICAgaXNTaG93KG5ld1ZhbHVlLCBvbGRWYWx1ZSkge1xuICAgICAgaWYgKG5ld1ZhbHVlID09PSBvbGRWYWx1ZSkgcmV0dXJuO1xuICAgICAgaWYgKG5ld1ZhbHVlKSB7XG4gICAgICAgIHRoaXMuZ2V0SGlzdG9yeUxpc3QoKTtcbiAgICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIHBhbmVsTmFtZShuZXdWYWx1ZSwgb2xkVmFsdWUpIHtcbiAgICAgIGlmIChuZXdWYWx1ZSA9PT0gb2xkVmFsdWUpIHJldHVybjtcbiAgICAgIGlmIChuZXdWYWx1ZSA9PT0gJ2VuZCcpIHtcbiAgICAgICAgdGhpcy4kZW1pdCgnUExBWUVSUExBWUVORCcpO1xuICAgICAgfVxuICAgIH0sXG4gICAgaGlzdG9yeUxpc3QobmV3VmFsdWUsIG9sZFZhbHVlKSB7XG4gICAgICBpZiAobmV3VmFsdWUgIT09IG9sZFZhbHVlKSB7XG4gICAgICAgIHdlcHkuc2V0U3RvcmFnZVN5bmMoJ3lvdWt1LWhpc3RvcnlMaXN0JywgSlNPTi5zdHJpbmdpZnkobmV3VmFsdWUpKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG4gIHByb3BzID0ge1xuICAgIHZpZDogU3RyaW5nLFxuICAgIHNob3dpZDogU3RyaW5nLFxuICAgIC8vIOW1jOWFpeaSreaUvuWZqOeahOadpea6kCBicmllZiDnn63op4bpopHvvIxwbGF5IOaSreaUvumhtVxuICAgIHNvdXJjZTogU3RyaW5nLFxuICAgIC8vIOWFgeiuuOS9v+eUqOacrOWcsOWOhuWPsuiusOW9lVxuICAgIGFsbG93VXNlUmVjb3JkOiB7XG4gICAgICB0eXBlOiBCb29sZWFuLFxuICAgICAgZGVmYXVsdDogdHJ1ZVxuICAgIH0sXG4gICAgcmVwbGF5OiB7XG4gICAgICB0eXBlOiBCb29sZWFuLFxuICAgICAgZGVmYXVsdDogZmFsc2VcbiAgICB9LFxuICAgIGlzUmVmcmFzaDoge1xuICAgICAgdHlwZTogQm9vbGVhbixcbiAgICAgIGRlZmF1bHQ6IGZhbHNlXG4gICAgfSxcbiAgICBpc1VuTG9hZDoge1xuICAgICAgdHlwZTogQm9vbGVhbixcbiAgICAgIGRlZmF1bHQ6IGZhbHNlXG4gICAgfSxcbiAgICBwYXVzZToge1xuICAgICAgdHlwZTogQm9vbGVhbixcbiAgICAgIHR3b1dheTogdHJ1ZVxuICAgIH0sXG4gICAgY292ZXJVUkw6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIHR3b1dheTogdHJ1ZVxuICAgIH0sXG4gICAgZnVsbFNjcmVlbjoge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgdHdvV2F5OiB0cnVlLFxuICAgICAgZGVmYXVsdDogZmFsc2VcbiAgICB9LFxuICAgIGlzU2hvdzoge1xuICAgICAgdHlwZTogQm9vbGVhbixcbiAgICAgIGRlZmF1bHQ6IGZhbHNlXG4gICAgfVxuICB9O1xuICBkYXRhID0ge1xuICAgIGN1cnJlY3RTdHJlYW06IHt9LFxuICAgIC8vIOW9k+WJjeinhumikeaSreaUvnVybFxuICAgIHZpZGVvVXJsOiAnJyxcbiAgICAvLyDoh6rliqjmkq3mlL5cbiAgICBhdXRvcGxheTogdHJ1ZSxcbiAgICAvLyDmkq3mlL7ph43or5XmrKHmlbBcbiAgICByZXRyeUNvdW50OiAwLFxuICAgIC8vIOivt+axgnVwc+mHjeivleasoeaVsFxuICAgIHVwc1JldHJ5Q291bnQ6IDAsXG4gICAgLy8g5piv5ZCm5pi+56S6TGF5ZXJcbiAgICBpc1Nob3dMYXllcjogZmFsc2UsXG4gICAgLy8g5o+Q56S66Z2i5p2/57G75Z6LXG4gICAgcGFuZWxOYW1lOiAnJyxcbiAgICAvLyB2aWRlbyBDb250ZXh0XG4gICAgdmlkZW9Db250ZXh0OiBudWxsLFxuICAgIC8vIOaYr+WQpuWHuumUmVxuICAgIGlzRXJyb3I6IGZhbHNlLFxuICAgIC8vIOe9kee7nOexu+Wei1xuICAgIG5ldHdvcmtUeXBlOiAnJyxcbiAgICAvLyDmiZPlvIBhcHDlj4LmlbBcbiAgICBvcGVuQXBwUGFyYW06ICcnLFxuICAgIC8vIOaSreaUvuWOhuWPsuiusOW9lVxuICAgIGhpc3RvcnlMaXN0OiBudWxsLFxuICAgIC8vIOS4iuasoeiusOW9leWOhuWPsuiusOW9leeahOaXtumXtFxuICAgIHJlY29kZVZpZGVvVGltZTogMCxcbiAgICAvLyDop4bpopFpZCDmlbDlrZdcbiAgICB2aWROdW06IDAsXG4gICAgLy8g5pKt5pS+6KeG6aKR5byA5aeL5pe26Ze0IOmHh+eUqHZpZGVv5Y6f55Sf55qE5byA5aeL5pKt5pS+5pe26Ze0aW5pdGlhbC10aW1l77yMIOWuieWNk+S4i+aXoOazleiHquWKqOaSreaUvlxuICAgIHN0YXJ0VGltZTogMCxcbiAgICAvLyDmmK/lkKbmmK/nrKzkuIDmrKHop6blj5F0aW1ldXBkYXRl77yM55So5LqO5Y+R6YCB6L+Hdnbml6Xlv5fvvIzlrprkvY3lvIDlp4vmkq3mlL7ml7bpl7RcbiAgICBpc0ZpcnN0VXBkYXRlOiBmYWxzZSxcbiAgICBwbGF5VGltZXI6IDBcbiAgfTtcbiAkcmVwZWF0ID0ge307XHJcbiRwcm9wcyA9IHtcIllvdWt1UGxheWVyTGF5ZXJcIjp7XCJ4bWxuczp3eFwiOlwiXCIsXCJ4bWxuczp2LWJpbmRcIjpcIlwiLFwidi1iaW5kOnBhbmVsTmFtZS5zeW5jXCI6XCJwYW5lbE5hbWVcIixcInYtYmluZDpjb3ZlclVSTC5zeW5jXCI6XCJjb3ZlclVSTFwiLFwidi1iaW5kOm9wZW5BcHBQYXJhbS5zeW5jXCI6XCJvcGVuQXBwUGFyYW1cIn19O1xyXG4kZXZlbnRzID0ge307XHJcbiBjb21wb25lbnRzID0ge1xuICAgIFlvdWt1UGxheWVyTGF5ZXI6IFlvdWt1UGxheWVyTGF5ZXJcbiAgfTtcbiAgZXZlbnRzID0ge1xuICAgICdQTEFZRVJfUkVQTEFZJzogKCRldmVudCwgLi4uYXJncykgPT4ge1xuICAgICAgdGhpcy5yZXBsYXkgPSB0cnVlO1xuICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICB9LFxuICAgICdQTEFZRVJfUkVGUkFTSCc6ICgkZXZlbnQsIC4uLmFyZ3MpID0+IHtcbiAgICAgIHRoaXMucGxheWVyUmVmcmFzaCgpO1xuICAgIH0sXG4gICAgJ1BMQVknOiAoJGV2ZW50LCAuLi5hcmdzKSA9PiB7XG4gICAgICB0aGlzLmF1dG9wbGF5ID0gdHJ1ZTtcbiAgICAgIGlmICh0aGlzLnZpZGVvVXJsKSB0aGlzLnBsYXkoKTtcbiAgICB9XG4gIH07XG4gIG1ldGhvZHMgPSB7XG4gICAgb25FcnJvckhhbmRsZXIoZGF0YSkge1xuICAgICAgaWYgKHRoaXMucGxheVRpbWVyKSBjbGVhclRpbWVvdXQodGhpcy5wbGF5VGltZXIpO1xuICAgICAgaWYgKHRoaXMudmlkZW9Db250ZXh0KSB0aGlzLnZpZGVvQ29udGV4dC5wYXVzZSgpO1xuICAgICAgdGhpcy5yZXRyeUNvdW50Kys7XG4gICAgICBpZiAodGhpcy5yZXRyeUNvdW50IDwgMikge1xuICAgICAgICBpZiAodGhpcy5jdXJyZWN0U3RyZWFtICYmIHRoaXMuY3VycmVjdFN0cmVhbS5zZWdzWzBdICYmIHRoaXMuY3VycmVjdFN0cmVhbS5zZWdzWzBdLnNyYykge1xuICAgICAgICAgIHRoaXMudmlkZW9VcmwgPSB0aGlzLmN1cnJlY3RTdHJlYW0uc2Vnc1swXS5zcmM7XG4gICAgICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5zaG93RXJyb3IoKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIG9uVGltZXJIYW5kbGVyKGRhdGEpIHtcbiAgICAgIGlmICghdGhpcy5pc0ZpcnN0VXBkYXRlKSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXJ0VGltZSAhPT0gMCkge1xuICAgICAgICAgIHRoaXMudmlkZW9Db250ZXh0LnNlZWsodGhpcy5zdGFydFRpbWUpO1xuICAgICAgICB9XG4gICAgICAgIC8vIOWPkemAgXZ25pel5b+XXG4gICAgICAgIHRoaXMuaXNGaXJzdFVwZGF0ZSA9IHRydWU7XG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSB7fTtcbiAgICAgICAgY29uc3QgX3BhcmFtcyA9IHt9O1xuICAgICAgICBfcGFyYW1zLnZpZGVvaWQgPSB0aGlzLnZpZE51bTtcbiAgICAgICAgX3BhcmFtcy5jdHlwZSA9ICcwNTE3JztcbiAgICAgICAgX3BhcmFtcy5zb3VyY2VQYWdlID0gdGhpcy5zb3VyY2U7XG4gICAgICAgIG9wdGlvbnMudXJsID0gVVJMX0FERFJFU1MuVlZfTE9HO1xuICAgICAgICBvcHRpb25zLmRhdGEgPSBfcGFyYW1zO1xuICAgICAgICBvcHRpb25zLmNhbGxiYWNrID0gKHJlcykgPT4ge1xuICAgICAgICAgIC8vIGNvbXBsZXRlXG4gICAgICAgIH07XG4gICAgICAgIHJlcXVlc3REYXRhKG9wdGlvbnMpXG4gICAgICB9XG4gICAgICBpZiAoZGF0YS5kZXRhaWwuY3VycmVudFRpbWUgLSB0aGlzLnJlY29kZVZpZGVvVGltZSA+IDUgfHwgZGF0YS5kZXRhaWwuY3VycmVudFRpbWUgPCB0aGlzLnJlY29kZVZpZGVvVGltZSkge1xuICAgICAgICB0aGlzLnVwZGF0YVJlY29kZVRpbWUoZGF0YS5kZXRhaWwuY3VycmVudFRpbWUpO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMucGF1c2UpIHRoaXMucGF1c2UgPSBmYWxzZTtcbiAgICAgIGlmICh0aGlzLnNvdXJjZSAhPT0gJ2JyaWVmJyAmJiBkYXRhLmRldGFpbC5jdXJyZW50VGltZSA+IDM5MCAmJiB0aGlzLnBhbmVsTmFtZSAhPT0gJ2VuZCcpIHtcbiAgICAgICAgdGhpcy5pc1Nob3dMYXllciA9IHRydWU7XG4gICAgICAgIHRoaXMudmlkZW9Db250ZXh0LnBhdXNlKCk7XG4gICAgICAgIHRoaXMucGFuZWxOYW1lID0gJ2VuZCc7XG4gICAgICB9XG4gICAgICB0aGlzLiRhcHBseSgpO1xuICAgIH0sXG4gICAgb25GdWxsSGFuZGxlcihlKSB7XG4gICAgICBpZiAoZS5kZXRhaWwuZnVsbFNjcmVlbikge1xuICAgICAgICBzZW5kRXZlbnRMb2coe2V2ZW50Q29kZTogJzAwMDAzJ30pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2VuZEV2ZW50TG9nKHtldmVudENvZGU6ICcwMDAwNCd9KTtcbiAgICAgIH1cbiAgICAgIHRoaXMuJGFwcGx5KCk7XG4gICAgfSxcbiAgICBvbkVuZEhhbmRsZXIoKSB7XG4gICAgICB0aGlzLmlzU2hvd0xheWVyID0gdHJ1ZTtcbiAgICAgIHRoaXMucGFuZWxOYW1lID0gJ2VuZCc7XG4gICAgICB0aGlzLiRhcHBseSgpO1xuICAgIH1cbiAgfTtcbiAgcGxheWVyUmVmcmFzaCgpIHtcbiAgICBpZiAodGhpcy5pc0Vycm9yKSB7XG4gICAgICB0aGlzLnJlc2V0KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuaXNTaG93TGF5ZXIgPSBmYWxzZTtcbiAgICAgIHRoaXMudmlkZW9Db250ZXh0LnNlZWsoMCk7XG4gICAgICB0aGlzLnBsYXkoKTtcbiAgICB9XG4gIH1cbiAgX3JlcXVlc3RVcHMoKSB7XG4gICAgaWYgKHRoaXMubmV0d29ya1R5cGUgPT09ICdub25lJykgcmV0dXJuO1xuICAgIGNvbnN0IF9kYXRhID0ge307XG4gICAgaWYgKHRoaXMuc2hvd2lkKSB7XG4gICAgICBfZGF0YS5zaG93aWQgPSB0aGlzLnNob3dpZDtcbiAgICB9XG4gICAgX2RhdGEudmlkID0gdGhpcy52aWQ7XG4gICAgX2RhdGEuY2NvZGUgPSAnMDUxNyc7XG4gICAgX2RhdGEuY2xpZW50X2lwID0gJzE5Mi4xNjguMS4xJztcbiAgICBfZGF0YS51dGlkID0gJ2VXckNFbWkyY0ZzQ0FXb0xJNDF3bldoVyc7XG4gICAgX2RhdGEuY2xpZW50X3RzID0gRGF0ZS5ub3coKTtcbiAgICBnZXRVcHNEYXRhKF9kYXRhLCAocmVzKSA9PiB7XG4gICAgICBpZiAocmVzLmlzU3VjY2VzcyAmJiByZXMucmVzdWx0ICYmIHJlcy5yZXN1bHQuZGF0YSkge1xuICAgICAgICB0aGlzLnBhcnNlTWVpZGFEYXRhKHJlcy5yZXN1bHQuZGF0YSwgX2RhdGEudmlkKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMudXBzUmV0cnlDb3VudCsrO1xuICAgICAgICBpZiAodGhpcy51cHNSZXRyeUNvdW50IDwgNCkge1xuICAgICAgICAgIHRoaXMuX3JlcXVlc3RVcHMoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnNob3dFcnJvcigpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbiAgLyoqXG4gICAqIOabtOaWsOWOhuWPsuiusOW9lei/m+W6plxuICAgKi9cbiAgdXBkYXRhUmVjb2RlVGltZShfdGltZSkge1xuICAgIHRoaXMucmVjb2RlVmlkZW9UaW1lID0gX3RpbWUudG9GaXhlZCgyKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuaGlzdG9yeUxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmICh0aGlzLmhpc3RvcnlMaXN0W2ldLmlkTnVtID09PSB0aGlzLnZpZE51bSkge1xuICAgICAgICBjb25zdCBfdmlkZW9EYXRhID0gdGhpcy5oaXN0b3J5TGlzdC5zcGxpY2UoaSwgMSlbMF07XG4gICAgICAgIF92aWRlb0RhdGEuY3VycmVudFRpbWUgPSB0aGlzLnJlY29kZVZpZGVvVGltZTtcbiAgICAgICAgbGV0IF9wcm9jZXNzID0gX3ZpZGVvRGF0YS5jdXJyZW50VGltZSAvIF92aWRlb0RhdGEuZHVyYXRpb24gKiAxMDA7XG4gICAgICAgIGlmIChfcHJvY2VzcyA+IDEwMCkgX3Byb2Nlc3MgPSAxMDA7XG4gICAgICAgIF92aWRlb0RhdGEucGxheVByb2Nlc3MgPSBwYXJzZUludChfcHJvY2Vzcyk7XG4gICAgICAgIF92aWRlb0RhdGEudGltZXN0YW1wID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgICAgIHRoaXMuaGlzdG9yeUxpc3Quc3BsaWNlKDAsIDAsIF92aWRlb0RhdGEpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICAvKipcbiAgICog6Kej5p6Q5pKt5pS+5pyN5Yqh6L+U5Zue5pWw5o2uXG4gICAqL1xuICBwYXJzZU1laWRhRGF0YShkYXRhLCB2aWQpIHtcbiAgICBpZiAodmlkICE9PSB0aGlzLnZpZCkgcmV0dXJuO1xuICAgIGNvbnN0IHBsYXlsaXN0RGF0YSA9IG5ldyBQbGF5TGlzdERhdGEoZGF0YS5kYXRhKTtcbiAgICB0aGlzLnZpZE51bSA9IHBsYXlsaXN0RGF0YS52aWRlb0RhdGEuaWQ7XG4gICAgaWYgKHBsYXlsaXN0RGF0YS52aWRlb0RhdGEuY292ZXJVUkwpIHRoaXMuY292ZXJVUkwgPSBwbGF5bGlzdERhdGEudmlkZW9EYXRhLmNvdmVyVVJMO1xuICAgIGlmIChwbGF5bGlzdERhdGEudmlkZW9EYXRhLmlzQ2hhbm5lbFZpcCB8fCBwbGF5bGlzdERhdGEudmlkZW9EYXRhLmlzRmVlKSB7XG4gICAgICBpZiAoIXBsYXlsaXN0RGF0YS52aWRlb0RhdGEuaXNUcmlhbCkge1xuICAgICAgICB0aGlzLnNob3dFcnJvcigndmlwJyk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG4gICAgLy8g6I635Y+W5Y6G5Y+y6K6w5b2V5Lit5piv5ZCm5YyF5ZCr5b2T5YmN6KeG6aKRXG4gICAgbGV0IGlzQ29udGFpbiA9IGZhbHNlO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5oaXN0b3J5TGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKHRoaXMuaGlzdG9yeUxpc3RbaV0uaWROdW0gPT09IHBsYXlsaXN0RGF0YS52aWRlb0RhdGEuaWQpIHtcbiAgICAgICAgLy8g5YyF5ZCr5bCG6K+l6K6w5b2V5pu05paw5Yiw56ys5LiA5p2hXG4gICAgICAgIGNvbnN0IF92aWRlb0RhdGEgPSB0aGlzLmhpc3RvcnlMaXN0LnNwbGljZShpLCAxKVswXTtcbiAgICAgICAgX3ZpZGVvRGF0YS50aW1lc3RhbXAgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICAgICAgdGhpcy5oaXN0b3J5TGlzdC5zcGxpY2UoMCwgMCwgX3ZpZGVvRGF0YSk7XG4gICAgICAgIGlmICh0aGlzLmFsbG93VXNlUmVjb3JkKSB7XG4gICAgICAgICAgdGhpcy5zdGFydFRpbWUgPSBfdmlkZW9EYXRhLmN1cnJlbnRUaW1lO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuc3RhcnRUaW1lID0gMDtcbiAgICAgICAgfVxuICAgICAgICBpc0NvbnRhaW4gPSB0cnVlO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKCFpc0NvbnRhaW4pIHtcbiAgICAgIHRoaXMuYWRkSGlzdG9yeShwbGF5bGlzdERhdGEpO1xuICAgIH1cbiAgICBjb25zdCBfc3RyZWFtRGF0YSA9IHBsYXlsaXN0RGF0YS5nZXRNZWRpYVN0cmVhbURhdGEoJ21wNCcpO1xuICAgIGlmIChfc3RyZWFtRGF0YSAmJiBfc3RyZWFtRGF0YVswXSkge1xuICAgICAgdGhpcy5jdXJyZWN0U3RyZWFtID0gcGxheWxpc3REYXRhLmdldFN0cmVhbUJ5UXVhbGl0eShfc3RyZWFtRGF0YVswXS5pZCwgJzQ4MHAnKTtcbiAgICAgIGlmICghdGhpcy5jdXJyZWN0U3RyZWFtIHx8ICF0aGlzLmN1cnJlY3RTdHJlYW0uc3RyZWFtVVJMKSB7XG4gICAgICAgIHRoaXMuY3VycmVjdFN0cmVhbSA9IF9zdHJlYW1EYXRhWzBdLnF1YWxpdHlMaXN0WzBdOyAvLyDlj5bmnIDkvY7muIXmmbDluqZcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLmN1cnJlY3RTdHJlYW0gJiYgdGhpcy5jdXJyZWN0U3RyZWFtLnN0cmVhbVVSTCkge1xuICAgICAgLy8gaWYgKHRoaXMuY3VycmVjdFN0cmVhbSAmJiB0aGlzLmN1cnJlY3RTdHJlYW0uc2Vnc1swXSAmJiB0aGlzLmN1cnJlY3RTdHJlYW0uc2Vnc1swXS5zcmMpIHtcbiAgICAgICAgdGhpcy52aWRlb1VybCA9IHRoaXMuY3VycmVjdFN0cmVhbS5zdHJlYW1VUkwucmVwbGFjZSgnaHR0cDovLycsICdodHRwczovLycpO1xuICAgICAgICB0aGlzLiRhcHBseSgpO1xuICAgICAgICAvLyB0aGlzLnZpZGVvVXJsID0gdGhpcy5jdXJyZWN0U3RyZWFtLnNlZ3NbMF0uc3JjO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5zaG93RXJyb3IoKTtcbiAgICAgIH1cbiAgICAgIC8vIHRoaXMudmlkZW9VcmwgPSAnaHR0cHM6Ly92aWRlby1kZXYuZ2l0aHViLmlvL3N0cmVhbXMveDM2eGh6ei94MzZ4aHp6Lm0zdTgnO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNob3dFcnJvcigpO1xuICAgIH1cbiAgICB0aGlzLiRhcHBseSgpO1xuICB9XG4gIC8vIOaWsOWinuWOhuWPsuiusOW9lVxuICBhZGRIaXN0b3J5KHBsYXlsaXN0RGF0YSkge1xuICAgIC8vIOS4jeWMheWQq+aWsOWinuiusOW9le+8jOWIpOaWreWOhuWPsuiusOW9leaAu+mVv+W6puaYr+WQpui2hei/hzUwLOa3u+WKoOiusOW9lVxuICAgIGlmICh0aGlzLmhpc3RvcnlMaXN0Lmxlbmd0aCA+IDQ5KSB7XG4gICAgICB0aGlzLmhpc3RvcnlMaXN0LnBvcCgpO1xuICAgIH1cbiAgICBjb25zdCBfbmV3VmlkZW9EYXRhID0ge307XG4gICAgX25ld1ZpZGVvRGF0YS5kdXJhdGlvbiA9IHBsYXlsaXN0RGF0YS52aWRlb0RhdGEuZHVyYXRpb247XG4gICAgX25ld1ZpZGVvRGF0YS5pZCA9IHBsYXlsaXN0RGF0YS52aWRlb0RhdGEuZW5jb2RlSWQ7XG4gICAgX25ld1ZpZGVvRGF0YS5pZE51bSA9IHBsYXlsaXN0RGF0YS52aWRlb0RhdGEuaWQ7XG4gICAgX25ld1ZpZGVvRGF0YS50aXRsZSA9IHBsYXlsaXN0RGF0YS52aWRlb0RhdGEudGl0bGU7XG4gICAgX25ld1ZpZGVvRGF0YS50aHVtYm5haWwgPSBwbGF5bGlzdERhdGEudmlkZW9EYXRhLmNvdmVyVVJMO1xuXG4gICAgX25ld1ZpZGVvRGF0YS5zaG93SWQgPSBwbGF5bGlzdERhdGEuc2hvd0RhdGEuZW5jb2RlSWQ7XG4gICAgX25ld1ZpZGVvRGF0YS5zaG93TmFtZSA9IHBsYXlsaXN0RGF0YS5zaG93RGF0YS50aXRsZTtcbiAgICBfbmV3VmlkZW9EYXRhLnNob3dUaHVtYm5haWwgPSBwbGF5bGlzdERhdGEuc2hvd0RhdGEuc2hvd0NvdmVyVVJMO1xuICAgIF9uZXdWaWRlb0RhdGEudGltZXN0YW1wID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgX25ld1ZpZGVvRGF0YS5jdXJyZW50VGltZSA9IDA7XG4gICAgX25ld1ZpZGVvRGF0YS5wbGF5UHJvY2VzcyA9IDA7XG4gICAgdGhpcy5oaXN0b3J5TGlzdC5zcGxpY2UoMCwgMCwgX25ld1ZpZGVvRGF0YSk7XG4gIH1cbiAgLy8g5pi+56S66ZSZ6K+vXG4gIHNob3dFcnJvcihlcnJvclBhbmVsID0gJ2Vycm9yJykge1xuICAgIGlmIChlcnJvclBhbmVsID09PSAnNGcnIHx8IGVycm9yUGFuZWwgPT09ICdpbml0Jykge1xuICAgICAgdGhpcy5pc0Vycm9yID0gZmFsc2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuaXNFcnJvciA9IHRydWU7XG4gICAgfVxuICAgIHRoaXMuaXNTaG93TGF5ZXIgPSB0cnVlO1xuICAgIHRoaXMucGFuZWxOYW1lID0gZXJyb3JQYW5lbDtcbiAgICB0aGlzLiRhcHBseSgpO1xuICB9XG4gIC8qKlxuICAgKiDph43nva7nirbmgIFcbiAgICovXG4gIHJlc2V0KCkge1xuICAgIGxldCBfcGFuZWxOYW1lID0gJ2luaXQnO1xuICAgIGlmICh0aGlzLnZpZGVvQ29udGV4dCkgdGhpcy52aWRlb0NvbnRleHQucGF1c2UoKTtcbiAgICBpZiAodGhpcy5wbGF5VGltZXIpIGNsZWFyVGltZW91dCh0aGlzLnBsYXlUaW1lcik7XG4gICAgdGhpcy5hdXRvcGxheSA9IHRydWU7XG4gICAgc3dpdGNoICh0aGlzLm5ldHdvcmtUeXBlKSB7XG4gICAgICBjYXNlICdub25lJzpcbiAgICAgICAgX3BhbmVsTmFtZSA9ICdub25ldHdvcmsnO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3dpZmknOlxuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIF9wYW5lbE5hbWUgPSAnNGcnO1xuICAgICAgICB0aGlzLmF1dG9wbGF5ID0gZmFsc2U7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgICB0aGlzLmlzRmlyc3RVcGRhdGUgPSBmYWxzZTtcbiAgICB0aGlzLnZpZGVvVXJsID0gJyc7XG4gICAgdGhpcy5yZXRyeUNvdW50ID0gMDtcbiAgICB0aGlzLnVwc1JldHJ5Q291bnQgPSAwO1xuICAgIHRoaXMuZXJyb3JNYXNzYWdlID0gJ+inhumikeaaguaXtuaXoOazleaSreaUvu+8jOWwj+mFt+ato+WFqOWKm+S/ruWkjeS4re+8jOmdnuW4uOaKseatiSc7XG4gICAgdGhpcy5zaG93RXJyb3IoX3BhbmVsTmFtZSk7XG4gICAgdGhpcy5yZWNvZGVWaWRlb1RpbWUgPSAwO1xuICAgIHRoaXMuJGFwcGx5KCk7XG5cbiAgICBpZiAoIXRoaXMudmlkICYmICF0aGlzLnNob3dpZCkgcmV0dXJuO1xuICAgdGhpcy5nZXRIaXN0b3J5TGlzdCgpO1xuICAgIGNvbnN0IF9wYXJhbXMgPSB7fTtcbiAgICBpZiAodGhpcy5zaG93aWQpIHtcbiAgICAgIF9wYXJhbXMuc2hvd0lkID0gdGhpcy5zaG93aWQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIF9wYXJhbXMudmlkZW9JZCA9IHRoaXMudmlkO1xuICAgIH1cbiAgICBfcGFyYW1zLnRhcmdldFVybCA9ICd5b3VrdTovL3BsYXknO1xuICAgIHRoaXMub3BlbkFwcFBhcmFtID0gSlNPTi5zdHJpbmdpZnkoX3BhcmFtcyk7XG5cbiAgICB0aGlzLiRhcHBseSgpO1xuICAgIHRoaXMuX3JlcXVlc3RVcHMoKTtcbiAgfVxuICBnZXRIaXN0b3J5TGlzdCgpIHtcbiAgICB0aGlzLmhpc3RvcnlMaXN0ID0gW107XG4gICAgaWYgKHdlcHkuZ2V0U3RvcmFnZVN5bmMoJ3lvdWt1LWhpc3RvcnlMaXN0JykpIHtcbiAgICAgIGNvbnN0IF9saXN0ID0gd2VweS5nZXRTdG9yYWdlU3luYygneW91a3UtaGlzdG9yeUxpc3QnKTtcbiAgICAgIGlmIChfbGlzdCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIHRoaXMuaGlzdG9yeUxpc3QgPSBKU09OLnBhcnNlKF9saXN0KTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIGNvbnNvbGUubG9nKGUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG4gIC8qKlxuICAgKiDmkq3mlL5cbiAgICovXG4gIHBsYXkoKSB7XG4gICAgaWYgKHRoaXMucGxheVRpbWVyKSBjbGVhclRpbWVvdXQodGhpcy5wbGF5VGltZXIpO1xuICAgIGlmICh0aGlzLmlzU2hvd0xheWVyKSB7XG4gICAgICB0aGlzLmlzU2hvd0xheWVyID0gZmFsc2U7XG4gICAgfVxuICAgIHRoaXMucGxheVRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLnZpZGVvQ29udGV4dC5wbGF5KCk7XG4gICAgfSwgMTAwMCk7XG4gICAgdGhpcy4kYXBwbHkoKTtcbiAgfVxuICBvbkxvYWQoKSB7XG4gICAgdGhpcy52aWRlb0NvbnRleHQgPSB3ZXB5LmNyZWF0ZVZpZGVvQ29udGV4dCgneW91a3UtcGxheWVyJywgdGhpcyk7XG4gICAgd2VweS5nZXROZXR3b3JrVHlwZSh7XG4gICAgICBjb21wbGV0ZTogKHJlcykgPT4ge1xuICAgICAgICBpZiAocmVzLm5ldHdvcmtUeXBlKSB7XG4gICAgICAgICAgdGhpcy5uZXR3b3JrVHlwZSA9IHJlcy5uZXR3b3JrVHlwZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLm5ldHdvcmtUeXBlID0gJ25vbmUnO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuJGFwcGx5KCk7XG4gICAgICAgIHRoaXMucmVzZXQoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICB3ZXB5Lm9uTmV0d29ya1N0YXR1c0NoYW5nZSgocmVzdWx0KSA9PiB7XG4gICAgICB0aGlzLm5ldHdvcmtUeXBlID0gcmVzdWx0Lm5ldHdvcmtUeXBlO1xuICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICB9KTtcbiAgfVxufVxuIl19