!function(e) {
    function t(o) {
        if (n[o]) return n[o].exports;
        var a = global.installedModules[o] = n[o] = {
            i: o,
            l: !1,
            exports: {}
        };
        return e[o].call(a.exports, a, a.exports, t), a.l = !0, a.exports;
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
    }, t.p = "", t(t.s = 166);
}({
    166: function(e, t, n) {
        function o(e) {
            if (e && e.__esModule) return e;
            var t = {};
            if (null != e) for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
            return t.default = e, t;
        }
        function a(e, t, n) {
            return t in e ? Object.defineProperty(e, t, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = n, e;
        }
        var i, s = (i = n(0)) && i.__esModule ? i : {
            default: i
        }, u = o(n(1)), r = o(n(25)), c = getApp(), l = void 0, d = void 0, f = void 0, p = void 0, h = void 0, g = !1;
        (0, s.default)(u.Toast, r, {
            data: {
                list: [],
                page: 1
            },
            onLoad: function(e) {
                var t = JSON.parse(e.component || {});
                p = t.coupon_source;
                var n = t.list || [];
                f = 0 == p ? t.coupon_num : n.length, l = 1 == t.hide_unshared_coupon ? 1 : 0, d = 1 == t.hide_empty_coupon ? 0 : 1, 
                h = n.join(","), this.fetchList();
            },
            onPullDownRefresh: function() {
                0 == f && (g = !0), this.setData({
                    page: 1
                }), this.fetchList();
            },
            onReachBottom: function() {
                g && this.fetchList();
            },
            fetchList: function() {
                var e = this, t = {
                    with_user_status: c.getBuyerId() ? 1 : 0,
                    disable_unshare: l,
                    include_understock: d,
                    perpage: 0 == f ? 20 : f,
                    page: this.data.page,
                    types: "7"
                };
                1 == p && (t.ids = h), wx.showLoading({
                    title: "加载中"
                }), c.carmen({
                    api: "youzan.ump.coupon/1.0.0/search",
                    query: t,
                    success: function(t) {
                        var n = t.list || [], o = [];
                        n.forEach(function(t) {
                            var n = e.handleCouponData(t);
                            o.push(n);
                        });
                        var a = 1 == e.data.page ? [] : e.data.list;
                        if (0 == f && 20 == n.length) {
                            g = !0;
                            var i = e.data.page + 1;
                            e.setData({
                                page: i
                            });
                        } else g = !1;
                        e.setData({
                            list: a.concat(o)
                        });
                    },
                    fail: function(t) {
                        e.showZanToast(t.msg || "获取信息失败");
                    },
                    complete: function() {
                        wx.hideLoading();
                    }
                });
            },
            onMoredescTaped: function(e, t) {
                this.setData(a({}, "list[" + t + "]", e));
            },
            onCouponObtainedSuccess: function(e, t) {
                this.setData(a({}, "list[" + t + "]", e));
            }
        });
    }
});