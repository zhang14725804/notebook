!function(t) {
    function e(a) {
        if (o[a]) return o[a].exports;
        var n = global.installedModules[a] = o[a] = {
            i: a,
            l: !1,
            exports: {}
        };
        return t[a].call(n.exports, n, n.exports, e), n.l = !0, n.exports;
    }
    t = Object.assign(require("../../../../commons.js").modules, t), t = Object.assign(require("../../../../vendors.js").modules, t);
    var o = {};
    o = global.installedModules = global.installedModules || {}, e.m = t, e.c = o, e.d = function(t, o, a) {
        e.o(t, o) || Object.defineProperty(t, o, {
            configurable: !1,
            enumerable: !0,
            get: a
        });
    }, e.r = function(t) {
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
    }, e.n = function(t) {
        var o = t && t.__esModule ? function() {
            return t.default;
        } : function() {
            return t;
        };
        return e.d(o, "a", o), o;
    }, e.o = function(t, e) {
        return Object.prototype.hasOwnProperty.call(t, e);
    }, e.p = "", e(e.s = 172);
}({
    172: function(t, e, o) {
        var a, n = Object.assign || function(t) {
            for (var e = 1; e < arguments.length; e++) {
                var o = arguments[e];
                for (var a in o) Object.prototype.hasOwnProperty.call(o, a) && (t[a] = o[a]);
            }
            return t;
        }, s = (a = o(0)) && a.__esModule ? a : {
            default: a
        }, i = o(5), r = o(20), u = o(14), d = o(2), l = o(10), c = getApp();
        (0, s.default)(u, r, {
            data: {
                page: 1,
                themeClass: c.themeClass,
                loading: !1,
                needLoadMore: !0,
                themeInfo: {
                    type: "goods",
                    size: "1",
                    size_type: "0",
                    title: "1",
                    price: "1",
                    image_fill_style: "1",
                    buy_btn_type: "1",
                    buy_btn: "1"
                },
                productList: null
            },
            onLoad: function(t) {
                var e = this;
                this.request = l(c), this.fetchProductList().then(function() {
                    e.showShowcaseComponents([ n({}, e.data.themeInfo, {
                        goods: e.data.productList || []
                    }) ], 3);
                }), c.on("component:sku:cart", function(t) {
                    "add" == t.type && (e.setData({
                        cartCount: ++e.data.cartCount
                    }), e.showZanToast("已成功添加到购物车"));
                }, this);
            },
            onShow: function() {
                var t = c.globalData, e = t.copyright, o = t.is_big_shop;
                this.setData({
                    copyright: e,
                    is_big_shop: o
                });
            },
            onReachBottom: function() {
                var t = this.data, e = (t.needLoadMore, t.loading);
                (this.data.needLoadMore || e) && this.fetchProductList();
            },
            fetchProductList: function() {
                var t = this, e = this.data.loading, o = this.data.page;
                if (!e) return wx.showToast({
                    title: "加载中",
                    icon: "loading"
                }), this.setData({
                    loading: !0
                }), this.request({
                    path: "/wscshop/weapp/goods/allgoods.json",
                    data: {
                        page: o,
                        pageSize: 10
                    }
                }).then(function(e) {
                    e = e || [];
                    var a = t.data.productList, n = 1 == o ? [] : a;
                    i(e, function(t) {
                        t.price = parseFloat(t.price / 100).toFixed(2), t.image_url || (t.image_url = "/upload_files/no_pic.png"), 
                        t.image_url = d(t.image_url, "!300x300.jpg"), n.push(t);
                    }), 10 === e.length ? (o++, t.setData({
                        page: o,
                        needLoadMore: !0
                    })) : t.setData({
                        needLoadMore: !1
                    }), t.setData({
                        productList: n,
                        "theme.feature[0].list": n
                    });
                }).catch(function(e) {
                    t.showZanToast(e.msg || "没有找到商品哦～");
                }).then(function() {
                    wx.hideToast(), t.setData({
                        loading: !1
                    });
                });
            },
            showcaseHandleGoodsBuy: function(t) {
                this.showComponentSKU({
                    alias: t.currentTarget.dataset.alias,
                    needFetch: !0,
                    btns: [ "cart", "buy" ]
                });
            }
        });
    }
});