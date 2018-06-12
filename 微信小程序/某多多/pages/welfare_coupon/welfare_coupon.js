function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var t = require("../../common/index"), o = e(require("../../configs/api")), r = e(require("../../common/request")), a = e(require("../../libs/co/we-index")), s = e(require("../../libs/regenerator-runtime/runtime")), i = e(require("../../common/std_format")), n = e(require("../../storage/user_storage")), c = {
    44025: "超过领取上限",
    44026: "优惠券已抢光",
    100004: "网络异常",
    44027: "优惠券已失效",
    44079: "抢券异常",
    100001: "网络错误",
    100002: "优惠券已发完",
    100003: "优惠券已失效"
};

(0, t.PddPage)({
    isFirstEnter: !0,
    data: {
        hideToastCon: !0,
        subToastText: "前往商品页中..."
    },
    onShareAppMessage: function() {
        var e = this, t = this.options;
        return e.$generateShareContent({
            title: e.shareDesc,
            queries: t
        });
    },
    onLoad: function(e) {
        var o = this;
        this.$showLoading(), e && (this.options = e, this.$urlQueryObj.goods_id && (this.goodsId = this.$urlQueryObj.goods_id, 
        this.pid = this.$urlQueryObj.pid)), t.User.requireLogin(function() {
            o.pvTracking(), o.loadPage();
        }, function() {
            o.pvTracking(), o.loadPage();
        });
    },
    loadPage: function(e) {
        var t = this;
        (0, a.default)(s.default.mark(function o() {
            var r, a, n, c, u, d, p, l, f, g, h, v;
            return s.default.wrap(function(o) {
                for (;;) switch (o.prev = o.next) {
                  case 0:
                    return o.prev = 0, o.next = 3, [ t.getFetchInfo(t), t.getGoodsInfo(t), t.getGoodsDetail(t.goodsId, t), t.getTrackingData(t) ];

                  case 3:
                    if (r = o.sent, t.$hideLoading(), t.isFirstEnter = !1, a = r[0], n = {}, c = void 0, 
                    a && a.result && (c = t.formatCouponInfo(a.result), n.couponInfo = c), !a || !a.error_code) {
                        o.next = 13;
                        break;
                    }
                    return t.processTakeCoupon(a, e), o.abrupt("return");

                  case 13:
                    u = r[1], d = void 0, u && u.result && (d = u.result, p = i.default.price(d.goodsFactPrice, 100), 
                    d.goodsFactPriceStd = p, l = i.default.price(d.goodsFactPrice - d.couponPrice, 100), 
                    d.couponPriceStd = l, f = i.default.sales(d.soldQuantity), d.salesStd = f, n.goodsDetail = d), 
                    c && d && (t.shareDesc = "【抢" + c.standardPrice + "元无门槛优惠券】" + d.couponPriceStd + "元购买" + d.goodsName), 
                    (g = r[2]) && g.service_promise && (h = g.service_promise, n.servicePromise = h), 
                    n.serviceMainClass = "service-detail-hidden", a && c && c.couponEnd && (v = a.server_time) > c.couponEnd && (n.hideToastCon = !1, 
                    n.toastIcon = "not_success_icon", n.toastText = "优惠券已失效", n.subToastText = "前往商品页中...", 
                    setTimeout(function() {
                        t.goToGoodsDetailAction(), t.setData({
                            hideToastCon: !0
                        });
                    }, 500)), t.$hideLoading(), t.setData(n), o.next = 30;
                    break;

                  case 25:
                    o.prev = 25, o.t0 = o.catch(0), console.error(o.t0), t.isFirstEnter = !1, t.$hideLoading();

                  case 30:
                  case "end":
                    return o.stop();
                }
            }, o, this, [ [ 0, 25 ] ]);
        }));
    },
    getTrackingData: a.default.wrap(s.default.mark(function e(t) {
        var o;
        return s.default.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                return e.prev = 0, o = {
                    pid: t.pid,
                    goodsId: t.goodsId
                }, t.options && t.options.type && (o.type = t.options.type), e.next = 5, r.default.apiRequest("POST", "api/jinbao/order/add/click", o, !1, {
                    forceUseApiV2: !0
                });

              case 5:
                e.next = 10;
                break;

              case 7:
                e.prev = 7, e.t0 = e.catch(0), console.error(e.t0);

              case 10:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 0, 7 ] ]);
    })),
    onShow: function() {
        this.isFirstEnter || this.loadPage("isOnShow");
    },
    formatCouponInfo: function(e) {
        if (e.coupon_id) {
            var o = e.coupon_start, r = e.coupon_end, a = e.coupon_id, s = e.mall_id, n = e.coupon_price, c = void 0, u = void 0, d = void 0;
            if (o > 0) {
                var p = t.TimeUtil.getTimeMaterialFromTimePoint(o);
                c = [ p.year, p.month, p.date ].join(".");
            }
            if (r > 0) {
                var l = t.TimeUtil.getTimeMaterialFromTimePoint(r);
                u = [ l.year, l.month, l.date ].join(".");
            }
            return n > 0 && (d = i.default.price(n, 100)), {
                couponStart: o,
                couponEnd: r,
                couponId: a,
                mallId: s,
                couponStartTime: c,
                couponEndTime: u,
                standardPrice: d
            };
        }
    },
    getFetchInfo: a.default.wrap(s.default.mark(function e(t) {
        var a, i;
        return s.default.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                return e.prev = 0, a = o.default.getFetchCoupon, e.next = 4, r.default.apiRequest("POST", a, {
                    goodsId: t.goodsId
                }, !1);

              case 4:
                return i = e.sent, e.abrupt("return", i);

              case 8:
                e.prev = 8, e.t0 = e.catch(0), console.error(e.t0), e.t0 && e.t0.error_msg && t.$showToast(e.t0.error_msg);

              case 12:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 0, 8 ] ]);
    })),
    getGoodsInfo: a.default.wrap(s.default.mark(function e(t) {
        var a, i;
        return s.default.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                return e.prev = 0, a = o.default.getGoodsInfo, e.next = 4, r.default.apiRequest("GET", a, {
                    goodsId: t.goodsId
                }, !1, {
                    forceUseApiMss: !0
                });

              case 4:
                return i = e.sent, e.abrupt("return", i);

              case 8:
                e.prev = 8, e.t0 = e.catch(0), console.error(e.t0), e.t0 && e.t0.error_msg && t.$showToast(e.t0.error_msg);

              case 12:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 0, 8 ] ]);
    })),
    getGoodsDetail: a.default.wrap(s.default.mark(function e(t, a) {
        var i, n;
        return s.default.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                return e.prev = 0, i = o.default.v2GoodsDetail + t + "?goods_id=" + t, e.next = 4, 
                r.default.apiRequest("GET", i, null, !0);

              case 4:
                return n = e.sent, e.abrupt("return", n);

              case 8:
                e.prev = 8, e.t0 = e.catch(0), console.error(e.t0), a.showError(e.t0);

              case 12:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 0, 8 ] ]);
    })),
    takeCoupon: function(e) {
        var t = this;
        t.$showLoading(), (0, a.default)(s.default.mark(function e() {
            var a, i, n, c;
            return s.default.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    return e.prev = 0, a = t.data.couponInfo ? t.data.couponInfo : {}, i = o.default.takeFetchCoupon, 
                    n = {
                        mallId: a.mallId,
                        goodsId: t.goodsId,
                        batchId: a.couponId
                    }, e.next = 6, r.default.apiRequest("POST", i, n, !1);

                  case 6:
                    c = e.sent, t.$hideLoading(), t.processTakeCoupon(c, "isTakeCoupon"), t.takeCouponTracking(), 
                    e.next = 17;
                    break;

                  case 12:
                    e.prev = 12, e.t0 = e.catch(0), t.processTakeCoupon(e.t0, "isTakeCoupon"), t.$hideLoading(), 
                    t.takeCouponTracking();

                  case 17:
                  case "end":
                    return e.stop();
                }
            }, e, this, [ [ 0, 12 ] ]);
        })), t.$uploadFormId(e, !0);
    },
    takeCouponTracking: function() {
        var e = {
            op: "click",
            page_sn: "10220",
            page_el_sn: "98610",
            cps: this.getCommonTrackingParam()
        };
        (0, t.TrackingRecord)(e);
    },
    processTakeCoupon: function(e, t) {
        var o = this, r = {
            hideToastCon: !1
        };
        e.result && (r.toastIcon = "success_icon", r.toastText = "抢券成功");
        var a = void 0;
        e.error_code && (a = e.error_code, r.toastIcon = "not_success_icon", r.toastText = c[a], 
        r.subToastText = "100004" == a || "100001" == a ? "重新试试吧..." : "前往商品页中..."), o.setData(r), 
        "isTakeCoupon" == t ? setTimeout(function() {
            o.setData({
                hideToastCon: !0
            }), "100004" != a && "100001" != a && o.goToGoodsDetailAction();
        }, 500) : "isOnShow" == t ? setTimeout(function() {
            o.setData({
                hideToastCon: !0
            }), "100004" != a && "100001" != a && o.goToGoodsDetailAction();
        }, 500) : (o.setData({
            hideToastCon: !0
        }), "100004" != a && "100001" != a && o.goToGoodsDetailAction());
    },
    goToGoodsDetail: function(e) {
        var o = {
            op: "click",
            page_sn: "10220",
            page_el_sn: "98608"
        };
        (0, t.TrackingRecord)(o), this.goToGoodsDetailAction(), this.$uploadFormId(e);
    },
    goToGoodsDetailAction: function() {
        this.$forward("goods", {
            goods_id: this.goodsId,
            duoduo_type: 3
        });
    },
    showServiceDetail: function() {
        var e = this;
        this.setData({
            serviceDetailVisible: !0
        }), setTimeout(function() {
            e.setData({
                serviceMainClass: "service-detail-show"
            });
        }, 100);
    },
    hideServiceDetail: function() {
        var e = this;
        this.setData({
            serviceMainClass: "service-detail-hidden"
        }), setTimeout(function() {
            e.setData({
                serviceDetailVisible: !1
            });
        }, 200);
    },
    pvTracking: function() {
        var e = {
            page_sn: 10220,
            op: "pv",
            cps: this.getCommonTrackingParam()
        };
        (0, t.TrackingRecord)(e), this.$firstTimeTrackRecord.pv = !0;
    },
    getCommonTrackingParam: function() {
        this.userId || (this.userId = n.default.getUserId());
        var e = {
            user_id: this.userId,
            source: "wxapp"
        };
        if (this.options) for (var t in this.options) e[t] = this.options[t];
        return JSON.stringify(e);
    }
}, {
    pageName: "welfare_coupon",
    notUseCommonPV: !0
});