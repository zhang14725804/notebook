var e = require("../../utils/h5Login.js"), t = require("../../utils//shop_util.js"), o = getApp();

Page({
    data: {
        h5Url: ""
    },
    onLoad: function() {
        var t = this, o = "", a = encodeURIComponent(wx.getStorageSync("activityUrl")) || "";
        e.promiseGentoken().then(function(e) {
            0 == e.data.err_code && (o = e.data.url + "?to=" + a + "&tokenkey=" + e.data.tokenkey, 
            t.setData({
                h5Url: o
            }));
        });
    },
    onShow: function() {},
    onShareAppMessage: function() {
        var e = t.getShopConfigure();
        return {
            title: e.configure.activityName ? e.configure.activityName : "",
            desc: o.shareDesc,
            path: "/pages/jshopH5/jshopH5"
        };
    }
});