var e = require("../../../util/util.js"), a = require("../../../util/page.js"), t = getApp();

Page({
    data: {
        info: {},
        share: {},
        page: ""
    },
    onLoad: function(e) {
        var r = this;
        Object.assign(r, a);
        var n = e.page;
        t.request("news/detail", {
            alias_key: n
        }, function(a, t) {
            if (t) wx.switchTab({
                url: "/pages/index/index"
            }); else {
                var o = e.shareChannel || "";
                "" != o && wx.setStorageSync("shareChannel", o);
                var i = a.data.content, s = i.page.redirectTo || {};
                s.url && ("switchTab" == s.open_type ? wx.switchTab({
                    url: s.url
                }) : wx.redirectTo({
                    url: s.url
                }));
                var u = i.page.title || {};
                u.bg_color && wx.setNavigationBarColor({
                    backgroundColor: u.bg_color,
                    frontColor: u.txt_color
                }), u.txt && wx.setNavigationBarTitle({
                    title: u.txt
                }), r.setData({
                    page: n,
                    info: i,
                    share: i.page && i.page.share ? i.page.share : {}
                }), r.updateProductPrice(i);
            }
        });
    },
    onShareAppMessage: function() {
        return this.data.share;
    },
    onPullDownRefresh: function() {
        var e = this, a = e.data.page;
        t.request("news/detail", {
            alias_key: a
        }, function(a, t) {
            var r = a.data.content;
            e.setData({
                info: r,
                share: r.page && r.page.share ? r.page.share : {}
            }), e.updateProductPrice(r), wx.stopPullDownRefresh();
        });
    },
    tapDraw: function(a) {
        e.showLoading();
        var t = a.target.dataset.param;
        this.draw(t);
    },
    draw: function(a) {
        t.request("draw/draw", {
            code: a
        }, function(a, t) {
            e.hideLoading(), t ? e.showError(t.desc || "服务异常请稍后再试,或下载小米商城APP") : e.showError(a.data);
        });
    },
    updateProductPrice: function(e) {
        var t = this, r = [], n = a.filterElementsWhichHavePropertyPrice(e);
        for (var o in n) r.push(n[o][0].productId);
        r.length && a.rebuildElements(r, n).then(function() {
            t.setData({
                info: e
            });
        }).catch(function() {
            t.setData({
                info: e
            });
        });
    }
});