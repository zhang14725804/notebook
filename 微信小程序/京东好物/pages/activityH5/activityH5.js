var e = require("../../utils/h5Login.js"), t = require("../../utils//shop_util.js");

getApp();

Page({
    data: {
        h5Url: ""
    },
    onLoad: function(t) {
        var o = t.redirectUrl, n = wx.getStorageSync("activityUrl");
        o ? o = decodeURIComponent(o) : n && (o = n), console.log(o);
        var i = this, r = "", a = "/pages/activityH5/activityH5?redirectUrl=" + encodeURIComponent(o), c = encodeURIComponent(o + "&returnpage=" + encodeURIComponent(a));
        e.promiseGentoken().then(function(e) {
            0 == e.data.err_code && (r = e.data.url + "?to=" + c + "&tokenkey=" + e.data.tokenkey, 
            i.setData({
                h5Url: r
            }));
        });
    },
    onShow: function() {},
    onShareAppMessage: function() {
        var e = t.getShopConfigure(), o = this;
        return {
            title: e.configure.activityName ? e.configure.activityName : "",
            desc: "",
            path: "/pages/activityH5/activityH5?redirectUrl=" + encodeURIComponent(o.data.h5Url)
        };
    }
});