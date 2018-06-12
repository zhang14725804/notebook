var e = require("../../module/page"), t = require("../../module/globalData"), a = [ {
    key: "notSkipHeadTail",
    type: "boolean",
    text: "自动跳过片头片尾",
    defaults: !1,
    reverse: !0
} ];

e("settings", {
    data: {
        storageSize: 0,
        notSkipHeadTail: !1
    },
    onLoad: function() {
        var e = a;
        e.forEach(function(e) {
            switch (e.type) {
              case "boolean":
                e.value = !!t.get(e.key);
            }
        }), this.setData({
            configs: e
        });
    },
    onShow: function() {
        var e = this;
        wx.getStorageInfo({
            success: function(t) {
                t.currentSize < 5 && (t.currentSize = 0), e.setData({
                    storageSize: t.currentSize
                });
            }
        });
    },
    onClearCache: function() {
        var e = this;
        try {
            wx.clearStorage({
                success: function(t) {
                    wx.showToast({
                        title: "清理成功",
                        icon: "success",
                        duration: 2e3
                    }), e.setData({
                        storageSize: 0
                    });
                }
            });
        } catch (e) {}
    },
    switchBooleanConfig: function(e) {
        var a = e.currentTarget.dataset.key, o = null;
        this.data.configs.forEach(function(e) {
            e.key == a && (e.value = !e.value, o = e.value);
        }), null !== o && (this.setData({
            configs: this.data.configs
        }), t.set(a, o));
    }
});