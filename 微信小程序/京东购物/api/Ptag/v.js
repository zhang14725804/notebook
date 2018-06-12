function t(t, e) {
    if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !e || "object" != typeof e && "function" != typeof e ? t : e;
}

function e(t, e) {
    if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
    t.prototype = Object.create(e && e.prototype, {
        constructor: {
            value: t,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e);
}

function o(t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}

function i(t) {
    switch (t) {
      case "wifi":
        c = 1;
        break;

      case "2g":
      case "3g":
        c = 2;
        break;

      default:
        c = 3;
    }
}

function n(t, e) {
    for (var o = a.getCookie("PPRD_P") || "", i = "", n = o.split("-"), r = 0; r < n.length; r++) 0 != n[r].length && (i.length > 0 && (i += "-"), 
    "LOGID." == n[r].substr(0, 6) ? i += "LOGID." + t.logid : i += n[r]);
    o.match(/LOGID\.(\d+\.\d+)/) || (i.length > 0 && (i += "-"), i += "LOGID." + t.logid), 
    a.setCookie({
        data: {
            PPRD_P: {
                value: i,
                decode: !0
            }
        }
    });
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.UserShareV = exports.GuessyouLikeV = exports.ItemExposureV = exports.SearchExposureV = exports.PageV = exports.ClickV = void 0;

var r = function() {
    function t(t, e) {
        for (var o = 0; o < e.length; o++) {
            var i = e[o];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), 
            Object.defineProperty(t, i.key, i);
        }
    }
    return function(e, o, i) {
        return o && t(e.prototype, o), i && t(e, i), e;
    };
}();

exports.initAppReport = function() {
    var t = new p(function(t, e) {
        wx.getNetworkType({
            success: function(e) {
                t(e.networkType);
            },
            fail: function(e) {
                t("2g");
            }
        });
    });
    return l ? h ? p.resolve(h) : l : l = new p(function(e, o) {
        var i = s.default.get("fristSplash", Date.now()), n = s.default.get("thisSplash", Date.now()), r = s.default.get("splashCount", 0), a = s.default.get("lastSplash", Date.now());
        p.all([ i, n, a, r, t ]).then(function(t) {
            h = {
                firstSplash: t[0],
                thisSplash: t[1],
                lastSplash: t[2],
                splashCount: ++t[3],
                networkType: t[4]
            }, s.default.set("fristSplash", h.firstSplash), s.default.set("splashCount", h.splashCount), 
            e(h);
        });
    });
};

var s = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../../common/localStorage")), a = require("../../common/cookie-v2/cookie.js"), p = require("../../libs/promise.min.js"), u = require("../../common/user_info"), c = 3, h = null, l = null, f = function() {
    function t() {
        o(this, t), this._strings_ = [];
    }
    return r(t, [ {
        key: "append",
        value: function(t) {
            this._strings_.push(t);
        }
    }, {
        key: "toString",
        value: function() {
            return this._strings_.join("");
        }
    } ]), t;
}(), d = function() {
    function t(e, n, r) {
        o(this, t), i(r.networkType || "wifi"), this.vurl = n, this.chan_type = 5, this.wid = u.gUserData().wid, 
        this.openid = u.gUserData().open_id;
        var s = u.gUserData().pin;
        this.pinid = s || "-", this.wq_unionid = u.gUserData().unionid, this.unpl = a.getCookie("unpl"), 
        this.net_type = c, this.wxapp_type = a.getCookie("wxapp_type") || "1";
        var p = (a.getCookie("__wga") || "").split(".");
        p.length >= 6 ? (this.fst = p[3], this.pst = p[2], this.vct = p[1], this.visit_times = p[5]) : (this.fst = r.firstSplash || Date.now(), 
        this.pst = r.lastSplash || Date.now(), this.vct = r.thisSplash || Date.now(), this.visit_times = r.splashCount || 1);
        var h = (a.getCookie("PPRD_P") || "").match(/LOGID\.(\d+\.\d+)/);
        h && (this.logid = h[1]), this.jdv = a.getCookie("__jdv");
    }
    return r(t, [ {
        key: "toString",
        value: function() {
            var t = new f();
            for (var e in this) if (this.hasOwnProperty(e)) {
                if ("function" == typeof this[e]) continue;
                t.append(e), t.append("="), this[e] && t.append(this[e]), t.append("$");
            }
            var o = t.toString();
            return o.substring(0, o.length - 1);
        }
    } ]), t;
}();

exports.ClickV = function(i) {
    function n(e, i, r, s) {
        o(this, n);
        var p = t(this, (n.__proto__ || Object.getPrototypeOf(n)).call(this, e, i, s)), u = wx.getSystemInfoSync();
        p.screen = u.windowWidth + "x" + u.windowHeight, p.color = "32-bit", p.os = "weixin_" + u.version, 
        p.device_type = u.model;
        var c = a.getCookie("PPRD_P") || "", h = [ "firstSplash", "lastSplash", "thisSplash", "splashCount", "networkType" ];
        p.cookie_ptag = "";
        for (var l = [ "EA", "IA", "CT", "PD" ], f = 0; f < l.length; f++) {
            var d = c.match(l[f] + "\\.(\\d+)\\.(\\d+)\\.(\\d+)");
            d && (p.cookie_ptag && (p.cookie_ptag += "-"), p.cookie_ptag += d[0]);
        }
        var g = p.jdv.split("|");
        if (p.jdv.length > 4 ? (p.usc = g[1], p.ucp = g[2], p.umd = g[3], p.uct = g[4]) : (p.usc = "direct", 
        p.ucp = "-", p.umd = "none", p.uct = "-"), p.target = r, s) for (var _ in s) -1 == h.indexOf(_) && (p[_] = s[_]);
        return p;
    }
    return e(n, d), n;
}(), exports.PageV = function(i) {
    function r(e, i, s, p) {
        o(this, r);
        var u = t(this, (r.__proto__ || Object.getPrototypeOf(r)).call(this, e, i, p)), c = wx.getSystemInfoSync();
        u.screen = c.windowWidth + "x" + c.windowHeight, u.color = "32-bit", u.os = "weixin_" + c.version, 
        u.logid = Date.now() + "." + Math.round(2147483647 * Math.random()), u.device_type = c.model;
        var h = a.getCookie("PPRD_P") || "", l = [ "firstSplash", "lastSplash", "thisSplash", "splashCount", "networkType" ];
        u.cookie_ptag = "";
        for (var f = [ "EA", "IA", "CT", "PD" ], d = 0; d < f.length; d++) {
            var g = h.match(f[d] + "\\.(\\d+)\\.(\\d+)\\.(\\d+)");
            g && (u.cookie_ptag && (u.cookie_ptag += "-"), u.cookie_ptag += g[0]);
        }
        var _ = u.jdv.split("|");
        if (u.jdv.length > 4 ? (u.usc = _[1], u.ucp = _[2], u.umd = _[3], u.uct = _[4]) : (u.usc = "direct", 
        u.ucp = "-", u.umd = "none", u.uct = "-"), u.target = s, n(u), p) for (var v in p) -1 == l.indexOf(v) && (u[v] = p[v]);
        return u;
    }
    return e(r, d), r;
}(), exports.SearchExposureV = function(i) {
    function n(e, i, r) {
        o(this, n);
        var s = t(this, (n.__proto__ || Object.getPrototypeOf(n)).call(this, e, i, r));
        return r = r || {}, s.v = r, s;
    }
    return e(n, d), n;
}(), exports.ItemExposureV = function(i) {
    function n(e, i, r, s) {
        o(this, n);
        var a = t(this, (n.__proto__ || Object.getPrototypeOf(n)).call(this, e, i, s)), p = wx.getSystemInfoSync();
        a.screen = p.windowWidth + "x" + p.windowHeight, a.color = "32-bit", a.os = "weixin_" + p.version, 
        a.device_type = p.model, a.target = r;
        var u = [ "firstSplash", "lastSplash", "thisSplash", "splashCount", "networkType" ];
        if (s) for (var c in s) -1 == u.indexOf(c) && (a[c] = s[c]);
        return a;
    }
    return e(n, d), n;
}(), exports.GuessyouLikeV = function(i) {
    function n(e, i, r) {
        o(this, n);
        var s = t(this, (n.__proto__ || Object.getPrototypeOf(n)).call(this, e, i, r)), a = wx.getSystemInfoSync(), p = [ "firstSplash", "lastSplash", "thisSplash", "splashCount", "networkType" ];
        if (s.os = "weixin_" + a.version, s.user_type = "-" !== s.pinid ? 1 : 0, s.chan_type = 6, 
        r) for (var u in r) -1 === p.indexOf(u) && (s[u] = r[u]);
        return s;
    }
    return e(n, d), n;
}(), exports.UserShareV = function(i) {
    function n(e, i, r) {
        o(this, n);
        var s = t(this, (n.__proto__ || Object.getPrototypeOf(n)).call(this, e, i, r));
        s.cookie_ptag = "";
        for (var p = a.getCookie("PPRD_P") || "", u = [ "EA", "IA", "CT", "PD" ], c = 0; c < u.length; c++) {
            var h = p.match(u[c] + "\\.(\\d+)\\.(\\d+)\\.(\\d+)");
            h && (s.cookie_ptag && (s.cookie_ptag += "-"), s.cookie_ptag += h[0]);
        }
        var l = [ "firstSplash", "lastSplash", "thisSplash", "splashCount", "networkType" ];
        if (r) for (var f in r) -1 === l.indexOf(f) && (s[f] = opt[f]);
        return s;
    }
    return e(n, d), n;
}();