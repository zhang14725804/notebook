!function() {
    require("./../../../common.js"), wx.webpackJsonp.apply(null, arguments);
}([ 32 ], {
    306: function(t, o, e) {
        function a(t) {
            return t && t.__esModule ? t : {
                default: t
            };
        }
        var d = a(e(4)), r = a(e(1)), i = e(15), n = e(0), s = e(3), c = getApp(), u = e(8), l = e(104);
        (0, r.default)(s({}, l, u.Toast, {
            data: {
                fetching: !0,
                order_no: "",
                success: !1,
                data: {},
                realPay: "",
                orderSelfFetchInfo: {},
                goodsShowInfo: {},
                kdtId: "",
                bindTips: "微信公众号搜索并关注“有赞精选” 第一时间了解订单物流"
            },
            onLoad: function(t) {
                var o = t.dbid, e = c.db.get(o), a = e.order_no, d = e.kdtId;
                this.setData({
                    order_no: a,
                    kdtId: d
                }), this.fetchOrderData();
            },
            onShow: function() {
                n.page.show({
                    kdtId: this.data.kdtId
                }), this.setData({
                    copyright: c.globalData.copyright,
                    is_big_shop: c.globalData.is_big_shop
                });
            },
            fetchOrderData: function() {
                var t = this, o = {};
                o.orderNo = this.data.order_no, o.kdtId = this.data.kdtId, wx.showToast({
                    title: "数据查询中",
                    icon: "loading",
                    duration: 1e4
                }), c.carmen({
                    api: "kdt.trade.bill/1.0.0/payResult",
                    data: {
                        orderParams: (0, d.default)(o)
                    },
                    success: function(o) {
                        if (200 !== o.code) return t.gotoOrderResult(), void wx.hideToast();
                        var e = o.data || {}, a = 3 < e.orderState;
                        e.realPayStr = i(e.realPay).toYuan(), t.setData({
                            success: a,
                            data: e,
                            fetching: !1,
                            orderSelfFetchInfo: e.orderSelfFetchInfo,
                            goodsShowInfo: e.goodsShowInfo,
                            realPay: i(e.realPay).toYuan()
                        }), wx.hideToast();
                    },
                    fail: function() {
                        t.gotoOrderResult(), wx.hideToast();
                    }
                });
            },
            gotoOrderResult: function() {
                var t = c.db.set({
                    type: "order",
                    order_no: this.data.order_no,
                    kdtId: this.data.kdtId
                });
                wx.redirectTo({
                    url: "/pages/trade/result/index?dbid=" + t
                });
            },
            gotoHomePage: function() {
                wx.switchTab({
                    url: "/page/venue/home/index"
                });
            },
            gotoGrouponPage: function() {
                wx.redirectTo({
                    url: "/pages/venue/activity/index?category_id=0&collection_id=13"
                });
            }
        }));
    }
}, [ 306 ]);