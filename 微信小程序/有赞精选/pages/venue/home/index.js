!function() {
    require("./../../../common.js"), wx.webpackJsonp.apply(null, arguments);
}([ 10 ], {
    239: function(t, e, i) {
        function o(t) {
            return t && t.__esModule ? t : {
                default: t
            };
        }
        var a = o(i(7)), n = o(i(4)), s = o(i(1)), c = o(i(3)), r = o(i(63)), u = o(i(64)), d = o(i(0)), l = o(i(41)), g = o(i(23)), p = o(i(20)), f = o(i(244)), h = i(245), m = getApp(), _ = function(t) {
            if (t) {
                var e = (t / 100 + "").split(".")[1], i = e ? Math.min(e.length, 2) : 0;
                return (t / 100).toFixed(i);
            }
            return "0";
        }, v = function(t) {
            return 9999 < t ? (t / 1e4).toFixed(1) + "万" : t;
        }, y = {
            data: (0, c.default)({
                currentSwiperItem: 1,
                showActivityIcon: !1,
                showActivityPop: !1,
                loading: !1,
                nomore: !1,
                searchText: "宝宝出行必备",
                countdown: {},
                activity: {},
                banner: [],
                groupon: {},
                timelimited: {},
                sales: {},
                discover: [],
                topics: [],
                tab: {},
                tabHeight: 40,
                tabWidth: 70,
                tabGoodsScrollTop: 0,
                tabGoods: {},
                curTabGoods: [],
                isTabFixed: !1
            }, p.default.data, g.default.data),
            onLoad: function() {
                this.initActivityIcon(), this.initHomeData();
            },
            onShow: function() {
                d.default.setGlobalData({
                    channel: "all"
                }), this.setThreshold(), this.initTabInfo();
            },
            onShareAppMessage: function() {
                return {
                    title: "推荐你看看，精选好货限时让利！",
                    path: "pages/venue/home/index"
                };
            },
            onPullDownRefresh: function() {
                this.initHomeData(!0), wx.stopPullDownRefresh();
            },
            onSwiperChange: function(t) {
                this.setData({
                    currentSwiperItem: +t.detail.current + 1
                });
            },
            onTabChange: function(t) {
                for (var e = t.detail.selectedId, i = "", o = this.data.tab.list, a = 0; a < o.length; a++) o[a].id === e && (i = o[a].title);
                m.logger.log({
                    et: "click",
                    el: "select_goods_tag",
                    en: i,
                    params: {
                        tag_code: e
                    }
                });
                var n = this.data.tabGoods[e] || {}, s = n.data, c = void 0 === s ? [] : s, r = n.finished, u = void 0 !== r && r;
                0 !== c.length || u || this.getCategoryGoods(e), this.setData({
                    "tab.selectedId": e,
                    tabGoodsScrollTop: 0,
                    curTabGoods: c,
                    nomore: u
                });
            },
            onReachBottom: function() {
                var t = this.data, e = t.nomore, i = t.tab.selectedId;
                e || this.getCategoryGoods(i);
            },
            onActivityPopClick: function() {
                this.setData({
                    showActivityPop: !1
                }), wx.navigateTo({
                    url: this.data.popActivity.url
                });
            },
            onActivityPopupClose: function() {
                this.setData({
                    showActivityPop: !1
                });
            },
            onActivityIconClick: function() {
                wx.navigateTo({
                    url: this.data.activityIcon.url
                });
            },
            onActivityIconClose: function() {
                this.setData({
                    showActivityIcon: !1
                });
            },
            onTapCallback: function(t) {
                var e = t.detail.goods.id;
                m.logger.log({
                    et: "click",
                    ei: "open_goods",
                    en: "打开商品",
                    params: {
                        goods_id: e
                    }
                });
            },
            initHomeData: function(t) {
                var e = this;
                t && this.setData({
                    activity: {},
                    banner: [],
                    groupon: {},
                    timelimited: {},
                    sales: {},
                    discover: [],
                    topics: [],
                    tab: {},
                    tabGoods: {},
                    curTabGoods: []
                }), [ "Banner", "Groupon", "Sales", "TimeLimited", "Discover", "Topic", "Category" ].forEach(function(t) {
                    var i = t.toLowerCase();
                    "groupon" === i || "timelimited" === i ? e.getActivityGoods({
                        type: i,
                        collection_name: f.default.COLLECTION[i]
                    }) : e["get" + t]();
                });
            },
            initActivityIcon: function() {
                var t = this;
                (0, h.checkShareCutStatus)({
                    success: function(e) {
                        var i = e.is_exist, o = e.small_url, a = e.small_picture, n = e.picture, s = e.url, c = new Date().getDate(), u = m.storage.get("__show_home_pop__"), d = +u === c, l = !1;
                        !i || u && d || (l = !0), i && !d && m.storage.set("__show_home_pop__", c), t.setData({
                            showActivityIcon: i,
                            showActivityPop: l,
                            popActivity: {
                                picture: (0, r.default)(n, "!480x480.png"),
                                url: s
                            },
                            activityIcon: {
                                picture: a,
                                url: o
                            }
                        });
                    }
                });
            },
            initCountDown: function() {
                var t = this, e = new Date(), i = new Date(new Date(e.toLocaleDateString()).getTime() + 864e5) - e;
                new u.default(i, {
                    onChange: function(e, i) {
                        t.setData({
                            countdown: i
                        });
                    }
                });
            },
            initTabInfo: function() {
                var t = this;
                wx.getSystemInfo({
                    success: function(e) {
                        t.setData({
                            tabWidth: e.windowWidth / 6
                        });
                    }
                }), wx.createSelectorQuery().in(this).select(".search-bar").boundingClientRect(function(e) {
                    t.setData({
                        tabHeight: e.height
                    });
                }).exec();
            },
            getBanner: function() {
                var t = this;
                (0, h.getAds)({
                    data: {
                        unit: "recommend"
                    },
                    success: function(e) {
                        t.setData({
                            banner: e.map(function(t) {
                                return {
                                    id: t.id,
                                    url: t.url,
                                    hd_img: (0, r.default)(t.hd_img, "!750x750.jpg")
                                };
                            })
                        });
                    }
                });
            },
            getActivityGoods: function(t) {
                var e = this, i = t.type, o = t.collection_name;
                (0, h.getActivityGoodsList)({
                    data: {
                        collection_name: o,
                        type: 3
                    },
                    success: function(a) {
                        var n, s = a.goods, c = a.category_id, u = a.collection_id;
                        e.setData((n = {}, n[t.type] = {
                            url: "/pages/venue/activity/index?category_id=" + c + "&collection_id=" + u,
                            goods: s.map(function(t) {
                                return {
                                    title: t.title,
                                    id: t.id,
                                    type: i,
                                    url: "/pages/goods/detail/index?alias=" + t.alias,
                                    pic_url: (0, r.default)(t.pic_url, "!200x200.jpg"),
                                    groupon_num: v(t.groupon_num),
                                    price: _(+t.sale_price),
                                    old_price: _(+t.original_price)
                                };
                            }).concat({
                                url: "/pages/venue/activity/index?category_id=" + c + "&collection_id=" + u,
                                pic_url: (0, r.default)("https://img.yzcdn.cn/mars/image/check_all0.png", "!200x200.jpg")
                            })
                        }, n)), 2 < s.length && o === f.default.COLLECTION.timelimited && e.initCountDown();
                    }
                });
            },
            getSales: function() {
                var t = this;
                (0, h.getRankSales)({
                    data: {
                        size: 3
                    },
                    success: function(e) {
                        t.setData({
                            sales: {
                                url: "/pages/venue/hotsale/index",
                                goods: e.main_items.map(function(t) {
                                    return {
                                        sale_num: v(t.sale_num),
                                        goods_icon_url: (0, r.default)(t.goods_icon_url, "!160x160.jpg")
                                    };
                                })
                            }
                        });
                    }
                });
            },
            getDiscover: function() {
                var t = this;
                (0, h.getAds)({
                    data: {
                        unit: "find_subject",
                        size: 5
                    },
                    success: function(e) {
                        t.setData({
                            discover: e.map(function(t) {
                                return {
                                    id: t.id,
                                    url: t.url,
                                    hd_img: (0, r.default)(t.hd_img, "!360x360.jpg"),
                                    tag: t.tag,
                                    description: t.description
                                };
                            })
                        });
                    },
                    fail: function() {}
                });
            },
            getTopic: function() {
                var t = this;
                (0, h.getAds)({
                    data: {
                        unit: "topic_spotlight"
                    },
                    success: function(e) {
                        t.setData({
                            topics: e.map(function(t) {
                                return {
                                    id: t.id,
                                    topicId: t.url.match(/.*topic_id=([0-9]+)&(.*)/)[1],
                                    url: t.url,
                                    banner: (0, r.default)(t.hd_img, "!730x730.jpg"),
                                    goods: t.goods.map(function(t) {
                                        return {
                                            id: t.id,
                                            url: "/pages/goods/detail/index?alias=" + t.goods_alias,
                                            pic_url: (0, r.default)(t.image_url, "!200x200.jpg"),
                                            title: t.title,
                                            price: _(+t.sale_price_cents)
                                        };
                                    })
                                };
                            })
                        });
                    }
                });
            },
            getCategory: function() {
                var t = this;
                (0, h.getCategoryList)({
                    success: function(e) {
                        var i = (e[0] || {}).code, o = e.map(function(t) {
                            return {
                                id: t.code,
                                title: t.name
                            };
                        });
                        t.getCategoryGoods(i), t.setData({
                            tab: {
                                list: o,
                                selectedId: i
                            }
                        });
                        try {
                            m.storage.set("category_data", (0, n.default)(o));
                        } catch (t) {
                            console.error("json parse error: " + t.message);
                        }
                    },
                    fail: function() {}
                });
            },
            getCategoryGoods: function(t) {
                var e = this, i = this.data, o = (i.tab, i.tabGoods), n = i.loading, s = o[t] || {}, c = s.page, u = void 0 === c ? 1 : c, d = s.data, l = void 0 === d ? [] : d;
                n || (this.setData({
                    loading: !0
                }), (0, h.getGoodsByCategory)({
                    data: {
                        category_code: t,
                        page: u
                    },
                    success: function(i) {
                        var n, s = i.items, c = (i.paginator, [].concat(l, s.map(function(t) {
                            return {
                                id: t.goods_id,
                                title: t.goods_name,
                                price: _(+t.sale_price),
                                salesNum: v(t.sale_num),
                                thumbUrl: (0, r.default)(t.goods_icon_url, "!360x360.jpg"),
                                url: t.wx_goods_url
                            };
                        }))), d = 10 > s.length;
                        e.setData({
                            tabGoods: (0, a.default)({}, o, (n = {}, n[t] = {
                                data: c,
                                page: u + 1,
                                finished: d
                            }, n)),
                            nomore: d,
                            curTabGoods: c
                        });
                    },
                    complete: function() {
                        e.setData({
                            loading: !1
                        });
                    }
                }));
            },
            onTapItem: function(t) {
                var e = t.currentTarget.dataset.url, i = t.currentTarget.dataset.id;
                m.logger.log({
                    et: "click",
                    ei: "open_goods",
                    en: "打开商品",
                    params: {
                        goods_id: i
                    }
                }), wx.navigateTo({
                    url: e
                });
            }
        }, b = (0, c.default)({}, l.default, y, p.default.component, g.default.component);
        (0, s.default)(b);
    }
}, [ 239 ]);