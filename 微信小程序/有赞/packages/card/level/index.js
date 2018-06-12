!function(e) {
    function t(o) {
        if (n[o]) return n[o].exports;
        var r = global.installedModules[o] = n[o] = {
            i: o,
            l: !1,
            exports: {}
        };
        return e[o].call(r.exports, r, r.exports, t), r.l = !0, r.exports;
    }
    e = Object.assign(require("../../../commons.js").modules, e);
    var n = {};
    n = global.installedModules = global.installedModules || {}, t.m = e, t.c = n, t.d = function(e, n, o) {
        t.o(e, n) || Object.defineProperty(e, n, {
            configurable: !1,
            enumerable: !0,
            get: o
        });
    }, t.r = function(e) {
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
    }, t.n = function(e) {
        var n = e && e.__esModule ? function() {
            return e.default;
        } : function() {
            return e;
        };
        return t.d(n, "a", n), n;
    }, t.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t);
    }, t.p = "", t(t.s = 174);
}({
    174: function(e, t, n) {
        var o = n(10), r = getApp();
        Page({
            data: {
                cardList: []
            },
            onLoad: function(e) {
                var t = this;
                this.request = o(r), wx.showLoading({
                    title: "努力加载中"
                }), this.request({
                    path: "/wscscrm/scrm/membercard/levelinfo.json"
                }).then(function(e) {
                    wx.hideLoading(), t.setData({
                        cardList: e
                    });
                }).catch(function(e) {
                    console.log(e);
                });
            }
        });
    }
});