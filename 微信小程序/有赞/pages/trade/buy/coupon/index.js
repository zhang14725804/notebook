!function(e) {
    function t(o) {
        if (n[o]) return n[o].exports;
        var a = global.installedModules[o] = n[o] = {
            i: o,
            l: !1,
            exports: {}
        };
        return e[o].call(a.exports, a, a.exports, t), a.l = !0, a.exports;
    }
    e = Object.assign(require("../../../../commons.js").modules, e), e = Object.assign(require("../../../../vendors.js").modules, e);
    var n = {};
    n = global.installedModules = global.installedModules || {}, t.m = e, t.c = n, t.d = function(e, n, o) {
        t.o(e, n) || Object.defineProperty(e, n, {
            configurable: !1,
            enumerable: !0,
            get: o
        });
    }, t.r = function(e) {
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
    }, t.n = function(e) {
        var n = e && e.__esModule ? function() {
            return e.default;
        } : function() {
            return e;
        };
        return t.d(n, "a", n), n;
    }, t.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t);
    }, t.p = "", t(t.s = 203);
}({
    203: function(e, t, n) {
        var o, a = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = arguments[t];
                for (var o in n) Object.prototype.hasOwnProperty.call(n, o) && (e[o] = n[o]);
            }
            return e;
        }, r = (o = n(0)) && o.__esModule ? o : {
            default: o
        }, i = n(25), u = n(32), d = n(7), c = n(1), s = getApp();
        (0, r.default)(i, c.Toast, {
            data: {
                charge_coupon: [],
                unavailable_coupon: [],
                selected_coupon: {},
                code: "",
                exchangeParams: {}
            },
            onLoad: function(e) {
                var t = this, n = e.dbid || "", o = s.db.get(n) || {}, a = o.selected_coupon || {}, r = o.exchangeParams || {}, i = [];
                (o.charge_coupon || []).forEach(function(e) {
                    var n = t.convertCouponToStandard(e, !0), o = t.handleCouponData(n);
                    i.push(o);
                });
                var u = [];
                (o.unavailable_coupon || []).forEach(function(e) {
                    e.value = e.denominations;
                    var n = t.convertCouponToStandard(e, !1), o = t.handleCouponData(n);
                    u.push(o);
                }), this.setData({
                    charge_coupon: i,
                    unavailable_coupon: u,
                    selected_coupon: a,
                    exchangeParams: r
                });
            },
            onReady: function() {},
            onHide: function() {},
            onUnload: function() {},
            onPullDownRefresh: function() {},
            onReachBottom: function() {},
            onCouponCellTaped: function(e) {
                if (e) {
                    var t = getCurrentPages(), n = t[t.length - 2];
                    "pages/trade/buy/index" == n.route && (e.priceStr = e.price_value / 100 + "", n.setData({
                        "coupons.selected": e
                    }), n.updateOrderPayment(), wx.navigateBack());
                }
            },
            onExchangeTaped: function() {
                var e = this, t = this;
                if (0 != this.data.code.length) {
                    var n = this.data.charge_coupon, o = Object.assign({}, this.data.exchangeParams, {
                        code: this.data.code
                    });
                    u.validCouponCode(o, function(o) {
                        var a = o, r = {};
                        if (n.forEach(function(e) {
                            e.id == o.id && (r = e);
                        }), r.id) t.showZanToast("这张优惠券你已经有啦~已经为您选中"); else {
                            if (o.startAt = new Date().getTime() / 1e3, o.endAt = o.end_at, o.discount = 0, 
                            o.denominations = o.value, o.condition.indexOf("立减") >= 0) o.originCondition = 0; else {
                                var i = o.condition.indexOf("元");
                                o.originCondition = 100 * parseFloat(o.condition.substring(1, i));
                            }
                            var u = e.convertCouponToStandard(o, !0);
                            n.unshift(u);
                            var d = getCurrentPages(), c = d[d.length - 2];
                            if ("pages/trade/buy/index" != c.route) return;
                            u.priceStr = u.price_value / 100 + "", c.setData({
                                "coupons.selected": u
                            }), c.updateOrderPayment(), t.setData({
                                code: ""
                            });
                        }
                        t.setData({
                            charge_coupon: n,
                            selected_coupon: a
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
                "pages/trade/buy/index" == t.route && (t.setData({
                    "coupons.selected": {}
                }), t.updateOrderPayment(), wx.navigateBack());
            },
            convertCouponToStandard: function(e, t) {
                var n = a({}, e);
                n.id = e.id, n.preferential_type = e.discount > 0 ? 2 : 1, n.price_value = e.value, 
                n.value = e.denominations / 100 + "", n.discount = e.discount / 10 + "", n.name = e.name, 
                n.originCondition = e.originCondition, n.group_type = "code" == e.type ? 9 : 7;
                var o = new Date(1e3 * e.startAt), r = new Date(1e3 * e.endAt);
                return n.start_at = o.getFullYear() + "." + d.formatMonthWithZero(o.getMonth()) + "." + d.formatDayWithZero(o.getDate()), 
                n.end_at = r.getFullYear() + "." + d.formatMonthWithZero(r.getMonth()) + "." + d.formatDayWithZero(r.getDate()), 
                n.date_type = 1, n.instructions = e.reason || "", n.disable_button = !0, n.status = t ? "valid" : "invalid", 
                this.handleCouponData(n);
            }
        });
    }
});