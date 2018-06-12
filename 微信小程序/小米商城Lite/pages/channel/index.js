var e = require("../../util/util.js"), t = require("../../util/page.js"), a = require("../../util/tracker.js"), i = getApp();

Page({
    data: {
        page_type: "channel",
        page_id: 0,
        page_title: "",
        header: [],
        sections: [],
        loaded: !1,
        imageSize: {},
        now: 0,
        shareData: {}
    },
    pageTitle: "",
    onShow: function(e) {
        a.push();
    },
    onLoad: function(e) {
        var a = this;
        i.setMasid(e), Object.assign(a, t), this.setData({
            page_id: e.page_id
        }), "" != e.page_title && (e.page_title && (this.pageTitle = e.page_title), 5728 == e.page_id && (wx.setNavigationBarTitle({
            title: "小米眼镜节"
        }), a.setData({
            page_title: "小米眼镜节"
        })));
        var s = e.shareChannel || "";
        "" != s && wx.setStorageSync("shareChannel", s), i.doLogin().then(function(e) {
            a.init();
        });
    },
    onShareAppMessage: function() {
        var e = this.data.shareData.title ? this.data.shareData.title : this.pageTitle || "小米商城Lite", t = "/pages/channel/index?page_id=" + this.data.page_id + "&page_title=" + this.data.page_title;
        return this.data.shareData.img_url ? {
            title: e,
            path: t,
            imageUrl: this.data.shareData.img_url
        } : {
            title: e,
            path: t
        };
    },
    onPullDownRefresh: function() {
        this.init(!0), wx.stopPullDownRefresh();
    },
    init: function() {
        var t = this;
        i.request("index/page", {
            page_id: t.data.page_id,
            page_type: t.data.page_type
        }, function(a, i) {
            if (i) wx.switchTab({
                url: "/pages/index/index"
            }); else {
                var s = a.data.index || {}, n = [], r = [];
                s.header && s.header.body && (n = s.header.body.items), s.sections && (r = s.sections).forEach(function(t) {
                    t.body.items && t.body.items.forEach(function(t) {
                        t.action.path = e.getBannerUrl(t.action);
                    });
                }), s.setup && (t.pageTitle = s.setup.page_title ? s.setup.page_title : t.pageTitle, 
                wx.setNavigationBarColor({
                    frontColor: "#000000" == s.setup.header_text_color ? "#000000" : "#ffffff",
                    backgroundColor: s.setup.header_color || "#ffffff"
                })), t.pageTitle && 5728 != t.data.page_id && wx.setNavigationBarTitle({
                    title: t.pageTitle
                }), t.setData({
                    header: n,
                    sections: r,
                    now: a.data.now || 0,
                    page_title: t.pageTitle,
                    shareData: s.share_cfg ? s.share_cfg.mini_program : {},
                    loaded: !0
                });
            }
        });
    },
    tagWidth: function(e) {
        var t = e.detail.width / 2, a = e.detail.height / 2, i = Math.round(36 * t / a), s = this.data.imageSize;
        s[e.target.dataset.index] = i, this.setData({
            imageSize: s
        });
    }
});