!function() {
    require("./../../../common.js"), wx.webpackJsonp.apply(null, arguments);
}([ 14 ], {
    272: function(t, a, e) {
        function i(t) {
            return t && t.__esModule ? t : {
                default: t
            };
        }
        var n, o = i(e(105)), s = i(e(1)), d = e(0), u = "valid", r = "used", c = "invalid", l = "promocard", h = "promocode", g = getApp(), p = e(3), m = e(45), f = e(8), v = null, D = null, y = 0, P = 0, w = null, B = null, H = null, b = !1;
        (0, s.default)(p({}, m, f.Toast, o.default, (n = {
            data: {
                winWidth: 0,
                winHeight: 0,
                currentTab: 0,
                couponValid: [],
                couponUsed: [],
                couponInvalid: [],
                emptyBgData: {
                    empBgHeight: 0,
                    empBgWidth: 0,
                    empImgUrl: "",
                    empImgHeight: 0,
                    empImgWidth: 0,
                    emptyHintText: ""
                },
                bindTips: "",
                showBindPhoneNumber: !1,
                isValidLoading: !0,
                isUsedLoading: !0,
                isInvalidLoading: !0,
                validPage: 1,
                invalidPage: 1,
                usedPage: 1,
                validHasMore: !0,
                invalidHasMore: !0,
                usedHasMore: !0
            },
            onLoad: function(t) {
                var a = this, e = "";
                v = l, wx.getSystemInfo({
                    success: function(t) {
                        a.setData({
                            winWidth: t.windowWidth,
                            winHeight: t.windowHeight
                        });
                    }
                }), wx.setNavigationBarTitle({
                    title: t.title
                }), v == l ? e = "找不到优惠券？绑定手机号试试" : v == h && (e = "找不到优惠码？绑定手机号试试"), this.setData({
                    bindTips: e
                }), this.getMyPromoData();
            },
            onShow: function() {
                d.page.show();
                var t = !1;
                t = !g.getBuyerId(), this.setData({
                    showBindPhoneNumber: t
                });
            },
            onUnload: function() {
                g.off(null, null, this);
            }
        }, n.onUnload = function() {
            y = 0, w = null, B = null, H = null, b = !1;
        }, n.onLoadMore = function() {
            1 == b || (console.log("load more"), 0 == y && 1 == this.data.validHasMore ? this.requestUserPromoData() : 1 == y && 1 == this.data.usedHasMore ? this.requestUserPromoData() : 2 == y && 1 == this.data.invalidHasMore && this.requestUserPromoData());
        }, n.getMyPromoData = function() {
            this.formURL(), this.doGetMyPromoData();
        }, n.formURL = function() {
            v == l ? D = "weapp.spotlight.coupon.search/1.0.0/" : v == h && (D = "youzan.ump.promocode.buyer/1.0.0/search");
        }, n.doGetMyPromoData = function() {
            P = g.getBuyerId(), this.requestUserPromoData();
        }, n.bindChange = function(t) {
            if (!b) {
                var a = this;
                y = t.detail.current, a.setData({
                    currentTab: y
                }), this.applyCacheOrRequestForData();
            }
        }, n.applyCacheOrRequestForData = function() {
            this.doApplyCache() || this.requestUserPromoData();
        }, n.requestUserPromoData = function() {
            var t = this;
            wx.showLoading({
                title: "努力加载中"
            }), b = !0;
            var a = this.getStatus(), e = this.getPageByStatus();
            console.log(e), console.log(a), g.carmen({
                api: "weapp.spotlight.coupon/1.0.0/search",
                query: {
                    status: a,
                    page: e,
                    source: "mini_program_11"
                },
                success: function(e) {
                    var i = t.convertCouponlist(e.list);
                    t.setDataByTab(i, e.has_next), t.setCacheData(i), wx.hideLoading(), b = !1, t.updateLoadingStatus(a);
                },
                fail: function(e) {
                    wx.hideLoading(), t.updateLoadingStatus(a), t.showZanToast(e.msg || "获取信息失败");
                }
            });
        }, n.updateLoadingStatus = function(t) {
            t == u ? this.setData({
                isValidLoading: !1
            }) : t == c ? this.setData({
                isInvalidLoading: !1
            }) : t == r && this.setData({
                isUsedLoading: !1
            });
        }, n.setDataByTab = function(t, a) {
            var e;
            if (0 == y) {
                var i = this.data.validPage + 1;
                this.setData({
                    couponValid: t,
                    validPage: i,
                    validHasMore: a
                });
            } else if (1 == y) {
                var n = this.data.usedPage + 1;
                this.setData({
                    couponUsed: t,
                    usedPage: n,
                    usedHasMore: a
                });
            } else if (2 == y) {
                var o = this.data.invalidPage + 1;
                this.setData({
                    couponInvalid: t,
                    invalidPage: o,
                    invalidHasMore: a
                });
            }
            this.setData((e = {}, e["emptyBgData.empBgHeight"] = this.data.winHeight, e["emptyBgData.empBgWidth"] = this.data.winWidth, 
            e["emptyBgData.empImgUrl"] = "https://img.yzcdn.cn/public_files/2017/09/01/6750611093443d37cf187528c2be9f78.png", 
            e["emptyBgData.empImgHeight"] = 168, e["emptyBgData.empImgWidth"] = 160, e["emptyBgData.emptyHintText"] = v == l ? "暂无优惠券" : "暂无优惠码", 
            e));
        }, n.doApplyCache = function() {
            return 0 == y && w ? (this.setData({
                couponsValid: w
            }), !0) : 1 == y && B ? (this.setData({
                couponUsed: B
            }), !0) : !(2 != y || !H || (this.setData({
                couponInvalid: H
            }), 0));
        }, n.getStatus = function() {
            return 0 == y ? u : 1 == y ? r : 2 == y ? c : u;
        }, n.getPageByStatus = function() {
            return 0 == y ? this.data.validPage : 1 == y ? this.data.usedPage : 2 == y ? this.data.invalidPage : this.data.validPage;
        }, n.setCacheData = function(t) {
            0 == y ? w = t : 1 == y ? B = t : 2 == y && (H = t);
        }, n.swichNav = function(t) {
            var a = this;
            this.data.currentTab === t.target.dataset.current || b || a.setData({
                currentTab: t.target.dataset.current
            });
        }, n.convertCouponlist = function(t) {
            var a;
            return a = 0 == y ? this.data.couponValid : 1 == y ? this.data.couponUsed : 2 == y ? this.data.couponInvalid : [], 
            console.log(a), t.forEach(function(t) {
                0 == y && (t.status = "valid", t.valid_content = "立即使用"), 2 == y && (t.is_invalid = 1);
                var e = o.default.handleCouponData(t);
                a.push(e);
            }), a;
        }, n.onCouponCellTaped = function() {}, n.onMoredescTaped = function(t, a) {
            if (0 == y) {
                var e;
                this.setData((e = {}, e["couponValid[" + a + "]"] = t, e));
            } else if (1 == y) {
                var i;
                this.setData((i = {}, i["couponUsed[" + a + "]"] = t, i));
            } else if (2 == y) {
                var n;
                this.setData((n = {}, n["couponInvalid[" + a + "]"] = t, n));
            }
        }, n.tapBindZanAccount = function() {
            this.bindZanAccount();
        }, n.onZanAccountBinded = function() {
            this.getMyPromoData(), this.setData({
                showBindPhoneNumber: !1
            });
        }, n.onGotoHomePage = function() {
            wx.switchTab({
                url: "/pages/venue/home/index",
                success: function() {
                    g.initVenuesTabData({
                        reset: !0
                    });
                }
            });
        }, n)));
    }
}, [ 272 ]);