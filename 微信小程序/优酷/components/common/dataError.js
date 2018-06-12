Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = undefined;

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

var DataError = function(_wepy$component) {
    _inherits(DataError, _wepy$component);
    function DataError() {
        var _ref;
        var _temp, _this, _ret;
        _classCallCheck(this, DataError);
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }
        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = DataError.__proto__ || Object.getPrototypeOf(DataError)).call.apply(_ref, [ this ].concat(args))), 
        _this), _this.props = {
            errorType: String,
            errorContent: {
                type: String,
                default: ""
            }
        }, _this.watch = {
            errorType: function errorType(newValue, oldValue) {
                if (newValue === "nonetwork") {
                    this.errorContent = "您还没有连接网络";
                } else if (newValue === "dataloaderror") {
                    this.errorContent = "您想要的内容走丢了，刷新下试试？";
                } else if (newValue === "nodataerror") {} else {
                    this.errorContent = "加载失败，请尝试刷新";
                }
                this.$apply();
            }
        }, _this.methods = {
            refrashData: function refrashData() {
                this.$emit("REFRASH", "dataError");
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }
    return DataError;
}(_wepy2.default.component);

exports.default = DataError;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRhdGFFcnJvci5qcyJdLCJuYW1lcyI6WyJEYXRhRXJyb3IiLCJwcm9wcyIsImVycm9yVHlwZSIsIlN0cmluZyIsImVycm9yQ29udGVudCIsInR5cGUiLCJkZWZhdWx0Iiwid2F0Y2giLCJuZXdWYWx1ZSIsIm9sZFZhbHVlIiwiJGFwcGx5IiwibWV0aG9kcyIsInJlZnJhc2hEYXRhIiwiJGVtaXQiLCJjb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBQ3FCQSxTOzs7Ozs7Ozs7Ozs7Ozs0TEFDbkJDLEssR0FBUTtBQUNOQyxpQkFBV0MsTUFETDtBQUVOQyxvQkFBYztBQUNaQyxjQUFNRixNQURNO0FBRVpHLGlCQUFTO0FBRkc7QUFGUixLLFFBT1JDLEssR0FBUTtBQUNOTCxlQURNLHFCQUNJTSxRQURKLEVBQ2NDLFFBRGQsRUFDd0I7QUFDNUIsWUFBSUQsYUFBYSxXQUFqQixFQUE4QjtBQUM1QixlQUFLSixZQUFMLEdBQW9CLFVBQXBCO0FBQ0QsU0FGRCxNQUVPLElBQUlJLGFBQWEsZUFBakIsRUFBa0M7QUFDdkMsZUFBS0osWUFBTCxHQUFvQixrQkFBcEI7QUFDRCxTQUZNLE1BRUEsSUFBSUksYUFBYSxhQUFqQixFQUFnQyxDQUV0QyxDQUZNLE1BRUE7QUFDTCxlQUFLSixZQUFMLEdBQW9CLFlBQXBCO0FBQ0Q7QUFDRCxhQUFLTSxNQUFMO0FBQ0Q7QUFaSyxLLFFBY1JDLE8sR0FBVTtBQUNSQyxpQkFEUSx5QkFDTTtBQUNaLGFBQUtDLEtBQUwsQ0FBVyxTQUFYLEVBQXNCLFdBQXRCO0FBQ0Q7QUFITyxLOzs7O0VBdEIyQixlQUFLQyxTOztrQkFBdkJkLFMiLCJmaWxlIjoiZGF0YUVycm9yLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERhdGFFcnJvciBleHRlbmRzIHdlcHkuY29tcG9uZW50IHtcbiAgcHJvcHMgPSB7XG4gICAgZXJyb3JUeXBlOiBTdHJpbmcsXG4gICAgZXJyb3JDb250ZW50OiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICBkZWZhdWx0OiAnJ1xuICAgIH1cbiAgfVxuICB3YXRjaCA9IHtcbiAgICBlcnJvclR5cGUobmV3VmFsdWUsIG9sZFZhbHVlKSB7XG4gICAgICBpZiAobmV3VmFsdWUgPT09ICdub25ldHdvcmsnKSB7XG4gICAgICAgIHRoaXMuZXJyb3JDb250ZW50ID0gJ+aCqOi/mOayoeaciei/nuaOpee9kee7nCc7XG4gICAgICB9IGVsc2UgaWYgKG5ld1ZhbHVlID09PSAnZGF0YWxvYWRlcnJvcicpIHtcbiAgICAgICAgdGhpcy5lcnJvckNvbnRlbnQgPSAn5oKo5oOz6KaB55qE5YaF5a656LWw5Lii5LqG77yM5Yi35paw5LiL6K+V6K+V77yfJztcbiAgICAgIH0gZWxzZSBpZiAobmV3VmFsdWUgPT09ICdub2RhdGFlcnJvcicpIHtcblxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5lcnJvckNvbnRlbnQgPSAn5Yqg6L295aSx6LSl77yM6K+35bCd6K+V5Yi35pawJztcbiAgICAgIH1cbiAgICAgIHRoaXMuJGFwcGx5KCk7XG4gICAgfVxuICB9XG4gIG1ldGhvZHMgPSB7XG4gICAgcmVmcmFzaERhdGEoKSB7XG4gICAgICB0aGlzLiRlbWl0KCdSRUZSQVNIJywgJ2RhdGFFcnJvcicpO1xuICAgIH1cbiAgfTtcbn1cbiJdfQ==