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
    e = Object.assign(require("../../commons.js").modules, e);
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
    }, o.p = "", o(o.s = 322);
}({
    322: function(e, o, n) {
        var t, r = (t = n(0)) && t.__esModule ? t : {
            default: t
        }, l = n(4), a = getApp();
        (0, r.default)({
            onShow: function() {
                wx.switchTab({
                    url: "/pages-youzan/dashboard/home/index"
                }), l.page.show(), l.track({
                    fm: "click",
                    ei: "to_choice_from_youzan",
                    en: "点击公共版精选Tab"
                }), a.logger && a.logger.log({
                    fm: "click",
                    ei: "to_choice_from_youzan",
                    en: "点击公共版精选Tab"
                }), wx.navigateToMiniProgram({
                    appId: "wxf1fdc416d4ced1b3"
                });
            }
        });
    }
});