!function(e) {
    function t(n) {
        if (r[n]) return r[n].exports;
        var o = global.installedModules[n] = r[n] = {
            i: n,
            l: !1,
            exports: {}
        };
        return e[n].call(o.exports, o, o.exports, t), o.l = !0, o.exports;
    }
    e = Object.assign(require("../../../commons.js").modules, e), e = Object.assign(require("../../../vendors.js").modules, e);
    var r = {};
    r = global.installedModules = global.installedModules || {}, t.m = e, t.c = r, t.d = function(e, r, n) {
        t.o(e, r) || Object.defineProperty(e, r, {
            configurable: !1,
            enumerable: !0,
            get: n
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
    }, t.p = "", t(t.s = 114);
}({
    114: function(e, t, r) {
        function n(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        var o = n(r(0)), a = n(r(2)), s = getApp();
        (0, o.default)({
            data: {
                goods: {}
            },
            onLoad: function(e) {
                var t = e.goods, r = s.db.get(t);
                r.message = this.formatMessage(r.message), this.setData({
                    goods: r
                });
            },
            formatMessage: function() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];
                return e.forEach(function(e) {
                    var t = e.value, r = /^\s*http(s)*:\/\/.+/.test(t) ? "image" : "text";
                    e.type = r, "image" == r && (e.preview = (0, a.default)(t, "!200x200.jpg"));
                }), e;
            },
            previewImg: function(e) {
                var t = e.currentTarget.dataset.src;
                wx.previewImage({
                    current: t,
                    urls: [ t ]
                });
            },
            navigateBack: function() {
                wx.navigateBack();
            }
        });
    }
});