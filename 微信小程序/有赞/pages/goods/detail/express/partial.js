!function(e) {
    function t(o) {
        if (n[o]) return n[o].exports;
        var l = global.installedModules[o] = n[o] = {
            i: o,
            l: !1,
            exports: {}
        };
        return e[o].call(l.exports, l, l.exports, t), l.l = !0, l.exports;
    }
    e = Object.assign(require("../../../../commons.js").modules, e);
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
    }, t.p = "", t(t.s = 219);
}({
    219: function(e, t, n) {
        var o, l = (o = n(0)) && o.__esModule ? o : {
            default: o
        }, r = getApp();
        (0, l.default)({
            data: {
                list: []
            },
            onLoad: function(e) {
                var t = (r.db.get(e.db) || {}).list;
                t && t.length || (wx.showToast({
                    title: "获取部分区域包邮信息失败",
                    icon: "none"
                }), wx.navigateBack()), this.setData({
                    list: t
                });
            }
        });
    }
});