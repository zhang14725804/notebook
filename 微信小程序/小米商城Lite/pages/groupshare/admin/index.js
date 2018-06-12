var e = getApp(), a = require("../../../util/util.js");

Page({
    data: {
        can_use_share: !1,
        loaded: !1,
        id: 0,
        name: ""
    },
    onShow: function() {
        this.init();
    },
    init: function() {
        var t = this;
        e.doLogin().then(function(n) {
            e.request("groupshare/listgroup", {}, function(e, n) {
                if (n) a.showError(n.desc || "数据加载失败"); else {
                    var i = e.data;
                    i.sort(function(e, a) {
                        return a.cnt - e.cnt;
                    }), t.setData({
                        list: i,
                        can_use_share: wx.canIUse("button.open-type.share")
                    }), wx.hideShareMenu();
                }
            });
        });
    },
    bindShare: function(e) {
        var a = this, t = e.currentTarget.dataset.id, n = e.currentTarget.dataset.name;
        a.setData({
            id: t,
            name: n
        }), wx.showShareMenu({
            withShareTicket: !0
        });
    },
    bindCreate: function() {
        wx.navigateTo({
            url: "/pages/hd/group-share/admin/create"
        });
    },
    onShareAppMessage: function() {
        var e = this;
        return {
            path: "/pages/groupshare/index?id=" + e.data.id,
            title: e.data.name,
            imageUrl: "http://i8.mifile.cn/b2c-mimall-media/b0f9c47c9a5fc3bba96b27dcced01c39.jpg",
            success: function(a) {
                wx.hideShareMenu(), e.setData({
                    id: 0
                });
            }
        };
    },
    cancelShare: function(e) {
        this.setData({
            id: 0
        });
    }
});