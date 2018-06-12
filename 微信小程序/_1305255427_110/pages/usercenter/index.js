var e = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../utils/api.js")), t = getApp();

Page({
    data: {
        userInfo: {
            avatarUrl: "https://aihuishou-internal.oss-cn-hangzhou.aliyuncs.com/miniapps/earth/avatar.png",
            mobile: ""
        },
        urlObj: {
            setting: "../activity/private/private?url=" + encodeURIComponent("https://m.aihuishou.com/m/index.html#/account/accountcenter?utm_source=miniprog_activity&utm_medium=miniprogme&utm_campaign=accountcenter"),
            order: "../activity/private/private?url=" + encodeURIComponent("https://m.aihuishou.com/m/index.html#/user/orderlist?utm_source=miniprog_activity&utm_medium=miniprogme&utm_campaign=orderlist"),
            wallet: "../activity/private/private?url=" + encodeURIComponent("https://m.aihuishou.com/m/index.html#/account/wallet?utm_source=miniprog_activity&utm_medium=miniprogme&utm_campaign=wallet"),
            help: "../activity/private/private?url=" + encodeURIComponent("https://m.aihuishou.com/m/index.html#/help/indexnew?utm_source=miniprog_activity&utm_medium=miniprogme&utm_campaign=help")
        },
        activity: {},
        isIphoneX: !1,
        piwikSource: ""
    },
    onLoad: function(i) {
        var n = this;
        t.fetch(e.default.fetchUser, {}, function(e, i, a) {
            if (i.data) {
                var o = i.data, r = o.mobileLoginToken, u = o.mobile;
                t.saveCache("userLoginInfo", {
                    token: r,
                    mobile: u
                }), u = u.substr(0, 3) + "****" + u.substr(7), n.setData({
                    "userInfo.mobile": u
                });
            } else console.log("未登录"), wx.redirectTo({
                url: "./login"
            });
        }), wx.getUserInfo({
            success: function(e) {
                var t = e.userInfo.avatarUrl;
                t && t.length && n.setData({
                    "userInfo.avatarUrl": t
                });
            },
            fail: function() {}
        }), wx.getSystemInfo({
            success: function(e) {
                console.log(e), e.model && "string" == typeof e.model && e.model.includes("iPhone X") && n.setData({
                    isIphoneX: !0
                });
            },
            fail: function(e) {
                console.log("获取手机信息失败");
            }
        }), t.fetch(e.default.getUserCenterActivity, {}, function(e, t, i) {
            if (0 == t.code && t.data && t.data.length) {
                var a = "", o = t.data[0], r = o.url, u = o.imgUrl, c = o.name;
                a = r.indexOf("pages") > 0 ? r : "../activity/private/private?url=" + encodeURIComponent(r), 
                n.setData({
                    activity: {
                        url: a,
                        imgUrl: u,
                        name: c
                    }
                });
            }
        });
    },
    handleToMoon: function() {
        wx.navigateToMiniProgram({
            appId: "wx1d0bf756d8c83d75",
            success: function(e) {}
        });
    },
    handleToNavigate: function(e) {
        wx.navigateTo({
            url: "../index/index"
        });
    },
    handleToRedirect: function(e) {
        wx.redirectTo({
            url: "./index"
        });
    }
});