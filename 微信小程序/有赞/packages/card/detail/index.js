!function(e) {
    function t(o) {
        if (a[o]) return a[o].exports;
        var s = global.installedModules[o] = a[o] = {
            i: o,
            l: !1,
            exports: {}
        };
        return e[o].call(s.exports, s, s.exports, t), s.l = !0, s.exports;
    }
    e = Object.assign(require("../../../commons.js").modules, e);
    var a = {};
    a = global.installedModules = global.installedModules || {}, t.m = e, t.c = a, t.d = function(e, a, o) {
        t.o(e, a) || Object.defineProperty(e, a, {
            configurable: !1,
            enumerable: !0,
            get: o
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
    }, t.p = "", t(t.s = 177);
}({
    177: function(e, t, a) {
        var o, s = (o = a(0)) && o.__esModule ? o : {
            default: o
        }, i = a(10), n = a(8), r = a(4), c = getApp();
        (0, s.default)(n, {
            data: {
                alias: "",
                isTaken: !0,
                canBuy: !1,
                price: "",
                needActive: !1,
                isDefault: !0,
                showRightsInfo: !1,
                showQrCode: !1,
                showUsageInfo: !1,
                shopInfo: {
                    image: "",
                    name: ""
                },
                userInfo: {},
                card: {},
                customerCard: {},
                steps: [],
                progressPercent: 0,
                nextLevelTips: "",
                hasMobile: !1,
                code: {}
            },
            onLoad: function(e) {
                var t = this;
                this.request = i(c);
                var a = e.alias, o = void 0 === a ? "" : a, s = e.goods_id, n = void 0 === s ? "" : s;
                this.setData({
                    alias: o,
                    goods_id: n
                }), c.getUserInfo(function(e) {
                    t.setData({
                        userInfo: e.userInfo
                    }), c.updateYouzanUserInfo(e.userInfo);
                }), c.getShopInfo().then(function(e) {
                    t.setData({
                        shopInfo: {
                            image: e.logo,
                            name: e.shop_name
                        }
                    });
                });
            },
            onShow: function() {
                this.getCard();
            },
            getCard: function(e) {
                var t = this;
                wx.showLoading({
                    title: "努力加载中"
                }), this.request({
                    path: "/wscscrm/scrm/membercard/get.json",
                    query: {
                        alias: this.data.alias,
                        goods_id: this.data.goods_id
                    }
                }).then(function(a) {
                    var o = a.card || a.customer_card.card, s = a.customer_card || {}, i = a.is_taken, n = 1 == o.can_buy, r = "";
                    try {
                        !i && n && (r = "售价: " + o.sku[0].price / 100 + "元");
                    } catch (e) {
                        console.log(e);
                    }
                    o.detail.is_allow_share && !o.rule_card ? wx.showShareMenu({
                        withShareTicket: !0
                    }) : wx.hideShareMenu();
                    var d = !!c.getBuyerId();
                    t.setData({
                        hasMobile: d,
                        alias: o.card_alias,
                        isTaken: i,
                        card: o,
                        customerCard: s,
                        canBuy: n,
                        price: r,
                        needActive: 0 == s.state,
                        isDefault: s.is_default || !1,
                        steps: o.rule_card && s.step_info ? s.step_info.steps : [],
                        progressPercent: o.rule_card ? s.step_info.progress_percent : 0,
                        nextLevelTips: o.rule_card ? s.step_info.tips : ""
                    }), wx.hideLoading(), e && e();
                }).catch(function(e) {
                    wx.hideLoading(), wx.showToast({
                        title: e.msg,
                        icon: "none",
                        duration: 1e3
                    });
                });
            },
            showQrCode: function() {
                var e = this;
                this.data.code.qr_code ? this.setData({
                    showQrCode: !0
                }) : (wx.showLoading({
                    title: "努力加载中"
                }), this.request({
                    path: "/wscscrm/scrm/membercard/code.json",
                    query: {
                        cardNo: this.data.customerCard.card_no
                    }
                }).then(function(t) {
                    e.setData({
                        showQrCode: !0,
                        code: t
                    }), wx.hideLoading();
                }).catch(function(e) {
                    wx.hideLoading(), wx.showToast({
                        title: e.msg,
                        icon: "none",
                        duration: 1e3
                    });
                }));
            },
            closeQrCode: function() {
                this.setData({
                    showQrCode: !1
                });
            },
            toggleUsageInfo: function() {
                this.setData({
                    showUsageInfo: !this.data.showUsageInfo
                });
            },
            toggleRightsInfo: function() {
                this.setData({
                    showRightsInfo: !this.data.showRightsInfo
                });
            },
            buyCard: function() {
                var e = this.data.card.sku[0], t = c.db.set({
                    type: "goods",
                    goods_list: [ {
                        activityAlias: "",
                        activityId: 0,
                        activityType: 0,
                        message: {},
                        num: 1,
                        price: e.price,
                        skuId: e.goods_sku_id,
                        goodsId: e.goods_id,
                        kdtId: c.getKdtId(),
                        bizTracePointExt: ""
                    } ]
                });
                wx.navigateTo({
                    url: "/pages/trade/buy/index?orderFrom=membercard&dbid=" + t
                });
            },
            deleteCard: function() {
                var e = this;
                wx.showModal({
                    title: "删除会员卡",
                    content: "删除后，你将不再享受相应的会员权益。确定要删除吗？",
                    success: function(t) {
                        t.confirm ? (wx.showLoading({
                            title: "请求中"
                        }), e.request({
                            path: "/wscscrm/scrm/membercard/delete.json",
                            query: {
                                card_no: e.data.customerCard.card_no
                            }
                        }).then(function(e) {
                            wx.hideLoading(), wx.navigateTo({
                                url: "/packages/card/list/index"
                            });
                        }).catch(function(e) {
                            wx.hideLoading(), wx.showToast({
                                title: e.msg,
                                icon: "none",
                                duration: 1e3
                            });
                        })) : t.cancel && console.log("用户点击取消");
                    }
                });
            },
            setDefaultCard: function() {
                var e = this;
                wx.showLoading({
                    title: "请求中"
                }), this.request({
                    path: "/wscscrm/scrm/membercard/setdefault.json",
                    query: {
                        card_no: this.data.customerCard.card_no
                    }
                }).then(function(t) {
                    wx.hideLoading(), e.setData({
                        isDefault: !0
                    }), wx.showToast({
                        title: "设置成功"
                    });
                }).catch(function(e) {
                    wx.hideLoading(), wx.showToast({
                        title: e.msg,
                        icon: "none",
                        duration: 1e3
                    });
                });
            },
            makePhoneCall: function() {
                wx.makePhoneCall({
                    phoneNumber: this.data.card.detail.service_phone
                });
            },
            onZanAccountBinded: function() {
                this.activateReal();
            },
            activate: function() {
                this.data.hasMobile ? this.activateReal() : this.bindZanAccount();
            },
            activateReal: function() {
                var e = this;
                this.data.card.detail.activation_condition.require_profile ? wx.navigateTo({
                    url: "/packages/card/active/index?card_no=" + this.data.customerCard.card_no + "&alias=" + this.data.alias
                }) : (wx.showLoading({
                    title: "请求中"
                }), this.request({
                    path: "/wscscrm/scrm/membercard/activate.json",
                    method: "post",
                    data: {
                        cardNo: this.data.customerCard.card_no,
                        customerInfo: {}
                    }
                }).then(function() {
                    wx.hideLoading(), wx.redirectTo({
                        url: "/packages/card/detail/index?alias=" + e.data.alias
                    });
                }).catch(function(e) {
                    wx.hideLoading(), wx.showToast({
                        title: e.msg,
                        icon: "none",
                        duration: 1e3
                    });
                }));
            },
            takeCard: function() {
                var e = this;
                wx.showLoading({
                    title: "请求中"
                }), this.request({
                    path: "/wscscrm/scrm/membercard/take.json",
                    query: {
                        alias: this.data.alias
                    }
                }).then(function(t) {
                    wx.hideLoading(), wx.navigateTo({
                        url: "/packages/card/result/index?card_no=" + t.card_no + "&alias=" + e.data.alias + "&from=take&need_active=" + e.data.card.is_need_activate
                    });
                }).catch(function(e) {
                    wx.hideLoading(), wx.showToast({
                        title: e.msg,
                        icon: "none",
                        duration: 1e3
                    });
                });
            },
            onShareAppMessage: function(e) {
                return r.page.processShareData({
                    title: "你有一张会员卡待领取",
                    path: "/packages/card/detail/index?alias=" + this.data.alias,
                    imageUrl: "https://img.yzcdn.cn/public_files/2018/02/02/28048169e4f43ec419675350ebd9c8d3.png?imageView2/2/w/730/h/0/q/90/format/jpg",
                    success: function(e) {},
                    fail: function(e) {}
                });
            }
        });
    }
});