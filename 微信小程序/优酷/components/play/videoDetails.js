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

var _API = require("./../../API/index.js");

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

var VideoDetils = function(_wepy$component) {
    _inherits(VideoDetils, _wepy$component);
    function VideoDetils() {
        var _ref;
        var _temp, _this, _ret;
        _classCallCheck(this, VideoDetils);
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }
        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = VideoDetils.__proto__ || Object.getPrototypeOf(VideoDetils)).call.apply(_ref, [ this ].concat(args))), 
        _this), _this.props = {
            vid: String,
            showid: String,
            playPageData: Object,
            pageConfig: Object,
            openAppParam: String,
            // 视频详细信息
            videoData: {
                type: Object,
                twoWay: true
            }
        }, _this.data = {
            name: "videodetails",
            videoData: {},
            fansInfo: {
                sumCount: 0
            },
            subscribeInfo: {
                img: "https://img.alicdn.com/tfs/TB1efwpX1uSBuNjy1XcXXcYjFXa-100-100.png"
            },
            qualityList: [],
            // 清晰度列表
            quality: "320p",
            // 当前清晰度
            isShowIntroduce: false
        }, _this.watch = {
            playPageData: function playPageData(newValue, oldValue) {
                this.getVideoData();
            },
            vid: function vid(newValue, oldValue) {
                if (newValue === oldValue) return;
                this.resetData();
            },
            showid: function showid(newValue, oldValue) {
                if (newValue === oldValue) return;
                this.resetData();
            }
        }, _this.methods = {
            // 显示隐藏简介
            showHideIntroduce: function showHideIntroduce() {
                this.isShowIntroduce = !this.isShowIntroduce;
            },
            launchAppError: function launchAppError(e) {
                _wepy2.default.showModal({
                    title: "",
                    content: "由于平台限制，您需要手动打开优酷App",
                    showCancel: false
                });
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }
    _createClass(VideoDetils, [ {
        key: "resetData",
        /**
     * 切换视频时数据重置
     */
        value: function resetData() {
            this.subscribeInfo = {
                img: "https://img.alicdn.com/tfs/TB1efwpX1uSBuNjy1XcXXcYjFXa-100-100.png"
            };
            this.videoData = {
                title: "优酷视频",
                youkuRate: "9.2",
                totalVv: "",
                uploader: "优酷视频",
                directors: "",
                performers: "",
                desc: ""
            };
            this.isShowIntroduce = false;
            this.$apply();
        }
        // 开始获取数据信息
        }, {
        key: "getVideoData",
        value: function getVideoData() {
            var _this2 = this;
            this.isShowIntroduce = false;
            if (!this.pageConfig || !this.playPageData) return false;
            var detailInfo = null;
            var subscribe = null;
            var tag = this.pageConfig[this.name].tag;
            var tags = tag.split(",");
            if (this.playPageData.playerModules.has(tags[0])) {
                detailInfo = this.playPageData.playerModules.get(tags[0]);
            }
            if (this.playPageData.playerModules.has(tags[2])) {
                detailInfo = this.playPageData.playerModules.get(tags[2]);
            }
            if (this.playPageData.playerModules.has(tags[1])) {
                subscribe = this.playPageData.playerModules.get(tags[1]);
            }
            if (this.playPageData.playerModules.has(tags[3])) {
                subscribe = this.playPageData.playerModules.get(tags[3]);
            }
            if (!detailInfo) return;
            var videoArgs = {};
            if (this.showid) {
                videoArgs.showid = this.showid;
            } else {
                videoArgs.vid = this.vid;
            }
            (0, _API.getModuleComment)(detailInfo, videoArgs, function(data) {
                _this2.videoData = data[0];
                if (_this2.videoData) {
                    if (_this2.videoData.directors && _this2.videoData.directors instanceof Array) {
                        _this2.videoData.directors = _this2.videoData.directors.join(",");
                    }
                    if (_this2.videoData.performers && _this2.videoData.performers instanceof Array) {
                        _this2.videoData.performers = _this2.videoData.performers.join(",");
                    }
                    _this2.getFansInfo(_this2.videoData.uploaderId);
                    _this2.$apply();
                }
            });
            if (!subscribe) return;
            (0, _API.getModuleComment)(subscribe, videoArgs, function(data) {
                _this2.subscribeInfo = data[0];
                _this2.subscribeInfo.img = (0, _util.changeHttps)(_this2.subscribeInfo.img);
                _this2.$apply();
            });
        }
        // 获取粉丝数
        }, {
        key: "getFansInfo",
        value: function getFansInfo(data) {
            var _this3 = this;
            var args = {};
            args.friend = data;
            args.deviceid = "3";
            args.addtion = "3_1t";
            var options = {};
            options.url = _API.URL_ADDRESS.GET_FANS;
            options.data = args;
            options.method = "POST";
            options.callback = function(data) {
                var _fansData = data.result.data;
                if (_fansData && _fansData.data && _fansData.data.follow) {
                    _this3.fansInfo = _fansData.data.follow;
                    _this3.fansInfo.sumCount = (0, _util.formatNumber)(_this3.fansInfo.sumCount);
                    _this3.$apply();
                }
            };
            (0, _API.requestData)(options);
        }
    } ]);
    return VideoDetils;
}(_wepy2.default.component);

exports.default = VideoDetils;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZpZGVvRGV0YWlscy5qcyJdLCJuYW1lcyI6WyJWaWRlb0RldGlscyIsInByb3BzIiwidmlkIiwiU3RyaW5nIiwic2hvd2lkIiwicGxheVBhZ2VEYXRhIiwiT2JqZWN0IiwicGFnZUNvbmZpZyIsIm9wZW5BcHBQYXJhbSIsInZpZGVvRGF0YSIsInR5cGUiLCJ0d29XYXkiLCJkYXRhIiwibmFtZSIsImZhbnNJbmZvIiwic3VtQ291bnQiLCJzdWJzY3JpYmVJbmZvIiwicXVhbGl0eUxpc3QiLCJxdWFsaXR5IiwiaXNTaG93SW50cm9kdWNlIiwid2F0Y2giLCJuZXdWYWx1ZSIsIm9sZFZhbHVlIiwiZ2V0VmlkZW9EYXRhIiwicmVzZXREYXRhIiwibWV0aG9kcyIsInNob3dIaWRlSW50cm9kdWNlIiwibGF1bmNoQXBwRXJyb3IiLCJlIiwic2hvd01vZGFsIiwidGl0bGUiLCJjb250ZW50Iiwic2hvd0NhbmNlbCIsIiRhcHBseSIsImRldGFpbEluZm8iLCJzdWJzY3JpYmUiLCJ0YWciLCJ0YWdzIiwic3BsaXQiLCJwbGF5ZXJNb2R1bGVzIiwiaGFzIiwiZ2V0IiwidmlkZW9BcmdzIiwiZGlyZWN0b3JzIiwiQXJyYXkiLCJqb2luIiwicGVyZm9ybWVycyIsImdldEZhbnNJbmZvIiwidXBsb2FkZXJJZCIsImltZyIsImFyZ3MiLCJmcmllbmQiLCJkZXZpY2VpZCIsImFkZHRpb24iLCJvcHRpb25zIiwidXJsIiwiR0VUX0ZBTlMiLCJtZXRob2QiLCJjYWxsYmFjayIsIl9mYW5zRGF0YSIsInJlc3VsdCIsImZvbGxvdyIsImNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7Ozs7Ozs7OztJQUVxQkEsVzs7Ozs7Ozs7Ozs7Ozs7Z01BQ25CQyxLLEdBQVE7QUFDTkMsV0FBS0MsTUFEQztBQUVOQyxjQUFRRCxNQUZGO0FBR05FLG9CQUFjQyxNQUhSO0FBSU5DLGtCQUFZRCxNQUpOO0FBS05FLG9CQUFjTCxNQUxSO0FBTU47QUFD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akIsRUFBNEJPLFNBQTVCLEVBQXVDLFVBQUM5QixJQUFELEVBQVU7QUFDL0MsZUFBS0ksYUFBTCxHQUFxQkosS0FBSyxDQUFMLENBQXJCO0FBQ0EsZUFBS0ksYUFBTCxDQUFtQmlDLEdBQW5CLEdBQXlCLHVCQUFZLE9BQUtqQyxhQUFMLENBQW1CaUMsR0FBL0IsQ0FBekI7QUFDQSxlQUFLaEIsTUFBTDtBQUNELE9BSkQ7QUFLRDtBQUNEOzs7O2dDQUNZckIsSSxFQUFNO0FBQUE7O0FBQ2hCLFVBQU1zQyxPQUFPLEVBQWI7QUFDQUEsV0FBS0MsTUFBTCxHQUFjdkMsSUFBZDtBQUNBc0MsV0FBS0UsUUFBTCxHQUFnQixHQUFoQjtBQUNBRixXQUFLRyxPQUFMLEdBQWUsTUFBZjs7QUFFQSxVQUFNQyxVQUFVLEVBQWhCO0FBQ0FBLGNBQVFDLEdBQVIsR0FBYyxpQkFBWUMsUUFBMUI7QUFDQUYsY0FBUTFDLElBQVIsR0FBZXNDLElBQWY7QUFDQUksY0FBUUcsTUFBUixHQUFpQixNQUFqQjtBQUNBSCxjQUFRSSxRQUFSLEdBQW1CLFVBQUM5QyxJQUFELEVBQVU7QUFDM0IsWUFBTStDLFlBQVkvQyxLQUFLZ0QsTUFBTCxDQUFZaEQsSUFBOUI7QUFDQSxZQUFJK0MsYUFBYUEsVUFBVS9DLElBQXZCLElBQStCK0MsVUFBVS9DLElBQVYsQ0FBZWlELE1BQWxELEVBQTBEO0FBQ3hELGlCQUFLL0MsUUFBTCxHQUFnQjZDLFVBQVUvQyxJQUFWLENBQWVpRCxNQUEvQjtBQUNBLGlCQUFLL0MsUUFBTCxDQUFjQyxRQUFkLEdBQXlCLHdCQUFhLE9BQUtELFFBQUwsQ0FBY0MsUUFBM0IsQ0FBekI7QUFDQSxpQkFBS2tCLE1BQUw7QUFDRDtBQUNGLE9BUEQ7QUFRQSw0QkFBWXFCLE9BQVo7QUFDRDs7OztFQS9Jc0MsZUFBS1EsUzs7a0JBQXpCOUQsVyIsImZpbGUiOiJ2aWRlb0RldGFpbHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xuaW1wb3J0IHsgZ2V0TW9kdWxlQ29tbWVudCwgVVJMX0FERFJFU1MsIHJlcXVlc3REYXRhIH0gZnJvbSAnQC9BUEkvJztcbmltcG9ydCB7IGNoYW5nZUh0dHBzLCBmb3JtYXROdW1iZXIgfSBmcm9tICdAL3V0aWxzL3V0aWwnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBWaWRlb0RldGlscyBleHRlbmRzIHdlcHkuY29tcG9uZW50IHtcbiAgcHJvcHMgPSB7XG4gICAgdmlkOiBTdHJpbmcsXG4gICAgc2hvd2lkOiBTdHJpbmcsXG4gICAgcGxheVBhZ2VEYXRhOiBPYmplY3QsXG4gICAgcGFnZUNvbmZpZzogT2JqZWN0LFxuICAgIG9wZW5BcHBQYXJhbTogU3RyaW5nLFxuICAgIC8vIOinhumikeivpue7huS/oeaBr1xuICAgIHZpZGVvRGF0YToge1xuICAgICAgdHlwZTogT2JqZWN0LFxuICAgICAgdHdvV2F5OiB0cnVlXG4gICAgfVxuICB9O1xuXG4gIGRhdGEgPSB7XG4gICAgbmFtZTogJ3ZpZGVvZGV0YWlscycsXG4gICAgdmlkZW9EYXRhOiB7fSxcbiAgICBmYW5zSW5mbzoge1xuICAgICAgc3VtQ291bnQ6IDBcbiAgICB9LFxuICAgIHN1YnNjcmliZUluZm86IHtcbiAgICAgICdpbWcnOiAnaHR0cHM6Ly9pbWcuYWxpY2RuLmNvbS90ZnMvVEIxZWZ3cFgxdVNCdU5qeTFYY1hYY1lqRlhhLTEwMC0xMDAucG5nJ1xuICAgIH0sXG4gICAgcXVhbGl0eUxpc3Q6IFtdLCAvLyDmuIXmmbDluqbliJfooahcbiAgICBxdWFsaXR5OiAnMzIwcCcsIC8vIOW9k+WJjea4heaZsOW6plxuICAgIGlzU2hvd0ludHJvZHVjZTogZmFsc2UgLy8g5piv5ZCm5pi+56S6566A5LuLXG4gIH07XG4gIHdhdGNoID0ge1xuICAgIHBsYXlQYWdlRGF0YShuZXdWYWx1ZSwgb2xkVmFsdWUpIHtcbiAgICAgIHRoaXMuZ2V0VmlkZW9EYXRhKCk7XG4gICAgfSxcbiAgICB2aWQobmV3VmFsdWUsIG9sZFZhbHVlKSB7XG4gICAgICBpZiAobmV3VmFsdWUgPT09IG9sZFZhbHVlKSByZXR1cm47XG4gICAgICB0aGlzLnJlc2V0RGF0YSgpO1xuICAgIH0sXG4gICAgc2hvd2lkKG5ld1ZhbHVlLCBvbGRWYWx1ZSkge1xuICAgICAgaWYgKG5ld1ZhbHVlID09PSBvbGRWYWx1ZSkgcmV0dXJuO1xuICAgICAgdGhpcy5yZXNldERhdGEoKTtcbiAgICB9XG4gIH07XG4gIG1ldGhvZHMgPSB7XG4gICAgLy8g5pi+56S66ZqQ6JeP566A5LuLXG4gICAgc2hvd0hpZGVJbnRyb2R1Y2UoKSB7XG4gICAgICB0aGlzLmlzU2hvd0ludHJvZHVjZSA9ICF0aGlzLmlzU2hvd0ludHJvZHVjZTtcbiAgICB9LFxuICAgIGxhdW5jaEFwcEVycm9yKGUpIHtcbiAgICAgIHdlcHkuc2hvd01vZGFsKHtcbiAgICAgICAgdGl0bGU6ICcnLFxuICAgICAgICBjb250ZW50OiAn55Sx5LqO5bmz5Y+w6ZmQ5Yi277yM5oKo6ZyA6KaB5omL5Yqo5omT5byA5LyY6YW3QXBwJyxcbiAgICAgICAgc2hvd0NhbmNlbDogZmFsc2VcbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcbiAgLyoqXG4gICAqIOWIh+aNouinhumikeaXtuaVsOaNrumHjee9rlxuICAgKi9cbiAgcmVzZXREYXRhKCkge1xuICAgIHRoaXMuc3Vic2NyaWJlSW5mbyA9IHtcbiAgICAgICdpbWcnOiAnaHR0cHM6Ly9pbWcuYWxpY2RuLmNvbS90ZnMvVEIxZWZ3cFgxdVNCdU5qeTFYY1hYY1lqRlhhLTEwMC0xMDAucG5nJ1xuICAgIH07XG4gICAgdGhpcy52aWRlb0RhdGEgPSB7XG4gICAgICAndGl0bGUnOiAn5LyY6YW36KeG6aKRJyxcbiAgICAgICd5b3VrdVJhdGUnOiAnOS4yJyxcbiAgICAgICd0b3RhbFZ2JzogJycsXG4gICAgICAndXBsb2FkZXInOiAn5LyY6YW36KeG6aKRJyxcbiAgICAgICdkaXJlY3RvcnMnOiAnJyxcbiAgICAgICdwZXJmb3JtZXJzJzogJycsXG4gICAgICAnZGVzYyc6ICcnXG4gICAgfTtcbiAgICB0aGlzLmlzU2hvd0ludHJvZHVjZSA9IGZhbHNlO1xuICAgIHRoaXMuJGFwcGx5KCk7XG4gIH1cbiAgLy8g5byA5aeL6I635Y+W5pWw5o2u5L+h5oGvXG4gIGdldFZpZGVvRGF0YSgpIHtcbiAgICB0aGlzLmlzU2hvd0ludHJvZHVjZSA9IGZhbHNlO1xuICAgIGlmICghdGhpcy5wYWdlQ29uZmlnIHx8ICF0aGlzLnBsYXlQYWdlRGF0YSkgcmV0dXJuIGZhbHNlO1xuICAgIGxldCBkZXRhaWxJbmZvID0gbnVsbDtcbiAgICBsZXQgc3Vic2NyaWJlID0gbnVsbDtcblxuICAgIGxldCB0YWcgPSB0aGlzLnBhZ2VDb25maWdbdGhpcy5uYW1lXS50YWc7XG4gICAgY29uc3QgdGFncyA9IHRhZy5zcGxpdCgnLCcpO1xuICAgIGlmICh0aGlzLnBsYXlQYWdlRGF0YS5wbGF5ZXJNb2R1bGVzLmhhcyh0YWdzWzBdKSkge1xuICAgICAgZGV0YWlsSW5mbyA9IHRoaXMucGxheVBhZ2VEYXRhLnBsYXllck1vZHVsZXMuZ2V0KHRhZ3NbMF0pO1xuICAgIH1cbiAgICBpZiAodGhpcy5wbGF5UGFnZURhdGEucGxheWVyTW9kdWxlcy5oYXModGFnc1syXSkpIHtcbiAgICAgIGRldGFpbEluZm8gPSB0aGlzLnBsYXlQYWdlRGF0YS5wbGF5ZXJNb2R1bGVzLmdldCh0YWdzWzJdKTtcbiAgICB9XG4gICAgaWYgKHRoaXMucGxheVBhZ2VEYXRhLnBsYXllck1vZHVsZXMuaGFzKHRhZ3NbMV0pKSB7XG4gICAgICBzdWJzY3JpYmUgPSB0aGlzLnBsYXlQYWdlRGF0YS5wbGF5ZXJNb2R1bGVzLmdldCh0YWdzWzFdKTtcbiAgICB9XG4gICAgaWYgKHRoaXMucGxheVBhZ2VEYXRhLnBsYXllck1vZHVsZXMuaGFzKHRhZ3NbM10pKSB7XG4gICAgICBzdWJzY3JpYmUgPSB0aGlzLnBsYXlQYWdlRGF0YS5wbGF5ZXJNb2R1bGVzLmdldCh0YWdzWzNdKTtcbiAgICB9XG5cbiAgICBpZiAoIWRldGFpbEluZm8pIHJldHVybjtcbiAgICBjb25zdCB2aWRlb0FyZ3MgPSB7fTtcbiAgICBpZiAodGhpcy5zaG93aWQpIHtcbiAgICAgIHZpZGVvQXJncy5zaG93aWQgPSB0aGlzLnNob3dpZDtcbiAgICB9IGVsc2Uge1xuICAgICAgdmlkZW9BcmdzLnZpZCA9IHRoaXMudmlkO1xuICAgIH1cbiAgICBnZXRNb2R1bGVDb21tZW50KGRldGFpbEluZm8sIHZpZGVvQXJncywgKGRhdGEpID0+IHtcbiAgICAgIHRoaXMudmlkZW9EYXRhID0gZGF0YVswXTtcbiAgICAgIGlmICh0aGlzLnZpZGVvRGF0YSkge1xuICAgICAgICBpZiAodGhpcy52aWRlb0RhdGEuZGlyZWN0b3JzICYmIHRoaXMudmlkZW9EYXRhLmRpcmVjdG9ycyBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgICAgdGhpcy52aWRlb0RhdGEuZGlyZWN0b3JzID0gdGhpcy52aWRlb0RhdGEuZGlyZWN0b3JzLmpvaW4oJywnKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy52aWRlb0RhdGEucGVyZm9ybWVycyAmJiB0aGlzLnZpZGVvRGF0YS5wZXJmb3JtZXJzIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgICB0aGlzLnZpZGVvRGF0YS5wZXJmb3JtZXJzID0gdGhpcy52aWRlb0RhdGEucGVyZm9ybWVycy5qb2luKCcsJyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5nZXRGYW5zSW5mbyh0aGlzLnZpZGVvRGF0YS51cGxvYWRlcklkKTtcbiAgICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGlmICghc3Vic2NyaWJlKSByZXR1cm47XG5cbiAgICBnZXRNb2R1bGVDb21tZW50KHN1YnNjcmliZSwgdmlkZW9BcmdzLCAoZGF0YSkgPT4ge1xuICAgICAgdGhpcy5zdWJzY3JpYmVJbmZvID0gZGF0YVswXTtcbiAgICAgIHRoaXMuc3Vic2NyaWJlSW5mby5pbWcgPSBjaGFuZ2VIdHRwcyh0aGlzLnN1YnNjcmliZUluZm8uaW1nKTtcbiAgICAgIHRoaXMuJGFwcGx5KCk7XG4gICAgfSk7XG4gIH1cbiAgLy8g6I635Y+W57KJ5Lid5pWwXG4gIGdldEZhbnNJbmZvKGRhdGEpIHtcbiAgICBjb25zdCBhcmdzID0ge307XG4gICAgYXJncy5mcmllbmQgPSBkYXRhO1xuICAgIGFyZ3MuZGV2aWNlaWQgPSAnMyc7XG4gICAgYXJncy5hZGR0aW9uID0gJzNfMXQnO1xuXG4gICAgY29uc3Qgb3B0aW9ucyA9IHt9O1xuICAgIG9wdGlvbnMudXJsID0gVVJMX0FERFJFU1MuR0VUX0ZBTlM7XG4gICAgb3B0aW9ucy5kYXRhID0gYXJncztcbiAgICBvcHRpb25zLm1ldGhvZCA9ICdQT1NUJztcbiAgICBvcHRpb25zLmNhbGxiYWNrID0gKGRhdGEpID0+IHtcbiAgICAgIGNvbnN0IF9mYW5zRGF0YSA9IGRhdGEucmVzdWx0LmRhdGE7XG4gICAgICBpZiAoX2ZhbnNEYXRhICYmIF9mYW5zRGF0YS5kYXRhICYmIF9mYW5zRGF0YS5kYXRhLmZvbGxvdykge1xuICAgICAgICB0aGlzLmZhbnNJbmZvID0gX2ZhbnNEYXRhLmRhdGEuZm9sbG93O1xuICAgICAgICB0aGlzLmZhbnNJbmZvLnN1bUNvdW50ID0gZm9ybWF0TnVtYmVyKHRoaXMuZmFuc0luZm8uc3VtQ291bnQpO1xuICAgICAgICB0aGlzLiRhcHBseSgpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXF1ZXN0RGF0YShvcHRpb25zKTtcbiAgfVxufVxuIl19