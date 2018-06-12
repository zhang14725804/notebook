!function() {
    require("./../../../../common.js"), wx.webpackJsonp.apply(null, arguments);
}([ 38 ], {
    301: function(e, t, n) {
        var a = function(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }(n(2)), o = n(105), i = n(109), r = n(40), u = n(8), c = n(0);
        Page((0, a.default)(o, u.Toast, {
            data: {
                charge_coupon: [],
                unavailable_coupon: [],
                selected_coupon: {},
                code: "",
                exchangeParams: {}
            },
            onLoad: function(e) {
                var t = this, n = JSON.parse(e.coupons || "{}"), a = n.selected_coupon || {}, o = n.exchangeParams || {}, i = [];
                (n.charge_coupon || []).forEach(function(e) {
                    var n = t.convertCouponToStandard(e, !0), a = t.handleCouponData(n);
                    i.push(a);
                });
                var r = [];
                (n.unavailable_coupon || []).forEach(function(e) {
                    e.value = e.denominations;
                    var n = t.convertCouponToStandard(e, !1), a = t.handleCouponData(n);
                    r.push(a);
                }), this.setData({
                    charge_coupon: i,
                    unavailable_coupon: r,
                    selected_coupon: a,
                    exchangeParams: o
                });
            },
            onReady: function() {},
            onShow: function() {
                c.page.show();
            },
            onHide: function() {},
            onUnload: function() {},
            onPullDownRefresh: function() {},
            onReachBottom: function() {},
            onCouponCellTaped: function(e) {
                if (e) {
                    var t = getCurrentPages(), n = t[t.length - 2];
                    "pages/trade/buy/index" != n.route || (e.priceStr = e.price_value / 100 + "", n.setData({
                        "coupons.selected": e
                    }), n.updateOrderPayment(), wx.navigateBack());
                }
            },
            onExchangeTaped: function() {
                var e = this, t = this, n = this.removeStrSpace(this.data.code);
                if (0 != this.data.code.length) {
                    var o = this.data.charge_coupon, r = (0, a.default)({}, this.data.exchangeParams, {
                        code: n
                    });
                    i.validCouponCode(r, function(n) {
                        var a = {};
                        if (o.forEach(function(e) {
                            e.id == n.id && (a = e);
                        }), a.id) t.showZanToast("这张优惠券你已经有啦~已经为您选中"); else {
                            if (n.startAt = new Date().getTime() / 1e3, n.endAt = n.end_at, n.discount = 0, 
                            n.denominations = n.value, 0 <= n.condition.indexOf("立减")) n.originCondition = 0; else {
                                var i = n.condition.indexOf("元");
                                n.originCondition = 100 * parseFloat(n.condition.substring(1, i));
                            }
                            var r = e.convertCouponToStandard(n, !0);
                            o.unshift(r);
                            var u = getCurrentPages(), c = u[u.length - 2];
                            if ("pages/trade/buy/index" != c.route) return;
                            r.priceStr = r.price_value / 100 + "", c.setData({
                                "coupons.selected": r
                            }), c.updateOrderPayment(), t.setData({
                                code: ""
                            });
                        }
                        t.setData({
                            charge_coupon: o,
                            selected_coupon: n
                        });
                    }, function(e) {
                        t.showZanToast(e.msg || "兑换失败～");
                    });
                }
            },
            onCodeInput: function(e) {
                var t = e.detail.value;
                this.setData({
                    code: t
                });
            },
            onNotUseTapped: function() {
                var e = getCurrentPages(), t = e[e.length - 2];
                "pages/trade/buy/index" != t.route || (t.setData({
                    "coupons.selected": {}
                }), t.updateOrderPayment(), wx.navigateBack());
            },
            convertCouponToStandard: function(e, t) {
                var n = e;
                n.id = e.id, n.preferential_type = 0 < e.discount ? 2 : 1, n.price_value = e.value, 
                n.value = e.denominations + "", n.discount = e.discount / 10 + "", n.name = e.name, 
                n.originCondition = e.originCondition, n.group_type = "code" == e.type ? 9 : 7;
                var a = new Date(1e3 * e.startAt), o = new Date(1e3 * e.endAt);
                return n.start_at = a.getFullYear() + "." + r.formatMonthWithZero(a.getMonth()) + "." + r.formatDayWithZero(a.getDate()), 
                n.end_at = o.getFullYear() + "." + r.formatMonthWithZero(o.getMonth()) + "." + r.formatDayWithZero(o.getDate()), 
                n.date_type = 1, n.instructions = e.reason || "", n.disable_button = !0, n.status = t ? "valid" : "invalid", 
                this.handleCouponData(n);
            },
            removeStrSpace: function(e) {
                return e.replace(/\s+/g, "");
            }
        }));
    }
}, [ 301 ]);