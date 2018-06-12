var t = getApp(), e = require("../../utils/image.js"), a = (require("../../utils/mfw_stat.js"), 
0);

Page({
    data: {
        bannerWidth: "100%",
        bannerHeight: "240px",
        floorstatus: !0,
        goApp: !1,
        isIphoneX: ""
    },
    goTop: function(t) {
        wx.pageScrollTo({
            scrollTop: 0
        }), this.setData({
            floorstatus: !0
        });
    },
    onPageScroll: function(e) {
        t.log(a), e.scrollTop > a ? !0 === this.data.floorstatus && this.setData({
            floorstatus: !0
        }) : !1 === this.data.floorstatus && this.setData({
            floorstatus: !0
        }), a = e.scrollTop;
    },
    onLoad: function(e) {
        var a = this, o = t.getPageParameter(e, "id") || 0;
        a.setData({
            id: o,
            previewImgs: [],
            showBackhomeIcon: getCurrentPages().length < 2
        }), a.getDetail();
    },
    onShow: function(t) {
        var e = this;
        wx.getSystemInfo({
            success: function(t) {
                console.log(t), ~t.model.indexOf("iPhone X") && e.setData({
                    isIphoneX: !0
                });
            }
        }), e.setData({
            from_app: wx.getStorageSync("__from_app")
        });
    },
    placeClick: function(t) {
        var e = "/pages/gonglve/mdd?mddid=" + t.currentTarget.dataset.id;
        wx.navigateTo({
            url: e
        });
    },
    getDetail: function() {
        var a = this, o = a.data.id;
        wx.showNavigationBarLoading(), t.log(o, "detail request"), t.request({
            url: "/note/item/" + o,
            success: function(i) {
                if (t.log(o, "detail success"), wx.setNavigationBarTitle({
                    title: i.title || ""
                }), e.bindPage(a, {
                    banner: {
                        url: i.cover.url,
                        size: {
                            width: i.cover.width,
                            height: i.cover.height
                        }
                    }
                }), a.setData(i), i.content) {
                    for (var n, r = [], s = 0, l = i.content.length; s < l; s++) "image" == i.content[s].type && (n = i.content[s].content.retina_imgurl) && r.push(n);
                    a.setData({
                        previewImgs: r
                    });
                }
                t.log(o, "image num:", a.data.previewImgs.length);
            },
            fail: function() {
                t.log(o, "detail error"), wx.showModal({
                    title: "",
                    content: "哎哟，加载失败了",
                    confirmText: "点击重试",
                    cancelText: "关闭",
                    confirmColor: "#ff9d00",
                    success: function(t) {
                        t.confirm && a.getDetail();
                    }
                });
            },
            complete: function() {
                t.log(o, "detail complete"), wx.hideNavigationBarLoading();
            }
        });
    },
    bindImgPreview: function(t) {
        var e = this, a = t.currentTarget.dataset;
        a.url && wx.previewImage({
            current: a.url,
            urls: e.data.previewImgs
        });
    },
    bindLinkApp: function(t) {
        var e = "detail?id=" + t.currentTarget.dataset.id;
        5 == getCurrentPages().length ? wx.redirectTo({
            url: e
        }) : wx.navigateTo({
            url: e
        });
    },
    onShareAppMessage: function() {
        var t = this;
        return console.log(t.data), {
            title: t.data.title || "快来看，这里有全世界最新最潮的旅游攻略",
            path: t.__route__ + "?id=" + t.data.id,
            imageUrl: t.data.cover.share_url
        };
    },
    toIndex: function() {
        var t = this.data.place.id;
        t ? wx.navigateTo({
            url: "../gonglve/mdd?mddid=" + t + "&_num=2"
        }) : wx.navigateTo({
            url: "../gonglve/index"
        });
    },
    launchAppError: function(t) {}
});