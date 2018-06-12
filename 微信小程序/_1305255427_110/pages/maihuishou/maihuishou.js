function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

t(require("../../utils/api.js")), t(require("../../utils/wxDiscode.js"));

var a = t(require("../../libs/lodash.core.min.js"));

require("../../utils/util.js"), t(require("../../libs/es6-promise.min")), getApp();

Page({
    data: {
        piwikSource: "",
        zhulishareInfo: {},
        activityStatus: {
            zhulishareInfo: !1
        },
        resource: {
            zhulishareImage: "https://sr.aihuishou.com/activity/minapp/friendassistanceshare.png"
        }
    },
    onLoad: function(t) {
        piwik(this);
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function(t) {
        var a = this, i = "", e = "", s = "";
        if (a.data.activityStatus.zhulishareInfo) {
            var n = a.data.zhulishareInfo;
            i = "轻松点一下，为我加个价！", e = "/pages/activity/friendAssistance/friendAssistance?url=" + encodeURIComponent(n.link), 
            s = a.data.resource.zhulishareImage, a.data.activityStatus.zhulishareInfo = !1;
        }
        return a.setData({
            activityStatus: a.data.activityStatus
        }), console.log("url", e), {
            title: i,
            path: e,
            imageUrl: s,
            success: function() {
                console.log("分享成功!");
            },
            fail: function(t) {
                console.log(t);
            }
        };
    },
    bindMessage: function(t) {
        var i = this;
        a.default.forEach(t.detail.data, function(t) {
            "help" == t.name && (i.data.activityStatus.zhulishareInfo = !0, i.data.zhulishareInfo = t, 
            i.setData({
                zhulishareInfo: i.data.zhulishareInfo
            }));
        }), i.setData({
            activityStatus: i.data.activityStatus
        });
    }
});