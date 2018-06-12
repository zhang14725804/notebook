var t = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
};

!function(t) {
    function e(n) {
        if (a[n]) return a[n].exports;
        var o = global.installedModules[n] = a[n] = {
            i: n,
            l: !1,
            exports: {}
        };
        return t[n].call(o.exports, o, o.exports, e), o.l = !0, o.exports;
    }
    t = Object.assign(require("../../../commons.js").modules, t), t = Object.assign(require("../../../vendors.js").modules, t);
    var a = {};
    a = global.installedModules = global.installedModules || {}, e.m = t, e.c = a, e.d = function(t, a, n) {
        e.o(t, a) || Object.defineProperty(t, a, {
            configurable: !1,
            enumerable: !0,
            get: n
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
    }, e.p = "", e(e.s = 157);
}({
    157: function(e, a, n) {
        function o(t) {
            return t && t.__esModule ? t : {
                default: t
            };
        }
        function i() {
            console.warn("-- page -- success"), wx.showToast({
                title: "购买成功",
                icon: "success",
                duration: 1500,
                success: function() {
                    wx.setStorageSync(l.REFRESH_KEY, "true"), wx.navigateBack();
                }
            });
        }
        var s = "function" == typeof Symbol && "symbol" == t(Symbol.iterator) ? function(e) {
            return void 0 === e ? "undefined" : t(e);
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : void 0 === e ? "undefined" : t(e);
        }, r = o(n(0)), c = function(t) {
            if (t && t.__esModule) return t;
            var e = {};
            if (null != t) for (var a in t) Object.prototype.hasOwnProperty.call(t, a) && (e[a] = t[a]);
            return e.default = t, e;
        }(n(1)), l = n(17), u = o(n(33)), d = o(n(34)), p = getApp();
        (0, r.default)(c.Tab, u.default, {
            data: {
                id: "",
                alias: "",
                price: 0,
                title: "",
                summary: "",
                contentsCount: 0,
                isColumn: !1,
                fetched: !1,
                $cashier: {
                    password: "",
                    loaded: !1,
                    show: !1,
                    componentId: "cashier",
                    cancelText: "关闭",
                    showPassword: !1,
                    actions: []
                },
                payData: {}
            },
            onLoad: function(t) {
                var e = t.type, a = void 0 === e ? "content" : e, n = t.alias, o = void 0 === n ? "" : n, i = "column" === a;
                wx.setNavigationBarTitle({
                    title: i ? "购买专栏" : "购买内容"
                }), this.setData({
                    alias: o,
                    isColumn: i
                }), this.fetchData(o, i), this.pay = new d.default();
            },
            onShow: function() {
                this.setData({
                    copyright: p.globalData.copyright,
                    is_big_shop: p.globalData.is_big_shop
                });
            },
            fetchData: function(t, e) {
                var a = this;
                wx.showLoading({
                    title: "加载中"
                });
                var n = e ? "youzan.owl.column.detail/1.0.0/get" : "youzan.owl.content.detail/1.0.0/get";
                p.carmen({
                    api: n,
                    method: "POST",
                    data: {
                        alias: t
                    },
                    success: function(t) {
                        if (!t || !t.alias) return wx.showToast({
                            title: "获取购买详情失败",
                            icon: "none"
                        });
                        a.parseData(t), a.setData({
                            fetched: !0
                        });
                    },
                    fail: function() {
                        wx.showToast({
                            title: "获取购买详情失败",
                            icon: "none"
                        });
                    },
                    complete: function() {
                        wx.hideLoading();
                    }
                });
            },
            parseData: function(t) {
                this.setData({
                    id: t.id,
                    alias: t.alias,
                    title: t.title || "",
                    summary: t.summary || "",
                    originPrice: t.price,
                    price: (0, l.parsePrice)(t.price),
                    contentsCount: t.contentsCount || 0,
                    cover: t.picture.cover,
                    mediaType: t.mediaType,
                    time: (0, l.parseTime)(t.publishAt, !0)
                });
            },
            buyClick: function() {
                if (this.$paying) return wx.showToast({
                    title: "正在调起收银台",
                    icon: "none"
                });
                var t = this.data, e = t.alias, a = t.isColumn;
                e && (this.$paying = !0, wx.showLoading({
                    title: "加载中"
                }), this.createOrder(e, a).then(this.pay.getPayWays.bind(this.pay)).then(this.openCashier.bind(this)).catch(function(t) {
                    "object" === (void 0 === t ? "undefined" : s(t)) && t.isZero && i();
                }));
            },
            createOrder: function(t, e) {
                var a = this;
                return new Promise(function(n, o) {
                    if (a.data.payData.prepay_id) return a.onOrderCreated(), n(a.data.payData);
                    p.carmen({
                        method: "POST",
                        api: "youzan.owl.subscription/1.0.0/get",
                        data: {
                            alias: t,
                            type: e ? "column" : "content"
                        },
                        success: function(t) {
                            var e = t.tradeCreateResponse || {};
                            e.zeroOrder && o({
                                isZero: !0
                            });
                            var i = e.prePaymentPreparationDTO || {}, s = {
                                cashier_salt: i.cashierSalt,
                                cashier_sign: i.cashierSign,
                                partner_id: i.partnerId,
                                prepay_id: i.prepayId
                            };
                            a.setData({
                                payData: s
                            }), n(s);
                        },
                        fail: function() {
                            wx.showToast({
                                title: "下单失败",
                                icon: "none"
                            }), o();
                        },
                        complete: a.onOrderCreated.bind(a)
                    });
                });
            },
            onOrderCreated: function() {
                this.$paying = !1, wx.hideLoading();
            },
            openCashier: function(t) {
                if (this.pay.setCashierData(this.data.payData, "", !0), !t || 0 === t.length) return wx.showToast({
                    title: "支付方式列表为空"
                });
                1 === t.length ? this.$cashierClick({
                    pay_channel: t[0].pay_channel
                }, {
                    value_card_no: t[0].value_card_no || ""
                }) : this.setData({
                    "$cashier.actions": t,
                    "$cashier.show": !0,
                    "$cashier.loaded": !0
                });
            },
            $cashierClick: function(t, e) {
                var a = this;
                this.pay.doPayAction(t, e).then(i).catch(function(t) {
                    var e = t.msg, n = t.type;
                    console.warn(e, n), "need_password" === n ? a.setData({
                        "$cashier.showPassword": !0
                    }) : "cancel" !== n && "adjust_price" !== n ? a.showZanToast(e || "网络抖了下，再点下试试~") : a.showZanToast(e || " ");
                });
            },
            $cashierCancel: function() {
                this.setData({
                    "$cashier.show": !1
                });
            }
        });
    }
});