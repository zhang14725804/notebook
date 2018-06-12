!function() {
    require("./../../../common.js"), wx.webpackJsonp.apply(null, arguments);
}([ 37 ], {
    293: function(e, t, a) {
        function s(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        var r = s(a(4)), o = s(a(2)), i = s(a(14)), d = s(a(1)), n = getApp(), h = a(56), c = a(3), l = a(8), u = a(109), f = a(110), p = a(294), _ = a(15), g = a(64), m = a(295), v = a(296), y = a(297), w = a(298), D = a(299), S = a(300), T = [], b = a(161), x = a(0);
        (0, d.default)(c({}, l.Toast, m, v, y, w, D, S, {
            data: {
                fetching: !0,
                book_key: "",
                order_no: "",
                orderFrom: "",
                address: {},
                origin_goods_list: [],
                goods_list: [],
                unavailable_goods: {
                    list: [],
                    showDetail: !1
                },
                shop: {
                    ump_activity: [],
                    buyer_msg: ""
                },
                coupons: {
                    list: [],
                    inValid: [],
                    selected: {},
                    changed: !1,
                    forbidCoupon: !1
                },
                sms: 1,
                is_virtual: 0,
                showCountDown: !1,
                countdown: {},
                isGuarantedTrade: !1,
                canSelfFetch: !1,
                showExpress: !0,
                showSelfFetch: !1,
                fetchUserName: "",
                fetchPhoneNumber: "",
                fetchAddress: "",
                fetchTime: "",
                fetchTel: "",
                showDeliveryDialog: !1,
                steps: {},
                selfFetchAddress: {},
                hideSegmentOnlySelfFetch: !1,
                tapExpress: !1,
                tapSelfFetch: !1,
                show_fetch_time_arrow: !0,
                goodsPresaleStartTime: "",
                is_optional_self_fetch_time: 1,
                self_fetch_address_id: "",
                self_fetch_city_code: "",
                self_fetch_city_name: "",
                showBindPhoneNumber: !1,
                showGroupCollect: !0,
                forceEnableGroupCollect: !1,
                isGrouponOrder: !1,
                isGroupon: !1,
                isLeader: !1,
                isLeaderSelected: !1,
                isOrderResult: !1,
                leaderName: "",
                kdtId: "",
                hasOverseaGoods: !1,
                identifyCardNo: "",
                isSecuredTransactions: 0,
                isYZGuarantee: 0
            },
            identifyCardInput: function(e) {
                var t = e.detail.value;
                this.setData({
                    identifyCardNo: t
                });
            },
            onExpressTap: function() {
                this.onHideDeliveryDialog(), this.setData({
                    showExpress: !0,
                    showSelfFetch: !1,
                    tapExpress: !0
                }), this.fetchOrderData();
            },
            onSelfFetchTap: function() {
                this.onHideDeliveryDialog(), this.setData({
                    showSelfFetch: !0,
                    showExpress: !1,
                    tapSelfFetch: !0
                }), this.fetchOrderData();
            },
            bindNameInput: function(e) {
                var t = e.detail.value;
                this.setData({
                    fetchUserName: t
                });
            },
            bindPhoneNumberInput: function(e) {
                if ("" != this.data.fetchUserName) {
                    var t = e.detail.value;
                    this.setData({
                        fetchPhoneNumber: t
                    });
                } else this.showZanToast("请先填写提货人姓名");
            },
            onShowDeliveryDialog: function() {
                this.setData({
                    showDeliveryDialog: !0
                });
            },
            onHideDeliveryDialog: function() {
                this.setData({
                    showDeliveryDialog: !1
                });
            },
            onFetchAddressTap: function() {
                return "" == this.data.fetchPhoneNumber ? void this.showZanToast("请先填写提货人手机号") : void wx.navigateTo({
                    url: "./selectAddress/selectAddress?id=" + this.data.self_fetch_address_id + "&cityName=" + this.data.self_fetch_city_name + "&cityCode=" + this.data.self_fetch_city_code + "&kdtId=" + this.data.kdtId
                });
            },
            onFetchTimeTap: function() {
                return this.data.currentFetchModel && this.data.currentFetchModel.offline_business_hours ? void (-1 != this.data.fetchTime.indexOf("到店自提") || (0 < this.data.fetchTime.length ? this.showDatePicker(void 0, this.data.goodsPresaleStartTime) : this.showDatePicker(this.data.currentFetchModel.offline_business_hours, this.data.goodsPresaleStartTime))) : void this.showZanToast("请先选择自提地址");
            },
            handleContactSelfFetchService: function() {
                var e = this;
                wx.showModal({
                    title: void 0 == this.data.selfFetchAddress.tel ? this.data.fetchTel : this.data.selfFetchAddress.tel,
                    confirmText: "呼叫",
                    success: function(t) {
                        t.confirm && wx.makePhoneCall({
                            phoneNumber: void 0 == e.data.selfFetchAddress.tel ? e.data.fetchTel : e.data.selfFetchAddress.tel
                        });
                    }
                });
            },
            onLoad: function(e) {
                var t = this, a = e.dbid, s = n.db.get(a) || {}, r = [], o = "", d = !1, c = {}, l = e.orderFrom || "", u = !1, f = s.kdtId || e.kdtId;
                "order" == (s.type || e.type) ? (o = s.order_no || e.order_no, d = !0) : (c = wx.getStorageSync("trade-buy-address") || {}, 
                r = s.goods_list || [], f = r[0].kdtId, c && 0 < (0, i.default)(c).length && (u = !0));
                var p = s.isSecuredTransactions;
                if (this.setData({
                    book_key: h.makeRandomString(10) + new Date().getTime(),
                    isGuarantedTrade: p,
                    fetchUserName: c.user_name,
                    fetchPhoneNumber: c.tel
                }), o || 0 != r.length) {
                    var _ = void 0 != s.createGroupon, g = s.isGrouponOrder, m = s.createGroupon, v = wx.getStorageSync("leaderName"), y = s.activityAlias;
                    r[0];
                    this.setData({
                        origin_goods_list: r,
                        order_no: o,
                        orderFrom: l,
                        showCountDown: d,
                        address: c,
                        isGroupon: _,
                        isLeader: m,
                        leaderName: v,
                        activityAlias: y,
                        kdtId: f,
                        isGrouponOrder: g
                    }), this.fetchShopStatus(f), this.getOrderData(u), n.on("order-address-change", function(e) {
                        wx.setStorage({
                            key: "trade-buy-address",
                            data: e
                        }), t.fetchOrderData({
                            address: e
                        }, function() {
                            t.setData({
                                address: e
                            });
                        }, function(e) {
                            t.showZanToast(e || "地址切换失败，请稍候再试");
                        });
                    }, this), wx.removeStorageSync("selectDetailModel");
                } else {
                    var w = n.db.set({
                        text: "没有找到可以买的商品~"
                    });
                    wx.redirectTo({
                        url: "/pages/common/error/index?dbid=" + w
                    });
                }
            },
            getOrderData: function(e) {
                var t = this;
                this.fetchOrderData({
                    isFirst: !0
                }, function(a) {
                    var s = (a.data.shopResultList[0] || {}).postageResult;
                    T = (s || {}).postageItems;
                    var r, o = a.data.canSelfFetch, i = a.data.showDescResult.showExpressTab, d = !0, n = !1, h = !1;
                    if (o && i ? s.currentExpressType && s.postageItems && 1 == s.postageItems.length && 2 == s.postageItems[0].expressType && (h = !0, 
                    d = !1, n = !0) : (h = !0, d = i, n = o), t.data.order_no) {
                        var c = a.data.newPrepayResult;
                        if (r = {
                            cashier_sign: c.cashierSign,
                            partner_id: c.partnerId,
                            prepay_id: c.prepayId,
                            cashier_salt: c.cashierSalt
                        }, a.data.orderAddress) {
                            var l = JSON.parse(a.data.orderAddress.extraInfo || {});
                            n = !1, d = !0, t.setData({
                                address: f.parseOrderAddressData(a.data.orderAddress),
                                identifyCardNo: l.idCardNumber
                            });
                        } else a.data.selfFetchAddress && (n = !0, d = !1);
                        t.initCountDown(a.data);
                    }
                    var u = a.data.shopResultList[0].groupInfo;
                    t.setData({
                        canSelfFetch: o,
                        showSelfFetch: n,
                        showExpress: d,
                        steps: b.getSteps(99, n, !!u),
                        selfFetchAddress: a.data.selfFetchAddress || {},
                        hideSegmentOnlySelfFetch: h,
                        "coupons.forbidCoupon": 1 == a.data.shopResultList[0].forbidCoupon,
                        showGroupCollect: !!u && 0 != u.receiveState,
                        forceEnableGroupCollect: !!u && 2 == u.receiveState,
                        isLeaderSelected: !!u && 2 == u.receiveState,
                        prePaymentPreparation: r
                    }), e ? t.fetchOrderData() : t.autoUseCoupon();
                }, function(e, t) {
                    var a = n.db.set({
                        text: e,
                        code: t.code
                    });
                    wx.redirectTo({
                        url: "/pages/common/error/index?dbid=" + a
                    });
                });
            },
            onUnload: function() {
                n.off(null, null, this);
            },
            onShow: function() {
                console.log(this.data.goods_list), x.page.show({
                    id: this.data.kdtId,
                    kdtId: this.data.kdtId
                });
                var e = !1;
                e = !n.getBuyerId(), this.setData({
                    copyright: n.globalData.copyright,
                    is_big_shop: n.globalData.is_big_shop,
                    showBindPhoneNumber: e
                });
                var t = wx.getStorageSync("selectDetailModel");
                if (this.setData({
                    fetchAddress: "" == t ? "" : t.name + "  " + t.city + t.area + t.address,
                    fetchTel: t.tel,
                    currentFetchModel: "" == t ? void 0 : t,
                    self_fetch_address_id: t.id,
                    self_fetch_city_code: t.city_code,
                    self_fetch_city_name: t.city
                }), t.is_optional_self_fetch_time && "0" == t.is_optional_self_fetch_time) {
                    var a = 0 < this.data.goodsPresaleStartTime.length ? "请在" + this.data.goodsPresaleStartTime + "后到店自提" : "请尽快到店自提";
                    this.setData({
                        fetchTime: a,
                        show_fetch_time_arrow: !1,
                        is_optional_self_fetch_time: 0
                    });
                } else this.setData({
                    fetchTime: "",
                    show_fetch_time_arrow: !0,
                    is_optional_self_fetch_time: 1
                });
                this.data.coupons.changed && (this.setData({
                    "coupons.changed": !1
                }), this.updateOrderPayment());
            },
            createOrder: function(e, t) {
                var a = this;
                this.validateOrder() || (this.setGlobalAppLoggerData(), u.createOrder(this.data, function(t) {
                    var s = t.prePaymentPreparation, r = s.cashierSalt, o = s.cashierSign, i = s.partnerId, d = s.prepayId, h = t.paymentPreparation;
                    return a.setData({
                        prePaymentPreparation: {
                            cashier_salt: r,
                            cashier_sign: o,
                            partner_id: i,
                            prepay_id: d
                        },
                        order_no: t.orderNo
                    }), 0 === h.payAmount ? void a.navigateSuccess() : (n.trigger("trade:order:create", a.data.order_no), 
                    void e());
                }, function(e) {
                    a.showZanToast(e || "网络出了点问题，再点下试试~"), t && t(e);
                }));
            },
            setGlobalAppLoggerData: function() {
                var e = n.logger.getGlobal().context;
                this.setData({
                    logv3Data: e
                });
            },
            payOrder: function() {
                var e = this, t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {};
                p(this.data, {
                    success: function() {
                        n.trigger("trade:order:paid", e.data.order_no), t.success && t.success(), e.navigateSuccess();
                    },
                    fail: function(a) {
                        "requestPayment:fail cancel" !== a && e.showZanToast(a || "网络抖了下，再点下试试~"), t.fail && t.fail(a);
                    },
                    afterSync: t.afterSync
                });
            },
            navigateSuccess: function() {
                var e = n.db.set({
                    order_no: this.data.order_no,
                    kdtId: this.data.kdtId
                });
                this.data.isGroupon || this.data.isGrouponOrder ? wx.redirectTo({
                    url: "/pages/ump/pintuan/detail/index?orderNo=" + this.data.order_no + "&kdtId=" + this.data.kdtId
                }) : wx.redirectTo({
                    url: "/pages/trade/paid/index?dbid=" + e
                });
            },
            validateOrder: function() {
                var e = this.data.address, t = this.data.is_virtual;
                if (this.data.showSelfFetch) {
                    if (this.data.order_no && 0 < this.data.order_no.length) return !1;
                    if ("" == this.data.fetchUserName) return this.showZanToast("请填写提货人姓名"), "请填写提货人姓名";
                    if ("" == this.data.fetchPhoneNumber) return this.showZanToast("请填写手机号码"), "请填写手机号码";
                    if (11 > this.data.fetchPhoneNumber.length) return this.showZanToast("请填写正确的手机号码"), 
                    "请填写正确的手机号码";
                    if ("" == this.data.fetchAddress) return this.showZanToast("请选择提货地址"), "请选择提货地址";
                    if ("" == this.data.fetchTime) return this.showZanToast("请选择提货时间"), "请选择提货时间";
                } else if (!e.user_name && !t) return this.showZanToast("请先选择一个收货地址~"), "请先选择一个收货地址~";
            },
            validateDeliveryStyle: function() {
                return !!this.data.showSelfFetch || !(T && 1 == T.length && 2 == T[0].expressType) || (this.showZanToast("小程序暂不支持同城配送"), 
                !1);
            },
            fetchOrderData: function() {
                var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {}, t = this, a = arguments[1], s = arguments[2];
                wx.showToast({
                    title: "数据加载中",
                    icon: "loading",
                    duration: 1e4
                });
                var r = (0, o.default)({}, this.data, e);
                u.fetchOrderData(r, function(e) {
                    t.setOrderData(e), a && a(e), wx.hideToast(), t.setData({
                        fetching: !1,
                        hasOverseaGoods: e.data.hasOverseaGoods
                    });
                }, function(e, t) {
                    wx.hideToast(), s && s(e, t);
                });
            },
            setOrderData: function(e) {
                this.setData(f.parseOrderData(e.data, this.data)), this.autoUseCoupon();
                var t = e.data.shopResultList[0].groupInfo;
                if (void 0 != t && this.data.isLeaderSelected) {
                    var a = {}, s = {};
                    a.tel = t.headerTel, a.user_name = t.headerUserName, a.province = t.headerProvince, 
                    a.city = t.headerCity, a.county = t.headerCounty, a.address_detail = t.headerAddressDetail, 
                    s.userTel = t.headerTel, s.name = t.headerUserName, s.province = t.headerProvince, 
                    s.city = t.headerCity, s.county = t.headerCounty, s.addressDetail = t.headerAddressDetail, 
                    this.setData({
                        address: a,
                        selfFetchAddress: s
                    });
                } else {
                    var r = wx.getStorageSync("trade-buy-address") || {};
                    this.setData({
                        address: r,
                        selfFetchAddress: e.data.selfFetchAddress || {}
                    });
                }
            },
            updateOrderPayment: function() {
                if (!this.data.order_no) {
                    var e = this.data.payment, t = this.data.coupons.selected || {}, a = e.goodsPay + e.postage - e.activity;
                    t.id && (a -= 100 * parseFloat(t.priceStr)), e.realPay = a;
                    var s = f.parsePaymentData(e);
                    this.setData({
                        payment: e,
                        payment_strs: s
                    });
                }
            },
            initCountDown: function(e) {
                var t = this, a = 1e3 * e.shopResultList[0].order.expireTime, s = new Date().getTime();
                new g(a - s, {
                    onChange: function(e, a) {
                        t.setData({
                            countdown: a
                        });
                    },
                    onEnd: function() {
                        var e = n.db.set({
                            order_no: t.data.order_no,
                            kdtId: t.data.kdtId
                        });
                        wx.redirectTo({
                            url: "/pages/trade/result/index?dbid=" + e
                        });
                    }
                });
            },
            onDateTimeChange: function(e) {
                this.setData({
                    fetchTime: e,
                    show_fetch_time_arrow: !0
                });
            },
            autoUseCoupon: function() {
                var e = this.data.coupons, t = e.list || [], a = {};
                0 < t.length && !e.forbidCoupon && (a = t[0], a.priceStr = _(a.value).toYuan()), 
                this.setData({
                    coupons: (0, o.default)(e, {
                        selected: a
                    })
                }), this.updateOrderPayment();
            },
            showCouponList: function() {
                if (console.log(0 < "order_no " + this.data.order_no + "length " + this.data.order_no.length), 
                !(this.data.order_no && 0 < this.data.order_no.length)) {
                    var e = {
                        charge_coupon: this.data.coupons.list,
                        unavailable_coupon: this.data.coupons.inValid,
                        selected_coupon: this.data.coupons.selected,
                        exchangeParams: {
                            item_pay: this.data.payment.goodsPay,
                            postage: this.data.payment.postage,
                            item_list: (0, r.default)(f.getBriefGoodsData(this.data.goods_list)),
                            kdt_id: this.data.kdtId
                        }
                    };
                    wx.navigateTo({
                        url: "./coupon/index?coupons=" + (0, r.default)(e)
                    });
                }
            },
            onLeaderSelected: function() {
                if (this.data.forceEnableGroupCollect) wx.showModal({
                    content: "你的包裹必须由团长代收",
                    showCancel: !1
                }); else {
                    var e = this.data.isLeaderSelected;
                    this.setData({
                        isLeaderSelected: !e
                    }), this.fetchOrderData();
                }
            },
            fetchShopStatus: function(e) {
                var t = this;
                e && n.carmen({
                    api: "weapp.wsc.team.status/1.0.0/getbykeys",
                    method: "GET",
                    data: {
                        kdt_id: e,
                        keys: "is_secured_transactions,is_youzan_secured"
                    },
                    success: function(e) {
                        e.is_secured_transactions && 1 === parseInt(e.is_secured_transactions) && t.setData({
                            isSecuredTransactions: 1
                        }), e.is_youzan_secured && 1 === parseInt(e.is_youzan_secured) && t.setData({
                            isYZGuarantee: 1
                        });
                    },
                    fail: function(e) {
                        console.log("[get shop status error]" + e.msg);
                    }
                });
            }
        }));
    }
}, [ 293 ]);