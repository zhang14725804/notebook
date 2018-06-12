var e = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../utils/api.js")), t = getApp();

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
    onLoad: function(a) {
        var n = decodeURIComponent(a.scene), i = this;
        t.fetch(e.default.getScanCodeInfo, {
            scene: n
        }, function(e, t, a) {
            var n = t.code, o = t.data;
            0 == n && o ? i.setData({
                "activityInfo.url": o
            }) : wx.redirectTo({
                url: "/pages/index/index"
            });
        });
    },
    bindMessage: function(e) {
        console.log(JSON.stringify(e) + "传入的shareMessage");
        var t = e.detail.data;
        t && t.length && this.setData({
            shareInfo: t[t.length - 1]
        });
    },
    onShareAppMessage: function() {
        var e = this.data.shareInfo, t = e.title, a = e.path, n = e.imageUrl, i = e.link, o = "";
        return o = a || (i ? "/pages/activity/public/public?url=" + encodeURIComponent(i) : "/pages/activity/public/public?url=" + encodeURIComponent(this.data.activityInfo.url)), 
        {
            title: t,
            path: o,
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