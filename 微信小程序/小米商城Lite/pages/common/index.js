Page({
    data: {},
    onLoad: function(n) {},
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    tapGoBack: function() {
        wx.switchTab({
            url: "/pages/index/index"
        });
    }
});