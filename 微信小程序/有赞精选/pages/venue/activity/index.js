!function() {
    require("./../../../common.js"), wx.webpackJsonp.apply(null, arguments);
}([ 11 ], {
    261: function(t, a, e) {
        function o(t) {
            return t && t.__esModule ? t : {
                default: t
            };
        }
        var i = o(e(10)), n = o(e(4)), s = o(e(1)), c = o(e(262)), l = e(155), d = e(24), r = e(20), u = e(23), h = e(42), f = e(0), p = e(54), g = e(43), m = e(12), T = e(66), D = e(3), v = e(17), w = getApp(), b = "limit_discount";
        (0, s.default)(D({}, T.component, r.component, u.component, h.component, l.component, d, {
            data: D({}, T.data, r.data, u.data, h.data, {
                actionSubTab: !1,
                venuesTab: {
                    selectedId: 12,
                    selectedName: "cheap_hot",
                    selectedType: 3,
                    isNew: !0
                },
                subTab: {
                    list: {},
                    selectedId: 12
                },
                pages: {},
                pageId: "12",
                id: "",
                time: "",
                text: "",
                tabs: [],
                activeKey: "",
                formatTime: "",
                goodsData: [],
                page: 1,
                pageSize: 10,
                nodata: !1,
                nomore: !1,
                isRequest: !1,
                allTabData: {},
                showGoPage: !1
            }),
            onLoad: function(t) {
                this.initActivity();
                var a = {};
                try {
                    a = t.collection_id ? t : v.decode("activity", t.scene);
                } catch (t) {
                    a = {};
                }
                this.initPage(a);
            },
            onPullDownRefresh: function() {
                this.setData({
                    goodsData: [],
                    page: 1
                }), this.fetchGoodsData(), wx.stopPullDownRefresh();
            },
            initPage: function(t) {
                var a = this;
                this.setData({
                    pageId: t.collection_id
                }), this.imgLoader = new p(this);
                for (var e = w.globalData.scene, o = [ 1007, 1008, 1035, 1047, 1048, 1049 ], i = 0; i < o.length; i++) +e === o[i] && this.setData({
                    showGoPage: !0
                });
                if (this.data.pageId === c.default.CHEAP_HOT.channel) {
                    var n = c.default.CHEAP_HOT.channel, s = c.default.CHEAP_HOT.topic;
                    f.setGlobalData({
                        channel: n,
                        topic: s
                    }), wx.setNavigationBarTitle({
                        title: s
                    });
                } else if (this.data.pageId === c.default.TIMELIMITED_DISCOUNT.channel) {
                    this.initUserLogo(), this.fetchAllTabData(), this.fetchTabsData().catch(function() {
                        a.showZanToast("网络错误，请下拉刷新"), a.setData({
                            isRequest: !1
                        });
                    });
                    var l = c.default.TIMELIMITED_DISCOUNT.topic;
                    f.setGlobalData({
                        channel: c.default.TIMELIMITED_DISCOUNT.channel
                    }), wx.setNavigationBarTitle({
                        title: l
                    });
                }
                f.page.show(), this.setThreshold();
            },
            unLoad: function() {
                wx.removeStorageSync(b);
            },
            onShareAppMessage: function() {
                var t = this.data.pageId, a = h[t].title || "推荐你看看，精选好货限时让利！", e = h[t].url || "", o = {
                    title: a,
                    path: "pages/venue/activity/index?collection_id=" + this.data.pageId
                };
                return e && (o.imageUrl = e), o;
            },
            onReachBottom: function() {
                var t = this;
                if ("12" === this.data.pageId) {
                    var a = {
                        home: "handleHomeScrollToLower",
                        1: "handleCustomScrollToLower",
                        2: "handleHoldScrollToLower",
                        3: "handleActivityScrollToLower"
                    }[this.data.venuesTab.selectedType];
                    a && this[a]().catch(function() {
                        t.showZanToast("网络开小差了，请下拉刷新");
                    });
                } else {
                    var e = this.data, o = e.nodata, i = e.nomore, n = e.isRequest;
                    o || i || n || this.fetchGoodsData().catch(function() {
                        t.showZanToast("网络开小差了，请上拉重试"), t.setData({
                            isRequest: !1
                        });
                    });
                }
            },
            initUserLogo: function() {
                var t = this;
                g().then(function(a) {
                    t.setData({
                        userLogo: a
                    });
                });
            },
            _formatTime: function(t) {
                var a = t.split("-");
                return a[0] + "月" + a[1] + "日";
            },
            onTabChange: function(t) {
                var a = this;
                this.setData({
                    id: t.id,
                    text: t.text,
                    time: t.time,
                    activeKey: t.key,
                    formatTime: this._formatTime(t.key),
                    page: 1,
                    goodsData: [],
                    nodata: !1,
                    nomore: !1,
                    isRequest: !1
                }), wx.setStorageSync(b, t.key), this.fetchGoodsData().catch(function() {
                    a.showZanToast("网络开小差了，请下拉刷新"), a.setData({
                        isRequest: !1
                    });
                });
            },
            fetchAllTabData: function() {
                var t = this;
                w.carmen({
                    api: "weapp.spotlight.collection.list/1.0.0/all",
                    method: "GET",
                    data: {
                        type: 1
                    },
                    success: function(a) {
                        var e = {};
                        a.forEach(function(t) {
                            e[t.id] = t;
                        }), t.setData({
                            allTabData: e
                        });
                    },
                    fail: function(a) {
                        setTimeout(function() {
                            t.fetchAllTabData();
                        }, 1e3), m("api log: weapp.spotlight.collection.list/1.0.0/all(seckill all tab) " + (0, 
                        n.default)(a));
                    }
                });
            },
            _filterTabsData: function(t) {
                return t.map(function(t) {
                    return {
                        id: t.collection_id,
                        key: t.name,
                        time: t.time,
                        text: t.remark
                    };
                });
            },
            _getInitTabData: function(t) {
                var a = {}, e = wx.getStorageSync(b), o = t.map(function(t) {
                    return t.name;
                });
                return o.includes(e) || (e = o.includes("今日") ? "今日" : o[0]), t.forEach(function(t) {
                    t.name === e && (a.id = t.collection_id, a.key = t.name, a.time = t.time, a.text = t.remark);
                }), a;
            },
            fetchTabsData: function() {
                var t = this;
                return new i.default(function(a, e) {
                    w.carmen({
                        api: "weapp.spotlight.category/1.0.0/list",
                        data: {
                            collectionId: 13
                        },
                        success: function(o) {
                            var i = t._filterTabsData(o), n = t._getInitTabData(o), s = n.id, c = n.key, l = n.time, d = n.text;
                            t.setData({
                                tabs: i,
                                id: s,
                                time: l,
                                text: d,
                                activeKey: c
                            }), t.fetchGoodsData().then(function() {
                                a();
                            }).catch(function(t) {
                                e(t);
                            });
                        },
                        fail: function(t) {
                            m("api log: weapp.spotlight.category/1.0.0/list(seckill tab) " + (0, n.default)(t)), 
                            e(t);
                        }
                    });
                });
            },
            fetchGoodsData: function() {
                var t = this, a = this.data, e = a.id, o = a.time, s = a.page, c = a.pageSize, l = a.nomore, d = a.nodata;
                return this.setData({
                    isRequest: !0
                }), this.requestGoodsTask && this.requestGoodsTask.abort(), new i.default(function(a, i) {
                    t.requestGoodsTask = w.carmen({
                        api: "weapp.spotlight.goods/1.0.0/list",
                        data: {
                            type: 3,
                            page: s,
                            size: c,
                            categoryId: 0,
                            collectionId: e,
                            currentTime: o
                        },
                        success: function(e) {
                            var o = e.paginator.total_count, i = e.items, n = t.data.goodsData;
                            if (o) 1 === s && 0 === i.length ? d = !0 : l = !0; else if (0 === i.length) return t.setData({
                                page: s + 1,
                                isRequest: !1
                            }), void t.fetchGoodsData();
                            n = [].concat(n, i), t.setData({
                                page: s + 1,
                                nomore: l,
                                nodata: d,
                                isRequest: !1,
                                goodsData: n
                            }), a();
                        },
                        fail: function(t) {
                            "wx:request" === t.type && -1 < t.msg.indexOf("abort") ? a() : (i(t), m("api log: weapp.spotlight.goods/1.0.0/list(seckill goods) " + (0, 
                            n.default)(t)));
                        }
                    });
                });
            }
        }));
    }
}, [ 261 ]);