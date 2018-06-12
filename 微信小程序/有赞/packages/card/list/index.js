!function(e) {
    function t(o) {
        if (n[o]) return n[o].exports;
        var r = global.installedModules[o] = n[o] = {
            i: o,
            l: !1,
            exports: {}
        };
        return e[o].call(r.exports, r, r.exports, t), r.l = !0, r.exports;
    }
    e = Object.assign(require("../../../commons.js").modules, e);
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
    }, t.p = "", t(t.s = 178);
}({
    178: function(e, t, n) {
        var o, r = (o = n(0)) && o.__esModule ? o : {
            default: o
        }, s = n(10), a = n(8), u = getApp();
        (0, r.default)(a, {
            data: {
                cardList: [],
                customer: {},
                userInfo: {},
                mobile: "",
                loaded: !1,
                hasMobile: !0
            },
            onLoad: function(e) {
                this.request = s(u);
            },
            onShow: function() {
                var e = this;
                wx.showLoading({
                    title: "努力加载中"
                }), u.getUserInfo(function(t) {
                    e.setData({
                        userInfo: t.userInfo
                    }), u.updateYouzanUserInfo(t.userInfo);
                }), this.request({
                    path: "/wscscrm/scrm/membercard/list.json"
                }).then(function(t) {
                    wx.hideLoading();
                    var n = !!u.getBuyerId();
                    e.setData({
                        hasMobile: n,
                        mobile: u.getMobile(),
                        cardList: t.card_list || [],
                        customer: t.customer || {},
                        loaded: !0
                    });
                }).catch(function(e) {
                    wx.showToast({
                        title: e.msg,
                        icon: "none",
                        duration: 1e3
                    });
                });
            },
            tapBindZanAccount: function() {
                this._upadateTitle(""), this.bindZanAccount();
            },
            onZanAccountBinded: function() {
                var e = !!u.getBuyerId();
                this.setData({
                    hasMobile: e
                });
            }
        });
    }
});