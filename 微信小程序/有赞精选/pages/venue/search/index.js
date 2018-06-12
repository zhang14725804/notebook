!function() {
    require("./../../../common.js"), wx.webpackJsonp.apply(null, arguments);
}([ 7 ], {
    249: function(e, t, a) {
        function s(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        var o = s(a(1)), i = s(a(63)), r = a(250), c = a(8), n = c.Dialog, h = c.extend, d = getApp();
        (0, o.default)(h({}, n, {
            data: {
                inputFocus: !0,
                isSearching: !1,
                isSearched: !1,
                indexPage: 1,
                key: "",
                isLoadMore: !0,
                isCategory: !1,
                loadMoreSuccess: !0,
                loadMoreStatus: {
                    loading: !0,
                    nomore: !1
                },
                inputValue: "",
                noMore: !1,
                searchNull: !1,
                scrolllViewHeight: "",
                recentSearch: [],
                showRecentSearch: !1,
                showClassify: !0,
                hotSearch: [],
                classifySearch: [],
                associateItems: [ {
                    id: 0,
                    content: "水果生鲜"
                }, {
                    id: 1,
                    content: "居家"
                }, {
                    id: 2,
                    content: "母婴用品"
                }, {
                    id: 0,
                    content: "日用百货"
                }, {
                    id: 1,
                    content: "美妆"
                }, {
                    id: 2,
                    content: "服饰配件"
                } ],
                searchResult: [],
                bannerName: ""
            },
            onLoad: function(e) {
                var t = this;
                this.setData({
                    inputFocus: !!+e.isfocus
                }), this.getHotSearch(), wx.getSystemInfo({
                    success: function(e) {
                        var a = e.windowHeight, s = e.windowWidth;
                        t.setData({
                            scrolllViewHeight: a * (750 / s) - 90
                        });
                    }
                }), this.getRecentSearch(), this.getCategoryList();
            },
            addRecentSearch: function(e) {
                if (e) {
                    for (var t = d.storage.get("recentSearch") ? d.storage.get("recentSearch") : [], a = 0; a < t.length; a++) t[a] === e && t.splice(a, 1);
                    t.unshift(e), d.storage.set("recentSearch", t);
                }
            },
            getRecentSearch: function() {
                var e = d.storage.get("recentSearch");
                this.setData({
                    recentSearch: e || []
                }), this.data.recentSearch.length && this.setData({
                    showRecentSearch: !0
                });
            },
            clearRecent: function() {
                var e = this;
                wx.showModal({
                    title: "提示",
                    content: "确认删除搜索记录？",
                    success: function(t) {
                        t.confirm ? (d.storage.remove("recentSearch"), e.setData({
                            recentSearch: [],
                            showRecentSearch: !1
                        })) : t.cancel && console.log("用户点击取消");
                    }
                });
            },
            getCategoryList: function() {
                var e = this, t = [];
                (0, r.getCategoryListApi)({
                    data: {
                        source: "search"
                    },
                    success: function(a) {
                        t = a.map(function(e) {
                            return {
                                id: e.code,
                                title: e.name,
                                icon: e.icon
                            };
                        }), e.setData({
                            classifySearch: t
                        });
                    }
                });
            },
            search: function(e) {
                var t = e.currentTarget.dataset.type ? e.currentTarget.dataset.type : "index", a = "", s = "";
                if ("confirm" === e.type ? (a = e.detail.value, s = "search~index") : e.currentTarget.dataset.tabid ? (a = e.currentTarget.dataset.tabid, 
                s = "search~category." + a) : (a = e.currentTarget.dataset.title, "hot" === t ? s = "search~hot" : "history" === t && (s = "search~history")), 
                e.currentTarget.dataset.tabid) {
                    var o = e.currentTarget.dataset.title;
                    d.logger.log({
                        et: "click",
                        ei: "open_category",
                        en: o,
                        params: {
                            cat_id: a
                        }
                    }), this.getGoodsResult(1, a, !1, !0), this.setData({
                        indexPage: 1,
                        key: a,
                        bannerName: s,
                        inputValue: o,
                        showClassify: !0,
                        searchNull: !1
                    });
                } else d.logger.log({
                    et: "click",
                    ei: "search",
                    en: "搜索",
                    params: {
                        words: a,
                        type: t
                    }
                }), this.getGoodsResult(1, a, !1, !1), this.addRecentSearch(a), this.setData({
                    indexPage: 1,
                    key: a,
                    bannerName: s,
                    inputValue: a,
                    showClassify: !0,
                    searchNull: !1
                });
            },
            loadMore: function() {
                this.data.noMore || !this.data.loadMoreSuccess || (this.data.isCategory ? this.getGoodsResult(this.data.indexPage, this.data.key, !0, !0) : this.getGoodsResult(this.data.indexPage, this.data.key, !0, !1));
            },
            getHotSearch: function() {
                var e = this;
                (0, r.getHotSearchApi)({
                    success: function(t) {
                        e.setData({
                            hotSearch: t.items.map(function(e) {
                                return {
                                    id: e.id,
                                    content: e.name
                                };
                            })
                        });
                    }
                });
            },
            getGoodsResult: function(e, t, a, s) {
                var o = a ? this.data.indexPage + 1 : 1;
                this.setData({
                    indexPage: o,
                    loadMoreSuccess: !1
                }), a || wx.showLoading({
                    title: "搜索中"
                }), s ? (this.getCategoryGoods(o, t, a), this.setData({
                    isCategory: !0
                })) : (this.getSearchResult(o, t, a), this.setData({
                    isCategory: !1
                }));
            },
            getSearchResult: function(e, t, a) {
                var s = this;
                (0, r.getSearchResultApi)({
                    data: {
                        page: e,
                        key: t
                    },
                    success: function(e) {
                        var o = 0 === e.items.length ? 0 : 1, i = [];
                        if (e.items.length) for (var r = 0; r < e.items.length; r++) i.push(e.items[r].goods_id);
                        a || d.logger.log({
                            et: "callback",
                            ei: "search_callback",
                            en: "搜索反馈",
                            params: {
                                status: o,
                                words: t,
                                goods_id: i
                            }
                        }), s.resultOption(e, a);
                    }
                });
            },
            getCategoryGoods: function(e, t, a) {
                var s = this;
                (0, r.getGoodsByCategoryApi)({
                    data: {
                        page: e,
                        category_code: t
                    },
                    success: function(e) {
                        s.resultOption(e, a);
                    }
                });
            },
            resultOption: function(e, t) {
                wx.hideLoading();
                var a = e.items;
                t || this.setData({
                    searchResult: []
                });
                var s = this.data.searchResult.concat(a.map(function(e) {
                    return {
                        title: e.goods_name,
                        url: e.wx_goods_url,
                        price: (+e.sale_price / 100).toFixed(2),
                        salesNum: e.sale_num,
                        thumbUrl: (0, i.default)(e.goods_icon_url, "!360x360.jpg")
                    };
                }));
                return this.setData({
                    loadMoreSuccess: !0,
                    isSearched: !0,
                    searchResult: s
                }), 20 > a.length ? (this.setData({
                    loadMoreStatus: {
                        loading: !1,
                        nomore: !0
                    },
                    noMore: !0
                }), void (0 === this.data.searchResult.length && this.setData({
                    searchNull: !0,
                    showClassify: !1,
                    isSearched: !1,
                    showRecentSearch: !1
                }))) : void this.setData({
                    loadMoreStatus: {
                        loading: !0,
                        nomore: !1
                    },
                    noMore: !1
                });
            }
        }));
    }
}, [ 249 ]);