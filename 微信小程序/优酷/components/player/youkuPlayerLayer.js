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

var YoukuPlayerLayer = function(_wepy$component) {
    _inherits(YoukuPlayerLayer, _wepy$component);
    function YoukuPlayerLayer() {
        var _ref;
        var _temp, _this, _ret;
        _classCallCheck(this, YoukuPlayerLayer);
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }
        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = YoukuPlayerLayer.__proto__ || Object.getPrototypeOf(YoukuPlayerLayer)).call.apply(_ref, [ this ].concat(args))), 
        _this), _this.props = {
            panelName: String,
            coverURL: String,
            openAppParam: String
        }, _this.data = {
            errorMassage: "",
            buttonContent: ""
        }, _this.watch = {
            panelName: function panelName(newValue, oldValue) {
                this.showView();
            },
            coverURL: function coverURL(newValue, oldValue) {
                this.setCover();
            }
        }, _this.methods = {
            onRefrashHandler: function onRefrashHandler() {
                if (this.panelName === "end") {
                    this.$emit("PLAYER_REPLAY");
                } else {
                    this.$emit("PLAYER_REFRASH");
                }
            },
            toPlay: function toPlay() {
                if (this.panelName === "4g") {
                    this.$emit("PLAY");
                } else if (this.panelName === "nonetwork") {
                    this.$emit("PLAYER_REFRASH");
                }
            },
            launchAppError: function launchAppError(e) {
                _wepy2.default.showModal({
                    title: "",
                    content: "由于平台限制，您需要手动打开优酷App观看完整版",
                    showCancel: false
                });
            },
            onPlayHandler: function onPlayHandler() {
                this.$emit("PLAY");
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }
    _createClass(YoukuPlayerLayer, [ {
        key: "showView",
        value: function showView() {
            switch (this.panelName) {
              case "nonetwork":
                this.coverURL = "/image/video-cover.png";
                this.errorMassage = "您还没有连接网络";
                this.buttonContent = "尝试刷新";
                break;

              case "vip":
                this.errorMassage = "VIP会员专享视频，开通会员免费看";
                this.buttonContent = "去客户端开通";
                break;

              case "error":
                this.errorMassage = "视频暂时无法播放，小酷正全力修复中，非常抱歉";
                this.buttonContent = "去客户端观看";
                break;

              case "end":
                this.errorMassage = null;
                this.buttonContent = "去观看完整版";
                break;

              case "4g":
                this.errorMassage = "您正在使用非wifi网络";
                this.buttonContent = "使用流量播放";
                break;
            }
            this.$apply();
        }
    }, {
        key: "setCover",
        value: function setCover() {
            if (this.panelName === "nonetwork") {
                this.coverURL = "/image/video-cover.png";
                this.$apply();
            }
        }
    }, {
        key: "onLoad",
        value: function onLoad() {}
    } ]);
    return YoukuPlayerLayer;
}(_wepy2.default.component);

exports.default = YoukuPlayerLayer;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInlvdWt1UGxheWVyTGF5ZXIuanMiXSwibmFtZXMiOlsiWW91a3VQbGF5ZXJMYXllciIsInByb3BzIiwicGFuZWxOYW1lIiwiU3RyaW5nIiwiY292ZXJVUkwiLCJvcGVuQXBwUGFyYW0iLCJkYXRhIiwiZXJyb3JNYXNzYWdlIiwiYnV0dG9uQ29udGVudCIsIndhdGNoIiwibmV3VmFsdWUiLCJvbGRWYWx1ZSIsInNob3dWaWV3Iiwic2V0Q292ZXIiLCJtZXRob2RzIiwib25SZWZyYXNoSGFuZGxlciIsIiRlbWl0IiwidG9QbGF5IiwibGF1bmNoQXBwRXJyb3IiLCJlIiwic2hvd01vZGFsIiwidGl0bGUiLCJjb250ZW50Iiwic2hvd0NhbmNlbCIsIm9uUGxheUhhbmRsZXIiLCIkYXBwbHkiLCJjb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFDcUJBLGdCOzs7Ozs7Ozs7Ozs7OzswTUFDbkJDLEssR0FBUTtBQUNOQyxpQkFBV0MsTUFETDtBQUVOQyxnQkFBVUQsTUFGSjtBQUdORSxvQkFBY0Y7QUFIUixLLFFBS1JHLEksR0FBTztBQUNMQyxvQkFBYyxFQURUO0FBRUxDLHFCQUFlO0FBRlYsSyxRQUlQQyxLLEdBQVE7QUFDTlAsZUFETSxxQkFDSVEsUUFESixFQUNjQyxRQURkLEVBQ3dCO0FBQzVCLGFBQUtDLFFBQUw7QUFDRCxPQUhLO0FBSU5SLGNBSk0sb0JBSUdNLFFBSkgsRUFJYUMsUUFKYixFQUl1QjtBQUMzQixhQUFLRSxRQUFMO0FBQ0Q7QUFOSyxLLFFBUVJDLE8sR0FBVTtBQUNSQyxzQkFEUSw4QkFDVztBQUNqQixZQUFJLEtBQUtiLFNBQUwsS0FBbUIsS0FBdkIsRUFBOEI7QUFDNUIsZUFBS2MsS0FBTCxDQUFXLGVBQVg7QUFDRCxTQUZELE1BRU87QUFDTCxlQUFLQSxLQUFMLENBQVcsZ0JBQVg7QUFDRDtBQUNGLE9BUE87QUFRUkMsWUFSUSxvQkFRQztBQUNQLFlBQUksS0FBS2YsU0FBTCxLQUFtQixJQUF2QixFQUE2QjtBQUMzQixlQUFLYyxLQUFMLENBQVcsTUFBWDtBQUNELFNBRkQsTUFFTyxJQUFJLEtBQUtkLFNBQUwsS0FBbUIsV0FBdkIsRUFBb0M7QUFDekMsZUFBS2MsS0FBTCxDQUFXLGdCQUFYO0FBQ0Q7QUFDRixPQWRPO0FBZVJFLG9CQWZRLDBCQWVPQyxDQWZQLEVBZVU7QUFDaEIsdUJBQUtDLFNBQUwsQ0FBZTtBQUNiQyxpQkFBTyxFQURNO0FBRWJDLG1CQUFTLDBCQUZJO0FBR2JDLHNCQUFZO0FBSEMsU0FBZjtBQUtELE9BckJPO0FBc0JSQyxtQkF0QlEsMkJBc0JRO0FBQ2QsYUFBS1IsS0FBTCxDQUFXLE1BQVg7QUFDRDtBQXhCTyxLOzs7OzsrQkEwQkM7QUFDVCxjQUFRLEtBQUtkLFNBQWI7QUFDRSxhQUFLLFdBQUw7QUFDRSxlQUFLRSxRQUFMLEdBQWdCLHdCQUFoQjtBQUNBLGVBQUtHLFlBQUwsR0FBb0IsVUFBcEI7QUFDQSxlQUFLQyxhQUFMLEdBQXFCLE1BQXJCO0FBQ0E7QUFDRixhQUFLLEtBQUw7QUFDRSxlQUFLRCxZQUFMLEdBQW9CLG1CQUFwQjtBQUNBLGVBQUtDLGFBQUwsR0FBcUIsUUFBckI7QUFDQTtBQUNGLGFBQUssT0FBTDtBQUNFLGVBQUtELFlBQUwsR0FBb0Isd0JBQXBCO0FBQ0EsZUFBS0MsYUFBTCxHQUFxQixRQUFyQjtBQUNBO0FBQ0YsYUFBSyxLQUFMO0FBQ0UsZUFBS0QsWUFBTCxHQUFvQixJQUFwQjtBQUNBLGVBQUtDLGFBQUwsR0FBcUIsUUFBckI7QUFDQTtBQUNGLGFBQUssSUFBTDtBQUNFLGVBQUtELFlBQUwsR0FBb0IsY0FBcEI7QUFDQSxlQUFLQyxhQUFMLEdBQXFCLFFBQXJCO0FBQ0E7QUFyQko7QUF1QkEsV0FBS2lCLE1BQUw7QUFDRDs7OytCQUNVO0FBQ1QsVUFBSSxLQUFLdkIsU0FBTCxLQUFtQixXQUF2QixFQUFvQztBQUNsQyxhQUFLRSxRQUFMLEdBQWdCLHdCQUFoQjtBQUNBLGFBQUtxQixNQUFMO0FBQ0Q7QUFDRjs7OzZCQUNRLENBRVI7Ozs7RUE5RTJDLGVBQUtDLFM7O2tCQUE5QjFCLGdCIiwiZmlsZSI6InlvdWt1UGxheWVyTGF5ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgWW91a3VQbGF5ZXJMYXllciBleHRlbmRzIHdlcHkuY29tcG9uZW50IHtcbiAgcHJvcHMgPSB7XG4gICAgcGFuZWxOYW1lOiBTdHJpbmcsXG4gICAgY292ZXJVUkw6IFN0cmluZyxcbiAgICBvcGVuQXBwUGFyYW06IFN0cmluZ1xuICB9O1xuICBkYXRhID0ge1xuICAgIGVycm9yTWFzc2FnZTogJycsXG4gICAgYnV0dG9uQ29udGVudDogJydcbiAgfVxuICB3YXRjaCA9IHtcbiAgICBwYW5lbE5hbWUobmV3VmFsdWUsIG9sZFZhbHVlKSB7XG4gICAgICB0aGlzLnNob3dWaWV3KCk7XG4gICAgfSxcbiAgICBjb3ZlclVSTChuZXdWYWx1ZSwgb2xkVmFsdWUpIHtcbiAgICAgIHRoaXMuc2V0Q292ZXIoKTtcbiAgICB9XG4gIH07XG4gIG1ldGhvZHMgPSB7XG4gICAgb25SZWZyYXNoSGFuZGxlcigpIHtcbiAgICAgIGlmICh0aGlzLnBhbmVsTmFtZSA9PT0gJ2VuZCcpIHtcbiAgICAgICAgdGhpcy4kZW1pdCgnUExBWUVSX1JFUExBWScpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy4kZW1pdCgnUExBWUVSX1JFRlJBU0gnKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIHRvUGxheSgpIHtcbiAgICAgIGlmICh0aGlzLnBhbmVsTmFtZSA9PT0gJzRnJykge1xuICAgICAgICB0aGlzLiRlbWl0KCdQTEFZJyk7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMucGFuZWxOYW1lID09PSAnbm9uZXR3b3JrJykge1xuICAgICAgICB0aGlzLiRlbWl0KCdQTEFZRVJfUkVGUkFTSCcpO1xuICAgICAgfVxuICAgIH0sXG4gICAgbGF1bmNoQXBwRXJyb3IoZSkge1xuICAgICAgd2VweS5zaG93TW9kYWwoe1xuICAgICAgICB0aXRsZTogJycsXG4gICAgICAgIGNvbnRlbnQ6ICfnlLHkuo7lubPlj7DpmZDliLbvvIzmgqjpnIDopoHmiYvliqjmiZPlvIDkvJjphbdBcHDop4LnnIvlrozmlbTniYgnLFxuICAgICAgICBzaG93Q2FuY2VsOiBmYWxzZVxuICAgICAgfSk7XG4gICAgfSxcbiAgICBvblBsYXlIYW5kbGVyKCkge1xuICAgICAgdGhpcy4kZW1pdCgnUExBWScpO1xuICAgIH1cbiAgfTtcbiAgc2hvd1ZpZXcoKSB7XG4gICAgc3dpdGNoICh0aGlzLnBhbmVsTmFtZSkge1xuICAgICAgY2FzZSAnbm9uZXR3b3JrJzpcbiAgICAgICAgdGhpcy5jb3ZlclVSTCA9ICcvaW1hZ2UvdmlkZW8tY292ZXIucG5nJztcbiAgICAgICAgdGhpcy5lcnJvck1hc3NhZ2UgPSAn5oKo6L+Y5rKh5pyJ6L+e5o6l572R57ucJztcbiAgICAgICAgdGhpcy5idXR0b25Db250ZW50ID0gJ+WwneivleWIt+aWsCc7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAndmlwJzpcbiAgICAgICAgdGhpcy5lcnJvck1hc3NhZ2UgPSAnVklQ5Lya5ZGY5LiT5Lqr6KeG6aKR77yM5byA6YCa5Lya5ZGY5YWN6LS555yLJztcbiAgICAgICAgdGhpcy5idXR0b25Db250ZW50ID0gJ+WOu+WuouaIt+err+W8gOmAmic7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnZXJyb3InOlxuICAgICAgICB0aGlzLmVycm9yTWFzc2FnZSA9ICfop4bpopHmmoLml7bml6Dms5Xmkq3mlL7vvIzlsI/phbfmraPlhajlipvkv67lpI3kuK3vvIzpnZ7luLjmirHmrYknO1xuICAgICAgICB0aGlzLmJ1dHRvbkNvbnRlbnQgPSAn5Y675a6i5oi356uv6KeC55yLJztcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdlbmQnOlxuICAgICAgICB0aGlzLmVycm9yTWFzc2FnZSA9IG51bGw7XG4gICAgICAgIHRoaXMuYnV0dG9uQ29udGVudCA9ICfljrvop4LnnIvlrozmlbTniYgnO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJzRnJzpcbiAgICAgICAgdGhpcy5lcnJvck1hc3NhZ2UgPSAn5oKo5q2j5Zyo5L2/55So6Z2ed2lmaee9kee7nCc7XG4gICAgICAgIHRoaXMuYnV0dG9uQ29udGVudCA9ICfkvb/nlKjmtYHph4/mkq3mlL4nO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gICAgdGhpcy4kYXBwbHkoKTtcbiAgfVxuICBzZXRDb3ZlcigpIHtcbiAgICBpZiAodGhpcy5wYW5lbE5hbWUgPT09ICdub25ldHdvcmsnKSB7XG4gICAgICB0aGlzLmNvdmVyVVJMID0gJy9pbWFnZS92aWRlby1jb3Zlci5wbmcnO1xuICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICB9XG4gIH1cbiAgb25Mb2FkKCkge1xuXG4gIH1cbn1cbiJdfQ==