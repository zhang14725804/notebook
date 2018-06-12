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

var _line = require("./../../components/index/line.js");

var _line2 = _interopRequireDefault(_line);

var _defaultData = require("./../../config/default-data.js");

var _defaultData2 = _interopRequireDefault(_defaultData);

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

var Member = function(_wepy$page) {
    _inherits(Member, _wepy$page);
    function Member() {
        var _ref;
        var _temp, _this, _ret;
        _classCallCheck(this, Member);
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }
        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Member.__proto__ || Object.getPrototypeOf(Member)).call.apply(_ref, [ this ].concat(args))), 
        _this), _this.config = {
            navigationBarTitleText: "优酷视频",
            disableScroll: true
        }, _this.data = {
            pageId: "member",
            actionSheetHidden: true,
            actionSheetItems: [ "退出当前账号登录" ],
            // 是否登录
            isLogin: false,
            userInfo: null,
            // 防止按钮频繁点击
            isLocked: false,
            // 播放历史
            historyList: [],
            // 点赞列表
            upList: [],
            // passport SDK
            pspSdk: null
        }, _this.components = {
            line: _line2.default
        }, _this.events = {}, _this.watch = {
            userInfo: function userInfo(newValue) {
                _wepy2.default.setStorageSync("youku-userInfo", JSON.stringify(newValue));
            }
        }, _this.methods = {
            // 列表页
            onVideoListHandler: function onVideoListHandler(data) {
                var spmC = 1;
                if (data === "up") {
                    spmC = 2;
                    (0, _API.sendEventLog)({
                        eventCode: "00012"
                    });
                } else {
                    (0, _API.sendEventLog)({
                        eventCode: "00011"
                    });
                }
                var obj = {};
                var _spmConfig = _defaultData2.default.SPM_CONFIG[this.pageId];
                obj.source = _spmConfig.page;
                obj.spm = _spmConfig.spm + "." + spmC + ".0";
                obj.videoType = data;
                var params = "";
                for (var key in obj) {
                    params += "&" + key + "=" + encodeURIComponent(obj[key]);
                }
                params = params.substring(1, params.length);
                _wepy2.default.navigateTo({
                    url: "/pages/member/historyList?" + params
                });
            },
            // 播放视频
            onVideoPlayHandler: function onVideoPlayHandler(data) {
                var videoId = data.id;
                if (!videoId) return;
                var obj = {};
                var _spmConfig = _defaultData2.default.SPM_CONFIG[this.pageId];
                obj.source = _spmConfig.page;
                obj.spm = _spmConfig.spm + ".0.0";
                obj.videoId = videoId;
                var params = "";
                for (var key in obj) {
                    params += "&" + key + "=" + encodeURIComponent(obj[key]);
                }
                params = params.substring(1, params.length);
                _wepy2.default.navigateTo({
                    url: "/pages/play/play?" + params
                });
            },
            // 获取用户信息
            getUserInfoHandler: function getUserInfoHandler(res) {
                var _this2 = this;
                if (this.isLocked) return;
                (0, _API.sendEventLog)({
                    eventCode: "00009"
                });
                this.isLocked = true;
                var user = res.detail;
                this.userInfo = user.userInfo;
                this.pspSdk.needLogin({
                    userInfo: user,
                    success: function success(res) {
                        // 登录成功
                        (0, _API.sendEventLog)({
                            eventCode: "00010"
                        });
                        _this2.isLocked = false;
                        _this2.isLogin = true;
                        _this2.$apply();
                    },
                    fail: function fail() {
                        // 登录失败
                        _this2.isLocked = false;
                        _wepy2.default.showToast({
                            title: "登录失败",
                            icon: "none",
                            duration: 2e3
                        });
                    }
                });
                this.$apply();
            },
            // 选中Action Sheet
            onActionSheet: function onActionSheet(e) {
                this.actionSheetHidden = true;
                if (e.currentTarget.dataset.index === 0) {
                    this.pspSdk.logout();
                    this.isLogin = false;
                    this.userInfo = null;
                }
                this.$apply();
            },
            // 退出登录选项
            userClickHandler: function userClickHandler() {
                if (this.isLogin) {
                    this.actionSheetHidden = false;
                    this.$apply();
                }
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }
    _createClass(Member, [ {
        key: "onShow",
        value: function onShow() {
            var _this3 = this;
            this.isLocked = false;
            this.pspSdk = _wepy2.default.$instance.pspSdk;
            this.pspSdk.checkLogin({
                success: function success(isLogin) {
                    _this3.isLogin = isLogin;
                    _this3.$apply();
                }
            });
            // 未登录获取点赞数
                        if (_wepy2.default.getStorageSync("youku-userInfo")) {
                var userInfo = _wepy2.default.getStorageSync("youku-userInfo");
                try {
                    this.userInfo = JSON.parse(userInfo);
                } catch (e) {
                    console.log(e);
                }
            }
            // 未登录获取点赞数
                        if (_wepy2.default.getStorageSync("youku-upList")) {
                var upList = _wepy2.default.getStorageSync("youku-upList");
                try {
                    this.upList = JSON.parse(upList);
                } catch (e) {
                    console.log(e);
                }
            }
            if (_wepy2.default.getStorageSync("youku-historyList")) {
                var _historyList = _wepy2.default.getStorageSync("youku-historyList");
                try {
                    this.historyList = JSON.parse(_historyList);
                } catch (e) {
                    console.log(e);
                }
            }
            this.sendLog();
            this.$apply();
        }
        /**
     * 发送页面黄金令箭pv
     */    }, {
        key: "sendLog",
        value: function sendLog() {
            var _data = {};
            var _spmConfig = _defaultData2.default.SPM_CONFIG[this.pageId];
            _data.title = "个人中心";
            _data.url = _spmConfig.page;
            _data.spm = _spmConfig.spm + ".0.0";
            (0, _API.sendGoldLog)(_data);
        }
        // 分享
        }, {
        key: "onShareAppMessage",
        value: function onShareAppMessage() {
            var title = "优酷视频";
            var desc = "该视频来自「优酷」中国领先的视频网站,为您提供高清,流畅的视频体验";
            return {
                title: title,
                desc: desc
            };
        }
    } ]);
    return Member;
}(_wepy2.default.page);

Page(require("./../../npm/wepy/lib/wepy.js").default.$createPage(Member, "pages/member/member"));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1lbWJlci5qcyJdLCJuYW1lcyI6WyJNZW1iZXIiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiZGlzYWJsZVNjcm9sbCIsImRhdGEiLCJwYWdlSWQiLCJhY3Rpb25TaGVldEhpZGRlbiIsImFjdGlvblNoZWV0SXRlbXMiLCJpc0xvZ2luIiwidXNlckluZm8iLCJpc0xvY2tlZCIsImhpc3RvcnlMaXN0IiwidXBMaXN0IiwicHNwU2RrIiwiY29tcG9uZW50cyIsImxpbmUiLCJldmVudHMiLCJ3YXRjaCIsIm5ld1ZhbHVlIiwic2V0U3RvcmFnZVN5bmMiLCJKU09OIiwic3RyaW5naWZ5IiwibWV0aG9kcyIsIm9uVmlkZW9MaXN0SGFuZGxlciIsInNwbUMiLCJldmVudENvZGUiLCJvYmoiLCJfc3BtQ29uZmlnIiwiU1BNX0NPTkZJRyIsInNvdXJjZSIsInBhZ2UiLCJzcG0iLCJ2aWRlb1R5cGUiLCJwYXJhbXMiLCJrZXkiLCJlbmNvZGVVUklDb21wb25lbnQiLCJzdWJzdHJpbmciLCJsZW5ndGgiLCJuYXZpZ2F0ZVRvIiwidXJsIiwib25WaWRlb1BsYXlIYW5kbGVyIiwidmlkZW9JZCIsImlkIiwiZ2V0VXNlckluZm9IYW5kbGVyIiwicmVzIiwidXNlciIsImRldGFpbCIsIm5lZWRMb2dpbiIsInN1Y2Nlc3MiLCIkYXBwbHkiLCJmYWlsIiwic2hvd1RvYXN0IiwidGl0bGUiLCJpY29uIiwiZHVyYXRpb24iLCJvbkFjdGlvblNoZWV0IiwiZSIsImN1cnJlbnRUYXJnZXQiLCJkYXRhc2V0IiwiaW5kZXgiLCJsb2dvdXQiLCJ1c2VyQ2xpY2tIYW5kbGVyIiwiJGluc3RhbmNlIiwiY2hlY2tMb2dpbiIsImdldFN0b3JhZ2VTeW5jIiwicGFyc2UiLCJjb25zb2xlIiwibG9nIiwiX2hpc3RvcnlMaXN0Iiwic2VuZExvZyIsIl9kYXRhIiwiZGVzYyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7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TTNDLGFBQWEsc0JBQWFDLFVBQWIsQ0FBd0IsS0FBS3ZCLE1BQTdCLENBQW5CO0FBQ0FpRSxZQUFNbEIsS0FBTixHQUFjLE1BQWQ7QUFDQWtCLFlBQU0vQixHQUFOLEdBQVlaLFdBQVdHLElBQXZCO0FBQ0F3QyxZQUFNdkMsR0FBTixHQUFlSixXQUFXSSxHQUExQjtBQUNBLDRCQUFZdUMsS0FBWjtBQUNEO0FBQ0Q7Ozs7d0NBQ29CO0FBQ2xCLFVBQU1sQixRQUFRLE1BQWQ7QUFDQSxVQUFNbUIsT0FBTyxtQ0FBYjtBQUNBLGFBQU87QUFDTG5CLGVBQU9BLEtBREY7QUFFTG1CLGNBQU1BO0FBRkQsT0FBUDtBQUlEOzs7O0VBcExpQyxlQUFLekMsSTs7a0JBQXBCOUIsTSIsImZpbGUiOiJtZW1iZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xuaW1wb3J0IGxpbmUgZnJvbSAnQC9jb21wb25lbnRzL2luZGV4L2xpbmUnO1xuaW1wb3J0IERFRkFVTFRfREFUQSBmcm9tICdAL2NvbmZpZy9kZWZhdWx0LWRhdGEnO1xuaW1wb3J0IHsgc2VuZEdvbGRMb2csIHNlbmRFdmVudExvZyB9IGZyb20gJ0AvQVBJLyc7XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNZW1iZXIgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICBjb25maWcgPSB7XG4gICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+S8mOmFt+inhumikScsXG4gICAgZGlzYWJsZVNjcm9sbDogdHJ1ZVxuICB9O1xuICBkYXRhID0ge1xuICAgIHBhZ2VJZDogJ21lbWJlcicsXG4gICAgYWN0aW9uU2hlZXRIaWRkZW46IHRydWUsXG4gICAgYWN0aW9uU2hlZXRJdGVtczogWyfpgIDlh7rlvZPliY3otKblj7fnmbvlvZUnXSxcbiAgICAvLyDmmK/lkKbnmbvlvZVcbiAgICBpc0xvZ2luOiBmYWxzZSxcbiAgICB1c2VySW5mbzogbnVsbCxcbiAgICAvLyDpmLLmraLmjInpkq7popHnuYHngrnlh7tcbiAgICBpc0xvY2tlZDogZmFsc2UsXG4gICAgLy8g5pKt5pS+5Y6G5Y+yXG4gICAgaGlzdG9yeUxpc3Q6IFtdLFxuICAgIC8vIOeCuei1nuWIl+ihqFxuICAgIHVwTGlzdDogW10sXG4gICAgLy8gcGFzc3BvcnQgU0RLXG4gICAgcHNwU2RrOiBudWxsXG4gIH07XG4gIGNvbXBvbmVudHMgPSB7XG4gICAgbGluZTogbGluZVxuICB9O1xuICBldmVudHMgPSB7fTtcbiAgd2F0Y2ggPSB7XG4gICAgdXNlckluZm8obmV3VmFsdWUpIHtcbiAgICAgIHdlcHkuc2V0U3RvcmFnZVN5bmMoJ3lvdWt1LXVzZXJJbmZvJywgSlNPTi5zdHJpbmdpZnkobmV3VmFsdWUpKTtcbiAgICB9XG4gIH1cbiAgbWV0aG9kcyA9IHtcbiAgICAvLyDliJfooajpobVcbiAgICBvblZpZGVvTGlzdEhhbmRsZXIoZGF0YSkge1xuICAgICAgbGV0IHNwbUMgPSAxO1xuICAgICAgaWYgKGRhdGEgPT09ICd1cCcpIHtcbiAgICAgICAgc3BtQyA9IDI7XG4gICAgICAgIHNlbmRFdmVudExvZyh7ZXZlbnRDb2RlOiAnMDAwMTInfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzZW5kRXZlbnRMb2coe2V2ZW50Q29kZTogJzAwMDExJ30pO1xuICAgICAgfVxuICAgICAgY29uc3Qgb2JqID0ge307XG4gICAgICBjb25zdCBfc3BtQ29uZmlnID0gREVGQVVMVF9EQVRBLlNQTV9DT05GSUdbdGhpcy5wYWdlSWRdO1xuXG4gICAgICBvYmouc291cmNlID0gX3NwbUNvbmZpZy5wYWdlO1xuICAgICAgb2JqLnNwbSA9IGAke19zcG1Db25maWcuc3BtfS4ke3NwbUN9LjBgO1xuXG4gICAgICBvYmoudmlkZW9UeXBlID0gZGF0YTtcbiAgICAgIGxldCBwYXJhbXMgPSAnJztcbiAgICAgIGZvciAodmFyIGtleSBpbiBvYmopIHtcbiAgICAgICAgcGFyYW1zICs9ICcmJyArIGtleSArICc9JyArIGVuY29kZVVSSUNvbXBvbmVudChvYmpba2V5XSk7XG4gICAgICB9XG4gICAgICBwYXJhbXMgPSBwYXJhbXMuc3Vic3RyaW5nKDEsIHBhcmFtcy5sZW5ndGgpO1xuICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgdXJsOiBgL3BhZ2VzL21lbWJlci9oaXN0b3J5TGlzdD8ke3BhcmFtc31gXG4gICAgICB9KTtcbiAgICB9LFxuICAgIC8vIOaSreaUvuinhumikVxuICAgIG9uVmlkZW9QbGF5SGFuZGxlcihkYXRhKSB7XG4gICAgICBjb25zdCB2aWRlb0lkID0gZGF0YS5pZDtcbiAgICAgIGlmICghdmlkZW9JZCkgcmV0dXJuO1xuICAgICAgY29uc3Qgb2JqID0ge307XG4gICAgICBjb25zdCBfc3BtQ29uZmlnID0gREVGQVVMVF9EQVRBLlNQTV9DT05GSUdbdGhpcy5wYWdlSWRdO1xuXG4gICAgICBvYmouc291cmNlID0gX3NwbUNvbmZpZy5wYWdlO1xuICAgICAgb2JqLnNwbSA9IF9zcG1Db25maWcuc3BtICsgJy4wLjAnO1xuXG4gICAgICBvYmoudmlkZW9JZCA9IHZpZGVvSWQ7XG4gICAgICBsZXQgcGFyYW1zID0gJyc7XG4gICAgICBmb3IgKHZhciBrZXkgaW4gb2JqKSB7XG4gICAgICAgIHBhcmFtcyArPSAnJicgKyBrZXkgKyAnPScgKyBlbmNvZGVVUklDb21wb25lbnQob2JqW2tleV0pO1xuICAgICAgfVxuICAgICAgcGFyYW1zID0gcGFyYW1zLnN1YnN0cmluZygxLCBwYXJhbXMubGVuZ3RoKTtcbiAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgIHVybDogYC9wYWdlcy9wbGF5L3BsYXk/JHtwYXJhbXN9YFxuICAgICAgfSk7XG4gICAgfSxcbiAgICAvLyDojrflj5bnlKjmiLfkv6Hmga9cbiAgICBnZXRVc2VySW5mb0hhbmRsZXIocmVzKSB7XG4gICAgICBpZiAodGhpcy5pc0xvY2tlZCkgcmV0dXJuO1xuICAgICAgc2VuZEV2ZW50TG9nKHtldmVudENvZGU6ICcwMDAwOSd9KTtcblxuICAgICAgdGhpcy5pc0xvY2tlZCA9IHRydWU7XG4gICAgICBjb25zdCB1c2VyID0gcmVzLmRldGFpbDtcbiAgICAgIHRoaXMudXNlckluZm8gPSB1c2VyLnVzZXJJbmZvO1xuICAgICAgdGhpcy5wc3BTZGsubmVlZExvZ2luKHtcbiAgICAgICAgdXNlckluZm86IHVzZXIsXG4gICAgICAgIHN1Y2Nlc3M6IChyZXMpID0+IHtcbiAgICAgICAgICAvLyDnmbvlvZXmiJDlip9cbiAgICAgICAgICBzZW5kRXZlbnRMb2coe2V2ZW50Q29kZTogJzAwMDEwJ30pO1xuICAgICAgICAgIHRoaXMuaXNMb2NrZWQgPSBmYWxzZTtcbiAgICAgICAgICB0aGlzLmlzTG9naW4gPSB0cnVlO1xuICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XG4gICAgICAgIH0sXG4gICAgICAgIGZhaWw6ICgpID0+IHtcbiAgICAgICAgICAvLyDnmbvlvZXlpLHotKVcbiAgICAgICAgICB0aGlzLmlzTG9ja2VkID0gZmFsc2U7XG4gICAgICAgICAgd2VweS5zaG93VG9hc3Qoe1xuICAgICAgICAgICAgdGl0bGU6ICfnmbvlvZXlpLHotKUnLFxuICAgICAgICAgICAgaWNvbjogJ25vbmUnLFxuICAgICAgICAgICAgZHVyYXRpb246IDIwMDBcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICB0aGlzLiRhcHBseSgpO1xuICAgIH0sXG4gICAgLy8g6YCJ5LitQWN0aW9uIFNoZWV0XG4gICAgb25BY3Rpb25TaGVldChlKSB7XG4gICAgICB0aGlzLmFjdGlvblNoZWV0SGlkZGVuID0gdHJ1ZTtcbiAgICAgIGlmIChlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC5pbmRleCA9PT0gMCkge1xuICAgICAgICB0aGlzLnBzcFNkay5sb2dvdXQoKTtcbiAgICAgICAgdGhpcy5pc0xvZ2luID0gZmFsc2U7XG4gICAgICAgIHRoaXMudXNlckluZm8gPSBudWxsO1xuICAgICAgfVxuICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICB9LFxuICAgIC8vIOmAgOWHuueZu+W9lemAiemhuVxuICAgIHVzZXJDbGlja0hhbmRsZXIoKSB7XG4gICAgICBpZiAodGhpcy5pc0xvZ2luKSB7XG4gICAgICAgIHRoaXMuYWN0aW9uU2hlZXRIaWRkZW4gPSBmYWxzZTtcbiAgICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG4gIG9uU2hvdygpIHtcbiAgICB0aGlzLmlzTG9ja2VkID0gZmFsc2U7XG4gICAgdGhpcy5wc3BTZGsgPSB3ZXB5LiRpbnN0YW5jZS5wc3BTZGs7XG4gICAgdGhpcy5wc3BTZGsuY2hlY2tMb2dpbih7XG4gICAgICBzdWNjZXNzOiAoaXNMb2dpbikgPT4ge1xuICAgICAgICB0aGlzLmlzTG9naW4gPSBpc0xvZ2luO1xuICAgICAgICB0aGlzLiRhcHBseSgpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIC8vIOacqueZu+W9leiOt+WPlueCuei1nuaVsFxuICAgIGlmICh3ZXB5LmdldFN0b3JhZ2VTeW5jKCd5b3VrdS11c2VySW5mbycpKSB7XG4gICAgICBjb25zdCB1c2VySW5mbyA9IHdlcHkuZ2V0U3RvcmFnZVN5bmMoJ3lvdWt1LXVzZXJJbmZvJyk7XG4gICAgICB0cnkge1xuICAgICAgICB0aGlzLnVzZXJJbmZvID0gSlNPTi5wYXJzZSh1c2VySW5mbyk7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGUpO1xuICAgICAgfVxuICAgIH1cbiAgICAvLyDmnKrnmbvlvZXojrflj5bngrnotZ7mlbBcbiAgICBpZiAod2VweS5nZXRTdG9yYWdlU3luYygneW91a3UtdXBMaXN0JykpIHtcbiAgICAgIGNvbnN0IHVwTGlzdCA9IHdlcHkuZ2V0U3RvcmFnZVN5bmMoJ3lvdWt1LXVwTGlzdCcpO1xuICAgICAgdHJ5IHtcbiAgICAgICAgdGhpcy51cExpc3QgPSBKU09OLnBhcnNlKHVwTGlzdCk7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGUpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAod2VweS5nZXRTdG9yYWdlU3luYygneW91a3UtaGlzdG9yeUxpc3QnKSkge1xuICAgICAgY29uc3QgX2hpc3RvcnlMaXN0ID0gd2VweS5nZXRTdG9yYWdlU3luYygneW91a3UtaGlzdG9yeUxpc3QnKTtcbiAgICAgIHRyeSB7XG4gICAgICAgIHRoaXMuaGlzdG9yeUxpc3QgPSBKU09OLnBhcnNlKF9oaXN0b3J5TGlzdCk7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGUpO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLnNlbmRMb2coKTtcbiAgICB0aGlzLiRhcHBseSgpO1xuICB9XG4gIC8qKlxuICAgKiDlj5HpgIHpobXpnaLpu4Tph5Hku6Tnrq1wdlxuICAgKi9cbiAgc2VuZExvZygpIHtcbiAgICBjb25zdCBfZGF0YSA9IHt9O1xuICAgIGNvbnN0IF9zcG1Db25maWcgPSBERUZBVUxUX0RBVEEuU1BNX0NPTkZJR1t0aGlzLnBhZ2VJZF07XG4gICAgX2RhdGEudGl0bGUgPSAn5Liq5Lq65Lit5b+DJztcbiAgICBfZGF0YS51cmwgPSBfc3BtQ29uZmlnLnBhZ2U7XG4gICAgX2RhdGEuc3BtID0gYCR7X3NwbUNvbmZpZy5zcG19LjAuMGA7XG4gICAgc2VuZEdvbGRMb2coX2RhdGEpO1xuICB9XG4gIC8vIOWIhuS6q1xuICBvblNoYXJlQXBwTWVzc2FnZSgpIHtcbiAgICBjb25zdCB0aXRsZSA9ICfkvJjphbfop4bpopEnO1xuICAgIGNvbnN0IGRlc2MgPSAn6K+l6KeG6aKR5p2l6Ieq44CM5LyY6YW344CN5Lit5Zu96aKG5YWI55qE6KeG6aKR572R56uZLOS4uuaCqOaPkOS+m+mrmOa4hSzmtYHnlYXnmoTop4bpopHkvZPpqownO1xuICAgIHJldHVybiB7XG4gICAgICB0aXRsZTogdGl0bGUsXG4gICAgICBkZXNjOiBkZXNjXG4gICAgfTtcbiAgfVxufVxuIl19