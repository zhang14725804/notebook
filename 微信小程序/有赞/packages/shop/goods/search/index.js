!function(t) {
    function e(o) {
        if (a[o]) return a[o].exports;
        var n = global.installedModules[o] = a[o] = {
            i: o,
            l: !1,
            exports: {}
        };
        return t[o].call(n.exports, n, n.exports, e), n.l = !0, n.exports;
    }
    t = Object.assign(require("../../../../commons.js").modules, t), t = Object.assign(require("../../../../vendors.js").modules, t);
    var a = {};
    a = global.installedModules = global.installedModules || {}, e.m = t, e.c = a, e.d = function(t, a, o) {
        e.o(t, a) || Object.defineProperty(t, a, {
            configurable: !1,
            enumerable: !0,
            get: o
        });
    }, e.r = function(t) {
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
    }, e.n = function(t) {
        var a = t && t.__esModule ? function() {
            return t.default;
        } : function() {
            return t;
        };
        return e.d(a, "a", a), a;
    }, e.o = function(t, e) {
        return Object.prototype.hasOwnProperty.call(t, e);
    }, e.p = "", e(e.s = 167);
}({
    167: function(t, e, a) {
        var o, n = (o = a(0)) && o.__esModule ? o : {
            default: o
        }, s = a(5), i = a(2), r = a(14), c = getApp();
        (0, n.default)(r, {
            data: {
                products: null,
                inputvalue: "",
                keyword: "",
                page: 1,
                loading: !1,
                needLoadMore: !1,
                themeClass: c.themeClass
            },
            onLoad: function(t) {
                var e = this;
                c.on("component:sku:cart", function(t) {
                    "add" == t.type && e.showZanToast("添加购物车成功~");
                }, this), t.q && (console.log("search keyword:", t.q), this.setData({
                    keyword: t.q,
                    inputvalue: t.q
                }), this.fetchProductList());
            },
            onShow: function() {
                this.setData({
                    copyright: c.globalData.copyright,
                    is_big_shop: c.globalData.is_big_shop
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
            searchChange: function(t) {
                this.setData({
                    inputvalue: t.detail.value
                });
            },
            searchDone: function(t) {
                this.setData({
                    keyword: t.detail.value,
                    page: 1
                }), 0 != this.data.keyword.length ? this.fetchProductList() : this.setData({
                    products: []
                });
            },
            searchCancel: function() {
                wx.navigateBack();
            },
            onShareAppMessage: function() {
                return {
                    title: "商品搜索"
                };
            },
            fetchProductList: function() {
                var t = this, e = this.data.keyword.replace(/\s+/g, ""), a = this.data.page;
                0 == e.length || this.data.loading || (wx.showToast({
                    title: "加载中",
                    icon: "loading"
                }), this.setData({
                    loading: !0
                }), c.carmen({
                    api: "weapp.wsc.search.items/1.0.0/get",
                    query: {
                        page_size: 20,
                        page: a,
                        keyword: e
                    },
                    success: function(e) {
                        e = e || [];
                        var o = 1 == t.data.page ? [] : t.data.products || [];
                        s(e, function(t) {
                            t.price = parseFloat(t.price / 100).toFixed(2), t.imageUrl || (t.imageUrl = "/upload_files/no_pic.png"), 
                            t.imageUrl = i(t.imageUrl, "!300x300.jpg"), o.push(t);
                        }), 20 == e.length ? (a++, t.setData({
                            page: a,
                            needLoadMore: !0
                        })) : t.setData({
                            needLoadMore: !1
                        }), t.setData({
                            products: o
                        });
                    },
                    fail: function(e) {
                        t.showZanToast(e.msg || "没有找到商品哦～");
                    },
                    complete: function() {
                        wx.hideToast(), t.setData({
                            loading: !1
                        });
                    }
                }));
            },
            tapCart: function(t) {
                var e = t.currentTarget.dataset.alias;
                this.showComponentSKU({
                    alias: e,
                    needFetch: !0,
                    btns: [ "cart", "buy" ]
                });
            }
        });
    }
});