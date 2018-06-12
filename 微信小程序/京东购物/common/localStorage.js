function e(e) {
    if (Array.isArray(e)) {
        for (var t = 0, n = Array(e.length); t < e.length; t++) n[t] = e[t];
        return n;
    }
    return Array.from(e);
}

function t() {
    var e = getCurrentPages(), t = e[e.length - 1];
    return t ? t.route : "app.js";
}

function n() {
    return +new Date();
}

function r(e) {
    if (!e) return 0;
    var t = ("" + e).match(/(\d+)([smhd])/), r = 0;
    if (t) {
        switch (t[2]) {
          case "s":
            r = 1e3 * t[1];
            break;

          case "m":
            r = 60 * t[1] * 1e3;
            break;

          case "h":
            r = 60 * t[1] * 60 * 1e3;
            break;

          case "d":
            r = 24 * t[1] * 60 * 60 * 1e3;
        }
        return n() + r;
    }
    return 0;
}

var i = require("../libs/promise.min.js"), o = {
    key: "HMMMMMMMMM 本地缓存 localStorage.js",
    print: function(t, n) {
        var r;
        (r = console)[t].apply(r, [ this.key ].concat(e(n)));
    },
    debug: function() {
        this.print("debug", arguments);
    },
    log: function() {
        this.print("log", arguments);
    },
    info: function() {
        this.print("info", arguments);
    },
    warn: function() {
        this.print("warn", arguments);
    },
    error: function() {
        this.print("error", arguments);
    }
}, c = [ "cookies", "gUserData" ], a = {
    set: function(e, t) {
        var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
        return new i(function(i, a) {
            var u = {
                _expire: r(n.expire || "7d"),
                _data: t
            };
            -1 != c.findIndex(function(t) {
                return t == e;
            }) && (u._expire = 987654321e4), wx.setStorage({
                key: e,
                data: u,
                success: function(t) {
                    o.log("本地缓存写入成功", e, u), i(t);
                },
                fail: function(t) {
                    o.log("本地缓存写入失败", e, t), a(t);
                }
            });
        });
    },
    get: function(e, t) {
        return new i(function(r, i) {
            wx.getStorage({
                key: e,
                success: function(c) {
                    var a = c.data, u = a._expire, s = a._data;
                    u > n() ? (o.log("本地缓存获取成功", e, c.data), r(s)) : wx.removeStorage({
                        key: e,
                        success: function(e) {},
                        complete: function() {
                            o.log("本地缓存清除完毕", e), void 0 !== t ? r(t) : i({
                                errMsg: "Storage data expired :("
                            });
                        }
                    });
                },
                fail: function(n) {
                    o.log("本地缓存获取失败", e), void 0 !== t ? r(t) : i(n);
                }
            });
        });
    },
    remove: function(e) {
        return new i(function(t, n) {
            wx.removeStorage({
                key: e,
                success: function(e) {
                    t(e);
                },
                fail: function(e) {
                    n(e);
                }
            });
        });
    },
    setSync: function(e, n) {
        var i = {
            _expire: r((arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}).expire || "7d"),
            _data: n
        };
        try {
            wx.setStorageSync(e, i);
        } catch (e) {}
        o.warn("检测到使用同步接口设置本地缓存，请替换为异步的 set 接口！key: " + e + ", page: " + t());
    },
    getSync: function(e) {
        var r = void 0;
        try {
            r = wx.getStorageSync(e);
        } catch (e) {}
        if (o.warn("检测到使用同步接口获取本地缓存，请替换为异步的 get 接口！key: " + e + ", page: " + t()), r) {
            if (r._expire > n()) return r._data;
            try {
                wx.removeStorageSync(e);
            } catch (e) {}
        }
    },
    checkAndClearAllIfNeeded: function() {
        wx.getStorageInfo({
            success: function(e) {
                e.currentSize > .9 * e.limitSize && (wx.clearStorage(), o.warn("清空本地缓存以防止溢出！", e.currentSize));
            }
        });
    },
    checkAndClearExpired: function() {
        var e = this;
        wx.getStorageInfo({
            success: function(t) {
                o.log("----- 开始清理过期的本地缓存 -----", t.keys), t.keys && "function" == typeof t.keys.forEach && t.keys.forEach(function(t) {
                    e.get(t);
                });
            }
        });
    }
};

module.exports = a;