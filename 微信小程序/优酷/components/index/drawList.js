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

var drawList = function(_wepy$component) {
    _inherits(drawList, _wepy$component);
    function drawList() {
        var _ref;
        var _temp, _this, _ret;
        _classCallCheck(this, drawList);
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }
        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = drawList.__proto__ || Object.getPrototypeOf(drawList)).call.apply(_ref, [ this ].concat(args))), 
        _this), _this.props = {
            CompontentData: Object,
            pageData: Object,
            type: String
        }, _this.methods = {
            jumpToPlay: function jumpToPlay(data) {
                this.$emit("NavigateToPlay", data);
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }
    return drawList;
}(_wepy2.default.component);

exports.default = drawList;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRyYXdMaXN0LmpzIl0sIm5hbWVzIjpbImRyYXdMaXN0IiwicHJvcHMiLCJDb21wb250ZW50RGF0YSIsIk9iamVjdCIsInBhZ2VEYXRhIiwidHlwZSIsIlN0cmluZyIsIm1ldGhvZHMiLCJqdW1wVG9QbGF5IiwiZGF0YSIsIiRlbWl0IiwiY29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQkEsUTs7Ozs7Ozs7Ozs7Ozs7MExBQ25CQyxLLEdBQVE7QUFDTkMsc0JBQWdCQyxNQURWO0FBRU5DLGdCQUFVRCxNQUZKO0FBR05FLFlBQU1DO0FBSEEsSyxRQUtSQyxPLEdBQVU7QUFDUkMsZ0JBRFEsc0JBQ0dDLElBREgsRUFDUztBQUNmLGFBQUtDLEtBQUwsQ0FBVyxnQkFBWCxFQUE2QkQsSUFBN0I7QUFDRDtBQUhPLEs7Ozs7RUFOMEIsZUFBS0UsUzs7a0JBQXRCWCxRIiwiZmlsZSI6ImRyYXdMaXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZHJhd0xpc3QgZXh0ZW5kcyB3ZXB5LmNvbXBvbmVudCB7XG4gIHByb3BzID0ge1xuICAgIENvbXBvbnRlbnREYXRhOiBPYmplY3QsXG4gICAgcGFnZURhdGE6IE9iamVjdCxcbiAgICB0eXBlOiBTdHJpbmdcbiAgfTtcbiAgbWV0aG9kcyA9IHtcbiAgICBqdW1wVG9QbGF5KGRhdGEpIHtcbiAgICAgIHRoaXMuJGVtaXQoJ05hdmlnYXRlVG9QbGF5JywgZGF0YSk7XG4gICAgfVxuICB9O1xufVxuIl19