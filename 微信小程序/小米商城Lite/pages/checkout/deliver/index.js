var t = require("../../../util/tracker.js"), e = getApp();

Page({
    onShow: function() {
        t.push();
    },
    onLoad: function() {
        var t = this;
        e.doLogin().then(function(e) {
            t.setData({
                deliver_list: wx.getStorageSync("checkout:deliver")
            });
        });
    },
    tapChecked: function(t) {
        var e = t.currentTarget.dataset.index, a = this.data.deliver_list.concat([]);
        a.forEach(function(t, a) {
            t.checked = a === e;
        }), this.setData({
            deliver_list: a
        }), wx.setStorageSync("checkout:deliver", a), wx.navigateBack({
            delta: 1
        });
    }
});