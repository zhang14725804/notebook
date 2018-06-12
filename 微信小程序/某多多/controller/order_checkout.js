function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var r = e(require("../libs/anti_robot")), o = e(require("../common/data_util")), a = e(require("../common/request")), t = require("../common/index"), d = e(require("../common/payment")), u = e(require("../configs/app_config")), n = e(require("../constants/payment")), s = e(require("../storage/ram_manager")), i = e(require("../configs/request_errors")), p = require("../common/message"), c = e(require("../libs/co/we-index")), _ = e(require("../libs/regenerator-runtime/runtime")), g = {
    doPay: function(e, r) {
        e && d.default.pay(e, function() {
            p.Message.emit(r, {
                orderSn: e
            });
        }, function(o) {
            p.Message.emit(r, {
                errorCode: o.errorCode,
                errorMsg: o.errorMsg,
                orderSn: e
            });
        }, function(o) {
            n.default.isCancelPay(o.errMsg) && p.Message.emit(r, {
                errorCode: "-1",
                errorMsg: o.errMsg,
                orderSn: e
            });
        });
    },
    createOrder: function(e, d) {
        var n = e.logId || o.default.getLogId(), p = e.addressId, g = e.skuId, l = e.skuNumber || 1, f = {
            address_id: p,
            goods: [ {
                sku_id: g,
                sku_number: l,
                goods_id: e.goodsId
            } ],
            merchant_coupon_id: e.mallCouponId,
            app_id: u.default.appId,
            version: 1
        };
        e.duoduo_type && (f.type = e.duoduo_type), e.sourceChannel && (f.source_channel = e.sourceChannel), 
        e.activityId && (f.activity_id = e.activityId), e.platformCouponId && (f.coupon_id = e.platformCouponId), 
        e.couponNumber && (f.coupon_number = e.couponNumber), e.groupId && (f.group_id = e.groupId), 
        e.groupOrderId && (f.group_order_id = e.groupOrderId), e.phoneNumber && (f.charge_mobile = e.phoneNumber), 
        e.groupCaptainCoupon && e.groupCaptainCoupon.couponId > 0 && (f.coupon_id = e.groupCaptainCoupon.couponId), 
        e.groupFreeCoupon && e.groupFreeCoupon.couponId > 0 && (f.coupon_id = e.groupFreeCoupon.couponId), 
        e.eventId && e.eventId > 0 && (f.event_id_list = [ e.eventId ]);
        var m = {
            op: "event",
            sub_op: "create_order",
            goods_id: e.goodsId,
            goods_type: e.goodsType,
            event_type: e.eventType,
            group_id: e.groupId,
            goods_number: l,
            group_num: e.groupNum,
            sku_id: g,
            order_amount: parseInt(e.orderAmount, 10),
            auto_group: e.isAutoGroup ? "1" : "0",
            log_id: n,
            app_id: u.default.appId,
            friend_pay: e.friendPay
        };
        for (var I in s.default.readActivityPages) m["refer_xcx_campaign_" + I] = 1;
        var v = this;
        (0, c.default)(_.default.mark(function u() {
            var p, c, g, l, I;
            return _.default.wrap(function(u) {
                for (;;) switch (u.prev = u.next) {
                  case 0:
                    return u.prev = 0, p = new r.default({
                        serverTime: Date.parse(new Date())
                    }), c = o.default.generateAntiContent(p), g = a.default.requestDataWithCmd("10284", {
                        params: Object.assign({}, f, {
                            anti_content: c
                        }),
                        urlParams: {
                            log_id: n
                        }
                    }), u.next = 6, a.default.runSecondaryRequestForPage(g, s.default.CPPage);

                  case 6:
                    l = u.sent, p.clearCache(), m.group_order_id = l.group_order_id, I = l && l.order_sn ? l.order_sn : null, 
                    m.order_sn = I, (0, t.TrackingRecord)(m), v.createOrderSuc(I, e, d), u.next = 19;
                    break;

                  case 15:
                    u.prev = 15, u.t0 = u.catch(0), u.t0 && "42007" == u.t0.error_code ? s.default.CPPage.$showToast("此拼团已满，正在发起新拼单...", {
                        hideToastFunc: function() {
                            s.default.CPPage.$showLoading(), v.groupFullOrderCreate(e, d);
                        }
                    }) : v.createOrderFail(u.t0, d), u.t0 && u.t0.error_code && i.default.errorInfos[u.t0.error_code] && (s.default.isOrderForbidden = !0);

                  case 19:
                  case "end":
                    return u.stop();
                }
            }, u, this, [ [ 0, 15 ] ]);
        }));
    },
    createOrderFail: function(e, r) {
        var o = {
            errorCode: e.error_code,
            errorMsg: e.error_code && i.default.errorInfos[e.error_code] ? i.default.errorInfos[e.error_code].message : e.error_msg
        };
        e && e.error_code && "4000006" == e.error_code && (o.errorMsg = e.error_msg), p.Message.emit(r, o);
    },
    groupFullOrderCreate: function(e, r) {
        var o = this;
        (0, c.default)(_.default.mark(function t() {
            var d, n, i;
            return _.default.wrap(function(t) {
                for (;;) switch (t.prev = t.next) {
                  case 0:
                    return t.prev = 0, d = {
                        address_id: e.addressId,
                        goods: [ {
                            sku_id: e.skuId,
                            sku_number: e.skuNumber || 1,
                            goods_id: e.goodsId
                        } ],
                        is_app: 0,
                        mall_id: e.mallId,
                        unit_price: e.unitPrice,
                        goods_event_type: e.eventType,
                        pay_app_id: u.default.appId
                    }, e.groupId && (d.group_id = e.groupId), n = a.default.requestDataWithCmd("10350", {
                        params: d
                    }), t.next = 6, a.default.runSecondaryRequestForPage(n, s.default.CPPage);

                  case 6:
                    i = t.sent, s.default.CPPage.$hideLoading(), i && i.order_sn && o.createOrderSuc(i.order_sn, e, r), 
                    t.next = 14;
                    break;

                  case 11:
                    t.prev = 11, t.t0 = t.catch(0), o.createOrderFail(t.t0, r);

                  case 14:
                  case "end":
                    return t.stop();
                }
            }, t, this, [ [ 0, 11 ] ]);
        }));
    },
    createOrderSuc: function(e, r, o) {
        e && (s.default.hasCreatedOrder = !0, s.default.lastOrderSn = e, s.default.hasPaySucess = !1, 
        r && (0 == r.finalPrice || r.friendPay) ? p.Message.emit(o, {
            orderSn: e
        }) : this.doPay(e, o));
    },
    groupFullAutoPrepay: function(e, r) {
        var o = this;
        (0, c.default)(_.default.mark(function t() {
            var d, n, i;
            return _.default.wrap(function(t) {
                for (;;) switch (t.prev = t.next) {
                  case 0:
                    return t.prev = 0, d = {
                        order_sn: e,
                        pay_app_id: u.default.appId,
                        is_app: 0
                    }, n = a.default.requestDataWithCmd("10436", {
                        params: d
                    }), t.next = 5, a.default.runSecondaryRequestForPage(n, s.default.CPPage);

                  case 5:
                    (i = t.sent) && i.order_sn && o.createOrderSuc(i.order_sn, {}, r), t.next = 12;
                    break;

                  case 9:
                    t.prev = 9, t.t0 = t.catch(0), o.createOrderFail(t.t0, r);

                  case 12:
                  case "end":
                    return t.stop();
                }
            }, t, this, [ [ 0, 9 ] ]);
        }));
    }
};

exports.default = g;