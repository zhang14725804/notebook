var e = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../../utils/api.js")), t = getApp();

Page({
    data: {
        activityInfo: {
            id: "",
            url: "",
            model: ""
        },
        shareInfo: {},
        piwikSource: ""
    },
    onLoad: function(o) {
        var n = this;
        if ("" != o.url) {
            var a = decodeURIComponent(o.url);
            this.setData({
                "activityInfo.url": a
            }), t.fetch(e.default.fetchUser, {}, function(e, t, o) {
                if (t.data) {
                    var i = t.data.mobileLoginToken;
                    a = a.includes("?") ? a + "&minitoken=" + encodeURIComponent(i) : a + "?minitoken=" + encodeURIComponent(i), 
                    console.log(a), n.setData({
                        "activityInfo.url": a
                    });
                } else console.log("未登录");
            });
        } else wx.redirectTo({
            url: "/pages/index/index"
        });
    },
    bindMessage: function(e) {
        console.log(JSON.stringify(e) + "传入的shareMessage"), console.log(e);
        var t = e.detail.data;
        this.setData({
            shareInfo: t[t.length - 1]
        });
    },
    onShareAppMessage: function() {
        var e = this.data.shareInfo, t = e.title, o = e.path, n = e.imageUrl, a = e.link, i = "";
        return o ? i = o : a ? (a = a.replace(/https?/, "https"), i = "/pages/activity/private/private?url=" + encodeURIComponent(a)) : i = "/pages/activity/private/private?url=" + encodeURIComponent(this.data.activityInfo.url), 
        {
            title: t,
            path: i,
            imageUrl: n,
            success: function(e) {
                console.log("分享成功!", e);
            },
            fail: function(e) {
                console.log(e);
            }
        };
    }
});