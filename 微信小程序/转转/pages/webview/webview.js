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

function _toConsumableArray(e) {
    if (Array.isArray(e)) {
        for (var t = 0, r = Array(e.length); t < e.length; t++) r[t] = e[t];
        return r;
    }
    return Array.from(e);
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var _slicedToArray = function() {
    function e(e, t) {
        var r = [], a = !0, n = !1, o = void 0;
        try {
            for (var i, u = e[Symbol.iterator](); !(a = (i = u.next()).done) && (r.push(i.value), 
            !t || r.length !== t); a = !0) ;
        } catch (e) {
            n = !0, o = e;
        } finally {
            try {
                !a && u.return && u.return();
            } finally {
                if (n) throw o;
            }
        }
        return r;
    }
    return function(t, r) {
        if (Array.isArray(t)) return t;
        if (Symbol.iterator in Object(t)) return e(t, r);
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
    };
}(), _createClass = function() {
    function e(e, t) {
        for (var r = 0; r < t.length; r++) {
            var a = t[r];
            a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), 
            Object.defineProperty(e, a.key, a);
        }
    }
    return function(t, r, a) {
        return r && e(t.prototype, r), a && e(t, a), t;
    };
}(), _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
}, _wepy = require("./../../npm/wepy/lib/wepy.js"), _wepy2 = _interopRequireDefault(_wepy), _querystring = require("./../../npm/querystring/index.js"), _querystring2 = _interopRequireDefault(_querystring), _routeParams = require("./../../store/routeParams.js"), _routeParams2 = _interopRequireDefault(_routeParams), _webviewNavigateBackData = require("./../../store/webviewNavigateBackData.js"), _webviewNavigateBackData2 = _interopRequireDefault(_webviewNavigateBackData), _getLocationWithoutDisturb = require("./../../lib/getLocationWithoutDisturb.js"), _getLocationWithoutDisturb2 = _interopRequireDefault(_getLocationWithoutDisturb), _ZZLogin = require("./../../lib/ZZLogin.js"), _ZZLogin2 = _interopRequireDefault(_ZZLogin), _entryInfo = require("./../../store/entryInfo.js"), _entryInfo2 = _interopRequireDefault(_entryInfo), isArray = function(e) {
    return "object" == (void 0 === e ? "undefined" : _typeof(e)) && "[object Array]" == Object.prototype.toString.call(e);
}, getValueFromMixedArray = function(e, t) {
    var r = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
    if (isArray(e)) {
        if ("number" == typeof t) return e[t] || void 0;
        if ("string" == typeof t) {
            r && (e = [].concat(_toConsumableArray(e)).reverse());
            for (var a = 0; a < e.length; a++) if ("object" === _typeof(e[a]) && void 0 !== e[a][t]) return e[a][t];
        }
    }
}, storeNavigateBackData = function(e) {
    if (isArray(e) && 0 !== e.length) {
        for (var t = {}, r = 0; r < e.length; r++) if ("object" === _typeof(e[r]) && void 0 !== e[r].navigateBackData) {
            var a = e[r].navigateBackData.pagePath, n = e[r].navigateBackData.data;
            isArray(t[a]) ? t[a].push(n) : t[a] = [ n ];
        }
        var o = _webviewNavigateBackData2.default || {};
        for (var i in t) {
            var u = o[i] || [];
            o[i] = u.concat(t[i]);
        }
        Object.assign(_webviewNavigateBackData2.default, o);
    }
}, urlPatch = function(e) {
    return e.indexOf("youpin") > -1 ? (e = e.replace("m.zhuanzhuan.58.com", "m.zhuanzhuan.com"), 
    e = e.replace("wxzhuanzhuan.58.com", "wx.zhuanzhuan.com")) : (e = e.replace("m.zhuanzhuan.com", "m.zhuanzhuan.58.com"), 
    e = e.replace("wx.zhuanzhuan.com", "wxzhuanzhuan.58.com")), e;
}, __appId = "wx9df7443125e6f01a", __t = 103, Webview = function(e) {
    function t() {
        var e, r, a, n;
        _classCallCheck(this, t);
        for (var o = arguments.length, i = Array(o), u = 0; u < o; u++) i[u] = arguments[u];
        return r = a = _possibleConstructorReturn(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [ this ].concat(i))), 
        a.config = {
            backgroundTextStyle: "light",
            navigationBarBackgroundColor: "#fff",
            navigationBarTitleText: " ",
            navigationBarTextStyle: "black"
        }, a.data = {
            param: {},
            url: "",
            urlReg: /^(https?\:\/\/[^?#]+)(\?[^#]*)?(#[^\?&]+)?(.+)?$/,
            mQuery: {},
            shareData: null,
            currentMessageIndex: 0
        }, a.methods = {
            onPostMessage: function(e) {
                if (e.detail.data) {
                    console.log("e.detail.data", e.detail.data);
                    var t = this.currentMessageIndex, r = e.detail.data.slice(t);
                    console.log("newMessage", r);
                    var a = getValueFromMixedArray(r, "shareData", !0);
                    this.shareData = a, this.currentMessageIndex = e.detail.data.length, storeNavigateBackData(r), 
                    console.log(_webviewNavigateBackData2.default);
                }
            }
        }, n = r, _possibleConstructorReturn(a, n);
    }
    return _inherits(t, e), _createClass(t, [ {
        key: "getSDKVersion",
        value: function() {
            var e = this;
            return new Promise(function(t, r) {
                e.$root.$parent.globalData.systemInfo ? t(e.$root.$parent.globalData.systemInfo.SDKVersion) : wx.getSystemInfo({
                    success: function(e) {
                        t(e.SDKVersion);
                    },
                    fail: function() {
                        t();
                    }
                });
            });
        }
    }, {
        key: "onLoad",
        value: function(e) {
            var t = this;
            if (!wx.canIUse("web-view")) return void wx.showModal({
                content: "微信版本太低啦，不能打开本页面~ 快去升级微信吧~",
                showCancel: !1,
                success: function() {
                    t.$wxPromise.navigateBack();
                }
            });
            this.param = this.options = e;
            var r = {}, a = decodeURIComponent(this.param.url), n = this.urlReg.exec(a), o = _slicedToArray(n, 5), i = (o[0], 
            o[1]), u = o[2], s = o[3], l = o[4];
            u && Object.assign(r, _querystring2.default.parse(u.substring(1))), l && Object.assign(r, _querystring2.default.parse(l.substring(1))), 
            this.queryPatch({
                query: r,
                mainUrl: i,
                options: e
            }), e.channel = r.channel || e.channel, this.$wxpage.options = this.options = e, 
            e.channel && !r.channel && Object.assign(r, {
                channel: e.channel
            });
            var c = function() {
                Promise.all([ t.getSDKVersion(), (0, _getLocationWithoutDisturb2.default)() ]).then(function(e) {
                    var a = _slicedToArray(e, 2), n = a[0], o = a[1];
                    r.__appId = __appId, r.__t = __t, r.__iswa = 1, o && (r.__lon = o.longitude, r.__lat = o.latitude), 
                    n && (r.SDKVersion = n), r.uid = "" + t.$loginCenter.zzUserInfo.uid, r.PPU = encodeURIComponent(t.$loginCenter.zzUserInfo.ppu), 
                    t.url = i, "{}" != JSON.stringify(r) && (t.url += "?" + _querystring2.default.stringify(r)), 
                    s && (t.url += s), t.mQuery = r, t.url = urlPatch(t.url), t.$apply(), t.$log("view");
                });
            };
            this.param.disableAuth ? c() : (r.relogin && (_ZZLogin2.default._zzUserInfo.ppu = "", 
            _ZZLogin2.default._zzUserInfo.uid = "", _ZZLogin2.default._zzUserInfo.PPU = ""), 
            this.$login(c));
        }
    }, {
        key: "queryPatch",
        value: function(e) {
            var t = e.query, r = e.mainUrl, a = e.options;
            /\/ZZBook\//.test(r) && (t.fromChannel = _entryInfo2.default.channel + "-" + (t.fromChannel || "")), 
            /\/youpin\/website\//.test(r) && (t.channel = _entryInfo2.default.channel + "-" + (a.channel || "")), 
            /\/helpsale\//.test(r) && ("wxqb1019" !== _entryInfo2.default.channel || isNaN(t.channel) || (t.channel = Number(t.channel) + 100));
            var n = {
                entryChannel: _entryInfo2.default.channel
            };
            for (var o in t) for (var i in n) t[o] = String(t[o]).replace(new RegExp("\\$\\{" + i + "\\}", "g"), n[i]);
        }
    }, {
        key: "onShareAppMessage",
        value: function(e) {
            var t = this, r = e.webViewUrl || "", a = "闲置不知如何处理？来转转小程序，最快1天卖出！", n = r, o = "", i = {};
            if (this.shareData) {
                var u = this.shareData;
                a = u.title, n = u.url, o = u.waImg;
            } else if (r) {
                var s = this.urlReg.exec(r), l = _slicedToArray(s, 5), c = (l[0], l[1], l[2]), f = (l[3], 
                l[4], _querystring2.default.parse(c.substring(1)) || {});
                f.__wa_share_title && (a = decodeURIComponent(f.__wa_share_title)), f.__wa_share_url && (n = decodeURIComponent(f.__wa_share_url)), 
                f.__wa_share_img && (o = decodeURIComponent(f.__wa_share_img));
            } else n = this.url;
            return i = {
                title: a,
                path: /^http[s]?\:\/\//.test(n) ? "/pages/webview/webview?url=" + encodeURIComponent(n) : n,
                success: function() {
                    t.$log("SHARE-SUCC");
                }
            }, o && (i.imageUrl = o), i;
        }
    }, {
        key: "onShow",
        value: function() {
            var e = _routeParams2.default.getBackFromData() || {};
            if (e.refresh) {
                _routeParams2.default.setBackFromData({
                    refresh: !1
                });
                var t = this.urlReg.exec(this.url), r = _slicedToArray(t, 5), a = (r[0], r[1]), n = (r[2], 
                r[3]);
                r[4];
                this.mQuery.refresh = 1, this.url = a + "?" + _querystring2.default.stringify(this.mQuery), 
                n && (this.url += n), this.$apply();
            }
            e.webviewRedirectUrl && (this.url = decodeURIComponent(e.webviewRedirectUrl), console.log(this.url, "this.url"), 
            _routeParams2.default.setBackFromData({
                webviewRedirectUrl: void 0
            }), this.$apply);
        }
    }, {
        key: "alert",
        value: function(e) {
            wx.showModal({
                content: JSON.stringify(e),
                showCancel: !1
            });
        }
    } ]), t;
}(_wepy2.default.page);

Page(require("./../../npm/wepy/lib/wepy.js").default.$createPage(Webview, "pages/webview/webview"));