var t = getApp();

Component({
    properties: {
        shopId: {
            type: String
        }
    },
    data: {
        top: t.globalData.systemInfo.windowHeight - 140,
        left: t.globalData.systemInfo.windowWidth - 60
    },
    methods: {
        move: function(o) {
            var a = o.touches[0].clientY - 30, e = o.touches[0].clientX - 30, i = t.globalData.systemInfo.windowWidth, n = t.globalData.systemInfo.windowHeight;
            this.setData({
                top: a < 0 ? 0 : a > n - 60 ? n - 60 : a,
                left: e < 0 ? 0 : e > i - 60 ? i - 60 : e
            });
        },
        click: function() {
            wx.navigateTo({
                url: "../activityH5/activityH5"
            });
        }
    }
});