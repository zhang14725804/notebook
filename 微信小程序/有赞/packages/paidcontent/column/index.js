!function(t) {
    function e(n) {
        if (a[n]) return a[n].exports;
        var i = global.installedModules[n] = a[n] = {
            i: n,
            l: !1,
            exports: {}
        };
        return t[n].call(i.exports, i, i.exports, e), i.l = !0, i.exports;
    }
    t = Object.assign(require("../../../commons.js").modules, t);
    var a = {};
    a = global.installedModules = global.installedModules || {}, e.m = t, e.c = a, e.d = function(t, a, n) {
        e.o(t, a) || Object.defineProperty(t, a, {
            configurable: !1,
            enumerable: !0,
            get: n
        });
    }, e.r = function(t) {
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
    }, e.n = function(t) {
        var a = t && t.__esModule ? function() {
            return t.default;
        } : function() {
            return t;
        };
        return e.d(a, "a", a), a;
    }, e.o = function(t, e) {
        return Object.prototype.hasOwnProperty.call(t, e);
    }, e.p = "", e(e.s = 163);
}({
    163: function(t, e, a) {
        var n, i = Object.assign || function(t) {
            for (var e = 1; e < arguments.length; e++) {
                var a = arguments[e];
                for (var n in a) Object.prototype.hasOwnProperty.call(a, n) && (t[n] = a[n]);
            }
            return t;
        }, o = (n = a(0)) && n.__esModule ? n : {
            default: n
        }, s = function(t) {
            if (t && t.__esModule) return t;
            var e = {};
            if (null != t) for (var a in t) Object.prototype.hasOwnProperty.call(t, a) && (e[a] = t[a]);
            return e.default = t, e;
        }(a(1)), r = a(17), c = a(44), l = a(4), u = getApp();
        (0, o.default)(s.Tab, {
            data: {
                alias: "",
                themeClass: u.themeClass,
                tab: {
                    list: [ {
                        id: "desc",
                        title: "简介"
                    }, {
                        id: "content",
                        title: "内容"
                    } ],
                    selectedId: "desc",
                    height: 45
                },
                total: 0,
                page: 1,
                picture: {
                    cover: ""
                },
                title: "",
                summary: "",
                previewContent: "",
                price: "",
                contentList: [],
                initLoad: !1,
                noMore: !1,
                listLoading: !1,
                fetched: !1,
                isSubscription: !1,
                $running: !1,
                windowHeight: 0
            },
            onLoad: function(t) {
                var e = t.alias || "";
                this.setData({
                    alias: e,
                    windowHeight: u.getSystemInfoSync().windowHeight
                }), this.fetchColumnData(e);
            },
            onShow: function() {
                this.setData({
                    copyright: u.globalData.copyright,
                    is_big_shop: u.globalData.is_big_shop
                }), wx.getStorageSync(r.REFRESH_KEY) && (wx.removeStorageSync(r.REFRESH_KEY), this.fetchColumnData(this.data.alias));
            },
            onPullDownRefresh: function() {
                this.fetchColumnData(this.data.alias, !0);
            },
            onPageScroll: function() {
                var t = this;
                "content" !== this.data.tab.selectedId || this.$running || this.data.noMore || (this.$running = !0, 
                setTimeout(function() {
                    t.checkPagination(), t.$running = !1;
                }, 400));
            },
            onShareAppMessage: function() {
                return l.page.processShareData({
                    title: this.data.title,
                    path: "packages/paidcontent/column/index?alias=" + this.data.alias,
                    imageUrl: this.data.picture.cover
                });
            },
            checkPagination: function() {
                var t = this;
                wx.createSelectorQuery().in(this).select("#content-list").boundingClientRect(function(e) {
                    e && e.bottom < t.data.windowHeight + 200 && t.fetchContentList();
                }).exec();
            },
            fetchColumnData: function(t, e) {
                var a = this;
                u.carmen({
                    method: "POST",
                    api: "youzan.owl.column.detail/1.0.0/get",
                    data: {
                        alias: t
                    },
                    success: function(t) {
                        if (wx.setNavigationBarTitle({
                            title: t.title || ""
                        }), !t.alias) return wx.showToast({
                            title: "专栏不存在",
                            icon: "none"
                        });
                        a.setData(i({
                            fetched: !0
                        }, a.parseColumnData(t), {
                            "tab.selectedId": t.isSubscription ? "content" : "desc"
                        })), t.isSubscription && a.fetchContentList();
                    },
                    fail: function() {
                        wx.showToast({
                            title: "获取专栏详情失败",
                            icon: "none"
                        });
                    },
                    complete: function() {
                        e && wx.stopPullDownRefresh();
                    }
                });
            },
            fetchContentList: function() {
                var t = this;
                !this.data.alias || this.data.noMore || this.data.listLoading || (this.setData({
                    listLoading: !0
                }), u.carmen({
                    method: "POST",
                    api: "youzan.owl.content/1.0.0/search",
                    data: {
                        alias: this.data.alias,
                        page: this.data.page,
                        page_size: 15
                    },
                    success: function(e) {
                        var a = {};
                        (e.list || []).length < 15 && (a.noMore = !0), t.setData(i({}, a, {
                            initLoad: !0,
                            total: e.total,
                            page: t.data.page + 1,
                            contentList: t.data.contentList.concat(t.parseContentListData(e.list || []))
                        }));
                    },
                    fail: function() {
                        wx.showToast({
                            title: "获取专栏内容列表失败",
                            icon: "none"
                        });
                    },
                    complete: function() {
                        t.setData({
                            listLoading: !1
                        });
                    }
                }));
            },
            parseColumnData: function(t) {
                return c.wxParse("richPreviewContent", "html", t.previewContent || "", this), i({}, t, {
                    price: (0, r.parsePrice)(t.price)
                });
            },
            parseContentListData: function(t) {
                return t.map(function(t) {
                    return i({}, t, {
                        createdTime: (0, r.parseTime)(t.createdAt),
                        subCount: t.subscriptionsCount
                    });
                });
            },
            isContentHasTrial: function(t) {
                return 1 === t.mediaType ? !!t.preview : 2 === t.mediaType ? t.audio && !!t.audio.audioPreviewUrl : 3 === t.mediaType && t.video && !!t.video.videoPreviewUrl;
            },
            handleZanTabChange: function(t) {
                var e = t.selectedId;
                this.setData({
                    "tab.selectedId": e
                }), "content" !== e || this.data.initLoad || this.fetchContentList();
            },
            buyColumn: function() {
                this.data.alias && wx.navigateTo({
                    url: "/packages/paidcontent/pay/index?alias=" + this.data.alias + "&type=column"
                });
            }
        });
    }
});