var n = require("../../utils/keplerReport.js").init();

Page({
    data: {},
    onLoad: function(t) {
        n.set({
            urlParam: t,
            title: "京东用户注册协议",
            siteId: "WXAPP-JA2016-1",
            account: wx.getStorageSync("desPin") ? wx.getStorageSync("desPin") : "-"
        });
    },
    onReady: function() {},
    onShow: function() {
        n.pv();
    },
    onHide: function() {},
    onUnload: function() {}
});