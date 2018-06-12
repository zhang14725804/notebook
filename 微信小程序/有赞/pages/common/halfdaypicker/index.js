!function(e) {
    function t(a) {
        if (n[a]) return n[a].exports;
        var r = global.installedModules[a] = n[a] = {
            i: a,
            l: !1,
            exports: {}
        };
        return e[a].call(r.exports, r, r.exports, t), r.l = !0, r.exports;
    }
    e = Object.assign(require("../../../commons.js").modules, e);
    var n = {};
    n = global.installedModules = global.installedModules || {}, t.m = e, t.c = n, t.d = function(e, n, a) {
        t.o(e, n) || Object.defineProperty(e, n, {
            configurable: !1,
            enumerable: !0,
            get: a
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
    }, t.p = "", t(t.s = 237);
}({
    237: function(e, t, n) {
        function a(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        var r = a(n(0)), o = function(e) {
            if (e && e.__esModule) return e;
            var t = {};
            if (null != e) for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
            return t.default = e, t;
        }(n(23));
        a(n(51));
        var l = null;
        (0, r.default)({
            data: {
                title: "选择送达时间",
                serviceDomain: "",
                serviceName: "",
                data: []
            },
            onLoad: function(e) {
                var t = e.serviceDomain, n = e.serviceName;
                this.setData({
                    serviceDomain: t,
                    serviceName: n
                });
                var a = (l = o.getService(t, n)).getShowData();
                this.setData({
                    data: a
                });
            },
            onCancelTap: function() {
                wx.navigateBack();
            },
            onSlotTap: function(e) {
                var t = e.currentTarget.dataset, n = t.start, a = t.end;
                l && l.selectSlot(n, a), wx.navigateBack();
            }
        });
    }
});