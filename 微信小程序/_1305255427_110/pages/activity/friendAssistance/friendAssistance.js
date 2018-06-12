getApp();

Page({
    data: {
        piwikSource: "",
        activityInfo: {
            url: "",
            userid: ""
        },
        shareInfo: {},
        resource: {
            shareImage: "https://sr.aihuishou.com/activity/minapp/friendassistanceshare.png"
        }
    },
    onLoad: function(n) {
        var e = this;
        if (n.url) {
            var t = decodeURIComponent(n.url).split("userid=")[0], o = encodeURIComponent(decodeURIComponent(n.url).split("userid=")[1]);
            o = "undefined" == o ? "" : "userid=" + o, e.data.activityInfo.url = t + o;
        }
        n.userid && (e.data.activityInfo.userid = decodeURIComponent(n.userid)), e.setData({
            activityInfo: e.data.activityInfo
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function(n) {
        var e = this, t = e.data.shareInfo, o = e.data.resource.shareImage;
        return t.link = "https" + t.link.split("http")[1], console.log("url", t.link), {
            title: "轻松点一下，为我加个价！",
            path: "/pages/activity/friendAssistance/friendAssistance?url=" + encodeURIComponent(t.link),
            imageUrl: o,
            success: function() {
                console.log("分享成功!");
            },
            fail: function(n) {
                console.log(n);
            }
        };
    },
    bindMessage: function(n) {
        var e = this;
        e.data.shareInfo = n.detail.data[0], e.setData({
            shareInfo: e.data.shareInfo
        });
    }
});