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

var WebContainer = function(_wepy$page) {
    _inherits(WebContainer, _wepy$page);
    function WebContainer() {
        var _ref;
        var _temp, _this, _ret;
        _classCallCheck(this, WebContainer);
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }
        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = WebContainer.__proto__ || Object.getPrototypeOf(WebContainer)).call.apply(_ref, [ this ].concat(args))), 
        _this), _this.config = {
            navigationBarTitleText: "优酷视频"
        }, _this.data = {
            url: "",
            canIUse: _wepy2.default.canIUse("web-view")
        }, _this.components = {}, _temp), _possibleConstructorReturn(_this, _ret);
    }
    _createClass(WebContainer, [ {
        key: "onLoad",
        value: function onLoad(params) {
            if (params.url) {
                this.url = decodeURIComponent(params.url);
                this.$apply();
            }
        }
    } ]);
    return WebContainer;
}(_wepy2.default.page);

Page(require("./../../npm/wepy/lib/wepy.js").default.$createPage(WebContainer, "pages/play/webcontainer"));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYmNvbnRhaW5lci5qcyJdLCJuYW1lcyI6WyJXZWJDb250YWluZXIiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiZGF0YSIsInVybCIsImNhbklVc2UiLCJjb21wb25lbnRzIiwicGFyYW1zIiwiZGVjb2RlVVJJQ29tcG9uZW50IiwiJGFwcGx5IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQkEsWTs7Ozs7Ozs7Ozs7Ozs7a01BQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRGpCLEssUUFJVEMsSSxHQUFPO0FBQ0xDLFdBQUssRUFEQTtBQUVMQyxlQUFTLGVBQUtBLE9BQUwsQ0FBYSxVQUFiO0FBRkosSyxRQUlQQyxVLEdBQWE7QUFDWDtBQURXLEs7Ozs7OzJCQUlOQyxNLEVBQVE7QUFDYixVQUFJQSxPQUFPSCxHQUFYLEVBQWdCO0FBQ2QsYUFBS0EsR0FBTCxHQUFXSSxtQkFBbUJELE9BQU9ILEdBQTFCLENBQVg7QUFDQSxhQUFLSyxNQUFMO0FBQ0Q7QUFDRjs7OztFQWxCdUMsZUFBS0MsSTs7a0JBQTFCVixZIiwiZmlsZSI6IndlYmNvbnRhaW5lci5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFdlYkNvbnRhaW5lciBleHRlbmRzIHdlcHkucGFnZSB7XG4gIGNvbmZpZyA9IHtcbiAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5LyY6YW36KeG6aKRJ1xuICB9O1xuXG4gIGRhdGEgPSB7XG4gICAgdXJsOiAnJyxcbiAgICBjYW5JVXNlOiB3ZXB5LmNhbklVc2UoJ3dlYi12aWV3JylcbiAgfTtcbiAgY29tcG9uZW50cyA9IHtcbiAgICAvLyBmb290ZXI6IEZvb3RlclxuICB9O1xuXG4gIG9uTG9hZChwYXJhbXMpIHtcbiAgICBpZiAocGFyYW1zLnVybCkge1xuICAgICAgdGhpcy51cmwgPSBkZWNvZGVVUklDb21wb25lbnQocGFyYW1zLnVybCk7XG4gICAgICB0aGlzLiRhcHBseSgpO1xuICAgIH1cbiAgfVxufVxuIl19