function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

function e(t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var o = function() {
    function t(t, e) {
        for (var o = 0; o < e.length; o++) {
            var s = e[o];
            s.enumerable = s.enumerable || !1, s.configurable = !0, "value" in s && (s.writable = !0), 
            Object.defineProperty(t, s.key, s);
        }
    }
    return function(e, o, s) {
        return o && t(e.prototype, o), s && t(e, s), e;
    };
}(), s = t(require("../../constants/groups")), n = t(require("../../common/std_format")), i = t(require("../../common/data_util")), a = t(require("../../pages/order_checkout/goods_util")), u = t(require("../../storage/ram_manager")), l = require("../../common/index"), r = function() {
    function t() {
        e(this, t), this.setDataFunc = null, this.getDataFunc = null, this.addRootFunc = null, 
        this.goods = null, this.mallInfo = null, this.goodsNumber = 1, this.limitQuantity = null, 
        this.mallCouponText = "", this.selectedGroup = null, this.dataObj = {};
    }
    return o(t, [ {
        key: "initComponentData",
        value: function(t) {
            if (this.goods && this.mallInfo) {
                this.dataObj = {
                    goodsName: this.goods.goodsName,
                    mallName: this.mallInfo.mallName,
                    mallLogo: this.mallInfo.logo,
                    goodsNumber: 1,
                    isShowGoodsNumber: !1,
                    showMinusButton: !0,
                    showPlusButton: !0
                };
                var e = void 0;
                if (t) {
                    if (this.dataObj.goodsNumber = t.goodsNumber, t.skuId) for (var o = this.goods.skus, s = 0; s < o.length; s++) if (t.skuId == o[s].skuId) {
                        e = o[s];
                        break;
                    }
                    this.dataObj.price = n.default.price(this.selectedSkuPrice, 100), this.dataObj.notFormatPrice = this.selectedSkuPrice, 
                    this.dataObj.notFormatTotalPrice = this.selectedSkuPrice;
                }
                e = e || this.goods.skus[0], this.dataObj.thumbUrl = e.thumbUrl || this.goods.thumbUrl, 
                this.dataObj.specs = e.specs || [];
                var i = this.selectedGroup, a = parseInt(e.quantity, 10) || 0, u = parseInt(i.orderLimit, 10) || 0, l = parseInt(e.limitQuantity, 10) || 0, r = u;
                r > a && a > 0 && (r = a), r > l && l > 0 && (r = l), this.limitQuantity = r, this.limitQuantity > 1 ? this.dataObj.isShowGoodsNumber = !0 : this.dataObj.isShowGoodsNumber = !1, 
                this.setTotalPrice(), this.initGoodsNumberButton(), this.addBlurGoodsNumberInputEvent(), 
                this.addUpdateGoodsNumberEvent(), this.addClickMallCouponBarEvent();
            }
        }
    }, {
        key: "setupMallCoupons",
        value: function() {
            var t = this.mallInfo.mallCoupons || [];
            i.default.isArray(t) && (t = t.slice(0, 3));
            var e = !0, o = !1;
            if (this.goods.freeCoupon && this.goods.freeCoupon.length > 0 && (o = !0), o || this.goods.eventType == s.default.EventType.FREE_TRIAL || 7 == this.goods.goodsType) e = !1; else if (i.default.isArray(t) && !(t.length < 1) || this.hasCoupons) {
                for (var n = 0, a = 0; a < t.length; a++) "已抢光" === t[a].couponDisableText && n++;
                n !== t.length || this.hasEnableCoupons || (e = !1);
            } else e = !1, t = [];
            this.needNumber <= 0 && !this.hasEnableCoupons && (e = !1);
            var u = this.goods.promotionEvents;
            u && u.length > 0 && (e = !0), "function" == typeof this.setDataFunc && this.setDataFunc({
                isShowMallCouponInfo: e,
                mallCouponText: this.mallCouponText || "",
                isSpecialStyle: !!this.isSpecialStyle,
                coupons: this.mallCoupons
            });
        }
    }, {
        key: "getNeedNumber",
        value: function(t, e) {
            var o = 0;
            if (!t || !e) return o;
            if (e.price * e.limitQuantity < t.minAmount) return o;
            var s = Math.ceil(t.minAmount / e.price);
            return s > 0 && (o = s), o;
        }
    }, {
        key: "getMallCouponInfo",
        value: function() {
            var t = this.goods, e = this.selectedEventId, o = this.couponInfos.mallCoupons, s = this.mallInfo.mallCoupons || [], u = this.selectedCoupon, l = !1, r = !1, d = "", c = 0, h = !1;
            o.enableCoupons && o.enableCoupons.length > 0 && (l = !0);
            var p = this.selectedSkuPrice, m = [], f = [];
            if (s.length > 0) {
                r = !0;
                var v = !0, b = !1, g = void 0;
                try {
                    for (var y, C = s[Symbol.iterator](); !(v = (y = C.next()).done); v = !0) {
                        var I = y.value;
                        29 == I.displayType ? m.push(I) : f.push(I);
                    }
                } catch (t) {
                    b = !0, g = t;
                } finally {
                    try {
                        !v && C.return && C.return();
                    } finally {
                        if (b) throw g;
                    }
                }
                m.length > 0 && (m = m.sort(function(t, e) {
                    return parseInt(e.discount, 10) - parseInt(t.discount, 10);
                })), f.length > 0 && (f = (f = (f = f.sort(function(t, e) {
                    return parseInt(e.discount, 10) - parseInt(t.discount, 10);
                })).sort(function(t, e) {
                    return parseInt(t.minAmount, 10) - parseInt(e.minAmount, 10);
                })).sort(function(t, e) {
                    return t.takenOut && !e.takenOut ? 1 : !t.takenOut && e.takenOut ? -1 : 0;
                })), s = m.concat(f), this.mallCoupons = s, c = this.getNeedNumber({
                    minAmount: 100 * Math.round(s[0].minAmount)
                }, {
                    price: p,
                    limitQuantity: a.default.getLimitQuantity(t.selectedSku, this.selectedGroup)
                });
            }
            var D = t.promotionEvents ? t.promotionEvents : [];
            if (u) 26 == u.displayType && (d = "专属券 "), d += "- " + u.discount + "元"; else if (this.promotionDiscount > 0) d = "- " + n.default.price(this.promotionDiscount, 100) + "元"; else if (r && !this.hasCoupons && c > 0 || D && D.length > 0 && -1 != e && 0 == this.promotionDiscount) {
                if (r && !this.hasCoupons && c > 0) {
                    var F = this.getMaxDiscount(s, c, p), N = F.maxDiscount;
                    d = 29 == F.displayType ? "领取" + N + "元无门槛商品券" : i.default.formatByPos("领券立减{1}元", s[0].minAmount, N), 
                    h = !0;
                }
                if (D && D.length > 0 && 16 != this.goods.eventType) {
                    var O = D[0].event_items && D[0].event_items[0] && D[0].event_items[0].descountDesc ? D[0].event_items[0].descountDesc : "";
                    d = d ? O + ";" + d : O, h = !0;
                }
            } else (l && !u || D.length > 0 && 0 == this.promotionDiscount) && (d = "不使用优惠券");
            if ((16 == this.goods.eventType || 18 == this.goods.eventType) && !u && D && D.length > 0) {
                var T = D[0].discount_type, k = D[0].event_items[0].discount_param;
                if (2 == T) {
                    var M = "";
                    16 == this.goods.eventType ? M = "限时折扣 " : 18 == this.goods.eventType && (M = "限量折扣 "), 
                    D[0].event_items[0].discount = Math.ceil((100 - k) / 100 * p) * this.dataObj.goodsNumber, 
                    D[0].event_items[0].descountDesc = " -" + n.default.price(D[0].event_items[0].discount, 100) + "元", 
                    -1 != e ? (d = M + D[0].event_items[0].descountDesc, h = !1) : (h = !1, d = "不使用优惠券");
                }
            }
            return {
                text: d,
                isSpecialStyle: h,
                hasEnableCoupons: l,
                needNumber: c
            };
        }
    }, {
        key: "getMaxDiscount",
        value: function(t, e, o) {
            for (var s = 0, i = void 0, a = 0; a < t.length; a++) if (!t[a].takenOut) {
                var u = t[a], l = parseInt(u.discount, 10) || 0;
                e * o >= 100 * Math.round(u.minAmount) && l > s && (s = l, u.displayType && (i = u.displayType));
            }
            return {
                maxDiscount: n.default.price(s),
                displayType: i
            };
        }
    }, {
        key: "addClickMallCouponBarEvent",
        value: function() {
            var t = this;
            "function" == typeof this.addRootFunc && this.addRootFunc("clickMallCouponBar", function() {
                var e = void 0;
                if ("function" == typeof t.getDataFunc && (e = t.getDataFunc()), e && e.disableUserAction) u.default.CPPage.$showToast("订单已生成，信息不可更改"); else {
                    if (16 != t.goods.eventType && 18 != t.goods.eventType && 12 != t.goods.eventType) 12 == t.goods.eventType ? -1 == t.selectedEventId || t.selectedEventId > 0 ? "function" == typeof t.selectMallCoupon && t.selectMallCoupon() : "function" == typeof t.showMallCouponsList && t.showMallCouponsList() : !t.hasCoupons && t.hasMallCoupons && (!t.selectedEventId || t.selectedEventId <= 0) ? "function" == typeof t.showMallCouponsList && t.showMallCouponsList() : "function" == typeof t.selectMallCoupon && t.selectMallCoupon(); else {
                        var o = t.couponInfos.mallCoupons, s = !1;
                        o.enableCoupons && o.enableCoupons.length > 0 && (s = !0), t.hasMallCoupons && !s ? "function" == typeof t.showMallCouponsList && t.showMallCouponsList() : "function" == typeof t.selectMallCoupon && t.selectMallCoupon();
                    }
                    if (u.default.CPPage.getTrackingParams) {
                        var n = u.default.CPPage.getTrackingParams("click", "shop_coupon", "shop_coupon", "99223");
                        (0, l.TrackingRecord)(n);
                    }
                }
            });
        }
    }, {
        key: "addBlurGoodsNumberInputEvent",
        value: function() {
            var t = this, e = u.default.CPPage;
            "function" == typeof this.addRootFunc && this.addRootFunc("blurGoodsNumberInput", function(o) {
                wx.hideKeyboard();
                var s = parseInt(o.detail.value.trim(), 10);
                isNaN(s) && (s = 1, e.$showToast("请输入需要的数量")), s < 1 && (s = 1, e.$showToast("请至少购买1份哦")), 
                null != t.limitQuantity && s > t.limitQuantity && (s = t.limitQuantity, e.$showToast(i.default.formatByPos("很抱歉，该商品当前至多只能购买{0}份", t.limitQuantity))), 
                t.setDataFunc && (t.dataObj.goodsNumber = s, s === t.dataObj.goodsNumber && t.setDataFunc({
                    goodsNumber: 0
                }), t.setDataFunc({
                    goodsNumber: s
                }), "function" == typeof t.setupCouponsFunc && t.setupCouponsFunc(), t.initGoodsNumberButton());
            });
        }
    }, {
        key: "initGoodsNumberButton",
        value: function() {
            var t = parseInt(this.dataObj.goodsNumber, 10) || 1;
            this.dataObj.reduceDisable = t <= 1, t >= this.limitQuantity ? this.dataObj.increaseDisable = !0 : this.dataObj.increaseDisable = !1, 
            this.setDataFunc && this.setDataFunc(this.dataObj);
        }
    }, {
        key: "setTotalPrice",
        value: function() {
            if (this.setDataFunc) {
                var t = 0;
                this.selectedCoupon && this.selectedCoupon.discount ? t = Math.round(100 * this.selectedCoupon.discount) : this.promotionDiscount > 0 && (t = this.promotionDiscount), 
                this.dataObj.notFormatTotalPrice = this.dataObj.notFormatPrice * this.dataObj.goodsNumber - t, 
                this.dataObj.mallDiscount = t, this.setDataFunc && (this.dataObj.getPostage = !0, 
                this.setDataFunc(this.dataObj), this.dataObj.getPostage = !1);
            }
        }
    }, {
        key: "addUpdateGoodsNumberEvent",
        value: function() {
            var t = this, e = u.default.CPPage;
            "function" == typeof this.addRootFunc && this.addRootFunc("updateGoodsNumber", function(o) {
                var s = void 0;
                if ("function" == typeof t.getDataFunc && (s = t.getDataFunc()), s && s.disableUserAction) e.$showToast("订单已生成，信息不可更改"); else {
                    var a = parseInt(o.detail.target.dataset.delta);
                    if (t.setDataFunc && !(t.dataObj.reduceDisable && a < 0)) if (t.dataObj.increaseDisable && a > 0) e.$showToast(i.default.formatByPos("很抱歉，该商品当前至多只能购买{0}份", t.limitQuantity)); else if (!(parseInt(t.dataObj.goodsNumber, 10) + a <= 0)) {
                        t.dataObj.goodsNumber = parseInt(t.dataObj.goodsNumber, 10) + a;
                        var u = t.selectedCoupon, l = t.selectedSkuPrice, r = t.goods, d = r.promotionEvents ? r.promotionEvents : [];
                        if ((16 == r.eventType || 18 == r.eventType) && !u && d && d.length > 0) {
                            var c = d[0].discount_type, h = d[0].event_items[0].discount_param;
                            2 == c && (d[0].event_items[0].discount = Math.ceil((100 - h) / 100 * l) * t.dataObj.goodsNumber, 
                            d[0].event_items[0].descountDesc = " -" + n.default.price(d[0].event_items[0].discount, 100) + "元");
                        }
                        t.dataObj.promotionEvents = d, t.setDataFunc(t.dataObj), "function" == typeof t.setupCouponsFunc && t.setupCouponsFunc(), 
                        t.initGoodsNumberButton();
                    }
                }
            });
        }
    }, {
        key: "load",
        value: function(t, e, o, s, n) {
            n = n || {}, this.goods = t, this.mallInfo = e || {}, this.couponInfos = o, this.selectedEventId = s, 
            this.showMallCouponsList = n.showMallCouponsList, this.selectMallCoupon = n.selectMallCoupon, 
            this.selectedGroup = n.selectedGroup, this.selectedSkuPrice = n.selectedSkuPrice, 
            this.setDataFunc = n.setDataFunc, this.getDataFunc = n.getDataFunc, this.addRootFunc = n.addRootFunc, 
            this.setupCouponsFunc = n.setupCouponsFunc, this.selectedCoupon = n.selectedCoupon;
            var i = (this.couponInfos || {}).mallCoupons || {};
            this.hasCoupons = !!i.enableCoupons && i.enableCoupons.length > 0 || i.disableCoupons.length > 0, 
            this.hasMallCoupons = (this.mallInfo.mallCoupons || []).length > 0, this.promotionDiscount = n.promotionDiscount, 
            this.initComponentData(n);
            this.couponInfos.mallCoupons;
            this.mallCouponInfo = this.getMallCouponInfo(), this.hasEnableCoupons = (this.mallCouponInfo || {}).hasEnableCoupons || !1, 
            this.mallCouponText = (this.mallCouponInfo || {}).text || "", this.needNumber = (this.mallCouponInfo || {}).needNumber || 0, 
            this.isSpecialStyle = !!(this.mallCouponInfo || {}).isSpecialStyle, this.setupMallCoupons();
        }
    } ]), t;
}();

exports.default = r;