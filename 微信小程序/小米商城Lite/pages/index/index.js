var e = require("../../util/util.js"), t = require("../../util/page.js"), i = require("../../util/tracker.js"), a = getApp();

Page({
    data: {
        header: [],
        sections: [],
        loaded: !1,
        imageSize: {},
        isAgent: !1
    },
    onShow: function(e) {
        var t = this;
        i.push(), 0 == this.data.sections.length && a.doLogin().then(function(e) {
            a.$http.post({
                url: "index/indexLogin"
            }).then(function(e) {
                if (0 == e.code) {
                    var i = e.data.index || {}, a = [], n = [];
                    i.header && i.header.body && (a = i.header.body.items), i.sections && (n = i.sections);
                    var o = e.data.page || {};
                    wx.stopPullDownRefresh(), t.setData({
                        header: a,
                        sections: n,
                        info: o.content || {},
                        loaded: !0
                    });
                }
            }), a.$http.post({
                url: "rebate/userRole"
            }).then(function(e) {
                if (0 == e.code) {
                    var i = e.data.userinfo;
                    t.setData({
                        isAgent: "1" === i.role
                    });
                }
            });
        });
    },
    onLoad: function(e) {
        var i = this;
        a.setMasid(e), Object.assign(i, t), wx.getLocation({
            type: "gcj02",
            success: function(e) {
                wx.setStorageSync("lat", e.latitude), wx.setStorageSync("lng", e.longitude);
            }
        });
    },
    onShareAppMessage: function() {
        return {
            title: "小米商城Lite",
            path: "/pages/index/index"
        };
    },
    onPullDownRefresh: function() {
        this.init(!0);
    },
    init: function() {
        var t = this;
        a.request("index/indexLogin", {}, function(i, a) {
            if (a) e.showError("服务异常请稍后再试,或下载小米商城APP"); else {
                var n = i.data.index || {}, o = [], s = [];
                n.header && n.header.body && (o = n.header.body.items).forEach(function(t) {
                    t.action.path = e.getBannerUrl(t.action);
                }), n.sections && (s = n.sections).forEach(function(t) {
                    t.body.items && t.body.items.forEach(function(t) {
                        t.action.path = e.getBannerUrl(t.action);
                    });
                });
                var r = i.data.page || {};
                wx.stopPullDownRefresh(), t.setData({
                    header: o,
                    sections: s,
                    info: r.content || {},
                    loaded: !0
                });
            }
        });
    },
    tagWidth: function(e) {
        var t = e.detail.width / 2, i = e.detail.height / 2, a = Math.round(36 * t / i), n = this.data.imageSize;
        n[e.target.dataset.index] = a, this.setData({
            imageSize: n
        });
    },
    getUserRole: function() {
        var e = this;
        a.request("rebate/userRole", {}, function(t, i) {
            if (!i) {
                var a = t.data.userinfo;
                e.setData({
                    isAgent: "1" === a.role
                });
            }
        });
    }
});