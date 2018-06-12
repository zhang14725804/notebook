!function() {
    require("./../../../common.js"), wx.webpackJsonp.apply(null, arguments);
}([ 8 ], {
    246: function(e, t, a) {
        function o(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        var s, i = o(a(2)), n = o(a(7)), r = o(a(1)), d = o(a(63)), c = a(247), l = a(248), u = getApp(), g = {
            goodsView: {
                fetch: c.getViewedGoods,
                parse: "parseGoods"
            },
            goodsBought: {
                fetch: c.getBoughtGoods,
                parse: "parseGoods"
            },
            goodsCollected: {
                fetch: c.getCollectedGoods,
                parse: "parseGoods"
            },
            storeNew: {
                fetch: c.getNewStores,
                parse: "parseStores"
            },
            storeView: {
                fetch: c.getViewedStores,
                parse: "parseStores"
            },
            storeBought: {
                fetch: c.getBoughtStores,
                parse: "parseStores"
            },
            storeCollected: {
                fetch: c.getCollectedStores,
                parse: "parseStores"
            }
        }, h = {
            goodsView: "page",
            goodsBought: "max_id",
            goodsCollected: "max_id",
            storeView: "page",
            storeBought: "max_id",
            storeCollected: "max_id",
            storeNew: "page"
        }, p = {
            store: "店铺",
            goods: "商品"
        }, f = !1;
        (0, r.default)({
            data: {
                loading: !1,
                curView: "store",
                selectorText: "店铺",
                showSelectorPopup: !1,
                curTab: {},
                storeTabs: {
                    selectedId: "storeView",
                    bannerName: "shopscan",
                    list: [ {
                        id: "storeView",
                        title: "浏览"
                    }, {
                        id: "storeBought",
                        title: "买过"
                    }, {
                        id: "storeCollected",
                        title: "收藏"
                    }, {
                        id: "storeNew",
                        title: "发现新店"
                    } ]
                },
                goodsTabs: {
                    selectedId: "goodsView",
                    bannerName: "goodsscan",
                    list: [ {
                        id: "goodsView",
                        title: "浏览"
                    }, {
                        id: "goodsBought",
                        title: "买过"
                    }, {
                        id: "goodsCollected",
                        title: "收藏"
                    } ]
                },
                curData: {},
                goodsView: {
                    page: 1,
                    data: [],
                    bannerName: "goodsscan",
                    logName: "goods_view"
                },
                goodsBought: {
                    max_id: 1,
                    data: [],
                    bannerName: "goodsbuy",
                    logName: "goods_buy"
                },
                goodsCollected: {
                    max_id: 1,
                    data: [],
                    bannerName: "goodscollect",
                    logName: "goods_collect"
                },
                storeNew: {
                    page: 1,
                    data: [],
                    bannerName: "shopnew",
                    logName: "shop_new"
                },
                storeView: {
                    page: 1,
                    data: [],
                    bannerName: "shopscan",
                    logName: "shop_view"
                },
                storeBought: {
                    max_id: 0,
                    data: [],
                    bannerName: "shopbuy",
                    logName: "shop_buy"
                },
                storeCollected: {
                    max_id: 0,
                    data: [],
                    bannerName: "shopcollect",
                    logName: "shop_collect"
                },
                scrollTop: "",
                is_collection: !1,
                emptyTip: ""
            },
            onLoad: function() {
                var e = this.getSelectedTab().selectedId, t = this.getRequestParams(e);
                this.fetchDataByType(e, t), this.setData({
                    curTab: this.data[this.data.curView + "Tabs"]
                });
            },
            onSelectorClick: function() {
                var e = this.data.showSelectorPopup;
                this.setData({
                    showSelectorPopup: !e
                });
            },
            onSelectorChange: function(e) {
                var t = e.target.dataset.selector, a = this.getSelectedTab(t), o = t + "View", s = this.data[o], i = s.finished, r = s.data, d = s.bannerName;
                this.setData({
                    scrollTop: 0,
                    curView: t,
                    selectorText: p[t],
                    showSelectorPopup: !1,
                    curData: {
                        data: r,
                        finished: i
                    },
                    curTab: (0, n.default)({}, a, {
                        selectedId: o,
                        bannerName: d
                    })
                }), i || 0 !== r.length || this.fetchDataByType(o, this.getRequestParams(o));
            },
            onTabChange: function(e) {
                var t, a = e.detail.selectedId, o = this.data.curView, n = this.data[a], r = n.finished, d = (n.data, 
                n.bannerName);
                s && s.abort();
                var c = (0, i.default)({}, this.data[a], {
                    data: [],
                    page: 1,
                    max_id: 0
                });
                this.setData((t = {
                    scrollTop: 0
                }, t[a] = c, t.curData = {
                    data: [],
                    finished: r
                }, t["curTab.selectedId"] = a, t["curTab.bannerName"] = d, t[o + "Tabs.selectedId"] = a, 
                t)), this.fetchDataByType(a, this.getRequestParams(a));
            },
            onLoadMore: function() {
                var e = this.getSelectedTab().selectedId;
                !this.data[e].finished && f && (f = !1, this.fetchDataByType(e, this.getRequestParams(e)));
            },
            onActionClick: function(e) {
                var t = this, a = e.target.dataset, o = a.kdtId, s = a.index, i = this.data.curData, n = i.data, r = i.finished, d = n[s];
                "已收藏" === n[s].actionText ? (0, c.removeStoreToFav)({
                    data: {
                        kdt_id: o
                    },
                    success: function() {
                        d.actionText = "收藏", n.splice(s, 1, d), t.setData({
                            curData: {
                                data: n,
                                finished: r
                            }
                        }), wx.showToast({
                            title: "取消收藏成功",
                            icon: "success",
                            duration: 2e3
                        });
                    },
                    fail: function() {
                        wx.showToast({
                            title: "取消收藏失败",
                            icon: "success",
                            duration: 2e3
                        });
                    }
                }) : (u.logger.log({
                    et: "click",
                    ei: "collect_shop",
                    en: "收藏店铺",
                    params: {
                        kdt_id: o
                    }
                }), (0, c.addStoreToFav)({
                    data: {
                        kdt_id: o
                    },
                    success: function() {
                        d.actionText = "已收藏", n.splice(s, 1, d), t.setData({
                            curData: {
                                data: n,
                                finished: r
                            }
                        }), wx.showToast({
                            title: "收藏成功",
                            icon: "success",
                            duration: 2e3
                        });
                    },
                    fail: function() {
                        wx.showToast({
                            title: "收藏失败",
                            icon: "success",
                            duration: 2e3
                        });
                    }
                }));
            },
            fetchDataByType: function(e, t) {
                var a = this;
                u.logger.log({
                    et: "click",
                    ei: "open_like_tab",
                    en: "打开喜欢页栏位",
                    params: {
                        title: this.data[e].logName
                    }
                });
                var o = g[e], i = o.fetch, n = o.parse, r = this;
                this.setData({
                    loading: !0
                }), s = i({
                    data: t,
                    success: function(t) {
                        r[n](t, e);
                    },
                    complete: function() {
                        s = null, f = !0, a.setData({
                            loading: !1,
                            emptyTip: l.config.EMPTY_TIP[e] || ""
                        });
                    }
                });
            },
            getSelectedTab: function(e) {
                return this.data[(e || this.data.curView) + "Tabs"];
            },
            linkStore: function(e) {
                var t = this.getSelectedTab().selectedId, a = e.currentTarget.dataset, o = a.url, s = a.index;
                if ("storeNew" !== t) {
                    var i = o + "&banner_id=like~" + this.data.curTab.bannerName + "~" + (s + 1);
                    wx.navigateTo({
                        url: i
                    });
                }
            },
            getRequestParams: function(e) {
                var t, a = h[e];
                return t = {}, t[a] = this.data[e][a], t;
            },
            parseStores: function(e, t) {
                var a, o, s = this, i = function(e) {
                    return e.team_name || e.shop_name;
                }, n = function(e) {
                    return (0, d.default)(e.pic_url || e.image_url, "!200x200.jpg");
                }, r = function(e) {
                    return e.goods_list || e.goods;
                }, c = function(e) {
                    return e.goodsTotal;
                }, l = "page" === h[t], u = e.list.map(function(e) {
                    var a, o = e.kdt_id, d = (e.team_name, e.is_join_deposit), l = e.is_collected, u = (e.logo, 
                    e.certification), g = s.parseActionData(t, l, o), h = g.actionText, p = g.actionUrl, f = g.actionCollection;
                    return u && (a = s.parseCertification(+u.type, d)), {
                        id: e.kdt_id,
                        logo: e.logo,
                        name: i(e),
                        totalGoods: c(e),
                        actionText: h,
                        actionUrl: p,
                        actionCollection: f,
                        certifications: a,
                        goods: r(e).map(function(e) {
                            return {
                                thumbUrl: n(e),
                                url: "/pages/goods/detail/index?alias=" + e.alias
                            };
                        })
                    };
                }), g = this.data[t], p = g.logName, f = g.bannerName, m = [].concat(g.data, u), T = 0 === u.length;
                this.setData((o = {}, o[t] = (a = {}, a[h[t]] = l ? g.page++ : e.max_id, a.page = g.page++, 
                a.data = m, a.finished = T, a.logName = p, a.bannerName = f, a), o.curData = {
                    data: m,
                    finished: T
                }, o));
            },
            parseGoods: function(e, t) {
                var a, o, s = [];
                "goodsBought" === t ? e.list.forEach(function(e) {
                    e.list.forEach(function(e) {
                        s.push({
                            title: e.title,
                            url: "/pages/goods/detail/index?alias=" + e.alias,
                            thumbUrl: (0, d.default)(e.thumb_url, "!360x360.jpg"),
                            price: e.price
                        });
                    });
                }) : s = e.list.map(function(e) {
                    return {
                        title: e.title,
                        url: "/pages/goods/detail/index?alias=" + e.alias,
                        thumbUrl: "goodsCollected" === t ? (0, d.default)(e.image_url, "!360x360.jpg") : (0, 
                        d.default)(e.thumb_url, "!360x360.jpg"),
                        price: e.price
                    };
                });
                var i = "page" === h[t], n = this.data[t], r = n.logName, c = n.bannerName, l = [].concat(n.data, s), u = 0 === s.length;
                this.setData((o = {}, o[t] = (a = {}, a[h[t]] = i ? n.page++ : e.max_id, a.page = n.page++, 
                a.data = l, a.finished = u, a.logName = r, a.bannerName = c, a), o.curData = {
                    data: l,
                    finished: u
                }, o));
            },
            parseActionData: function(e, t, a) {
                return "storeView" === e ? {
                    actionText: t === l.config.COLLECT_STATUS.COLLECTED ? "已收藏" : "收藏",
                    actionUrl: "/pages/usercenter/shopSelection/shopSelection?kdtId=" + a,
                    actionCollection: !0
                } : "storeNew" === e ? {
                    actionText: "进入店铺",
                    actionUrl: "/pages/usercenter/shopSelection/shopSelection?kdtId=" + a
                } : {
                    actionUrl: "/pages/usercenter/shopSelection/shopSelection?kdtId=" + a
                };
            },
            parseCertification: function(e, t) {
                var a = [];
                return (2 === e || 6 < e) && a.push("企业认证"), t && a.push("担保交易"), a;
            },
            onShareAppMessage: function() {
                return {
                    title: "你不知道的剁手经历",
                    path: "/pages/venue/like/index"
                };
            }
        });
    }
}, [ 246 ]);