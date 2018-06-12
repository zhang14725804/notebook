!function(e) {
    function o(n) {
        if (t[n]) return t[n].exports;
        var r = global.installedModules[n] = t[n] = {
            i: n,
            l: !1,
            exports: {}
        };
        return e[n].call(r.exports, r, r.exports, o), r.l = !0, r.exports;
    }
    e = Object.assign(require("../../../commons.js").modules, e);
    var t = {};
    t = global.installedModules = global.installedModules || {}, o.m = e, o.c = t, o.d = function(e, t, n) {
        o.o(e, t) || Object.defineProperty(e, t, {
            configurable: !1,
            enumerable: !0,
            get: n
        });
    }, o.r = function(e) {
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
    }, o.n = function(e) {
        var t = e && e.__esModule ? function() {
            return e.default;
        } : function() {
            return e;
        };
        return o.d(t, "a", t), t;
    }, o.o = function(e, o) {
        return Object.prototype.hasOwnProperty.call(e, o);
    }, o.p = "", o(o.s = 226);
}({
    226: function(e, o, t) {
        var n, r = (n = t(9)) && n.__esModule ? n : {
            default: n
        };
        Page({
            onLoad: function() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, o = r.default.add("/packages/shop/goods/group/index", e);
                wx.redirectTo({
                    url: o
                });
            }
        });
    }
});