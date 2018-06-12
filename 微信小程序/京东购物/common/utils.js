function e(t) {
    return t.reduce(function(t, r) {
        var n = [].concat(r).some(Array.isArray);
        return t.concat(n ? e(r) : r);
    }, []);
}

var t = function() {
    function e(e, t) {
        var r = [], n = !0, o = !1, i = void 0;
        try {
            for (var a, u = e[Symbol.iterator](); !(n = (a = u.next()).done) && (r.push(a.value), 
            !t || r.length !== t); n = !0) ;
        } catch (e) {
            o = !0, i = e;
        } finally {
            try {
                !n && u.return && u.return();
            } finally {
                if (o) throw i;
            }
        }
        return r;
    }
    return function(t, r) {
        if (Array.isArray(t)) return t;
        if (Symbol.iterator in Object(t)) return e(t, r);
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
    };
}(), r = Object.prototype.toString, n = void 0;

module.exports = {
    getImg: function(e, t) {
        var r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : t;
        if (!e) return "";
        if (0 === e.indexOf("data:image") && -1 != e.indexOf("base64")) return e;
        var o = (e = (e = e.replace(/\s+/g, "")).replace(/^(https?:)?\/\//i, "http://")).match(/(\S*(jpg|jpeg|png|webp|gif))\s*/g);
        if (!o) return e;
        if (e = o[0], /^http/i.test(e) || (e = "http://img10.360buyimg.com/img/" + e), /\.gif/i.test(e)) return e;
        if (!/jfs\//.test(e) || !/(m|img\d{1,2})\.360buyimg\.com/.test(e) || !/\.(jpg|jpeg|png|webp)/.test(e)) return e;
        if (t && (e = e.replace(/(\/)(?:s\d+x\d+_)?(jfs\/)/, "$1s" + t + "x" + r + "_$2")), 
        void 0 === n ? n = getApp().webpSupport : n && /\.(jpg|jpeg|png)/.test(e) && !/\.webp/.test(e) && (e += ".webp"), 
        /\.(jpg|jpeg)/.test(e)) {
            var i = {
                wifi: 80,
                "4g": 60,
                "3g": 40,
                "2g": 20
            }[getApp().networkType];
            i && (e = e.replace(/(\.(jpg|jpeg))(!q\d{1,2})?/, "$1!q" + i));
        }
        var a = [ 10, 11, 12, 13, 14, 20, 30 ], u = (parseInt(e.substr(e.lastIndexOf("/") + 1, 8), 36) || 0) % a.length;
        return e = e.replace(/(\/\/img)\d{1,2}(\.360buyimg\.com)/, "$1" + a[u] + "$2");
    },
    querystring: function(e) {
        var t = [];
        for (var r in e) void 0 !== e[r] && ("string" == typeof e[r] && (e[r] = e[r].replace(/%/g, "%25"), 
        e[r] = e[r].replace(/&/g, "%26"), e[r] = e[r].replace(/\?/g, "%3F"), e[r] = e[r].replace(/=/g, "%3D")), 
        t.push(r + "=" + e[r]));
        return t.join("&");
    },
    querystr: function(e, n, o) {
        if ("[object Object]" == r.call(e)) {
            var i = [];
            for (var a in e) if (void 0 !== e[a]) {
                if ("string" == typeof e[a]) {
                    var u = o ? a.toLowerCase() : a;
                    n && n[a] ? e[u] = e[a] : e[u] = encodeURIComponent(e[a]);
                }
                i.push(a + "=" + e[a]);
            }
            return i.join("&");
        }
        if ("[object String]" == r.call(e)) {
            var s = e.split("#"), g = t(s, 2), p = g[0], c = g[1], l = {}, f = {
                hash: ""
            };
            return c && (f.hash = c), p && p.split("&").forEach(function(e) {
                var r = e.split("="), n = t(r, 2), i = n[0], a = n[1], u = o ? i.toLowerCase() : i;
                l[u] = decodeURIComponent(a);
            }), f.query = l, f;
        }
        return e;
    },
    throttle: function(e, t) {
        var r = 0;
        return function() {
            var n = Date.now();
            if (!(n - r < t)) return r = n, e.apply(this, arguments);
        };
    },
    debounce: function(e, t) {
        var r = null;
        return function() {
            var n = this, o = arguments;
            r && clearTimeout(r), r = setTimeout(function() {
                r = null, e.apply(n, o);
            }, t);
        };
    },
    decode: function(e) {
        try {
            return decodeURIComponent(e);
        } catch (t) {
            return e;
        }
    },
    isMobile: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "", t = arguments[1], r = e, n = e.substring(0, 3), o = e.substring(0, 4);
        return e = !!/^1\d{10}$/.test(e) && ("130,131,132,155,156,185,186,145,176,166,175".indexOf(n) >= 0 ? "联通" : "133,153,180,181,189,177,173,170,199".indexOf(n) >= 0 ? "电信" : "1349" == o ? "电信" : "134,135,136,137,138,139,150,151,152,157,158,159,187,188,147,182,183,184,178,171,198".indexOf(n) >= 0 ? "移动" : "未知"), 
        t || e || !/^1\d{2}\*{4}\d{4}$/.test(r) || (e = !0), e;
    },
    getUrlParam: function(e, t) {
        var r = new RegExp("(^|&)" + e + "=([^&]*)(&|$)", "i"), n = t.substr(t.indexOf("?") + 1).match(r);
        return null != n ? n[2] : "";
    },
    getRandomID: function() {
        return (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "") + Math.random().toString(36).substring(2, 15);
    },
    checkTime: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "", t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "", r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : Date.now();
        /^\d{10}$/.test(e + "") && (e *= 1e3), /^\d{10}$/.test(t + "") && (t *= 1e3);
        var n = !e || (parseInt(e) == e ? r >= e : r >= Date.parse(e)), o = !t || (parseInt(t) == t ? r < t : r < Date.parse(t));
        return n ? o ? 0 : 1 : -1;
    },
    formatTime: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : Date.now();
        if (e) {
            var t = new Date(e);
            return t.getFullYear() + "." + (t.getMonth() + 1) + "." + t.getDate();
        }
    },
    formatDate: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : Date.now(), t = arguments[1], r = new Date();
        r.setTime(e);
        var n = {
            "M+": r.getMonth() + 1,
            "d+": r.getDate(),
            "h+": r.getHours(),
            "m+": r.getMinutes(),
            "s+": r.getSeconds(),
            "q+": Math.floor((r.getMonth() + 3) / 3),
            "S+": r.getMilliseconds()
        };
        /(y+)/i.test(t) && (t = t.replace(RegExp.$1, (r.getFullYear() + "").substr(4 - RegExp.$1.length)));
        for (var o in n) new RegExp("(" + o + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? n[o] : ("00" + n[o]).substr(("" + n[o]).length)));
        return t;
    },
    genErrMsg: function(e, t) {
        return e && t ? e + "(" + t + ")" : e || t || "网络繁忙，请稍后再试";
    },
    getPageUrl: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null;
        if (!e) {
            var t = getCurrentPages();
            e = t[t.length - 1];
        }
        var r = e.route || e.__route__ || "app.js";
        return {
            route: r,
            vurl: "http://wq.jd.com/wxapp/" + r
        };
    },
    fixProtocol: function(e) {
        return e && (e = e.replace(/^(http:\/\/|\/\/)/, "https://")), e;
    },
    only: function(e, t) {
        return e = e || {}, "string" == typeof t && (t = t.split(/ +/)), t.reduce(function(t, r) {
            return null == e[r] ? t : (t[r] = e[r], t);
        }, {});
    },
    flatten: e,
    chunk: function(e, t) {
        if ("number" != typeof t) throw new TypeError("size is not number");
        if (!Array.isArray(e)) throw new TypeError("arr is not array");
        for (var r = [], n = 0; n < e.length; ) r.push(e.slice(n, n += t));
        return r;
    },
    canGetActiveCoupon: function(e) {
        var t = !1, r = !1, n = !1;
        return e && (e.DailyBingos < e.MaxDailyBingos && (t = !0), e.HourBingos < e.MaxHourBingos && (r = !0), 
        e.TotalBingos < e.MaxBingos && (n = !0)), t && r && n;
    },
    handleQueryScene: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t = e.scene;
        if ("string" == typeof t && 0 !== t.indexOf("shop/")) {
            var r = decodeURIComponent(t).replace(/@/g, "%");
            if (/=|&/.test(r)) {
                var n = {};
                r.split("&").forEach(function(e) {
                    var t = e.split("=");
                    if (2 == t.length) {
                        var r = decodeURIComponent(t[0]), o = decodeURIComponent(t[1]);
                        n[r] = o;
                    }
                }), delete e.scene, Object.assign(e, n);
            }
        }
    }
};