getApp();

Page({
    data: {
        piwikSource: "",
        activityInfo: {
            id: "",
            url: "",
            model: ""
        },
        shareInfo: {}
    },
    onLoad: function(e) {
        if ("" != e.url) {
            var t = decodeURIComponent(e.url);
            this.setData({
                "activityInfo.url": t
            });
        } else wx.redirectTo({
            url: "/pages/index/index"
        });
    },
    bindMessage: function(e) {
        console.log(JSON.stringify(e) + "传入的shareMessage"), console.log(e), this.setData({
            shareInfo: e.detail.data[0]
        });
    },
    onShareAppMessage: function() {
        var e = this.data.shareInfo, t = e.title, a = e.path, o = e.imageUrl, i = e.link, n = "";
        return n = a || (i ? "/pages/activity/template/template?url=" + encodeURIComponent(i) : "/pages/activity/template/template?url=" + encodeURIComponent(this.data.activityInfo.url)), 
        {
            title: t,
            path: n,
            imageUrl: o,
            success: function(e) {
                console.log("分享成功!", e);
            },
            fail: function(e) {
                console.log(e);
            }
        };
    }
});