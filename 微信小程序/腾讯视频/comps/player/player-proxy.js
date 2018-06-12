var e = require("../../module/cache"), r = require("../../module/login"), n = require("../../WechatAppPlayer/index"), o = require("../../module/es6-promise"), t = require("../../module/globalData"), i = require("../../module/message"), a = require("./lib/get-history"), s = [ require("./plugins/bullet"), require("./plugins/continue-play"), require("./plugins/hdlist"), require("./plugins/layer") ];

r.onLoginChange(function() {
    e.set("userdefn", "");
});

var c = wx.getSystemInfoSync();

module.exports = function(u, l, p) {
    var f = p.recommend, d = p.autoplay, g = p.isNextPlay, m = p.additional, h = p.defn || e.get("userdefn") || "", v = new i();
    console.log("Tvp create start", Date.now());
    var y = new n({
        vid: u,
        cid: p.cid
    }, {
        from: "v4138",
        autoplay: d || !1,
        defn: h,
        chid: 1053 == t.get("scene") ? 64 : "",
        onBeforeGetinfo: function() {
            return new o(function(e) {
                r.getUserInfo(function(r, n) {
                    if (n && n.isVip && c.system.match(/ios/i)) {
                        var o = {
                            defnpayver: 5
                        };
                        0 != c.model.indexOf("iPhone X") && 0 != c.model.indexOf("iPhone 8") || (o.spvideo = 16, 
                        o.spaudio = 6), e(o);
                    } else e({});
                });
            });
        },
        getReportParam: function(e) {
            r.getUserInfo(function(r, n) {
                e(null, {
                    3: {
                        val1: g ? 2 : 1
                    },
                    ptag: t.get("ptag") || "",
                    isvip: n && n.isVip,
                    tpay: n && n.isVip ? 2 : 0,
                    hc_openid: n && n.wxuser && n.wxuser.wxOpenId || "",
                    hc_appid: n && n.wxuser && n.wxuser.appId || "",
                    nick: t.get("nickName") || "",
                    rmd: f || "",
                    additional: m || "",
                    scene: t.get("scene")
                });
            });
        }
    });
    [ "videotimeupdate", "videostart" ].forEach(function(e) {
        y.on(e, function() {
            for (var r = arguments.length, n = Array(r), o = 0; o < r; o++) n[o] = arguments[o];
            v.emit.apply(v, [ e ].concat(n));
        });
    }), l.vid = o.resolve(u);
    var w = o.defer();
    l.getinforaw = w.promise, l.network = new o(function(e) {
        wx.getNetworkType({
            success: function(r) {
                e(r && r.networkType ? r.networkType : "wifi");
            }
        });
    }), l.history = a(u), l.autoplay = o.resolve(d), l.videoCore = o.resolve(y), Object.keys(l).forEach(function(e) {
        var r = !1;
        if (setTimeout(function() {
            r || console.error(e, "timeout");
        }, 5e3), l[e]) try {
            l[e].then(function(e) {
                return r = !0, e;
            });
        } catch (r) {
            console.error(e, r);
        } else console.warn("source not found", e);
    }), s.forEach(function(e) {
        o.all(e.data.map(function(e) {
            return l[e] || o.resolve({});
        })).then(function(r) {
            var n = {};
            r.forEach(function(r, o) {
                n[e.data[o]] = r;
            }), e.controller(v, n);
        }).catch(function(e) {
            console.error("player plugin error:", e);
        });
    });
    var x = !1;
    return y.on("contentchange", function(e) {
        if (x || (x = !0, w.resolve(e.getinforaw)), v.emit("contentchange", e), e.currentContent) {
            var r = {};
            r.url = e.currentContent.url, r.isad = e.currentContent.isad, r.contentid = e.currentContent.id, 
            r.duration = e.currentContent.duration, r.progressTime = 0, e.progress ? (r.progressDuration = e.progress.duration, 
            r.progressBaseTime = e.progress.time, r.progressSkipTime = e.progress.skipable) : (r.progressDuration = 0, 
            r.progressBaseTime = 0, r.progressSkipTime = 0);
            try {
                r.isVertical = e.getinforaw.vl.vi[0].wh < 1;
            } catch (e) {
                r.isVertical = !1;
            }
            v.emit("beforeplaydatachange", r), v.playData = r, v.emit("playdatachange");
        }
    }), [ "error", "statechange" ].forEach(function(e) {
        y.on(e, function() {
            for (var r = arguments.length, n = Array(r), o = 0; o < r; o++) n[o] = arguments[o];
            v.emit.apply(v, [ e ].concat(n));
        });
    }), v.stop = function() {
        v.off(), y.stop();
    }, v.start = function() {
        y.start();
    }, v.vid = u, Object.keys(y).forEach(function(e) {
        0 === e.indexOf("on") && "on" != e && (v[e] = y[e].bind(y));
    }), v;
};