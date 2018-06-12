var t = getApp(), i = require("../../../util/util.js");

Page({
    data: {
        loaded: !1,
        id: 0,
        group: {},
        user_list: null,
        user_num: 0
    },
    onLoad: function(t) {
        this.setData({
            id: t.id
        });
    },
    onShow: function() {
        this.init();
    },
    init: function() {
        var e = this;
        t.doLogin().then(function(s) {
            t.request("groupshare/groupdetail", {
                id: e.data.id
            }, function(t, s) {
                if (s) i.showError(s.desc || "数据加载失败"); else {
                    var u = t.data;
                    e.setData({
                        loaded: !0,
                        user_list: u.user_list,
                        user_num: u.user_list ? u.user_list.length : 0,
                        group: u.group
                    });
                }
            });
        });
    }
});