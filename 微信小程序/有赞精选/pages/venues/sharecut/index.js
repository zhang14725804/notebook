!function() {
    require("./../../../common.js"), wx.webpackJsonp.apply(null, arguments);
}([ 4 ], {
    337: function(a, t, e) {
        function s(a) {
            return a && a.__esModule ? a : {
                default: a
            };
        }
        var o = s(e(7)), n = s(e(4)), i = s(e(2)), c = s(e(1)), r = e(20), u = e(23), l = e(24), d = e(12), g = e(41), p = e(67), h = e(0), f = e(17), D = e(11), _ = e(6), m = e(15), v = getApp(), y = {
            data: (0, i.default)({
                swiperData: [],
                goodsData: [],
                nomore: !1,
                nodata: !1,
                page: 1,
                isRequest: !1,
                query: null
            }, r.data, u.data),
            onLoad: function(a) {
                try {
                    var t;
                    a.scene && (t = f.decode("venues", a.scene)), d("pages/venues/sharecut/index onload(decode) " + (0, 
                    n.default)(t));
                } catch (t) {
                    d("pages/venues/sharecut/index onload(catch) " + (0, n.default)(a));
                }
                this.getBannerData(), this.getGoodsData(), this.setData({
                    query: a
                }), h.setGlobalData({
                    channel: "40"
                }), d("pages/venues/sharecut/index options " + (0, n.default)(a)), d("pages/venues/sharecut/index scene " + (0, 
                n.default)(a.scene));
            },
            onShow: function() {
                this.setThreshold(), h.page.show({
                    activity_sign: "sharecut",
                    query: this.data.query
                });
            },
            onReachBottom: function() {
                var a = this.data, t = a.nomore, e = a.nodata, s = a.isRequest;
                t || e || s || this.getGoodsData();
            },
            onShareAppMessage: function(a) {
                if (a) {
                    var t = a.from, e = {
                        menu: "weapp_share",
                        button: "share_button"
                    };
                    h.track({
                        fm: "share",
                        share_type: e[t],
                        activity_sign: "sharecut"
                    }), v.logger.log({
                        et: "click",
                        ei: "share",
                        en: "分享",
                        params: {
                            share_type: e[t]
                        }
                    });
                    var s = function(a) {
                        return function() {
                            h.track({
                                fm: "share_result",
                                share_type: e[t],
                                share_result: a,
                                activity_sign: "sharecut"
                            }), v.logger.log({
                                et: "click",
                                ei: "share_result",
                                en: "分享结果",
                                params: {
                                    share_type: e[t],
                                    share_result: a
                                }
                            });
                        };
                    };
                    return {
                        title: "砍到0元就可以免费拿了，快来帮我吧",
                        path: "/pages/venues/sharecut/index?is_share=1" + (h.getGlobalData().dc_ps ? "&dc_ps=" + h.getGlobalData().dc_ps : "") + (h.getGlobalData().channel ? "&channel=" + h.getGlobalData().channel : "") + (h.getGlobalData().topic ? "&topic=" + h.getGlobalData().topic : ""),
                        imageUrl: "https://img.yzcdn.cn/public_files/2018/02/07/415d948ed1fc8ca837b52bddcea0c217.png",
                        success: s("success"),
                        fail: s("fail")
                    };
                }
            },
            onPullDownRefresh: function() {
                this.resetPageData(), this.getBannerData(), this.getGoodsData(), wx.stopPullDownRefresh();
            },
            getGoodsData: function() {
                var a = this, t = this, e = this.data, s = e.page, o = e.nomore, i = e.nodata;
                this.setData({
                    isRequest: !0
                }), v.carmen({
                    api: "weapp.spotlight.goods/1.0.0/list",
                    method: "GET",
                    data: {
                        collectionId: 38,
                        categoryId: 0,
                        type: 3,
                        page: s,
                        size: 10
                    },
                    success: function(e) {
                        var n = e.paginator.total_count, c = e.items;
                        D(c, function(a) {
                            a.pic_url = _(a.pic_url, "!400x400.jpg"), a.original_price = m(100 * a.original_price).toYuan();
                        });
                        var r = t.data.goodsData;
                        if (n) 1 === s && 0 === c.length && (i = !0), 1 < s && 0 === c.length && (o = !0); else if (0 === c.length) return a.setData({
                            page: s + 1,
                            isRequest: !1
                        }), void a.getGoodsData();
                        r = r.concat(c), t.setData({
                            page: s + 1,
                            nodata: i,
                            nomore: o,
                            isRequest: !1,
                            goodsData: r
                        });
                    },
                    fail: function(t) {
                        "wx:request" === t.type && -1 < t.msg.indexOf("abort") || (a.showZanToast("网络开小差了，请下拉刷新"), 
                        d("api log: weapp.spotlight.goods/1.0.0/list(seckill goods) " + (0, n.default)(t)), 
                        a.setData({
                            isRequest: !1
                        }));
                    },
                    complete: function() {}
                });
            },
            getBannerData: function() {
                var a = this;
                v.carmen({
                    api: "weapp.spotlight.ad.unit.ad/1.0.0/list",
                    methods: "GET",
                    data: {
                        unit: "goods_cut_page",
                        category: 1
                    },
                    success: function(t) {
                        var e = [];
                        t.forEach(function(a, t) {
                            e[t] = {
                                src: a.hd_img
                            };
                        }), a.setData({
                            swiperData: e
                        });
                    },
                    fail: function(t) {
                        a.showZanToast("网络开小差了，请下拉刷新"), d("api log: weapp.spotlight.ad.unit.ad/1.0.0/list (sharecut page banner）" + (0, 
                        n.default)(t));
                    }
                });
            },
            resetPageData: function() {
                this.setData((0, o.default)({
                    swiperData: [],
                    goodsData: [],
                    nomore: !1,
                    nodata: !1,
                    page: 1,
                    isRequest: !1
                }, r.data, u.data));
            },
            doLog: function() {
                h.track({
                    act_name: "click",
                    activity_sign: "sharecut"
                }), v.logger.log({
                    et: "click",
                    ei: "nomal",
                    en: "普通点击"
                });
            }
        }, w = (0, i.default)({}, p, l, g, y, r.component, u.component);
        (0, c.default)(w);
    }
}, [ 337 ]);