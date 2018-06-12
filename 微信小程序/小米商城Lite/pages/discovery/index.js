var e = require("../../util/tracker.js"), a = (require("../../util/util.js"), require("../../util/page.js")), t = getApp();

Page({
    data: {
        info: {},
        share: {},
        loaded: !1
    },
    onShow: function() {
        e.push();
    },
    onLoad: function(e) {
        var s = this;
        Object.assign(s, a), t.request("news/detail", {
            alias_key: "discovery"
        }, function(e, a) {
            if (a) wx.switchTab({
                url: "/pages/index/index"
            }); else {
                var t = e.data.content;
                s.setData({
                    info: t,
                    share: t.page && t.page.share ? t.page.share : {},
                    loaded: !0
                });
            }
        });
    },
    onPullDownRefresh: function() {
        var e = this;
        t.request("news/detail", {
            alias_key: "discovery"
        }, function(a, t) {
            e.setData({
                info: a.data.content
            }), wx.stopPullDownRefresh();
        });
    },
    onShareAppMessage: function() {
        return share;
    }
});