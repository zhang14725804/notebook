function e(e, t, a) {
    return t in e ? Object.defineProperty(e, t, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = a, e;
}

var t, a = getApp(), i = require("../../utils/image.js");

require("../../utils/mfw_stat.js");

Page((t = {
    data: {
        bannerWidth: "100%",
        bannerHeight: "240px",
        isIphoneX: ""
    },
    onLoad: function(e) {
        var t = this, i = a.getPageParameter(e, "id") || 0;
        t.setData({
            id: i,
            previewImgs: [],
            showBackhomeIcon: getCurrentPages().length < 2
        }), t.getDetail();
    },
    onShow: function() {
        var e = this;
        wx.getSystemInfo({
            success: function(t) {
                ~t.model.indexOf("iPhone X") && e.setData({
                    isIphoneX: !0
                });
            }
        });
    },
    getDetail: function() {
        var e = this, t = e.data.id;
        wx.showNavigationBarLoading(), a.log(t, "detail request"), a.request({
            url: "/gonglve/sales/" + t + "?jsondata=" + JSON.stringify({
                data_style: "flat"
            }),
            success: function(n) {
                if (a.log(t, "detail success"), wx.setNavigationBarTitle({
                    title: n.title || ""
                }), i.bindPage(e, {
                    banner: {
                        url: n.img,
                        size: n.img_size
                    }
                }), e.setData(n), n.paragraphs) {
                    for (var r, s = [], o = 0, g = n.paragraphs.length; o < g; o++) "image" == n.paragraphs[o].type && (r = n.paragraphs[o].content) && s.push(r);
                    e.setData({
                        previewImgs: s
                    });
                }
                a.log(t, "image num:", e.data.previewImgs.length);
            },
            fail: function() {
                a.log(t, "detail error"), wx.showModal({
                    title: "",
                    content: "哎哟，加载失败了",
                    confirmText: "点击重试",
                    cancelText: "关闭",
                    confirmColor: "#ff9d00",
                    success: function(t) {
                        t.confirm && e.getDetail();
                    }
                });
            },
            complete: function() {
                a.log(t, "detail complete"), wx.hideNavigationBarLoading();
            }
        });
    },
    bindImgPreview: function(e) {
        var t = this, a = e.currentTarget.dataset;
        a.url && wx.previewImage({
            current: a.url,
            urls: t.data.previewImgs
        });
    },
    bindLinkApp: function(e) {
        var t = "detail?id=" + e.currentTarget.dataset.id;
        5 == getCurrentPages().length ? wx.redirectTo({
            url: t
        }) : wx.navigateTo({
            url: t
        });
    },
    onShareAppMessage: function() {
        var e = this;
        return {
            title: "我 邀请你一起来读",
            path: e.__route__ + "?id=" + e.data.id,
            desc: e.data.title || "快来看，这里有全世界最新最潮的旅游攻略"
        };
    }
}, e(t, "onShareAppMessage", function() {
    var e = this;
    return {
        title: e.data.title || "快来看，这里有全世界最新最潮的旅游攻略",
        path: e.__route__ + "?id=" + e.data.id,
        imageUrl: e.data.img
    };
}), e(t, "toIndex", function() {
    var e = this.data.place.id;
    e ? wx.navigateTo({
        url: "mdd?mddid=" + e + "&_num=1"
    }) : wx.navigateTo({
        url: "index"
    });
}), t));