!function() {
    require("./../../../common.js"), wx.webpackJsonp.apply(null, arguments);
}([ 43 ], {
    288: function(t, a, e) {
        var o = function(t) {
            return t && t.__esModule ? t : {
                default: t
            };
        }(e(1)), n = getApp(), s = e(3), i = e(11), c = e(6), r = e(107), d = e(69), u = (e(8), 
        e(0));
        (0, o.default)(s({}, d, r, {
            data: {
                products: null,
                inputvalue: "",
                keyword: "",
                page: 1,
                loading: !1,
                needLoadMore: !1
            },
            onLoad: function() {
                var t = this;
                n.on("component:sku:cart", function(a) {
                    "add" == a.type && t.showZanToast("添加购物车成功~");
                }, this);
            },
            onShow: function() {
                u.page.show(), this.setData({
                    copyright: n.globalData.copyright,
                    is_big_shop: n.globalData.is_big_shop
                });
            },
            onReachBottom: function() {
                this.data.needLoadMore && this.fetchProductList();
            },
            searchBegin: function() {
                this.setData({
                    products: null,
                    page: 1,
                    needLoadMore: !1
                });
            },
            searchDone: function(t) {
                return this.setData({
                    keyword: t.value,
                    page: 1
                }), 0 == this.data.keyword.length ? void this.setData({
                    products: []
                }) : void this.fetchProductList();
            },
            searchCancel: function() {
                wx.navigateBack({});
            },
            onShareAppMessage: function() {},
            fetchProductList: function() {
                var t = this, a = this.data.keyword.replace(/\s+/g, ""), e = this.data.page;
                0 == a.length || this.data.loading || (wx.showToast({
                    title: "加载中",
                    icon: "loading"
                }), this.setData({
                    loading: !0
                }), n.carmen({
                    api: "weapp.wsc.search.items/1.0.0/get",
                    query: {
                        page_size: 20,
                        page: e,
                        keyword: a
                    },
                    success: function(a) {
                        a = a || [];
                        var o = 1 == t.data.page ? [] : t.data.products || [];
                        i(a, function(t) {
                            t.price = parseFloat(t.price / 100).toFixed(2), t.imageUrl || (t.imageUrl = "/upload_files/no_pic.png"), 
                            t.imageUrl = c(t.imageUrl, "!300x300.jpg"), o.push(t);
                        }), 20 == a.length ? (e++, t.setData({
                            page: e,
                            needLoadMore: !0
                        })) : t.setData({
                            needLoadMore: !1
                        }), t.setData({
                            products: o
                        });
                    },
                    fail: function(a) {
                        t.showZanToast(a.msg || "没有找到商品哦～");
                    },
                    complete: function() {
                        wx.hideToast(), t.setData({
                            loading: !1
                        });
                    }
                }));
            },
            tapCart: function(t) {
                var a = t.currentTarget.dataset.alias;
                this.showComponentSKU({
                    alias: a,
                    needFetch: !0,
                    btns: [ "cart", "buy" ]
                });
            }
        }));
    }
}, [ 288 ]);