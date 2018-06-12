!function(e) {
    function n(t) {
        if (o[t]) return o[t].exports;
        var r = global.installedModules[t] = o[t] = {
            i: t,
            l: !1,
            exports: {}
        };
        return e[t].call(r.exports, r, r.exports, n), r.l = !0, r.exports;
    }
    var o = {};
    o = global.installedModules = global.installedModules || {}, n.m = e, n.c = o, n.d = function(e, o, t) {
        n.o(e, o) || Object.defineProperty(e, o, {
            configurable: !1,
            enumerable: !0,
            get: t
        });
    }, n.r = function(e) {
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
    }, n.n = function(e) {
        var o = e && e.__esModule ? function() {
            return e.default;
        } : function() {
            return e;
        };
        return n.d(o, "a", o), o;
    }, n.o = function(e, n) {
        return Object.prototype.hasOwnProperty.call(e, n);
    }, n.p = "", n(n.s = 220);
}({
    220: function(e, n, o) {
        Page({
            onLoad: function() {
                wx.redirectTo({
                    url: "/packages/shop/goods/all/index"
                });
            }
        });
    }
});