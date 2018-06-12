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
        for (var n = 0; n < t.length; n++) {
            var o = t[n];
            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), 
            Object.defineProperty(e, o.key, o);
        }
    }
    return function(t, n, o) {
        return n && e(t.prototype, n), o && e(t, o), t;
    };
}(), _wepy = require("./../../npm/wepy/lib/wepy.js"), _wepy2 = _interopRequireDefault(_wepy), _default = function(e) {
    function t() {
        var e, n, o, r;
        _classCallCheck(this, t);
        for (var a = arguments.length, i = Array(a), s = 0; s < a; s++) i[s] = arguments[s];
        return n = o = _possibleConstructorReturn(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [ this ].concat(i))), 
        o.props = {
            pageTab: {
                type: String,
                twoWay: !0
            }
        }, o.data = {
            isIphoneX: !1
        }, o.methods = {
            goHome: function() {
                "home" != this.pageTab && (this.pageTab = "home", this.$apply());
            },
            goPost: function() {
                var e = this;
                this.getPostEntryAsync || (this.getPostEntryAsync = this.loadPostEntry()), this.getPostEntryAsync.then(function(t) {
                    "TIP" === t ? (e.$log("SHOW-SELL-ENTRY"), e.$emit("eventShowPostTip")) : e.enterPostPage();
                }).catch(function() {
                    e.enterPostPage();
                });
            },
            goMine: function() {
                "mine" != this.pageTab && (this.pageTab = "mine", this.$apply(), this.$log("MINETABCLK"));
            }
        }, o.components = {}, r = n, _possibleConstructorReturn(o, r);
    }
    return _inherits(t, e), _createClass(t, [ {
        key: "onLoad",
        value: function() {
            this.isIphoneX = this.$root.$parent.globalData.isIphoneX;
        }
    }, {
        key: "enterPostPage",
        value: function() {
            this.$wxPromise.navigateTo({
                url: "/pages/post/post?pageChannel=homeTab"
            }), this.$log("CLICK-SELL-ENTRYA");
        }
    }, {
        key: "loadPostEntry",
        value: function() {
            var e = this;
            return new Promise(function(t, n) {
                e.$httpWithLogin({
                    url: "https://app.zhuanzhuan.com/zzopen/mainminiapp/weixinIndexPostChannel",
                    success: function(o) {
                        var r = o.data;
                        0 != r.respCode && n(), t(r.respData.name), e.$apply();
                    },
                    fail: function() {
                        n();
                    }
                });
            });
        }
    } ]), t;
}(_wepy2.default.component);

exports.default = _default;