var e = getApp(), t = require("../../../../util/util.js");

Page({
    data: {
        can_use_share: !1,
        loaded: !1,
        id: 0,
        group: {},
        user_list: null,
        user_num: 0
    },
    onLoad: function(e) {
        this.setData({
            id: e.id
        });
    },
    onShow: function() {
        this.init();
    },
    init: function() {
        var a = this;
        e.doLogin().then(function(i) {
            e.request("groupshare/groupdetail", {
                id: a.data.id
            }, function(e, i) {
                if (i) t.showError(i.desc || "数据加载失败"); else {
                    var s = e.data;
                    a.setData({
                        loaded: !0,
                        user_list: s.user_list,
                        user_num: s.user_list ? s.user_list.length : 0,
                        group: s.group,
                        can_use_share: wx.canIUse("button.open-type.share")
                    }), wx.showShareMenu({
                        withShareTicket: !0
                    });
                }
            });
        });
    },
    onShareAppMessage: function() {
        var e = this;
        return {
            path: "/pages/groupshare/index?id=" + e.data.id,
            title: e.data.group.name,
            imageUrl: "http://i8.mifile.cn/b2c-mimall-media/b0f9c47c9a5fc3bba96b27dcced01c39.jpg"
        };
    }
});