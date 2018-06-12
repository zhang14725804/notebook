!function() {
    require("./../../../common.js"), wx.webpackJsonp.apply(null, arguments);
}([ 13 ], {
    273: function(o, t, a) {
        function e(o) {
            return o && o.__esModule ? o : {
                default: o
            };
        }
        var i, n, u, c, p, s, r = e(a(2)), d = e(a(274)), l = e(a(1)), f = a(0), m = "promocard", h = "promocode", g = a(8), w = getApp(), D = a(3), y = a(45);
        (0, l.default)(D({}, y, g.Toast, {
            data: {
                couponData: {
                    winWidth: 0,
                    winHeight: 0,
                    promoType: "",
                    source: "",
                    tabPosition: 0,
                    curVisibility: !1,
                    isSuccessView: !1,
                    coupon: {}
                }
            },
            onLoad: function(o) {
                var t = this, a = this, e = "promocard" == o.type ? "优惠券" : "优惠码";
                u = o.type, c = +o.tab, n = o.id, p = o.from, i = o.kdt_id, wx.getSystemInfo({
                    success: function(o) {
                        var t;
                        a.setData((t = {}, t["couponData.winWidth"] = o.windowWidth, t["couponData.winHeight"] = o.windowHeight, 
                        t));
                    }
                }), wx.setNavigationBarTitle({
                    title: e
                }), wx.showLoading({
                    title: "努力加载中"
                }), "list" == p ? this.requestPromoDetail(u) : setTimeout(function() {
                    t.buyerIdExists();
                }, 2e3);
            },
            onShow: function() {
                f.page.show();
            },
            requestPromoDetail: function(o) {
                var t = this, a = null, e = null;
                o == m ? (a = "youzan.ump.promocard.detail/1.0.0/get", e = {
                    card_id: n
                }) : o == h && (a = "youzan.ump.promocode.detail/1.0.0/get", e = {
                    code_id: n
                }), e.kdt_id = i, w.carmen({
                    api: a,
                    query: e,
                    success: function(a) {
                        var e;
                        s = a.group.id;
                        var i = d.default.handleCouponDetailData(a);
                        i.group.is_share && t.assignShare(), t.setData((e = {}, e["couponData.coupon"] = i, 
                        e["couponData.source"] = p, e["couponData.promoType"] = o, e["couponData.tabPosition"] = c, 
                        e["couponData.curVisibility"] = !0, e["couponData.isSuccessView"] = !0, e));
                    },
                    fail: function(o) {
                        t.showZanToast(o.msg || "获取信息失败");
                    },
                    complete: function() {
                        wx.hideLoading();
                    }
                });
            },
            buyerIdExists: function() {
                var o = w.getBuyerId();
                return o ? void this.claimCouopn(o) : (wx.hideLoading(), void this.bindZanAccount());
            },
            claimCouopn: function(o) {
                var t = this;
                w.carmen({
                    api: "youzan.ump.coupon/1.0.0/fetch",
                    query: {
                        id: n,
                        mobile: w.getMobile()
                    },
                    success: function(o) {
                        n = "promocard" == u ? o.promocard.promocard_id : o.promocode.promocode_id, t.requestPromoDetail("PROMOCARD" == o.coupon_type ? m : h);
                    },
                    fail: function() {
                        t.requestCouponDetail(o), t.showZanToast("获取信息失败");
                    }
                });
            },
            requestCouponDetail: function(o) {
                var t = this;
                w.carmen({
                    api: "youzan.ump.coupon/1.0.0/detail",
                    query: {
                        with_user_status: 1,
                        kdt_id: w.getKdtId(),
                        buyer_id: o,
                        id: n
                    },
                    success: function(o) {
                        var a, e = d.default.handleCouponDetailData(o);
                        t.setData((a = {}, a["couponData.coupon"] = e, a["couponData.source"] = p, a["couponData.promoType"] = u, 
                        a["couponData.tabPosition"] = c, a["couponData.curVisibility"] = !0, a["couponData.isSuccessView"] = !1, 
                        a)), wx.setNavigationBarTitle({
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
            _onQrCodeTapped: function(o) {
                wx.navigateTo({
                    url: "./qr_detail?type=" + this.data.couponData.promoType + "&verifycode=" + o
                });
            },
            assignShare: function() {
                (0, r.default)(this, {
                    onShareAppMessage: function() {
                        return {
                            title: "送你一张" + ("promocard" == u ? "优惠券" : "优惠码"),
                            path: "pages/usercenter/promotion/promotion_detail?type=" + u + "&id=" + s,
                            imageUrl: "https://img.yzcdn.cn/public_files/2017/08/31/cbef4e01c8255fa5dd0966756d67fd1a.png"
                        };
                    }
                });
            },
            onZanAccountBinded: function() {
                wx.showLoading({
                    title: "努力加载中"
                }), this.buyerIdExists();
            },
            onQrCodeTapped: d.default.onQrCodeTapped,
            onShareButtonTapped: d.default.onShareButtonTapped,
            onUseButtonTapped: d.default.onUseButtonTapped
        }));
    }
}, [ 273 ]);