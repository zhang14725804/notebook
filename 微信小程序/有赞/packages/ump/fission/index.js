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
    }, e.p = "", e(e.s = 184);
}({
    184: function(t, e, a) {
        var o, n = (o = a(0)) && o.__esModule ? o : {
            default: o
        }, s = a(10), r = getApp();
        (0, n.default)({
            data: {
                isSharer: !0,
                shareBack: !1,
                loaded: !1,
                orderNo: "",
                sharer: {
                    total: 1,
                    takenCount: 0
                },
                take: {
                    state: 1
                },
                takenList: []
            },
            onLoad: function(t) {
                var e = this;
                this.request = s(r), console.log("query --", t);
                var a = !!t.sharer, o = !!t.shareback, n = t.order_no;
                this.setData({
                    isSharer: a,
                    shareBack: o,
                    orderNo: n
                }), a || wx.hideShareMenu(), this.loadData(function(t) {
                    e.setData({
                        loaded: !0
                    });
                });
            },
            loadData: function(t) {
                this.data.isSharer ? this.fetchTakenStatus(t) : this.take(t);
            },
            fetchTakenStatus: function(t) {
                var e = this;
                wx.showToast({
                    title: "数据查询中",
                    icon: "loading",
                    duration: 1e4
                }), this.request({
                    path: "/wscump/targeted-marketing/fission/taken-status.json",
                    query: {
                        order_no: this.data.orderNo,
                        needTaken: this.data.shareBack ? "1" : ""
                    }
                }).then(function(a) {
                    wx.hideToast(), t && t(), e.setData({
                        sharer: {
                            total: a.quantity,
                            takenCount: a.records.length
                        },
                        takenList: a.records
                    });
                }).catch(function(e) {
                    wx.hideToast(), wx.showToast({
                        title: "请刷新重试" + e.msg,
                        icon: "none",
                        duration: 1e3
                    }), t && t();
                });
            },
            take: function(t) {
                var e = this;
                wx.showToast({
                    title: "数据查询中",
                    icon: "loading",
                    duration: 1e4
                }), this.request({
                    path: "/wscump/targeted-marketing/fission/take.json",
                    query: {
                        order_no: this.data.orderNo
                    }
                }).then(function(a) {
                    wx.hideToast(), 3 != a.state ? (t && t(), e.setData({
                        "take.state": a.state
                    })) : wx.reLaunch({
                        url: "/packages/user/coupon/detail/index?type=promocard&from=list&tab=0&id=" + a.card_id
                    });
                }).catch(function(e) {
                    wx.hideToast(), wx.showToast({
                        title: e.msg,
                        icon: "none",
                        duration: 1e3
                    }), t && t();
                });
            },
            onPullDownRefresh: function() {
                this.loadData(function(t) {
                    setTimeout(function() {
                        wx.stopPullDownRefresh();
                    }, 0);
                });
            },
            onShareAppMessage: function(t) {
                var e = this;
                return {
                    title: "送你优惠券，一起买买买",
                    imageUrl: "https://img.yzcdn.cn/public_files/2018/02/08/36ea4b2bb74588099d5f8863dfd6ff3d.png",
                    path: "/packages/ump/fission/index?order_no=" + this.data.orderNo,
                    success: function(t) {
                        e.setData({
                            shareBack: !0
                        }), e.loadData();
                    },
                    fail: function(t) {}
                };
            }
        });
    }
});