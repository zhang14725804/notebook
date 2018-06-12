var e = require("../../models/pay/wechat_pay.js");

new (require("../../bases/page.js"))({
    data: {
        price: 0,
        dealId: ""
    },
    onLoad: function(a) {
        var d = this, r = a.dealId, o = a.price, t = a.source, i = a.failRedirectUrl, c = getApp().appId;
        this.setData({
            price: o || 0,
            dealId: r
        }), r && e.requestPay(c, r, function(e, a) {
            "oilcard" == t && (e ? i && d.$goto("/pages/h5/index", {
                url: decodeURIComponent(i)
            }, "redirectTo") : d.$goto("/pages/pay_second/done/done", {
                dealId: a,
                orderType: "oilcard"
            }, "redirectTo"));
        });
    }
});