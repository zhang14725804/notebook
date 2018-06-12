var i = getApp(), e = require("../../../../util/util.js");

Page({
    data: {
        info: {},
        loaded: !1
    },
    onLoad: function(i) {
        this.init();
    },
    init: function(e, n) {
        i.doLogin().then(function(i) {});
    },
    bindCreateGroup: function(n) {
        var t = n.detail.value;
        e.showLoading(), i.request("groupshare/create", {
            group_name: t.group_name,
            uid: t.uid
        }, function(i, n) {
            e.hideLoading(), n ? e.showError(n.desc || "数据加载失败") : wx.navigateBack({
                delta: 1
            });
        });
    }
});