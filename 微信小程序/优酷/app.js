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

var _wepy = require("./npm/wepy/lib/wepy.js");

var _wepy2 = _interopRequireDefault(_wepy);

require("./npm/wepy-async-function/index.js");

var _API = require("./API/index.js");

var _random = require("./utils/random.js");

var _random2 = _interopRequireDefault(_random);

var _defaultData = require("./config/default-data.js");

var _defaultData2 = _interopRequireDefault(_defaultData);

var _youkuPassportForWechatMiniprogramSdk = require("./npm/@ali/youku-passport-for-wechat-miniprogram-sdk/dist/index.js");

var _youkuPassportForWechatMiniprogramSdk2 = _interopRequireDefault(_youkuPassportForWechatMiniprogramSdk);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}

function _asyncToGenerator(fn) {
    return function() {
        var gen = fn.apply(this, arguments);
        return new Promise(function(resolve, reject) {
            function step(key, arg) {
                try {
                    var info = gen[key](arg);
                    var value = info.value;
                } catch (error) {
                    reject(error);
                    return;
                }
                if (info.done) {
                    resolve(value);
                } else {
                    return Promise.resolve(value).then(function(value) {
                        step("next", value);
                    }, function(err) {
                        step("throw", err);
                    });
                }
            }
            return step("next");
        });
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

var _default = function(_wepy$app) {
    _inherits(_default, _wepy$app);
    function _default() {
        _classCallCheck(this, _default);
        var _this = _possibleConstructorReturn(this, (_default.__proto__ || Object.getPrototypeOf(_default)).call(this));
        _this.config = {
            pages: [ "pages/index", "pages/play/play", "pages/play/webcontainer", "pages/brief/brief", "pages/member/member", "pages/brief/briefTags", "pages/member/historyList" ],
            window: {
                backgroundTextStyle: "light",
                navigationBarBackgroundColor: "#fff",
                navigationBarTitleText: "WeChat",
                navigationBarTextStyle: "black"
            },
            tabBar: {
                color: "#333333",
                selectedColor: "#2692FF",
                backgroundColor: "#fff",
                list: [ {
                    iconPath: "/image/index.png",
                    selectedIconPath: "/image/index-active.png",
                    pagePath: "pages/index",
                    text: "首页"
                }, {
                    iconPath: "/image/brief.png",
                    selectedIconPath: "/image/brief-active.png",
                    pagePath: "pages/brief/brief",
                    text: "短视频"
                }, {
                    iconPath: "/image/member.png",
                    selectedIconPath: "/image/member-active.png",
                    pagePath: "pages/member/member",
                    text: "我的"
                } ]
            }
        };
        _this.globalData = {
            netWork: {},
            navList: [ {
                pageId: "0",
                pageName: "精选"
            }, {
                pageId: "1",
                pageName: "剧集"
            }, {
                pageId: "2",
                pageName: "电影"
            }, {
                pageId: "3",
                pageName: "综艺"
            }, {
                pageId: "4",
                pageName: "动漫"
            } ]
        };
        _this.use("requestfix");
        return _this;
    }
    _createClass(_default, [ {
        key: "onShow",
        value: function onShow(opt) {
            this.startTime = new Date().getTime();
            this.isSendLog = false;
            var pspConfig = _defaultData2.default.PASSPORT_CONFIG;
            // if (DEFAULT_DATA.ENV) {
            //   pspConfig = DEFAULT_DATA.PASSPORT_ENV_CONFIG;
            // }
                        this.pspSdk = new _youkuPassportForWechatMiniprogramSdk2.default({
                pid: pspConfig.pid,
                appid: pspConfig.appId,
                navigateBack: opt
            });
        }
    }, {
        key: "onHide",
        value: function onHide() {
            if (this.isSendLog) return;
            var stayTime = new Date().getTime() - this.startTime;
            this.isSendLog = true;
            this.sendLog(stayTime);
        }
        /**
     * 发送小程序停留日志
     */    }, {
        key: "sendLog",
        value: function sendLog(time) {
            var options = {};
            options.url = _API.URL_ADDRESS.TS_LOG;
            var data = {};
            data.staytime = time;
            data.t = new Date().getTime();
            options.data = data;
            options.callback = function(res) {};
            (0, _API.requestData)(options);
        }
    }, {
        key: "onLaunch",
        value: function onLaunch() {
            // this.testAsync();
            this.getNavInfo();
            this.getStorageData();
            // this.getNetWork();
                }
    }, {
        key: "getStorageData",
        value: function getStorageData() {
            var uuid = _wepy2.default.getStorageSync("youku-uuid");
            if (!uuid) {
                uuid = _random2.default.rand(32, 16).toLowerCase();
                _wepy2.default.setStorageSync("youku-uuid", uuid);
            }
        }
    }, {
        key: "sleep",
        value: function sleep(s) {
            return new Promise(function(resolve, reject) {
                setTimeout(function() {
                    resolve("promise resolved");
                }, s * 1e3);
            });
        }
    }, {
        key: "getNetWork",
        value: function getNetWork() {
            var _this2 = this;
            _wepy2.default.getNetworkType({
                success: function success(res) {
                    _this2.globalData.netWork = res;
                }
            });
            _wepy2.default.onNetworkStatusChange(function(result) {
                _this2.globalData.netWork = result;
            });
        }
    }, {
        key: "getNavInfo",
        value: function getNavInfo() {
            var _this3 = this;
            var options = {};
            options.url = _API.URL_ADDRESS.GET_INDEX_NAV;
            options.sign = true;
            options.callback = function(res) {
                if (res.result.data) {
                    var _result = res.result.data.data;
                    if (_result && _result.list) {
                        _this3.globalData.navList = _result.list.slice(0, 5);
                    }
                }
            };
            (0, _API.requestData)(options);
        }
    }, {
        key: "testAsync",
        value: function() {
            var _ref = _asyncToGenerator(/* */ regeneratorRuntime.mark(function _callee() {
                var data;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                          case 0:
                            _context.next = 2;
                            return this.sleep(3);

                          case 2:
                            data = _context.sent;
                            console.log(data);

                          case 4:
                          case "end":
                            return _context.stop();
                        }
                    }
                }, _callee, this);
            }));
            function testAsync() {
                return _ref.apply(this, arguments);
            }
            return testAsync;
        }()
        /**
     * 返回小程序
     */    }, {
        key: "backToMiniProgram",
        value: function backToMiniProgram() {
            _wepy2.default.navigateBackMiniProgram({
                extraData: {
                    foo: "bar"
                },
                success: function success(res) {
                    // 返回成功
                }
            });
        }
    } ]);
    return _default;
}(_wepy2.default.app);

App(require("./npm/wepy/lib/wepy.js").default.$createApp(_default, {
    noPromiseAPI: [ "createSelectorQuery" ]
}));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJjb25maWciLCJwYWdlcyIsIndpbmRvdyIsImJhY2tncm91bmRUZXh0U3R5bGUiLCJuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIm5hdmlnYXRpb25CYXJUZXh0U3R5bGUiLCJ0YWJCYXIiLCJjb2xvciIsInNlbGVjdGVkQ29sb3IiLCJiYWNrZ3JvdW5kQ29sb3IiLCJsaXN0IiwiaWNvblBhdGgiLCJzZWxlY3RlZEljb25QYXRoIiwicGFnZVBhdGgiLCJ0ZXh0IiwiZ2xvYmFsRGF0YSIsIm5ldFdvcmsiLCJuYXZMaXN0IiwicGFnZUlkIiwicGFnZU5hbWUiLCJ1c2UiLCJvcHQiLCJzdGFydFRpbWUiLCJEYXRlIiwiZ2V0VGltZSIsImlzU2VuZExvZyIsInBzcENvbmZpZyIsIlBBU1NQT1JUX0NPTkZJRyIsInBzcFNkayIsInBpZCIsImFwcGlkIiwiYXBwSWQiLCJuYXZpZ2F0ZUJhY2siLCJzdGF5VGltZSIsInNlbmRMb2ciLCJ0aW1lIiwib3B0aW9ucyIsInVybCIsIlRTX0xPRyIsImRhdGEiLCJzdGF5dGltZSIsInQiLCJjYWxsYmFjayIsInJlcyIsImdldE5hdkluZm8iLCJnZXRTdG9yYWdlRGF0YSIsInV1aWQiLCJnZXRTdG9yYWdlU3luYyIsInJhbmQiLCJ0b0xvd2VyQ2FzZSIsInNldFN0b3JhZ2VTeW5jIiwicyIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0Iiwic2V0VGltZW91dCIsImdldE5ldHdvcmtUeXBlIiwic3VjY2VzcyIsIm9uTmV0d29ya1N0YXR1c0NoYW5nZSIsInJlc3VsdCIsIkdFVF9JTkRFWF9OQVYiLCJzaWduIiwiX3Jlc3VsdCIsInNsaWNlIiwic2xlZXAiLCJjb25zb2xlIiwibG9nIiwibmF2aWdhdGVCYWNrTWluaVByb2dyYW0iLCJleHRyYURhdGEiLCJmb28iLCJhcHAiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7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O0FBQWJ6QixvQjs7QUFDTjBCLHdCQUFRQyxHQUFSLENBQVkzQixJQUFaOzs7Ozs7Ozs7Ozs7Ozs7O0FBRUY7Ozs7Ozt3Q0FHb0I7QUFDbEIscUJBQUs0Qix1QkFBTCxDQUE2QjtBQUMzQkMsbUJBQVc7QUFDVEMsZUFBSztBQURJLFNBRGdCO0FBSTNCWixlQUoyQixtQkFJbkJkLEdBSm1CLEVBSWQ7QUFDWDtBQUNEO0FBTjBCLE9BQTdCO0FBUUQ7Ozs7RUExSjBCLGVBQUsyQixHIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XG5pbXBvcnQgJ3dlcHktYXN5bmMtZnVuY3Rpb24nO1xuaW1wb3J0IHsgVVJMX0FERFJFU1MsIHJlcXVlc3REYXRhIH0gZnJvbSAnQC9BUEkvJztcbmltcG9ydCBSYW5kb20gZnJvbSAnQC91dGlscy9yYW5kb20nO1xuaW1wb3J0IERFRkFVTFRfREFUQSBmcm9tICdAL2NvbmZpZy9kZWZhdWx0LWRhdGEnO1xuaW1wb3J0IFBzcFd4U0RLIGZyb20gJ0BhbGkveW91a3UtcGFzc3BvcnQtZm9yLXdlY2hhdC1taW5pcHJvZ3JhbS1zZGsnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIHdlcHkuYXBwIHtcbiAgY29uZmlnID0ge1xuICAgIHBhZ2VzOiBbXG4gICAgICAncGFnZXMvaW5kZXgnLFxuICAgICAgJ3BhZ2VzL3BsYXkvcGxheScsXG4gICAgICAncGFnZXMvcGxheS93ZWJjb250YWluZXInLFxuICAgICAgJ3BhZ2VzL2JyaWVmL2JyaWVmJyxcbiAgICAgICdwYWdlcy9tZW1iZXIvbWVtYmVyJyxcbiAgICAgICdwYWdlcy9icmllZi9icmllZlRhZ3MnLFxuICAgICAgJ3BhZ2VzL21lbWJlci9oaXN0b3J5TGlzdCdcbiAgICBdLFxuICAgIHdpbmRvdzoge1xuICAgICAgYmFja2dyb3VuZFRleHRTdHlsZTogJ2xpZ2h0JyxcbiAgICAgIG5hdmlnYXRpb25CYXJCYWNrZ3JvdW5kQ29sb3I6ICcjZmZmJyxcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICdXZUNoYXQnLFxuICAgICAgbmF2aWdhdGlvbkJhclRleHRTdHlsZTogJ2JsYWNrJ1xuICAgIH0sXG4gICAgdGFiQmFyOiB7XG4gICAgICBjb2xvcjogJyMzMzMzMzMnLFxuICAgICAgc2VsZWN0ZWRDb2xvcjogJyMyNjkyRkYnLFxuICAgICAgYmFja2dyb3VuZENvbG9yOiAnI2ZmZicsXG4gICAgICBsaXN0OiBbXG4gICAgICAgIHtcbiAgICAgICAgICBpY29uUGF0aDogJy9pbWFnZS9pbmRleC5wbmcnLFxuICAgICAgICAgIHNlbGVjdGVkSWNvblBhdGg6ICcvaW1hZ2UvaW5kZXgtYWN0aXZlLnBuZycsXG4gICAgICAgICAgcGFnZVBhdGg6ICdwYWdlcy9pbmRleCcsXG4gICAgICAgICAgdGV4dDogJ+mmlumhtSdcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIGljb25QYXRoOiAnL2ltYWdlL2JyaWVmLnBuZycsXG4gICAgICAgICAgc2VsZWN0ZWRJY29uUGF0aDogJy9pbWFnZS9icmllZi1hY3RpdmUucG5nJyxcbiAgICAgICAgICBwYWdlUGF0aDogJ3BhZ2VzL2JyaWVmL2JyaWVmJyxcbiAgICAgICAgICB0ZXh0OiAn55+t6KeG6aKRJ1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgaWNvblBhdGg6ICcvaW1hZ2UvbWVtYmVyLnBuZycsXG4gICAgICAgICAgc2VsZWN0ZWRJY29uUGF0aDogJy9pbWFnZS9tZW1iZXItYWN0aXZlLnBuZycsXG4gICAgICAgICAgcGFnZVBhdGg6ICdwYWdlcy9tZW1iZXIvbWVtYmVyJyxcbiAgICAgICAgICB0ZXh0OiAn5oiR55qEJ1xuICAgICAgICB9XG4gICAgICBdXG4gICAgfVxuICB9XG4gIGdsb2JhbERhdGEgPSB7XG4gICAgbmV0V29yazoge30sXG4gICAgbmF2TGlzdDogW1xuICAgICAge3BhZ2VJZDogJzAnLCBwYWdlTmFtZTogJ+eyvumAiSd9LFxuICAgICAge3BhZ2VJZDogJzEnLCBwYWdlTmFtZTogJ+WJp+mbhid9LFxuICAgICAge3BhZ2VJZDogJzInLCBwYWdlTmFtZTogJ+eUteW9sSd9LFxuICAgICAge3BhZ2VJZDogJzMnLCBwYWdlTmFtZTogJ+e7vOiJuid9LFxuICAgICAge3BhZ2VJZDogJzQnLCBwYWdlTmFtZTogJ+WKqOa8qyd9XG4gICAgXVxuICB9XG5cbiAgY29uc3RydWN0b3IgKCkge1xuICAgIHN1cGVyKClcbiAgICB0aGlzLnVzZSgncmVxdWVzdGZpeCcpXG4gIH1cbiAgb25TaG93KG9wdCkge1xuICAgIHRoaXMuc3RhcnRUaW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgdGhpcy5pc1NlbmRMb2cgPSBmYWxzZTtcblxuICAgIGxldCBwc3BDb25maWcgPSBERUZBVUxUX0RBVEEuUEFTU1BPUlRfQ09ORklHO1xuICAgIC8vIGlmIChERUZBVUxUX0RBVEEuRU5WKSB7XG4gICAgLy8gICBwc3BDb25maWcgPSBERUZBVUxUX0RBVEEuUEFTU1BPUlRfRU5WX0NPTkZJRztcbiAgICAvLyB9XG4gICAgdGhpcy5wc3BTZGsgPSBuZXcgUHNwV3hTREsoe1xuICAgICAgcGlkOiBwc3BDb25maWcucGlkLFxuICAgICAgYXBwaWQ6IHBzcENvbmZpZy5hcHBJZCxcbiAgICAgIG5hdmlnYXRlQmFjazogb3B0XG4gICAgICAvLyBlbnY6ICd0cmlhbCcgLy8gJ2RldmVsb3AnICAncmVsZWFzZSdcbiAgICB9KTtcbiAgfVxuICBvbkhpZGUoKSB7XG4gICAgaWYgKHRoaXMuaXNTZW5kTG9nKSByZXR1cm47XG4gICAgY29uc3Qgc3RheVRpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKSAtIHRoaXMuc3RhcnRUaW1lO1xuICAgIHRoaXMuaXNTZW5kTG9nID0gdHJ1ZTtcbiAgICB0aGlzLnNlbmRMb2coc3RheVRpbWUpO1xuICB9XG4gIC8qKlxuICAgKiDlj5HpgIHlsI/nqIvluo/lgZznlZnml6Xlv5dcbiAgICovXG4gIHNlbmRMb2codGltZSkge1xuICAgIGNvbnN0IG9wdGlvbnMgPSB7fTtcbiAgICBvcHRpb25zLnVybCA9IFVSTF9BRERSRVNTLlRTX0xPRztcbiAgICBjb25zdCBkYXRhID0ge307XG4gICAgZGF0YS5zdGF5dGltZSA9IHRpbWU7XG4gICAgZGF0YS50ID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgb3B0aW9ucy5kYXRhID0gZGF0YTtcbiAgICBvcHRpb25zLmNhbGxiYWNrID0gKHJlcykgPT4ge1xuICAgIH07XG4gICAgcmVxdWVzdERhdGEob3B0aW9ucyk7XG4gIH1cbiAgb25MYXVuY2goKSB7XG4gICAgLy8gdGhpcy50ZXN0QXN5bmMoKTtcbiAgICB0aGlzLmdldE5hdkluZm8oKTtcbiAgICB0aGlzLmdldFN0b3JhZ2VEYXRhKCk7XG4gICAgLy8gdGhpcy5nZXROZXRXb3JrKCk7XG4gIH1cbiAgZ2V0U3RvcmFnZURhdGEoKSB7XG4gICAgbGV0IHV1aWQgPSB3ZXB5LmdldFN0b3JhZ2VTeW5jKCd5b3VrdS11dWlkJyk7XG4gICAgaWYgKCF1dWlkKSB7XG4gICAgICB1dWlkID0gUmFuZG9tLnJhbmQoMzIsIDE2KS50b0xvd2VyQ2FzZSgpO1xuICAgICAgd2VweS5zZXRTdG9yYWdlU3luYygneW91a3UtdXVpZCcsIHV1aWQpO1xuICAgIH1cbiAgfVxuICBzbGVlcCAocykge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgcmVzb2x2ZSgncHJvbWlzZSByZXNvbHZlZCcpXG4gICAgICB9LCBzICogMTAwMClcbiAgICB9KVxuICB9XG4gIGdldE5ldFdvcmsoKSB7XG4gICAgd2VweS5nZXROZXR3b3JrVHlwZSh7XG4gICAgICBzdWNjZXNzOiAocmVzKSA9PiB7XG4gICAgICAgIHRoaXMuZ2xvYmFsRGF0YS5uZXRXb3JrID0gcmVzO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHdlcHkub25OZXR3b3JrU3RhdHVzQ2hhbmdlKChyZXN1bHQpID0+IHtcbiAgICAgIHRoaXMuZ2xvYmFsRGF0YS5uZXRXb3JrID0gcmVzdWx0O1xuICAgIH0pO1xuICB9XG4gIGdldE5hdkluZm8oKSB7XG4gICAgY29uc3Qgb3B0aW9ucyA9IHt9O1xuICAgIG9wdGlvbnMudXJsID0gVVJMX0FERFJFU1MuR0VUX0lOREVYX05BVjtcbiAgICBvcHRpb25zLnNpZ24gPSB0cnVlO1xuICAgIG9wdGlvbnMuY2FsbGJhY2sgPSAocmVzKSA9PiB7XG4gICAgICBpZiAocmVzLnJlc3VsdC5kYXRhKSB7XG4gICAgICAgIGNvbnN0IF9yZXN1bHQgPSByZXMucmVzdWx0LmRhdGEuZGF0YTtcbiAgICAgICAgaWYgKF9yZXN1bHQgJiYgX3Jlc3VsdC5saXN0KSB7XG4gICAgICAgICAgdGhpcy5nbG9iYWxEYXRhLm5hdkxpc3QgPSBfcmVzdWx0Lmxpc3Quc2xpY2UoMCwgNSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuICAgIHJlcXVlc3REYXRhKG9wdGlvbnMpO1xuICB9XG5cbiAgYXN5bmMgdGVzdEFzeW5jICgpIHtcbiAgICBjb25zdCBkYXRhID0gYXdhaXQgdGhpcy5zbGVlcCgzKVxuICAgIGNvbnNvbGUubG9nKGRhdGEpXG4gIH1cbiAgLyoqXG4gICAqIOi/lOWbnuWwj+eoi+W6j1xuICAgKi9cbiAgYmFja1RvTWluaVByb2dyYW0oKSB7XG4gICAgd2VweS5uYXZpZ2F0ZUJhY2tNaW5pUHJvZ3JhbSh7XG4gICAgICBleHRyYURhdGE6IHtcbiAgICAgICAgZm9vOiAnYmFyJ1xuICAgICAgfSxcbiAgICAgIHN1Y2Nlc3MocmVzKSB7XG4gICAgICAgIC8vIOi/lOWbnuaIkOWKn1xuICAgICAgfVxuICAgIH0pXG4gIH1cbn1cbiJdfQ==