function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

t(require("../../../utils/api.js")), t(require("../../../utils/wxDiscode.js"));

var a = t(require("../../../libs/lodash.core.min.js"));

require("../../../utils/util.js"), t(require("../../../libs/es6-promise.min"));

Page({
    data: {
        zhulishareInfo: {},
        activityStatus: {
            zhulishareInfo: !1
        },
        resource: {
            zhulishareImage: "https://sr.aihuishou.com/activity/minapp/friendassistanceshare.png"
        }
    },
    onLoad: function(t) {},
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {
        var t = this, a = "", i = "", e = "";
        if (t.data.activityStatus.zhulishareInfo) {
            var s = t.data.zhulishareInfo;
            a = "轻松点一下，为我加个价！", i = "/pages/activity/friendAssistance/friendAssistance?url=" + encodeURIComponent(s.link), 
            e = t.data.resource.zhulishareImage, t.data.activityStatus.zhulishareInfo = !1;
        }
        return t.setData({
            activityStatus: t.data.activityStatus
        }), console.log("url", i), {
            title: a,
            path: i,
            imageUrl: e,
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