!function(t) {
    function e(o) {
        if (a[o]) return a[o].exports;
        var n = global.installedModules[o] = a[o] = {
            i: o,
            l: !1,
            exports: {}
        };
        return t[o].call(n.exports, n, n.exports, e), n.l = !0, n.exports;
    }
    t = Object.assign(require("../../../commons.js").modules, t);
    var a = {};
    a = global.installedModules = global.installedModules || {}, e.m = t, e.c = a, e.d = function(t, a, o) {
        e.o(t, a) || Object.defineProperty(t, a, {
            configurable: !1,
            enumerable: !0,
            get: o
        });
    }, e.r = function(t) {
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
    }, e.n = function(t) {
        var a = t && t.__esModule ? function() {
            return t.default;
        } : function() {
            return t;
        };
        return e.d(a, "a", a), a;
    }, e.o = function(t, e) {
        return Object.prototype.hasOwnProperty.call(t, e);
    }, e.p = "", e(e.s = 173);
}({
    173: function(t, e, a) {
        var o, n = (o = a(0)) && o.__esModule ? o : {
            default: o
        }, i = a(10), r = a(8), c = getApp();
        (0, n.default)(r, {
            data: {
                alias: "",
                cardNo: "",
                from: "take",
                needActive: !1,
                hasMobile: !1
            },
            onLoad: function(t) {
                var e = this;
                this.request = i(c);
                var a = t.alias, o = t.card_no, n = t.need_active, r = void 0 === n ? 0 : n, s = t.from, d = void 0 === s ? "take" : s, u = 1 == r, l = !!c.getBuyerId();
                this.setData({
                    alias: a,
                    cardNo: o,
                    needActive: u,
                    from: d,
                    hasMobile: l
                }), setTimeout(function() {
                    l = !!c.getBuyerId(), e.setData({
                        hasMobile: l
                    });
                }, 200);
            },
            goToActive: function() {
                this.data.hasMobile ? this.realActive() : this.bindZanAccount();
            },
            onZanAccountBinded: function() {
                this.data.zanAccount && this.data.zanAccount.phoneNumber && this.realActive();
            },
            realActive: function() {
                var t = this;
                wx.showLoading({
                    title: "努力加载中"
                }), this.request({
                    path: "/wscscrm/scrm/membercard/get.json",
                    query: {
                        alias: this.data.alias
                    }
                }).then(function(e) {
                    var a = e.card || e.customer_card.card, o = e.customer_card;
                    a.detail.activation_condition.require_profile ? wx.navigateTo({
                        url: "/packages/card/active/index?card_no=" + o.card_no + "&alias=" + t.data.alias
                    }) : t.request({
                        path: "/wscscrm/scrm/membercard/activate.json",
                        method: "post",
                        data: {
                            cardNo: o.card_no,
                            customerInfo: {}
                        }
                    }).then(function() {
                        wx.hideLoading(), wx.navigateBack();
                    }).catch(function(t) {
                        wx.hideLoading(), wx.showToast({
                            title: t.msg,
                            icon: "none",
                            duration: 1e3
                        });
                    });
                }).catch(function(t) {
                    wx.hideLoading(), wx.showToast({
                        title: t.msg,
                        icon: "none",
                        duration: 1e3
                    });
                });
            }
        });
    }
});