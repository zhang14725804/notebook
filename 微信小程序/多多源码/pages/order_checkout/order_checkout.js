function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function o(e, o, t) {
    return o in e ? Object.defineProperty(e, o, {
        value: t,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[o] = t, e;
}

var t = e(require("../../controller/order_checkout")), a = e(require("../../controller/addresses_controller")), s = e(require("../../controller/coupons_controller")), r = e(require("../../components/order_checkout_address/order_checkout_address.js")), n = e(require("../../components/order_checkout_goods/order_checkout_goods.js")), i = e(require("../../libs/es6-promise.min")), d = e(require("../../constants/goods")), u = e(require("../../constants/groups")), l = e(require("../../constants/payment")), p = e(require("./goods_util")), c = e(require("../../configs/request_errors")), h = e(require("../../components/bubble/bubble")), f = e(require("../../components/edit_address/edit_address.js")), m = e(require("../../models/address")), g = e(require("../../components/quick_entry_forward_index/quick_entry_forward_index")), C = require("../../constants/order_checkout"), _ = e(require("../../libs/co/we-index")), v = e(require("../../libs/regenerator-runtime/runtime")), I = e(require("../../configs/api")), b = e(require("../../storage/ram_manager")), y = e(require("../../storage/user_storage")), D = e(require("../../models/format/mall_info")), k = e(require("../../models/format/order_goods_detail")), T = require("../../common/message"), P = e(require("../../pages/order_checkout/auto_create_group")), w = require("../../common/index"), S = {
    NO_COUPON: 0,
    SOME_COUPON_AT_LEAST_ONE_USED: 1,
    SOME_COUPON_NONE_USED: 2
}, N = c.default.couponErrorHint, A = {
    getOrderGoodsDetail: "10276",
    getMallInfo: "3004",
    loadMallCoupons: "10152",
    getPlatformCoupons: "10153",
    takeMerchantCoupon: "10151",
    getPostage: "10341",
    payCheck: "10054",
    getGroupOrderDetail: "10045",
    getChargeHistory: "10423",
    getUserIdCard: "10204",
    addUserIdCard: "10205",
    addWxAddress: "10424"
}, M = void 0, x = void 0, O = [], E = {
    mallInfoDispatchId: null,
    goodsDetailDispatchId: null,
    payDispatchId: null,
    dispatchIds: {},
    toast: null,
    goods: null,
    orderCheckoutAddressModule: null,
    orderCheckoutGoodsModule: null,
    idCardModule: null,
    createOrderParams: null,
    payBtnFlag: !1,
    couponsParams: {},
    couponTakeLock: !1,
    disableUserAction: !1,
    personalInfos: null,
    invalidIdCardInfoCount: 0,
    nextStepIsPay: !1,
    idCardValidStatusCode: null,
    expireTimeMini: 0,
    expireTime: [],
    usePriority: null,
    data: {
        firstEnter: !0,
        showReqError: !1,
        goodsName: "",
        realNameAuth: !1,
        addressArray: [],
        visible: !1,
        bottomBarVisible: !1,
        finalPrice: 0,
        groupOrderId: null,
        payText: "立即支付",
        subPayText: "",
        showFreeCoupon: !1,
        showPlatformCoupon: !0,
        selectedMallCoupon: null,
        selectedPlatformCoupon: null,
        isShowClearBtn: !1,
        phoneNumber: "",
        mallCouponToastData: {},
        mallCouponsListData: {
            showMallCouponsList: !1,
            mallMainClass: "mall-coupons-main mall-coupons-main-down"
        },
        myMallCouponsData: {
            showCouponsList: !1,
            mainClass: "mall-coupons-main mall-coupons-main-down"
        },
        myPlatformCouponsData: {
            showCouponsList: !1,
            mainClass: "mall-coupons-main mall-coupons-main-down"
        },
        orderCheckoutGoodsData: {
            disableUserAction: !1
        },
        addressData: {
            editAddressWindowVisible: !1
        },
        orderCheckoutAddressData: {
            disableUserAction: !1,
            addressInfo: {}
        },
        hasIdInfo: !1,
        showIdHintBubble: !1,
        idCardHeadImg: w.ImageUtil.cdnCompress(w.ImageUtil.getCDNImgURL("base/id_card/id_card_header.png")),
        idCardPopupMainClass: 0,
        idCardPopupVisible: !1,
        realName: "",
        idNumber: "",
        idCardHints: C.ID_CARD_HINT || [],
        idCardHintVisible: !1,
        realNameInputCursorSpace: w.Util.rpxToPx(236),
        idNumberInputCursorSpace: w.Util.rpxToPx(136),
        costTemplateId: "",
        freight: 0,
        selectedEventId: 0,
        isRefundable: 0,
        hideNumberList: !0,
        records: [],
        payType: {
            wechatPay: !0,
            friendPay: !1,
            showWechatPay: !1,
            showFriendPay: !1
        },
        showPayWindow: !1,
        showPayContainer: !1,
        isIpx: w.SystemInfo.getIpxJudgment(),
        showCouponLoadMore: !1
    },
    preLoadPage: function() {
        var e = getCurrentPages(), o = void 0;
        if (e.length > 1 && (o = e[e.length - 2]), o && o.transGoodsData) {
            var t = o.transGoodsData;
            t && t.goodsId == this.$urlQueryObj.goods_id && this.setData({
                visible: !0,
                firstEnter: !1,
                "orderCheckoutGoodsData.preMallLogo": t.preMallLogo,
                "orderCheckoutGoodsData.preMallName": t.preMallName || "",
                "orderCheckoutGoodsData.preGoodsName": t.preGoodsName || "",
                "orderCheckoutGoodsData.prePrice": t.prePrice,
                "orderCheckoutGoodsData.preThumbUrl": t.preThumbUrl || ""
            });
        }
    },
    defaultClick: function() {},
    getPostageChange: function() {
        var e = this, o = parseInt(e.data.orderCheckoutGoodsData.notFormatTotalPrice), t = e.data.costTemplateId, a = e.data.orderCheckoutAddressData.addressInfo.provinceId, s = e.data.orderCheckoutGoodsData.goodsNumber, r = e.$urlQueryObj.sku_id, n = e.$urlQueryObj.goods_id, i = e.goods.selectedSku, d = i ? i.weight || 0 : 0;
        (0, _.default)(v.default.mark(function i() {
            var u, l, p, c, h;
            return v.default.wrap(function(i) {
                for (;;) switch (i.prev = i.next) {
                  case 0:
                    return u = w.Request.requestDataWithCmd(A.getPostage, {
                        params: {
                            cost_template_id: t,
                            province_id: a,
                            goods_item: s,
                            order_amount: o,
                            sku_id: r,
                            goods_id: n,
                            goods_weight: d
                        }
                    }), i.next = 3, w.Request.runMainRequestForPage(u, e);

                  case 3:
                    l = i.sent, p = w.StdFormat.price(l.cost, 100), c = l.title, h = {
                        freight: parseInt(p)
                    }, 0 != p ? (h.freightTitle = c, h.freightDesc = "含配送费" + p + "元") : (h.freightTitle = "", 
                    h.freightDesc = "免运费"), e.$hideLoading(), e.setData(h), e.setFinalPayAmount();

                  case 11:
                  case "end":
                    return i.stop();
                }
            }, i, this);
        }));
    },
    setBottomBarPayText: function(e) {
        var o = this.data.finalPayAmount;
        if (e) {
            if (this.data.payType.friendPay) return void this.setData({
                payText: "创建订单中",
                subPayText: "请稍候"
            });
            0 == o && this.data.showFreeCoupon ? this.setData({
                payText: "正在开团",
                subPayText: ""
            }) : this.setData({
                payText: "正在支付",
                subPayText: "请稍候"
            });
        } else {
            var t = "立即支付";
            0 == o && this.data.showFreeCoupon && (t = "免费开团"), this.cancelPay && (t = "继续支付"), 
            this.goods.eventType === u.default.EventType.FREE_TRIAL && (t = "申请试用"), this.$hideLoading(), 
            this.setData({
                payText: t,
                subPayText: ""
            });
        }
    },
    superEditBtnClk: function() {
        var e = this, o = e.data.couponInfos, t = o.platformCoupons.enableSuperpositionCoupons, a = e.data.selectedPlatformCoupon;
        a && "101010" == a.couponId && (t.selectedCertainNum = t.selectedNum, this.hideCouponsList()), 
        t.showSuperEditBtn = !1, o.platformCoupons.enableSuperpositionCoupons = t, this.setData({
            couponInfos: o
        }), this.setPlatformCouponText();
    },
    updateSuperNumber: function(e) {
        var o = this, t = parseInt(e.target.dataset.delta), a = o.data.couponInfos.platformCoupons.enableSuperpositionCoupons;
        if (!(a.reduceSuperDisable && t < 0 || a.increaseSuperDisable && t > 0)) {
            var s = a.selectedNum + t;
            o.setupSuperNumData(s);
        }
    },
    blurSuperNumInput: function(e) {
        var o = this, t = parseInt(e.detail.value.trim(), 10), a = o.data.couponInfos.platformCoupons.enableSuperpositionCoupons.maxAvailableNum;
        isNaN(t) && (t = 1), t < 1 && (t = 1), t > a && (t = a), o.setupSuperNumData(t);
    },
    initSuperEditBtn: function() {
        var e = this.data.couponInfos, o = e.platformCoupons.enableSuperpositionCoupons, t = o.selectedCertainNum, a = !1, s = !1;
        a = t <= 1, s = t >= o.maxAvailableNum, o.reduceSuperDisable = a, o.increaseSuperDisable = s, 
        e.platformCoupons.enableSuperpositionCoupons = o, this.setData({
            couponInfos: e
        });
    },
    setupSuperNumData: function(e) {
        var o = this, t = o.data.couponInfos, a = t.platformCoupons.enableSuperpositionCoupons, s = a.maxAvailableNum, r = o.data.selectedPlatformCoupon, n = !1, i = !1;
        n = e <= 1, i = e >= s, a.reduceSuperDisable = n, a.increaseSuperDisable = i, a.selectedNum = e, 
        a.showSuperEditBtn = !0, t.platformCoupons.enableSuperpositionCoupons = a;
        var d = {
            couponInfos: t
        };
        r && "101010" == r.couponId && (d.selectedPlatformCoupon = a), o.setData(d), o.setCouponListWindowData("myPlatformCouponsData", o.data.couponTitle, (o.data.couponInfos || {}).platformCoupons || {}, !1, o.data.selectedPlatformCoupon, []);
    },
    setCouponListWindowData: function(e, t, a, s, r, n) {
        var i, d = this, u = a.enableCoupons || [], l = a.disableCoupons || [], p = a.enableSuperpositionCoupons || {}, c = (i = {}, 
        o(i, e + ".title", t), o(i, e + ".subtitle", "使用优惠券"), o(i, e + ".isMallCoupon", !!s), 
        o(i, e + ".promotionEvents", n), o(i, e + ".enableCoupons", u), o(i, e + ".enableSuperpositionCoupons", p), 
        o(i, e + ".disableCoupons", l), o(i, e + ".hasCoupons", u.length > 0 || l.length > 0 || this.data.hasSuperpositionCoupons), 
        o(i, e + ".selectedCoupon", r), o(i, e + ".selectedCouponId", (r || {}).couponId), 
        o(i, e + ".showCouponsList", !0), i);
        this.setData(c), setTimeout(function() {
            d.setData(o({}, e + ".mainClass", "mall-coupons-main mall-coupons-main-up"));
        }, 100);
    },
    didFocusRealName: function() {
        this.setData({
            idCardPopupMainClass: 500
        });
    },
    didFocusIdNumber: function() {
        this.setData({
            idCardPopupMainClass: 500
        });
    },
    hideIdCardPopup: function() {
        var e = this;
        this.nextStepIsPay = !1, setTimeout(function() {
            e.setData({
                idCardPopupVisible: !1,
                idCardPopupMainClass: 0
            });
        }, 320);
    },
    showIdCardPopup: function() {
        this.data.disableUserAction ? this.$showToast("订单已生成，信息不可更改") : (this.setData({
            idCardPopupVisible: !0
        }), (0, w.TrackingRecord)({
            page_name: "order_checkout",
            page_sn: 10004,
            op: "impr",
            page_section: "id_card_popup",
            page_el_sn: 99645,
            goods_id: this.data.goodsId,
            sku_id: this.data.skuId,
            classification: this.data.realNameAuth ? 1 : 0
        }), (0, w.TrackingRecord)({
            page_name: "order_checkout",
            page_sn: 10004,
            op: "click",
            page_section: this.data.hasIdInfo ? "real_info_prompt" : "id_card_prompt",
            page_element: this.data.hasIdInfo ? "edit_btn" : "write_btn",
            page_el_sn: this.data.hasIdInfo ? "97474" : "99646",
            goods_id: this.data.goodsId,
            sku_id: this.data.skuId,
            classification: this.data.realNameAuth ? 1 : 0
        }));
    },
    setIdCardInfo: function(e) {
        var o = (e = e || {}).realName, t = e.idNumber;
        this.checkIdNumberValid(t) && this.checkRealNameValid(o) ? this.setData({
            showIdHintBubble: !1
        }) : this.setData({
            showIdHintBubble: !0
        });
    },
    showPlatformCouponList: function() {
        if (!this.data.hidePlatformCouponList) if (this.data.disableUserAction) this.$showToast("订单已生成，信息不可更改"); else {
            var e = (this.data.couponInfos || {}).platformCoupons || {};
            (e.enableSuperpositionCoupons || {}).selectedNum && (e.enableSuperpositionCoupons.selectedNum = e.enableSuperpositionCoupons.selectedCertainNum), 
            this.setCouponListWindowData("myPlatformCouponsData", this.data.couponTitle, e, !1, this.data.selectedPlatformCoupon, []);
            var o = this.getTrackingParams("click", null, "general_coupons", "98165");
            (0, w.TrackingRecord)(o);
        }
    },
    checkEnterNumber: function(e) {
        var o = /(^1)\d{10}$/;
        return this.goods.goodsType == d.default.GoodsType.OIL_CARD ? o = /(^1)\d{18}$/ : this.goods.goodsType == d.default.GoodsType.QQ_COIN && (o = /^[0-9]{5,11}$/), 
        e ? !!o.test(e) || (this.$showToast(this.data.virtualNumError), !1) : (this.$showToast("请填写要充值的号码"), 
        !1);
    },
    paySuccess: function(e) {
        var o = {
            op: "event",
            page_name: "order_checkout",
            sub_op: 0 == this.goods.isPresale ? "pay_order" : "prepay_order",
            order_sn: e,
            order_amount: parseInt(100 * this.data.finalPayAmount, 10),
            goods_id: this.goods.goodsId,
            goods_type: this.goods.goodsType,
            event_type: this.goods.eventType,
            goods_number: this.data.orderCheckoutGoodsData.goodsNumber,
            group_num: this.data.groupNum,
            sku_id: this.data.skuId,
            groupId: this.data.groupId,
            tag: "pdd_order",
            mall_id: this.goods.mallId,
            friend_pay: this.data.payType.friendPay
        };
        this.orderScanCode && (o.refer_share_form = "scan_code");
        for (var t in b.default.readActivityPages) o["refer_xcx_campaign_" + t] = 1;
        var a = this;
        (0, _.default)(v.default.mark(function t() {
            var s, r, n, i, d, u;
            return v.default.wrap(function(t) {
                for (;;) switch (t.prev = t.next) {
                  case 0:
                    return t.prev = 0, s = w.Request.requestDataWithCmd(A.payCheck, {
                        params: {
                            order_sn: e
                        }
                    }), t.next = 4, w.Request.runSecondaryRequestForPage(s, a);

                  case 4:
                    r = t.sent, n = void 0, r && (n = r.group_order_id), n && (b.default.lastGroupOrderId = n, 
                    b.default.lastOrderGoodsId = a.$urlQueryObj.goods_id, b.default.lastPayGoodsId = "", 
                    i = {
                        group_order_id: n,
                        from: "pay_success"
                    }, a.$urlQueryObj.from_custom_service_mall_id && (i.from_custom_service_mall_id = a.$urlQueryObj.from_custom_service_mall_id), 
                    a.$urlQueryObj.is_from_deposit && (i.is_from_deposit = !0), d = "/pages/group/group?" + w.UrlUtil.buildQuery(i), 
                    w.Navigation.redirectForward(d), a.getGroupInfoTracking(n, a, o)), t.next = 16;
                    break;

                  case 10:
                    t.prev = 10, t.t0 = t.catch(0), (u = t.t0.error_msg) || (u = "出错了，请稍后重试"), a.$showToast(u), 
                    (0, w.TrackingRecord)(o);

                  case 16:
                  case "end":
                    return t.stop();
                }
            }, t, this, [ [ 0, 10 ] ]);
        }));
    },
    getCouponUsageForTrackingRecord: function() {
        var e = (this.data.selectedMallCoupon || {}).couponId, o = (this.data.selectedPlatformCoupon || {}).couponId;
        if (e || o) return S.SOME_COUPON_AT_LEAST_ONE_USED;
        var t = this.data.couponInfos || {};
        return t.mallCoupons && t.mallCoupons.enableCoupons.length > 0 || t.platformCoupons && t.platformCoupons.enableCoupons.length > 0 ? S.SOME_COUPON_NONE_USED : S.NO_COUPON;
    },
    pay: function(e) {
        if (!this.payBtnFlag) {
            var o = w.DataUtil.getLogId(), a = this.goods || {}, s = this.getTrackingParams("click", null, "pay_btn", "99229");
            if (s.coupon_usage = this.getCouponUsageForTrackingRecord(), s.log_id = o, e && e.detail && e.detail.target && e.detail.target.dataset && "cancel_pay_prompt" === e.detail.target.dataset.refer ? (s.page_el_sn = 99229, 
            s.friend_pay = this.data.payType.friendPay, this.$uploadFormId(e, !0)) : this.$uploadFormId(e, !1), 
            (0, w.TrackingRecord)(s), this.cancelPay) return this.data.payType.friendPay && this.orderSn ? void this.dealToHelpPay() : void this.repay();
            var r = {
                logId: o,
                goodsId: this.$urlQueryObj.goods_id || a.goodsId,
                isAutoGroup: !1,
                orderAmount: parseInt(100 * this.data.finalPayAmount),
                skuId: this.data.skuId,
                groupId: this.data.groupId,
                groupNum: this.data.groupNum,
                goodsName: this.data.goodsName,
                skuNumber: this.data.orderCheckoutGoodsData.goodsNumber,
                mallCouponId: (this.data.selectedMallCoupon || {}).couponId,
                platformCouponId: "101010" != (this.data.selectedPlatformCoupon || {}).couponId ? (this.data.selectedPlatformCoupon || {}).couponId : null,
                couponNumber: (this.data.selectedPlatformCoupon || {}).selectedNum,
                goodsType: this.goods.goodsType,
                eventType: this.goods.eventType,
                eventId: this.data.selectedEventId,
                friendPay: this.data.payType.friendPay,
                mallId: this.goods.mallId,
                unitPrice: this.getSelectedSkuPrice()
            };
            if (this.$urlQueryObj.duoduo_type && (r.duoduo_type = this.$urlQueryObj.duoduo_type), 
            this.sourceChannel && (r.sourceChannel = this.sourceChannel), this.promotionActivityId && (r.activityId = this.promotionActivityId), 
            r.eventType == u.default.EventType.MORE_THAN_ONE_DISCOUNT && r.eventId > 0 && 1 == r.skuNumber && (r.eventId = 0), 
            r.finalPrice = this.data.finalPayAmount, (!this.data.isVirtualGoods || this.checkEnterNumber(this.data.phoneNumber)) && this.data.goodsNumber && !(this.data.goodsNumber < 0)) {
                this.data.isVirtualGoods && (r.phoneNumber = this.data.phoneNumber), this.$urlQueryObj && this.$urlQueryObj.group_order_id && (r.groupOrderId = this.$urlQueryObj.group_order_id), 
                this.data.freeCoupon && this.data.freeCoupon.couponId && (r.groupFreeCoupon = this.data.freeCoupon), 
                this.data.captainCoupon && this.data.captainCoupon.couponId && (r.groupCaptainCoupon = this.data.captainCoupon);
                var n = this.data.orderCheckoutAddressData;
                if (!this.data.isVirtualGoods) {
                    if (!n || !n.addressInfo || n.addressInfo.addressId <= 0) return void ("function" == typeof this.addAddress && this.addAddress());
                    if (!n.addressInfo.canReceived) {
                        var i = this;
                        return void wx.showModal({
                            content: "该商品有地区限制，请使用快递可以送达的地址",
                            success: function(e) {
                                e.confirm && "function" == typeof i.editAddress && i.editAddress();
                            }
                        });
                    }
                }
                if (r.addressId = this.data.isVirtualGoods ? "0" : n.addressInfo.addressId, !this.data.needId || this.data.hasIdInfo && !this.data.showIdHintBubble) (r.addressId || this.data.isVirtualGoods) && (this.setBottomBarPayText(!0), 
                this.payBtnFlag = !0, this.createOrderParams = r, T.Message.on(T.KEYS.ORDER_CHECKOUT_PAY, w.Util.bind(this.processPay, this)), 
                t.default.createOrder(r, T.KEYS.ORDER_CHECKOUT_PAY)), this.data.payType.friendPay && this.$uploadFormId(e, !1); else if (this.nextStepIsPay = !0, 
                this.showIdCardPopup(), this.idCardValidStatusCode) {
                    var d = c.default.messageFromCode(this.idCardValidStatusCode);
                    this.$showToast(d), this.idCardValidStatusCode = null;
                }
            }
        }
    },
    dealToHelpPay: function() {
        this.goToHelpPay = !0;
        var e = {
            order_sn: this.orderSn
        };
        this.data.groupOrderId && (e.group_order_id = this.data.groupOrderId), this.$forward("help_pay", e);
    },
    repay: function() {
        this.orderSn && (this.payBtnFlag = !0, this.setBottomBarPayText(!0), t.default.doPay(this.orderSn, T.KEYS.ORDER_CHECKOUT_PAY));
    },
    setUserActionDisabled: function() {
        this.setData({
            disableUserAction: !0,
            "orderCheckoutGoodsData.disableUserAction": !0,
            "orderCheckoutAddressData.disableUserAction": !0
        });
    },
    getSelectedSkuPrice: function() {
        var e = this.getSelectedGroup(), o = this.getSelectedSku();
        return p.default.getSelectedSkuPrice(e, o);
    },
    getGroupOrderDetail: _.default.wrap(v.default.mark(function e(o, t) {
        var a, s;
        return v.default.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                return e.prev = 0, a = w.Request.requestDataWithCmd(A.getGroupOrderDetail, {
                    restfulParam: o
                }), e.next = 4, w.Request.runSecondaryRequestForPage(a, t);

              case 4:
                return s = e.sent, e.abrupt("return", s);

              case 8:
                e.prev = 8, e.t0 = e.catch(0), console.error(e.t0);

              case 11:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 0, 8 ] ]);
    })),
    processPay: function(e) {
        if (this.payBtnFlag = !1, e && e.orderSn && (this.orderSn = e.orderSn, this.orderCheckoutAddressModule.orderSn = this.orderSn), 
        this.setBottomBarPayText(), e.errorCode) {
            var o = e.errorMsg;
            if (l.default.isCancelPay(o)) {
                o = null, this.cancelPay = !0, this.setUserActionDisabled(), this.setBottomBarPayText(), 
                this.dealPayWindow(!0);
                var a = !1, s = !0, r = !1, n = void 0;
                try {
                    for (var i, d = this.expireTime[Symbol.iterator](); !(s = (i = d.next()).done); s = !0) if ("orderTime" == i.value.name) {
                        a = !0;
                        break;
                    }
                } catch (e) {
                    r = !0, n = e;
                } finally {
                    try {
                        !s && d.return && d.return();
                    } finally {
                        if (r) throw n;
                    }
                }
                if (!a) {
                    var u = {
                        name: "orderTime",
                        value: 1800
                    };
                    this.expireTime.push(u), this.countExpireInterval || this.countDownTimeSpike();
                }
            }
            if ("42007" == e.errorCode) {
                var p = this;
                P.default.createGroup(p.orderSn, function() {
                    t.default.groupFullAutoPrepay(p.orderSn, T.KEYS.ORDER_CHECKOUT_PAY);
                }, function() {});
            } else if ("42006" == e.errorCode) {
                var h = this;
                h.$showToast("拼团已满", {
                    hideToastFunc: function() {
                        var e = h.$urlQueryObj.goods_id;
                        e && w.Navigation.redirectForward("/pages/goods/goods?goods_id=" + e);
                    }
                });
            } else if (e.errorCode == c.default.LimitDiscountError.code) this.$showToast(c.default.LimitDiscountError.message); else if (e.errorCode == c.default.LimitQuantityDiscountError.code) {
                var f = this;
                o = c.default.LimitQuantityDiscountError.message, this.$showModal({
                    content: o,
                    showCancel: !1,
                    success: function(e) {
                        if (e.confirm) {
                            var o = f.$urlQueryObj.goods_id;
                            o && f.$forward("goods", {
                                goods_id: o
                            });
                        }
                    }
                });
            } else if (o) {
                var m = this;
                this.$showToast(o, {
                    hideToastFunc: function() {
                        if (!m.cancelPay && m.orderSn) {
                            var e = "/pages/order/order?ordersn=" + m.orderSn;
                            w.Navigation.redirectForward(e);
                        }
                    }
                });
            }
        } else if (e.orderSn) {
            if (this.data.payType.friendPay) return void this.dealToHelpPay();
            b.default.hasPaySucess = !0, this.paySuccess(e.orderSn);
        }
    },
    getGroupInfoTracking: _.default.wrap(v.default.mark(function e(o, t, a) {
        var s, r, n;
        return v.default.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (e.prev = 0, !o) {
                    e.next = 12;
                    break;
                }
                return e.next = 4, t.getGroupOrderDetail(o, t);

              case 4:
                s = e.sent, r = s.leader_order_info.uid, n = y.default.getUserId(), a.Is_group_owner = r == n ? "1" : "0", 
                s && s.group_order_info && void 0 !== s.group_order_info.group_status ? a.group_status = s.group_order_info.group_status : a.group_status = 0, 
                s && s.group_order_info && s.group_order_info.customer_num && (a.group_num = s.group_order_info.customer_num), 
                a.group_order_id = o, (0, w.TrackingRecord)(a);

              case 12:
                e.next = 17;
                break;

              case 14:
                e.prev = 14, e.t0 = e.catch(0), console.error(e.t0);

              case 17:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 0, 14 ] ]);
    })),
    getSelectedSku: function() {
        var e = this.data.skuId.toString(), o = this.goods.skus || null, t = null;
        if (null !== o) for (var a = 0; a < o.length; a++) if (o[a].skuId.toString() === e) {
            t = o[a];
            break;
        }
        return t;
    },
    getSelectedGroup: function() {
        var e = this.goods.groupTypes;
        if (e && e.length > 0) for (var o = 0; o < e.length; o++) if (this.data.groupId == e[o].groupId) return e[o];
        if (e && e.length > 1) return e[1];
    },
    processMallInfo: function(e) {
        if (e.errorCode) {
            var o = e.errorMsg;
            this.$showToast(o);
        } else {
            var t = e.mallName ? e.mallName : "", s = e.mallCoupons ? e.mallCoupons : [];
            this.setData({
                mallInfo: e,
                "mallCouponsListData.title": t,
                "mallCouponsListData.coupons": s,
                "mallCouponsListData.promotionEvents": this.goods.promotionEvents || []
            }), this.setupOrderCheckoutGoodsModule();
        }
        a.default.fetchRegionsJsonData();
    },
    setupOrderCheckoutGoodsModule: function() {
        if (this.data.mallInfo && this.data.couponInfos && this.personalInfos) {
            this.orderCheckoutGoodsModule || (this.orderCheckoutGoodsModule = new n.default());
            var e = this.getSelectedSkuPrice();
            this.orderCheckoutGoodsModule.load(this.goods, this.data.mallInfo, this.data.couponInfos, this.data.selectedEventId, {
                setDataFunc: this.componentsSetDataFuncs().orderCheckoutGoods,
                getDataFunc: this.componentsGetDataFuncs().orderCheckoutGoods,
                addRootFunc: w.Util.bind(this.componentsAddRootFunc, this),
                skuId: this.data.skuId,
                selectedCoupon: this.data.selectedMallCoupon,
                goodsNumber: this.data.orderCheckoutGoodsData.goodsNumber || this.data.goodsNumber || 1,
                selectedGroup: this.getSelectedGroup(),
                selectedSkuPrice: e,
                setupCouponsFunc: w.Util.bind(this.setupCoupons, this),
                showMallCouponsList: w.Util.bind(this.showMallCouponsList, this),
                selectMallCoupon: w.Util.bind(this.selectMallCoupon, this),
                promotionDiscount: this.data.promotionDiscount
            });
        }
    },
    initVirtualInfo: function(e) {
        var o = "", t = "", a = 11, s = "请输入正确的充值号码";
        switch (e.goodsType) {
          case d.default.GoodsType.MOBILE_DATA:
          case d.default.GoodsType.MOBILE_FARE:
            o = "充值号码：", t = "仅限中国大陆手机号码";
            break;

          case d.default.GoodsType.QQ_COIN:
            o = "QQ号：", t = "请输入QQ号", a = 11;
            break;

          case d.default.GoodsType.OIL_CARD:
            o = "加油卡号码：", t = "请输入加油卡号码", a = 19, s = "请输入正确的19位加油卡号";
        }
        this.setData({
            virtualTitle: o,
            virtualPlaceholder: t,
            virtualLimit: a,
            virtualNumError: s
        });
    },
    clearIntervalFun: function() {
        var e = !0, o = !0, t = !1, a = void 0;
        try {
            for (var s, r = this.expireTime[Symbol.iterator](); !(o = (s = r.next()).done); o = !0) if (s.value.value > 0) {
                e = !1;
                break;
            }
        } catch (e) {
            t = !0, a = e;
        } finally {
            try {
                !o && r.return && r.return();
            } finally {
                if (t) throw a;
            }
        }
        e && (clearInterval(this.countExpireInterval), this.countExpireInterval = null);
    },
    expireSpike: function(e) {
        var o = this, t = e.name, a = t + "List", s = t + "Mini";
        if (e.value >= 0) {
            var r = w.TimeUtil.transferToTime(1e3 * e.value).split(":"), n = {};
            n[a] = r, 0 == e.value.toFixed(1) ? (n[s] = 0, "orderTime" == e.name && (n.orderTimeTitle = "请尽快支付"), 
            o.clearIntervalFun()) : n[s] = o.expireTimeMini, o.setData(n);
        } else o.clearIntervalFun();
    },
    countDownTimeSpike: function() {
        if (this.expireTime.length > 0) {
            var e = !0, o = !1, t = void 0;
            try {
                for (var a, s = this.expireTime[Symbol.iterator](); !(e = (a = s.next()).done); e = !0) {
                    var r = a.value;
                    r && r.value >= 0 && this.expireSpike(r);
                }
            } catch (e) {
                o = !0, t = e;
            } finally {
                try {
                    !e && s.return && s.return();
                } finally {
                    if (o) throw t;
                }
            }
            var n = this;
            n.countExpireInterval = setInterval(function() {
                var e = 0, o = !0, t = !1, a = void 0;
                try {
                    for (var s, r = n.expireTime[Symbol.iterator](); !(o = (s = r.next()).done); o = !0) {
                        var i = s.value;
                        i.value -= .1, n.expireTime[e].value = i.value, 0 == n.expireTimeMini && (n.expireTimeMini = 10), 
                        n.expireTimeMini--, n.expireSpike(i), e++;
                    }
                } catch (e) {
                    t = !0, a = e;
                } finally {
                    try {
                        !o && r.return && r.return();
                    } finally {
                        if (t) throw a;
                    }
                }
            }, 100);
        }
    },
    processGoodsDetail: function(e) {
        var o = this, t = this;
        if (wx.stopPullDownRefresh(), this.goods = e || {}, this.goods.selectedSku = this.getSelectedSku(), 
        b.default.lastOrderGoodsData = e, e.errorCode) return e && e.errorMsg && this.$showToast(e.errorMsg), 
        void this.setData({
            showReqError: !0
        });
        if (this.data.groupId || this.setData({
            groupId: e.groupTypes[1].groupId
        }), e.goodsType == d.default.GoodsType.MAKE_UP && this.setData({
            groupId: e.groupTypes[0].groupId,
            groupNum: e.groupTypes[0].customerNum
        }), this.getMallInfo(), this.setupCoupons(), e.promotionEvents && e.promotionEvents.length > 0) {
            var a = e.promotionEvents, s = this.getSelectedSkuPrice(), n = this.data.orderCheckoutGoodsData.goodsNumber || this.data.goodsNumber || 1;
            for (var l in a) {
                var p = a[l].event_items, h = a[l].discount_type;
                for (var f in p) {
                    var m = p[f].discount_param;
                    switch (h) {
                      case 2:
                        a[l].event_items[f].discount = Math.ceil((100 - m) / 100 * s) * n, a[l].event_items[f].descountDesc = " -" + w.StdFormat.price(a[l].event_items[f].discount, 100) + "元", 
                        a[l].event_items[f].goods_number = 1;
                        break;

                      case 4:
                        a[l].event_items[f].discount = s - m;
                        break;

                      case 5:
                        a[l].event_items[f].discount = m;
                        break;

                      case 6:
                        a[l].event_items[f].discount = s * (1 - m / 100);
                    }
                }
            }
        }
        if (e.freeCoupon && e.freeCoupon.length > 0 && (e.freeCoupon[0].discount = this.getSpecialCouponDiscount()), 
        e) {
            e.hasPromotion && e.promotionActivityId && (this.promotionActivityId = e.promotionActivityId), 
            e.isOnsale || w.Navigation.back(), "1" == e.isApp && w.Navigation.back(), e.isVirtualGoods && this.initVirtualInfo(e);
            var g = {
                needId: [ d.default.GoodsType.OVERSEAS_TRANSSHIP, d.default.GoodsType.OVERSEAS_DM ].indexOf(parseInt(e.goodsType, 10)) >= 0 || 0 !== e.realNameAuth,
                realNameAuth: 0 !== e.realNameAuth,
                isVirtualGoods: e.isVirtualGoods,
                costTemplateId: e.costTemplateId,
                isRefundable: e.isRefundable,
                promotionEvents: e.promotionEvents,
                eventType: e.eventType
            };
            if (g.needId ? (0, _.default)(v.default.mark(function o() {
                var a, s, r;
                return v.default.wrap(function(o) {
                    for (;;) switch (o.prev = o.next) {
                      case 0:
                        return o.prev = 0, a = w.Request.requestDataWithCmd(A.getUserIdCard, {}), o.next = 4, 
                        w.Request.runMainRequestForPage(a, t);

                      case 4:
                        s = o.sent, r = {
                            realName: s.id_card_name,
                            idNumber: s.id_card_no
                        }, t.personalInfos = r, t.setIdCardInfo(r), r.hasIdInfo = !0, t.setData(r), t.setupOrderCheckoutGoodsModule(), 
                        (0, w.TrackingRecord)({
                            page_name: "order_checkout",
                            page_sn: 10004,
                            op: "impr",
                            page_section: t.data.hasIdInfo ? "real_info_prompt" : "id_card_prompt",
                            page_el_sn: t.data.hasIdInfo ? 97474 : 99646,
                            goods_id: e.goodsId,
                            sku_id: t.data.skuId,
                            classification: 0 !== e.realNameAuth ? 1 : 0
                        }), o.next = 21;
                        break;

                      case 14:
                        o.prev = 14, o.t0 = o.catch(0), t.idCardValidStatusCode = o.t0.error_code, t.idCardValidStatusCode == c.default.NoNameIDBefore.code && (t.idCardValidStatusCode = null), 
                        t.personalInfos = {}, t.setIdCardInfo({}), t.setupOrderCheckoutGoodsModule();

                      case 21:
                      case "end":
                        return o.stop();
                    }
                }, o, this, [ [ 0, 14 ] ]);
            })) : this.personalInfos = {}, !this.data.groupOrderId && e.freeCoupon && e.freeCoupon.length > 0) {
                var C = e.freeCoupon[0];
                g.showPlatformCoupon = !1, g.showFreeCoupon = !0, g.freeCoupon = {
                    couponId: C.coupon_id,
                    discount: w.StdFormat.price(C.discount, 100)
                };
            }
            this.goods.eventType !== u.default.EventType.FREE_TRIAL && this.goods.eventType !== u.default.EventType.LUCKY_DRAW || (g.showPlatformCoupon = !1), 
            this.data.skuId || (g.skuId = this.$urlQueryObj.sku_id || e.skus[0].skuId);
            var I = this.data.payType;
            I.showWechatPay = !0, 1 != e.eventType && 3 != e.eventType && 7 != e.eventType && (I.showFriendPay = !0), 
            g.payType = I, this.setData(g);
            var y = [];
            if (e.allowedRegion && "1" !== e.allowedRegion.toString() && (y = e.allowedRegion.toString().split(",")), 
            i.default.all(O).then(function() {
                t.orderCheckoutAddressModule || (t.orderCheckoutAddressModule = new r.default()), 
                t.orderCheckoutAddressModule.load(o.data.isVirtualGoods, t.data.addressArray, t.$urlQueryObj.sel_address_id, y, {
                    setDataFunc: t.componentsSetDataFuncs().orderCheckoutAddress,
                    getDataFunc: t.componentsGetDataFuncs().orderCheckoutAddress,
                    addRootFunc: w.Util.bind(t.componentsAddRootFunc, t)
                }), t.orderCheckoutAddressModule.setTrackingFunc(w.Util.bind(t.addressTracking, t)), 
                t.setData({
                    firstEnter: !1,
                    visible: !0
                });
            }), this.data.isVirtualGoods && this.goods.goodsType !== d.default.GoodsType.QQ_COIN && this.goods.goodsType !== d.default.GoodsType.OIL_CARD) {
                var D = this;
                (0, _.default)(v.default.mark(function e() {
                    var o, t, a, s, r, n, i;
                    return v.default.wrap(function(e) {
                        for (;;) switch (e.prev = e.next) {
                          case 0:
                            return e.prev = 0, o = w.Request.requestDataWithCmd(A.getChargeHistory, {}), e.next = 4, 
                            w.Request.runMainRequestForPage(o, D);

                          case 4:
                            if (t = e.sent, (a = t.records) && a.length > 0) {
                                for (s = 0; s < a.length; s++) r = a[s], (n = r.mobile) && 11 == n.length && ((i = [])[0] = n.slice(0, 3), 
                                i[1] = n.slice(3, 7), i[2] = n.slice(7, 11), a[s].mobileList = i);
                                D.setData({
                                    records: a
                                });
                            }
                            e.next = 13;
                            break;

                          case 9:
                            e.prev = 9, e.t0 = e.catch(0), console.error(e.t0), D.$showToast(e.t0.error_msg);

                          case 13:
                          case "end":
                            return e.stop();
                        }
                    }, e, this, [ [ 0, 9 ] ]);
                }));
            }
        }
    },
    setupPromotion: function() {
        var e = this.goods.promotionEvents;
        if (e && e.length > 0) {
            var t, a = e[0].event_items, s = this.data.orderCheckoutGoodsData.goodsNumber || this.data.goodsNumber || 1, r = 0, n = (t = {}, 
            o(t, "myMallCouponsData.selectedCoupon", null), o(t, "myMallCouponsData.selectedCouponId", null), 
            o(t, "selectedMallCoupon", null), t);
            if (16 != this.goods.eventType) {
                if (12 == this.goods.eventType) {
                    var i = 0;
                    for (var d in a) s >= a[d].goods_number && (r = e[0].event_id, i += a[d].discount_param);
                    r > 0 && i > 0 && (n.selectedEventId = r, n.promotionDiscount = i, this.setData(n));
                } else for (var u in a) if (s >= a[u].goods_number) {
                    r = e[0].event_id, n.selectedEventId = r, n.promotionDiscount = a[u].discount, this.setData(n);
                    break;
                }
            } else {
                var l = this.data.couponInfos, p = e[0].event_items[0].discount;
                if (r = e[0].event_id, l && l.mallCoupons && l.mallCoupons.enableCoupons && l.mallCoupons.enableCoupons.length > 0) {
                    var c = l.mallCoupons.enableCoupons;
                    100 * c[0].discount > p && (r = 0, n.selectedMallCoupon = c[0]);
                }
                n.selectedEventId = r, r > 0 && (n.promotionDiscount = p), this.setData(n);
            }
        }
    },
    getMallInfo: function() {
        var e = this, o = e.goods.mallId;
        (0, _.default)(v.default.mark(function t() {
            var a, s, r;
            return v.default.wrap(function(t) {
                for (;;) switch (t.prev = t.next) {
                  case 0:
                    return t.prev = 0, a = w.Request.requestDataWithCmd(A.getMallInfo, {
                        restfulParam: o,
                        params: {
                            goods_id: e.goods.goodsId
                        }
                    }), t.next = 4, w.Request.runMainRequestForPage(a, e);

                  case 4:
                    s = t.sent, r = D.default.formatData(s), e.processMallInfo(r), t.next = 13;
                    break;

                  case 9:
                    t.prev = 9, t.t0 = t.catch(0), console.error(t.t0), e.processMallInfo({
                        errorCode: t.t0.error_code,
                        errorMsg: t.t0.error_msg
                    });

                  case 13:
                  case "end":
                    return t.stop();
                }
            }, t, this, [ [ 0, 9 ] ]);
        }));
    },
    setupCoupons: function() {
        var e = this.goods.promotionEvents;
        if (e && e.length > 0) {
            var t;
            this.setData((t = {}, o(t, "myMallCouponsData.selectedCoupon", null), o(t, "myMallCouponsData.selectedCouponId", null), 
            o(t, "selectedMallCoupon", null), t));
        }
        var a = this.goods, s = null;
        if (!this.data.groupOrderId && a.freeCoupon && a.freeCoupon.length > 0 || 7 == a.goodsType || a.goodsType == d.default.GoodsType.MAKE_UP || a.eventType == u.default.EventType.FREE_TRIAL || a.eventType == u.default.EventType.LUCKY_DRAW) s = {
            freeCoupon: a.freeCoupon,
            mallCoupons: {
                enableCoupons: [],
                disableCoupons: []
            },
            platformCoupons: {
                enableCoupons: [],
                disableCoupons: []
            }
        }, this.setData({
            couponInfos: s
        }), this.setupOrderCheckoutGoodsModule(); else {
            var r = this.getSelectedGroup(), n = this.getSelectedSku();
            this.couponsParams = {
                goodsId: this.$urlQueryObj.goods_id || this.goods.goodsId,
                groupId: this.data.groupId,
                skuId: this.data.skuId,
                groupOrderId: this.data.groupOrderId,
                eventType: a.eventType,
                goodsNumber: this.data.orderCheckoutGoodsData.goodsNumber || this.data.goodsNumber,
                sourceMallId: a.mallId,
                price: p.default.getSelectedSkuPrice(r, n),
                limitQuantity: p.default.getLimitQuantity(n, r),
                customerNum: parseInt(r.requireNum, 10)
            }, this.loadCoupons();
        }
    },
    loadCoupons: function() {
        var e = this.couponsParams;
        e.price * e.goodsNumber <= 100 && 18 != e.eventType ? (this.setData({
            couponInfos: {
                mallCoupons: {
                    enableCoupons: [],
                    disableCoupons: []
                },
                platformCoupons: {
                    enableCoupons: [],
                    disableCoupons: []
                }
            }
        }), this.setupOrderCheckoutGoodsModule()) : this.loadMallCoupons();
    },
    loadMallCoupons: function() {
        var e = this;
        e.payBtnFlag = !0, (0, _.default)(v.default.mark(function o() {
            var t, a, r, n, i, d, u;
            return v.default.wrap(function(o) {
                for (;;) switch (o.prev = o.next) {
                  case 0:
                    return o.prev = 0, t = e.couponsParams, a = {
                        goods_id: t.goodsId,
                        group_id: t.groupId,
                        sku_id: t.skuId,
                        sku_number: t.goodsNumber,
                        source_mall_id: t.sourceMallId
                    }, t.groupOrderId && (a.group_order_id = t.groupOrderId), r = w.Request.requestDataWithCmd(A.loadMallCoupons, {
                        params: a
                    }), o.next = 7, w.Request.runMainRequestForPage(r, e);

                  case 7:
                    n = o.sent, i = n.coupons || {}, d = {
                        serverTime: n.server_time || 0,
                        enableCoupons: i.usable_coupons || [],
                        disableCoupons: i.unusable_coupon_list || []
                    }, u = s.default.formatCouponsData(d, t), e.processMallCoupons(u), o.next = 18;
                    break;

                  case 14:
                    o.prev = 14, o.t0 = o.catch(0), console.error(o.t0), e.payBtnFlag = !1;

                  case 18:
                  case "end":
                    return o.stop();
                }
            }, o, this, [ [ 0, 14 ] ]);
        }));
    },
    computePromotionDiscount: function() {
        var e = this.goods, o = !1, t = e.promotionEvents, a = void 0, s = 0;
        if (t && t.length > 0 && (o = !0, a = t[0].event_id), o) {
            var r = t[0].event_items, n = this.data.orderCheckoutGoodsData.goodsNumber || this.data.goodsNumber || 1;
            if (12 == e.eventType) for (var i in r) n >= r[i].goods_number && (s += r[i].discount); else if (16 == e.eventType) s = t[0].event_items[0].discount; else for (var d in r) if (n >= r[d].goods_number) {
                s = r[d].discount;
                break;
            }
        }
        return {
            promotionDiscount: s,
            promotionEventId: a
        };
    },
    processMallCoupons: function(e) {
        e.errorCode && e && e.errorMsg && this.$showToast(e.errorMsg);
        var o = this.goods, t = !1, a = e.enableCoupons;
        a && a.length > 0 && (t = !0);
        var s = !1, r = o.promotionEvents;
        r && r.length > 0 && (s = !0);
        var n = this.computePromotionDiscount(), i = n.promotionDiscount, d = n.promotionEventId, u = {};
        s && t ? i >= 100 * e.enableCoupons[0].discount ? u = this.choosePromotionCoupons(d, i) : (u.selectedMallCoupon = e.enableCoupons[0], 
        u.selectedEventId = 0, u.promotionDiscount = 0) : s && i > 0 ? u = this.choosePromotionCoupons(d, i) : t ? (u.selectedMallCoupon = e.enableCoupons[0], 
        u.selectedEventId = 0, u.promotionDiscount = 0) : (u.selectedMallCoupon = null, 
        u.selectedEventId = 0, u.promotionDiscount = 0), this.setData(u), this.loadPlatformCoupons(e);
    },
    choosePromotionCoupons: function(e, t) {
        var a;
        return a = {}, o(a, "myMallCouponsData.selectedCoupon", null), o(a, "myMallCouponsData.selectedCouponId", null), 
        o(a, "selectedMallCoupon", null), o(a, "selectedEventId", e), o(a, "promotionDiscount", t), 
        a;
    },
    chooseMallCouopn: function() {},
    setCouponInfosData: function(e, o) {
        var t = this.data.couponInfos || {};
        t[e] = o, this.setData({
            couponInfos: t
        });
    },
    selectCouponItem: function(e) {
        var t = void 0, a = void 0, s = void 0;
        e && e.detail && e.detail.target && e.detail.target.dataset && e.detail.target.dataset.couponId && e.detail.target.dataset.eventId && e.detail.target.dataset.isMallCoupon ? (a = e.detail.target.dataset.couponId, 
        s = e.detail.target.dataset.eventId, t = e.detail.target.dataset.isMallCoupon) : (a = e.currentTarget.dataset.couponId, 
        s = e.currentTarget.dataset.eventId, t = e.currentTarget.dataset.isMallCoupon);
        var r = this.data.selectedEventId || 0, n = t ? "myMallCouponsData" : "myPlatformCouponsData", i = t ? "selectedMallCoupon" : "selectedPlatformCoupon";
        t && (r = -1 == s || s == this.data.selectedEventId ? -1 : s);
        var d = 0;
        r > 0 && (d = this.computePromotionDiscount().promotionDiscount);
        var u = ((t ? this.data.selectedMallCoupon : this.data.selectedPlatformCoupon) || {}).couponId;
        if (0 == a || a == u) {
            var l;
            this.setData((l = {}, o(l, n + ".selectedCoupon", null), o(l, n + ".selectedCouponId", null), 
            o(l, i, null), o(l, "selectedEventId", r), o(l, "promotionDiscount", d), l));
        } else {
            var p = this.data.couponInfos || {}, c = (t ? p.mallCoupons : p.platformCoupons) || {}, h = c.enableCoupons || [], f = c.enableSuperpositionCoupons || {};
            if ("101010" == a) {
                var m;
                f.showSuperEditBtn || (f.selectedCertainNum = f.selectedNum), this.setData((m = {}, 
                o(m, n + ".selectedCoupon", f), o(m, n + ".selectedCouponId", a), o(m, i, f), o(m, "selectedEventId", r), 
                m));
            } else for (var g = 0; g < h.length; g++) if (a == h[g].couponId) {
                var C;
                this.setData((C = {}, o(C, n + ".selectedCoupon", h[g]), o(C, n + ".selectedCouponId", a), 
                o(C, i, h[g]), o(C, "selectedEventId", r), C));
                break;
            }
        }
        12 != this.data.eventType && 16 != this.data.eventType && 18 != this.data.eventType || this.hideMallCouponsList(), 
        this.hideCouponsList(), t ? this.mallCouponUpdated() : this.setPlatformCouponText();
    },
    mallCouponUpdated: function() {
        var e = (this.data.couponInfos || {}).mallCoupons || {};
        this.loadPlatformCoupons(e);
    },
    loadPlatformCoupons: function(e) {
        e.errorCode || this.setCouponInfosData("mallCoupons", e);
        var o = 0, t = this.data.selectedMallCoupon;
        o = this.data.selectedEventId > 0 && this.data.promotionDiscount > 0 ? this.data.promotionDiscount : t ? 100 * t.discount : 0;
        var a = this.couponsParams;
        a.currentOrderAmount = parseInt(a.price * a.goodsNumber - o);
        var r = this;
        (0, _.default)(v.default.mark(function e() {
            var o, t, a, n, i;
            return v.default.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    return e.prev = 0, r.usePriority = null, o = r.couponsParams, e.next = 5, r.getPlatformCoupons(r);

                  case 5:
                    t = e.sent, a = t.coupons || {}, n = {
                        serverTime: t.server_time || 0,
                        enableCoupons: a.usable_coupons || [],
                        disableCoupons: a.unusable_coupon_list || [],
                        enableSuperpositionCoupons: a.usable_superposition_coupon_vo || {}
                    }, i = s.default.formatCouponsData(n, o), r.processPlatformCoupons(i), e.next = 16;
                    break;

                  case 12:
                    e.prev = 12, e.t0 = e.catch(0), console.error(e.t0), r.payBtnFlag = !1;

                  case 16:
                  case "end":
                    return e.stop();
                }
            }, e, this, [ [ 0, 12 ] ]);
        }));
    },
    getPlatformCoupons: _.default.wrap(v.default.mark(function e(o) {
        var t, a, s, r;
        return v.default.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                return e.prev = 0, t = o.couponsParams, a = {
                    group_id: t.groupId,
                    sku_id: t.skuId,
                    sku_number: t.goodsNumber,
                    current_order_amount: t.currentOrderAmount,
                    goods_id: t.goodsId
                }, t.groupOrderId && (a.group_order_id = t.groupOrderId), o.usePriority && (a.use_priority = o.usePriority), 
                s = w.Request.requestDataWithCmd(A.getPlatformCoupons, {
                    params: a
                }), e.next = 8, w.Request.runMainRequestForPage(s, o);

              case 8:
                return (r = e.sent) && r.coupons && r.coupons.use_priority && (o.usePriority = r.coupons.use_priority), 
                e.abrupt("return", r);

              case 13:
                e.prev = 13, e.t0 = e.catch(0), console.error(e.t0), o.payBtnFlag = !1;

              case 17:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 0, 13 ] ]);
    })),
    loadMorePlatCoupons: function() {
        var e = this;
        (0, _.default)(v.default.mark(function o() {
            var t, a, r, n, i, d, u, l;
            return v.default.wrap(function(o) {
                for (;;) switch (o.prev = o.next) {
                  case 0:
                    return o.prev = 0, t = e.couponsParams, o.next = 4, e.getPlatformCoupons(e);

                  case 4:
                    a = o.sent, r = a.coupons || {}, n = r.usable_coupons || [], i = {
                        serverTime: a.server_time || 0,
                        enableCoupons: n,
                        disableCoupons: r.unusable_coupon_list || [],
                        enableSuperpositionCoupons: r.usable_superposition_coupon_vo || {}
                    }, d = s.default.formatCouponsData(i, t), u = e.data.myPlatformCouponsData, l = e.data.couponInfos, 
                    d && d.enableCoupons && (u.enableCoupons = u.enableCoupons.concat(d.enableCoupons), 
                    l && l.platformCoupons && l.platformCoupons.enableCoupons && (l.platformCoupons.enableCoupons = l.platformCoupons.enableCoupons.concat(d.enableCoupons))), 
                    e.setData({
                        myPlatformCouponsData: u,
                        couponInfos: l,
                        showCouponLoadMore: 20 == n.length
                    }), o.next = 19;
                    break;

                  case 15:
                    o.prev = 15, o.t0 = o.catch(0), console.error(o.t0), e.payBtnFlag = !1;

                  case 19:
                  case "end":
                    return o.stop();
                }
            }, o, this, [ [ 0, 15 ] ]);
        }));
    },
    processPlatformCoupons: function(e) {
        if (e.errorCode) e && e.errorMsg && this.$showToast(e.errorMsg); else {
            var o = null, t = !1, a = !1, s = "";
            e.enableSuperpositionCoupons && e.enableSuperpositionCoupons.maxAvailableNum > 0 && e.enableSuperpositionCoupons.usable && (t = !0), 
            e.enableCoupons && e.enableCoupons.length > 0 && (a = !0), t && a ? parseInt(e.enableSuperpositionCoupons.maxAvailableNum) >= parseInt(e.enableCoupons[0].discount) ? (s = "平台优惠券", 
            o = e.enableSuperpositionCoupons) : (s = this.goods.isVirtualGoods ? "话费流量优惠券" : "平台优惠", 
            o = e.enableCoupons[0]) : t ? (s = "平台优惠券", o = e.enableSuperpositionCoupons) : a ? (s = this.goods.isVirtualGoods ? "话费流量优惠券" : "平台优惠", 
            o = e.enableCoupons[0]) : e.disableCoupons.length > 0 && (s = this.goods.isVirtualGoods ? "话费流量优惠券" : "平台优惠"), 
            this.setCouponInfosData("platformCoupons", e), this.setData({
                couponTitle: s,
                selectedPlatformCoupon: o,
                hasPlatformCoupons: e.enableCoupons.length > 0 || e.disableCoupons.length > 0,
                hasSuperpositionCoupons: t,
                showCouponLoadMore: 20 == e.enableCoupons.length
            }), this.setPlatformCouponText();
        }
    },
    setPlatformCouponText: function() {
        var e = "", o = (this.data.couponInfos || {}).platformCoupons || {}, t = !!o.enableCoupons && o.enableCoupons.length > 0, a = o.enableCoupons.length > 0 || o.disableCoupons.length > 0, s = o.enableSuperpositionCoupons || {}, r = this.data.selectedPlatformCoupon, n = !1, i = !0;
        this.data.hasSuperpositionCoupons && r && "101010" == r.couponId ? (e = "- " + r.selectedNum * r.discount + "元", 
        i = !1) : !this.data.hasSuperpositionCoupons || r || t ? !t && a ? this.data.couponInfos && this.data.couponInfos.platformCoupons && "ORDER_AMOUNT_BELOW_LIMITATION" == this.data.couponInfos.platformCoupons.disableCoupons[0].disableReason ? e = "满" + this.data.couponInfos.platformCoupons.disableCoupons[0].minAmount + "减" + this.data.couponInfos.platformCoupons.disableCoupons[0].discount : this.data.couponInfos && this.data.couponInfos.platformCoupons && "COUPON_UNAVAILABLE_FOR_GOODS" == this.data.couponInfos.platformCoupons.disableCoupons[0].disableReason && (e = "新发手机不可用平台优惠", 
        n = !0) : (t || s && s.usable) && !r ? (e = "不使用优惠券", i = !1) : r && (e = "- " + r.discount + "元", 
        i = !1) : (e = "不使用优惠券", i = !1), this.setupOrderCheckoutGoodsModule(), this.setData({
            platformCouponText: e,
            hidePlatformCouponList: n,
            colorSpecail: i
        });
    },
    processAddressesInfo: function(e) {
        if (e && e.errorCode) return e && e.errorMsg && this.$showToast(e.errorMsg), this.$hideLoading(), 
        void this.setData({
            showReqError: !0
        });
        e && w.DataUtil.isArray(e) && e.length > 0 && this.setData({
            addressArray: e
        });
    },
    hideMallCouponsList: function() {
        var e = this;
        this.setData({
            "mallCouponsListData.mallMainClass": "mall-coupons-main mall-coupons-main-down"
        }), setTimeout(function() {
            e.setData({
                "mallCouponsListData.showMallCouponsList": !1
            });
        }, 250);
    },
    receiveCoupon: function(e) {
        var o = parseInt(e.currentTarget.dataset.index, 10);
        if (!this.couponTakeLock && !isNaN(o)) {
            var t = (this.data.mallCouponsListData.coupons || [])[o];
            if (t && t.canReceived) {
                this.couponTakeLock = !0;
                var a = t.startTimeForToast + "-" + t.endTimeForToast + "可用";
                this.$showLoading();
                var s = this;
                (0, _.default)(v.default.mark(function e() {
                    var o, r, n;
                    return v.default.wrap(function(e) {
                        for (;;) switch (e.prev = e.next) {
                          case 0:
                            return e.prev = 0, o = {
                                mall_id: t.mallId,
                                batch_id: t.batchId
                            }, r = w.Request.requestDataWithCmd(A.takeMerchantCoupon, {
                                params: o
                            }), e.next = 5, w.Request.runSecondaryRequestForPage(r, s);

                          case 5:
                            n = e.sent, s.processTakeCoupon(n, t.batchId, a), e.next = 13;
                            break;

                          case 9:
                            e.prev = 9, e.t0 = e.catch(0), console.error(e.t0), s.processTakeCoupon(e.t0, t.batchId, a);

                          case 13:
                          case "end":
                            return e.stop();
                        }
                    }, e, this, [ [ 0, 9 ] ]);
                }));
            }
        }
    },
    processTakeCoupon: function(e, t, a) {
        var s = this;
        if (this.couponTakeLock = !1, e.error_code) {
            this.$hideLoading();
            var r = N[e.error_code];
            if (r) {
                var n = r.split("，");
                n.length > 1 ? this.showCouponsToast(n[0], n[1]) : this.showCouponsToast(r);
            } else this.showCouponsToast(N.fail);
            (this.data.mallCouponsListData.coupons || []).forEach(function(a, r) {
                a.batchId == t && (a.canReceived = !1, e.errorCode == c.default.CouponTakenOut.code && (a.takenOut = !0, 
                a.couponDisableText = "已抢光"), s.setData(o({}, "mallCouponsListData.coupons[" + r + "]", a)));
            });
        } else this.$hideLoading(), this.showCouponsToast(N.success, a), 16 != this.data.eventType && 18 != this.data.eventType && this.setupCoupons();
        var i = this.getTrackingParams("click", "shop_coupon_tip", "receive_coupon_btn", "99221");
        i.is_success = e.error_code ? "0" : "1", (0, w.TrackingRecord)(i);
    },
    showCouponsToast: function(e, o) {
        if (e) {
            var t = this;
            this.setData({
                "mallCouponToastData.mainToast": e,
                "mallCouponToastData.subToast": o || "",
                "mallCouponToastData.single": !o,
                "mallCouponToastData.toastVisible": !0
            }), setTimeout(function() {
                t.setData({
                    "mallCouponToastData.toastVisible": !1
                });
            }, 1500);
        }
    },
    selectMallCoupon: function() {
        this.setCouponListWindowData("myMallCouponsData", (this.data.mallInfo || {}).mallName || "", (this.data.couponInfos || {}).mallCoupons || {}, !0, this.data.selectedMallCoupon, this.data.promotionEvents);
    },
    hideCouponsList: function() {
        var e = this, o = this, t = o.data.couponInfos, a = t.platformCoupons && t.platformCoupons.enableSuperpositionCoupons ? t.platformCoupons.enableSuperpositionCoupons : {};
        a.showSuperEditBtn && (a.showSuperEditBtn = !1, t.platformCoupons.enableSuperpositionCoupons = a, 
        o.initSuperEditBtn()), this.setData({
            "myMallCouponsData.mainClass": "mall-coupons-main mall-coupons-main-down",
            "myPlatformCouponsData.mainClass": "mall-coupons-main mall-coupons-main-down",
            couponInfos: t
        }), setTimeout(function() {
            e.setData({
                "myMallCouponsData.showCouponsList": !1,
                "myPlatformCouponsData.showCouponsList": !1
            });
        }, 250);
    },
    showMallCouponsList: function() {
        var e = this;
        this.hideCouponsList(), this.setData({
            "mallCouponsListData.showMallCouponsList": !0
        }), setTimeout(function() {
            e.setData({
                "mallCouponsListData.mallMainClass": "mall-coupons-main mall-coupons-main-up"
            });
        }, 100);
    },
    setFinalPayAmount: function() {
        this.payBtnFlag = !1;
        var e = void 0, o = 0, t = 0, a = this.data.selectedEventId, s = this.data.orderCheckoutGoodsData.notFormatTotalPrice || 0, r = this.data.orderCheckoutGoodsData.mallDiscount;
        this.goods.freeCoupon && this.goods.freeCoupon.length > 0 && this.data.showFreeCoupon && (o = (this.goods.freeCoupon[0] || {}).discount || 0);
        var n = this.data.selectedPlatformCoupon;
        n && n.couponId && (t = "101010" == n.couponId ? Math.round(100 * n.discount * n.selectedNum) : Math.round(100 * n.discount));
        var i = o + t, d = w.StdFormat.price(i + r, 100);
        e = w.StdFormat.price(s - i + 100 * this.data.freight, 100), this.setData({
            finalPayAmount: e,
            totalDiscountAmount: d,
            bottomBarVisible: !0,
            selectedEventId: a
        }), this.setBottomBarPayText();
    },
    clickMobileInput: function() {
        this.data.disableUserAction && this.$showToast("订单已生成，信息不可更改");
    },
    clearPhoneNumber: function() {
        this.setData({
            phoneNumber: ""
        });
    },
    selectPhoneNumber: function(e) {
        var o = e.currentTarget.dataset ? e.currentTarget.dataset.numberValue : "";
        this.setData({
            phoneNumber: o,
            hideNumberList: !0
        });
    },
    inputPhoneNumber: function(e) {
        this.setData({
            phoneNumber: e.detail.value
        });
    },
    focusPhoneInput: function() {
        this.setData({
            isShowClearBtn: !0,
            hideNumberList: !1
        });
    },
    blurPhoneInput: function() {
        this.setData({
            isShowClearBtn: !1,
            hideNumberList: !0
        });
    },
    componentsSetDataFuncs: function() {
        var e = this, o = this;
        return {
            orderCheckoutAddress: function(e) {
                var t = o.data.orderCheckoutAddressData || {};
                for (var a in e) t[a] = e[a];
                o.setData({
                    orderCheckoutAddressData: t
                }), o.data.orderCheckoutAddressData && o.data.orderCheckoutAddressData.addressInfo && o.data.orderCheckoutAddressData.addressInfo.provinceId > 0 && void 0 != o.data.orderCheckoutGoodsData.goodsNumber && o.getPostageChange();
            },
            orderCheckoutGoods: function(t) {
                var a = {};
                for (var s in t) "coupons" != s && (a["orderCheckoutGoodsData." + s] = t[s]);
                t.coupons && (a["mallCouponsListData.coupons"] = t.coupons), o.setData(a), t.getPostage && o.data.orderCheckoutAddressData && o.data.orderCheckoutAddressData.addressInfo && o.data.orderCheckoutAddressData.addressInfo.provinceId > 0 && void 0 != o.data.orderCheckoutGoodsData.goodsNumber ? o.getPostageChange() : t.getPostage && e.setFinalPayAmount();
            }
        };
    },
    componentsGetDataFuncs: function() {
        var e = this;
        return {
            orderCheckoutAddress: function() {
                return e.data.orderCheckoutAddressData;
            },
            orderCheckoutGoods: function() {
                return e.data.orderCheckoutGoodsData;
            }
        };
    },
    componentsAddRootFunc: function(e, o) {
        e && "function" == typeof o && (this[e] = o);
    },
    onUnload: function() {
        b.default.isLastPagePayPage = !0, b.default.showUnpaidOrderDialog = !0, this.unregisterDispatchCallback(), 
        h.default.close(this), this.countExpireInterval && (clearInterval(this.countExpireInterval), 
        this.countExpireInterval = null);
    },
    onHide: function() {
        h.default.close(this), this.countExpireInterval && (clearInterval(this.countExpireInterval), 
        this.countExpireInterval = null);
    },
    unregisterDispatchCallback: function() {
        T.Message.off(T.KEYS.ORDER_CHECKOUT_PAY);
    },
    loadData: function() {
        var e = this;
        (M = this.getOrderGoodsDetail({
            goodsId: this.data.goodsId,
            groupId: this.data.groupId
        })) && O.push(M), (x = a.default.getAddressesInfo(function(o) {
            e.processAddressesInfo(o);
        })) && O.push(x);
    },
    getOrderGoodsDetail: function(e) {
        var o = this, t = void 0, a = void 0;
        return e && (t = e.goodsId, a = e.groupId), t ? (0, _.default)(v.default.mark(function e() {
            var s, r, n;
            return v.default.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    return e.prev = 0, s = w.Request.requestDataWithCmd(A.getOrderGoodsDetail, {
                        restfulParam: t,
                        params: {
                            group_id: a
                        }
                    }), e.next = 4, w.Request.runMainRequestForPage(s, o);

                  case 4:
                    r = e.sent, n = k.default.formatData(r), o.processGoodsDetail(n), e.next = 12;
                    break;

                  case 9:
                    e.prev = 9, e.t0 = e.catch(0), console.error(e.t0);

                  case 12:
                  case "end":
                    return e.stop();
                }
            }, e, this, [ [ 0, 9 ] ]);
        })) : null;
    },
    getSpecialCouponDiscount: function(e) {
        return e = e || 0, this.getSelectedSkuPrice() - e;
    },
    onPullDownRefresh: function() {
        this.loadPage();
    },
    reLoad: function() {
        this.loadPage();
    },
    loadPage: function() {
        this.data.showReqError && (this.$showLoading(), this.setData({
            showReqError: !1
        })), O = [], this.personalInfos = null, this.preLoadPage(), this.loadData();
    },
    checkRealNameValid: function(e) {
        return /^[\u4e00-\u9fa5]{2,10}([.·]{0,1}[\u4e00-\u9fa5]+)*$/gi.test(e);
    },
    checkIdNumberValid: function(e) {
        return !!e && /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(e.toString());
    },
    validateIdCardInfo: function() {
        return this.checkRealNameValid(this.data.realName) && this.checkIdNumberValid(this.data.idNumber);
    },
    submitIdCardInfo: function(e) {
        var o = e.detail.value || {}, t = o.realName || "", a = o.idNumber || "";
        t = t.replace(/\s+/g, ""), a = a.replace(/\s+/g, "").toString().toUpperCase(), this.setData({
            realName: t,
            idNumber: a
        }), this.setIdCardInfo({
            realName: t,
            idNumber: a
        }), (0, w.TrackingRecord)({
            page_name: "order_checkout",
            page_sn: 10004,
            op: "click",
            page_section: "id_card_popup",
            page_element: "save_btn",
            page_el_sn: 99977,
            goods_id: this.data.goodsId,
            sku_id: this.data.skuId,
            classification: this.data.realNameAuth ? 1 : 0
        });
        var s = w.StorageUtil.getStorageSync("idcard-modify-times") || {}, r = new Date(), n = r.getMonth() + 1 + "-" + r.getDate();
        if (this.data.needId && this.data.realNameAuth && (s[n] || 0) >= 10) this.$showToast("您今日认证过于频繁，请明天再试", {
            showDuration: 3e3
        }); else if (this.validateIdCardInfo()) {
            this.$showLoading();
            var i = {
                id_card_name: this.data.realName,
                id_card_no: this.data.idNumber
            }, d = this;
            (0, _.default)(v.default.mark(function e() {
                var o, t;
                return v.default.wrap(function(e) {
                    for (;;) switch (e.prev = e.next) {
                      case 0:
                        if (e.prev = 0, o = void 0, !d.data.needId || !d.data.realNameAuth) {
                            e.next = 7;
                            break;
                        }
                        return e.next = 5, w.Request.apiRequest("POST", I.default.userIdCardWithAuth, i, !0, {});

                      case 5:
                        e.next = 10;
                        break;

                      case 7:
                        return o = w.Request.requestDataWithCmd(A.addUserIdCard, {
                            params: i
                        }), e.next = 10, w.Request.runSecondaryRequestForPage(o, d);

                      case 10:
                        d.data.needId && d.data.realNameAuth && (s[n] = s[n] ? s[n] + 1 : 1, w.StorageUtil.setStorage("idcard-modify-times", s)), 
                        t = d.nextStepIsPay, d.$hideLoading(), d.data.hasIdInfo || (0, w.TrackingRecord)({
                            page_name: "order_checkout",
                            page_sn: 10004,
                            op: "impr",
                            page_section: "real_info_prompt",
                            page_el_sn: 97474,
                            goods_id: d.data.goodsId,
                            sku_id: d.data.skuId,
                            classification: d.data.realNameAuth ? 1 : 0
                        }), d.setData({
                            hasIdInfo: !0
                        }), d.hideIdCardPopup(), d.personalInfos.realName && d.personalInfos.idNumber, d.$showToast("实名认证成功"), 
                        t && d.pay(), e.next = 25;
                        break;

                      case 20:
                        e.prev = 20, e.t0 = e.catch(0), d.$hideLoading(), d.data.needId && d.data.realNameAuth && (s[n] = s[n] ? s[n] + 1 : 1, 
                        w.StorageUtil.setStorage("idcard-modify-times", s)), 43008 === e.t0.error_code ? d.$showToast("姓名和身份证不匹配，请重新认证") : d.$showToast(e.t0.error_msg);

                      case 25:
                      case "end":
                        return e.stop();
                    }
                }, e, this, [ [ 0, 20 ] ]);
            }));
        } else this.invalidIdCardInfoCount++, this.checkRealNameValid(this.data.realName) ? this.checkIdNumberValid(this.data.idNumber) || this.$showToast("请输入正确的身份证号码", {
            showDuration: 3e3
        }) : this.$showToast("请输入正确的姓名", {
            showDuration: 3e3
        }), 3 === this.invalidIdCardInfoCount && this.$showToast(this.data.needId && !this.data.realNameAuth ? "错误的身份信息将可能导致您的商品无法通关，请重新填写" : "请输入正确的身份证号码", {
            showDuration: 3e3
        });
    },
    hideIdCardHint: function() {
        this.setData({
            idCardHintVisible: !1
        });
    },
    showIdCardHint: function() {
        this.setData({
            idCardHintVisible: !0
        });
    },
    onLoad: function(e) {
        this.pvTracking(), this.$showLoading();
        var o = this;
        (o.$urlQueryObj.source_channel || "likes" == o.$urlQueryObj.refer_page_name) && (o.sourceChannel = o.$urlQueryObj.source_channel || d.default.SourceChannel.PERSONAL_COLLECTION), 
        "scan_code" == o.$urlQueryObj.share_form && (o.orderScanCode = "scan_code"), b.default.hasCreatedOrder = !1, 
        b.default.lastOrderCheckoutOptions = e, e && (e = w.UrlUtil.parseQuery(e), this.urlParams = e, 
        e.mobile && this.setData({
            phoneNumber: e.mobile,
            hasMobile: !0
        }), this.setData({
            goodsId: e.goods_id,
            groupId: e.group_id,
            groupNum: e.group_num,
            skuId: e.sku_id,
            goodsNumber: parseInt(e.goods_number || 1, 10),
            groupOrderId: e.group_order_id
        }), b.default.lastPayGoodsId = e.goods_id), o.quickEntryControl = new g.default({
            page: o,
            ns: "quickEntryControl"
        }), this.loadPage();
    },
    onPageScroll: function() {},
    modalFooterRightFunc: function() {
        var e = this.$urlQueryObj.goods_id;
        e && this.$forward("goods", {
            goods_id: e
        });
    },
    addAddress: function() {
        this.loadEditAddressModule();
        var e = this.getTrackingParams("click", "addresses", "add_address");
        (0, w.TrackingRecord)(e);
    },
    wechatAddAddress: function() {
        function e() {
            wx.chooseAddress({
                success: function(e) {
                    if (null != e.nationalCode && null != e.detailInfo && null != e.userName && null != e.telNumber) {
                        var t = {
                            national_code: e.nationalCode,
                            address: e.detailInfo,
                            name: e.userName,
                            mobile: e.telNumber,
                            is_default: 0
                        };
                        o.$showLoading(), (0, _.default)(v.default.mark(function e() {
                            var a, s, r;
                            return v.default.wrap(function(e) {
                                for (;;) switch (e.prev = e.next) {
                                  case 0:
                                    return e.prev = 0, a = w.Request.requestDataWithCmd(A.addWxAddress, {
                                        params: t
                                    }), e.next = 4, w.Request.runSecondaryRequestForPage(a, o);

                                  case 4:
                                    s = e.sent, o.$hideLoading(), r = new m.default(s), o.updateAddress(r), e.next = 14;
                                    break;

                                  case 10:
                                    e.prev = 10, e.t0 = e.catch(0), o.$hideLoading(), e.t0.error_msg && o.$showToast(e.t0.error_msg);

                                  case 14:
                                  case "end":
                                    return e.stop();
                                }
                            }, e, this, [ [ 0, 10 ] ]);
                        }));
                    } else o.$showToast("地址信息不完整，无法导入");
                }
            });
        }
        if (wx.chooseAddress) {
            var o = this;
            (0, _.default)(v.default.mark(function o() {
                var t, a;
                return v.default.wrap(function(o) {
                    for (;;) switch (o.prev = o.next) {
                      case 0:
                        return t = !1, o.next = 3, w.User.authorize("scope.address", function() {
                            (0, w.TrackingRecord)({
                                op: "impr",
                                page_section: "auth_prompt",
                                refer_page_element: "wechat_add_address",
                                page_el_sn: 99615
                            }), t = !0;
                        });

                      case 3:
                        (a = o.sent) ? e() : w.User.showAuthorizeModelDialog("scope.address"), t && (0, 
                        w.TrackingRecord)({
                            op: "click",
                            page_section: "auth_prompt",
                            page_element: a ? "approve" : "refuse",
                            page_el_sn: a ? 99899 : 99898,
                            refer_page_element: "wechat_add_address"
                        });

                      case 6:
                      case "end":
                        return o.stop();
                    }
                }, o, this);
            }));
            var t = this.getTrackingParams("click", "addresses", "wechat_add_address");
            (0, w.TrackingRecord)(t);
        } else this.$showToast("您的版本暂不支持，请升级到更高版本~");
    },
    loadEditAddressModule: function() {
        this.$showLoading();
        var e = this;
        a.default.fetchRegionsJsonData(function() {
            e.execAddressWindowLoad();
        });
    },
    updateAddress: function(e) {
        e && this.orderCheckoutAddressModule && this.orderCheckoutAddressModule.updateOrderAddress(e);
    },
    execAddressWindowLoad: function() {
        var e = a.default.getRegions();
        if (e) {
            var o = this;
            this.editAddressModule || (this.editAddressModule = new f.default()), (0, _.default)(v.default.mark(function t() {
                var a;
                return v.default.wrap(function(t) {
                    for (;;) switch (t.prev = t.next) {
                      case 0:
                        return t.next = 2, w.User.authorize("scope.userLocation");

                      case 2:
                        a = t.sent, o.editAddressModule.hasLocationAuth = a, o.editAddressModule.load(null, function() {
                            o.editAddressModule.show(), o.$hideLoading();
                        }, function(e) {
                            o.editAddressModule.hide(), o.updateAddress(e);
                        }, {
                            setDataFunc: function(e) {
                                var t = {};
                                for (var a in e) t["addressData." + a] = e[a];
                                o.setData(t);
                            },
                            getDataFunc: function() {
                                return o.data.addressData;
                            },
                            addRootFunc: w.Util.bind(o.componentsAddRootFunc, o),
                            windowTitle: "新增地址",
                            regionsDatas: e
                        });

                      case 5:
                      case "end":
                        return t.stop();
                    }
                }, t, this);
            }));
        }
    },
    selectPayType: function(e) {
        var o = e.detail.target.dataset.name, t = this.data.payType;
        if ("friendPay" == o) {
            t.wechatPay = !1, t.friendPay = !0;
            var a = this.getTrackingParams("click", null, "friend_pay_btn");
            a.goods_number = this.data.orderCheckoutGoodsData.goodsNumber, a.coupon_usage = this.getCouponUsageForTrackingRecord(), 
            a.goods_price = this.getSelectedSkuPrice(), a.sku_id = this.$urlQueryObj.sku_id, 
            (0, w.TrackingRecord)(a);
        } else "wechatPay" == o && (t.wechatPay = !0, t.friendPay = !1);
        this.setData({
            payType: t
        }), this.$uploadFormId(e, !1);
    },
    onShow: function() {
        if (this.countExpireInterval || this.countDownTimeSpike(), this.goToHelpPay) return b.default.hasPaySucess = !0, 
        wx.navigateBack(), void (this.goToHelpPay = !1);
        var e = getCurrentPages(), o = e[e.length - 1].__route__;
        o += "?" + w.UrlUtil.buildQuery(this.$urlQueryObj), h.default.init(this, !0, o, 1), 
        b.default.isFromAppOnShow || this.$firstTimeTrackRecord.pv || this.pvTracking(!0);
    },
    pvTracking: function(e) {
        var o = {
            op: "pv",
            page_name: "order_checkout",
            goods_id: this.$urlQueryObj.goods_id,
            group_id: this.$urlQueryObj.group_id,
            sku_id: this.$urlQueryObj.sku_id
        };
        e && (o.is_back = 1), (0, w.TrackingRecord)(o), this.$firstTimeTrackRecord.pv = !0;
    },
    addressTracking: function(e) {
        var o = "addresses";
        "alt_add" === e && (o = "cancel_pay_prompt");
        var t = this.getTrackingParams("click", o, e);
        "alt_add" === e && (t.page_el_sn = 99120), (0, w.TrackingRecord)(t);
    },
    getTrackingParams: function(e, o, t, a) {
        var s = this.goods || {}, r = {
            op: e,
            page_name: "order_checkout",
            page_section: o,
            page_element: t,
            goods_id: s.goodsId,
            event_type: s.eventType,
            group_id: this.data.groupId,
            goods_number: this.data.orderCheckoutGoodsData.goodsNumber,
            sku_id: this.data.skuId,
            order_sn: this.orderSn
        };
        return a && (r.page_el_sn = a), r;
    },
    closePayWindow: function(e) {
        this.setData({
            showPayWindow: !1
        }), this.dealPayWindow(!1);
        var o = this.getTrackingParams("click", "cancel_pay_prompt", "close_btn");
        o.page_el_sn = 99121, (0, w.TrackingRecord)(o), this.$uploadFormId(e, !0);
    },
    dealPayWindow: function(e) {
        var o = this;
        if (e) {
            if (!o.data.showPayWindow) {
                var t = this.getTrackingParams("impr", "cancel_pay_prompt", null);
                t.page_el_sn = 99122, (0, w.TrackingRecord)(t);
            }
            o.setData({
                showPayWindow: e
            }), setTimeout(function() {
                o.setData({
                    showPayContainer: e
                });
            }, 200);
        } else o.setData({
            showPayContainer: e
        }), setTimeout(function() {
            o.setData({
                showPayWindow: e
            });
        }, 200);
    }
};

(0, w.PddPage)(E, {
    pageName: "order_checkout",
    pageSn: 10004,
    notUseCommonPV: !0
});