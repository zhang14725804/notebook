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

var singlePicture = function(_wepy$component) {
    _inherits(singlePicture, _wepy$component);
    function singlePicture() {
        var _ref;
        var _temp, _this, _ret;
        _classCallCheck(this, singlePicture);
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }
        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = singlePicture.__proto__ || Object.getPrototypeOf(singlePicture)).call.apply(_ref, [ this ].concat(args))), 
        _this), _this.props = {
            CompontentData: Object
        }, _this.methods = {
            jumpToPlay: function jumpToPlay(data) {
                this.$emit("NavigateToPlay", data);
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }
    return singlePicture;
}(_wepy2.default.component);

exports.default = singlePicture;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNpbmdsZVBpY3R1cmUuanMiXSwibmFtZXMiOlsic2luZ2xlUGljdHVyZSIsInByb3BzIiwiQ29tcG9udGVudERhdGEiLCJPYmplY3QiLCJtZXRob2RzIiwianVtcFRvUGxheSIsImRhdGEiLCIkZW1pdCIsImNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLGE7Ozs7Ozs7Ozs7Ozs7O29NQUNuQkMsSyxHQUFRO0FBQ05DLHNCQUFnQkM7QUFEVixLLFFBR1JDLE8sR0FBVTtBQUNSQyxnQkFEUSxzQkFDR0MsSUFESCxFQUNTO0FBQ2YsYUFBS0MsS0FBTCxDQUFXLGdCQUFYLEVBQTZCRCxJQUE3QjtBQUNEO0FBSE8sSzs7OztFQUorQixlQUFLRSxTOztrQkFBM0JSLGEiLCJmaWxlIjoic2luZ2xlUGljdHVyZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIHNpbmdsZVBpY3R1cmUgZXh0ZW5kcyB3ZXB5LmNvbXBvbmVudCB7XG4gIHByb3BzID0ge1xuICAgIENvbXBvbnRlbnREYXRhOiBPYmplY3RcbiAgfTtcbiAgbWV0aG9kcyA9IHtcbiAgICBqdW1wVG9QbGF5KGRhdGEpIHtcbiAgICAgIHRoaXMuJGVtaXQoJ05hdmlnYXRlVG9QbGF5JywgZGF0YSk7XG4gICAgfVxuICB9O1xufVxuIl19