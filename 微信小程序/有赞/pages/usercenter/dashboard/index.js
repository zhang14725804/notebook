!function(t) {
    function e(o) {
        if (n[o]) return n[o].exports;
        var i = global.installedModules[o] = n[o] = {
            i: o,
            l: !1,
            exports: {}
        };
        return t[o].call(i.exports, i, i.exports, e), i.l = !0, i.exports;
    }
    t = Object.assign(require("../../../commons.js").modules, t);
    var n = {};
    n = global.installedModules = global.installedModules || {}, e.m = t, e.c = n, e.d = function(t, n, o) {
        e.o(t, n) || Object.defineProperty(t, n, {
            configurable: !1,
            enumerable: !0,
            get: o
        });
    }, e.r = function(t) {
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
    }, e.n = function(t) {
        var n = t && t.__esModule ? function() {
            return t.default;
        } : function() {
            return t;
        };
        return e.d(n, "a", n), n;
    }, e.o = function(t, e) {
        return Object.prototype.hasOwnProperty.call(t, e);
    }, e.p = "", e(e.s = 202);
}({
    202: function(t, e, n) {
        function o(t) {
            return t && t.__esModule ? t : {
                default: t
            };
        }
        var i = o(n(0)), a = o(n(3)), s = getApp(), u = n(8), r = n(1), c = n(18), l = s.isFantasy ? "fantasy" : "normal";
        (0, i.default)(r.Toast, u, {
            data: {
                kdtId: 0,
                ucType: l,
                themeClass: s.themeClass,
                userInfo: {},
                servicePhoneNumber: "",
                topay: 0,
                tosend: 0,
                send: 0,
                cartCount: 0,
                im: {
                    businessId: ""
                },
                isSetShoppingCart: !0,
                bindTips: "找不到订单或优惠券？绑定手机号试试",
                showBindPhoneNumber: !1
            },
            onLoad: function(t) {
                var e = this;
                s.getUserInfo(function(t) {
                    var n = getApp().getKdtId();
                    e.setData({
                        userInfo: t.userInfo,
                        kdtId: n
                    }), s.updateYouzanUserInfo(t.userInfo);
                }), s.getImData().then(function(t) {
                    e.setData({
                        "im.businessId": t.businessId || ""
                    });
                }), this.fetchCustomerService(), s.on("show", function() {
                    e.setShopStatus();
                });
            },
            onShow: function() {
                var t = this;
                this.fetchBuyerCount(), this.fetchCartCount(), this.setShopStatus(), this.intervalCount = 1, 
                this.intervalTimer = setInterval(function() {
                    t.intervalCount || (clearInterval(t.intervalTimer), t.intervalTimer = null), t.intervalCount--, 
                    t.fetchBuyerCount();
                }, 2e3);
                var e = !1;
                e = !s.getBuyerId(), this.setData({
                    copyright: s.globalData.copyright,
                    is_big_shop: s.globalData.is_big_shop,
                    showBindPhoneNumber: e
                });
            },
            onHide: function() {
                clearInterval(this.intervalTimer), this.intervalTimer = null;
            },
            setShopStatus: function() {
                var t = this;
                s.getShopStatus(function(e) {
                    t.setData({
                        isSetShoppingCart: e.is_set_shopping_cart
                    });
                });
            },
            onPullDownRefresh: function(t) {
                this.fetchBuyerCount();
            },
            fetchBuyerCount: function() {
                var t = this;
                s.carmen({
                    api: "kdt.trade.buyer.count/1.0.2/get",
                    success: function(e) {
                        var n = function(t) {
                            return t > 99 ? "99+" : t;
                        };
                        t.setData({
                            topay: n(e.topay),
                            tosend: n(e.tosend),
                            send: n(e.send)
                        });
                    },
                    complete: function() {
                        wx.stopPullDownRefresh();
                    }
                });
            },
            fetchCartCount: function() {
                var t = this;
                s.carmen({
                    api: "kdt.trade.cart/1.0.0/count",
                    success: function(e) {
                        t.setData({
                            cartCount: +e.data
                        });
                    }
                });
            },
            jumpToPoints: function() {
                a.default.navigate({
                    url: "/packages/user/integral/index"
                });
            },
            jumpToCart: function() {
                a.default.switchTab({
                    url: "/pages/goods/cart/index"
                });
            },
            fetchCustomerService: function() {
                var t = this;
                s.carmen({
                    api: "weapp.wsc.shop.returnaddress/1.0.0/get",
                    success: function(e) {
                        var n = "";
                        +e.show_notice_mobile && (e.notice_phone2 ? (n = e.notice_phone2, e.notice_phone1 && (n = e.notice_phone1 + "-" + n)) : e.notice_mobile && (n = e.notice_mobile)), 
                        t.setData({
                            servicePhoneNumber: n
                        });
                    }
                });
            },
            handleAddressClick: function() {
                var t = this;
                c("scope.address").then(function() {
                    wx.chooseAddress();
                }).catch(function() {
                    t.showZanToast("请允许使用通讯地址后重试"), setTimeout(function() {
                        wx.openSetting();
                    }, 1e3);
                });
            },
            handleMyCouponClick: function() {
                this.jumpCouponDetail("promocard");
            },
            handleMyPromotionCodeClick: function() {
                this.jumpCouponDetail("promocode");
            },
            handlePaidContentClick: function() {
                wx.navigateTo({
                    url: "/packages/paidcontent/list/index"
                });
            },
            handleMyMemberCardsClick: function() {
                a.default.navigate({
                    url: "/packages/card/list/index"
                });
            },
            jumpCouponDetail: function(t) {
                a.default.navigate({
                    url: "/packages/user/coupon/list/index?type=" + t + "&title=" + ("promocard" == t ? "我的优惠券" : "我的优惠码")
                });
            },
            handleContactCustomerService: function() {
                var t = this;
                wx.showModal({
                    title: this.data.servicePhoneNumber,
                    confirmText: "呼叫",
                    success: function(e) {
                        e.confirm && wx.makePhoneCall({
                            phoneNumber: t.data.servicePhoneNumber
                        });
                    }
                });
            },
            tapBindZanAccount: function() {
                this._upadateTitle(""), this.bindZanAccount();
            },
            onZanAccountBinded: function() {
                this.setData({
                    showBindPhoneNumber: !1
                }), this.fetchBuyerCount(), this.fetchCartCount(), this.setShopStatus();
            }
        });
    }
});