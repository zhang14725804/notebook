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
}(), _wepy = require("./../npm/wepy/lib/wepy.js"), _wepy2 = _interopRequireDefault(_wepy), _wxPromise = require("./../lib/wxPromise.js"), _default = function(e) {
    function t() {
        var e, n, o, r;
        _classCallCheck(this, t);
        for (var i = arguments.length, a = Array(i), s = 0; s < i; s++) a[s] = arguments[s];
        return n = o = _possibleConstructorReturn(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [ this ].concat(a))), 
        o.props = {
            banners: {
                type: Array,
                required: !0
            },
            config: {
                type: Object,
                default: function() {
                    return {
                        current: 0,
                        indicatorDots: !0,
                        indicatorColor: "#ffffff",
                        indicatorActiveColor: "rgb(254,102,133)",
                        autoplay: !0,
                        interval: 5e3,
                        duration: 500,
                        circular: !0,
                        vertical: !1
                    };
                }
            },
            logs: {
                type: Object,
                default: function() {
                    return {
                        bannerShow: "",
                        bannerClick: "",
                        getBackup: function(e, t) {
                            return {
                                num: t + 1
                            };
                        }
                    };
                }
            }
        }, o.data = {
            hasLog: []
        }, o.computed = {}, o.watch = {
            banners: function() {
                this._log(0);
            }
        }, o.methods = {
            bannerChange: function(e) {
                this._log(e.detail.current);
            },
            onBanner: function(e) {
                this.logs.bannerClick && this.$log(this.logs.bannerClick, null, this.logs.getBackup(this.banners[e], e));
                var t = this.banners[e];
                if (t.appId && "-1" != t.appId) return this.goToMiniProgram(t);
                if (t.path) return 0 === t.path.indexOf("http") ? this.goToWeb(t) : this.goToPage(t);
            }
        }, o.components = {}, r = n, _possibleConstructorReturn(o, r);
    }
    return _inherits(t, e), _createClass(t, [ {
        key: "_log",
        value: function(e) {
            this.hasLog.indexOf(e) > -1 || (this.hasLog.push(e), console.log("change", e), this.logs.bannerShow && this.$log(this.logs.bannerShow, null, this.logs.getBackup(this.banners[e], e)));
        }
    }, {
        key: "goToMiniProgram",
        value: function(e) {
            _wxPromise.wxPromise.navigateToMiniProgram ? _wxPromise.wxPromise.navigateToMiniProgram({
                appId: e.appId,
                path: e.path
            }) : wx.showModal({
                content: "请将微信升级到最新版本",
                showCancel: !1,
                confirmText: "知道了"
            });
        }
    }, {
        key: "goToWeb",
        value: function(e) {
            wx.canIUse && wx.canIUse("web-view") ? _wxPromise.wxPromise.navigateTo({
                url: "/pages/webview/webview?url=" + encodeURIComponent(e.path)
            }) : wx.showModal({
                content: "请将微信升级到最新版本",
                showCancel: !1,
                confirmText: "知道了"
            });
        }
    }, {
        key: "goToPage",
        value: function(e) {
            "/" != e.path[0] && (e.path = "/" + e.path), _wxPromise.wxPromise.navigateTo({
                url: e.path
            });
        }
    } ]), t;
}(_wepy2.default.component);

exports.default = _default;