function e(e, t, a) {
    return t in e ? Object.defineProperty(e, t, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = a, e;
}

var t = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../utils/api.js")), a = require("../../libs/moment.min.js");

a.locale("en", {
    longDateFormat: {
        l: "YYYY.MM.DD",
        L: "YYYY.MM.DD HH:mm"
    }
});

var n = getApp();

Page({
    data: {
        currentTab: 0,
        couponArrayObj: {
            0: [],
            1: [],
            2: []
        },
        tabHasRequest: {
            0: !0,
            1: !1,
            2: !1
        },
        exchangeCode: "",
        isShowMask: !1,
        showText: "",
        nowPageIndex: {
            0: 0,
            1: 0,
            2: 0
        },
        isIphoneX: !1,
        piwikSource: ""
    },
    onLoad: function(e) {
        var t = this, a = this.getCouponByType;
        wx.getSystemInfo({
            success: function(e) {
                console.log(e), e.model && "string" == typeof e.model && e.model.includes("iPhone X") && t.setData({
                    isIphoneX: !0
                });
            },
            fail: function(e) {
                console.log("获取手机信息失败");
            }
        }), a(0, [ 0 ], 0);
    },
    swichNav: function(t) {
        var a = t.target.dataset.current, n = this.data, o = (n.couponArrayObj, n.tabHasRequest), i = this.getCouponByType;
        if (!o[a]) {
            i(a, 0 == a ? [ 0 ] : 1 == a ? [ 1 ] : [ 2, 3 ], 0);
            var s = "tabHasRequest." + a;
            this.setData(e({}, s, !0));
        }
        this.setData({
            currentTab: a
        });
    },
    exchangeInput: function(e) {
        this.setData({
            exchangeCode: e.detail.value
        });
    },
    handleExchange: function() {
        var e = this.data.exchangeCode;
        (e || e.length) && n.post(t.default.getCouponByCode, {
            code: e
        }, function(e, t, a) {
            0 == t.code ? (wx.showToast({
                title: "兑换成功",
                icon: "success",
                duration: 1e3
            }), setTimeout(function() {
                wx.redirectTo({
                    url: "../usercenter/coupon"
                });
            }, 1500)) : wx.showToast({
                title: t.message,
                icon: "none",
                duration: 2e3
            });
        });
    },
    scrollToBottom: function() {
        var e = this.data, t = e.currentTab, a = e.nowPageIndex;
        (0, this.getCouponByType)(t, 0 == t ? [ 0 ] : 1 == t ? [ 1 ] : [ 2, 3 ], a[t]);
    },
    handleDesc: function(e) {
        var t = e.target.dataset.desc;
        t && t.length && this.setData({
            isShowMask: !0,
            showText: t
        });
    },
    handleCloseMask: function(e) {
        this.setData({
            isShowMask: !1
        });
    },
    getCouponByType: function() {
        var o = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0, i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [ 2, 3 ], s = this, r = arguments[2], u = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 10, c = this.data.couponArrayObj;
        n.post(t.default.getUserCenterCoupon, {
            pageSize: u,
            pageIndex: r,
            status: i
        }, function(t, n, i) {
            if (0 == n.code) {
                var u, d = c[o];
                n.data && n.data.length && n.data.map(function(e) {
                    e.startTime = a(e.startTime).format("l"), e.endTime = a(e.endTime).format("l"), 
                    e.minPriceLimit ? e.minPriceLimit = "满" + e.minPriceLimit + "元可用" : e.minPriceLimit = "不限金额", 
                    e.startTime && e.endTime && (e.timerStr = "使用期限:" + e.startTime + "-" + e.endTime), 
                    d.push(e);
                });
                var l = "couponArrayObj." + o, h = "nowPageIndex." + o;
                s.setData((u = {}, e(u, l, d), e(u, h, ++r), u));
            }
        });
    }
});