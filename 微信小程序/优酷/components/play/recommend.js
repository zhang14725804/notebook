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

var Recommend = function(_wepy$component) {
    _inherits(Recommend, _wepy$component);
    function Recommend() {
        var _ref;
        var _temp, _this, _ret;
        _classCallCheck(this, Recommend);
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }
        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Recommend.__proto__ || Object.getPrototypeOf(Recommend)).call.apply(_ref, [ this ].concat(args))), 
        _this), _this.data = {
            name: "recommend",
            title: "相关推荐",
            isVertical: true,
            // 是否是竖屏显示，即海报模式
            items: null,
            // 接口返回的总数据
            num: 6,
            // mt获取的显示个数
            totalNum: 0,
            // 返回数据总个数
            recommendList: null,
            // 当前要渲染的数据，根据mt配置获取个数决定他的length
            page: 0,
            // 一共多少页
            nowPage: 1
        }, _this.props = {
            vid: String,
            showid: String,
            playPageData: Object,
            pageConfig: Object
        }, _this.methods = {
            onChangeMore: function onChangeMore() {
                (0, _API.sendEventLog)({
                    eventCode: "00002"
                });
                this.loadMore();
            },
            onRecommend: function onRecommend(recommend) {
                this.$emit("NavigateToPlay", recommend);
            }
        }, _this.watch = {
            playPageData: function playPageData(newValue, oldValue) {
                this.getRecommendData();
            },
            vid: function vid(newValue, oldValue) {
                if (newValue === oldValue) return;
                this.resetData();
            },
            showid: function showid(newValue, oldValue) {
                if (newValue === oldValue) return;
                this.resetData();
            }
        }, _this.components = {}, _temp), _possibleConstructorReturn(_this, _ret);
    }
    _createClass(Recommend, [ {
        key: "resetData",
        /**
     * 切换视频时数据重置
     */
        value: function resetData() {
            // this.items = null;
            // this.num = 6;
            // this.totalNum = 0;
            // this.recommendList = null;
            // this.page = 0;
            // this.nowPage = 1;
            // this.$apply();
        }
    }, {
        key: "loadMore",
        value: function loadMore() {
            this.nowPage++;
            var start = void 0;
            var end = void 0;
            var data = [];
            if (this.nowPage < this.page) {
                start = 0;
                end = this.nowPage * this.num - 1;
            } else if (this.nowPage === this.page) {
                start = 0;
                end = this.totalNum - 1;
            } else {
                // 动态加载数据
            }
            for (var i = start; i <= end; i++) {
                if (this.items[i]) {
                    data.push(this.items[i]);
                }
            }
            this.recommendList = data;
            this.$apply();
        }
        // 开始获取数据信息
        }, {
        key: "getRecommendData",
        value: function getRecommendData() {
            var _this2 = this;
            if (!this.pageConfig || !this.playPageData) return false;
            var tag = this.pageConfig[this.name].tag;
            var recommendInfo = null;
            this.recommendList = [];
            var tags = tag.split(",");
            for (var i = 0; i < tags.length; i++) {
                if (this.playPageData.playerModules.has(tags[i])) {
                    if (i === 0 || i === 2) {
                        this.isVertical = true;
                    } else {
                        this.isVertical = false;
                    }
                    recommendInfo = this.playPageData.playerModules.get(tags[i]);
                    if (recommendInfo.title) this.title = recommendInfo.title;
                }
            }
            if (!recommendInfo) return;
            var videoArgs = {};
            if (this.showid) {
                videoArgs.showid = this.showid;
            } else {
                videoArgs.vid = this.vid;
            }
            (0, _API.getModuleComment)(recommendInfo, videoArgs, function(data) {
                var tempData = [];
                // 重构数据
                                for (var key in data) {
                    var itemData = data[key];
                    if (itemData.hasOwnProperty("reputation")) {
                        itemData.reputation = itemData.reputation.toFixed(1);
                        var scoreArray = itemData.reputation.toString().split(".");
                        itemData.firstScore = scoreArray[0];
                        if (scoreArray.length === 1) {
                            itemData.secondScore = 0;
                        } else {
                            itemData.secondScore = scoreArray[1];
                        }
                    }
                    tempData.push(itemData);
                }
                _this2.totalNum = tempData.length;
                _this2.page = Math.ceil(_this2.totalNum / parseInt(_this2.num));
                if (_this2.page < 1 || _this2.page === 1) {
                    _this2.recommendList = tempData;
                } else {
                    for (var _i = 0; _i < _this2.num; _i++) {
                        _this2.recommendList.push(tempData[_i]);
                    }
                }
                _this2.items = tempData;
                _this2.$apply();
            });
        }
    } ]);
    return Recommend;
}(_wepy2.default.component);

exports.default = Recommend;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlY29tbWVuZC5qcyJdLCJuYW1lcyI6WyJSZWNvbW1lbmQiLCJkYXRhIiwibmFtZSIsInRpdGxlIiwiaXNWZXJ0aWNhbCIsIml0ZW1zIiwibnVtIiwidG90YWxOdW0iLCJyZWNvbW1lbmRMaXN0IiwicGFnZSIsIm5vd1BhZ2UiLCJwcm9wcyIsInZpZCIsIlN0cmluZyIsInNob3dpZCIsInBsYXlQYWdlRGF0YSIsIk9iamVjdCIsInBhZ2VDb25maWciLCJtZXRob2RzIiwib25DaGFuZ2VNb3JlIiwiZXZlbnRDb2RlIiwibG9hZE1vcmUiLCJvblJlY29tbWVuZCIsInJlY29tbWVuZCIsIiRlbWl0Iiwid2F0Y2giLCJuZXdWYWx1ZSIsIm9sZFZhbHVlIiwiZ2V0UmVjb21tZW5kRGF0YSIsInJlc2V0RGF0YSIsImNvbXBvbmVudHMiLCJzdGFydCIsImVuZCIsImkiLCJwdXNoIiwiJGFwcGx5IiwidGFnIiwicmVjb21tZW5kSW5mbyIsInRhZ3MiLCJzcGxpdCIsImxlbmd0aCIsInBsYXllck1vZHVsZXMiLCJoYXMiLCJnZXQiLCJ2aWRlb0FyZ3MiLCJ0ZW1wRGF0YSIsImtleSIsIml0ZW1EYXRhIiwiaGFzT3duUHJvcGVydHkiLCJyZXB1dGF0aW9uIiwidG9GaXhlZCIsInNjb3JlQXJyYXkiLCJ0b1N0cmluZyIsImZpcnN0U2NvcmUiLCJzZWNvbmRTY29yZSIsIk1hdGgiLCJjZWlsIiwicGFyc2VJbnQiLCJjb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7SUFFcUJBLFM7Ozs7Ozs7Ozs7Ozs7OzRMQUNuQkMsSSxHQUFPO0FBQ0xDLFlBQU0sV0FERDtBQUVMQyxhQUFPLE1BRkY7QUFHTEMsa0JBQVksSUFIUCxFQUdhO0FBQ2xCQyxhQUFPLElBSkYsRUFJUTtBQUNiQyxXQUFLLENBTEEsRUFLRztBQUNSQyxnQkFBVSxDQU5MLEVBTVE7QUFDYkMscUJBQWUsSUFQVixFQU9nQjtBQUNyQkMsWUFBTSxDQVJELEVBUUk7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UUFBTCxHQUFnQmtELFNBQVMsT0FBS25ELEdBQWQsQ0FBMUIsQ0FBWjtBQUNBLFlBQUksT0FBS0csSUFBTCxHQUFZLENBQVosSUFBaUIsT0FBS0EsSUFBTCxLQUFjLENBQW5DLEVBQXNDO0FBQ3BDLGlCQUFLRCxhQUFMLEdBQXFCcUMsUUFBckI7QUFDRCxTQUZELE1BRU87QUFDTCxlQUFLLElBQUlaLEtBQUksQ0FBYixFQUFnQkEsS0FBSSxPQUFLM0IsR0FBekIsRUFBOEIyQixJQUE5QixFQUFtQztBQUNqQyxtQkFBS3pCLGFBQUwsQ0FBbUIwQixJQUFuQixDQUF3QlcsU0FBU1osRUFBVCxDQUF4QjtBQUNEO0FBQ0Y7QUFDRCxlQUFLNUIsS0FBTCxHQUFhd0MsUUFBYjtBQUNBLGVBQUtWLE1BQUw7QUFDRCxPQTdCRDtBQThCRDs7OztFQXBJb0MsZUFBS3VCLFM7O2tCQUF2QjFELFMiLCJmaWxlIjoicmVjb21tZW5kLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcbmltcG9ydCB7IGdldE1vZHVsZUNvbW1lbnQsIHNlbmRFdmVudExvZyB9IGZyb20gJ0AvQVBJLyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlY29tbWVuZCBleHRlbmRzIHdlcHkuY29tcG9uZW50IHtcbiAgZGF0YSA9IHtcbiAgICBuYW1lOiAncmVjb21tZW5kJyxcbiAgICB0aXRsZTogJ+ebuOWFs+aOqOiNkCcsXG4gICAgaXNWZXJ0aWNhbDogdHJ1ZSwgLy8g5piv5ZCm5piv56uW5bGP5pi+56S677yM5Y2z5rW35oql5qih5byPXG4gICAgaXRlbXM6IG51bGwsIC8vIOaOpeWPo+i/lOWbnueahOaAu+aVsOaNrlxuICAgIG51bTogNiwgLy8gbXTojrflj5bnmoTmmL7npLrkuKrmlbBcbiAgICB0b3RhbE51bTogMCwgLy8g6L+U5Zue5pWw5o2u5oC75Liq5pWwXG4gICAgcmVjb21tZW5kTGlzdDogbnVsbCwgLy8g5b2T5YmN6KaB5riy5p+T55qE5pWw5o2u77yM5qC55o2ubXTphY3nva7ojrflj5bkuKrmlbDlhrPlrprku5bnmoRsZW5ndGhcbiAgICBwYWdlOiAwLCAvLyDkuIDlhbHlpJrlsJHpobVcbiAgICBub3dQYWdlOiAxIC8vIOW9k+WJjemhteaVsFxuICB9O1xuICBwcm9wcyA9IHtcbiAgICB2aWQ6IFN0cmluZyxcbiAgICBzaG93aWQ6IFN0cmluZyxcbiAgICBwbGF5UGFnZURhdGE6IE9iamVjdCxcbiAgICBwYWdlQ29uZmlnOiBPYmplY3RcbiAgfTtcbiAgbWV0aG9kcyA9IHtcbiAgICBvbkNoYW5nZU1vcmUoKSB7XG4gICAgICBzZW5kRXZlbnRMb2coe2V2ZW50Q29kZTogJzAwMDAyJ30pO1xuICAgICAgdGhpcy5sb2FkTW9yZSgpO1xuICAgIH0sXG4gICAgb25SZWNvbW1lbmQocmVjb21tZW5kKSB7XG4gICAgICB0aGlzLiRlbWl0KCdOYXZpZ2F0ZVRvUGxheScsIHJlY29tbWVuZCk7XG4gICAgfVxuICB9O1xuICB3YXRjaCA9IHtcbiAgICBwbGF5UGFnZURhdGEobmV3VmFsdWUsIG9sZFZhbHVlKSB7XG4gICAgICB0aGlzLmdldFJlY29tbWVuZERhdGEoKTtcbiAgICB9LFxuICAgIHZpZChuZXdWYWx1ZSwgb2xkVmFsdWUpIHtcbiAgICAgIGlmIChuZXdWYWx1ZSA9PT0gb2xkVmFsdWUpIHJldHVybjtcbiAgICAgIHRoaXMucmVzZXREYXRhKCk7XG4gICAgfSxcbiAgICBzaG93aWQobmV3VmFsdWUsIG9sZFZhbHVlKSB7XG4gICAgICBpZiAobmV3VmFsdWUgPT09IG9sZFZhbHVlKSByZXR1cm47XG4gICAgICB0aGlzLnJlc2V0RGF0YSgpO1xuICAgIH1cbiAgfTtcbiAgY29tcG9uZW50cyA9IHtcbiAgfTtcbiAgLyoqXG4gICAqIOWIh+aNouinhumikeaXtuaVsOaNrumHjee9rlxuICAgKi9cbiAgcmVzZXREYXRhKCkge1xuICAgIC8vIHRoaXMuaXRlbXMgPSBudWxsO1xuICAgIC8vIHRoaXMubnVtID0gNjtcbiAgICAvLyB0aGlzLnRvdGFsTnVtID0gMDtcbiAgICAvLyB0aGlzLnJlY29tbWVuZExpc3QgPSBudWxsO1xuICAgIC8vIHRoaXMucGFnZSA9IDA7XG4gICAgLy8gdGhpcy5ub3dQYWdlID0gMTtcbiAgICAvLyB0aGlzLiRhcHBseSgpO1xuICB9XG4gIGxvYWRNb3JlKCkge1xuICAgIHRoaXMubm93UGFnZSArKztcbiAgICBsZXQgc3RhcnQ7XG4gICAgbGV0IGVuZDtcbiAgICBjb25zdCBkYXRhID0gW107XG4gICAgaWYgKHRoaXMubm93UGFnZSA8IHRoaXMucGFnZSkge1xuICAgICAgc3RhcnQgPSAwO1xuICAgICAgZW5kID0gdGhpcy5ub3dQYWdlICogdGhpcy5udW0gLSAxO1xuICAgIH0gZWxzZSBpZiAodGhpcy5ub3dQYWdlID09PSB0aGlzLnBhZ2UpIHtcbiAgICAgIHN0YXJ0ID0gMDtcbiAgICAgIGVuZCA9IHRoaXMudG90YWxOdW0gLSAxO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyDliqjmgIHliqDovb3mlbDmja5cbiAgICB9XG4gICAgZm9yIChsZXQgaSA9IHN0YXJ0OyBpIDw9IGVuZDsgaSsrKSB7XG4gICAgICBpZiAodGhpcy5pdGVtc1tpXSkge1xuICAgICAgICBkYXRhLnB1c2godGhpcy5pdGVtc1tpXSk7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMucmVjb21tZW5kTGlzdCA9IGRhdGE7XG4gICAgdGhpcy4kYXBwbHkoKTtcbiAgfVxuICAvLyDlvIDlp4vojrflj5bmlbDmja7kv6Hmga9cbiAgZ2V0UmVjb21tZW5kRGF0YSgpIHtcbiAgICBpZiAoIXRoaXMucGFnZUNvbmZpZyB8fCAhdGhpcy5wbGF5UGFnZURhdGEpIHJldHVybiBmYWxzZTtcblxuICAgIGxldCB0YWcgPSB0aGlzLnBhZ2VDb25maWdbdGhpcy5uYW1lXS50YWc7XG4gICAgbGV0IHJlY29tbWVuZEluZm8gPSBudWxsO1xuICAgIHRoaXMucmVjb21tZW5kTGlzdCA9IFtdO1xuICAgIGNvbnN0IHRhZ3MgPSB0YWcuc3BsaXQoJywnKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRhZ3MubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmICh0aGlzLnBsYXlQYWdlRGF0YS5wbGF5ZXJNb2R1bGVzLmhhcyh0YWdzW2ldKSkge1xuICAgICAgICBpZiAoaSA9PT0gMCB8fCBpID09PSAyKSB7XG4gICAgICAgICAgdGhpcy5pc1ZlcnRpY2FsID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLmlzVmVydGljYWwgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICByZWNvbW1lbmRJbmZvID0gdGhpcy5wbGF5UGFnZURhdGEucGxheWVyTW9kdWxlcy5nZXQodGFnc1tpXSk7XG4gICAgICAgIGlmIChyZWNvbW1lbmRJbmZvLnRpdGxlKSB0aGlzLnRpdGxlID0gcmVjb21tZW5kSW5mby50aXRsZTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKCFyZWNvbW1lbmRJbmZvKSByZXR1cm47XG4gICAgY29uc3QgdmlkZW9BcmdzID0ge307XG4gICAgaWYgKHRoaXMuc2hvd2lkKSB7XG4gICAgICB2aWRlb0FyZ3Muc2hvd2lkID0gdGhpcy5zaG93aWQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZpZGVvQXJncy52aWQgPSB0aGlzLnZpZDtcbiAgICB9XG4gICAgZ2V0TW9kdWxlQ29tbWVudChyZWNvbW1lbmRJbmZvLCB2aWRlb0FyZ3MsIChkYXRhKSA9PiB7XG4gICAgICBjb25zdCB0ZW1wRGF0YSA9IFtdO1xuICAgICAgLy8g6YeN5p6E5pWw5o2uXG4gICAgICBmb3IgKGxldCBrZXkgaW4gZGF0YSkge1xuICAgICAgICBjb25zdCBpdGVtRGF0YSA9IGRhdGFba2V5XTtcbiAgICAgICAgaWYgKGl0ZW1EYXRhLmhhc093blByb3BlcnR5KCdyZXB1dGF0aW9uJykpIHtcbiAgICAgICAgICBpdGVtRGF0YS5yZXB1dGF0aW9uID0gaXRlbURhdGEucmVwdXRhdGlvbi50b0ZpeGVkKDEpO1xuICAgICAgICAgIGNvbnN0IHNjb3JlQXJyYXkgPSBpdGVtRGF0YS5yZXB1dGF0aW9uLnRvU3RyaW5nKCkuc3BsaXQoJy4nKTtcbiAgICAgICAgICBpdGVtRGF0YS5maXJzdFNjb3JlID0gc2NvcmVBcnJheVswXTtcblxuICAgICAgICAgIGlmIChzY29yZUFycmF5Lmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgaXRlbURhdGEuc2Vjb25kU2NvcmUgPSAwO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpdGVtRGF0YS5zZWNvbmRTY29yZSA9IHNjb3JlQXJyYXlbMV07XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRlbXBEYXRhLnB1c2goaXRlbURhdGEpO1xuICAgICAgfVxuICAgICAgdGhpcy50b3RhbE51bSA9IHRlbXBEYXRhLmxlbmd0aDtcbiAgICAgIHRoaXMucGFnZSA9IE1hdGguY2VpbCh0aGlzLnRvdGFsTnVtIC8gcGFyc2VJbnQodGhpcy5udW0pKTtcbiAgICAgIGlmICh0aGlzLnBhZ2UgPCAxIHx8IHRoaXMucGFnZSA9PT0gMSkge1xuICAgICAgICB0aGlzLnJlY29tbWVuZExpc3QgPSB0ZW1wRGF0YTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5udW07IGkrKykge1xuICAgICAgICAgIHRoaXMucmVjb21tZW5kTGlzdC5wdXNoKHRlbXBEYXRhW2ldKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgdGhpcy5pdGVtcyA9IHRlbXBEYXRhO1xuICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICB9KTtcbiAgfVxufVxuIl19