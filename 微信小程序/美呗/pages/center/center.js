var n = getApp(), a = require("../../utils/util.js");

Page(function(n, a, e) {
    return a in n ? Object.defineProperty(n, a, {
        value: e,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : n[a] = e, n;
}({
    data: {
        isLogin: !1,
        nickname: "未登录",
        headImage: "https://cdn-ssl.meb.com/wxa/v1/default-avatar.png"
    },
    onShow: function() {
        n.globalData.authToken && this.setData({
            isLogin: !0,
            nickname: n.globalData.userInfo.nickname,
            headImage: n.globalData.userInfo.headImage
        });
    },
    onLoad: function(n) {},
    onReady: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    goLogin: function() {
        wx.navigateTo({
            url: "../signIn/index"
        });
    },
    logout: function() {
        a.storage.remove("token"), a.storage.remove("userinfo"), n.globalData.authToken = "", 
        n.globalData.userInfo = {}, this.setData({
            isLogin: !1,
            nickname: "未登录",
            headImage: "https://cdn-ssl.meb.com/wxa/v1/default-avatar.png"
        });
    }
}, "onShareAppMessage", function(n) {
    return {
        title: "美呗",
        path: "/pages/index/index"
    };
}));