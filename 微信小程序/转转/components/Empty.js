function _interopRequireDefault(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function _classCallCheck(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

function _possibleConstructorReturn(e, t) {
    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !t || "object" != typeof t && "function" != typeof t ? e : t;
}

function _inherits(e, t) {
    if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
    e.prototype = Object.create(t && t.prototype, {
        constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = void 0;

var _wepy = require("./../npm/wepy/lib/wepy.js"), _wepy2 = _interopRequireDefault(_wepy), _wxPromise = require("./../lib/wxPromise.js"), Empty = function(e) {
    function t() {
        var e, o, n, r;
        _classCallCheck(this, t);
        for (var i = arguments.length, s = Array(i), a = 0; a < i; a++) s[a] = arguments[a];
        return o = n = _possibleConstructorReturn(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [ this ].concat(s))), 
        n.data = {}, n.props = {
            bgLogo: {
                type: String,
                default: "https://img.58cdn.com.cn/zhuanzhuan/zzwa/common/no_data.png"
            },
            btnText: {
                type: String,
                default: "发布"
            },
            showBtn: {
                type: Boolean,
                default: !1
            },
            contentText: {
                type: String,
                default: "您还没有发布任何宝贝哦！马上发布赚赚零花钱！"
            },
            iwant: {
                type: Boolean,
                default: !1
            }
        }, n.methods = {
            enterRelease: function(e) {
                this.$emit("childFn"), _wxPromise.wxPromise.navigateTo({
                    url: "/pages/post/post"
                });
            }
        }, r = o, _possibleConstructorReturn(n, r);
    }
    return _inherits(t, e), t;
}(_wepy2.default.component);

exports.default = Empty;