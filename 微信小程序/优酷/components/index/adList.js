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

var adList = function(_wepy$component) {
    _inherits(adList, _wepy$component);
    function adList() {
        var _ref;
        var _temp, _this, _ret;
        _classCallCheck(this, adList);
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }
        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = adList.__proto__ || Object.getPrototypeOf(adList)).call.apply(_ref, [ this ].concat(args))), 
        _this), _this.props = {
            CompontentData: Object,
            type: String
        }, _this.methods = {
            jumpToPlay: function jumpToPlay(data) {
                this.$emit("NavigateToPlay", data);
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }
    return adList;
}(_wepy2.default.component);

exports.default = adList;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFkTGlzdC5qcyJdLCJuYW1lcyI6WyJhZExpc3QiLCJwcm9wcyIsIkNvbXBvbnRlbnREYXRhIiwiT2JqZWN0IiwidHlwZSIsIlN0cmluZyIsIm1ldGhvZHMiLCJqdW1wVG9QbGF5IiwiZGF0YSIsIiRlbWl0IiwiY29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQkEsTTs7Ozs7Ozs7Ozs7Ozs7c0xBQ25CQyxLLEdBQVE7QUFDTkMsc0JBQWdCQyxNQURWO0FBRU5DLFlBQU1DO0FBRkEsSyxRQUlSQyxPLEdBQVU7QUFDUkMsZ0JBRFEsc0JBQ0dDLElBREgsRUFDUztBQUNmLGFBQUtDLEtBQUwsQ0FBVyxnQkFBWCxFQUE2QkQsSUFBN0I7QUFDRDtBQUhPLEs7Ozs7RUFMd0IsZUFBS0UsUzs7a0JBQXBCVixNIiwiZmlsZSI6ImFkTGlzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGFkTGlzdCBleHRlbmRzIHdlcHkuY29tcG9uZW50IHtcbiAgcHJvcHMgPSB7XG4gICAgQ29tcG9udGVudERhdGE6IE9iamVjdCxcbiAgICB0eXBlOiBTdHJpbmdcbiAgfVxuICBtZXRob2RzID0ge1xuICAgIGp1bXBUb1BsYXkoZGF0YSkge1xuICAgICAgdGhpcy4kZW1pdCgnTmF2aWdhdGVUb1BsYXknLCBkYXRhKTtcbiAgICB9XG4gIH07XG59XG4iXX0=