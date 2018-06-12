var a = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../components/toast/toast.js")), t = getApp(), o = require("../../utils/util.js"), r = require("../../utils/keplerReport.js").init(), s = require("../../wxParse/wxParse.js"), i = require("../../utils/message_push.js"), n = {};

t.globalConfig && t.globalConfig.haveAuthorFloor && (n = require("./book/bookAuthor.js").bookAuthor), 
Page(Object.assign({}, n, {
    data: {
        productDir: "/kwxitem",
        pDir: "/kwxp",
        isShowContent: !1,
        screenHeight: 0,
        screenWidth: 0,
        wareId: "",
        wareInfo: [],
        skuColorSize: [],
        currentColorSize: null,
        indicatorDots: !0,
        autoplay: !1,
        duration: 200,
        couponList: {},
        couponOpen: "icon-arrow-down",
        couponClass: "coupon-down",
        promotionClass: "promotion-down",
        promotionOpen: "icon-arrow-down",
        couponTitle: "",
        couponType: "",
        couponPopupsShow: "none",
        codeKey: "",
        vcodeUrl: "",
        inputVcode: "",
        couponRequestUrl: "",
        errorMsg: "",
        imgHeight: [],
        detailImgIndex: 0,
        detailImgUrls: [],
        assessImgWidth: 0,
        assessImgHeight: 0,
        detailOpen: "icon-arrow-down",
        detailShow: "none",
        loadnone: !1,
        scrollPostion: 0,
        promiseOpen: "icon-arrow-down",
        promiseClass: "promise-down",
        serviceWrapClass: "service-wrap-hide",
        shadeClass: "back-shade-hide",
        toTopDisplay: "none",
        buyNumTip: "",
        buyNumValue: 1,
        leftLimited: "1",
        rightLimited: "0",
        scrollTop: 0,
        wareComment: {},
        commentPercent: "",
        currentPromotionSize: 0,
        privoinceName: "",
        cityName: "",
        countryName: "",
        townName: "",
        privoinceId: "",
        cityId: "",
        countryId: "",
        townId: "",
        isBuy: !1,
        navigatorToThirdAddress: "navigatorToThirdAddress",
        buyDisabled: !1,
        buyLoading: !1,
        commentDisabled: !1,
        hasDetail: !0,
        returnpage: "",
        fromPageLevel: "",
        colorSelClass: "selected",
        sizeSelClass: "selected",
        specSelClass: "selected",
        selectedtap: "",
        jdPriceErr: " ",
        buyBtnText: "立即购买",
        detailFirstComplete: !1,
        wxParseItem: {
            scaleParentStyle: "",
            scaleBoxStyle: ""
        },
        isDegrade: !1,
        cartNum: 0,
        isCartNumShow: !1,
        lowestBuy: !1,
        lowestBuyNum: 1,
        noBuyInfoTxt: "该商品暂不支持在此购买，非常抱歉！",
        isNoBuyInfoHide: !0,
        hasChat: !1,
        miaoshaTime: {
            days: 0,
            hours: 0,
            minutes: 0,
            sec: 0
        },
        haveAuthorFloor: !1
    },
    onLoad: function(e) {
        if (e.scene) {
            var a = decodeURIComponent(e.scene).split("&");
            if (a[0] ? wx.setStorageSync("customerinfo", a[0]) : wx.removeStorageSync("customerinfo"), 
            a[1]) {
                var o = wx.getStorageSync("wxappStorageName"), s = wx.getStorageSync(o);
                s.unionid = a[1], wx.setStorageSync(o, s);
            }
            a[2] && (e.wareId = a[2]);
        }
        var i = this;
        if (r.set({
            urlParam: e,
            skuid: e.wareId,
            title: "商品详情",
            shopid: "",
            siteId: "WXAPP-JA2016-1",
            account: wx.getStorageSync("desPin") ? wx.getStorageSync("desPin") : "-"
        }), t.globalConfig && t.globalConfig.haveAuthorFloor && this.setData({
            haveAuthorFloor: t.globalConfig.haveAuthorFloor
        }), "" != e.extendUrl && null != e.extendUrl) {
            this.data.extendUrl = e.extendUrl, this.data.JingfenUnionid = e.JingfenUnionid, 
            this.data.JingfenType = e.JingfenType;
            var n = e.wareId ? e.wareId : "";
            i.pageLoadData(e, n);
        } else if ("" != e.spreadUrl && null != e.spreadUrl) {
            var d = require("../../utils/spreadFollow.js"), l = require("./option/productUnionJump");
            d.UnionGetUnpl({
                url: e.spreadUrl,
                successCb: function(a) {
                    var o = l.judgmentJump(t, a);
                    o && i.pageLoadData(e, o);
                },
                failCb: function() {
                    wx.switchTab({
                        url: "/pages/index/index"
                    });
                }
            });
        } else {
            var c = e.wareId ? e.wareId : "";
            i.pageLoadData(e, c);
        }
        if (t.globalConfig && t.globalConfig.needDocumentary) {
            var u = require("./option/product_documentary.js");
            (o = wx.getStorageSync("wxappStorageName") || "") && u.trackOrderFn(o, e.wareId, t);
        }
    },
    pageLoadData: function(e, a) {
        var r = this, s = this, i = s.getSelfCookie();
        o.request({
            url: t.globalRequestUrl + s.data.productDir + "/ware/view.json?wareId=" + a,
            selfCookie: i,
            success: s.toViewPage.bind(s),
            complete: function() {
                r.setData({
                    isShowContent: !0
                }), r.couponRequestSync(e);
            },
            fail: function(e) {
                s.setData({
                    jdPriceErr: "价格异常",
                    buyBtnText: "立即购买"
                }), o.reportErr("item view.json: " + e.errMsg);
            }
        }), wx.getSystemInfo({
            success: function(e) {
                s.setData({
                    screenHeight: e.windowHeight,
                    screenWidth: e.windowWidth
                });
            }
        }), this.assessImg(s.data.screenWidth, 10, 10, 4);
    },
    onShow: function() {
        r.pv();
        var e = this;
        this.setData({
            navigatorToThirdAddress: "navigatorToThirdAddress",
            buyLoading: !1,
            buyDisabled: !1,
            commentDisabled: !1
        }), wx.getStorage({
            key: "item_chooseaddress",
            success: function(a) {
                if (a && a.data.addressResult && a.data.addressResult.address && a.data.addressResult.address.length) {
                    for (var r = a.data.addressResult.address, s = 0, i = "", n = "getTowns", d = "", l = "", c = "", u = "", w = "", p = "", f = "", m = "", g = 0; g < r.length; g++) s += 1, 
                    0 == g ? (i = i + "provinceId=" + (w = r[g].regionId) + "&", d = r[g].title) : 1 == g ? (i = i + "cityId=" + (p = r[g].regionId) + "&", 
                    l = r[g].title) : 2 == g ? (i = i + "countryId=" + (f = r[g].regionId) + "&", c = r[g].title) : (i = i + "townId=" + (m = r[g].regionId) + "&", 
                    u = r[g].title);
                    4 == s && (n = "directStock"), e.setData({
                        privoinceName: d,
                        cityName: l,
                        countryName: c,
                        townName: u,
                        privoinceId: w,
                        cityId: p,
                        countryId: f,
                        townId: m
                    }), o.request({
                        url: t.globalRequestUrl + e.data.productDir + "/ware/thirdAddress.json?" + i + "action=" + n + "&wareId=" + e.data.wareId,
                        selfCookie: e.getSelfCookie(),
                        success: e.toThirdAddressPage.bind(e),
                        fail: function(e) {
                            o.reportErr("item thirdAddress.json: " + e.errMsg);
                        }
                    });
                }
                wx.removeStorage({
                    key: "item_chooseaddress",
                    fail: function(e) {}
                });
            },
            error: function(e) {
                wx.removeStorage({
                    key: "item_chooseaddress",
                    fail: function(e) {}
                });
            }
        }), wx.getStorage({
            key: "itemCartNum",
            success: function(a) {
                null != a.data && void 0 != a.data && ("number" == typeof a.data && a.data > 0 || "string" == typeof a.data && "99+" == a.data ? e.setData({
                    cartNum: a.data,
                    isCartNumShow: !0
                }) : e.setData({
                    cartNum: a.data,
                    isCartNumShow: !1
                }));
            }
        });
    },
    onUnload: function() {
        this.countDownTimer && clearInterval(this.countDownTimer);
    },
    couponRequestSync: function(e) {
        var a = this;
        o.request({
            url: t.globalRequestUrl + a.data.productDir + "/coupon/coupon.json?wareId=" + e.wareId,
            success: a.toViewCouponPage.bind(a),
            complete: a.assessRequestSync.bind(a, e),
            fail: function(e) {
                o.reportErr("item coupon.json: " + e.errMsg);
            }
        });
    },
    assessRequestSync: function(e) {
        var a = this;
        o.request({
            url: t.globalRequestUrl + a.data.productDir + "/ware/getDetailCommentList.json?wareId=" + e.wareId,
            success: a.toViewCommentPage.bind(a),
            complete: a.cartNumRequestSync,
            fail: function(e) {
                o.reportErr("item getDetailCommentList.json: " + e.errMsg);
            }
        });
    },
    cartNumRequestSync: function() {
        var e = this;
        o.request({
            url: t.globalRequestUrl + e.data.pDir + "/cart/cart.json?ttt=" + new Date().getTime(),
            success: e.toViewCartNum.bind(e),
            fail: function(e) {
                o.reportErr(encodeURIComponent("请求购物车数据失败，具体信息：") + e.errMsg);
            }
        });
    },
    toViewCartNum: function(e) {
        if (e.desPin && "" != e.desPin) {
            if (null != e.cart.Num || void 0 != e.cart.Num) {
                var a = e.cart.Num;
                a > 0 ? (a > 99 && (a = "99+"), wx.setStorageSync("itemCartNum", a), this.setData({
                    cartNum: a,
                    isCartNumShow: !0
                })) : 0 == a && (wx.setStorageSync("itemCartNum", a), this.setData({
                    cartNum: a,
                    isCartNumShow: !1
                }));
            }
        } else ;
    },
    bigPicPreview: function(e) {
        for (var a = this, t = [], o = 0; o < a.data.wareInfo.ware.images.length; o++) t.push(a.data.wareInfo.ware.images[o].kwxpath);
        this.unionClick("MProductdetail_Photo", "5", "", "../bigPic/bigPic?wareId=" + a.data.wareId, e), 
        wx.previewImage({
            current: e.currentTarget.dataset.src,
            urls: t
        });
    },
    onShareAppMessage: function() {
        var e = this, a = wx.getStorageSync("jd_guiderId");
        return a ? {
            title: e.data.wareInfo.ware.wname,
            desc: t.shareDesc,
            path: "/pages/product/product?wareId=" + e.data.wareId + "&guiderId=" + a
        } : this.data.extendUrl ? {
            title: e.data.wareInfo.ware.wname,
            desc: t.shareDesc,
            path: "/pages/product/product?wareId=" + e.data.wareId + "&spreadUrl=" + e.data.extendUrl,
            success: function(a) {
                e.data.JingfenUnionid && e.data.JingfenType && r.click({
                    eid: "WProductDetail_ShareSuccess",
                    elevel: "",
                    eparam: e.data.JingfenUnionid + "_" + e.data.JingfenType,
                    pname: "",
                    pparam: "",
                    target: "",
                    event: ""
                });
            }
        } : {
            title: e.data.wareInfo.ware.wname,
            desc: t.shareDesc,
            path: "/pages/product/product?wareId=" + e.data.wareId
        };
    },
    toViewPage: function(e) {
        var a = this;
        if (e) {
            if (e.ware && e.ware.servIconList) {
                if (e.ware.shortService && e.ware.serviceIconUrl && e.ware.service) {
                    var t = {
                        iconType: "right",
                        imageUrl: e.ware.serviceIconUrl,
                        show: !0,
                        text: e.ware.shortService,
                        tip: e.ware.service
                    };
                    e.ware.servIconList.unshift(t);
                }
                e.ware.servIconList = a.operateIconList(e.ware.servIconList);
            }
            a.setData({
                wareInfo: e,
                jdPriceErr: "价格异常"
            });
        }
        if (e && e.ware && (e.ware.miaosha ? a.countDown() : a.countDownTimer && clearInterval(a.countDownTimer), 
        a.setData({
            wareId: e.ware.wareId
        })), e && e.ware && e.ware.skuColorSizeHandler && (this.operaColor(e.ware.skuColorSizeHandler), 
        a.setData({
            skuColorSize: e.ware.skuColorSizeHandler.skuColorSize.colorSize,
            currentColorSize: e.ware.skuColorSizeHandler.currentColorSize
        })), e && e.proInformation) {
            var o = 0, r = 0;
            if (e.proInformation.giftList && e.proInformation.giftList.length > 0 && (o = e.proInformation.giftList.length), 
            e.proInformation.activityList && e.proInformation.activityList.length > 0) for (var s = 0; s < e.proInformation.activityList.length; s++) e.proInformation.activityList[s] && e.proInformation.activityList[s].text && r++;
            a.setData({
                currentPromotionSize: o + r
            });
        }
        if (e && e.ware && e.ware.lowestBuy && e.ware.lowestBuyNum && this.setData({
            lowestBuy: e.ware.lowestBuy,
            lowestBuyNum: e.ware.lowestBuyNum,
            buyNumValue: e.ware.lowestBuyNum
        }), e && e.ware.shopInfo && e.ware.shopInfo.customerService) {
            var i = e.ware.shopInfo.customerService;
            a.setData({
                hasChat: i.hasChat
            });
        }
        a.getBuyStatus();
    },
    formatSeconds: function(e) {
        var a = Math.floor(e / 86400), t = Math.floor(e % 86400 / 3600), o = Math.floor(e % 86400 % 3600 / 60), r = e % 86400 % 3600 % 60;
        return {
            days: a,
            hours: t < 10 ? "0" + t : t,
            minutes: o < 10 ? "0" + o : o,
            sec: r < 10 ? "0" + r : r
        };
    },
    countDown: function() {
        var e = this, a = e.data.wareInfo.ware.miaoshaRemainTime, t = e.formatSeconds(a);
        e.setData({
            miaoshaTime: t
        }), e.countDownTimer && clearInterval(e.countDownTimer), e.countDownTimer = setInterval(function() {
            var t = e.formatSeconds(a);
            0 == t.days && 0 == t.hours && 0 == t.minutes && 0 == t.sec ? clearInterval(e.countDownTimer) : a--, 
            e.setData({
                miaoshaTime: t
            });
        }, 1e3);
    },
    toViewCouponPage: function(e) {
        if (e.coupon) {
            var a = JSON.parse(e.coupon);
            this.setData({
                couponList: a
            });
        }
    },
    couponOpenFn: function(e) {
        "coupon-down" == this.data.couponClass ? this.setData({
            couponClass: "coupon-up",
            couponOpen: "icon-arrow-up"
        }) : "coupon-up" == this.data.couponClass && this.setData({
            couponClass: "coupon-down",
            couponOpen: "icon-arrow-down"
        }), this.unionClick("WProductDetail_CouponUnfold", "", "", "", e);
    },
    checkIsLogin: function(e) {
        var a = e.returnUrl, r = void 0 === a ? "" : a, s = e.success, i = void 0 === s ? function() {} : s, n = e.fail, d = void 0 === n ? function() {} : n, l = this, c = wx.getStorageSync("activityUrl");
        o.request({
            url: t.globalRequestUrl + l.data.productDir + "/wxdetail/isLogin.json?fromType=wxapp",
            selfCookie: l.getSelfCookie(),
            success: function(e) {
                if ("999" == e.code) {
                    var a = r;
                    return l.setData({
                        returnpage: a,
                        fromPageLevel: c ? 0 : 1
                    }), l.loginModalShow(), !1;
                }
                i();
            },
            fail: function(e) {
                o.reportErr("item isLogin.json fail: " + e.errMsg), d();
            }
        });
    },
    tapCoupon: function(e) {
        var a = this;
        this.unionClick("WProductDetail_GetCoupon", "", e.currentTarget.dataset.roleid, "", e), 
        this.data.couponList[e.currentTarget.dataset.idx].applicability && (this.data.extendUrl ? this.checkIsLogin({
            returnUrl: "/pages/product/product?wareId=" + a.data.wareId + "&extendUrl=" + a.data.extendUrl,
            success: a.receiveCoupon.bind(a, e)
        }) : this.checkIsLogin({
            returnUrl: "/pages/product/product?wareId=" + a.data.wareId,
            success: a.receiveCoupon.bind(a, e)
        }));
    },
    receiveCoupon: function(e) {
        var r = this, s = e.detail.formId, n = t.globalRequestUrl + this.data.productDir + "/coupon/getActiveCoupon.json?sku=" + this.data.wareId + "&discount=" + e.currentTarget.dataset.discount + "&encryptedKey=" + e.currentTarget.dataset.encryptedkey + "&roleId=" + e.currentTarget.dataset.roleid + "&isPop=" + r.data.wareInfo.ware.isPop;
        this.setData({
            seledCouponIndex: e.currentTarget.dataset.idx,
            couponTitle: e.currentTarget.dataset.name,
            couponRequestUrl: n,
            errorMsg: ""
        }), this.data.wareInfo.ware.isPop ? this.couponRequest(this.data.couponRequestUrl, s) : o.request({
            url: t.globalRequestUrl + r.data.productDir + "/coupon/couponDetail.json",
            data: {
                wareId: r.data.wareId,
                isPop: r.data.wareInfo.ware.isPop
            },
            success: function(e) {
                i.messagePush({
                    formId: s,
                    times: 1,
                    type: 20001
                }), r.setData({
                    couponPopupsShow: "block",
                    codeKey: e.codeKey,
                    vcodeUrl: t.globalRequestUrl + r.data.productDir + "/authCode/authCodePinImg.action?key=" + e.codeKey
                });
            },
            fail: function(e) {
                a.default.show({
                    icon: a.default.icon.error,
                    message: "领取失败，看看别的优惠券吧",
                    pageObj: r
                }), o.reportErr("item couponDetail.json: " + e.errMsg);
            }
        });
    },
    couponRequest: function(e, t) {
        var r = this;
        o.request({
            url: e,
            success: function(e) {
                t && i.messagePush({
                    formId: t,
                    times: 1,
                    type: 20001
                }), e && e.couponResult ? (r.data.couponList[r.data.seledCouponIndex].applicability = !1, 
                r.setData({
                    couponList: r.data.couponList,
                    couponPopupsShow: "none",
                    errorMsg: ""
                }), a.default.show({
                    icon: a.default.icon.success,
                    message: "领取成功\n            5~10分钟到账",
                    pageObj: r
                })) : (r.resetVcode(), e && e.volidateMsg ? e.msg && r.setData({
                    errorMsg: e.msg
                }) : (r.setData({
                    errorMsg: ""
                }), e && e.msg && a.default.show({
                    icon: a.default.icon.error,
                    message: e.msg,
                    pageObj: r
                })));
            },
            fail: function(e) {
                r.setData({
                    couponPopupsShow: "none"
                }), a.default.show({
                    icon: a.default.icon.error,
                    message: "领取失败，看看别的优惠券吧",
                    pageObj: r
                }), o.reportErr("item getActiveCoupon.json: " + e.errMsg);
            }
        });
    },
    resetVcode: function() {
        var a = this;
        o.request({
            url: t.globalRequestUrl + a.data.productDir + "/authCode/createCodeWithPinKey.json?args=115",
            success: function(e) {
                a.setData({
                    codeKey: e.codeKey,
                    vcodeUrl: t.globalRequestUrl + a.data.productDir + "/authCode/authCodePinImg.action?key=" + e.codeKey + "&rand=" + a.getRandomNum(1, 1e6)
                });
            },
            fail: function() {
                o.reportErr("item createCodeWithPinKey.json: " + e.errMsg);
            }
        });
    },
    getVcodeInput: function(e) {
        this.setData({
            inputVcode: e.detail.value.replace(/\s/g, "")
        });
    },
    couponCancel: function() {
        this.setData({
            couponPopupsShow: "none"
        });
    },
    couponConfirm: function() {
        var e = this;
        setTimeout(function() {
            var a = e.data.couponRequestUrl + "&codeKey=" + e.data.codeKey + "&validateCode=" + e.data.inputVcode;
            e.couponRequest(a);
        }, 200);
    },
    getRandomNum: function(e, a) {
        var t = a - e, o = Math.random();
        return e + Math.round(o * t);
    },
    slideChangeFn: function(e) {
        this.unionClick("MProductdetail_SlideFocusPic", "", "", "", e);
    },
    operaColor: function(e) {
        for (var a = e.colorSet, t = e.sizeSet, o = e.specSet, r = [], s = [], i = [], n = 0; n < a.length; n++) {
            var d = new Object();
            d.colorName = a[n], d.colorClass = "", d.colorTap = "changeWareInfo", r.push(d);
        }
        for (n = 0; n < t.length; n++) {
            var l = new Object();
            l.colorName = t[n], l.colorClass = "", l.colorTap = "changeWareInfo", s.push(l);
        }
        for (n = 0; n < o.length; n++) {
            var c = new Object();
            c.colorName = o[n], c.colorClass = "", c.colorTap = "changeWareInfo", i.push(c);
        }
        var u = this.data.wareInfo;
        u.ware.skuColorSizeHandler.colorSet = r, u.ware.skuColorSizeHandler.sizeSet = s, 
        u.ware.skuColorSizeHandler.specSet = i, this.setData({
            wareInfo: u
        });
    },
    buyNumBlurFn: function(e) {
        this.setData({
            buyNumTip: "",
            buyNumValue: e.detail.value
        }), this.MinCheckFn(), this.MaxCheckFn(), this.buyNumTipBlurFn();
    },
    buyNumTipBlurFn: function() {
        var e = this, a = e.data.buyNumValue.toString().replace(/^0+/, ""), t = parseInt(e.data.lowestBuyNum);
        a = parseInt(a), isNaN(a) ? e.data.lowestBuy && t > 1 ? e.setData({
            buyNumTip: "(" + t + "件起购)",
            buyNumValue: t,
            leftLimited: "1"
        }) : e.setData({
            buyNumTip: "(最少1件)",
            buyNumValue: 1,
            leftLimited: "1"
        }) : a >= 200 ? e.setData({
            buyNumTip: "(限购200件)",
            buyNumValue: 200,
            rightLimited: "1"
        }) : e.data.lowestBuy && t > 1 && a <= t ? e.setData({
            buyNumTip: "(" + t + "件起购)",
            buyNumValue: t,
            leftLimited: "1"
        }) : a <= 1 ? e.setData({
            buyNumTip: "(最少1件)",
            buyNumValue: 1,
            leftLimited: "1"
        }) : e.setData({
            buyNumTip: "",
            buyNumValue: a,
            leftLimited: "0",
            rightLimited: "0"
        });
    },
    MinCheckFn: function() {
        var e = parseInt(this.data.buyNumValue), a = parseInt(this.data.lowestBuyNum);
        this.data.lowestBuy && a > 1 ? e <= a ? this.setData({
            leftLimited: "1"
        }) : this.setData({
            leftLimited: "0"
        }) : e <= 1 ? this.setData({
            leftLimited: "1"
        }) : this.setData({
            leftLimited: "0"
        });
    },
    MaxCheckFn: function() {
        var e = this;
        parseInt(this.data.buyNumValue) >= 200 ? e.setData({
            rightLimited: "1"
        }) : e.setData({
            rightLimited: "0"
        });
    },
    addNumFn: function(e) {
        var a = this, t = parseInt(a.data.buyNumValue) + 1;
        t > 200 && (t = 200), a.setData({
            buyNumValue: t
        }), this.unionClick("MProductdetail_NumAdd", "", "", "", e), a.MinCheckFn(), a.MaxCheckFn(), 
        a.buyNumTipBlurFn();
    },
    minusNumFn: function(e) {
        var a = this, t = parseInt(a.data.buyNumValue) - 1, o = parseInt(this.data.lowestBuyNum);
        this.data.lowestBuy && o > 1 ? t <= o && (t = o) : t <= 0 && (t = 1), a.setData({
            buyNumValue: t
        }), this.unionClick("MProductdetail_NumSub", "", "", "", e), a.MinCheckFn(), a.MaxCheckFn(), 
        a.buyNumTipBlurFn();
    },
    promotionOpenFn: function(e) {
        var a = this;
        "promotion-down" == this.data.promotionClass ? (a.setData({
            promotionClass: "promotion-up",
            promotionOpen: "icon-arrow-up"
        }), a.unionClick("MProductdetail_Saleinfo", "5", "open", "", e)) : "promotion-up" == this.data.promotionClass && (a.setData({
            promotionClass: "promotion-down",
            promotionOpen: "icon-arrow-down"
        }), a.unionClick("MProductdetail_Saleinfo", "5", "close", "", e));
    },
    promiseOpenFn: function(e) {
        if ("service-wrap-hide" != this.data.serviceWrapClass || "back-shade-show" != this.data.shadeClass) {
            var a = this;
            "service-wrap-hide" == this.data.serviceWrapClass ? a.setData({
                serviceWrapClass: "service-wrap-show",
                promiseOpen: "icon-arrow-up",
                shadeClass: "back-shade-show"
            }) : "service-wrap-show" == this.data.serviceWrapClass && (a.setData({
                serviceWrapClass: "service-wrap-hide",
                promiseOpen: "icon-arrow-down"
            }), setTimeout(function() {
                a.setData({
                    shadeClass: "back-shade-hide"
                });
            }, 600)), this.unionClick("MProductdetail_ServiceInfo", "5", "", "", e);
        }
    },
    operateIconList: function(e) {
        if (!e.length) return e;
        for (var a = [], t = [], o = 0; o < e.length; o++) {
            var r = e[o];
            r.iconType && "right" == r.iconType ? a.push(r) : t.push(r);
        }
        return a.concat(t);
    },
    assessImg: function(e, a, t, o) {
        var r = (e - 2 * a - 3 * t) / o;
        this.setData({
            assessImgWidth: r,
            assessImgHeight: r
        });
    },
    cusImageLoad: function(e) {
        var a = this, t = e.currentTarget.dataset.index, o = a.data.detailImgUrls.length;
        a.autoHeight(a.data.screenWidth, e.detail.height, e.detail.width, t), a.data.detailImgIndex++, 
        a.data.detailImgIndex == o - 1 && a.setData({
            detailImgIndex: 0
        });
    },
    autoHeight: function(e, a, t, o) {
        for (var r = this, s = r.data.detailImgUrls, i = 0; i < s.length; i++) i == o && (r.data.imgHeight[i] = parseInt(e * a / t), 
        s[i].imgHeight = r.data.imgHeight[i]);
        s[o].display = t < 1 * e / 3 ? "none" : "block", r.setData({
            detailImgUrls: s
        });
    },
    onPullDownRefresh: function() {
        var e = this, a = "", r = e.data.wareId;
        e.data.wareInfo && e.data.wareInfo.defaultAddress && (a = "&provinceId=" + e.data.wareInfo.defaultAddress.provinceId + "&cityId=" + e.data.wareInfo.defaultAddress.cityId + "&countryId=" + e.data.wareInfo.defaultAddress.countyId + "&townId=" + e.data.wareInfo.defaultAddress.townId), 
        o.request({
            url: t.globalRequestUrl + e.data.productDir + "/ware/view.json?wareId=" + r + a,
            selfCookie: e.getSelfCookie(),
            success: e.toViewPage.bind(e),
            fail: function(e) {
                o.reportErr("item changeWareInfo view.json: " + e.errMsg);
            }
        }), o.request({
            url: t.globalRequestUrl + e.data.productDir + "/ware/getDetailCommentList.json?wareId=" + r,
            selfCookie: e.getSelfCookie(),
            success: e.toViewCommentPage.bind(e),
            fail: function(e) {
                o.reportErr("item changeWareInfo getDetailCommentList.json: " + e.errMsg);
            },
            complete: function() {
                wx.stopPullDownRefresh();
            }
        });
    },
    onReachBottom: function(e) {
        var a = this;
        if ("icon-arrow-down" == a.data.detailOpen) {
            if (!a.data.wareId) return;
            a.data.detailFirstComplete ? a.setData({
                detailOpen: "icon-arrow-up",
                detailShow: "block"
            }) : o.request({
                url: t.globalRequestUrl + a.data.productDir + "/wxdetail/detail.json?wareId=" + a.data.wareId,
                success: a.toDetailPage.bind(a),
                fail: function(e) {
                    o.reportErr("item detail.json: " + e.errMsg);
                }
            }), a.setData({
                detailFirstComplete: !0
            }), this.unionClick("MProductdetail_ProductdetailEntrance", "5", "", "", e);
        }
    },
    toDetailPage: function(e) {
        var a = this;
        if (a.setData({
            loadnone: !0
        }), (e.popWareDetailWebView || !this.data.isDegrade && !wx.createSelectorQuery) && this.setData({
            isDegrade: !0
        }), this.data.isDegrade) e && e.imgList && e.imgList.length > 0 ? a.setData({
            detailImgUrls: e.imgList,
            detailOpen: "icon-arrow-up",
            detailShow: "block"
        }) : a.setData({
            hasDetail: !1,
            detailOpen: "icon-arrow-up",
            detailShow: "block"
        }); else if (e && e.isbook && e.bookAttr) {
            for (var t = "", o = JSON.parse(e.bookAttr), r = 0; r < o.length; r++) t += "<p>【" + o[r].label + "】</p>" + o[r].value;
            a.WxParseInit("detailHtml", t, a);
        } else if (e && e.wdis) {
            t = e.wdis;
            a.WxParseInit("detailHtml", t, a);
        } else a.setData({
            hasDetail: !1,
            detailOpen: "icon-arrow-up",
            detailShow: "block"
        });
    },
    WxParseInit: function(e, a, t) {
        t.setData({
            detailOpen: "icon-arrow-up",
            detailShow: "block",
            wxParseItem: {
                scaleParentStyle: "",
                scaleBoxStyle: ""
            },
            wxParseData: []
        }), s.wxParse(e, "html", a, t, 5, !0);
    },
    onPageScroll: function(e) {
        this.data.scrollPostion = e.scrollTop, e.scrollTop > this.data.screenHeight ? this.setData({
            toTopDisplay: "block"
        }) : this.setData({
            toTopDisplay: "none"
        });
    },
    toTopTap: function(e) {
        wx.pageScrollTo({
            scrollTop: .001 * Math.random(),
            duration: 300
        }), this.setData({
            toTopDisplay: "none",
            scrollTop: .001 * Math.random()
        }), this.unionClick("MProductdetail_BackToTop", "5", "", "", e);
    },
    changeWareInfo: function(e) {
        var a = this, r = e.target.dataset.colorname, s = e.target.dataset.colortype, i = a.data.skuColorSize, n = "", d = "", l = "", c = 0;
        a.setData({
            colorSelClass: "selected",
            sizeSelClass: "selected",
            specSelClass: "selected"
        }), a.data.wareInfo && a.data.wareInfo.ware && a.data.wareInfo.ware.skuColorSizeHandler && (a.data.wareInfo.ware.skuColorSizeHandler.currentColorSize && (n = a.data.wareInfo.ware.skuColorSizeHandler.currentColorSize.color, 
        d = a.data.wareInfo.ware.skuColorSizeHandler.currentColorSize.size, l = a.data.wareInfo.ware.skuColorSizeHandler.currentColorSize.spec), 
        a.data.wareInfo.ware.skuColorSizeHandler.colorSet && a.data.wareInfo.ware.skuColorSizeHandler.colorSet.length > 0 && (y = a.data.wareInfo.ware.skuColorSizeHandler.colorSet, 
        c += 1), a.data.wareInfo.ware.skuColorSizeHandler.sizeSet && a.data.wareInfo.ware.skuColorSizeHandler.sizeSet.length > 0 && (S = a.data.wareInfo.ware.skuColorSizeHandler.sizeSet, 
        c += 1), a.data.wareInfo.ware.skuColorSizeHandler.specSet && a.data.wareInfo.ware.skuColorSizeHandler.specSet.length > 0 && (v = a.data.wareInfo.ware.skuColorSizeHandler.specSet, 
        c += 1));
        for (var u = "", w = 0; w < i.length; w++) {
            if ("color" == s && i[w].color == r) {
                if (3 == c && d && l && i[w].size == d && i[w].spec == l) {
                    u = i[w].skuId;
                    break;
                }
                if (2 == c && d && i[w].size == d) {
                    u = i[w].skuId;
                    break;
                }
                if (2 == c && l && i[w].spec == l) {
                    u = i[w].skuId;
                    break;
                }
                if (!d && !l) {
                    u = i[w].skuId;
                    break;
                }
            }
            if ("size" == s && i[w].size == r) {
                if (3 == c && n && l && i[w].color == n && i[w].spec == l) {
                    u = i[w].skuId;
                    break;
                }
                if (2 == c && n && i[w].color == n) {
                    u = i[w].skuId;
                    break;
                }
                if (2 == c && l && i[w].spec == l) {
                    u = i[w].skuId;
                    break;
                }
                if (!n && !l) {
                    u = i[w].skuId;
                    break;
                }
            }
            if ("spec" == s && i[w].spec == r) {
                if (3 == c && d && n && i[w].size == d && i[w].color == n) {
                    u = i[w].skuId;
                    break;
                }
                if (2 == c && d && i[w].size == d) {
                    u = i[w].skuId;
                    break;
                }
                if (2 == c && n && i[w].color == n) {
                    u = i[w].skuId;
                    break;
                }
                if (!n && !d) {
                    u = i[w].skuId;
                    break;
                }
            }
        }
        if ("" != u) {
            a.data.wareId = u;
            var p = "";
            a.data.wareInfo && a.data.wareInfo.defaultAddress && (p = "&provinceId=" + a.data.wareInfo.defaultAddress.provinceId + "&cityId=" + a.data.wareInfo.defaultAddress.cityId + "&countryId=" + a.data.wareInfo.defaultAddress.countyId + "&townId=" + a.data.wareInfo.defaultAddress.townId), 
            o.request({
                url: t.globalRequestUrl + a.data.productDir + "/ware/view.json?wareId=" + u + p,
                selfCookie: a.getSelfCookie(),
                success: a.toViewPage.bind(a),
                fail: function(e) {
                    o.reportErr("item changeWareInfo view.json: " + e.errMsg);
                }
            }), o.request({
                url: t.globalRequestUrl + a.data.productDir + "/ware/getDetailCommentList.json?wareId=" + u,
                selfCookie: a.getSelfCookie(),
                success: a.toViewCommentPage.bind(a),
                fail: function(e) {
                    o.reportErr("item changeWareInfo getDetailCommentList.json: " + e.errMsg);
                }
            }), a.setData({
                detailOpen: "icon-arrow-down",
                detailShow: "none",
                detailImgUrls: [],
                hasDetail: !0,
                loadnone: !1
            });
        } else {
            for (var f = a.data.wareInfo, m = new Map(), g = new Map(), h = new Map(), c = -1, I = -1, C = -1, w = 0; w < i.length; w++) "color" == s && (a.data.wareInfo.ware.skuColorSizeHandler.currentColorSize.color = r, 
            i[w].color == r && g.set(i[w].size, i[w].size), i[w].color == r && h.set(i[w].spec, i[w].spec)), 
            "size" == s && (a.data.wareInfo.ware.skuColorSizeHandler.currentColorSize.size = r, 
            i[w].size == r && m.set(i[w].color, i[w].color), i[w].size == r && h.set(i[w].spec, i[w].spec)), 
            "spec" == s && (a.data.wareInfo.ware.skuColorSizeHandler.currentColorSize.spec = r, 
            i[w].spec == r && g.set(i[w].size, i[w].size), i[w].spec == r && m.set(i[w].color, i[w].color));
            for (var y = a.data.wareInfo.ware.skuColorSizeHandler.colorSet, S = a.data.wareInfo.ware.skuColorSizeHandler.sizeSet, v = a.data.wareInfo.ware.skuColorSizeHandler.specSet, w = 0; w < y.length; w++) {
                var D = y[w];
                "color" == s ? (y[w].colorClass = "", y[w].colorTap = "changeWareInfo", y[w].selectedtap = "", 
                a.data.wareInfo.ware.skuColorSizeHandler.currentColorSize.color != D.colorName && a.data.wareInfo.ware.skuColorSizeHandler.currentColorSize.spec != D.colorName && a.data.wareInfo.ware.skuColorSizeHandler.currentColorSize.size != D.colorName || (c = w)) : m.get(D.colorName) && m.get(D.colorName) == D.colorName ? (m.get(D.colorName) == a.data.wareInfo.ware.skuColorSizeHandler.currentColorSize.color && (c = w), 
                y[w].colorClass = "", y[w].colorTap = "changeWareInfo", a.data.wareInfo.ware.skuColorSizeHandler.currentColorSize.color == D.colorName ? (y[w].selectedtap = "", 
                y[w].colorClass = "no-goods") : y[w].selectedtap = "") : (a.setData({
                    colorSelClass: ""
                }), y[w].colorClass = "no-goods", y[w].colorTap = "", y[w].selectedtap = "");
            }
            for (w = 0; w < S.length; w++) {
                var k = S[w];
                "size" == s ? (S[w].colorClass = "", S[w].colorTap = "changeWareInfo", S[w].selectedtap = "", 
                a.data.wareInfo.ware.skuColorSizeHandler.currentColorSize.color != k.colorName && a.data.wareInfo.ware.skuColorSizeHandler.currentColorSize.spec != k.colorName && a.data.wareInfo.ware.skuColorSizeHandler.currentColorSize.size != k.colorName || (I = w)) : g.get(k.colorName) && g.get(k.colorName) == k.colorName ? (g.get(k.colorName) == a.data.wareInfo.ware.skuColorSizeHandler.currentColorSize.size && (I = w), 
                S[w].colorClass = "", S[w].colorTap = "changeWareInfo", a.data.wareInfo.ware.skuColorSizeHandler.currentColorSize.size == k.colorName ? (S[w].selectedtap = "", 
                S[w].colorClass = "no-goods") : S[w].selectedtap = "") : (a.setData({
                    sizeSelClass: ""
                }), S[w].colorClass = "no-goods", S[w].colorTap = "", S[w].selectedtap = "");
            }
            for (w = 0; w < v.length; w++) {
                var b = v[w];
                "spec" == s ? (v[w].colorClass = "", v[w].colorTap = "changeWareInfo", v[w].selectedtap = "", 
                a.data.wareInfo.ware.skuColorSizeHandler.currentColorSize.size != b.colorName && a.data.wareInfo.ware.skuColorSizeHandler.currentColorSize.color != b.colorName && a.data.wareInfo.ware.skuColorSizeHandler.currentColorSize.spec != b.colorName || (C = w)) : h.get(b.colorName) && h.get(b.colorName) == b.colorName ? (h.get(v.colorName) == a.data.wareInfo.ware.skuColorSizeHandler.currentColorSize.spec && (C = w), 
                v[w].colorClass = "", v[w].colorTap = "changeWareInfo", a.data.wareInfo.ware.skuColorSizeHandler.currentColorSize.spec == b.colorName ? (v[w].selectedtap = "", 
                v[w].colorClass = "no-goods") : v[w].selectedtap = "") : (a.setData({
                    specSelClass: ""
                }), v[w].colorClass = "no-goods", v[w].colorTap = "", v[w].selectedtap = "");
            }
            -1 != c && (y[c].colorClass = "no-goods", y[c].selectedtap = ""), -1 != I && (S[I].colorClass = "no-goods", 
            S[I].selectedtap = ""), -1 != C && (v[C].colorClass = "no-goods", v[C].selectedtap = ""), 
            a.data.wareInfo.ware.skuColorSizeHandler.colorSet = y, a.data.wareInfo.ware.skuColorSizeHandler.sizeSet = S, 
            a.data.wareInfo.ware.skuColorSizeHandler.specSet = v, a.setData({
                wareInfo: f,
                isBuy: !1,
                isNoBuyInfoHide: !1
            });
        }
        a.setData({
            detailFirstComplete: !1
        });
    },
    navigatorToComment: function(e) {
        var a = this;
        a.data.commentDisabled || (a.setData({
            commentDisabled: !0
        }), null != e && null != e.currentTarget && null != e.currentTarget.dataset && 1 == e.currentTarget.dataset.commenttype ? (a.unionClick("MProductdetail_ProductShowEntrance", "5", "", "../assess/assess?wareId=" + a.data.wareInfo.ware.wareId + "&type=4", e), 
        wx.navigateTo({
            url: "../assess/assess?wareId=" + a.data.wareInfo.ware.wareId + "&type=4"
        })) : (a.unionClick("MProductdetail_ProductCommentEntrance", "5", "", "../assess/assess?wareId=" + a.data.wareInfo.ware.wareId + "&type=0", e), 
        wx.navigateTo({
            url: "../assess/assess?wareId=" + a.data.wareInfo.ware.wareId + "&type=0"
        })));
    },
    toViewCommentPage: function(e) {
        var a = this;
        if (a.setData({
            wareComment: e
        }), null != a.data.wareComment && null != a.data.wareComment.wareDetailComment && null != a.data.wareComment.wareDetailComment) {
            var t = parseInt(a.data.wareComment.wareDetailComment.goodCnt) / parseInt(a.data.wareComment.wareDetailComment.allCnt) * 100;
            isNaN(t) || (t = 100 == t ? "100%" : ("" + t).substring(0, 2) + "%", a.setData({
                commentPercent: t
            }));
        }
    },
    toThirdAddressPage: function(e) {
        var a = this;
        if (e) {
            var t = a.data.wareInfo, o = t.isBuy;
            if (e.stock) {
                t.stock.status = e.stock.status;
                var r = e.stock.jdPrice;
                if (r) {
                    var s = r.split(".");
                    s && s.length > 1 && (t.jdPriceIntegerPart = s[0], t.jdPriceFractionPart = s[1]);
                }
                e.stock.iconList && e.stock.iconList.length > 0 && (t.ware.iconList = e.stock.iconList), 
                e.stock.servIconList && e.stock.servIconList.length > 0 && (t.ware.servIconList = a.operateIconList(e.stock.servIconList)), 
                e.ware && (t.ware.weightInfo = e.ware.weightInfo), t.stock.flag = e.stock.flag, 
                o = e.stock.flag;
            }
            if (e.proInformation && (t.proInformation = e.proInformation), t.defaultAddress) t.defaultAddress.provinceName = a.data.privoinceName, 
            t.defaultAddress.cityName = a.data.cityName, t.defaultAddress.countyName = a.data.countryName, 
            t.defaultAddress.townName = a.data.townName, t.defaultAddress.provinceId = a.data.privoinceId, 
            t.defaultAddress.cityId = a.data.cityId, t.defaultAddress.countyId = a.data.countryId, 
            t.defaultAddress.townId = a.data.townId; else {
                var i = new Object();
                i.provinceName = a.data.privoinceName, i.cityName = a.data.cityName, i.countyName = a.data.countryName, 
                i.townName = a.data.townName, i.provinceId = a.data.privoinceId, i.cityId = a.data.cityId, 
                i.countyId = a.data.countryId, i.townId = a.data.townId, t.defaultAddress = i;
            }
            wx.setStorageSync("regionAddress", a.data.privoinceId + "%2C" + a.data.cityId + "%2C" + a.data.countryId + "%2C" + a.data.townId), 
            a.data.wareInfo.ware.cartFlag = o, a.setData({
                wareInfo: t,
                isBuy: o
            }), a.getBuyStatus();
        }
    },
    getBuyStatus: function() {
        var e = this, a = e.data.wareInfo;
        null != a && null != a.ware ? "1" == a.ware.type || a.ware.isBuyCode || "1" == a.ware.isXnzt && a.isXnztEnable || a.ware.isJdOtc || a.ware.isOP || a.ware.isSam || a.ware.isOilCard || a.ware.isCustomize || a.ware.isGameCharge || null != a.yuYue && 1 == a.yuYue.isYuYue || null != a.ware.presaleWareInfo || null != a.feeType || !a.ware.cartFlag || !a.stock.flag || null != a.ware.locInfo && a.ware.locInfo.isloc ? e.setData({
            isBuy: !1
        }) : e.setData({
            isBuy: !0
        }) : e.setData({
            isBuy: !1
        }), this.data.isBuy ? e.setData({
            buyDisabled: !1
        }) : e.setData({
            buyDisabled: !0
        }), null == a || null == a.ware || a.stock.flag ? e.data.isBuy || e.setData({
            buyBtnText: "暂不支持购买"
        }) : e.setData({
            buyBtnText: "暂时无货"
        }), a.ware.cartFlag && a.stock.flag || e.setData({
            noBuyInfoTxt: "所选的地区暂时无货，非常抱歉！"
        }), e.setData({
            isNoBuyInfoHide: e.data.isBuy
        });
    },
    navigatorToThirdAddress: function(e) {
        this.unionClick("MProductdetail_Address", "5", "", "../chooseaddress/chooseaddress?from=item", e), 
        this.setData({
            navigatorToThirdAddress: ""
        }), wx.navigateTo({
            url: "../chooseaddress/chooseaddress?from=item"
        });
    },
    goToBuy: function(e) {
        try {
            var a = this, t = e.detail.formId;
            if (!a.data.buyDisabled && (a.setData({
                buyLoading: !0,
                buyDisabled: !0
            }), null != a.data.wareInfo && null != a.data.wareInfo.ware && a.data.wareInfo.ware.wareId > 0)) {
                var r = a.data.wareInfo.ware.wareId, s = a.data.buyNumValue;
                this.addCartMPing("MProductdetail_Easybuy", r, s), this.checkIsLogin({
                    returnUrl: "/pages/pay/pay?wareId=" + a.data.wareInfo.ware.wareId + "&wareNum=" + a.data.buyNumValue + "&enterOrder=true",
                    success: function() {
                        i.messagePush({
                            formId: t,
                            times: 1,
                            type: 10002
                        }), wx.navigateTo({
                            url: "../pay/pay?wareId=" + a.data.wareInfo.ware.wareId + "&wareNum=" + a.data.buyNumValue
                        });
                    },
                    fail: function() {
                        wx.navigateTo({
                            url: "../pay/pay?wareId=" + a.data.wareInfo.ware.wareId + "&wareNum=" + a.data.buyNumValue
                        });
                    }
                });
            }
        } catch (e) {
            o.reportErr("item gotobuy function error: " + e.errMsg);
        }
    },
    loginModalShow: function() {
        o.globalLoginShow(this);
    },
    unionClick: function(e, a, t, o, s) {
        r.click({
            eid: e,
            elevel: a,
            eparam: t,
            pname: "",
            pparam: "",
            target: o,
            event: s
        });
    },
    addCartMPing: function(e, a, t) {
        try {
            var s = '{"' + a + '":"' + t + '"}', i = {
                eid: e,
                elevel: "5",
                eparam: a,
                pname: "",
                pparam: "",
                shoppingList: JSON.parse(s)
            };
            r.addToCart(i);
        } catch (e) {
            o.reportErr("item addCartMPing function error: " + e.errMsg);
        }
    },
    goToCart: function(e) {
        this.unionClick("WProductDetail_CartIcon", "", "", "../cart/cart", e), wx.getStorageSync("activityUrl") ? wx.redirectTo({
            url: "../cart/cart"
        }) : wx.switchTab({
            url: "../cart/cart"
        });
    },
    goToChat: function(e) {
        var a = this, t = getCurrentPages(), o = "pid=" + a.data.wareId + "&entry=pop_m_xqx_item&venderId=" + a.data.wareInfo.ware.venderId;
        this.checkIsLogin({
            returnUrl: "/pages/chat/chat?" + o,
            success: function() {
                t.length > 4 ? wx.redirectTo({
                    url: "../chat/chat?" + o
                }) : wx.navigateTo({
                    url: "../chat/chat?" + o
                });
            },
            fail: function() {
                t.length > 4 ? wx.redirectTo({
                    url: "../chat/chat?" + o
                }) : wx.navigateTo({
                    url: "../chat/chat?" + o
                });
            }
        });
    },
    addCartFn: function(e) {
        var r = this, s = e.detail.formId, n = this.data.wareInfo.ware.wareId, d = this.data.buyNumValue, l = wx.getStorageSync("sid"), c = wx.getStorageSync("USER_FLAG_CHECK");
        this.addCartMPing("WProductDetail_AddToCart", n, d), this.data.isBuy && o.request({
            url: t.globalRequestUrl + r.data.pDir + "/cart/add.json?wareId=" + n + "&num=" + d + "&sid=" + l + "&USER_FLAG_CHECK=" + c,
            success: function(e) {
                i.messagePush({
                    formId: s,
                    times: 1,
                    type: 10001
                });
                var t = 0, o = "", n = {};
                if (e && e.cartJson) {
                    if (e.cartJson.Num) {
                        var d = e.cartJson.Num;
                        d > 0 && (d > 99 && (d = "99+"), wx.setStorageSync("itemCartNum", d), r.setData({
                            cartNum: d,
                            isCartNumShow: !0
                        }));
                    }
                    e.cartJson.resultCode && (t = e.cartJson.resultCode), o = e.cartJson.resultMsg ? e.cartJson.resultMsg : "抱歉，加入购物车失败，请再试一下", 
                    n = 0 == t ? {
                        icon: a.default.icon.success,
                        message: "加入购物车成功",
                        pageObj: r
                    } : {
                        icon: a.default.icon.error,
                        message: o,
                        pageObj: r
                    }, a.default.show(n);
                }
            },
            fail: function(e) {
                o.reportErr("item add.json: " + e.errMsg);
            }
        });
    },
    getSelfCookie: function() {
        var e = "";
        try {
            var a = wx.getStorageSync("regionAddress");
            a && (e = e + "regionAddress=" + a + ";");
        } catch (e) {
            r.error(e);
        }
        return e;
    }
}));