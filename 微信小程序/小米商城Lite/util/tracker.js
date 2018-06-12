var n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(n) {
    return typeof n;
} : function(n) {
    return n && "function" == typeof Symbol && n.constructor === Symbol && n !== Symbol.prototype ? "symbol" : typeof n;
}, e = require("./conf.js"), t = function() {
    function t(e, o, r) {
        if (null == e) return "";
        var i = "", a = void 0 === e ? "undefined" : n(e);
        if ("string" == a || "number" == a || "boolean" == a) i += "&" + o + "=" + (null == r || r ? encodeURIComponent(e) : e); else for (var u in e) {
            var c = null == o ? u : o + (e instanceof Array ? "[" + u + "]" : "." + u);
            i += t(e[u], c, r);
        }
        return i;
    }
    function o(n) {
        var e;
        for (e in n) return !1;
        return !0;
    }
    function r() {
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(n) {
            var e = 16 * Math.random() | 0;
            return ("x" == n ? e : 3 & e | 8).toString(16);
        }) + "-" + (new Date() - 0);
    }
    var i = null, a = "", u = [], c = function(n) {
        if (u.length && a) for (var r = t(n); u.length; ) {
            var i = u.shift(), c = i.path || "", f = i.logCode, l = i.clue, s = wx.getStorageSync("masid") || null, d = "";
            s && (d = s.value || "");
            var x = "client_id=" + e.client_id;
            if (!o(i.query)) {
                c += "?";
                for (var m in i.query) c += m + "=" + i.query[m] + "&";
                c = encodeURIComponent(c.replace(/&$/, ""));
            }
            c && (c = "&curl=" + c), f && (c += "&log_code=" + encodeURIComponent(f) + "&mstpid=wx"), 
            l && (c += "&clue=" + encodeURIComponent(l)), d && (c += "&masid=" + d), e.client_id && (c += "&client_id=" + e.client_id);
            for (var g in i.extra) c += "&" + g + "=" + encodeURIComponent(i.extra[g]);
            x += ";masid=" + d, wx.request({
                header: {
                    cookie: x
                },
                url: "https://analytics.be.mi.com/miniprogram?domain_id=133" + a + r + c
            });
        }
    }, f = function() {
        return new Promise(function(n, e) {
            n(r());
        });
    }, l = function(n) {
        return new Promise(function(e, t) {
            wx.getSystemInfo({
                success: function(t) {
                    var o = t.model, r = t.platform, i = t.pixelRatio, a = t.windowWidth, u = t.windowHeight, c = t.language;
                    e({
                        model: o,
                        pixelRatio: i,
                        windowWidth: a,
                        windowHeight: u,
                        language: c,
                        mstuid: n,
                        platform: r
                    });
                },
                fail: function() {
                    e({});
                }
            });
        });
    }, s = function() {
        return i || (i = getApp() || {
            storageData: {}
        }), new Promise(function(n, e) {
            a || e();
            var t = new Promise(function(n, e) {
                var t = i.storageData.userId;
                n(t ? {
                    mid: t
                } : {});
            }), o = new Promise(function(n, e) {
                var t = i.storageData.vid;
                n(t ? {
                    vid: t
                } : {});
            }), r = new Promise(function(n, e) {
                wx.getStorage({
                    key: "lat",
                    success: function(e) {
                        n({
                            lat: e.data
                        });
                    },
                    fail: function(e) {
                        n({});
                    }
                });
            }), u = new Promise(function(n, e) {
                wx.getStorage({
                    key: "lng",
                    success: function(e) {
                        n({
                            lng: e.data
                        });
                    },
                    fail: function(e) {
                        n({});
                    }
                });
            }), c = new Promise(function(n, e) {
                var t = i.storageData.xm_open_id;
                t ? wx.getUserInfo({
                    success: function(e) {
                        var o = e.userInfo, r = o.nickName, i = o.avatarUrl, a = o.gender, u = o.province, c = o.city, f = o.country;
                        n({
                            openid: t,
                            nick_name: r,
                            avatar_url: i,
                            gender: a,
                            province: u,
                            city: c,
                            country: f
                        });
                    },
                    fail: function(e) {
                        n({
                            openid: t
                        });
                    }
                }) : n({});
            });
            Promise.all([ t, o, r, u, c ]).then(function(e) {
                var t = {};
                e.forEach(function(n) {
                    for (var e in n) t[e] = n[e];
                }), n(t);
            });
        });
    }, d = function(n) {
        return new Promise(function(e, o) {
            a = t(n), wx.setStorage({
                key: "track",
                data: a,
                success: function() {
                    e();
                }
            });
        });
    };
    return wx.getStorage({
        key: "track",
        success: function(n) {
            n.data ? (a = n.data, s().then(c).catch(function() {})) : f().then(l).then(d).then(s).then(c).catch(function() {});
        },
        fail: function(n) {
            f().then(l).then(d).then(s).then(c).catch(function() {});
        }
    }), {
        push: function(n) {
            var e = null, t = null, o = {};
            if (e = getCurrentPages(), n && n.extra && (o.extra = n.extra), n && n.logCode && "pv" != n.analyse) {
                if (n && n.logCode) {
                    o.logCode = n.logCode, o.clue = n.clue, e && (t = e[e.length - 1], o.path = t.route, 
                    o.query = t.options), u.push(o);
                }
            } else e && (t = e[e.length - 1], o.path = t.route, o.query = t.options), u.push(o);
            s().then(c).catch(function() {});
        }
    };
}();

module.exports = t;