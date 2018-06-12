function t(t) {
    var n = "?", o = 0;
    for (var e in t) t.hasOwnProperty(e) && (n += o ? "&" + e + "=" + t[e] : e + "=" + t[e], 
    o++);
    return n;
}

function n(t) {
    var n = /\//g;
    return t.split(" ")[0].replace(n, ".");
}

var o = require("../../utils/util.js"), e = require("../../utils/keplerReport.js").init(), a = require("../../utils/message_push.js"), s = getApp();

Page({
    data: {
        pDir: "/kwxp",
        couponNumb: "",
        uncouponNumb: 0,
        hasCoupon: !1,
        dqArr: [],
        jqArr: [],
        yfqArr: [],
        undqArr: [],
        unjqArr: [],
        unyfqArr: [],
        use: !0,
        unUse: !1,
        noAvailableItem: {
            msg: "很遗憾，您暂无可以使用的优惠券"
        },
        noUnavailableItem: {
            msg: "很遗憾，您暂无可以使用的优惠券"
        },
        screenHeight: 0,
        toTopDisplay: "none",
        scrollTop: 0
    },
    useClick: function() {
        this.setData({
            use: !0,
            unUse: !1
        });
    },
    unUseClick: function() {
        this.setData({
            use: !1,
            unUse: !0
        });
    },
    checkCb: function(t) {
        var n = t.currentTarget.dataset.type;
        "1" == n ? this.checkCouponHandle(t, "dqArr") : "2" == n ? this.checkCouponHandle(t, "jqArr") : "3" == n && this.checkCouponHandle(t, "yfqArr");
    },
    subBtn: function(t) {
        a.messagePush({
            formId: t.detail.formId,
            times: 1,
            type: 20002
        }), wx.navigateBack();
    },
    onLoad: function(t) {
        var n = this, a = s.globalRequestUrl + n.data.pDir + "/norder/couponsNewRule.json";
        wx.getSystemInfo({
            success: function(t) {
                n.setData({
                    screenHeight: t.windowHeight
                });
            }
        }), (0, o.request)({
            url: a,
            success: function(t) {
                n.dataInit(t);
            },
            fail: function(t) {
                (0, o.reportErr)("coupon couponsNewRule.json: " + t), wx.navigateTo({
                    url: "../error/error"
                });
            }
        }), e.set({
            urlParam: t,
            title: "优惠券",
            siteId: "WXAPP-JA2016-1",
            account: wx.getStorageSync("desPin") ? wx.getStorageSync("desPin") : "-"
        });
    },
    onShow: function() {
        e.pv();
    },
    onPullDownRefresh: function() {
        var t = this, n = s.globalRequestUrl + t.data.pDir + "/norder/couponsNewRule.json";
        (0, o.request)({
            url: n,
            success: function(n) {
                t.dataInit(n);
            },
            fail: function(t) {
                (0, o.reportErr)("coupon couponsNewRule.json: " + t), wx.navigateTo({
                    url: "../error/error"
                });
            }
        });
    },
    listScroll: function(t) {
        t.detail.scrollTop > this.data.screenHeight ? this.setData({
            toTopDisplay: "block"
        }) : this.setData({
            toTopDisplay: "none"
        });
    },
    toTopTap: function(t) {
        this.setData({
            toTopDisplay: "none",
            scrollTop: .001 * Math.random()
        });
    },
    dataInit: function(t) {
        if ("string" != typeof t) {
            var n, o, e;
            this.useCouponDataInit(t.dcouponList), this.useCouponDataInit(t.jcouponList), this.useCouponDataInit(t.mcouponList), 
            this.unUseCouponDataInit(t.ndcouponList), this.unUseCouponDataInit(t.njcouponList), 
            this.unUseCouponDataInit(t.nmcouponList), n = t.dcouponList.length + t.jcouponList.length + t.mcouponList.length, 
            e = t.ndcouponList.length + t.njcouponList.length + t.nmcouponList.length, o = n > 0, 
            this.setData({
                couponNumb: n,
                uncouponNumb: e,
                hasCoupon: o,
                dqArr: t.dcouponList,
                jqArr: t.jcouponList,
                yfqArr: t.mcouponList,
                undqArr: t.ndcouponList,
                unjqArr: t.njcouponList,
                unyfqArr: t.nmcouponList
            });
        } else console.log("data err");
    },
    useCouponDataInit: function(t) {
        t.forEach(function(t) {
            t.timeBegin = n(t.timeBegin), t.timeEnd = n(t.timeEnd), t.readOnly ? t.gray = 2 : t.gray = 1;
        });
    },
    unUseCouponDataInit: function(t) {
        t.forEach(function(t) {
            t.timeBegin = n(t.timeBegin), t.timeEnd = n(t.timeEnd);
        });
    },
    checkCouponHandle: function(t, n) {
        var o = t.currentTarget.dataset.index;
        if (2 != this.data[n][o].gray && 1 == this.data[n][o].gray) {
            this.data[n][o].selected = !this.data[n][o].selected;
            var e = {
                "useOrCancelCouponPara.Key": this.data[n][o].key,
                "useOrCancelCouponPara.Selected": this.data[n][o].selected,
                "useOrCancelCouponPara.Id": this.data[n][o].id
            }, a = {};
            return a[n] = this.data[n], this.setData(a), void this.send(e);
        }
    },
    send: function(n) {
        var e = this, a = s.globalRequestUrl + this.data.pDir + "/norder/useOrCancelCoupon.json" + t(n);
        wx.showToast({
            title: "加载中...",
            icon: "loading",
            duration: 1e4,
            mask: !0
        }), (0, o.request)({
            url: a,
            success: function(t) {
                e.checkCouponNext(t);
            },
            complete: function() {
                wx.hideToast();
            },
            fail: function(t) {
                (0, o.reportErr)("coupon useOrCancelCoupon.json: " + t);
            }
        });
    },
    checkCouponNext: function(t) {
        wx.hideToast(), t.Flag ? (this.checkCouponStateChange(t, "dcouponList", "dqArr"), 
        this.checkCouponStateChange(t, "jcouponList", "jqArr"), this.checkCouponStateChange(t, "mcouponList", "yfqArr")) : wx.showModal({
            content: "优惠券不存在或已过期",
            showCancel: !1
        });
    },
    checkCouponStateChange: function(t, n, o) {
        for (var e = 0; e < t[n].length; e++) t[n][e].readOnly ? this.data[o][e].gray = 2 : this.data[o][e].gray = 1;
        var a = {};
        a[o] = this.data[o], this.setData(a);
    }
});