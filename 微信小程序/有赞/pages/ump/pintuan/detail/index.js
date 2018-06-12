!function(e) {
    function t(o) {
        if (r[o]) return r[o].exports;
        var n = global.installedModules[o] = r[o] = {
            i: o,
            l: !1,
            exports: {}
        };
        return e[o].call(n.exports, n, n.exports, t), n.l = !0, n.exports;
    }
    var r = {};
    r = global.installedModules = global.installedModules || {}, t.m = e, t.c = r, t.d = function(e, r, o) {
        t.o(e, r) || Object.defineProperty(e, r, {
            configurable: !1,
            enumerable: !0,
            get: o
        });
    }, t.r = function(e) {
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
    }, t.n = function(e) {
        var r = e && e.__esModule ? function() {
            return e.default;
        } : function() {
            return e;
        };
        return t.d(r, "a", r), r;
    }, t.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t);
    }, t.p = "", t(t.s = 197);
}({
    197: function(e, t, r) {
        var o = getApp();
        Page({
            onLoad: function(e) {
                o.checkPathMayExist(this.route, e) || wx.redirectTo({
                    url: "/packages/ump/pintuan/detail/index?orderNo=" + e.orderNo + "&groupAlias=" + e.groupAlias
                });
            }
        });
    }
});