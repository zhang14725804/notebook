function _interopRequireDefault(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

function _classCallCheck(t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}

function _possibleConstructorReturn(t, e) {
    if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !e || "object" != typeof e && "function" != typeof e ? t : e;
}

function _inherits(t, e) {
    if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
    t.prototype = Object.create(e && e.prototype, {
        constructor: {
            value: t,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e);
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = void 0;

var _wepy = require("./../npm/wepy/lib/wepy.js"), _wepy2 = _interopRequireDefault(_wepy), _default = function(t) {
    function e() {
        var t, o, n, r;
        _classCallCheck(this, e);
        for (var i = arguments.length, a = Array(i), u = 0; u < i; u++) a[u] = arguments[u];
        return o = n = _possibleConstructorReturn(this, (t = e.__proto__ || Object.getPrototypeOf(e)).call.apply(t, [ this ].concat(a))), 
        n.props = {
            loadStatus: {
                type: String
            }
        }, n.data = {
            tips: {
                loading: {
                    icon: "https://img.58cdn.com.cn/zhuanzhuan/zzwa/common/load_more2.png",
                    text: "加载中…"
                },
                failed: {
                    icon: "https://img.58cdn.com.cn/zhuanzhuan/zzwa/common/load_more2.png",
                    text: "加载失败"
                },
                noMore: {
                    icon: "https://img.58cdn.com.cn/zhuanzhuan/zzwa/common/load_more2.png",
                    text: "没有更多了"
                }
            }
        }, n.computed = {
            showTip: function() {
                return this.loadStatus && "idle" !== this.loadStatus;
            },
            tip: function() {
                return this.tips[this.loadStatus];
            }
        }, n.methods = {}, n.components = {}, r = o, _possibleConstructorReturn(n, r);
    }
    return _inherits(e, t), e;
}(_wepy2.default.component);

exports.default = _default;