var a = require("../../../util/tracker.js"), t = require("../../../util/util.js"), i = getApp();

Page({
    data: {
        order_id: null,
        success: !1,
        fans_card: !1,
        loaded: !1,
        prepay: null
    },
    onShow: function() {
        a.push();
    },
    onLoad: function(a) {
        this.init(a);
    },
    init: function(a) {
        var n = this;
        i.doLogin().then(function(o) {
            i.request("order/view", {
                order_id: a.order_id
            }, function(i, o) {
                if (o) t.showError("服务异常请稍后再试,或下载小米商城APP"); else {
                    var e = i.data.order_status, r = !1;
                    3 != e && 20 != e && (r = !0);
                    var d = !1;
                    for (var _ in i.data.product) if (i.data.product[_].fanscard_vcode) {
                        d = 0 == (e = i.data.product[_].fanscard_vcode.status) || 1 == e;
                        break;
                    }
                    i.data.booking_info && i.data.booking_info.final_start_time && (i.data.booking_info.finalTime = t.formatTime(i.data.booking_info.final_start_time), 
                    i.data.now_time > i.data.booking_info.final_start_time && i.data.now_time < i.data.booking_info.final_end_time && 4 === i.data.booking_info.pre_status && 3 === i.data.booking_info.final_status && (r = !1)), 
                    i.data.prepay_info && i.data.prepay_info.final_start_time && (i.data.prepay_info.finalTime = t.formatTime(i.data.prepay_info.final_start_time), 
                    i.data.now_time > i.data.prepay_info.final_start_time && i.data.now_time < i.data.prepay_info.final_end_time && 4 === i.data.prepay_info.pre_status && 3 === i.data.prepay_info.final_status && (r = !1)), 
                    n.setData({
                        order_id: a.order_id,
                        success: r,
                        loaded: !0,
                        fans_card: d,
                        bookingInfo: i.data.booking_info || "",
                        prepay: i.data.prepay_info || null
                    });
                }
            });
        });
    },
    tapGoWxPay: function(a) {
        var n = this;
        i.request("pay/bankgo", {
            bank: "weixin_little",
            order_id: n.data.orderId,
            quick_order: 0
        }, function(a, i) {
            i ? t.showError("服务异常请稍后再试,或下载小米商城APP") : wx.requestPayment({
                timeStamp: a.data.timeStamp + "",
                nonceStr: a.data.nonceStr,
                package: a.data.package,
                signType: "MD5",
                paySign: a.data.paySign,
                complete: function(a) {
                    wx.redirectTo({
                        url: "./index?order_id=" + n.data.order_id
                    });
                }
            });
        });
    }
});