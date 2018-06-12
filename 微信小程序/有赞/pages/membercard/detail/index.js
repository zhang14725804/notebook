!function(e) {
    function t(n) {
        if (o[n]) return o[n].exports;
        var r = global.installedModules[n] = o[n] = {
            i: n,
            l: !1,
            exports: {}
        };
        return e[n].call(r.exports, r, r.exports, t), r.l = !0, r.exports;
    }
    var o = {};
    o = global.installedModules = global.installedModules || {}, t.m = e, t.c = o, t.d = function(e, o, n) {
        t.o(e, o) || Object.defineProperty(e, o, {
            configurable: !1,
            enumerable: !0,
            get: n
        });
    }, t.r = function(e) {
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
    }, t.n = function(e) {
        var o = e && e.__esModule ? function() {
            return e.default;
        } : function() {
            return e;
        };
        return t.d(o, "a", o), o;
    }, t.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t);
    }, t.p = "", t(t.s = 194);
}({
    194: function(e, t, o) {
        var n = getApp();
        Page({
            onLoad: function(e) {
                n.checkPathMayExist(this.route, e) && wx.redirectTo({
                    url: "/packages/card/detail/index?goods_id=" + e.goods_id + "&alias=" + e.alias
                });
            }
        });
    }
});