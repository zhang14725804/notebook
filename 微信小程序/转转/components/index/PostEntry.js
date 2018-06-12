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

var _wepy = require("./../../npm/wepy/lib/wepy.js"), _wepy2 = _interopRequireDefault(_wepy), _operationKit = require("./../../lib/operationKit.js"), _default = function(e) {
    function t() {
        var e, n, o, r;
        _classCallCheck(this, t);
        for (var i = arguments.length, a = Array(i), s = 0; s < i; s++) a[s] = arguments[s];
        return n = o = _possibleConstructorReturn(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [ this ].concat(a))), 
        o.props = {
            unreadMessage: {
                type: Number
            }
        }, o.data = {
            entryData: [ {
                text: "1小时卖手机",
                img: "https://img.58cdn.com.cn/zhuanzhuan/zzwa/main/newhome/post_phone2.png",
                link: "pages/webview/webview?url=https%3A%2F%2Fm.zhuanzhuan.58.com%2Fyoupin%2FB%2Fhelpsale%2Ftype%3FcurrentTab%3D0%26channel%3D1004"
            }, {
                text: "一键卖书",
                img: "https://img.58cdn.com.cn/zhuanzhuan/zzwa/main/newhome/post_book2.png",
                link: "pages/webview/webview?url=https%3A%2F%2Fwxzhuanzhuan.58.com%2FMzhuanzhuan%2FZZBook%2F%3Fzzfrom%3Dposttest1%26fromChannel%3Dposttest1%23%2FnewSellBookHome"
            }, {
                text: "卖其他",
                img: "https://img.58cdn.com.cn/zhuanzhuan/zzwa/main/newhome/post_other2.png",
                link: "pages/post/post?pageChannel=postEntryB"
            } ],
            getPostEntryAsync: null
        }, o.methods = {
            touchmove: function() {},
            hideEntry: function() {
                this.$emit("eventHidePostTip");
            },
            clickEntry: function(e) {
                var t = "CLICK-SELL-ENTRYB-" + e;
                this.$log(t);
                var n = this.entryData[e].link;
                n && ("/" != n[0] && (n = "/" + n), this.$wxPromise.navigateTo({
                    url: n
                }));
            }
        }, r = n, _possibleConstructorReturn(o, r);
    }
    return _inherits(t, e), t;
}(_wepy2.default.component);

exports.default = _default;