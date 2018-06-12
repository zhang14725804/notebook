var t = getApp(), e = require("../../../util/util.js"), a = require("../../../util/page.js");

Page({
    data: {
        info: {}
    },
    onLoad: function(i) {
        var r = this;
        Object.assign(r, a);
        var s = i.page || "";
        "" != s && ("project-hb-fail-4" == s && wx.setNavigationBarTitle({
            title: "小米MIX 2 新品发布会"
        }), t.request("news/detail", {
            alias_key: s
        }, function(t, a) {
            if (a) e.showError("服务异常请稍后再试,或下载小米商城APP"); else {
                var i = t.data.content;
                r.setData({
                    info: i
                });
            }
        }));
    }
});