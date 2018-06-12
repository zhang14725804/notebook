var d = getApp(), t = require("../../../util/util.js");

Page({
    data: {
        loaded: !1,
        id: 0,
        hd_id: "",
        hd: {},
        list: [],
        group_name: ""
    },
    onLoad: function(d) {
        var t = this;
        t.setData({
            id: d.id,
            hd_id: d.hd_id,
            group_name: d.group_name
        }), t.init();
    },
    init: function() {
        var i = this;
        i.data.id, i.data.hd_id;
        d.doLogin().then(function(a) {
            d.request("groupshare/detail", a, function(d, a) {
                a ? t.showError(a.desc || "数据加载失败") : i.setData({
                    loaded: !0,
                    hd: d.data.hd,
                    list: d.data.list
                });
            });
        });
    }
});