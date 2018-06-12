!function(e) {
    function t(r) {
        if (o[r]) return o[r].exports;
        var n = global.installedModules[r] = o[r] = {
            i: r,
            l: !1,
            exports: {}
        };
        return e[r].call(n.exports, n, n.exports, t), n.l = !0, n.exports;
    }
    e = Object.assign(require("../../../../commons.js").modules, e);
    var o = {};
    o = global.installedModules = global.installedModules || {}, t.m = e, t.c = o, t.d = function(e, o, r) {
        t.o(e, o) || Object.defineProperty(e, o, {
            configurable: !1,
            enumerable: !0,
            get: r
        });
    }, t.r = function(e) {
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
    }, t.n = function(e) {
        var o = e && e.__esModule ? function() {
            return e.default;
        } : function() {
            return e;
        };
        return t.d(o, "a", o), o;
    }, t.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t);
    }, t.p = "", t(t.s = 117);
}({
    117: function(e, t, o) {
        var r, n = (r = o(0)) && r.__esModule ? r : {
            default: r
        };
        o(4);
        var a = getApp(), s = {
            data: {
                themeClass: a.themeClass
            },
            onReady: function() {
                var e = this;
                a.getShopInfo().then(function() {
                    e.setData({
                        shop: a.globalData.shopInfo,
                        copyright: a.globalData.copyright,
                        is_big_shop: a.globalData.is_big_shop
                    });
                });
            },
            onLoad: function(e) {
                this.setData(e), this.fetchOrderInfo(e.order_no);
            },
            onShareAppMessage: function() {
                return {
                    path: "packages/trade/order/share/index?order_no=" + this.data.order_no + "&is_share=1",
                    title: this.data.goods[0].title,
                    imageUrl: this.data.goods[0].img_url
                };
            },
            fetchOrderInfo: function(e) {
                var t = this;
                a.carmen({
                    api: "kdt.trade.buyer.search/1.0.0/get",
                    query: {
                        order_no: e
                    },
                    success: function(e) {
                        var o = e.trades[0].items.map(function(e) {
                            var t = e.goods_info, o = e.price, r = e.shop_info, n = e.goods_type;
                            return t.price = o, t.shop = r.shop_name, t.goods_type = n, t;
                        });
                        t.setData({
                            goods: o
                        });
                    },
                    fail: function() {
                        console.log(222);
                    }
                });
            }
        };
        (0, n.default)(s);
    }
});