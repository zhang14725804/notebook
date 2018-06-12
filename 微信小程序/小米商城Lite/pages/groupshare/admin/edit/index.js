var i = getApp(), a = require("../../../../util/util.js");

Page({
    data: {
        info: {},
        loaded: !1,
        id: 0,
        uid: 0,
        group_name: ""
    },
    onLoad: function(i) {
        var a = this;
        a.setData({
            id: i.id,
            group_name: i.group_name,
            uid: i.uid
        }), a.init();
    },
    init: function() {
        i.doLogin().then(function(i) {});
    },
    bindEditGroup: function(n) {
        var t = this, d = n.detail.value;
        a.showLoading(), i.request("groupshare/altergroup", {
            id: t.data.id,
            group_name: d.group_name,
            uid: d.uid
        }, function(i, n) {
            a.hideLoading(), n ? a.showError(n.desc || "数据加载失败") : wx.navigateBack({
                delta: 1
            });
        });
    }
});