function e(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

function t(e, t) {
    var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : Date.now();
    /^\d{10}$/.test(e + "") && (e *= 1e3), /^\d{10}$/.test(t + "") && (t *= 1e3);
    var r = !e || (parseInt(e) == e ? n >= e : n >= Date.parse(e)), i = !t || (parseInt(t) == t ? n < t : n < Date.parse(t));
    return r && i;
}

var n = function() {
    function e(e, t) {
        for (var n = 0; n < t.length; n++) {
            var r = t[n];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
            Object.defineProperty(e, r.key, r);
        }
    }
    return function(t, n, r) {
        return n && e(t.prototype, n), r && e(t, r), t;
    };
}(), r = function() {
    function e(e, t) {
        var n = [], r = !0, i = !1, a = void 0;
        try {
            for (var o, u = e[Symbol.iterator](); !(r = (o = u.next()).done) && (n.push(o.value), 
            !t || n.length !== t); r = !0) ;
        } catch (e) {
            i = !0, a = e;
        } finally {
            try {
                !r && u.return && u.return();
            } finally {
                if (i) throw a;
            }
        }
        return n;
    }
    return function(t, n) {
        if (Array.isArray(t)) return t;
        if (Symbol.iterator in Object(t)) return e(t, n);
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
    };
}(), i = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../api/Ptag/Ptag_utils")), a = require("../../common/cookie-v2/cookie.js").getCookie, o = require("../../common/utils.js").throttle, u = function() {
    function t() {
        var n = this;
        e(this, t), this.listening = !0, this.reachTop = !1, this.emit = o(this.emit, 4e3), 
        wx.onAccelerometerChange(function(e) {
            var t = e.x, r = e.y, i = e.z, a = Math.sqrt(t * t + r * r + i * i);
            !n.reachTop && a > 3 ? n.reachTop = !0 : n.reachTop && a < 1.2 && (n.reachTop = !1, 
            n.emit("shake"));
        });
    }
    return n(t, null, [ {
        key: "init",
        value: function() {
            return t.instance ? t.instance.start() : t.instance = new t(), t.instance;
        }
    } ]), n(t, [ {
        key: "on",
        value: function(e) {
            this.cb = e;
        }
    }, {
        key: "emit",
        value: function() {
            this.cb();
        }
    }, {
        key: "start",
        value: function() {
            var e = this;
            this.listening || wx.startAccelerometer({
                success: function() {
                    e.listening = !0, e.reachTop = !1;
                }
            });
        }
    }, {
        key: "stop",
        value: function() {
            var e = this;
            this.listening && wx.stopAccelerometer({
                success: function() {
                    e.listening = !1;
                }
            });
        }
    } ]), t;
}();

module.exports = {
    genErrMsg: function(e, t) {
        return (e || "网络繁忙，请稍候再试") + (t ? "(" + t + ")" : "");
    },
    checkTime: t,
    fixUrl: function(e) {
        return e.replace(/^(http:)?\/\//, "https://");
    },
    report: function(e) {
        2 == e.split(".").length ? i.default.addPtag("137889." + e) : i.default.addPtag(e);
    },
    clipImg: function(e, t, n) {
        if ("string" != typeof e) return "";
        if (0 === e.indexOf("data:image") && -1 != e.indexOf("base64")) return e;
        if (/\.gif/i.test(e)) return e;
        if (!/jfs\//.test(e) || !/(m|img\d{2})\.360buyimg\.com/.test(e) || !/\.(jpg|jpeg|png|webp)/.test(e)) return e;
        var r = "!cc_" + t + "x" + n;
        return /!cc_(\d)+x(\d)+/.test(e) ? e = e.replace(/!cc_(\d)+x(\d)+/, r) : e.endsWith(".webp") ? e = "" + (e = e.replace(/(.*).webp/, "$1")) + r + ".webp" : e += r, 
        e;
    },
    vkGreyScale: function(e) {
        if ("string" != typeof e || !e.includes("-")) return !0;
        var t = e.split("-"), n = r(t, 2), i = n[0], o = n[1];
        if (i = parseInt(i), o = parseInt(o), 100 === i && 100 === o) return !1;
        if (isNaN(i) || isNaN(o) || i < 0 || o > 99 || i > o) return !0;
        var u = a("visitkey"), c = parseInt(u.slice(-2));
        return !!isNaN(c) || c >= i && c <= o;
    },
    greyScale: function(e) {
        if (isNaN(+e)) return !1;
        var t = a("visitkey"), n = parseInt(t.slice(t.length - 2)) + 1, r = parseInt(e);
        return 100 === r || r > 0 && r <= 100 && n <= r;
    },
    getActiveConfig: function(e) {
        var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, r = n.date || Date.now(), i = n.default || {};
        return e.find(function(e) {
            return t(e.beginTime, e.endTime, r);
        }) || i;
    },
    Shake: u
};