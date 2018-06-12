!function(e) {
    function t(i) {
        if (a[i]) return a[i].exports;
        var r = global.installedModules[i] = a[i] = {
            i: i,
            l: !1,
            exports: {}
        };
        return e[i].call(r.exports, r, r.exports, t), r.l = !0, r.exports;
    }
    e = Object.assign(require("../../../commons.js").modules, e), e = Object.assign(require("../../../vendors.js").modules, e);
    var a = {};
    a = global.installedModules = global.installedModules || {}, t.m = e, t.c = a, t.d = function(e, a, i) {
        t.o(e, a) || Object.defineProperty(e, a, {
            configurable: !1,
            enumerable: !0,
            get: i
        });
    }, t.r = function(e) {
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
    }, t.n = function(e) {
        var a = e && e.__esModule ? function() {
            return e.default;
        } : function() {
            return e;
        };
        return t.d(a, "a", a), a;
    }, t.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t);
    }, t.p = "", t(t.s = 218);
}({
    218: function(e, t, a) {
        function i(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        function r(e, t, a) {
            return t in e ? Object.defineProperty(e, t, {
                value: a,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = a, e;
        }
        var o = i(a(0)), n = i(a(6)), s = i(a(13)), c = i(a(1)), u = i(a(34)), d = i(a(33)), l = getApp(), h = /^(￥)?(\d*(\.\d{0,2})?)?$/;
        (0, o.default)(c.default.Field, c.default.Toast, d.default, {
            data: {
                $cashier: {
                    actions: [],
                    show: !1,
                    componentId: "cashier"
                },
                orderNo: "",
                qrcodeId: "",
                totalPrice: {
                    error: !1,
                    value: 0,
                    previousValue: "",
                    config: {
                        title: "消费总额",
                        placeholder: "询问收银员后输入",
                        mode: "wrapped",
                        right: !0,
                        focus: !0,
                        inputType: "digit",
                        componentId: "totalPrice"
                    }
                },
                excludePrice: {
                    error: !1,
                    value: 0,
                    previousValue: "",
                    config: {
                        title: "不参与优惠金额",
                        placeholder: "询问收银员后输入",
                        mode: "wrapped",
                        right: !0,
                        inputType: "digit",
                        componentId: "excludePrice"
                    }
                },
                ump: {
                    activityId: 0,
                    show: !1,
                    start: 0,
                    present: "",
                    desc: "",
                    reduceQuota: 0,
                    limitQuota: 0,
                    discount: 10,
                    canRepeat: !1,
                    reduce: 0
                },
                showExcludePrice: !1
            },
            onLoad: function(e) {
                var t = this, a = e.qrcode_id;
                this.setData({
                    qrcodeId: a
                }), this.payConstructor = new u.default(), l.carmen({
                    api: "youzan.ump.scanreduce.byqrcode/1.0.0/get",
                    data: {
                        qrcode_id: a
                    },
                    success: function(e) {
                        t.setData({
                            ump: {
                                show: 0 === e.meet_quota,
                                desc: e.desc,
                                activityId: e.activity_id,
                                start: e.meet_quota,
                                reduceQuota: e.reduce_quota,
                                limitQuota: e.limit_quota,
                                discount: e.discount,
                                present: e.present,
                                canRepeat: e.can_repeat
                            }
                        }), t.calculateRealPay();
                    },
                    fail: function() {}
                }), l.getShopInfo().then(function(e) {
                    wx.setNavigationBarTitle({
                        title: (e.shop_name || "") + "正在向您收款"
                    });
                });
            },
            handleZanFieldChange: function(e) {
                var t = e.detail, a = void 0 === t ? {} : t, i = e.componentId, r = a.value, o = void 0;
                switch (i) {
                  case "totalPrice":
                    o = this.handlePriceChange(r, "totalPrice");
                    break;

                  case "excludePrice":
                    o = this.handlePriceChange(r, "excludePrice");
                }
                return this.calculateRealPay(), o;
            },
            switchExcludePrice: function() {
                var e = !this.data.showExcludePrice, t = this.data.excludePrice.value;
                e || (t = 0), this.setData({
                    "excludePrice.value": t,
                    showExcludePrice: e
                }), this.calculateRealPay();
            },
            sumbitTap: function() {
                var e = this;
                if (!this.data.totalPrice.value) return this.setData({
                    "totalPrice.error": !0
                }), void this.showZanToast("请填写消费总额");
                if (this.data.totalPrice.error) this.showZanToast("请输入正确的消费总额"); else if (this.data.showExcludePrice && this.data.excludePrice.error) this.showZanToast("请输入正确的不参与优惠金额"); else if (this.isSubmitting) this.showZanToast("支付进行中，请稍后再试"); else {
                    this.isSubmitting = !0;
                    var t = this.data.ump || {};
                    wx.showToast({
                        title: "请求中",
                        icon: "loading",
                        duration: 1e4
                    }), l.carmen({
                        api: "youzan.trade.business.qrcode/3.0.0/create",
                        method: "POST",
                        header: {
                            "content-type": "application/x-www-form-urlencoded"
                        },
                        data: {
                            trade_params: JSON.stringify({
                                QrShopInfoDTO: {
                                    kdtId: l.getKdtId()
                                },
                                qrPaymentInfo: {
                                    totalPrice: this.data.totalPrice.value,
                                    canNotUsePromotionAmount: this.data.excludePrice.value
                                },
                                qrId: this.data.qrcodeId,
                                bookKey: s.default.makeRandomString(10) + new Date().getTime(),
                                activityId: t.show ? t.activityId : ""
                            })
                        },
                        success: function() {
                            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                            wx.hideToast();
                            var a = t.preparePayResultDTO, i = t.orderResultDTOGroup, r = void 0 === i ? {} : i, o = t.newPrePayResult, n = void 0 === o ? {} : o, s = t.prepay, c = void 0 !== s && s, u = t.prepaySuccess, d = void 0 !== u && u, l = c ? n : a;
                            if (Object.assign(l, {
                                bizExt: a.bizExt || ""
                            }), console.log(a), e.payConstructor.setPrepayMode(c), c && !d) return wx.showToast({
                                title: "支付失败，请稍后再试",
                                icon: "none",
                                duration: 2e3
                            }), void (e.isSubmitting = !1);
                            e.setData({
                                orderNo: r[0].orderNo,
                                newPrePayResult: n
                            }), c && a.zeroOrder || !c && 0 === a.payAmount ? e.redirectToSuccess() : e.doPay(l);
                        },
                        fail: function(t) {
                            var a = t.msg, i = void 0 === a ? "订单创建失败，请稍后再试" : a;
                            wx.hideToast(), e.showZanToast(i), e.isSubmitting = !1;
                        }
                    });
                }
            },
            handlePriceChange: function() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "", t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "totalPrice", a = this.validateAndSetPrice(e, t), i = (this.data.excludePrice || {}).value, o = (this.data.totalPrice || {}).value;
                return this.setData(Object.assign({
                    "totalPrice.error": !1,
                    "excludePrice.error": !1
                }, r({}, t + ".error", i > o))), a;
            },
            validateAndSetPrice: function(e, t) {
                var a, i;
                if (!e || "." === e) return this.setData((r(i = {}, t + ".value", 0), r(i, t + ".previousValue", ""), 
                r(i, t + ".error", !1), i)), "";
                var o = e.match(h);
                if (!o) return this.data[t].previousValue;
                var s = o[2], c = (0, n.default)(s).toCent(), u = s ? "￥" + s : "";
                return c.toString().length > 10 ? this.data[t].previousValue : (this.setData((r(a = {}, t + ".value", c), 
                r(a, t + ".previousValue", u), r(a, t + ".error", !1), a)), u);
            },
            calculateRealPay: function() {
                var e = this.data.totalPrice.value - this.data.excludePrice.value;
                this.isShowUmp(e) ? this.setData({
                    "ump.show": !0
                }) : this.setData({
                    "ump.show": !1
                });
            },
            isShowUmp: function(e) {
                var t = this.data.ump, a = t.start;
                return t.activityId > 0 && e >= a;
            },
            redirectToSuccess: function() {
                wx.redirectTo({
                    url: "/packages/trade/buy/paid/index?order_no=" + this.data.orderNo
                });
            },
            doPay: function(e) {
                var t = this;
                wx.showToast({
                    title: "请求中",
                    icon: "loading",
                    duration: 1e4
                }), this.payConstructor.createCashierOrder(e).then(function() {
                    return t.openCashier(function() {
                        wx.hideToast();
                    });
                });
            },
            openCashier: function(e) {
                var t = this, a = this.data.newPrePayResult, i = a.cashierSalt, r = a.cashierSign, o = a.partnerId, n = a.prepayId;
                return this.payConstructor.getPayWays({
                    partner_id: o,
                    prepay_id: n,
                    cashier_sign: r,
                    cashier_salt: i
                }).then(function(a) {
                    if (!a || 0 === a.length) return console.warn("支付方式列表为空"), "function" == typeof e && e(), 
                    void t.showZanToast("暂无可用支付方式，请联系商家开启更多支付方式");
                    if ("function" == typeof e && e(), 1 === a.length) {
                        var i = a[0] || {};
                        i.available ? t.$cashierClick({
                            pay_channel: i.pay_channel,
                            pay_channel_name: i.pay_channel_name
                        }) : t.setData({
                            "$cashier.actions": a,
                            "$cashier.show": !0,
                            "$cashier.loaded": !0
                        });
                    } else t.setData({
                        "$cashier.actions": a,
                        "$cashier.show": !0,
                        "$cashier.loaded": !0
                    });
                }).catch(function(a) {
                    console.warn("获取收银台支付列表失败：", a), t.showZanToast(a.msg || "网络抖了下，再点下试试~"), "function" == typeof e && e();
                });
            },
            $cashierClick: function(e, t) {
                var a = this;
                this.isSubmitting = !1, this.payConstructor.doPayAction(e, t).then(function(t) {
                    if (l.trigger("trade:order:paid", a.data.order_no), "CREDIT_CARD" === e.pay_channel) {
                        var i = t && t.deep_link_info || {};
                        return Object.assign(i, {
                            partner_return_url: t.partner_return_url
                        }), void wx.navigateTo({
                            url: "/pages/pay/credit-card/index?deepLinkData=" + encodeURIComponent(JSON.stringify(i))
                        });
                    }
                    a.redirectToSuccess();
                }).catch(function(e) {
                    var t = e.msg, i = e.type;
                    "need_password" === i ? a.setData({
                        "$cashier.showPassword": !0
                    }) : "cancel" !== i && "adjust_price" !== i && a.showZanToast(t || "网络抖了下，再点下试试~");
                });
            },
            $cashierCancel: function() {
                this.isSubmitting = !1, this.setData({
                    "$cashier.actions": [],
                    "$cashier.show": !1
                });
            }
        });
    }
});