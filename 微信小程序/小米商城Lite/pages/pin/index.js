var t = require("../../util/util.js"), o = require("../../util/tracker.js"), e = require("./common/index.js"), a = getApp();

Page({
    data: {
        loaded: !1,
        tabBar: 1,
        imageSize: [],
        shareTitle: "",
        shareImg: "",
        domReady: !1,
        elmsPos: [],
        winHeight: 0,
        hasBooked: !1,
        bookAction: "sub",
        bookInfo: null
    },
    onLoad: function(t) {
        var o = this;
        a.setMasid(t), o.init();
    },
    onShow: function() {
        o.push();
    },
    onReady: function() {
        var t = this;
        wx.canIUse("createSelectorQuery") && (t.setData({
            domReady: !0
        }), setTimeout(function() {
            t.getAllRects(0);
        }, 500));
    },
    onPageScroll: function(t) {
        this.data.domReady && this.getAllRects(t.scrollTop);
    },
    numStr: function(t) {
        return t >= 10 ? t : "0" + t;
    },
    getSurplusTime: function(t, o) {
        var e = o || new Date().getTime() / 1e3, a = (t || 0) - e;
        if (!(a <= 0)) {
            var i = void 0, n = void 0, s = void 0, r = void 0, c = void 0;
            return i = Math.floor(a % 60 % 1 * 10), n = Math.floor(a % 60), s = Math.floor(a / 60 % 60), 
            r = Math.floor(a / 3600 % 24), (c = Math.floor(a / 86400) > 0 ? Math.ceil(a / 86400) : 0) > 1 && (c = Math.floor(a / 86400), 
            r = Math.floor((a - 86400 * c) / 3600 % 24), s = Math.floor((a - 86400 * c - 3600 * r) / 60 % 60), 
            n = Math.floor((a - 86400 * c - 3600 * r - 60 * s) % 60), i = Math.floor((a - 86400 * c - 3600 * r - 60 * s - n) % 1 * 10)), 
            {
                d: this.numStr(c),
                h: this.numStr(r),
                m: this.numStr(s),
                s: this.numStr(n) + "." + i
            };
        }
    },
    init: function() {
        var o = this;
        a.request("groupon/home", {
            version: 3
        }, function(a, i) {
            if (i) return 10011003 == i.code ? void wx.switchTab({
                url: "/pages/index/index"
            }) : void t.showError("服务异常请稍后再试,或下载小米商城APP");
            a && a.data && a.data.section && a.data.section.length && a.data.section.forEach(function(t) {
                t && t.body && t.body.items && t.body.items.length && t.body.items.forEach(function(t) {
                    if (t && t.server_time && t.end_time) {
                        var e = t.server_time, a = t.end_time;
                        if (t.total_micro_second = 0, 0 != e && 0 != a) {
                            t.total_micro_second = 1e3 * (a - e);
                            var i = o.getSurplusTime(a, e);
                            i.d > 1 ? t.clock = "仅剩" + i.d + "天" + i.h + "小时" : 1 == i.d ? t.clock = "仅剩" + i.d + "天" : i.d < 1 && ("00" != i.h ? t.clock = "仅剩" + i.h + "小时" : "00" != i.m && (t.clock = "仅剩" + i.m + "分钟"), 
                            i.m < 1 && (t.clock = "仅剩1分钟"));
                        }
                    }
                });
            }), e.book({
                action: "query"
            }).then(function(t) {
                o.setData({
                    bookInfo: t,
                    loaded: !0,
                    sections: a.data.section,
                    shareTitle: a.data.share_words,
                    shareImg: a.data.share_img,
                    bookAction: 1 == t.status ? "unsub" : "sub"
                });
            }).catch(function(t) {
                o.setData({
                    loaded: !0,
                    sections: a.data.section,
                    shareTitle: a.data.share_words,
                    shareImg: a.data.share_img
                });
            });
        });
    },
    onShareAppMessage: function() {
        var t = this;
        return o.push({
            logCode: "wx#bid=3193118.2&page=pinhome",
            analyse: "tap",
            extra: {
                type: "home_share"
            }
        }), {
            title: t.data.shareTitle || "小米拼团，好而不贵",
            path: "/pages/pin/index?fromshare=1",
            imageUrl: t.data.shareImg
        };
    },
    tagWidth: function(t) {
        var o = t.detail.width / 2, e = t.detail.height / 2, a = Math.round(36 * o / e), i = this.data.imageSize;
        i[t.target.dataset.index] = a, this.setData({
            imageSize: i
        });
    },
    tapStat: function(t) {
        var e = t.currentTarget.dataset.logcode;
        o.push({
            logCode: e,
            analyse: "tap"
        });
    },
    getAllRects: function(t) {
        var o = this, e = wx.createSelectorQuery();
        o.data.elmsPos && o.data.elmsPos.length ? o.countElmShow(t) : e.selectAll(".pin-item").boundingClientRect(function(e) {
            o.setData({
                elmsPos: e
            }), wx.getSystemInfo({
                success: function(e) {
                    o.setData({
                        winHeight: e.windowHeight
                    }), o.countElmShow(t);
                }
            });
        }).exec();
    },
    countElmShow: function(t) {
        var e = this, a = e.data.elmsPos, i = e.data.winHeight;
        i && a && a.length && a.forEach(function(e) {
            i + t - 150 >= e.top && !e.isShow && (e.isShow = !0, o.push({
                analyse: "tap",
                logCode: "",
                extra: {
                    type: "sp",
                    log_codes: e.dataset.logcode || ""
                }
            }));
        });
    },
    bindTapSwiper: function(t) {
        var e = t.currentTarget.dataset.item;
        o.push({
            logCode: "wx#bid=3193118.1&page=pinhome",
            analyse: "tap"
        }), e.action.isTabBar ? wx.switchTab({
            url: e.action.path
        }) : wx.navigateTo({
            url: e.action.path
        });
    },
    toggleBook: function(t) {
        var o = this, a = (this.data.hasBooked, {
            bookInfo: this.data.bookInfo,
            action: this.data.bookAction
        });
        e.toggleBook(a).then(function(t) {
            t && (wx.showToast({
                title: "sub" == t.action ? "已开启订阅" : "已关闭订阅",
                icon: "none",
                duration: 2e3
            }), o.setData({
                bookInfo: t.bookInfo,
                bookAction: "sub" == t.action ? "unsub" : "sub"
            }));
        });
    },
    goMicard: function() {
        function o() {
            t.showLoading(), a.ssoLogin(!0, function() {
                t.hideLoading();
            });
        }
        a.storageData.vid;
        a.doLogin().then(function(e) {
            a.storageData.vid || "" ? o() : a.loginProxy({
                url: "https://s1.mi.com/pages/33853141e0873909be88f5c3e6144cc6/index.html",
                login: "m.mi.com"
            }, function(o, e) {
                e ? t.showError(e.desc) : o && o.location && (console.log(o.location), a.$router.navigateTo({
                    url: "/pages/webview/index?url=" + encodeURIComponent(o.location)
                }));
            });
        });
    }
});