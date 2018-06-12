Page({
    data: {
        url: ""
    },
    onLoad: function(n) {
        this.setData({
            url: decodeURIComponent(n.url)
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {}
});