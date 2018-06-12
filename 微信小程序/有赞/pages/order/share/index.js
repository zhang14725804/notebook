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
    }, r.p = "", r(r.s = 215);
}({
    215: function(e, r, t) {
        var n, o = (n = t(9)) && n.__esModule ? n : {
            default: n
        };
        Page({
            onLoad: function() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                wx.redirectTo({
                    url: o.default.add("/packages/trade/order/share/index", e)
                });
            }
        });
    }
});