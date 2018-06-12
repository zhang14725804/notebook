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

var _wepy = require("./../../../npm/wepy/lib/wepy.js"), _wepy2 = _interopRequireDefault(_wepy), _wxPromise = require("./../../../lib/wxPromise.js"), _default = function(e) {
    function t() {
        var e, o, r, n;
        _classCallCheck(this, t);
        for (var i = arguments.length, s = Array(i), a = 0; a < i; a++) s[a] = arguments[a];
        return o = r = _possibleConstructorReturn(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [ this ].concat(s))), 
        r.props = {
            tabs: {
                type: Array
            },
            activeTabId: {
                type: String,
                twoWay: !0
            },
            unreadMessage: {
                type: Number
            }
        }, r.data = {}, r.computed = {}, r.methods = {
            onTab: function(e) {
                var t = this.tabs[e];
                this.activeTabId != t.id && (this.activeTabId = t.id, this.$apply(), wx.pageScrollTo && wx.pageScrollTo({
                    scrollTop: 0,
                    duration: 0
                }), t.clickLog && this.$log(t.clickLog), t.showLog && this.$log(t.showLog));
            },
            onMine: function() {
                this.$invoke("../SlideBar", "showSlide"), this.$log("MINEBTNCLK");
            }
        }, r.components = {}, n = o, _possibleConstructorReturn(r, n);
    }
    return _inherits(t, e), t;
}(_wepy2.default.component);

exports.default = _default;