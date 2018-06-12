require("../../utils/util.js");

var t = require("../../utils/keplerReport.js").init();

Page({
    data: {
        payType: "",
        factPrice: ""
    },
    onLoad: function(e) {
        var a = "";
        a = "primary" == e.btnType ? "微信支付" : "货到付款";
        var i = e.factPrice;
        this.setData({
            payType: a,
            factPrice: i
        }), t.set({
            urlParam: e,
            title: "订单提交",
            siteId: "WXAPP-JA2016-1",
            account: wx.getStorageSync("desPin") ? wx.getStorageSync("desPin") : "-"
        });
    },
    onShow: function() {
        t.pv();
    }
});