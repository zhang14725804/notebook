var t = require("../../util/util.js"), a = require("../../util/tracker.js"), e = getApp();

Page({
    data: {
        list: [],
        cate_list: [],
        loaded: !1,
        toView: "",
        cate_id: 0
    },
    onShow: function(t) {
        a.push();
    },
    onLoad: function(a) {
        var i = this;
        e.request("cate/index", {}, function(e, r) {
            if (r) t.showError("服务异常请稍后再试,或下载小米商城APP"); else {
                var o = [], c = 0;
                for (var d in e.data) {
                    var s = e.data[d], l = c, n = s.category_id;
                    for (var _ in s.category_list) {
                        var u = s.category_list[_];
                        if ("category_title" == u.view_type) c += 60; else if ("category_group" == u.view_type) {
                            var v = u.body.items.length;
                            c += 92 * Math.ceil(v / 3);
                        }
                    }
                    l != c && o.push({
                        cateId: n,
                        fromTop: l,
                        endTop: c - 1
                    });
                }
                a.cateId ? i.setData({
                    list: e.data,
                    cate_list: o,
                    toView: "cate_" + a.cateId,
                    cate_id: a.cateId,
                    loaded: !0
                }) : i.setData({
                    list: e.data,
                    cate_list: o,
                    cate_id: o[0].cateId,
                    loaded: !0
                });
            }
        });
    },
    tapItem: function(a) {
        var i = a.currentTarget.dataset.cat, r = t.getBannerUrl(i.action);
        "cate" == i.action.type ? r += "&title=" + i.product_name : r += "&posID=10", e.$router.goTo(r);
    },
    anchor: function(t) {
        var a = t.target.dataset.anchor;
        this.setData({
            toView: "cate_" + a,
            cate_id: a
        });
    },
    scroll: function(t) {
        var a = this, e = t.detail.scrollTop;
        for (var i in a.data.cate_list) {
            var r = a.data.cate_list[i];
            if (e >= r.fromTop && e <= r.endTop) return void a.setData({
                cate_id: r.cateId
            });
        }
    },
    scrollbottom: function() {
        var t = this;
        t.setData({
            cate_id: t.data.cate_list[t.data.cate_list.length - 1].cateId
        });
    }
});