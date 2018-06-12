!function(e) {
    function t(a) {
        if (o[a]) return o[a].exports;
        var n = global.installedModules[a] = o[a] = {
            i: a,
            l: !1,
            exports: {}
        };
        return e[a].call(n.exports, n, n.exports, t), n.l = !0, n.exports;
    }
    e = Object.assign(require("../../../../commons.js").modules, e);
    var o = {};
    o = global.installedModules = global.installedModules || {}, t.m = e, t.c = o, t.d = function(e, o, a) {
        t.o(e, o) || Object.defineProperty(e, o, {
            configurable: !1,
            enumerable: !0,
            get: a
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
    }, t.p = "", t(t.s = 116);
}({
    116: function(e, t, o) {
        function a(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        var n = a(o(6)), r = function(e) {
            if (e && e.__esModule) return e;
            var t = {};
            if (null != e) for (var o in e) Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o]);
            return t.default = e, t;
        }(o(1)), i = a(o(0)), s = getApp();
        (0, i.default)(r.Toast, {
            data: {
                orderNo: "",
                order: {},
                fetched: !1
            },
            onLoad: function(e) {
                var t = e.order_no;
                this.setData({
                    orderNo: t
                });
            },
            onShow: function() {
                var e = this;
                this.data.orderNo ? s.carmen({
                    api: "youzan.trade.detail/1.0.0/composite",
                    data: {
                        app: "wsc",
                        biz_group: "weapp",
                        order_no: this.data.orderNo,
                        options_with_payment_info: !0,
                        options_with_ump_info: !0
                    },
                    success: function() {
                        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, o = t.fullOrderInfo, a = void 0 === o ? {} : o, r = t.umpInfo, i = void 0 === r ? {} : r, s = a.mainOrderInfo, u = void 0 === s ? {} : s, l = a.paymentInfo, d = void 0 === l ? {} : l, c = i.goodsActivities, f = void 0 === c ? [] : c;
                        wx.setNavigationBarTitle({
                            title: u.stateDesc + "的订单"
                        }), e.setData({
                            fetched: !0,
                            order: {
                                state: u.state,
                                payTime: u.payTime,
                                showDecrease: f.length > 0,
                                activity: f,
                                shopName: u.shopName || "",
                                buyWayStr: u.buyWayDesc,
                                pay: (0, n.default)(d.pay).toYuan(),
                                realPay: (0, n.default)(d.realPay).toYuan()
                            }
                        });
                    },
                    fail: function(e) {
                        console.log("fail", e);
                    }
                }) : wx.showModal({
                    title: "提示",
                    content: "订单号不存在，请稍后再试",
                    showCancel: !1,
                    success: function() {
                        wx.navigateBack();
                    }
                });
            }
        });
    }
});