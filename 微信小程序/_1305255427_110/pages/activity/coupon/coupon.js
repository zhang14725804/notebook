function o(o) {
    return o && o.__esModule ? o : {
        default: o
    };
}

var t = o(require("../../../utils/api.js")), a = o(require("../../../libs/lodash.core.min.js")), e = o(require("../../../libs/es6-promise.min")), n = getApp();

Page({
    data: {
        piwikSource: "",
        ui: {
            isShowPopup: !1,
            isShowCoupon: !1,
            isShowErrPopup: !1,
            isShowGetPhonePopup: !0,
            isShowAutoGetPhoneFailPopup: !1
        },
        couponInfo: {
            activityId: "",
            activityName: "",
            packageCode: "",
            headImage: "",
            background_color: "",
            title: "领取成功!",
            coupons: [],
            buttons: [],
            text: "",
            status: 0,
            isReceive: !1,
            shareInfo: {}
        },
        userInfo: {
            isLogin: !1,
            phoneNumber: 18180421234
        },
        popupInfo: {
            text: ""
        },
        errInfo: {
            title: ""
        },
        getPhoneNumberInfo: {
            title: "送你一个大红包~"
        },
        resource: {
            coupon_bg: "https://sr.aihuishou.com/activity/minapp/coupon/coupon_bg.png",
            icon_detail: "https://sr.aihuishou.com/activity/minapp/coupon/icon_detail.png"
        },
        tracking: {
            scene: "",
            button: ""
        }
    },
    onLoad: function(o) {
        var t = this, a = o.id;
        t.data.couponInfo.activityId = a, this.setData({
            "tracking.scene": getApp().globalData.scene
        }), n.saveOpenId(), t.checkUserLogin(), t.reloadShowPopup(), t.getCouponInfo(a);
    },
    onShareAppMessage: function() {
        var o = this;
        return {
            title: o.data.couponInfo.activityName,
            imageUrl: o.data.couponInfo.shareInfo.imgUrl,
            path: "pages/activity/coupon/coupon?id=" + o.data.couponInfo.activityId,
            success: function(o) {},
            fail: function(o) {}
        };
    },
    reloadShowPopup: function() {
        var o = {
            isShowPopup: !1,
            isShowCoupon: !1,
            isShowErrPopup: !1,
            isShowGetPhonePopup: !0
        };
        this.setData({
            ui: o
        });
    },
    getCouponInfo: function(o) {
        var i = this, u = o;
        return new e.default(function(o, r) {
            n.fetch(t.default.fetchCouponActivity + u, {
                id: u
            }, function(o, s, p) {
                if ("success" == p && s.data && 0 == s.code) {
                    var c = s.data.packageCode;
                    return i.data.couponInfo.packageCode = c, i.data.couponInfo.activityName = s.data.title, 
                    wx.setNavigationBarTitle({
                        title: s.data.title
                    }), i.data.couponInfo.shareInfo = s.data.shareSetting, i.data.couponInfo.headImage = s.data.headImgUrl, 
                    i.data.couponInfo.background_color = s.data.backgroundColour, i.data.couponInfo.buttons = s.data.buttons, 
                    i.data.couponInfo.text = s.data.rule, new e.default(function(o, r) {
                        n.fetch(t.default.fetchPackage + c, {
                            packageCode: c
                        }, function(r, s, p) {
                            if ("success" == p && s.data) {
                                var d = s.data.status, f = s.data.promotions, h = (s.data.maxCountPerUser, s.data.reveiveCountPerUser, 
                                ""), I = "";
                                return a.default.forEach(f, function(o) {
                                    i.data.couponInfo.title = "领取成功！", h = o.startTime ? new Date(o.startTime).pattern("yyyy.MM.dd") : null, 
                                    I = o.endTime ? new Date(o.endTime).pattern("yyyy.MM.dd") : null, o.date = h && I ? h + "-" + I : "";
                                }), i.data.couponInfo.status = d, i.data.couponInfo.coupons = f, new e.default(function(o, e) {
                                    n.post(t.default.getReceiveCouponByCode, {
                                        packageCode: c,
                                        activityId: u
                                    }, function(t, e, n) {
                                        var u = {
                                            isShowPopup: !1,
                                            isShowCoupon: !1,
                                            isShowErrPopup: !1,
                                            isShowGetPhonePopup: !1
                                        };
                                        switch (console.log(e, "券的相关信息log"), e.code) {
                                          case 0:
                                            i.data.couponInfo.title = "领取成功！", u.isShowCoupon = !0, i.data.couponInfo.isReceive = !1;
                                            var r = i.data.couponInfo.coupons, s = new Date();
                                            a.default.forEach(r, function(o) {
                                                if (o.leftDays) {
                                                    var t = new Date(o.startTime), a = new Date(o.endTime);
                                                    s > t && s < a && (o.date = o.leftDays + "天后过期");
                                                } else o.date = "";
                                            });
                                            break;

                                          case 10002:
                                            i.data.couponInfo.title = "您已经领取过这个红包啦~", u.isShowCoupon = !0, i.data.couponInfo.isReceive = !0, 
                                            r = i.data.couponInfo.coupons, s = new Date(), a.default.forEach(r, function(o) {
                                                1 == o.validDateType ? o.enable && (o.date = o.leftDays + "天后过期") : o.date = "";
                                            });
                                            break;

                                          case 10007:
                                            i.data.errInfo.title = "领取失败，红包仅限新人领取", u.isShowErrPopup = !0;
                                            break;

                                          default:
                                            i.data.errInfo.title = "您的券被外星人领走了...", u.isShowErrPopup = !0;
                                        }
                                        i.data.ui = u, o();
                                    });
                                }).then(function() {
                                    i.setData({
                                        ui: i.data.ui,
                                        errInfo: i.data.errInfo,
                                        couponInfo: i.data.couponInfo
                                    });
                                });
                            }
                            o();
                        });
                    }).then(function() {
                        i.setData({
                            ui: i.data.ui,
                            errInfo: i.data.errInfo,
                            couponInfo: i.data.couponInfo
                        });
                    });
                }
                r(s);
            });
        }).then(function() {
            i.setData({
                ui: i.data.ui,
                errInfo: i.data.errInfo,
                couponInfo: i.data.couponInfo
            });
        }, function(o) {
            if (10003 == o.code) {
                var t = {
                    isShowPopup: !1,
                    isShowCoupon: !1,
                    isShowErrPopup: !0,
                    isShowGetPhonePopup: !1
                };
                i.data.ui = t, i.data.errInfo.title = "活动已结束", i.data.couponInfo.headImage = o.data.headImgUrl, 
                i.data.couponInfo.background_color = o.data.backgroundColour, i.data.couponInfo.activityName = o.data.title, 
                i.data.couponInfo.shareInfo = o.data.shareSetting, i.setData({
                    ui: i.data.ui,
                    couponInfo: i.data.couponInfo,
                    errInfo: i.data.errInfo
                });
            }
        });
    },
    isShowCouponDescription: function(o) {
        var t = this, a = o.target.dataset.discription;
        t.setData({
            "popupInfo.text": a,
            "ui.isShowPopup": !0
        });
    },
    handleonClosePopup: function() {
        var o = this;
        o.setData({
            "ui.isShowPopup": !o.data.ui.isShowPopup
        });
    },
    checkUserLogin: function() {
        var o = this, a = {
            isShowPopup: !1,
            isShowCoupon: !1,
            isShowErrPopup: !1,
            isShowGetPhonePopup: !0
        };
        n.fetch(t.default.fetchUser, {}, function(t, e, n) {
            console.log(e, "登录了吗"), e.data ? (o.data.userInfo.isLogin = !0, o.data.userInfo.phoneNumber = e.data.mobile, 
            a.isShowCoupon = !0, a.isShowGetPhonePopup = !1) : o.data.userInfo.isLogin = !1, 
            o.setData({
                ui: a,
                userInfo: o.data.userInfo
            });
        });
    },
    getPhoneNumber: function(o) {
        n.getPhoneNumber(o, this.getPhoneSuccess.bind(this), this.getPhoneFailed.bind(this));
    },
    getPhoneSuccess: function(o) {
        var a = this, e = o.detail.encryptedData, i = o.detail.iv;
        n.post(t.default.getWeixinBindPhone, {
            encryptedData: e,
            iv: i
        }, function(o, t, e) {
            if (0 == t.code) n.saveCache("user-phone-info", {
                phone: t.data.purePhoneNumber
            }), a.getPhoneNumberSuccess(t); else {
                var i = {
                    isShowPopup: !1,
                    isShowCoupon: !1,
                    isShowErrPopup: !0,
                    isShowGetPhonePopup: !1,
                    isShowAutoGetPhoneFailPopup: !0
                };
                a.data.errInfo.title = "您的券被外星人领走了...", a.setData({
                    ui: i,
                    errInfo: a.data.errInfo,
                    getPhoneNumberInfo: a.data.getPhoneNumberInfo
                });
            }
        });
    },
    getPhoneFailed: function() {
        var o = this;
        o.data.getPhoneNumberInfo.title = "必须授权后才能领取红包哦~", o.setData({
            getPhoneNumberInfo: o.data.getPhoneNumberInfo,
            "ui.isShowAutoGetPhoneFailPopup": !0
        });
    },
    getPhoneNumberSuccess: function(o) {
        var t = this;
        t.data.userInfo.isLogin = !0, t.data.userInfo.phoneNumber = o.data ? o.data.purePhoneNumber : o.detail.data.purePhoneNumber, 
        t.getCouponInfo(t.data.couponInfo.activityId);
        var a = {
            isShowPopup: !1,
            isShowCoupon: !0,
            isShowErrPopup: !1,
            isShowGetPhonePopup: !1
        };
        t.setData({
            ui: a,
            userInfo: t.data.userInfo
        });
    },
    handleOnNavigateTo: function(o) {
        var t = o.target.dataset.name, a = o.target.dataset.url;
        this.setData({
            "tracking.button": t
        }), wx.removeStorageSync("from_activity"), wx.setStorage({
            key: "from_activity",
            data: "coupon"
        }), wx.redirectTo({
            url: a
        });
    }
});