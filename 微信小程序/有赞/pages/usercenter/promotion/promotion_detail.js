!function(e) {
    function r(n) {
        if (t[n]) return t[n].exports;
        var o = global.installedModules[n] = t[n] = {
            i: n,
            l: !1,
            exports: {}
        };
        return e[n].call(o.exports, o, o.exports, r), o.l = !0, o.exports;
    }
    e = Object.assign(require("../../../commons.js").modules, e);
    var t = {};
    t = global.installedModules = global.installedModules || {}, r.m = e, r.c = t, r.d = function(e, t, n) {
        r.o(e, t) || Object.defineProperty(e, t, {
            configurable: !1,
            enumerable: !0,
            get: n
        });
    }, r.r = function(e) {
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
    }, r.n = function(e) {
        var t = e && e.__esModule ? function() {
            return e.default;
        } : function() {
            return e;
        };
        return r.d(t, "a", t), t;
    }, r.o = function(e, r) {
        return Object.prototype.hasOwnProperty.call(e, r);
    }, r.p = "", r(r.s = 201);
}({
    201: function(e, r, t) {
        var n, o = Object.assign || function(e) {
            for (var r = 1; r < arguments.length; r++) {
                var t = arguments[r];
                for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
            }
            return e;
        }, l = (n = t(9)) && n.__esModule ? n : {
            default: n
        };
        Page({
            onLoad: function(e) {
                var r = l.default.add("/packages/user/coupon/detail/index", o({}, e));
                wx.redirectTo({
                    url: r
                });
            }
        });
    }
});