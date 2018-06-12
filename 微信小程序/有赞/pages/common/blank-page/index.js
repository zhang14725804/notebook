!function(e) {
    function o(t) {
        if (n[t]) return n[t].exports;
        var r = global.installedModules[t] = n[t] = {
            i: t,
            l: !1,
            exports: {}
        };
        return e[t].call(r.exports, r, r.exports, o), r.l = !0, r.exports;
    }
    e = Object.assign(require("../../../commons.js").modules, e);
    var n = {};
    n = global.installedModules = global.installedModules || {}, o.m = e, o.c = n, o.d = function(e, n, t) {
        o.o(e, n) || Object.defineProperty(e, n, {
            configurable: !1,
            enumerable: !0,
            get: t
        });
    }, o.r = function(e) {
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
    }, o.n = function(e) {
        var n = e && e.__esModule ? function() {
            return e.default;
        } : function() {
            return e;
        };
        return o.d(n, "a", n), n;
    }, o.o = function(e, o) {
        return Object.prototype.hasOwnProperty.call(e, o);
    }, o.p = "", o(o.s = 238);
}({
    238: function(e, o, n) {
        var t = getApp(), r = n(9);
        Page({
            onShow: function(e) {
                e.dc_ps && (console.log("=== set dc_ps ===", e.dc_ps), t.storage.set("logv2:dc_ps", e.dc_ps, {
                    expire: .125
                }));
            },
            onLoad: function(e) {
                t.checkSession(), e.scene || this.redirectTo("pages/home/dashboard/index"), this.fetchPageConfig(e);
            },
            redirectTo: function(e) {
                var o = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                "/" !== e.slice(0, 1) && (e = "/" + e), wx.reLaunch({
                    url: r.add(e, o),
                    fail: function(e) {
                        console.log(e, "===============");
                    }
                });
            },
            fetchPageConfig: function(e) {
                var o = this;
                t.carmen({
                    api: "youzan.shop.weapp/1.0.0/codescene",
                    query: {
                        key: e.scene
                    },
                    config: {
                        skipShopInfo: !0
                    },
                    success: function(e) {
                        var n = e.kdtId, r = e.page;
                        t.trigger("update:youzan:kdtId", n), delete e.kdtId, delete e.page, o.redirectTo(r, e);
                    },
                    fail: function() {
                        o.redirectTo("pages/home/dashboard/index");
                    }
                });
            }
        });
    }
});