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

var _createClass = function() {
    function e(e, t) {
        for (var o = 0; o < t.length; o++) {
            var n = t[o];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), 
            Object.defineProperty(e, n.key, n);
        }
    }
    return function(t, o, n) {
        return o && e(t.prototype, o), n && e(t, n), t;
    };
}(), _wepy = require("./../../npm/wepy/lib/wepy.js"), _wepy2 = _interopRequireDefault(_wepy), _default = function(e) {
    function t() {
        var e, o, n, r;
        _classCallCheck(this, t);
        for (var i = arguments.length, s = Array(i), u = 0; u < i; u++) s[u] = arguments[u];
        return o = n = _possibleConstructorReturn(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [ this ].concat(s))), 
        n.data = {
            show: !1,
            confirmCb: function() {}
        }, n.methods = {
            confirm: function() {
                "function" == typeof this.confirmCb && this.confirmCb(), this.show = !1, this.$log("RISK-TIP-CONFIRM", "RISK-TIP");
            },
            readMore: function() {
                this.$wxPromise.navigateTo({
                    url: "/pages/webview/webview?url=https%3A%2F%2Fm.zhuanzhuan.com%2FMzhuanzhuan%2Fzzcustomerservice%2FfraudNotification"
                }), this.$log("RISK-TIP-READMORE", "RISK-TIP");
            },
            close: function() {
                this.show = !1, this.$log("RISK-TIP-CLOSE", "RISK-TIP");
            }
        }, r = o, _possibleConstructorReturn(n, r);
    }
    return _inherits(t, e), _createClass(t, [ {
        key: "open",
        value: function(e) {
            this.show = !0, e && (this.confirmCb = e), this.$log("RISK-TIP-SHOW", "RISK-TIP"), 
            this.$apply();
        }
    } ]), t;
}(_wepy2.default.component);

exports.default = _default;