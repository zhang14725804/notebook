var t = require("../../../utils/util.js"), a = (require("../../../utils/keplerReport.js").init(), 
getApp());

Page({
    data: {
        coupondir: "/coupon",
        thisBarTitle: "领取优惠券",
        returnpage: "/pages/coupon/getCoupon/getCoupon",
        toTopDisplay: "none",
        scrollTop: 0,
        couponStatusCls: "",
        couponTipMsg: "",
        buttonTxt: "立即领取",
        tabFun: "tapBtnGetCoupon",
        isLogined: !1,
        fromPageLevel: null,
        couponDisabled: ""
    },
    onLoad: function(t) {
        var a = this, e = t.key, o = t.roleId;
        if (!e || !o) {
            var r = wx.getStorageSync("getCouponParam");
            e = r.key, o = r.roleId, wx.removeStorageSync("getCouponParam");
        }
        if (!e || !o) return wx.redirectTo({
            url: "/pages/error/error?thisBarTitle=" + a.data.thisBarTitle
        }), !1;
        this.setData({
            couponParam: {
                key: e,
                roleId: o
            }
        }), this.dataRequest();
    },
    onShow: function() {},
    dataRequest: function() {
        var e = this, o = e.data.couponParam.key, r = e.data.couponParam.roleId, n = a.globalRequestUrl + "/coupon/coupon/getAloneCoupon";
        this.data.isHaveMore = !1, t.request({
            url: n,
            data: {
                key: o,
                roleId: r
            },
            success: function(t) {
                e.dataInit(t, e);
            },
            fail: function(a) {
                t.reportErr("coupon getCoupon.js: " + a), wx.redirectTo({
                    url: "/pages/error/error?thisBarTitle=" + e.data.thisBarTitle
                });
            }
        });
    },
    dataInit: function(a, e) {
        var o = this;
        if (a && "string" != typeof a) if (a.loginFlag && "false" != a.loginFlag) {
            a.rpcFlag && a.data || wx.redirectTo({
                url: "/pages/error/error?thisBarTitle=" + o.data.thisBarTitle
            }), o.setData({
                isLogined: !0
            });
            var r = "";
            5 == a.data.expireType ? r = a.data.beginTimeStr && a.data.endTimeStr ? a.data.beginTimeStr + "-" + a.data.endTimeStr : "" : 0 == a.data.expireType ? r = a.data.creatTimeStr && a.data.endTimeStr ? a.data.creatTimeStr + "-" + a.data.endTimeStr : "" : 1 == a.data.expireType && (r = null != a.data.addDays && void 0 != a.data.addDays ? "领取后" + a.data.addDays + "天可用" : ""), 
            a.data.discount && "" != r && a.data.couponTypeMsg || this.setData({
                couponDisabled: "couponDisabled",
                buttonTxt: "不可领取",
                tabFun: ""
            }), a.data.couponDateRange = r, this.setData({
                item: a.data
            });
        } else {
            var n = o.data.couponParam.key, i = o.data.couponParam.roleId;
            o.setData({
                isLogined: !1
            }), n && i && (wx.removeStorageSync("getCouponParam"), wx.setStorage({
                key: "getCouponParam",
                data: {
                    key: n,
                    roleId: i
                }
            })), t.globalLoginShow(this);
        } else wx.redirectTo({
            url: "/pages/error/error?thisBarTitle=" + o.data.thisBarTitle
        });
    },
    couponShowInfo: function() {
        wx.showModal({
            title: "提示",
            content: "1、运费券仅可用于抵减京东自营商品订单运费,即用户下单结算时,可选择该优惠券按券面值（¥6）抵减每笔结算订单中的运费,运费券可叠加使用在同一个订单中,不设找零；2、虚拟商品及部分特殊购物流程不可用, 特殊流程如秒杀、夺宝岛等；3、运费券可与京券、东券、京东E卡、京豆同时使用",
            showCancel: !1,
            success: function(t) {
                t.confirm && console.log("用户点击确定");
            }
        });
    },
    tapBtnGetCoupon: function() {
        var e = this, o = e.data.couponParam.key, r = e.data.couponParam.roleId, n = a.globalRequestUrl + "/coupon/coupon/postAloneCoupon";
        t.request({
            url: n,
            data: {
                key: o,
                roleId: r
            },
            success: function(t) {
                t && t.rpcFlag ? e.couponStatus(t) : wx.redirectTo({
                    url: "/pages/error/error?thisBarTitle=" + e.data.thisBarTitle
                });
            },
            fail: function(a) {
                t.reportErr("coupon getCoupon.js: " + a), wx.redirectTo({
                    url: "/pages/error/error?thisBarTitle=" + e.data.thisBarTitle
                });
            }
        });
    },
    couponStatus: function(t) {
        var a = "", e = "", o = "立即领取", r = "tapBtnGetCoupon";
        t.data.resultCode && (16 == t.data.resultCode || 17 == t.data.resultCode ? (a = "empty", 
        e = "该券已领光，请下次再来~", o = "返回活动页，继续购物", r = "tapBtnBack") : 999 == t.data.resultCode ? (a = "received", 
        e = "领取成功！感谢您的参与，祝您购物愉快~", o = "立即使用", r = "tapBtnBack") : 14 == t.data.resultCode || 15 == t.data.resultCode ? (a = "received", 
        e = "您已经参与过此活动，别太贪心哟，下次再来~", o = "返回活动页，继续购物", r = "tapBtnBack") : (a = "", e = t.data.resultMsg, 
        o = "返回活动页，继续购物", r = "tapBtnBack"), this.setData({
            couponStatusCls: a,
            couponTipMsg: e,
            buttonTxt: o,
            tabFun: r
        }));
    },
    tapBtnBack: function() {
        wx.navigateBack({});
    }
});