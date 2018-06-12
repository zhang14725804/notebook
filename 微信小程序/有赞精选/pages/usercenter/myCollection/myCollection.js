!function() {
    require("./../../../common.js"), wx.webpackJsonp.apply(null, arguments);
}([ 20 ], {
    275: function(a, t, e) {
        function o(a) {
            return a && a.__esModule ? a : {
                default: a
            };
        }
        var s = o(e(2)), n = o(e(1)), i = e(44), r = e(0), h = getApp(), p = (0, s.default)({}, {
            data: {
                goodsList: [],
                once: !0,
                page: 0,
                loading: !1,
                nomore: !1,
                nodata: !1,
                loadFail: !1,
                clickInterface: {
                    clickInterface: "refreshData"
                },
                icon_network_error: "../../../resources/icon/ic_network_error.png",
                showToast: !1,
                error_msg: ""
            },
            onLoad: function() {
                i(this);
                var a = this;
                h.on("onTokenRefresh", function() {
                    console.log("on Token refresh"), a.refreshData();
                }), h.getToken() && this.refreshData();
            },
            onShow: function() {
                r.page.show();
            },
            refreshData: function() {
                this.setData({
                    page: 0,
                    nomore: !1,
                    loadFail: !1,
                    loading: !0,
                    goodsList: []
                }), this.getShopList();
            },
            handleScrollToLower: function() {
                this.data.loading || this.data.nomore || this.data.nodata || this.getShopList();
            },
            getShopList: function() {
                var a = this, t = this, e = this.data.page;
                this.setData({
                    loading: !0
                }), h.carmen({
                    api: "weapp.spotlight.favorite.shop/1.0.0/search",
                    method: "GET",
                    data: {
                        page: e,
                        page_size: 6
                    },
                    success: function(e) {
                        if (e.items) {
                            t.setData({
                                loadFail: !1
                            });
                            for (var o = e.items, s = (e.paginator.page + 1) * e.paginator.page_size >= e.paginator.total_count, n = t.data.goodsList, i = t.data.page, r = 0; r < o.length; r++) {
                                var h = o[r], p = a.parseShopCert(h);
                                h.cer = p, n.push(h);
                            }
                            o = n, t.setData({
                                nomore: s,
                                page: i + 1,
                                goodsList: o
                            });
                        } else e.data.error_response && 0 == (n = t.data.goodsList).length && t.setData({
                            loadFail: !0
                        });
                    },
                    fail: function(e) {
                        console.log("load fail"), console.log(e), 0 == t.data.goodsList.length && (a.data.once ? (a.refreshData(), 
                        t.setData({
                            once: !1
                        })) : t.setData({
                            loadFail: !0
                        }));
                    },
                    complete: function() {
                        wx.stopPullDownRefresh(), t.setData({
                            loading: !1
                        });
                    }
                });
            },
            onGoodTap: function(a) {
                var t = a.currentTarget.dataset.alias, e = a.currentTarget.dataset.shopname;
                wx.redirectTo({
                    url: "../../goods/detail/index?alias=" + t + "&teamName=" + e
                });
            },
            itemClick: function(a) {
                var t = a.currentTarget.dataset.itemIndex, e = this.data.goodsList[t];
                wx.navigateTo({
                    url: "../shopSelection/shopSelection?kdtId=" + e.kdt_id
                });
            },
            parseShopCert: function(a) {
                var t = [], e = parseInt(a.cert_type);
                return 1 === e ? t.push("网店") : 2 === e ? t.push("企业认证") : 3 === e ? t.push("个人认证") : 4 === e ? t.push("个人认证") : 6 === e ? t.push("旗舰店认证") : 7 === e ? t.push("专卖店认证") : 8 === e ? t.push("直营店认证") : 9 === e ? t.push("专营店认证") : 10 === e ? t.push("组织认证") : 11 === e && t.push("普通店认证"), 
                1 === a.secured_transactions && t.push("担保交易"), 1 === a.team_physical && t.push("线下门店"), 
                t;
            }
        });
        (0, n.default)(p);
    }
}, [ 275 ]);