!function() {
    require("./../../../common.js"), wx.webpackJsonp.apply(null, arguments);
}([ 9 ], {
    259: function(t, o, e) {
        function a(t) {
            return t && t.__esModule ? t : {
                default: t
            };
        }
        var n = a(e(7)), s = a(e(1)), i = e(260), r = a(e(63)), l = e(20), u = e(23), d = e(42), g = e(0), c = e(3), p = getApp();
        (0, s.default)(c({}, u.component, l.component, {
            data: c({}, u.data, l.data, {
                page: {
                    id: 14,
                    title: "热销商品"
                },
                tab: {
                    list: [ {
                        id: 0,
                        title: "热销商品榜"
                    }, {
                        id: 1,
                        title: "热销店铺榜"
                    } ]
                },
                tabSelectedId: 0,
                topStoreData: [],
                goodsData: [],
                loadMoreStatus: {
                    loading: !0,
                    nomore: !1
                },
                showGoPage: !1
            }),
            onLoad: function() {
                this.getHotSaleGoods(), this.initPage();
            },
            onPullDownRefresh: function() {
                0 === this.data.tabSelectedId ? (this.getHotSaleGoods(), this.initPage()) : this.getTopStore(), 
                wx.stopPullDownRefresh();
            },
            initPage: function() {
                for (var t = p.globalData.scene, o = [ 1007, 1008, 1035, 1047, 1048, 1049 ], e = 0; e < o.length; e++) +t === o[e] && this.setData({
                    showGoPage: !0
                });
                g.setGlobalData({
                    channel: "14",
                    topic: "热销商品"
                }), g.page.show({
                    id: 0
                }), this.setThreshold();
            },
            linkStore: function(t) {
                var o = t.currentTarget.dataset.url;
                wx.navigateTo({
                    url: o
                });
            },
            getHotSaleGoods: function() {
                var t = this;
                (0, i.getHotSaleGoodsApi)({
                    success: function(o) {
                        t.parseGoodsData(o);
                    }
                });
            },
            parseGoodsData: function(t) {
                var o = t.map(function(t) {
                    return {
                        id: t.goods_id,
                        title: t.goods_name,
                        thumbUrl: (0, r.default)(t.goods_icon_url, "!200x200.jpg"),
                        url: t.wx_goods_url,
                        storeUrl: t.wx_shop_url,
                        price: (+t.goods_price_info / 100).toFixed(2),
                        store: t.shop_name
                    };
                });
                this.setData({
                    goodsData: o,
                    loadMoreStatus: {
                        loading: !1,
                        nomore: !0
                    }
                });
            },
            getTopStore: function() {
                var t = this;
                (0, i.getTopStoreApi)({
                    success: function(o) {
                        t.parseStoreData(o);
                    }
                });
            },
            parseStoreData: function(t) {
                var o = function(t) {
                    return t.team_name || t.shop_name;
                }, e = function(t) {
                    return {
                        thumbUrl: (0, r.default)(t.goods_icon_url, "!200x200.jpg")
                    };
                }, a = function(t) {
                    return t.goods_list || t.goods;
                }, s = function(t) {
                    return t.goods_num;
                }, i = t.map(function(t) {
                    return {
                        url: t.wx_shop_url,
                        logo: t.logo,
                        name: o(t),
                        totalGoods: s(t),
                        goods: a(t).map(function(t) {
                            return (0, n.default)({
                                url: t.wx_goods_url
                            }, e(t));
                        })
                    };
                });
                this.setData({
                    topStoreData: i,
                    loadMoreStatus: {
                        loading: !1,
                        nomore: !0
                    }
                });
            },
            onTabChange: function(t) {
                for (var o = t.detail.selectedId, e = "", a = this.data.tab.list, n = 0; n < a.length; n++) a[n].id === o && (e = a[n].title);
                p.logger.log({
                    et: "click",
                    ei: "open_tabs",
                    en: "栏目点击",
                    params: {
                        title: e
                    }
                }), this.setData({
                    tabSelectedId: o
                }), 1 === o && 0 === this.data.topStoreData.length && this.getTopStore();
            },
            onShareAppMessage: function() {
                var t = d[14].title || "推荐你看看，精选好货限时让利！", o = d[14].url || "", e = {
                    title: t,
                    path: "pages/venue/hotsale/index"
                };
                return o && (e.imageUrl = o), e;
            }
        }));
    }
}, [ 259 ]);