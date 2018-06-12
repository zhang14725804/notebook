var a = getApp(), t = a.loginSdk, n = 0;

Page({
    data: {
        backUrl: ""
    },
    jump: function(a) {
        a ? wx.redirectTo({
            url: decodeURIComponent(a)
        }) : 3 !== n && (getCurrentPages() > 1 ? wx.navigateBack() : wx.reLaunch({
            url: "/index/pages/mt/mt"
        }));
    },
    onLoad: function(a) {
        n = 1, t.destroySession();
        var e = a.backUrl, o = void 0 === e ? "" : e;
        this.setData({
            backUrl: o
        });
    },
    onShow: function() {
        var e = this;
        n = 2, t.authState.session ? wx.navigateBack() : a.login().then(function() {
            a.globalData.token && e.jump(e.data.backUrl);
        });
    },
    onHide: function() {
        n = 3;
    }
});