!function(r) {
    function t(n) {
        if (e[n]) return e[n].exports;
        var u = e[n] = {
            i: n,
            l: !1,
            exports: {}
        };
        return r[n].call(u.exports, u, u.exports, t), u.l = !0, u.exports;
    }
    var e = {};
    t.m = r, t.c = e, t.d = function(r, e, n) {
        t.o(r, e) || Object.defineProperty(r, e, {
            configurable: !1,
            enumerable: !0,
            get: n
        });
    }, t.r = function(r) {
        Object.defineProperty(r, "__esModule", {
            value: !0
        });
    }, t.n = function(r) {
        var e = r && r.__esModule ? function() {
            return r.default;
        } : function() {
            return r;
        };
        return t.d(e, "a", e), e;
    }, t.o = function(r, t) {
        return Object.prototype.hasOwnProperty.call(r, t);
    }, t.p = "", t(t.s = 0);
}([ function(r, t, e) {
    function n(r, t) {
        for (var e = arguments.length, n = Array(e > 2 ? e - 2 : 0), u = 2; u < e; u++) n[u - 2] = arguments[u];
        r[t] = function(r) {
            for (var t = arguments.length, e = Array(t > 1 ? t - 1 : 0), n = 1; n < t; n++) e[n - 1] = arguments[n];
            return function() {
                for (var t = this, n = arguments.length, u = Array(n), o = 0; o < n; o++) u[o] = arguments[o];
                r.call.apply(r, [ this ].concat(u)), e.forEach(function(r) {
                    return r.call.apply(r, [ t ].concat(u));
                });
            };
        }.apply(void 0, [ r[t] ].concat(n));
    }
    function u() {
        wx.request({
            url: a + "mp_pv"
        });
        var r = this.__route__;
        "pages/detail/detail" === r && wx.request({
            url: a + "mp_inquiry_start"
        }), "pages/inquiry/inquiry" === r && wx.request({
            url: a + "mp_inquiry_end"
        }), "pages/order/order" === r && wx.request({
            url: a + "mp_checkout"
        });
    }
    var o, a = "https://xin.aihuishou.com/status/";
    o = Page, Page = function(r) {
        n(r, "onLoad", u), o(r);
    };
} ]);