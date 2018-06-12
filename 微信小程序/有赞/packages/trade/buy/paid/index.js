!function(e) {
    function o(t) {
        if (r[t]) return r[t].exports;
        var a = global.installedModules[t] = r[t] = {
            i: t,
            l: !1,
            exports: {}
        };
        return e[t].call(a.exports, a, a.exports, o), a.l = !0, a.exports;
    }
    e = Object.assign(require("../../../../commons.js").modules, e);
    var r = {};
    r = global.installedModules = global.installedModules || {}, o.m = e, o.c = r, o.d = function(e, r, t) {
        o.o(e, r) || Object.defineProperty(e, r, {
            configurable: !1,
            enumerable: !0,
            get: t
        });
    }, o.r = function(e) {
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
    }, o.n = function(e) {
        var r = e && e.__esModule ? function() {
            return e.default;
        } : function() {
            return e;
        };
        return o.d(r, "a", r), r;
    }, o.o = function(e, o) {
        return Object.prototype.hasOwnProperty.call(e, o);
    }, o.p = "", o(o.s = 150);
}({
    150: function(e, o, r) {
        function t(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        var a = t(r(0)), n = t(r(3)), s = t(r(6)), i = getApp();
        (0, a.default)({
            data: {
                fetching: !0,
                order_no: "",
                success: !1,
                data: {},
                realPay: "",
                specialOrderType: "",
                orderSelfFetchInfo: {},
                goodsShowInfo: {},
                fission: {
                    has: !1,
                    count: 0
                }
            },
            onLoad: function(e) {
                var o = void 0;
                if (e.order_no) o = e.order_no || e.orderNo; else {
                    var r = e.dbid;
                    o = i.db.get(r).order_no;
                }
                this.setData({
                    order_no: o
                }), this.fetchOrderInfo(o), this.tryCreateFission(), wx.hideShareMenu();
            },
            onShow: function() {
                this.setData({
                    copyright: i.globalData.copyright,
                    is_big_shop: i.globalData.is_big_shop
                });
            },
            fetchOrderInfo: function(e) {
                var o = this;
                i.carmen({
                    api: "kdt.trade.buyer.search/1.0.0/get",
                    query: {
                        order_no: e
                    },
                    success: function(e) {
                        var r = e.trades[0], t = (r && r.items[0]).goods_info, a = r.buy_way + "", n = r.express_type + "";
                        o.setData({
                            goods: t,
                            buyWay: a,
                            expressType: n
                        });
                    },
                    complete: function() {
                        o.fetchOrderData();
                    }
                });
            },
            shareOrder: function() {
                wx.redirectTo({
                    url: "/packages/trade/order/share/index?order_no=" + this.data.order_no
                });
            },
            fetchOrderData: function() {
                var e = this, o = {};
                o.orderNo = this.data.order_no, o.kdtId = i.getKdtId(), wx.showToast({
                    title: "数据查询中",
                    icon: "loading",
                    duration: 1e4
                }), i.carmen({
                    api: "kdt.trade.bill/1.0.0/payResult",
                    data: {
                        orderParams: JSON.stringify(o)
                    },
                    success: function(o) {
                        if (200 !== o.code) return e.gotoOrderResult(), void wx.hideToast();
                        var r = o.data || {}, t = r.orderState > 3, a = e.data.buyWay;
                        "9" === a && (r.realPay = 0), r.realPayStr = (0, s.default)(r.realPay).toYuan();
                        var n = e.data.expressType, i = "";
                        i = "9" !== a ? t ? "支付成功" : "支付结果等待中" : "1" === n ? "已选择到店付款" : "已选择货到付款", e.setData({
                            success: t,
                            paySuccessTips: i,
                            data: r,
                            fetching: !1,
                            orderSelfFetchInfo: r.orderSelfFetchInfo,
                            goodsShowInfo: r.goodsShowInfo,
                            specialOrderType: 206 === r.goodsType ? "unicashier" : "",
                            realPay: (0, s.default)(r.realPay).toYuan()
                        }), wx.hideToast();
                    },
                    fail: function() {
                        e.gotoOrderResult(), wx.hideToast();
                    }
                });
            },
            tryCreateFission: function() {
                var e = this;
                i.request({
                    path: "/wscump/targeted-marketing/fission/create.json",
                    query: {
                        order_no: this.data.order_no
                    }
                }).then(function(o) {
                    o && o.id > 0 && e.setData({
                        fission: {
                            has: !0,
                            count: o.quantity
                        }
                    });
                }).catch(function(e) {
                    console.log(e);
                });
            },
            gotoOrderResult: function() {
                if (20 == this.data.data.goodsType) return wx.showLoading({
                    title: "努力加载中"
                }), void i.carmen({
                    api: "kdt.trade.buyer.search/1.0.0/get",
                    data: {
                        order_no: this.data.order_no
                    },
                    success: function(o) {
                        wx.hideLoading();
                        var r = o.trades[0].items[0];
                        e = "/packages/card/detail/index?goods_id=" + r.goods_id, wx.redirectTo({
                            url: e
                        });
                    },
                    fail: function(e) {
                        console.log("fail", e);
                    }
                });
                var e = "/packages/trade/order/result/index?dbid=" + i.db.set({
                    type: "order",
                    order_no: this.data.order_no
                });
                "unicashier" == this.data.specialOrderType && (e = "/packages/trade/order/unicashier-result/index?order_no=" + this.data.order_no), 
                wx.redirectTo({
                    url: e
                });
            },
            gotoPrevMiniProgram: function() {
                wx.navigateBackMiniProgram({
                    extraData: {
                        order_no: this.data.order_no
                    }
                });
            },
            gotoVerifyTicketCodePage: function() {
                n.default.navigate({
                    url: "/packages/trade/cert/verify-ticket/index?order_no=" + this.data.order_no
                });
            },
            gotoHomePage: function() {
                n.default.switchTab({
                    url: "/pages/home/dashboard/index"
                });
            },
            fissionClose: function() {
                this.setData({
                    "fission.has": !1
                });
            },
            onShareAppMessage: function(e) {
                var o = this.data.order_no, r = "/packages/ump/fission/index?order_no=" + o, t = "/packages/ump/fission/index?shareback=1&sharer=1&order_no=" + o;
                return console.log("orderNo---", o), console.log("sharePath---", r), {
                    title: "送你优惠券，一起买买买",
                    imageUrl: "https://img.yzcdn.cn/public_files/2018/02/08/36ea4b2bb74588099d5f8863dfd6ff3d.png",
                    path: r,
                    success: function(e) {
                        console.log("--share success-- ", e), wx.navigateTo({
                            url: t,
                            success: function(e) {
                                console.log("--navigate success-- ", e);
                            },
                            fail: function(e) {
                                console.log("--navigate fail-- ", e);
                            }
                        });
                    },
                    fail: function(e) {
                        console.log("--share fail-- ", e);
                    }
                };
            }
        });
    }
});