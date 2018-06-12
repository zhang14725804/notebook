getApp();

Page({
    data: {
        noResult: "../../resource/images/detail/no-result.png"
    },
    onLoad: function(e) {
        wx.setNavigationBarTitle({
            title: e.name
        });
    },
    handleTryAgain: function(e) {
        wx.navigateBack({});
    },
    handleBackHome: function(e) {
        wx.redirectTo({
            url: "../index/index"
        });
    }
});