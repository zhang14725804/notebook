require("../../../util/util.js");

var t = require("../../../util/page.js"), e = getApp();

Page({
    data: {
        info: {}
    },
    onLoad: function(a) {
        var i = this;
        Object.assign(i, t);
        var r = a.page;
        e.request("news/detail", {
            alias_key: r
        }, function(t, e) {
            if (e) wx.switchTab({
                url: "/pages/index/index"
            }); else {
                var a = t.data.content, o = a.page.redirectTo || {};
                o.url && ("switchTab" == o.open_type ? wx.switchTab({
                    url: o.url
                }) : wx.redirectTo({
                    url: o.url
                }));
                var n = a.page.title || {};
                n.bg_color && wx.setNavigationBarColor({
                    backgroundColor: n.bg_color,
                    frontColor: n.txt_color
                }), n.txt && wx.setNavigationBarTitle({
                    title: n.txt
                }), i.setData({
                    info: a,
                    page: r
                });
            }
        });
    },
    onPullDownRefresh: function() {
        var t = this, a = t.data.page;
        e.request("news/detail", {
            alias_key: a
        }, function(e, a) {
            t.setData({
                info: e.data.content
            }), wx.stopPullDownRefresh();
        });
    }
});