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
    e = Object.assign(require("../../../commons.js").modules, e);
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
    }, t.p = "", t(t.s = 240);
}({
    240: function(e, t, o) {
        function n(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        var r = n(o(0)), u = n(o(3));
        !function(e) {
            if (e && e.__esModule) return e;
            var t = {};
            if (null != e) for (var o in e) Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o]);
            t.default = e;
        }(o(4));
        var l = getApp();
        (0, r.default)({
            data: {
                text: "",
                code: 0
            },
            onLoad: function(e) {
                var t = l.db.get(e.dbid) || {};
                this.setData({
                    text: t.text || "哎呀，出错了",
                    code: t.code || 0
                });
            },
            onShow: function() {
                this.isShowed && u.default.switchTab({
                    url: "/pages/home/dashboard/index"
                }), this.isShowed = !0;
            }
        });
    }
});