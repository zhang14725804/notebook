var e = require("./constant.js");

!function(e) {
    function t(o) {
        if (n[o]) return n[o].exports;
        var r = n[o] = {
            i: o,
            l: !1,
            exports: {}
        };
        return e[o].call(r.exports, r, r.exports, t), r.l = !0, r.exports;
    }
    var n = {};
    t.m = e, t.c = n, t.d = function(e, n, o) {
        t.o(e, n) || Object.defineProperty(e, n, {
            configurable: !1,
            enumerable: !0,
            get: o
        });
    }, t.r = function(e) {
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
    }, t.n = function(e) {
        var n = e && e.__esModule ? function() {
            return e.default;
        } : function() {
            return e;
        };
        return t.d(n, "a", n), n;
    }, t.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t);
    }, t.p = "", t(t.s = 0);
}([ function(t, n, o) {
    function r(e, t) {
        for (var n = arguments.length, o = Array(n > 2 ? n - 2 : 0), r = 2; r < n; r++) o[r - 2] = arguments[r];
        e[t] = function(e) {
            for (var t = arguments.length, n = Array(t > 1 ? t - 1 : 0), o = 1; o < t; o++) n[o - 1] = arguments[o];
            return function() {
                for (var t = this, o = arguments.length, r = Array(o), c = 0; c < o; c++) r[c] = arguments[c];
                e.call.apply(e, [ this ].concat(r)), n.forEach(function(e) {
                    return e.call.apply(e, [ t ].concat(r));
                });
            };
        }.apply(void 0, [ e[t] ].concat(o));
    }
    var c = Object.assign || function(e) {
        for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var o in n) Object.prototype.hasOwnProperty.call(n, o) && (e[o] = n[o]);
        }
        return e;
    }, a = wx.getSystemInfoSync() || {}, i = wx.getStorageSync("userId"), u = wx.getStorageSync("comeTime"), s = wx.getStorageSync("userCount"), l = wx.getStorageSync("currentTime"), p = wx.getStorageSync("subScenekey"), f = function(t) {
        try {
            var n = this.__route__, o = e.pointData[t], r = e.objInfoMap[n] || "特殊页面暂时没有埋点", f = 0 === n.indexOf("http") ? n : "http:" + n, g = new Date(), h = g.getHours(), d = g.getMinutes(), m = g.getSeconds(), v = String(Math.random()).slice(2, 8), y = void 0;
            i ? y = i : (y = ("" + parseFloat(+g + "" + (1e8 * Math.random() + "").substr(0, 8))).substr(0, 16), 
            wx.setStorageSync("userId", y));
            var _ = void 0;
            u ? _ = u : (_ = Math.round(+g / 1e3), wx.setStorageSync("comeTime", _));
            var S = 0;
            S = s ? parseFloat(s) + 1 : 1, wx.setStorageSync("userCount", S);
            var w = 0;
            l ? w = l : wx.setStorageSync("currentTime", Math.round(+g / 1e3));
            var x = Math.round(g.getTime() / 1e3), b = (a.screenWidth || 0) + "x" + (a.screenHeight || 0), M = {
                idsite: 49,
                rec: 1,
                r: v,
                h: h,
                m: d,
                s: m,
                url: f = f + "?utm_source=" + encodeURIComponent("miniapp") + "&utm_medium=" + encodeURIComponent(o) + "&utm_term=" + encodeURIComponent(p),
                urlref: "miniapp",
                _id: y,
                _idts: _,
                _idvc: S,
                _idn: 1,
                _refts: x,
                _viewts: w,
                send_image: 1,
                ai_cookie: "",
                cookie: 0,
                res: b
            };
            0 == (arguments.length <= 1 ? 0 : arguments.length - 1) ? wx.request({
                url: "https://tk.aihuishou.com/piwik.php",
                data: c({
                    action_name: r
                }, M),
                success: function(e) {
                    console.log(e);
                },
                fail: function(e) {
                    console.log(e);
                }
            }) : wx.request({
                url: "https://tk.aihuishou.com/piwik.php",
                data: c({
                    e_n: arguments.length <= 1 ? void 0 : arguments[1],
                    e_a: arguments.length <= 2 ? void 0 : arguments[2],
                    e_c: arguments.length <= 3 ? "basicInfo" : arguments[3]
                }, M),
                success: function(e) {
                    console.log(e);
                },
                fail: function(e) {
                    console.log(e);
                }
            });
        } catch (e) {
            console.log(e);
        }
    }, g = function(e) {
        var t = f;
        f = function() {
            for (var n = arguments.length, o = Array(n), r = 0; r < n; r++) o[r] = arguments[r];
            t.call.apply(t, [ this, e.scene ].concat(o));
        };
    }, h = function(e) {
        f.call(this);
    };
    !function() {
        var e = App;
        App = function(t) {
            r(t, "onLaunch", g), e(t);
        };
        var t = Page;
        Page = function(e) {
            r(e, "onLoad", h), e._piwik = f, t(e);
        };
    }();
} ]);