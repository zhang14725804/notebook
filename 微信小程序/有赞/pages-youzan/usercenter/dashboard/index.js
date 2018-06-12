!function(t) {
    function n(o) {
        if (e[o]) return e[o].exports;
        var r = global.installedModules[o] = e[o] = {
            i: o,
            l: !1,
            exports: {}
        };
        return t[o].call(r.exports, r, r.exports, n), r.l = !0, r.exports;
    }
    t = Object.assign(require("../../../commons.js").modules, t);
    var e = {};
    e = global.installedModules = global.installedModules || {}, n.m = t, n.c = e, n.d = function(t, e, o) {
        n.o(t, e) || Object.defineProperty(t, e, {
            configurable: !1,
            enumerable: !0,
            get: o
        });
    }, n.r = function(t) {
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
    }, n.n = function(t) {
        var e = t && t.__esModule ? function() {
            return t.default;
        } : function() {
            return t;
        };
        return n.d(e, "a", e), e;
    }, n.o = function(t, n) {
        return Object.prototype.hasOwnProperty.call(t, n);
    }, n.p = "", n(n.s = 324);
}({
    324: function(t, n, e) {
        function o(t) {
            if (t && t.__esModule) return t;
            var n = {};
            if (null != t) for (var e in t) Object.prototype.hasOwnProperty.call(t, e) && (n[e] = t[e]);
            return n.default = t, n;
        }
        var r, u = (r = e(0)) && r.__esModule ? r : {
            default: r
        }, s = o(e(1)), a = o(e(8)), i = e(4), c = getApp();
        (0, u.default)(s.Toast, a, {
            data: {
                userInfo: {},
                orderCount: {
                    topay: 0,
                    totuan: 0,
                    tosend: 0,
                    send: 0
                },
                showBindPhoneNumber: !1
            },
            onLoad: function() {},
            onShow: function() {
                var t = this;
                this.getUserInfo(), this.fetchTradeCount(), setTimeout(function() {
                    t.fetchTradeCount();
                }, 3e3), i.page.show();
                var n = c.getBuyerId();
                this.setData({
                    showBindPhoneNumber: !n
                });
            },
            handleBannerClick: function() {
                var t = this;
                this.data.userInfo.avatarUrl || this.getUserInfo().catch(function() {
                    t.showZanToast("请同意小程序使用您的用户信息"), setTimeout(function() {
                        wx.openSetting({
                            success: function() {
                                var n = (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}).authSetting;
                                (void 0 === n ? {} : n)["scope.userInfo"] && t.getUserInfo();
                            }
                        });
                    }, 1500);
                });
            },
            handleAccountBindClick: function() {
                this.bindZanAccount();
            },
            onZanAccountBinded: function() {
                this.setData({
                    showBindPhoneNumber: !1
                }), this.fetchTradeCount();
            },
            getUserInfo: function() {
                var t = this;
                return new Promise(function(n, e) {
                    c.getUserInfo(function(e) {
                        var o = e.userInfo;
                        t.setData({
                            userInfo: o
                        }), c.updateYouzanUserInfo(o), n(o);
                    }, function(t) {
                        return e(t);
                    });
                });
            },
            fetchTradeCount: function() {
                var t = this;
                c.carmen({
                    api: "kdt.trade.buyer.count/1.0.2/get",
                    config: {
                        skipKdtId: !0,
                        skipShopInfo: !0
                    },
                    success: function(n) {
                        var e = function(t) {
                            return t > 99 ? "99+" : t;
                        };
                        t.setData({
                            orderCount: {
                                topay: e(n.topay),
                                totuan: e(n.totuan),
                                tosend: e(n.tosend),
                                send: e(n.send)
                            }
                        });
                    }
                });
            }
        });
    }
});