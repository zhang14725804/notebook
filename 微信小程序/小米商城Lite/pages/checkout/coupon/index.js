var o = require("../../../util/util.js"), e = require("../../../util/tracker.js"), t = getApp();

Page({
    data: {
        couponCode: "",
        couponId: "",
        coupons: []
    },
    quickOrder: "",
    onShow: function() {
        e.push();
    },
    onLoad: function(o) {
        var e = this, t = o.couponType, c = o.couponCode || "", u = wx.getStorageSync("checkout:couponList");
        this.quickOrder = o.quickOrder || "", wx.setStorageSync("checkout:default_coupon", !1), 
        t && (wx.setStorageSync("checkout:couponType", t), wx.setStorageSync("checkout:couponCode", c), 
        "1" == t ? e.setData({
            couponCode: c
        }) : e.setData({
            couponId: c
        })), e.setData({
            coupons: u
        });
    },
    codeChanged: function(o) {
        this.setData({
            couponCode: o.detail.value.trim()
        });
    },
    chooseItem: function(o) {
        var e = this, t = o.currentTarget.dataset.cid;
        "" == e.data.couponCode && (e.data.couponId == t && (t = ""), e.setData({
            couponId: t
        }));
    },
    submit: function() {
        var e = this, c = e.data.couponCode, u = e.data.couponId, n = "";
        c ? n = "1" : "" != u && (n = "2", c = u), n ? (o.showLoading(), t.request("order/validcoupon", {
            coupon_type: n,
            coupon_code: c,
            quick_order: e.quickOrder
        }, function(e, t) {
            o.hideLoading(), t ? o.showError(t.desc || "服务异常请稍后再试,或下载小米商城APP") : (wx.setStorageSync("checkout:couponType", n), 
            wx.setStorageSync("checkout:couponCode", c), wx.navigateBack());
        })) : (wx.setStorageSync("checkout:couponType", n), wx.setStorageSync("checkout:couponCode", c), 
        wx.navigateBack());
    }
});