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

var VipBanner = function(_wepy$component) {
    _inherits(VipBanner, _wepy$component);
    function VipBanner() {
        var _ref;
        var _temp, _this, _ret;
        _classCallCheck(this, VipBanner);
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }
        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = VipBanner.__proto__ || Object.getPrototypeOf(VipBanner)).call.apply(_ref, [ this ].concat(args))), 
        _this), _this.data = {
            name: "banner",
            isShow: true,
            info: "送您三天优酷会员，点击领取",
            secret: "",
            bannerConfig: {}
        }, _this.props = {
            pageConfig: Object,
            vid: String,
            playPageData: Object,
            openAppParam: String,
            coverURL: String,
            videoData: Object
        }, _this.methods = {
            clickHandler: function clickHandler(e) {
                (0, _API.sendEventLog)({
                    eventCode: "00001"
                });
                this.requestUML();
            },
            launchAppError: function launchAppError(e) {
                _wepy2.default.showModal({
                    title: "",
                    content: "由于平台限制，您需要手动打开优酷App",
                    showCancel: false
                });
            }
        }, _this.watch = {
            pageConfig: function pageConfig(newValue) {
                this.setConfig();
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }
    _createClass(VipBanner, [ {
        key: "setSource",
        value: function setSource() {
            if (this.bannerConfig.content) {
                this.info = this.bannerConfig.content;
            }
        }
        /**
     * 请求优密令
     */    }, {
        key: "requestUML",
        value: function requestUML() {
            var _this2 = this;
            var videoId = this.vid ? this.vid : this.playPageData.currentVid;
            var options = {};
            options.url = _API.URL_ADDRESS.GET_UML;
            options.sign = true;
            var _params = {};
            // _params.bizType = 'ykPassword.genPassword';
                        var bizParam = {};
            bizParam.targetUrl = "https://v.youku.com/v_show/id_" + videoId + ".html";
            bizParam.sourceType = "video";
            bizParam.bizId = "common";
            bizParam.videoId = videoId;
            bizParam.btnName = this.bannerConfig.btnname;
            bizParam.watchCount = this.videoData.totalVv;
            bizParam.title = this.videoData.title;
            bizParam.openAppName = "";
            bizParam.picUrl = this.coverURL;
            bizParam.extendInfo = {
                taskId: this.bannerConfig.taskid
            };
            _params.params = JSON.stringify(bizParam);
            options.data = _params;
            options.callback = function(res) {
                if (res.result.data && res.result.data.data && res.result.data.data.model) {
                    _this2.secret = res.result.data.data.model.content;
                    _this2.requestUMLComplete();
                }
            };
            (0, _API.requestData)(options);
        }
    }, {
        key: "requestUMLComplete",
        /**
     * 优密令加载结束，复制道剪切板
     */
        value: function requestUMLComplete() {
            _wepy2.default.setClipboardData({
                data: this.secret,
                success: function success(res) {
                    console.log("复制成功");
                }
            });
        }
    }, {
        key: "onLoad",
        value: function onLoad() {
            if (this.pageConfig) {
                this.setConfig();
            }
        }
    }, {
        key: "setConfig",
        value: function setConfig() {
            this.bannerConfig = this.pageConfig[this.name];
            if (parseInt(this.bannerConfig.isshow) === 1) {
                this.isShow = true;
            } else {
                this.isShow = false;
            }
            this.setSource();
            if (this.bannerConfig.secret) {
                this.secret = this.bannerConfig.secret;
            }
            this.$apply();
        }
    } ]);
    return VipBanner;
}(_wepy2.default.component);

exports.default = VipBanner;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZpcEJhbm5lci5qcyJdLCJuYW1lcyI6WyJWaXBCYW5uZXIiLCJkYXRhIiwibmFtZSIsImlzU2hvdyIsImluZm8iLCJzZWNyZXQiLCJiYW5uZXJDb25maWciLCJwcm9wcyIsInBhZ2VDb25maWciLCJPYmplY3QiLCJ2aWQiLCJTdHJpbmciLCJwbGF5UGFnZURhdGEiLCJvcGVuQXBwUGFyYW0iLCJjb3ZlclVSTCIsInZpZGVvRGF0YSIsIm1ldGhvZHMiLCJjbGlja0hhbmRsZXIiLCJlIiwiZXZlbnRDb2RlIiwicmVxdWVzdFVNTCIsImxhdW5jaEFwcEVycm9yIiwic2hvd01vZGFsIiwidGl0bGUiLCJjb250ZW50Iiwic2hvd0NhbmNlbCIsIndhdGNoIiwibmV3VmFsdWUiLCJzZXRDb25maWciLCJ2aWRlb0lkIiwiY3VycmVudFZpZCIsIm9wdGlvbnMiLCJ1cmwiLCJHRVRfVU1MIiwic2lnbiIsIl9wYXJhbXMiLCJiaXpQYXJhbSIsInRhcmdldFVybCIsInNvdXJjZVR5cGUiLCJiaXpJZCIsImJ0bk5hbWUiLCJidG5uYW1lIiwid2F0Y2hDb3VudCIsInRvdGFsVnYiLCJvcGVuQXBwTmFtZSIsInBpY1VybCIsImV4dGVuZEluZm8iLCJ0YXNraWQiLCJwYXJhbXMiLCJKU09OIiwic3RyaW5naWZ5IiwiY2FsbGJhY2siLCJyZXMiLCJyZXN1bHQiLCJtb2RlbCIsInJlcXVlc3RVTUxDb21wbGV0ZSIsInNldENsaXBib2FyZERhdGEiLCJzdWNjZXNzIiwiY29uc29sZSIsImxvZyIsInBhcnNlSW50IiwiaXNzaG93Iiwic2V0U291cmNlIiwiJGFwcGx5IiwiY29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7O0lBRXFCQSxTOzs7Ozs7Ozs7Ozs7Ozs0TEFDbkJDLEksR0FBTztBQUNMQyxZQUFNLFFBREQ7QUFFTEMsY0FBUSxJQUZIO0FBR0xDLFlBQU0sZUFIRDtBQUlMQyxjQUFRLEVBSkg7QUFLTEMsb0JBQWM7QUFMVCxL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Q0FDVztBQUNWLFdBQUt0QixZQUFMLEdBQW9CLEtBQUtFLFVBQUwsQ0FBZ0IsS0FBS04sSUFBckIsQ0FBcEI7QUFDQSxVQUFJMEQsU0FBUyxLQUFLdEQsWUFBTCxDQUFrQnVELE1BQTNCLE1BQXVDLENBQTNDLEVBQThDO0FBQzVDLGFBQUsxRCxNQUFMLEdBQWMsSUFBZDtBQUNELE9BRkQsTUFFTztBQUNMLGFBQUtBLE1BQUwsR0FBYyxLQUFkO0FBQ0Q7QUFDRCxXQUFLMkQsU0FBTDs7QUFFQSxVQUFJLEtBQUt4RCxZQUFMLENBQWtCRCxNQUF0QixFQUE4QjtBQUM1QixhQUFLQSxNQUFMLEdBQWMsS0FBS0MsWUFBTCxDQUFrQkQsTUFBaEM7QUFDRDtBQUNELFdBQUswRCxNQUFMO0FBQ0Q7Ozs7RUF2R29DLGVBQUtDLFM7O2tCQUF2QmhFLFMiLCJmaWxlIjoidmlwQmFubmVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcbmltcG9ydCB7VVJMX0FERFJFU1MsIHJlcXVlc3REYXRhLCBzZW5kRXZlbnRMb2d9IGZyb20gJ0AvQVBJLyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFZpcEJhbm5lciBleHRlbmRzIHdlcHkuY29tcG9uZW50IHtcbiAgZGF0YSA9IHtcbiAgICBuYW1lOiAnYmFubmVyJyxcbiAgICBpc1Nob3c6IHRydWUsXG4gICAgaW5mbzogJ+mAgeaCqOS4ieWkqeS8mOmFt+S8muWRmO+8jOeCueWHu+mihuWPlicsXG4gICAgc2VjcmV0OiAnJyxcbiAgICBiYW5uZXJDb25maWc6IHt9XG4gIH07XG4gIHByb3BzID0ge1xuICAgIHBhZ2VDb25maWc6IE9iamVjdCxcbiAgICB2aWQ6IFN0cmluZyxcbiAgICBwbGF5UGFnZURhdGE6IE9iamVjdCxcbiAgICBvcGVuQXBwUGFyYW06IFN0cmluZyxcbiAgICBjb3ZlclVSTDogU3RyaW5nLFxuICAgIHZpZGVvRGF0YTogT2JqZWN0XG4gIH07XG4gIG1ldGhvZHMgPSB7XG4gICAgY2xpY2tIYW5kbGVyKGUpIHtcbiAgICAgIHNlbmRFdmVudExvZyh7ZXZlbnRDb2RlOiAnMDAwMDEnfSk7XG4gICAgICB0aGlzLnJlcXVlc3RVTUwoKTtcbiAgICB9LFxuICAgIGxhdW5jaEFwcEVycm9yKGUpIHtcbiAgICAgIHdlcHkuc2hvd01vZGFsKHtcbiAgICAgICAgdGl0bGU6ICcnLFxuICAgICAgICBjb250ZW50OiAn55Sx5LqO5bmz5Y+w6ZmQ5Yi277yM5oKo6ZyA6KaB5omL5Yqo5omT5byA5LyY6YW3QXBwJyxcbiAgICAgICAgc2hvd0NhbmNlbDogZmFsc2VcbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcbiAgd2F0Y2ggPSB7XG4gICAgcGFnZUNvbmZpZyhuZXdWYWx1ZSkge1xuICAgICAgdGhpcy5zZXRDb25maWcoKTtcbiAgICB9XG4gIH07XG5cbiAgc2V0U291cmNlKCkge1xuICAgIGlmICh0aGlzLmJhbm5lckNvbmZpZy5jb250ZW50KSB7XG4gICAgICB0aGlzLmluZm8gPSB0aGlzLmJhbm5lckNvbmZpZy5jb250ZW50O1xuICAgIH1cbiAgfVxuICAvKipcbiAgICog6K+35rGC5LyY5a+G5LukXG4gICAqL1xuICByZXF1ZXN0VU1MKCkge1xuICAgIGxldCB2aWRlb0lkID0gdGhpcy52aWQgPyB0aGlzLnZpZCA6IHRoaXMucGxheVBhZ2VEYXRhLmN1cnJlbnRWaWQ7XG5cbiAgICBjb25zdCBvcHRpb25zID0ge307XG4gICAgb3B0aW9ucy51cmwgPSBVUkxfQUREUkVTUy5HRVRfVU1MO1xuICAgIG9wdGlvbnMuc2lnbiA9IHRydWU7XG4gICAgY29uc3QgX3BhcmFtcyA9IHt9O1xuICAgIC8vIF9wYXJhbXMuYml6VHlwZSA9ICd5a1Bhc3N3b3JkLmdlblBhc3N3b3JkJztcbiAgICBjb25zdCBiaXpQYXJhbSA9IHt9O1xuXG4gICAgYml6UGFyYW0udGFyZ2V0VXJsID0gJ2h0dHBzOi8vdi55b3VrdS5jb20vdl9zaG93L2lkXycgKyB2aWRlb0lkICsgJy5odG1sJztcbiAgICBiaXpQYXJhbS5zb3VyY2VUeXBlID0gJ3ZpZGVvJztcbiAgICBiaXpQYXJhbS5iaXpJZCA9ICdjb21tb24nO1xuICAgIGJpelBhcmFtLnZpZGVvSWQgPSB2aWRlb0lkO1xuICAgIGJpelBhcmFtLmJ0bk5hbWUgPSB0aGlzLmJhbm5lckNvbmZpZy5idG5uYW1lO1xuICAgIGJpelBhcmFtLndhdGNoQ291bnQgPSB0aGlzLnZpZGVvRGF0YS50b3RhbFZ2O1xuICAgIGJpelBhcmFtLnRpdGxlID0gdGhpcy52aWRlb0RhdGEudGl0bGU7XG4gICAgYml6UGFyYW0ub3BlbkFwcE5hbWUgPSAnJztcblxuICAgIGJpelBhcmFtLnBpY1VybCA9IHRoaXMuY292ZXJVUkw7XG4gICAgYml6UGFyYW0uZXh0ZW5kSW5mbyA9IHsndGFza0lkJzogdGhpcy5iYW5uZXJDb25maWcudGFza2lkfTtcbiAgICBfcGFyYW1zLnBhcmFtcyA9IEpTT04uc3RyaW5naWZ5KGJpelBhcmFtKTtcbiAgICBvcHRpb25zLmRhdGEgPSBfcGFyYW1zO1xuICAgIG9wdGlvbnMuY2FsbGJhY2sgPSAocmVzKSA9PiB7XG4gICAgICBpZiAocmVzLnJlc3VsdC5kYXRhICYmIHJlcy5yZXN1bHQuZGF0YS5kYXRhICYmIHJlcy5yZXN1bHQuZGF0YS5kYXRhLm1vZGVsKSB7XG4gICAgICAgIHRoaXMuc2VjcmV0ID0gcmVzLnJlc3VsdC5kYXRhLmRhdGEubW9kZWwuY29udGVudDtcbiAgICAgICAgdGhpcy5yZXF1ZXN0VU1MQ29tcGxldGUoKTtcbiAgICAgIH1cbiAgICB9O1xuICAgIHJlcXVlc3REYXRhKG9wdGlvbnMpO1xuICB9O1xuICAvKipcbiAgICog5LyY5a+G5Luk5Yqg6L2957uT5p2f77yM5aSN5Yi26YGT5Ymq5YiH5p2/XG4gICAqL1xuICByZXF1ZXN0VU1MQ29tcGxldGUoKSB7XG4gICAgd2VweS5zZXRDbGlwYm9hcmREYXRhKHtcbiAgICAgIGRhdGE6IHRoaXMuc2VjcmV0LFxuICAgICAgc3VjY2VzczogKHJlcykgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZygn5aSN5Yi25oiQ5YqfJyk7XG4gICAgICB9XG4gICAgfSlcbiAgfTtcbiAgb25Mb2FkICgpIHtcbiAgICBpZiAodGhpcy5wYWdlQ29uZmlnKSB7XG4gICAgICB0aGlzLnNldENvbmZpZygpO1xuICAgIH1cbiAgfTtcbiAgc2V0Q29uZmlnKCkge1xuICAgIHRoaXMuYmFubmVyQ29uZmlnID0gdGhpcy5wYWdlQ29uZmlnW3RoaXMubmFtZV07XG4gICAgaWYgKHBhcnNlSW50KHRoaXMuYmFubmVyQ29uZmlnLmlzc2hvdykgPT09IDEpIHtcbiAgICAgIHRoaXMuaXNTaG93ID0gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5pc1Nob3cgPSBmYWxzZTtcbiAgICB9XG4gICAgdGhpcy5zZXRTb3VyY2UoKTtcblxuICAgIGlmICh0aGlzLmJhbm5lckNvbmZpZy5zZWNyZXQpIHtcbiAgICAgIHRoaXMuc2VjcmV0ID0gdGhpcy5iYW5uZXJDb25maWcuc2VjcmV0O1xuICAgIH1cbiAgICB0aGlzLiRhcHBseSgpO1xuICB9O1xufVxuIl19