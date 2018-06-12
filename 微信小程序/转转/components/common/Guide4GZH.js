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
            var i = t[n];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), 
            Object.defineProperty(e, i.key, i);
        }
    }
    return function(t, n, i) {
        return n && e(t.prototype, n), i && e(t, i), t;
    };
}(), _wepy = require("./../../npm/wepy/lib/wepy.js"), _wepy2 = _interopRequireDefault(_wepy), _funcKit = require("./../../lib/funcKit.js"), _default = function(e) {
    function t() {
        var e, n, i, o;
        _classCallCheck(this, t);
        for (var r = arguments.length, a = Array(r), s = 0; s < r; s++) a[s] = arguments[s];
        return n = i = _possibleConstructorReturn(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [ this ].concat(a))), 
        i.data = {
            show: !1,
            disable: !0,
            mainTitle: "消息收到延迟，将严重影响宝贝售卖！",
            subTitle: "关注微信服务号，重要消息微信提醒！",
            showImmediately: !1
        }, i.methods = {
            touchmove: function(e) {
                return !1;
            },
            onClose: function(e) {
                this.show = !1, this.showImmediately = !1;
            },
            onOpen: function() {
                this.$log("GZH_GUIDE_CLICK", "GZH_GUIDE_CLICK", {
                    pageChannel: this.type
                }), this.$wxPromise.navigateTo({
                    url: "/subPages/other/guide4GZH/guide4GZH?channel=" + this.type
                });
            },
            onDisable: function() {
                this.disable = !0, this.show = !1, this.showImmediately = !1, wx.setStorage({
                    key: "disable_GZH_guide",
                    data: !0
                });
            }
        }, o = n, _possibleConstructorReturn(i, o);
    }
    return _inherits(t, e), _createClass(t, [ {
        key: "requestGZHGuide",
        value: function(e) {
            var t = this;
            return this.type = e, new Promise(function(n, i) {
                t.$httpWithLogin({
                    url: "https://app.zhuanzhuan.com/zzopen/mainminiapp/guidingFocus?scenario=" + e,
                    success: function(i) {
                        var o = i.data;
                        if (0 != o.respCode) return t.$toast({
                            title: o.errMsg || "服务异常，请稍后重试",
                            type: "fail",
                            duration: 2e3
                        }), void n(!1);
                        var r = o.respData;
                        r && r.mainTitle && (t.mainTitle = r.mainTitle, t.subTitle = r.subTitle, "D" != e && (t.show = !0, 
                        t.$log("GZH_GUIDE_SHOW", "GZH_GUIDE_SHOW", {
                            pageChannel: t.type
                        })), n(r), t.$apply());
                    },
                    fail: function(e) {
                        n(!1), t.$toast({
                            title: "网络异常，请稍后重试",
                            type: "fail",
                            duration: 2e3
                        });
                    }
                });
            });
        }
    }, {
        key: "showDirectly",
        value: function() {
            this.showImmediately = !0, this.$apply(), this.$log("GZH_GUIDE_SHOW", "GZH_GUIDE_SHOW", {
                pageChannel: this.type
            });
        }
    }, {
        key: "onLoad",
        value: function() {
            this.disable = wx.getStorageSync("disable_GZH_guide");
        }
    } ]), t;
}(_wepy2.default.component);

exports.default = _default;