Page({
    data: {
        isSupportedOpenSetting: !1
    },
    onLoad: function(t) {
        wx.openSetting && this.setData({
            isSupportedOpenSetting: !0
        });
    },
    authorize: function() {
        wx.openSetting({
            success: function(t) {
                t.authSetting["scope.userInfo"] && wx.navigateBack({
                    delta: 1
                });
            }
        });
    }
});