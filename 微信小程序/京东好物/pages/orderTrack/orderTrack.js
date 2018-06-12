var e = require("../../utils/util.js"), r = (require("../../utils/MPay.js"), require("../../utils/keplerReport.js").init());

getApp();

Page({
    data: {},
    onLoad: function(t) {
        var a = this;
        r.set({
            urlParam: t,
            title: "订单跟踪",
            siteId: "WXAPP-JA2016-1",
            account: wx.getStorageSync("desPin") ? wx.getStorageSync("desPin") : "-"
        }), wx.getStorage({
            key: "order_track_jump_url",
            success: function(r) {
                var t = r.data.trackUrl;
                if (t) {
                    var i = getApp().globalRequestUrl + "/kwxhome" + t;
                    e.request({
                        url: i,
                        success: a.toViewPage.bind(a)
                    });
                }
                wx.removeStorageSync("order_track_jump_url");
            }
        });
    },
    onShow: function() {
        r.pv();
    },
    toViewPage: function(r) {
        try {
            this.setData({
                orderTrack: r
            });
        } catch (r) {
            e.reportErr("order track toview: " + r.message);
        }
    }
});