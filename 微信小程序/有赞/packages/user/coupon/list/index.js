!function(t) {
    function e(n) {
        if (a[n]) return a[n].exports;
        var o = global.installedModules[n] = a[n] = {
            i: n,
            l: !1,
            exports: {}
        };
        return t[n].call(o.exports, o, o.exports, e), o.l = !0, o.exports;
    }
    t = Object.assign(require("../../../../commons.js").modules, t);
    var a = {};
    a = global.installedModules = global.installedModules || {}, e.m = t, e.c = a, e.d = function(t, a, n) {
        e.o(t, a) || Object.defineProperty(t, a, {
            configurable: !1,
            enumerable: !0,
            get: n
        });
    }, e.r = function(t) {
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
    }, e.n = function(t) {
        var a = t && t.__esModule ? function() {
            return t.default;
        } : function() {
            return t;
        };
        return e.d(a, "a", a), a;
    }, e.o = function(t, e) {
        return Object.prototype.hasOwnProperty.call(t, e);
    }, e.p = "", e(e.s = 111);
}({
    111: function(t, e, a) {
        function n(t) {
            if (t && t.__esModule) return t;
            var e = {};
            if (null != t) for (var a in t) Object.prototype.hasOwnProperty.call(t, a) && (e[a] = t[a]);
            return e.default = t, e;
        }
        function o(t) {
            return t && t.__esModule ? t : {
                default: t
            };
        }
        function i(t, e, a) {
            return e in t ? Object.defineProperty(t, e, {
                value: a,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : t[e] = a, t;
        }
        var r, s = o(a(0)), u = o(a(25)), c = o(a(3)), d = n(a(8)), l = n(a(1)), p = {
            promocard: "我的优惠券",
            promocode: "我的优惠码"
        }, h = getApp(), f = "", g = null, m = 0, D = null, y = null, b = null, v = !1;
        (0, s.default)(d, l.Toast, u.default, (i(r = {
            data: {
                pagetype: "single",
                winWidth: 0,
                winHeight: 0,
                currentTab: 0,
                couponValid: [],
                couponUsed: [],
                couponInvalid: [],
                themeClass: h.themeClass,
                emptyBgData: {
                    empBgHeight: 0,
                    empBgWidth: 0,
                    empImgUrl: "",
                    empImgHeight: 0,
                    empImgWidth: 0,
                    emptyHintText: ""
                },
                bindTips: "",
                showBindPhoneNumber: !1
            },
            onLoad: function(t) {
                var e = this, a = "";
                f = t.type || "", wx.setNavigationBarTitle({
                    title: p[f]
                }), "promocard" == f ? a = "找不到优惠券？绑定手机号试试" : "promocode" == f && (a = "找不到优惠码？绑定手机号试试");
                var n = t.pagetype || "single";
                this.setData({
                    bindTips: a,
                    pagetype: n
                }), wx.getSystemInfo({
                    success: function(t) {
                        e.setData({
                            winWidth: t.windowWidth,
                            winHeight: t.windowHeight
                        });
                    }
                }), this.getMyPromoData();
            },
            onShow: function() {
                var t = !1;
                t = !h.getBuyerId(), this.setData({
                    showBindPhoneNumber: t
                });
            },
            onUnload: function() {
                h.off(null, null, this);
            }
        }, "onUnload", function() {
            m = 0, D = null, y = null, b = null, v = !1;
        }), i(r, "getMyPromoData", function() {
            this.formURL(), this.requestUserPromoData(1, 200);
        }), i(r, "formURL", function() {
            "promocard" == f ? g = "youzan.ump.promocard.buyer/1.0.0/search" : "promocode" == f && (g = "youzan.ump.promocode.buyer/1.0.0/search");
        }), i(r, "bindChange", function(t) {
            v || (m = t.detail.current, this.setData({
                currentTab: m
            }), this.applyCacheOrRequestForData());
        }), i(r, "applyCacheOrRequestForData", function() {
            this.doApplyCache() || this.requestUserPromoData(1, 200);
        }), i(r, "requestUserPromoData", function(t, e) {
            var a = this;
            wx.showLoading({
                title: "努力加载中"
            }), v = !0;
            var n = this.getStatus();
            h.carmen({
                api: g,
                query: {
                    status: n,
                    perpage: e,
                    page: t,
                    kdt_id: h.getKdtId()
                },
                config: {
                    skipKdtId: "all" === this.data.pagetype
                },
                success: function(t) {
                    t = a.convertCouponlist(t), a.setDataByTab(t), a.setCacheData(t), wx.hideLoading(), 
                    v = !1;
                },
                fail: function(t) {
                    wx.hideLoading(), v = !1, a.showZanToast(t.msg || "获取信息失败");
                }
            });
        }), i(r, "setDataByTab", function(t) {
            0 == m ? this.setData({
                couponValid: t
            }) : 1 == m ? this.setData({
                couponUsed: t
            }) : 2 == m && this.setData({
                couponInvalid: t
            }), this.setData({
                "emptyBgData.empBgHeight": this.data.winHeight,
                "emptyBgData.empBgWidth": this.data.winWidth,
                "emptyBgData.empImgUrl": "https://img.yzcdn.cn/public_files/2017/09/01/6750611093443d37cf187528c2be9f78.png",
                "emptyBgData.empImgHeight": 168,
                "emptyBgData.empImgWidth": 160,
                "emptyBgData.emptyHintText": "promocard" == f ? "暂无优惠券" : "暂无优惠码"
            });
        }), i(r, "doApplyCache", function() {
            return 0 == m && D ? (this.setData({
                couponsValid: D
            }), !0) : 1 == m && y ? (this.setData({
                couponUsed: y
            }), !0) : !(2 != m || !b || (this.setData({
                couponInvalid: b
            }), 0));
        }), i(r, "getStatus", function() {
            return 0 == m ? "VALID" : 1 == m ? "USED" : 2 == m ? "INVALID" : "VALID";
        }), i(r, "setCacheData", function(t) {
            0 == m ? D = t : 1 == m ? y = t : 2 == m && (b = t);
        }), i(r, "swichNav", function(t) {
            this.data.currentTab === t.target.dataset.current || v || this.setData({
                currentTab: t.target.dataset.current
            });
        }), i(r, "convertCouponlist", function(t) {
            var e = [];
            return t.forEach(function(t) {
                0 == m && (t.status = "valid", t.valid_content = "立即使用"), 2 == m && (t.is_invalid = 1);
                var a = u.default.handleCouponData(t);
                e.push(a);
            }), e;
        }), i(r, "onCouponCellTaped", function(t, e) {
            c.default.navigate({
                url: "/packages/user/coupon/detail/index?type=" + f + "&from=list&tab=" + m + "&id=" + t.id
            });
        }), i(r, "onMoredescTaped", function(t, e) {
            0 == m ? this.setData(i({}, "couponValid[" + e + "]", t)) : 1 == m ? this.setData(i({}, "couponUsed[" + e + "]", t)) : 2 == m && this.setData(i({}, "couponInvalid[" + e + "]", t));
        }), i(r, "tapBindZanAccount", function(t) {
            this.bindZanAccount();
        }), i(r, "onZanAccountBinded", function() {
            this.getMyPromoData(), this.setData({
                showBindPhoneNumber: !1
            });
        }), r));
    }
});