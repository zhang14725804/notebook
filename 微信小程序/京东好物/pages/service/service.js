var e = require("../../utils/h5Login.js"), o = require("../../utils/util.js");

getApp();

Page({
    data: {
        h5Url: "",
        returnpage: "/pages/service/service"
    },
    onLoad: function(t) {
        if (console.log(t.isLogined), "false" == t.isLogined) return o.globalLoginShow(this), 
        !1;
        var n = this, i = "", r = encodeURIComponent("https://tuihuan.jd.com/afs/orders?sourceType=120");
        e.promiseGentoken().then(function(e) {
            0 == e.data.err_code && (i = e.data.url + "?to=" + r + "&tokenkey=" + e.data.tokenkey, 
            n.setData({
                h5Url: i
            }));
        });
    },
    onShow: function(e) {},
    loginModalShow: function() {}
});