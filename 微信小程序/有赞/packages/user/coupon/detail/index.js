!function(t) {
    function o(a) {
        if (e[a]) return e[a].exports;
        var n = global.installedModules[a] = e[a] = {
            i: a,
            l: !1,
            exports: {}
        };
        return t[a].call(n.exports, n, n.exports, o), n.l = !0, n.exports;
    }
    t = Object.assign(require("../../../../commons.js").modules, t);
    var e = {};
    e = global.installedModules = global.installedModules || {}, o.m = t, o.c = e, o.d = function(t, e, a) {
        o.o(t, e) || Object.defineProperty(t, e, {
            configurable: !1,
            enumerable: !0,
            get: a
        });
    }, o.r = function(t) {
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
    }, o.n = function(t) {
        var e = t && t.__esModule ? function() {
            return t.default;
        } : function() {
            return t;
        };
        return o.d(e, "a", e), e;
    }, o.o = function(t, o) {
        return Object.prototype.hasOwnProperty.call(t, o);
    }, o.p = "", o(o.s = 113);
}({
    112: function(t, o, e) {
        var a = e(3), n = (getApp(), {
            handleCouponDetailData: function(t) {
                if (t) {
                    var o = t, e = t.value + "", a = null == t.at_least ? t.group.at_least + "" : t.at_least + "", n = this.splitNumber(e, a);
                    Object.assign(o, {
                        roundNumber: n.round,
                        decimal: n.decimal,
                        atLeastString: n.atLeastString
                    });
                    var i = void 0, r = void 0;
                    if (i = t.valid_start_at, r = t.expire_at, i && r || (i = t.start_at, r = t.end_at), 
                    i && i.length > 0 && r && r.length > 0) {
                        var s = i.split(" "), u = r.split(" "), c = s[0], p = u[0], d = s[1], l = u[1], f = "", g = "", h = c.split("-"), m = p.split("-"), _ = h.length - 1;
                        h.forEach(function(t, o) {
                            f += t, o != _ && (f += ".");
                        }), m.forEach(function(t, o) {
                            g += t, o != _ && (g += ".");
                        }), Object.assign(o, {
                            start_time: f + " " + d.substring(0, d.lastIndexOf(":")),
                            end_time: g + " " + l.substring(0, l.lastIndexOf(":"))
                        });
                    }
                    return o;
                }
            },
            splitNumber: function(t, o) {
                var e = t.split("."), a = o.split("."), n = e[0], i = 2 == e.length ? 0 == +e[1] ? "" : "." + e[1] : "", r = "", s = 2 == a.length ? 0 == +a[1] ? "" : "." + a[1] : "";
                return (s || +a[0] > 0) && (r = a[0]), {
                    round: n,
                    decimal: i,
                    atLeastString: r + s
                };
            }
        }), i = {
            onQrCodeTapped: function(t) {
                this._onQrCodeTapped && this._onQrCodeTapped(t.currentTarget.dataset.verifycode);
            },
            onShareButtonTapped: function(t) {},
            onUseButtonTapped: function(t) {
                var o = t.currentTarget.dataset.group;
                o && "all" != o.range_type ? a.navigate({
                    url: "/packages/shop/goods/group/index?pageType=coupon&group_id=" + (o.coupon_group_id || o.id)
                }) : a.switchTab({
                    url: "/pages/home/dashboard/index"
                });
            }
        };
        t.exports = Object.assign({}, i, n);
    },
    113: function(t, o, e) {
        function a(t) {
            if (t && t.__esModule) return t;
            var o = {};
            if (null != t) for (var e in t) Object.prototype.hasOwnProperty.call(t, e) && (o[e] = t[e]);
            return o.default = t, o;
        }
        function n(t) {
            return t && t.__esModule ? t : {
                default: t
            };
        }
        var i = n(e(112)), r = n(e(3)), s = n(e(0)), u = a(e(1));
        a(e(4));
        var c, p, d, l, f, g = getApp();
        (0, s.default)(u.Toast, {
            data: {
                couponData: {
                    winWidth: 0,
                    winHeight: 0,
                    promoType: "",
                    source: "",
                    tabPosition: -1,
                    curVisibility: !1,
                    isSuccessView: !1,
                    isCashSuccessView: !1,
                    coupon: {}
                }
            },
            onLoad: function(t) {
                var o = this, e = this;
                p = t.type, d = +t.tab, c = t.id, l = t.from, wx.getSystemInfo({
                    success: function(t) {
                        e.setData({
                            "couponData.winWidth": t.windowWidth,
                            "couponData.winHeight": t.windowHeight
                        });
                    }
                }), "points-cash" !== l && "points-cash-list" !== l || (this.setData({
                    isCashSuccessView: !0
                }), p = 7 == +p ? "promocard" : "promocode");
                var a = "promocard" == p ? "优惠券" : "优惠码";
                g.getShopInfo().then(function(t) {
                    o.shopInfo = t;
                }), wx.setNavigationBarTitle({
                    title: a
                }), wx.showShareMenu({
                    withShareTicket: !0
                }), wx.showLoading({
                    title: "努力加载中"
                }), "list" == l || "points-cash" === l || "points-cash-list" === l ? this.requestPromoDetail(p) : setTimeout(function() {
                    o.claimCouopn();
                }, 2e3);
            },
            requestPromoDetail: function(t) {
                var o = this, e = null, a = null;
                "promocard" == t ? (e = "youzan.ump.promocard.detail/1.0.0/get", a = {
                    card_id: c
                }) : "promocode" == t && (e = "youzan.ump.promocode.detail/1.0.0/get", a = {
                    code_id: c
                }), a.kdt_id = g.getKdtId(), g.carmen({
                    api: e,
                    query: a,
                    success: function(e) {
                        f = e.group.id;
                        var a = i.default.handleCouponDetailData(e);
                        a.group.is_share ? o.assignShare() : wx.hideShareMenu(), o.setData({
                            "couponData.coupon": a,
                            "couponData.source": l,
                            "couponData.promoType": t,
                            "couponData.tabPosition": d,
                            "couponData.curVisibility": !0,
                            "couponData.isSuccessView": !0,
                            "couponData.isCashSuccessView": "points-cash" === l
                        });
                    },
                    fail: function(t) {
                        o.showZanToast(t.msg || "获取信息失败");
                    },
                    complete: function() {
                        wx.hideLoading();
                    }
                });
            },
            claimCouopn: function() {
                var t = this;
                g.getBuyerId(), g.carmen({
                    api: "youzan.ump.coupon/1.0.0/fetch",
                    query: {
                        id: c
                    },
                    success: function(o) {
                        c = "promocard" == p ? o.promocard.promocard_id : o.promocode.promocode_id, t.requestPromoDetail("PROMOCARD" == o.coupon_type ? "promocard" : "promocode");
                    },
                    fail: function(o) {
                        t.requestCouponDetail(), t.showZanToast(o.msg || "获取信息失败");
                    }
                });
            },
            requestCouponDetail: function() {
                var t = this;
                g.carmen({
                    api: "youzan.ump.coupon/1.0.0/detail",
                    query: {
                        with_user_status: 1,
                        kdt_id: g.getKdtId(),
                        id: c
                    },
                    success: function(o) {
                        var e = i.default.handleCouponDetailData(o);
                        t.setData({
                            "couponData.coupon": e,
                            "couponData.source": l,
                            "couponData.promoType": p,
                            "couponData.tabPosition": d,
                            "couponData.curVisibility": !0,
                            "couponData.isSuccessView": !1
                        }), wx.setNavigationBarTitle({
                            title: o.group_name
                        });
                    },
                    fail: function(o) {
                        t.showZanToast(o.msg || "获取信息失败");
                    },
                    complete: function() {
                        wx.hideLoading();
                    }
                });
            },
            _onQrCodeTapped: function(t) {
                r.default.navigate({
                    url: "/packages/user/coupon/qrcode/index?type=" + this.data.couponData.promoType + "&verifycode=" + t
                });
            },
            assignShare: function() {
                Object.assign(this, {
                    onShareAppMessage: function() {
                        var t = this.data.couponData.coupon;
                        return this.data.couponData.coupon.is_exchange ? {
                            title: "邀你兑换" + ("promocard" == p ? "优惠券" : "优惠码"),
                            path: "packages/ump/integral-store/coupon/index?id=" + t.group.id + "&alias=" + t.exchange_alias + "&type" + t.group.coupon_type,
                            imageUrl: "promocard" == p ? "https://img.yzcdn.cn/public_files/2018/01/18/38fd2bcb70b825551581d3f198d2c459.png" : "https://img.yzcdn.cn/public_files/2018/01/18/36a7ac254ae46e7ea2971c2f891d6f37.png"
                        } : {
                            title: "送你一张" + ("promocard" == p ? "优惠券" : "优惠码"),
                            path: "packages/user/coupon/detail/index?type=" + p + "&id=" + f,
                            imageUrl: "promocard" == p ? "https://img.yzcdn.cn/public_files/2018/01/18/4668a99ca69cc56c39ff8d895083e116.png" : "https://img.yzcdn.cn/public_files/2018/01/18/270dfeedca2b673dc6fb40d1a2c43c36.png"
                        };
                    }
                });
            },
            onQrCodeTapped: i.default.onQrCodeTapped,
            onShareButtonTapped: i.default.onShareButtonTapped,
            onUseButtonTapped: i.default.onUseButtonTapped
        });
    }
});