function _interopRequireDefault(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function _classCallCheck(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

function getPageParam(e, t) {
    return e instanceof _wepy2.default.component && e.$wxpage.options ? e.$wxpage.options[t] : void 0;
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
}, _createClass = function() {
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
}(), _cookie = require("./cookie.js"), _cookie2 = _interopRequireDefault(_cookie), _wepy = require("./../npm/wepy/lib/wepy.js"), _wepy2 = _interopRequireDefault(_wepy), _entryInfo = require("./../store/entryInfo.js"), _entryInfo2 = _interopRequireDefault(_entryInfo), LeStatic = function() {
    function e() {
        _classCallCheck(this, e);
    }
    return _createClass(e, null, [ {
        key: "config",
        value: function(e) {
            Object.assign(this._options, e);
        }
    }, {
        key: "install",
        value: function() {
            if (null == this._options.appid || null == this._options.pageTypePrefix) return void console.error("`[install LeStatic] appid or pageTypePrefix missing, shall call LeStatic.config first");
            _wepy2.default.component.prototype.$log = e.log;
        }
    }, {
        key: "_guid",
        value: function() {
            return "xxxxxxxxxx".replace(/[x]/g, function(e) {
                var t = 16 * Math.random() | 0;
                return ("x" == e ? t : 3 & t | 8).toString(16);
            });
        }
    }, {
        key: "log",
        value: function(t, o) {
            var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
            try {
                if (!t) return;
                if (t = t.toUpperCase(), !o) {
                    var a = getCurrentPages(), i = a.length > 0 ? a[a.length - 1].route : "", r = this instanceof _wepy2.default.component ? i.replace(/[a-zA-Z0-9_-]*(?=\/)/g, "").replace(/\//g, "") : e._options.appPage, p = "function" == typeof e._options.pageTypePrefix ? e._options.pageTypePrefix(i, this instanceof _wepy2.default.component) : e._options.pageTypePrefix;
                    o = p + r;
                }
                if (o = o.toUpperCase(), n && "object" !== (void 0 === n ? "undefined" : _typeof(n))) return void console.error("[埋点失败] backup字段应为对象类型, actionType:", t, "pageType:", o, "backup:", n);
                var c = e._options.commonBackup.call(this);
                for (var u in n) u in c && console.warn("[埋点冲突] 参数名称: " + u + " 与统一埋点参数名称冲突，请注意检查", "actionType:", t, "pageType:", o, "backup:", n);
                n = Object.assign(c, n), n = encodeURIComponent(JSON.stringify(n));
                var l = _cookie2.default.get("tk");
                l || (l = "wx-" + e._guid(), _cookie2.default.set("tk", l)), _wepy2.default.request({
                    url: e._options.LOG_URL,
                    data: {
                        cookieid: l,
                        actiontype: t,
                        pagetype: o,
                        appid: "ZHUANZHUAN",
                        _t: Date.now(),
                        backup: n
                    },
                    success: function(e) {
                        !1 === e.data && console.warn("[埋点上报失败] 接口返回false, actionType:", t, "pageType:", o);
                    },
                    fail: function(e) {
                        console.warn("[埋点上报失败] 网络异常, res:", e);
                    }
                });
            } catch (e) {
                console.warn("[埋点上报失败] 捕获代码异常:", e);
            }
        }
    } ]), e;
}();

LeStatic._options = {
    appid: null,
    pageTypePrefix: null,
    appPage: "APP",
    LOG_URL: "https://lego.zhuanzhuan.com/page/mark",
    commonBackup: function() {
        var e = _cookie2.default.get("uid"), t = {
            zzfrom: getPageParam(this, "zzfrom") || "",
            zzpage: getPageParam(this, "zzpage") || "",
            zztype: "WA",
            zznative: 0,
            uid: "undefined" != e ? e : "",
            appid: LeStatic._options.appid,
            channel: _entryInfo2.default.channel,
            pageChannel: getPageParam(this, "pageChannel") || getPageParam(this, "channel") || "none",
            scene: _entryInfo2.default.scene
        }, o = this instanceof _wepy2.default.component && this.$root.$logPageCommonBackup ? this.$root.$logPageCommonBackup() : {};
        return Object.assign(t, o);
    }
}, exports.default = LeStatic;