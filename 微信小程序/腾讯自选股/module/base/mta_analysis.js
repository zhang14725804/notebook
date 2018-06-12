(function() {
    function a(a) {
        return a && a.__esModule ? a : {
            default: a
        };
    }
    function b(c) {
        wx.getNetworkType({
            success: function(a) {
                c(a.networkType);
            }
        });
    }
    function c() {
        var b = wx.getSystemInfoSync();
        return {
            adt: b.model,
            scl: b.pixelRatio,
            scr: b.windowWidth + "x" + b.windowHeight,
            lg: b.language,
            fl: b.version,
            jv: b.system,
            tz: b.platform
        };
    }
    function d() {
        try {
            return wx.getStorageSync(q.prefix + "auid");
        } catch (b) {}
    }
    function e() {
        try {
            console.log("[set uid 4]");
            var b = h();
            return wx.setStorageSync(q.prefix + "auid", b), b;
        } catch (a) {}
    }
    function f() {
        try {
            return wx.getStorageSync(q.prefix + "ssid");
        } catch (b) {}
    }
    function g() {
        try {
            var b = "s" + h();
            return wx.setStorageSync(q.prefix + "ssid", b), b;
        } catch (a) {}
    }
    function h(b) {
        return (b || "") + Math.round(2147483647 * (Math.random() || .5)) * +new Date() % 1e10;
    }
    function i() {
        try {
            var c = getCurrentPages(), a = "/";
            return 0 < c.length && (a = c.pop().__route__), a;
        } catch (a) {
            console.log("get current page path error:" + a);
        }
    }
    function j() {
        var c = {
            dm: "wechat.apps.xx",
            url: i(),
            pvi: "",
            si: "",
            ty: 2
        };
        return c.pvi = function() {
            var a = d();
            return a || (c.ty = 1, a = e()), a;
        }(), c.si = function() {
            var b = f();
            return b || (b = g()), b;
        }(), c;
    }
    function l() {
        var d = c();
        return b(function(b) {
            wx.setStorageSync(q.prefix + "ntdata", b);
        }), d.ct = wx.getStorageSync(q.prefix + "ntdata") || "4g", d;
    }
    function m() {
        return {
            r2: q.app_id,
            r4: "wx",
            ext: "v=" + q.version
        };
    }
    var k = require("../../utils/ppdog"), n = a(k), o = require("../../utils/regenerator-runtime"), p = a(o), q = {
        app_id: "",
        event_id: "",
        api_base: "https://pingtas.qq.com/pingd",
        prefix: "_mta_",
        version: "1.3",
        stat_share_app: !1,
        stat_pull_down_fresh: !1,
        stat_reach_bottom: !1
    }, r = {
        App: {
            init: function(b) {
                "appID" in b && (q.app_id = b.appID), "eventID" in b && (q.event_id = b.eventID), 
                "statShareApp" in b && (q.stat_share_app = b.statShareApp), "statPullDownFresh" in b && (q.stat_pull_down_fresh = b.statPullDownFresh), 
                "statReachBottom" in b && (q.stat_reach_bottom = b.statReachBottom), g();
            }
        },
        Page: {
            init: function() {
                var c = getCurrentPages()[getCurrentPages().length - 1];
                !c.onShow || function() {
                    var a = c.onShow;
                    c.onShow = function() {
                        r.Page.stat(), a.call(this, arguments);
                    };
                }(), q.stat_pull_down_fresh && c.onPullDownRefresh && !function() {
                    var a = c.onPullDownRefresh;
                    c.onPullDownRefresh = function() {
                        r.Event.stat(q.prefix + "pulldownfresh"), a.call(this, arguments);
                    };
                }(), q.stat_reach_bottom && c.onReachBottom && !function() {
                    var a = c.onReachBottom;
                    c.onReachBottom = function() {
                        r.Event.stat(q.prefix + "reachbottom"), a.call(this, arguments);
                    };
                }(), q.stat_share_app && c.onShareAppMessage && !function() {
                    var a = c.onShareAppMessage;
                    c.onShareAppMessage = function() {
                        return r.Event.stat(q.prefix + "shareapp", {
                            url: c.__route__
                        }), a.call(this, arguments);
                    };
                }();
            },
            stat: function() {
                if ("" != q.app_id) {
                    for (var c = [], a = 0, b = [ j(), l(), m(), {
                        rand: +new Date()
                    } ], e = b.length; a < e; a++) for (var d in b[a]) b[a].hasOwnProperty(d) && c.push(d + "=" + (b[a][d] || ""));
                    wx.request({
                        url: q.api_base + "?" + c.join("&").toLowerCase()
                    });
                }
            }
        },
        Event: {
            stat: function(i, a) {
                if ("" != q.event_id) {
                    var n = [], e = j(), d = m();
                    e.dm = "wxapps.click", e.url = i, d.r2 = q.event_id;
                    var f = "undefined" == typeof a ? {} : a;
                    var c, g = [];
                    for (c in f) f.hasOwnProperty(c) && g.push(c + "=" + f[c]);
                    for (f = g.join(";"), d.r5 = f, f = 0, e = [ e, l(), d, {
                        rand: +new Date()
                    } ], d = e.length; f < d; f++) for (var k in e[f]) e[f].hasOwnProperty(k) && n.push(k + "=" + (e[f][k] || ""));
                    wx.request({
                        url: q.api_base + "?" + n.join("&").toLowerCase()
                    });
                }
            }
        }
    };
    module.exports = r;
})();