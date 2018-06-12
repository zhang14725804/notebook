!function() {
    require("./../../../common.js"), wx.webpackJsonp.apply(null, arguments);
}([ 6 ], {
    335: function(t, a, e) {
        function o(t) {
            return t && t.__esModule ? t : {
                default: t
            };
        }
        var i = o(e(10)), n = o(e(4)), s = o(e(2)), c = o(e(1)), u = e(20), l = e(155), r = e(23), f = e(0), h = e(24), d = e(43), p = e(12), g = "limit_discount", m = getApp(), D = {
            data: (0, s.default)({
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
                allTabData: {}
            }, u.data, r.data),
            onLoad: function(t) {
                var a = this;
                this.initUserLogo(), this.fetchAllTabData(), this.fetchTabsData().catch(function() {
                    a.showZanToast("网络错误，请下拉刷新"), a.setData({
                        isRequest: !1
                    });
                }), t.id && f.setGlobalData({
                    channel: t.id
                });
            },
            unLoad: function() {
                wx.removeStorageSync(g);
            },
            onShow: function() {
                this.setThreshold(), f.page.show();
            },
            onShareAppMessage: function() {
                return {
                    title: "买这些东西，你妈不会说你乱花钱！",
                    path: "/pages/venues/discount/index",
                    imageUrl: "https://img.yzcdn.cn/public_files/2017/11/03/2ff27c672a4f45ac796b1d05a9aa06fc.png"
                };
            },
            onPullDownRefresh: function() {
                var t = this;
                this.setData({
                    page: 1,
                    goodsData: [],
                    nodata: !1,
                    nomore: !1,
                    isRequest: !1
                }), this.fetchAllTabData(), this.fetchTabsData().then(function() {
                    wx.stopPullDownRefresh();
                }).catch(function() {
                    t.showZanToast("网络错误，请下拉刷新"), t.setData({
                        isRequest: !1
                    }), wx.stopPullDownRefresh();
                });
            },
            initUserLogo: function() {
                var t = this;
                d().then(function(a) {
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
                }), wx.setStorageSync(g, t.key), this.fetchGoodsData().catch(function() {
                    a.showZanToast("网络开小差了，请下拉刷新"), a.setData({
                        isRequest: !1
                    });
                });
            },
            fetchAllTabData: function() {
                var t = this;
                m.carmen({
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
                        }, 1e3), p("api log: weapp.spotlight.collection.list/1.0.0/all(seckill all tab) " + (0, 
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
                var a = {}, e = wx.getStorageSync(g), o = t.map(function(t) {
                    return t.name;
                });
                return o.includes(e) || (e = o.includes("今日") ? "今日" : o[0]), t.forEach(function(t) {
                    t.name === e && (a.id = t.collection_id, a.key = t.name, a.time = t.time, a.text = t.remark);
                }), a;
            },
            fetchTabsData: function() {
                var t = this;
                return new i.default(function(a, e) {
                    m.carmen({
                        api: "weapp.spotlight.category/1.0.0/list",
                        data: {
                            collectionId: 13
                        },
                        success: function(o) {
                            var i = t._filterTabsData(o), n = t._getInitTabData(o), s = n.id, c = n.key, u = n.time, l = n.text;
                            t.setData({
                                tabs: i,
                                id: s,
                                time: u,
                                text: l,
                                activeKey: c
                            }), t.fetchGoodsData().then(function() {
                                a();
                            }).catch(function(t) {
                                e(t);
                            });
                        },
                        fail: function(t) {
                            p("api log: weapp.spotlight.category/1.0.0/list(seckill tab) " + (0, n.default)(t)), 
                            e(t);
                        }
                    });
                });
            },
            fetchGoodsData: function() {
                var t = this, a = this.data, e = a.id, o = a.time, s = a.page, c = a.pageSize, u = a.nomore, l = a.nodata;
                return this.setData({
                    isRequest: !0
                }), this.requestGoodsTask && this.requestGoodsTask.abort(), new i.default(function(a, i) {
                    t.requestGoodsTask = m.carmen({
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
                            if (o) 1 === s && 0 === i.length ? l = !0 : u = !0; else if (0 === i.length) return t.setData({
                                page: s + 1,
                                isRequest: !1
                            }), void t.fetchGoodsData();
                            n = [].concat(n, i), t.setData({
                                page: s + 1,
                                nomore: u,
                                nodata: l,
                                isRequest: !1,
                                goodsData: n
                            }), a();
                        },
                        fail: function(t) {
                            "wx:request" === t.type && -1 < t.msg.indexOf("abort") ? a() : (i(t), p("api log: weapp.spotlight.goods/1.0.0/list(seckill goods) " + (0, 
                            n.default)(t)));
                        }
                    });
                });
            },
            onReachBottom: function() {
                var t = this, a = this.data, e = a.nodata, o = a.nomore, i = a.isRequest;
                e || o || i || this.fetchGoodsData().catch(function() {
                    t.showZanToast("网络开小差了，请上拉重试"), t.setData({
                        isRequest: !1
                    });
                });
            }
        };
        (0, c.default)((0, s.default)({}, h, D, l.component, u.component, r.component));
    }
}, [ 335 ]);