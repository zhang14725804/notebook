!function(t) {
    function e(n) {
        if (i[n]) return i[n].exports;
        var a = global.installedModules[n] = i[n] = {
            i: n,
            l: !1,
            exports: {}
        };
        return t[n].call(a.exports, a, a.exports, e), a.l = !0, a.exports;
    }
    t = Object.assign(require("../../../../commons.js").modules, t);
    var i = {};
    i = global.installedModules = global.installedModules || {}, e.m = t, e.c = i, e.d = function(t, i, n) {
        e.o(t, i) || Object.defineProperty(t, i, {
            configurable: !1,
            enumerable: !0,
            get: n
        });
    }, e.r = function(t) {
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
    }, e.n = function(t) {
        var i = t && t.__esModule ? function() {
            return t.default;
        } : function() {
            return t;
        };
        return e.d(i, "a", i), i;
    }, e.o = function(t, e) {
        return Object.prototype.hasOwnProperty.call(t, e);
    }, e.p = "", e(e.s = 181);
}({
    181: function(t, e, i) {
        function n(t) {
            return t && t.__esModule ? t : {
                default: t
            };
        }
        var a = n(i(0)), o = n(i(3)), c = i(4), s = (i(7), i(1)), u = getApp(), r = i(8);
        (0, a.default)(r, s.Toast, {
            data: {
                user: {
                    points: 0
                },
                ticket: {}
            },
            onLoad: function(t) {
                var e = this, i = 7 == +t.type ? "优惠券" : "优惠码";
                wx.setNavigationBarTitle({
                    title: "兑换" + i
                }), u.getPoints().then(function(t) {
                    return e.setData({
                        "user.points": t.current_points
                    });
                }), wx.showShareMenu({
                    withShareTicket: !0
                }), this.fetchTicketDetail(t.id, t.alias);
            },
            fetchTicketDetail: function(t, e) {
                var i = this;
                wx.showLoading({
                    title: "努力加载中"
                }), u.request({
                    path: "wscump/coupon/get_ticket_with_points.json",
                    query: {
                        id: t,
                        alias: e
                    }
                }).then(function(t) {
                    t.alias = e, i.setData({
                        ticket: t
                    }), wx.hideLoading();
                }).catch(function(t) {
                    wx.hideLoading(), wx.showModal({
                        content: "获取优惠券信息失败",
                        title: "请求失败",
                        showCancel: !1,
                        success: function() {
                            wx.navigateBack();
                        }
                    });
                });
            },
            onShareAppMessage: function() {
                var t = this.data.ticket;
                return c.page.processShareData({
                    title: "邀你兑换" + (7 == t.activity.type ? "优惠券" : "优惠码"),
                    path: "packages/ump/integral-store/coupon/index?id=" + t.base.id + "&alias=" + t.alias + "&type" + t.activity.type,
                    imageUrl: 7 == t.activity.type ? "https://img.yzcdn.cn/public_files/2018/01/18/38fd2bcb70b825551581d3f198d2c459.png" : "https://img.yzcdn.cn/public_files/2018/01/18/36a7ac254ae46e7ea2971c2f891d6f37.png"
                });
            },
            onNavClick: function() {
                o.default.switchTab({
                    url: "/pages/home/dashboard/index"
                });
            },
            onCashButtonTapped: function() {
                var t = this;
                u.request({
                    path: "wscump/coupon/cash_ticket.json",
                    method: "POST",
                    data: {
                        couponGroupId: this.data.ticket.base.id
                    }
                }).then(function(e) {
                    wx.redirectTo({
                        url: "/packages/user/coupon/detail/index?id=" + e.coupon_id + "&from=points-cash&type=" + t.data.ticket.activity.type
                    });
                }).catch(function(e) {
                    t.showZanToast(e.msg || "兑换积分失败，原因未知");
                });
            },
            onZanAccountBinded: function() {
                wx.showLoading({
                    title: "努力加载中"
                }), this.buyerIdExists();
            }
        });
    }
});