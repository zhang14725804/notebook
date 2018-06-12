var t = require("../../utils/keplerReport.js").init();

getApp();

Page({
    data: {
        screenHeight: 0,
        screenWidth: 0,
        thisBarTitle: ""
    },
    onLoad: function(e) {
        var i = this, a = "";
        a = e && e.thisBarTitle ? e.thisBarTitle : "商品错误", i.setData({
            thisBarTitle: a
        }), wx.getSystemInfo({
            success: function(t) {
                i.setData({
                    screenHeight: t.windowHeight,
                    screenWidth: t.windowWidth
                });
            }
        }), t.set({
            urlParam: e,
            title: a,
            siteId: "WXAPP-JA2016-1",
            account: wx.getStorageSync("desPin") ? wx.getStorageSync("desPin") : "-"
        });
    },
    onReady: function() {
        var t = this;
        t.data.thisBarTitle && wx.setNavigationBarTitle({
            title: t.data.thisBarTitle
        });
    },
    onShow: function() {
        t.pv();
    }
});