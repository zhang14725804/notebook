var t = require("../../../util/util.js"), e = require("../../../util/tracker.js"), i = getApp();

Page({
    data: {
        title: "",
        list: []
    },
    onShow: function(t) {
        e.push();
    },
    onLoad: function(e) {
        var a = this;
        t.showLoading(), i.request("cate/list", {
            cate_id: e.id || "116"
        }, function(i, r) {
            if (t.hideLoading(), r) t.showError("网络开小差了了~请稍后再试"); else {
                var i = i.data;
                for (var s in i) i[s].product_desc_origin = i[s].product_desc.replace(/<[^>]+>/g, "");
                a.setData({
                    list: i,
                    title: e.title
                });
                var n = e.shareChannel || "";
                "" != n && wx.setStorageSync("shareChannel", n);
            }
        });
    }
});