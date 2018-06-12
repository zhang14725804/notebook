var e = require("../../utils/h5Login.js");

getApp();

Page({
    data: {
        h5Url: ""
    },
    onLoad: function(t) {
        var r = this, d = "", n = t.pid ? "&pid=" + t.pid : "", o = t.orderId ? "&orderId=" + t.orderId : "", a = encodeURIComponent("https://chat.jd.com?wxAppName=Kepler&entry=" + t.entry + "&venderId=" + t.venderId + n + o);
        e.promiseGentoken().then(function(e) {
            0 == e.data.err_code && (d = e.data.url + "?to=" + a + "&tokenkey=" + e.data.tokenkey, 
            r.setData({
                h5Url: d
            }));
        });
    },
    onShow: function() {}
});