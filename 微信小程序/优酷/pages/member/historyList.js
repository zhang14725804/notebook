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

var _API = require("./../../API/index.js");

var _dataError = require("./../../components/common/dataError.js");

var _dataError2 = _interopRequireDefault(_dataError);

var _defaultData = require("./../../config/default-data.js");

var _defaultData2 = _interopRequireDefault(_defaultData);

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

var HistoryList = function(_wepy$page) {
    _inherits(HistoryList, _wepy$page);
    function HistoryList() {
        var _ref;
        var _temp, _this, _ret;
        _classCallCheck(this, HistoryList);
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }
        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = HistoryList.__proto__ || Object.getPrototypeOf(HistoryList)).call.apply(_ref, [ this ].concat(args))), 
        _this), _this.config = {
            navigationBarTitleText: "优酷视频",
            disableScroll: true
        }, _this.data = {
            pageId: "history",
            // 视频类型： up／history
            videoType: "",
            // 时间标签
            titleArray: [ "今天", "7天之内", "更早" ],
            // 划分时间视频列表
            videoTimeList: [],
            // 视频列表
            videoList: null,
            // 是否编辑
            isEdit: false,
            // 选中视频个数
            selectCount: 0,
            windowHeight: 0,
            // 是否出错／无内容
            isError: false,
            // 错误类型
            errorType: "nodataerror",
            // 错误提示
            errorContent: "",
            // 来源
            source: "",
            // 来源spm
            referSpm: ""
        }, _this.$repeat = {}, _this.$props = {
            dataerror: {
                "xmlns:v-bind": "",
                "v-bind:errorType.sync": "errorType",
                "v-bind:errorContent.sync": "errorContent"
            }
        }, _this.$events = {}, _this.components = {
            line: _line2.default,
            dataerror: _dataError2.default
        }, _this.watch = {
            videoList: function videoList(newValue) {
                // 判断无数据
                if (!newValue || newValue.length === 0) {
                    this.isError = true;
                    this.$apply();
                    return;
                } else {
                    this.isError = false;
                }
                // 重构视频数据，到今天 一周内 一个月内等
                                this.videoTimeList = [ [], [], [] ];
                for (var i = 0; i < this.videoList.length; i++) {
                    if (this.videoList[i].timestamp) {
                        if (new Date(this.videoList[i].timestamp).toDateString() === new Date().toDateString()) {
                            // 今天
                            this.videoTimeList[0].push(this.videoList[i]);
                        } else if (new Date(this.videoList[i].timestamp + 7 * 24 * 3600 * 1e3) > new Date()) {
                            // 7天之内
                            this.videoTimeList[1].push(this.videoList[i]);
                        } else {
                            // 更早
                            this.videoTimeList[2].push(this.videoList[i]);
                        }
                    }
                }
                this.$apply();
            }
        }, _this.methods = {
            onVideoHandler: function onVideoHandler(data, currentIndex, parentIndex) {
                if (this.isEdit) {
                    // 选中 取消选中
                    if (!data.selected) {
                        this.selectCount++;
                    } else {
                        this.selectCount--;
                    }
                    this.videoTimeList[parentIndex][currentIndex].selected = !data.selected;
                    this.$apply();
                } else {
                    // 跳转播放页
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
                }
            },
            selectTabs: function selectTabs(data) {
                switch (data) {
                  case "0":
                    this.resetStatus();
                    this.isEdit = true;
                    this.$apply();
                    break;

                  case "1":
                    this.isEdit = false;
                    this.$apply();
                    break;

                  case "2":
                    this.selectAllHandler();
                    break;

                  case "3":
                    this.delVideoHandler();
                    break;
                }
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }
    _createClass(HistoryList, [ {
        key: "resetStatus",
        /**
     * 重置选中状态
     */
        value: function resetStatus() {
            this.selectCount = 0;
            for (var i = 0; i < this.videoList.length; i++) {
                this.videoList[i].selected = false;
            }
        }
        /**
     * 全选
     */    }, {
        key: "selectAllHandler",
        value: function selectAllHandler() {
            if (this.selectCount === this.videoList.length) {
                // 取消全选
                this.selectCount = 0;
                for (var i = 0; i < this.videoList.length; i++) {
                    this.videoList[i].selected = false;
                }
            } else {
                // 全选
                this.selectCount = this.videoList.length;
                for (var _i = 0; _i < this.videoList.length; _i++) {
                    this.videoList[_i].selected = true;
                }
            }
            this.$apply();
        }
        /**
     * 删除
     */    }, {
        key: "delVideoHandler",
        value: function delVideoHandler() {
            var _this2 = this;
            if (this.selectCount === 0) return;
            var _content = "确定要删除选中的点赞视频吗？";
            if (this.videoType === "history") {
                _content = "确定要删除选中的历史记录吗？";
            }
            _wepy2.default.showModal({
                title: "",
                content: _content,
                success: function success(res) {
                    if (res.confirm) {
                        _this2.confirmDelComplete();
                    }
                }
            });
        }
        /**
     * 确认删除
     */    }, {
        key: "confirmDelComplete",
        value: function confirmDelComplete() {
            // 倒序删除，否则删除前面index会发生变化
            for (var i = this.videoList.length - 1; i > -1; i--) {
                if (this.videoList[i].selected) {
                    this.videoList.splice(i, 1);
                }
            }
            this.isEdit = false;
            _wepy2.default.showToast({
                title: "删除成功",
                icon: "success",
                duration: 2e3
            });
            this.$apply();
            _wepy2.default.setStorageSync("youku-" + this.videoType + "List", JSON.stringify(this.videoList));
        }
    }, {
        key: "onLoad",
        value: function onLoad(params) {
            var _this3 = this;
            _wepy2.default.getSystemInfo({
                success: function success(res) {
                    // 计算主体部分高度,单位为px,由于主体px和微信rpx之间换算差导致设置的
                    _this3.windowHeight = res.windowHeight;
                    _this3.$apply();
                }
            });
            if (params.videoType) {
                this.videoType = params.videoType;
            }
            if (params.source) {
                this.source = params.source;
            }
            if (params.spm) {
                this.referSpm = params.spm;
            }
            this.$apply();
        }
    }, {
        key: "onShow",
        value: function onShow() {
            this.videoList = [];
            if (_wepy2.default.getStorageSync("youku-" + this.videoType + "List")) {
                var _list = _wepy2.default.getStorageSync("youku-" + this.videoType + "List");
                if (_list) {
                    try {
                        this.videoList = JSON.parse(_list);
                    } catch (e) {
                        console.log(e);
                    }
                }
            }
            var _content = "亲，你还没有赞过的视频呦";
            var _title = "点赞记录";
            if (this.videoType === "history") {
                _content = "亲，你还没有观看记录呦";
                _title = "观看历史";
            }
            _wepy2.default.setNavigationBarTitle({
                title: _title
            });
            this.errorContent = _content;
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
            var _title = "点赞记录";
            var spmC = 2;
            if (this.videoType === "history") {
                _title = "观看历史";
                spmC = 1;
            }
            _data.title = _title;
            _data.url = _spmConfig.page;
            _data.spm = _spmConfig.spm + "." + spmC + ".0";
            _data.referUrl = this.source;
            _data.referSpm = this.referSpm;
            (0, _API.sendGoldLog)(_data);
        }
    } ]);
    return HistoryList;
}(_wepy2.default.page);

Page(require("./../../npm/wepy/lib/wepy.js").default.$createPage(HistoryList, "pages/member/historyList"));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhpc3RvcnlMaXN0LmpzIl0sIm5hbWVzIjpbIkhpc3RvcnlMaXN0IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRpc2FibGVTY3JvbGwiLCJkYXRhIiwicGFnZUlkIiwidmlkZW9UeXBlIiwidGl0bGVBcnJheSIsInZpZGVvVGltZUxpc3QiLCJ2aWRlb0xpc3QiLCJpc0VkaXQiLCJzZWxlY3RDb3VudCIsIndpbmRvd0hlaWdodCIsImlzRXJyb3IiLCJlcnJvclR5cGUiLCJlcnJvckNvbnRlbnQiLCJzb3VyY2UiLCJyZWZlclNwbSIsIiRyZXBlYXQiLCIkcHJvcHMiLCIkZXZlbnRzIiwiY29tcG9uZW50cyIsImxpbmUiLCJkYXRhZXJyb3IiLCJ3YXRjaCIsIm5ld1ZhbHVlIiwibGVuZ3RoIiwiJGFwcGx5IiwiaSIsInRpbWVzdGFtcCIsIkRhdGUiLCJ0b0RhdGVTdHJpbmciLCJwdXNoIiwibWV0aG9kcyIsIm9uVmlkZW9IYW5kbGVyIiwiY3VycmVudEluZGV4IiwicGFyZW50SW5kZXgiLCJzZWxlY3RlZCIsInZpZGVvSWQiLCJpZCIsIm9iaiIsIl9zcG1Db25maWciLCJTUE1fQ09ORklHIiwicGFnZSIsInNwbSIsInBhcmFtcyIsImtleSIsImVuY29kZVVSSUNvbXBvbmVudCIsInN1YnN0cmluZyIsIm5hdmlnYXRlVG8iLCJ1cmwiLCJzZWxlY3RUYWJzIiwicmVzZXRTdGF0dXMiLCJzZWxlY3RBbGxIYW5kbGVyIiwiZGVsVmlkZW9IYW5kbGVyIiwiX2NvbnRlbnQiLCJzaG93TW9kYWwiLCJ0aXRsZSIsImNvbnRlbnQiLCJzdWNjZXNzIiwicmVzIiwiY29uZmlybSIsImNvbmZpcm1EZWxDb21wbGV0ZSIsInNwbGljZSIsInNob3dUb2FzdCIsImljb24iLCJkdXJhdGlvbiIsInNldFN0b3JhZ2VTeW5jIiwiSlNPTiIsInN0cmluZ2lmeSIsImdldFN5c3RlbUluZm8iLCJnZXRTdG9yYWdlU3luYyIsIl9saXN0IiwicGFyc2UiLCJlIiwiY29uc29sZSIsImxvZyIsIl90aXRsZSIsInNldE5hdmlnYXRpb25CYXJUaXRsZSIsInNlbmRMb2ciLCJfZGF0YSIsInNwbUMiLCJyZWZlclVybCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUNxQkEsVzs7Ozs7Ozs7Ozs7Ozs7Z01BQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCLE1BRGpCO0FBRVBDLHFCQUFlO0FBRlIsSyxRQUlUQyxJLEdBQU87QUFDTEMsY0FBUSxTQURIO0FBRUw7QUFDQUMsaUJBQVcsRUFITjtBQUlMO0FBQ0FDLGtCQUFZLENBQUMsSUFBRCxFQUFPLE1BQVAsRUFBZSxJQUFmLENBTFA7QUFNTDtBQUNBQyxxQkFBZSxFQVBWO0FBUUw7QUFDQUMsaUJBQVcsSUFUTjtBQVVMO0FBQ0FDLGNBQVEsS0FYSDtBQVlMO0FBQ0FDLG1CQUFhLENBYlI7QUFjTEMsb0JBQWMsQ0FkVDtBQWVMO0FBQ0FDLGVBQVMsS0FoQko7QUFpQkw7QUFDQUMsaUJBQVcsYUFsQk47QUFtQkw7QUFDQUMsb0JBQWMsRUFwQlQ7QUFxQkw7QUFDQUMsY0FBUSxFQXRCSDtBQXVCTDtBQUNBQyxnQkFBVTtBQXhCTCxLLFFBMEJSQyxPLEdBQVUsRSxRQUNYQyxNLEdBQVMsRUFBQyxhQUFZLEVBQUMsZ0JBQWUsRUFBaEIsRUFBbUIseUJBQXdCLFdBQTNDLEVBQXVELDRCQUEyQixjQUFsRixFQUFiLEUsUUFDVEMsTyxHQUFVLEUsUUFDVEMsVSxHQUFhO0FBQ1ZDLDBCQURVO0FBRVZDO0FBRlUsSyxRQUlaQyxLLEdBQVE7QUFDTmYsZUFETSxxQkFDSWdCLFFBREosRUFDYztBQUNsQjtBQUNBLFlBQUksQ0FBQ0EsUUFBRCxJQUFhQSxTQUFTQyxNQUFULEtBQW9CLENBQXJDLEVBQXdDO0FBQ3RDLGVBQUtiLE9BQUwsR0FBZSxJQUFmO0FBQ0EsZUFBS2MsTUFBTDtBQUNBO0FBQ0QsU0FKRCxNQUlPO0FBQ0wsZUFBS2QsT0FBTCxHQUFlLEtBQWY7QUFD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RCxZQUFNdkIsS0FBTixHQUFjb0IsTUFBZDtBQUNBRyxZQUFNOUIsR0FBTixHQUFZVCxXQUFXRSxJQUF2QjtBQUNBcUMsWUFBTXBDLEdBQU4sR0FBZUgsV0FBV0csR0FBMUIsU0FBaUNxQyxJQUFqQztBQUNBRCxZQUFNRSxRQUFOLEdBQWlCLEtBQUtsRSxNQUF0QjtBQUNBZ0UsWUFBTS9ELFFBQU4sR0FBaUIsS0FBS0EsUUFBdEI7QUFDQSw0QkFBWStELEtBQVo7QUFDRDs7OztFQXZQc0MsZUFBS3JDLEk7O2tCQUF6QjNDLFciLCJmaWxlIjoiaGlzdG9yeUxpc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xuaW1wb3J0IGxpbmUgZnJvbSAnQC9jb21wb25lbnRzL2luZGV4L2xpbmUnO1xuaW1wb3J0IHsgc2VuZEdvbGRMb2cgfSBmcm9tICdAL0FQSS8nO1xuaW1wb3J0IERhdGFFcnJvciBmcm9tICdAL2NvbXBvbmVudHMvY29tbW9uL2RhdGFFcnJvcic7XG5pbXBvcnQgREVGQVVMVF9EQVRBIGZyb20gJ0AvY29uZmlnL2RlZmF1bHQtZGF0YSc7XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIaXN0b3J5TGlzdCBleHRlbmRzIHdlcHkucGFnZSB7XG4gIGNvbmZpZyA9IHtcbiAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5LyY6YW36KeG6aKRJyxcbiAgICBkaXNhYmxlU2Nyb2xsOiB0cnVlXG4gIH07XG4gIGRhdGEgPSB7XG4gICAgcGFnZUlkOiAnaGlzdG9yeScsXG4gICAgLy8g6KeG6aKR57G75Z6L77yaIHVw77yPaGlzdG9yeVxuICAgIHZpZGVvVHlwZTogJycsXG4gICAgLy8g5pe26Ze05qCH562+XG4gICAgdGl0bGVBcnJheTogWyfku4rlpKknLCAnN+WkqeS5i+WGhScsICfmm7Tml6knXSxcbiAgICAvLyDliJLliIbml7bpl7Top4bpopHliJfooahcbiAgICB2aWRlb1RpbWVMaXN0OiBbXSxcbiAgICAvLyDop4bpopHliJfooahcbiAgICB2aWRlb0xpc3Q6IG51bGwsXG4gICAgLy8g5piv5ZCm57yW6L6RXG4gICAgaXNFZGl0OiBmYWxzZSxcbiAgICAvLyDpgInkuK3op4bpopHkuKrmlbBcbiAgICBzZWxlY3RDb3VudDogMCxcbiAgICB3aW5kb3dIZWlnaHQ6IDAsXG4gICAgLy8g5piv5ZCm5Ye66ZSZ77yP5peg5YaF5a65XG4gICAgaXNFcnJvcjogZmFsc2UsXG4gICAgLy8g6ZSZ6K+v57G75Z6LXG4gICAgZXJyb3JUeXBlOiAnbm9kYXRhZXJyb3InLFxuICAgIC8vIOmUmeivr+aPkOekulxuICAgIGVycm9yQ29udGVudDogJycsXG4gICAgLy8g5p2l5rqQXG4gICAgc291cmNlOiAnJyxcbiAgICAvLyDmnaXmupBzcG1cbiAgICByZWZlclNwbTogJydcbiAgfTtcbiAkcmVwZWF0ID0ge307XHJcbiRwcm9wcyA9IHtcImRhdGFlcnJvclwiOntcInhtbG5zOnYtYmluZFwiOlwiXCIsXCJ2LWJpbmQ6ZXJyb3JUeXBlLnN5bmNcIjpcImVycm9yVHlwZVwiLFwidi1iaW5kOmVycm9yQ29udGVudC5zeW5jXCI6XCJlcnJvckNvbnRlbnRcIn19O1xyXG4kZXZlbnRzID0ge307XHJcbiBjb21wb25lbnRzID0ge1xuICAgIGxpbmU6IGxpbmUsXG4gICAgZGF0YWVycm9yOiBEYXRhRXJyb3JcbiAgfTtcbiAgd2F0Y2ggPSB7XG4gICAgdmlkZW9MaXN0KG5ld1ZhbHVlKSB7XG4gICAgICAvLyDliKTmlq3ml6DmlbDmja5cbiAgICAgIGlmICghbmV3VmFsdWUgfHwgbmV3VmFsdWUubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHRoaXMuaXNFcnJvciA9IHRydWU7XG4gICAgICAgIHRoaXMuJGFwcGx5KCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuaXNFcnJvciA9IGZhbHNlO1xuICAgICAgfVxuICAgICAgLy8g6YeN5p6E6KeG6aKR5pWw5o2u77yM5Yiw5LuK5aSpIOS4gOWRqOWGhSDkuIDkuKrmnIjlhoXnrYlcbiAgICAgIHRoaXMudmlkZW9UaW1lTGlzdCA9IFtbXSwgW10sIFtdXTtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy52aWRlb0xpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKHRoaXMudmlkZW9MaXN0W2ldLnRpbWVzdGFtcCkge1xuICAgICAgICAgIGlmIChuZXcgRGF0ZSh0aGlzLnZpZGVvTGlzdFtpXS50aW1lc3RhbXApLnRvRGF0ZVN0cmluZygpID09PSBuZXcgRGF0ZSgpLnRvRGF0ZVN0cmluZygpKSB7XG4gICAgICAgICAgICAvLyDku4rlpKlcbiAgICAgICAgICAgIHRoaXMudmlkZW9UaW1lTGlzdFswXS5wdXNoKHRoaXMudmlkZW9MaXN0W2ldKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKG5ldyBEYXRlKHRoaXMudmlkZW9MaXN0W2ldLnRpbWVzdGFtcCArICg3ICogMjQgKiAzNjAwICogMTAwMCkpID4gbmV3IERhdGUoKSkge1xuICAgICAgICAgICAgLy8gN+WkqeS5i+WGhVxuICAgICAgICAgICAgdGhpcy52aWRlb1RpbWVMaXN0WzFdLnB1c2godGhpcy52aWRlb0xpc3RbaV0pO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyDmm7Tml6lcbiAgICAgICAgICAgIHRoaXMudmlkZW9UaW1lTGlzdFsyXS5wdXNoKHRoaXMudmlkZW9MaXN0W2ldKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHRoaXMuJGFwcGx5KCk7XG4gICAgfVxuICB9O1xuICBtZXRob2RzID0ge1xuICAgIG9uVmlkZW9IYW5kbGVyKGRhdGEsIGN1cnJlbnRJbmRleCwgcGFyZW50SW5kZXgpIHtcbiAgICAgIGlmICh0aGlzLmlzRWRpdCkge1xuICAgICAgICAvLyDpgInkuK0g5Y+W5raI6YCJ5LitXG4gICAgICAgIGlmICghZGF0YS5zZWxlY3RlZCkge1xuICAgICAgICAgIHRoaXMuc2VsZWN0Q291bnQrKztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnNlbGVjdENvdW50LS07XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy52aWRlb1RpbWVMaXN0W3BhcmVudEluZGV4XVtjdXJyZW50SW5kZXhdLnNlbGVjdGVkID0gIWRhdGEuc2VsZWN0ZWQ7XG4gICAgICAgIHRoaXMuJGFwcGx5KCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyDot7Povazmkq3mlL7pobVcbiAgICAgICAgY29uc3QgdmlkZW9JZCA9IGRhdGEuaWQ7XG4gICAgICAgIGlmICghdmlkZW9JZCkgcmV0dXJuO1xuICAgICAgICBjb25zdCBvYmogPSB7fTtcbiAgICAgICAgY29uc3QgX3NwbUNvbmZpZyA9IERFRkFVTFRfREFUQS5TUE1fQ09ORklHW3RoaXMucGFnZUlkXTtcblxuICAgICAgICBvYmouc291cmNlID0gX3NwbUNvbmZpZy5wYWdlO1xuICAgICAgICBvYmouc3BtID0gX3NwbUNvbmZpZy5zcG0gKyAnLjAuMCc7XG5cbiAgICAgICAgb2JqLnZpZGVvSWQgPSB2aWRlb0lkO1xuICAgICAgICBsZXQgcGFyYW1zID0gJyc7XG4gICAgICAgIGZvciAodmFyIGtleSBpbiBvYmopIHtcbiAgICAgICAgICBwYXJhbXMgKz0gJyYnICsga2V5ICsgJz0nICsgZW5jb2RlVVJJQ29tcG9uZW50KG9ialtrZXldKTtcbiAgICAgICAgfVxuICAgICAgICBwYXJhbXMgPSBwYXJhbXMuc3Vic3RyaW5nKDEsIHBhcmFtcy5sZW5ndGgpO1xuICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgIHVybDogYC9wYWdlcy9wbGF5L3BsYXk/JHtwYXJhbXN9YFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9LFxuICAgIHNlbGVjdFRhYnMoZGF0YSkge1xuICAgICAgc3dpdGNoIChkYXRhKSB7XG4gICAgICAgIGNhc2UgJzAnOlxuICAgICAgICAgIHRoaXMucmVzZXRTdGF0dXMoKTtcbiAgICAgICAgICB0aGlzLmlzRWRpdCA9IHRydWU7XG4gICAgICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnMSc6XG4gICAgICAgICAgdGhpcy5pc0VkaXQgPSBmYWxzZTtcbiAgICAgICAgICB0aGlzLiRhcHBseSgpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICcyJzpcbiAgICAgICAgICB0aGlzLnNlbGVjdEFsbEhhbmRsZXIoKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnMyc6XG4gICAgICAgICAgdGhpcy5kZWxWaWRlb0hhbmRsZXIoKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gIH07XG4gIC8qKlxuICAgKiDph43nva7pgInkuK3nirbmgIFcbiAgICovXG4gIHJlc2V0U3RhdHVzKCkge1xuICAgIHRoaXMuc2VsZWN0Q291bnQgPSAwO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy52aWRlb0xpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgIHRoaXMudmlkZW9MaXN0W2ldLnNlbGVjdGVkID0gZmFsc2U7XG4gICAgfVxuICB9XG4gIC8qKlxuICAgKiDlhajpgIlcbiAgICovXG4gIHNlbGVjdEFsbEhhbmRsZXIoKSB7XG4gICAgaWYgKHRoaXMuc2VsZWN0Q291bnQgPT09IHRoaXMudmlkZW9MaXN0Lmxlbmd0aCkge1xuICAgICAgLy8g5Y+W5raI5YWo6YCJXG4gICAgICB0aGlzLnNlbGVjdENvdW50ID0gMDtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy52aWRlb0xpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdGhpcy52aWRlb0xpc3RbaV0uc2VsZWN0ZWQgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgLy8g5YWo6YCJXG4gICAgICB0aGlzLnNlbGVjdENvdW50ID0gdGhpcy52aWRlb0xpc3QubGVuZ3RoO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnZpZGVvTGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgICB0aGlzLnZpZGVvTGlzdFtpXS5zZWxlY3RlZCA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuJGFwcGx5KCk7XG4gIH1cbiAgLyoqXG4gICAqIOWIoOmZpFxuICAgKi9cbiAgZGVsVmlkZW9IYW5kbGVyKCkge1xuICAgIGlmICh0aGlzLnNlbGVjdENvdW50ID09PSAwKSByZXR1cm47XG4gICAgbGV0IF9jb250ZW50ID0gJ+ehruWumuimgeWIoOmZpOmAieS4reeahOeCuei1nuinhumikeWQl++8nydcbiAgICBpZiAodGhpcy52aWRlb1R5cGUgPT09ICdoaXN0b3J5Jykge1xuICAgICAgX2NvbnRlbnQgPSAn56Gu5a6a6KaB5Yig6Zmk6YCJ5Lit55qE5Y6G5Y+y6K6w5b2V5ZCX77yfJztcbiAgICB9XG4gICAgd2VweS5zaG93TW9kYWwoe1xuICAgICAgdGl0bGU6ICcnLFxuICAgICAgY29udGVudDogX2NvbnRlbnQsXG4gICAgICBzdWNjZXNzOiAocmVzKSA9PiB7XG4gICAgICAgIGlmIChyZXMuY29uZmlybSkge1xuICAgICAgICAgIHRoaXMuY29uZmlybURlbENvbXBsZXRlKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuICAvKipcbiAgICog56Gu6K6k5Yig6ZmkXG4gICAqL1xuICBjb25maXJtRGVsQ29tcGxldGUoKSB7XG4gICAgLy8g5YCS5bqP5Yig6Zmk77yM5ZCm5YiZ5Yig6Zmk5YmN6Z2iaW5kZXjkvJrlj5HnlJ/lj5jljJZcbiAgICBmb3IgKGxldCBpID0gdGhpcy52aWRlb0xpc3QubGVuZ3RoIC0gMTsgaSA+IC0xOyBpLS0pIHtcbiAgICAgIGlmICh0aGlzLnZpZGVvTGlzdFtpXS5zZWxlY3RlZCkge1xuICAgICAgICB0aGlzLnZpZGVvTGlzdC5zcGxpY2UoaSwgMSk7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuaXNFZGl0ID0gZmFsc2U7XG4gICAgd2VweS5zaG93VG9hc3Qoe1xuICAgICAgdGl0bGU6ICfliKDpmaTmiJDlip8nLFxuICAgICAgaWNvbjogJ3N1Y2Nlc3MnLFxuICAgICAgZHVyYXRpb246IDIwMDBcbiAgICB9KTtcbiAgICB0aGlzLiRhcHBseSgpO1xuICAgIHdlcHkuc2V0U3RvcmFnZVN5bmMoYHlvdWt1LSR7dGhpcy52aWRlb1R5cGV9TGlzdGAsIEpTT04uc3RyaW5naWZ5KHRoaXMudmlkZW9MaXN0KSk7XG4gIH1cbiAgb25Mb2FkKHBhcmFtcykge1xuICAgIHdlcHkuZ2V0U3lzdGVtSW5mbyh7XG4gICAgICBzdWNjZXNzOiAocmVzKSA9PiB7XG4gICAgICAgIC8vIOiuoeeul+S4u+S9k+mDqOWIhumrmOW6pizljZXkvY3kuLpweCznlLHkuo7kuLvkvZNweOWSjOW+ruS/oXJweOS5i+mXtOaNoueul+W3ruWvvOiHtOiuvue9rueahFxuICAgICAgICB0aGlzLndpbmRvd0hlaWdodCA9IHJlcy53aW5kb3dIZWlnaHQ7XG4gICAgICAgIHRoaXMuJGFwcGx5KCk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgaWYgKHBhcmFtcy52aWRlb1R5cGUpIHtcbiAgICAgIHRoaXMudmlkZW9UeXBlID0gcGFyYW1zLnZpZGVvVHlwZTtcbiAgICB9XG4gICAgaWYgKHBhcmFtcy5zb3VyY2UpIHtcbiAgICAgIHRoaXMuc291cmNlID0gcGFyYW1zLnNvdXJjZTtcbiAgICB9XG4gICAgaWYgKHBhcmFtcy5zcG0pIHtcbiAgICAgIHRoaXMucmVmZXJTcG0gPSBwYXJhbXMuc3BtO1xuICAgIH1cbiAgICB0aGlzLiRhcHBseSgpO1xuICB9XG4gIG9uU2hvdygpIHtcbiAgICB0aGlzLnZpZGVvTGlzdCA9IFtdO1xuICAgIGlmICh3ZXB5LmdldFN0b3JhZ2VTeW5jKGB5b3VrdS0ke3RoaXMudmlkZW9UeXBlfUxpc3RgKSkge1xuICAgICAgY29uc3QgX2xpc3QgPSB3ZXB5LmdldFN0b3JhZ2VTeW5jKGB5b3VrdS0ke3RoaXMudmlkZW9UeXBlfUxpc3RgKTtcbiAgICAgIGlmIChfbGlzdCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIHRoaXMudmlkZW9MaXN0ID0gSlNPTi5wYXJzZShfbGlzdCk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBsZXQgX2NvbnRlbnQgPSAn5Lqy77yM5L2g6L+Y5rKh5pyJ6LWe6L+H55qE6KeG6aKR5ZGmJztcbiAgICBsZXQgX3RpdGxlID0gJ+eCuei1nuiusOW9lSc7XG4gICAgaWYgKHRoaXMudmlkZW9UeXBlID09PSAnaGlzdG9yeScpIHtcbiAgICAgIF9jb250ZW50ID0gJ+S6su+8jOS9oOi/mOayoeacieingueci+iusOW9leWRpic7XG4gICAgICBfdGl0bGUgPSAn6KeC55yL5Y6G5Y+yJztcbiAgICB9XG4gICAgd2VweS5zZXROYXZpZ2F0aW9uQmFyVGl0bGUoe1xuICAgICAgdGl0bGU6IF90aXRsZVxuICAgIH0pO1xuICAgIHRoaXMuZXJyb3JDb250ZW50ID0gX2NvbnRlbnQ7XG4gICAgdGhpcy5zZW5kTG9nKCk7XG4gICAgdGhpcy4kYXBwbHkoKTtcbiAgfVxuICAvKipcbiAgICog5Y+R6YCB6aG16Z2i6buE6YeR5Luk566tcHZcbiAgICovXG4gIHNlbmRMb2coKSB7XG4gICAgY29uc3QgX2RhdGEgPSB7fTtcbiAgICBjb25zdCBfc3BtQ29uZmlnID0gREVGQVVMVF9EQVRBLlNQTV9DT05GSUdbdGhpcy5wYWdlSWRdO1xuICAgIGxldCBfdGl0bGUgPSAn54K56LWe6K6w5b2VJztcbiAgICBsZXQgc3BtQyA9IDI7XG4gICAgaWYgKHRoaXMudmlkZW9UeXBlID09PSAnaGlzdG9yeScpIHtcbiAgICAgIF90aXRsZSA9ICfop4LnnIvljoblj7InO1xuICAgICAgc3BtQyA9IDE7XG4gICAgfVxuICAgIF9kYXRhLnRpdGxlID0gX3RpdGxlO1xuICAgIF9kYXRhLnVybCA9IF9zcG1Db25maWcucGFnZTtcbiAgICBfZGF0YS5zcG0gPSBgJHtfc3BtQ29uZmlnLnNwbX0uJHtzcG1DfS4wYDtcbiAgICBfZGF0YS5yZWZlclVybCA9IHRoaXMuc291cmNlO1xuICAgIF9kYXRhLnJlZmVyU3BtID0gdGhpcy5yZWZlclNwbTtcbiAgICBzZW5kR29sZExvZyhfZGF0YSk7XG4gIH1cbn1cbiJdfQ==