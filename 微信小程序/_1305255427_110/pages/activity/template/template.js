function a(a) {
    return a && a.__esModule ? a : {
        default: a
    };
}

a(require("../../../utils/api.js"));

var t = a(require("../../../libs/lodash.core.min.js"));

a(require("../../../libs/es6-promise.min")), getApp();

Page({
    data: {
        piwikSource: "",
        activityInfo: {
            id: "",
            url: "",
            model: ""
        },
        zhulishareInfo: {},
        activityStatus: {
            zhulishareInfo: !1
        },
        resource: {
            zhulishareImage: "https://sr.aihuishou.com/activity/minapp/friendassistanceshare.png"
        }
    },
    onLoad: function(a) {
        var t = this;
        if ("" != a.url) {
            var i = decodeURIComponent(a.url);
            t.setData({
                "activityInfo.url": i
            });
        }
    },
    bindMessage: function(a) {
        var i = this;
        t.default.forEach(a.detail.data, function(a) {
            "help" == a.name && (i.data.activityStatus.zhulishareInfo = !0, i.data.zhulishareInfo = a, 
            i.setData({
                zhulishareInfo: i.data.zhulishareInfo
            }));
        }), i.setData({
            activityStatus: i.data.activityStatus
        });
    },
    onShareAppMessage: function() {
        var a = this, t = "", i = "", e = "";
        if (a.data.activityStatus.zhulishareInfo) {
            var s = a.data.zhulishareInfo;
            t = "轻松点一下，为我加个价！", i = "/pages/activity/friendAssistance/friendAssistance?url=" + encodeURIComponent(s.link), 
            e = a.data.resource.zhulishareImage, a.data.activityStatus.zhulishareInfo = !1;
        }
        return a.setData({
            activityStatus: a.data.activityStatus
        }), console.log("url", i), {
            title: t,
            path: "" == i ? "/pages/activity/template/template?url=" + encodeURIComponent(a.data.activityInfo.url) : i,
            imageUrl: e,
            success: function(a) {
                console.log("分享成功!", a);
            },
            fail: function(a) {
                console.log(a);
            }
        };
    }
});