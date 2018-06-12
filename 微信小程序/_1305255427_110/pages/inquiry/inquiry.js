function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

function e(t, e, a) {
    return e in t ? Object.defineProperty(t, e, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = a, t;
}

var a, o, i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
}, n = t(require("../../utils/api.js")), s = require("../../utils/util.js"), r = t(require("../../libs/lodash.core.min.js")), u = t(require("../../libs/es6-promise.min")), c = t(require("../../libs/wxqrcode.js")), d = (t(require("pickupTypes.js")), 
t(require("productSources.js"))), p = require("../../libs/bmap-wx.min.js"), h = (require("../../libs/qqmap-wx-jssdk.min.js"), 
new p.BMapWX({
    ak: "sOuCQ5I64gNb30I85YDvWjCqBpFDRXCz"
})), l = 52.35987755982988, f = function(t, e) {
    var e = +e, t = +t, a = Math.sqrt(t * t + e * e) + 2e-5 * Math.sin(e * l), o = Math.atan2(e, t) + 3e-6 * Math.cos(t * l);
    return [ a * Math.cos(o) + .0065, a * Math.sin(o) + .006 ];
};

Date.prototype.pattern = function(t) {
    var e = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours() % 12 == 0 ? 12 : this.getHours() % 12,
        "H+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),
        S: this.getMilliseconds()
    }, a = {
        0: "日",
        1: "一",
        2: "二",
        3: "三",
        4: "四",
        5: "五",
        6: "六"
    };
    /(y+)/.test(t) && (t = t.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length))), 
    /(E+)/.test(t) && (t = t.replace(RegExp.$1, (RegExp.$1.length > 1 ? RegExp.$1.length > 2 ? "星期" : "周" : "") + a[this.getDay() + ""]));
    for (var o in e) new RegExp("(" + o + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? e[o] : ("00" + e[o]).substr(("" + e[o]).length)));
    return t;
};

var m = getApp();

Page((o = {
    data: (a = {
        ab_recommendType: s.ABTEST.get("recommendType"),
        isOpenSubscribe: !1,
        isSubscribe: !1,
        tipText: "我们将会短信告知您回收的进度",
        supportRecycleType: {
            5: !1,
            4: !1,
            1: !1
        },
        isShowTradeWay: !0,
        shop: {
            data: {
                name: "请选择门店",
                address: "请选择门店",
                mobile: "请选择门店",
                longitude: "",
                latitude: "",
                id: "1"
            }
        },
        showDialog: !1,
        city: {
            props: {
                hasChanged: !1,
                hasShop: !0,
                isCurCity: !1
            },
            data: {
                id: "1",
                name: "请选择城市",
                supportOnDoor: !1,
                supportMetro: !1,
                isSupportCustomExpress: !1,
                childRegions: ""
            }
        },
        location: {
            latitude: "",
            longitude: ""
        },
        locationCity: {
            latitude: "",
            longitude: ""
        },
        ondoorMapInfo: {
            street: "",
            address: "",
            city: "",
            date: "",
            location: {},
            props: {
                supportOndoor: !0
            }
        },
        metroInfo: {
            date: "",
            site: {
                id: ""
            },
            line: {
                name: "选择地铁站",
                id: ""
            },
            rawData: []
        },
        ondoorType: 1,
        expressType: 1,
        ondoorDateList: [],
        ondoorDateIndex: 0,
        ondoorDateRaw: [],
        multiArray: [ [], [] ],
        multiIndex: [ 0, 0 ],
        sfexpressInfo: {
            street: "",
            building: "",
            city: "",
            nickName: "",
            date: "",
            location: {}
        },
        sfondoorDateList: [],
        sfondoorDateIndex: [ 0, 0 ],
        formartedSFexpressTime: [],
        formartedSFexpressDate: [],
        timeColumnIndex: 0,
        dateColumnIndex: 0,
        storeDateList: [],
        storeDateIndex: [ 0, 0 ],
        formartedStoreTime: [],
        formartedStoreDate: [],
        timeStoreColumnIndex: 0,
        dateStoreColumnIndex: 0,
        showPostageModal: !1,
        onlyCollection: "",
        tracking: {
            scene: "",
            from: "",
            productName: "",
            receiveCouponType: "",
            activity_name: "",
            defaultDistance: 0,
            submitDistance: 0
        },
        wx_inpush_inquiry_again: {
            scene: ""
        },
        selectType: "",
        realnameIcon: "../../resource/images/detail/question-gray.png",
        icon_unselected: "../../resource/images/inquiry/icon-unselected.png",
        icon_selected: "../../resource/images/inquiry/icon-selected.png",
        icon_redpacket: "../../resource/images/inquiry/icon-redpacket.gif",
        icon_received: "../../resource/images/inquiry/received.png",
        productSources: d.default,
        inquiryInfo: {
            amount: 0,
            productName: "",
            qrcode: "",
            nextWeekPrice: 0,
            nextWeekIcon: "../../resource/images/inquiry/nextweek.png",
            selectedValues: [],
            priceFavorablePackageCode: "",
            priceFavorablePackageCodeLevel: ""
        },
        submitInfo: {
            page: "/pages/inquiry/inquiry",
            inquiryKey: "",
            shopId: "",
            formId: ""
        },
        orderPushInfo: {
            page: "pages/order/order",
            orderNo: "",
            formId: ""
        },
        orderInfo: {
            contactName: "",
            pickupType: 0,
            inquiries: [ {
                inquiryKey: "",
                coupon: ""
            } ],
            cityId: 0,
            productSource: "",
            shopId: 0,
            shopReservationStartTime: "",
            shopReservationEndTime: ""
        },
        phoneNumber: "",
        isImgCaptchError: !1,
        captchImgUrl: "",
        smsCaptchText: "",
        captchaFocus: !1,
        tradetype: "store",
        timeline: "../../resource/images/inquiry/steps.png",
        iconCar: "../../resource/images/inquiry/express_icon.png",
        iconDollar: "../../resource/images/inquiry/dollar_icon.png",
        iconDun: "../../resource/images/inquiry/dun_icon.png",
        iconCollection: "../../resource/images/inquiry/collection.png",
        ui: {
            showInquiryAgian: !0,
            showPushInquiryMessage: !0,
            isServiesChecked: !0,
            showPushPopup: !1,
            showInquiryDetailPopup: !1,
            showTradetypePopup: !1,
            showSourcePopup: !1,
            showCaptchaPopup: !1,
            showOtherSourceInput: !1,
            currentTab: 0,
            showReceiveCoupon: !1,
            show_IconReceived: !1,
            showReceiveProp: !1,
            isShowfestivalTips: !1,
            showShopTime: !0
        },
        festivalTips: {
            url: "/pages/m_ahs/springfestivalTips/springfestivalTips",
            content: "春节假期运营安排 (部分业务暂停) 点击查看 "
        },
        productInfo: {
            categoryId: ""
        },
        coupon: {
            popup: !1,
            list: [],
            selectedId: ""
        },
        receiveCoupon: {
            popup: !1,
            list: [],
            status: !0
        },
        autoInModalImage: "../../resource/images/index/auto.png",
        confirmText: "手动填写",
        confirmTextOrder: "手动填写",
        showPopup: !1,
        showOrderPricePopUp: !1,
        writeByself: !0,
        writeByselfPopUp: !1
    }, e(a, "isImgCaptchError", !1), e(a, "captchImgUrl", ""), e(a, "smsCaptchText", ""), 
    e(a, "getCode", "获取验证码"), e(a, "phoneNumber", ""), e(a, "count", 60), e(a, "captchCode", ""), 
    e(a, "contactName", ""), e(a, "scrollTop", 0), e(a, "userLogin", !1), e(a, "myuuid", ""), 
    e(a, "phoneIcon", "../../resource/images/inquiry/icon-phone.png"), e(a, "piwikSource", ""), 
    e(a, "productId", 0), a),
    checkchange: function(t) {
        -1 !== t.detail.value.indexOf("sc") ? this.setData({
            "ui.isServiesChecked": !0
        }) : this.setData({
            "ui.isServiesChecked": !1
        });
    },
    closePushPopup: function() {
        this.setData({
            "ui.showPushPopup": !1
        });
    },
    handleOnTapInquiryDetail: function() {
        this.setData({
            "ui.showInquiryDetailPopup": !0
        });
    },
    closeInquiryDetail: function() {
        this.setData({
            "ui.showInquiryDetailPopup": !1
        });
    },
    handleOnTapMoreTradetype: function() {
        this.setData({
            "ui.showTradetypePopup": !0
        });
    },
    handleOnTradetypeChange: function(t) {
        t.detail.value !== this.data.tradetype && this.setData({
            tradetype: t.detail.value
        }), this.setData({
            "ui.showTradetypePopup": !1
        });
    },
    handleOnTapOtherSource: function() {
        this.setData({
            "ui.showOtherSourceInput": !0
        });
    },
    handleOnSourceChange: function(t) {
        this.setData({
            "ui.showSourcePopup": !1,
            "ui.showOtherSourceInput": !1
        });
    },
    handleOnExtraInput: function(t) {
        this.setData({
            "orderInfo.productSource": t.detail.value
        });
    },
    handleOnTapExtraSumit: function() {
        this.data.orderInfo.productSource ? (this.setData({
            "ui.showSourcePopup": !1
        }), this.getCouponsList()) : this.wetoast.toast({
            title: "请填写机器来源",
            duration: 700
        });
    },
    handleOnShowPriceUpPopup: function() {
        var t = this, e = t.data.inquiryInfo.priceFavorablePackageCode, a = t.data.receiveCoupon.list, o = !0;
        m.fetch(n.default.fetchPackage + e, {
            packageCode: e
        }, function(e, i, n) {
            "success" == n && 0 == i.code && (a = i.data.promotions, i.data.maxCountPerUser == i.data.reveiveCountPerUser && (o = !1)), 
            r.default.forEach(a, function(t) {
                t.endTime && (t.endTime = t.endTime.split("T")[0]);
            }), t.setData({
                "receiveCoupon.list": a,
                "receiveCoupon.popup": !t.data.receiveCoupon.popup,
                "receiveCoupon.status": o,
                "ui.show_IconReceived": !o
            });
        });
    },
    handleOnShowfestivalTips: function() {
        var t = this;
        this.setData({
            "ui.isShowfestivalTips": !t.data.ui.isShowfestivalTips
        });
    },
    handleOnReceiveCoupon: function() {
        var t = this, e = this, a = e.data.inquiryInfo.priceFavorablePackageCode;
        m.postpost(n.default.getReceiveCouponByCode, {
            packageCode: a
        }, function(a, o, i) {
            "success" == i && 0 == o.code ? t.setData({
                "ui.show_IconReceived": !0
            }) : 10002 == o.code ? wx.showModal({
                content: "您已经领取过该礼包,请在提交订单的时候使用。",
                showCancel: !1,
                confirmColor: "#FFBB00",
                success: function(t) {
                    1 == t.confirm && e.setData({
                        "ui.showReceiveProp": !1,
                        "receiveCoupon.popup": !1
                    });
                },
                fail: {}
            }) : wx.showModal({
                content: "礼包已经被领取完,下次早一点来哦",
                showCancel: !1,
                confirmColor: "#FFBB00",
                success: function(t) {
                    1 == t.confirm && e.setData({
                        "ui.showReceiveProp": !1,
                        "receiveCoupon.popup": !1
                    });
                },
                fail: {}
            });
        });
    },
    hideAllReceivePopups: function() {
        this.setData({
            "ui.showReceiveProp": !1,
            "receiveCoupon.popup": !1
        });
    },
    hideAllPopups: function(t) {
        "popup" === t.target.dataset.type && this.setData({
            "ui.showPushPopup": !1,
            "ui.showInquiryDetailPopup": !1,
            "ui.showTradetypePopup": !1,
            "ui.showSourcePopup": !1,
            "ui.showCaptchaPopup": !1
        });
    },
    stopBubble: function() {
        return !1;
    },
    stopScrollViewBubble: function(t) {
        console.log("j");
    },
    pageData: {
        defaultLocation: {
            latitude: "121.48",
            longitude: "31.22"
        },
        preventTimes: 3,
        curTimes: 0,
        toastSuccessIcon: "../../resource/images/toast/toastsuccess.png",
        toastFailIcon: "../../resource/images/toast/toastfailed.png"
    },
    onLoad: function(t) {
        var e = this, a = this, o = "";
        wx.getStorageSync("from");
        t && t.from && (o = t.from);
        var i = wx.getStorageSync("from_activity");
        "" != i && (a.data.tracking.activity_name = i), a.data.tracking.scene = getApp().globalData.scene, 
        a.data.tracking.from = o, this.setData({
            tracking: a.data.tracking,
            "productInfo.categoryId": t.categoryId || ""
        }), new m.WeToast(), m.request(n.default.toggleSubscribe, {}, "GET").then(function(t) {
            e.setData({
                isOpenSubscribe: t.data
            });
        });
        "wx-push" == t.from && a.setData({
            "ui.showPushInquiryMessage": !1
        }), m.saveOpenId(), wx.getStorage({
            key: "curLocation",
            success: function(t) {
                t.data ? a.setData({
                    location: t.data.code
                }) : a.setData({
                    location: a.pageData.defaultLocation
                }), a.initLocationPage(a.data.location);
            },
            fail: function(t) {
                a.autoGps().then(function(t) {
                    t ? a.setData({
                        location: t
                    }) : a.setData({
                        location: a.pageData.defaultLocation
                    }), a.initLocationPage(a.data.location);
                }, function() {
                    a.setData({
                        location: a.pageData.defaultLocation,
                        "city.props.isByGPSLocated": !1
                    }), a.initLocationPage(a.data.location);
                });
            }
        }), wx.getStorage({
            key: "choose_city",
            success: function(t) {
                t.data && (103 == t.data.id && (a.data.ui.currentTab = "2"), t.data.hasOwnProperty("isSupportCustomExpress") ? a.setData({
                    "city.data": t.data,
                    locationCity: t.data,
                    "ui.currentTab": a.data.ui.currentTab
                }) : m.fetch(n.default.getCityStatus, {
                    cityid: t.data.id
                }, function(t, e, o) {
                    0 == e.code && e.data && e.data.id && (a.setData({
                        "city.data": e.data,
                        locationCity: e.data,
                        "ui.currentTab": a.data.ui.currentTab
                    }), m.saveCache("choose_city", e.data));
                }));
            },
            fail: function(t) {
                wx.getStorage({
                    key: "curLocation",
                    success: function(t) {
                        t.data ? a.setData({
                            location: t.data.code
                        }) : a.setData({
                            location: a.pageData.defaultLocation
                        }), a.initLocationPage(a.data.location);
                    },
                    fail: function(t) {
                        a.setData({
                            location: a.pageData.defaultLocation
                        }), a.initLocationPage(a.data.location);
                    }
                });
            }
        }), wx.getStorage({
            key: "contactName",
            success: function(t) {
                t.data.name ? a.setData({
                    "orderInfo.contactName": t.data.name
                }) : a.setData({
                    "orderInfo.contactName": "小程序用户"
                });
            },
            fail: function(t) {
                a.setData({
                    "orderInfo.contactName": ""
                });
            }
        }), wx.getStorage({
            key: "user-phone-info",
            success: function(t) {
                t.data && a.setData({
                    phoneNumber: t.data.phone
                });
            },
            fail: function(t) {}
        }), wx.getStorage({
            key: "user-phone-info",
            success: function(t) {
                a.setData({
                    userLogin: !0
                });
            }
        });
        var s = t.inquiryKey;
        a.setData({
            "submitInfo.inquiryKey": t.inquiryKey,
            "submitInfo.page": "pages/inquiry/inquiry?inquiryKey=" + t.inquiryKey + "&uuid=" + t.uuid + "&from=wx-push",
            "orderInfo.inquiries": [ {
                inquiryKey: t.inquiryKey,
                coupon: ""
            } ],
            myuuid: t.uuid
        }), a.fetchInquiryInfo(s).then(function(t) {
            t.data.priceFavorablePackageCodeLevel = a.initPackageCodeLevel(t.data.priceFavorablePackageCodeLevel), 
            a.setData({
                "inquiryInfo.nextWeekPrice": parseInt(.045 * (100 - a.formatTime(new Date())) * .01 * t.data.amount),
                "inquiryInfo.amount": t.data.amount,
                "inquiryInfo.productName": t.data.productName,
                "inquiryInfo.selectedValues": t.data.selectedValues,
                "inquiryInfo.priceFavorablePackageCode": t.data.priceFavorablePackageCode,
                "inquiryInfo.priceFavorablePackageCodeLevel": t.data.priceFavorablePackageCodeLevel,
                "ui.showReceiveCoupon": !!t.data.priceFavorablePackageCode,
                "tracking.productName": t.data.productName,
                "tracking.receiveCouponType": t.data.priceFavorablePackageCodeLevel,
                productId: t.data.productId
            });
            var e = "inquiryDevice/" + t.data.productName + ";inquiryDeviceprice/" + t.data.amount;
            a._piwik("miniapp/inquiryPage", e, "basicInfo"), m.aldstat.sendEvent("询价结果页-机型", e.replace(/\//g, "_")), 
            console.log("priceFavorablePackageCode: ", a.data.inquiryInfo.priceFavorablePackageCode), 
            console.log("showReceiveCoupon: ", a.data.ui.showReceiveCoupon), wx.setNavigationBarTitle({
                title: t.data.productName
            });
        });
        var r = this.setCanvasSize();
        this.createQrCode("ahs-miniapp-" + t.uuid, r.w), a.initSFexpressDate();
    },
    onReady: function() {},
    onShow: function() {
        var t = this;
        m.saveCache("status.didPageChanged", !1);
        wx.getStorageSync("choose_city");
        t.initOndoorMapData(), t.initMetroInfo(t.data.city.data.id), (t.data.city.data.supportMetro || t.data.city.data.supportOnDoor) && t.initOndoorDate(t.data.city.data.id), 
        m.fetch(n.default.fetchUser, {}, function(e, a, o) {
            if (a.data) {
                var i = a.data, n = i.mobileLoginToken, s = i.mobile;
                m.saveCache("userLoginInfo", {
                    token: n,
                    mobile: s
                }), t.setData({
                    userLogin: !0,
                    phoneNumber: s
                });
            } else console.log("未登录");
        }), t.initShopDate();
    },
    onHide: function() {},
    onUnload: function() {},
    initLocationPage: function(t) {
        var e = this, a = 0, o = u.default.resolve(e.fetchCurrentCityShops(t.latitude + "," + t.longitude));
        o.then(function(t) {
            var o = t.data, i = e.getNearestShop(o);
            i >= 0 ? (e.setData({
                "shop.data": o[i]
            }), a = e.data.location.longitude ? (0, s.getDistance)(e.data.location.latitude, e.data.location.longitude, e.data.shop.data.latitude, e.data.shop.data.longitude) : 0, 
            e.setData({
                "tracking.defaultDistance": a
            }), e.setData({
                "city.props.hasShop": !0
            }), e.setData({
                "submitInfo.shopId": o[i].id
            })) : (e.setData({
                "city.props.hasShop": !1
            }), e.setData({
                "ui.currentTab": 1
            }));
        }).catch(function(t) {
            console.log(t);
        }), o.then(function(a) {
            if (e.initOndoorMapData(), e.isCurCity(e.data.city.data), e.getSupportRecycleType(e.data.city.data.id), 
            console.log(s.ABTEST.get("recommendType")), "B" == s.ABTEST.get("recommendType") ? (e._piwik("miniapp/inquiryPage", "abtin/recommendtype", "abtest"), 
            e.getRecommendType(e.data.city.data.id, t.longitude, t.latitude)) : e._piwik("miniapp/inquiryPage", "abtin/norecommendtype", "abtest"), 
            e.data.city.data.supportMetro) {
                var o = wx.getStorageSync("metroInfo");
                o && e.setData({
                    metroInfo: o
                }), e.initMetroInfo(e.data.city.data.id);
            }
            (e.data.city.data.supportMetro || e.data.city.data.supportOnDoor) && e.initOndoorDate(e.data.city.data.id);
        }).catch(function(t) {
            console.log(t);
        });
    },
    onShareAppMessage: function() {
        var t = this;
        return {
            title: "爱回收 - 回收凭证提醒",
            path: "/pages/inquiry/inquiry?inquiryKey=" + t.data.submitInfo.inquiryKey + "&uuid=" + t.data.submitInfo.uuid
        };
    },
    initPackageCodeLevel: function(t) {
        var e = "";
        switch (t) {
          case 1:
            e = "类型一";
            break;

          case 2:
            e = "类型二";
            break;

          case 3:
            e = "类型三";
            break;

          default:
            e = "其他";
        }
        return e;
    },
    initOndoorMapData: function() {
        var t = this;
        try {
            var e = wx.getStorageSync("userSelectOndoorMapInfo"), a = wx.getStorageSync("choose_city"), o = t.data.city.props.hasChanged;
            "" != e ? t.initOndoorMapInfo(e, "user-select") : "" != a && o ? t.setData({
                "city.props.hasChanged": !1,
                "sfexpressInfo.street": "",
                "ondoorMapInfo.street": ""
            }) : "" == e && "" == a && wx.getStorage({
                key: "curLocation",
                success: function(e) {
                    e.data ? t.setData({
                        location: e.data.code
                    }) : 1 == t.data.city.data.id && t.setData({
                        location: t.pageData.defaultLocation
                    }), t.initOndoorMapInfo(t.data.location, "auto-select");
                },
                fail: function(e) {
                    1 == t.data.city.data.id && (t.setData({
                        location: t.pageData.defaultLocation
                    }), t.initOndoorMapInfo(t.data.location, "auto-select"));
                }
            });
        } catch (t) {
            console.log(t);
        }
    },
    fetchCurrentCityShops: function(t) {
        var e = this, a = "", o = {}, s = wx.getStorageSync("choose_city");
        return m.request(n.default.searchCurrentCity, {
            location: t
        }).then(function(t) {
            var o = t.result.ad_info.city;
            return m.saveCache("CurCity", o), t && "object" === (void 0 === t ? "undefined" : i(t)) && "object" === i(t.result) && "object" === i(t.result.ad_info) && "string" == typeof t.result.ad_info.city && t.result.ad_info.city.length ? a = t.result.ad_info.city : (a = "未知", 
            e.setData({
                "city.props.hasShop": !1
            })), m.request(n.default.fetchAllCities);
        }).then(function(t) {
            return "object" === (void 0 === (o = r.default.find(t.data, function(t) {
                return a.indexOf(t.name) >= 0;
            })) ? "undefined" : i(o)) ? ("" == s ? (e.setData({
                "city.data": o
            }), e.setData({
                locationCity: o
            })) : e.fetchCurrentCityShopsByGivenCity(s).then(function(t) {
                t && t.data && t.data.length && e.setData({
                    "shop.data": t.data[0]
                });
            }), m.request(n.default.fetchShops, {
                cityId: "" == s ? o.id : s.id
            })) : {};
        });
    },
    fetchCurrentCityShopsByGivenCity: function(t) {
        var e = t.id;
        return m.request(n.default.fetchShops, {
            cityId: +e
        });
    },
    fetchInquiryInfo: function(t) {
        return m.request(n.default.fetchInquiryInfo, {
            inquiryKey: t
        });
    },
    getNearestShop: function(t, e, a) {
        if ("object" !== (void 0 === t ? "undefined" : i(t)) || null == t) return -1;
        var o = t.length, n = -1, s = this;
        if (o) {
            n = 0;
            for (var r, u = s.data.location.longitude || e, c = s.data.location.latitude || a, d = t[0].longitude, p = t[0].latitude, h = s.getPowSum(u - d, c - p), l = 1; l < o; l++) d = t[l].longitude, 
            p = t[l].latitude, (r = s.getPowSum(u - d, c - p)) && r <= h && (h = r, n = l);
        }
        return n;
    },
    getPowSum: function(t, e) {
        return Math.pow(t, 2) + Math.pow(e, 2);
    },
    setCanvasSize: function() {
        var t = {};
        try {
            var e = wx.getSystemInfoSync().windowWidth / (750 / 278), a = e;
            t.w = e, t.h = a;
        } catch (t) {}
        return t;
    },
    createQrCode: function(t, e) {
        var a = this, o = c.default.createQrCodeImg(t, {
            size: parseInt(e)
        });
        a.setData({
            "inquiryInfo.qrcode": o
        });
    },
    showToast: function(t, e) {
        var a = this, o = e || {}, i = o.duration || 700, n = o.icon || a.pageData.toastSuccessIcon, s = o.callback || function() {};
        a.wetoast.toast({
            img: n,
            title: t,
            duration: i,
            success: s,
            fail: function(t) {}
        });
    },
    handleOnTapInquiryAgain: function() {
        var t = this;
        t.data.ui.showPushInquiryMessage ? wx.navigateBack({}) : (t.setData({
            "wx_inpush_inquiry_again.scene": getApp().globalData.scene
        }), wx.navigateTo({
            url: "../category/category?from=wx-push-inquiry-again"
        }));
    },
    handleOnTapShopAddress: function(t) {
        var e = t.target.dataset.shop, a = (0, s.bd09togcj02)(e.latitude, e.longitude);
        wx.openLocation({
            latitude: a[0],
            longitude: a[1],
            scale: 28,
            name: e.name,
            address: e.address
        });
    },
    handleOnTapAddressSelect: function(t) {
        var e = this, a = e.data.city.data.name, o = e.data.ondoorMapInfo.street;
        wx.navigateTo({
            url: "../ondoormap/ondoormap?currentCity=" + a + "&currentStreet=" + o
        });
    },
    handleOnTapCitySelect: function(t) {
        var e = this, a = e.data.city.data.id, o = e.data.ui.currentTab;
        wx.navigateTo({
            url: "choose-city?currentCity=" + a + "&currentTab=" + o
        });
    },
    handleOnTapShopSelect: function(t) {
        var e = this, a = e.data.city.data.id;
        e.data.shop.data.id;
        wx.navigateTo({
            url: "choose-shop?currentCity=" + a
        });
    },
    handleOnTapShopMobile: function(t) {
        var e = t.currentTarget.dataset.mobile;
        wx.makePhoneCall({
            phoneNumber: String(e)
        });
    },
    handleOnTapSFCitySelect: function(t) {
        var e = this, a = e.data.city.data.id, o = e.data.selectType, i = e.data.ui.currentTab;
        wx.navigateTo({
            url: "choose-city?currentCity=" + a + "&selectType=" + o + "&currentTab=" + i
        });
    },
    handleOnTapSFStreetSelect: function(t) {
        var e = this, a = e.data.city.data.name, o = e.data.sfexpressInfo.street;
        wx.navigateTo({
            url: "../ondoormap/ondoormap?currentCity=" + a + "&currentStreet=" + o
        });
    },
    bindSFBuildingInput: function(t) {
        this.setData({
            "sfexpressInfo.building": t.detail.value
        });
    },
    bindSFNicknameInput: function(t) {
        this.setData({
            "sfexpressInfo.nickName": t.detail.value
        });
    },
    handleSFPickerChange: function(t) {
        console.log("picker发送选择改变，携带值为", t.detail.value), this.setData({
            sfondoorDateIndex: t.detail.value
        });
    },
    handleSFPickerColumnChange: function(t) {
        var e = t.detail.value, a = t.detail.column, o = this, i = o.data.sfondoorDateIndex;
        0 == a && (i[0] = e, i[1] = 0, o.setData({
            sfondoorDateList: [ o.data.formartedSFexpressDate, o.data.formartedSFexpressTime[e] ],
            dateColumnIndex: e,
            sfondoorDateIndex: i
        })), 1 == a && (i[1] = e, o.setData({
            timeColumnIndex: e,
            sfondoorDateIndex: i
        }));
    },
    handleStorePickerChange: function(t) {
        console.log("picker发送选择改变，门店预约时间携带值为", t.detail.value), this.setData({
            storeDateIndex: t.detail.value
        });
    },
    handleStorePickerColumnChange: function(t) {
        var e = t.detail.value, a = t.detail.column, o = this, i = o.data.storeDateIndex;
        0 == a && (i[0] = e, i[1] = 0, o.setData({
            storeDateList: [ o.data.formartedStoreDate, o.data.formartedStoreTime[e] ],
            dateStoreColumnIndex: e,
            storeDateIndex: i
        })), 1 == a && (i[1] = e, o.setData({
            timeStoreColumnIndex: e,
            storeDateIndex: i
        }));
    },
    showAuthErrorModal: function() {
        m.showModal({
            title: "提示",
            content: "出错了！请截屏保存二维码，到店出示，快速交易",
            success: function(t) {
                t.confirm;
            }
        });
    },
    requestPushOrderMessage: function(t) {
        console.log("orderInfo", t);
        m.request(n.default.pushOrderMessage, t, "POST").then(function(t) {}).catch(function(t) {
            console.log(t, "error");
        });
    },
    handleOnPhoneNumberInput: function(t) {
        this.setData({
            phoneNumber: t.detail.value
        });
    },
    handleOnTapCaptcha: function() {
        /^1[34578]\d{9}$/.test(this.data.phoneNumber) ? (this.setCaptchUrl(), this.setData({
            "ui.showCaptchaPopup": !0
        })) : this.wetoast.toast({
            title: "请填写正确手机号",
            duration: 700
        });
    },
    bindOndoorAddressBlur: function(t) {
        this.setData({
            "ondoorMapInfo.address": t.detail.value
        });
    },
    bindOndoorAddressInput: function(t) {
        this.setData({
            "ondoorMapInfo.address": t.detail.value
        });
    },
    handleOnTapServies: function() {
        wx.navigateTo({
            url: "servies"
        });
    },
    openSourceModal: function(t) {
        if (this.data.orderPushInfo.formId || this.setData({
            "orderPushInfo.formId": t.detail.formId
        }), !this.data.ui.isServiesChecked) return !1;
        var e = this, a = 0;
        switch (parseInt(e.data.ui.currentTab)) {
          case 0:
            if ("请选择门店" == e.data.shop.data.name) return this.wetoast.toast({
                title: "请选择门店",
                duration: 700
            }), !1;
            a = 5;
            break;

          case 1:
            if (a = 4, 1 == e.data.expressType) {
                if (!e.data.sfexpressInfo.building || !e.data.sfexpressInfo.street) return void this.wetoast.toast({
                    title: "请填写地址",
                    duration: 700
                });
                if (!e.data.sfexpressInfo.nickName) return void this.wetoast.toast({
                    title: "请正确填写寄件人真实姓名",
                    duration: 700
                });
                e.setData({
                    "orderInfo.expressOnDoorAddress": {
                        address: e.data.sfexpressInfo.street + e.data.sfexpressInfo.building,
                        pickupDate: e.data.formartedSFexpressDate[e.data.dateColumnIndex].value + "T" + e.data.formartedSFexpressTime[e.data.dateColumnIndex][e.data.timeColumnIndex].value + "+08:00"
                    }
                }), console.log(e.data.orderInfo.expressOnDoorAddress.pickupDate), m.saveCache("express", "sf");
            } else m.removeCache("express");
            break;

          case 2:
            if (1 == (a = e.data.ondoorType)) {
                if (!e.data.ondoorMapInfo.street || !e.data.ondoorMapInfo.address) return this.wetoast.toast({
                    title: "请填写地址",
                    duration: 700
                }), !1;
                if (!e.data.ondoorMapInfo.props.supportOndoor) return m.showModal({
                    title: "提示",
                    content: "该地址不支持上门回收，请选择其它交易方式",
                    success: function(t) {
                        t.confirm;
                    }
                }), !1;
                e.setData({
                    "orderInfo.onDoorAddress": {
                        address: e.data.ondoorMapInfo.street + e.data.ondoorMapInfo.address,
                        pickupDate: e.data.ondoorDateRaw[e.data.ondoorDateIndex]
                    }
                });
            } else if (2 == a) {
                if (!e.data.metroInfo.line.id || !e.data.metroInfo.site.id) return this.wetoast.toast({
                    title: "请选择地铁站",
                    duration: 700
                }), !1;
                e.setData({
                    "orderInfo.metroInfo": {
                        lineId: e.data.metroInfo.line.id,
                        siteId: e.data.metroInfo.site.id,
                        pickupDate: e.data.ondoorDateRaw[e.data.ondoorDateIndex]
                    }
                });
            }
        }
        e.setData({
            "orderInfo.cityId": e.data.city.data.id,
            "orderInfo.shopId": e.data.shop.data ? e.data.shop.data.id : "",
            "orderInfo.pickupType": a
        }), 1 == e.data.ui.currentTab ? e.setData({
            "ui.showSourcePopup": !0
        }) : e.data.userLogin && e.getCouponsList();
    },
    verifyData: function() {
        var t = this.data.orderInfo.contactName, e = this.data.phoneNumber, a = this.data.smsCaptchText;
        if (/\S+/.test(t)) if (/^1[34578]\d{9}$/.test(e)) {
            if (/^\d{6}$/.test(a)) return !0;
            this.wetoast.toast({
                title: "验证码错误",
                duration: 700
            });
        } else this.wetoast.toast({
            title: "请填写正确手机号",
            duration: 700
        }); else this.wetoast.toast({
            title: "请填写姓名",
            duration: 700
        });
        return !1;
    },
    setCaptchUrl: function() {
        var t = this;
        m.fetch(n.default.fetchCaptchUrl, {}, function(e, a, o) {
            "success" !== o && o || t.setData({
                captchImgUrl: a.data
            });
        });
    },
    checkImgCaptchSubmit: function(t) {
        var e = this, a = this, o = a.data.captchCode;
        if ("string" == typeof o && o.trim().length > 3) if (/^\d{4}$/.test(o)) {
            a.data.phoneNumber;
            m.fetch(n.default.fetchSmsCaptcha, {
                type: "Login",
                mobile: a.data.phoneNumber,
                imgCaptcha: o
            }, function(t, o, i) {
                400 != parseInt(o.code) ? "img-captch-error" === i ? (a.setData({
                    isImgCaptchError: !0
                }), a.wetoast.toast({
                    title: o.message,
                    duration: 700
                }), a.setCaptchUrl()) : (e.setData({
                    "ui.showCaptchaPopup": !1,
                    isImgCaptchError: !1,
                    captchaFocus: !0
                }), a.wetoast.toast({
                    title: "发送成功",
                    duration: 700
                }), a.beginTimer()) : a.wetoast.toast({
                    title: "\b获取验证码过于频繁，请稍后再试",
                    duration: 700
                });
            });
        } else a.setData({
            isImgCaptchError: !0
        });
    },
    swichNav: function(t) {
        var e = this;
        if (e.data.ui.currentTab === t.target.dataset.current) return !1;
        var a;
        switch (parseInt(t.target.dataset.current)) {
          case 0:
            a = "store";
            break;

          case 1:
            a = "express";
            break;

          case 2:
            a = "ondoor";
        }
        e.setData({
            selectType: a
        }), ("express" == a || "ondoor" == a) && e.data.inquiryInfo.amount < 50 ? e.setData({
            onlyCollection: "only-collection"
        }) : e.setData({
            onlyCollection: ""
        }), e.setData({
            "ui.currentTab": t.target.dataset.current,
            tradetype: a
        });
    },
    getPhoneNumber: function(t) {
        var e = this;
        "receiveCoupon" == t.target.id && e.setData({
            "ui.showReceiveProp": !0
        }), t.target.dataset.source && e.setData({
            "orderInfo.productSource": t.target.dataset.source
        }), e.data.showSourcePopup && this.setData({
            "ui.showSourcePopup": !1,
            "ui.showOtherSourceInput": !1
        }), m.getPhoneNumber(t, this.loginModel.bind(this), this.goFailPage.bind(this));
    },
    submitOrder: function() {
        var t = this, e = this, a = 0, o = void 0, i = void 0;
        this.data.shop && this.data.shop.data && (o = this.data.shop.data.latitude, i = this.data.shop.data.longitude), 
        console.log(e.data), 5 == e.data.orderInfo.pickupType && 0 !== e.data.storeDateList.length ? e.setData({
            "orderInfo.shopReservationStartTime": e.data.storeDateList[1][e.data.timeStoreColumnIndex].startTime,
            "orderInfo.shopReservationEndTime": e.data.storeDateList[1][e.data.timeStoreColumnIndex].endTime
        }) : e.setData({
            "orderInfo.shopReservationStartTime": "",
            "orderInfo.shopReservationEndTime": ""
        }), 1 == e.data.ui.currentTab && "" != e.data.sfexpressInfo.nickName ? e.setData({
            "orderInfo.contactName": e.data.sfexpressInfo.nickName
        }) : wx.getStorage({
            key: "contactName",
            success: function(t) {
                e.setData({
                    "orderInfo.contactName": t.data.nickName
                });
            }
        }), wx.showLoading(), m.post(n.default.postOrder, e.data.orderInfo, function(n, r, u) {
            0 == r.code ? (a = e.data.location.longitude ? (0, s.getDistance)(t.data.location.latitude, t.data.location.longitude, o, i) : 0, 
            e.setData({
                "tracking.submitDistance": a
            }), wx.hideLoading(), "B" == s.ABTEST.get("recommendType") ? e._piwik("miniapp/inquiryPage", "abtout/recommendtype", "abtest") : e._piwik("miniapp/inquiryPage", "abtout/norecommendtype", "abtest"), 
            wx.navigateTo({
                url: "/pages/order/order?orderno=" + r.data + "&phone=" + e.data.phoneNumber + "&productname=" + e.data.inquiryInfo.productName + "&receiveCouponType=" + e.data.inquiryInfo.priceFavorablePackageCodeLevel + "&productName=" + e.data.inquiryInfo.productName + "&productId=" + e.data.productId
            }), e.setData({
                "orderPushInfo.orderNo": r.data,
                "orderPushInfo.page": "pages/order/order?orderno=" + r.data + "&phone=" + e.data.phoneNumber + "&productname=" + e.data.inquiryInfo.productName + "&uuid=" + e.data.myuuid + "&from=wx-push"
            }), e.requestPushOrderMessage(e.data.orderPushInfo), console.log("code = " + r.code, "info = " + e.data.orderPushInfo)) : m.showModal({
                title: "提示",
                content: r.message,
                showCancel: !1,
                success: function(t) {
                    t.confirm ? console.log("用户点击确定") : t.cancel && console.log("用户点击取消");
                }
            });
        });
    },
    bindiconisChecked: function() {
        this.setData({
            "ui.isServiesChecked": !this.data.ui.isServiesChecked
        });
    },
    goFailPage: function(t) {
        this.toggleDialog(t);
    },
    formatTime: function(t) {
        return t.getDate();
    },
    loginModel: function(t) {
        this.loginAutoFunc(t);
    },
    loginAutoFunc: function(t) {
        var e = this, a = t.detail.encryptedData, o = t.detail.iv;
        "" == e.data.orderPushInfo.formId || e.data.ui.showReceiveProp || e.openSourceModal(), 
        e.data.showPopup && e.setData({
            showPopup: !e.data.showPopup
        }), m.postLongTimeToast(n.default.getWeixinBindPhone, {
            encryptedData: a,
            iv: o
        }, function(t, a, o) {
            console.log("postLongTimeToast"), a && 0 == a.code && (e.setData({
                phoneNumber: a.data.phoneNumber,
                userPhone: a.data.phoneNumber,
                userLogin: !0,
                "orderInfo.contactName": "小程序用户" + a.data.phoneNumber.slice(7, 11)
            }), m.saveCache("user-phone-info", {
                phone: a.data.phoneNumber
            }), m.saveCache("contactName", {
                nickName: "小程序用户" + a.data.phoneNumber.slice(7, 11)
            }), console.log("小程序用户" + a.data.phoneNumber.slice(7, 11)), e.data.ui.showReceiveProp ? e.handleOnShowPriceUpPopup() : e.getCouponsList());
        }), wx.hideToast();
    },
    hideCouponPopup: function() {
        this.setData({
            "coupon.popup": !1,
            captchaFocus: !1,
            "ui.showSourcePopup": !1
        }), this.resetForm();
    },
    getCouponsList: function() {
        var t = this;
        t.setData({
            "ui.showSourcePopup": !1
        }), m.fetch(n.default.couponsPlanList, {
            inquiryKeys: t.data.orderInfo.inquiries[0].inquiryKey,
            pickupType: t.data.orderInfo.pickupType,
            cityId: t.data.city.data.id,
            shopId: t.data.shop.data ? t.data.shop.data.id : ""
        }, function(e, a, o) {
            if (0 == a.code && a.data.availableCoupons && a.data.availableCoupons.length > 0) {
                var i = a.data.availableCoupons;
                r.default.forEach(i, function(t) {
                    t.endTime && (t.endTime = t.endTime.split("T")[0]);
                }), t.setData({
                    "coupon.list": i,
                    "coupon.popup": !t.data.coupon.popup
                });
            } else t.submitOrder();
        });
    },
    onSubmit: function() {
        console.log("submit"), this.setData({
            "coupon.popup": !1,
            "coupon.selectedId": ""
        }), this.submitOrder();
    },
    chooseCoupon: function(t) {
        this.setData({
            "coupon.selectedId": t.currentTarget.dataset.code,
            "orderInfo.inquiries": [ {
                inquiryKey: this.data.orderInfo.inquiries[0].inquiryKey,
                coupon: t.currentTarget.dataset.code
            } ]
        });
    },
    toggleDialog: function(t) {
        var e = this;
        "1" == this.data.ui.currentTab && this.setData({
            "ui.showSourcePopup": !1
        }), wx.getNetworkType({
            success: function(t) {
                "none" != t.networkType ? e.setData({
                    showPopup: !e.data.showPopup,
                    writeByself: !1,
                    confirmText: "手动填写"
                }) : wx.showModal({
                    title: "网络出现故障",
                    content: "请更换良好的网络环境再进行尝试。",
                    showCancel: !1
                });
            }
        });
    },
    manualInput: function() {
        this.setData({
            writeByself: !this.data.writeByself,
            confirmText: "自动获取" == this.data.confirmText ? "手动填写" : "自动获取",
            captchaFocus: !1
        }), this.resetForm();
    },
    getPhoneNumberInPopup: function(t) {
        m.getPhoneNumber(t, this.getPhoneSuccessInModal.bind(this), this.getPhoneFailedInModal.bind(this));
    },
    getPhoneSuccessInModal: function(t) {
        this.loginAutoFunc(t);
    },
    getPhoneFailedInModal: function() {}
}, e(o, "handleOnTapCaptcha", function() {
    "获取验证码" == this.data.getCode && (/^1[34578]\d{9}$/.test(this.data.phoneNumber) ? (this.setCaptchUrl(), 
    this.setData({
        "ui.showCaptchaPopup": !0
    })) : this.wetoast.toast({
        title: "请填写正确手机号",
        duration: 700
    }));
}), e(o, "setCaptchUrl", function() {
    var t = this;
    m.fetch(n.default.fetchCaptchUrl, {}, function(e, a, o) {
        "success" !== o && o || t.setData({
            captchImgUrl: a.data
        });
    });
}), e(o, "beginTimer", function() {
    var t = this;
    m.verifyTimer = setInterval(function() {
        var e = t.data.count - 1;
        t.setData({
            count: e,
            getCode: e
        }), e < 1 && (clearInterval(m.verifyTimer), t.setData({
            count: 60,
            getCode: "获取验证码"
        }));
    }, 1e3);
}), e(o, "handleOnPhoneNumberInput", function(t) {
    this.setData({
        phoneNumber: t.detail.value
    });
}), e(o, "handleOnCaptchCodeInput", function(t) {
    this.setData({
        captchCode: t.detail.value
    }), 4 == this.data.captchCode.length && this.checkImgCaptchSubmit();
}), e(o, "handleOnFormSubmit", function(t) {
    var e = this;
    e.setData({
        smsCaptchText: t.detail.value.smsCaptcha
    }), m.fetch(n.default.fetchUser, {}, function(t, a, o) {
        a.data && a.data.mobile === e.data.phoneNumber ? (e.setData({
            showPopup: !1,
            userPhone: e.data.phoneNumber,
            userLogin: !0
        }), m.saveCache("user-phone-info", {
            phone: e.data.phoneNumber
        }), e.getCouponsList()) : m.post(n.default.ahsUserLogin, {
            mobile: e.data.phoneNumber,
            smsCaptcha: e.data.smsCaptchText
        }, function(t, a, o) {
            0 == a.code ? (e.setData({
                showPopup: !1,
                userPhone: e.data.phoneNumber,
                userLogin: !0
            }), m.saveCache("user-phone-info", {
                phone: e.data.phoneNumber
            }), e.getCouponsList()) : e.wetoast.toast({
                title: a.message,
                duration: 700
            });
        });
    });
}), e(o, "checkLocationSupportOndoor", function(t, e) {
    var a = this;
    return console.log(t, e), m.request(n.default.checkLocationSupportOndoor, {
        cityId: a.data.city.data.id,
        longitude: t,
        latitude: e
    }).then(function(t) {
        console.log(t), a.setData({
            "ondoorMapInfo.props.supportOndoor": t.data
        });
    });
}), e(o, "isCurCity", function(t) {
    if (t = t || this.data.city) try {
        var e = wx.getStorageSync("CurCity");
        e && this.setData({
            isCurCity: e.includes(t.name)
        });
    } catch (t) {
        console.log(t);
    }
}), e(o, "initMetroInfo", function(t) {
    var e = this;
    return m.request(n.default.fetchMetroInfo, {
        cityId: t
    }).then(function(t) {
        if (t.data.length > 0) {
            var a = t.data;
            e.setData({
                "metroInfo.rawData": a
            });
            var o = [], i = [];
            r.default.forEach(a, function(t) {
                o.push(t.name);
            }), r.default.forEach(a[0].metroSites, function(t) {
                i.push(t.name);
            }), e.setData({
                multiArray: [ o, i ]
            }), console.log(e.data.multiArray);
        }
    }).catch(function(t) {
        console.log(t);
    });
}), e(o, "initOndoorDate", function(t) {
    var e = this;
    return m.request(n.default.fetchOndoorDate, {
        cityId: t
    }).then(function(t) {
        var a = t.data;
        e.formatOndoorDate(a);
    });
}), e(o, "initSFexpressDate", function() {
    var t = this;
    m.request(n.default.fetchSFexpressDate).then(function(e) {
        var a = e.data;
        t.formatSFexpressDate(a);
    });
}), e(o, "initShopDate", function() {
    var t = this;
    0 === t.data.storeDateList.length ? t.setData({
        "ui.showShopTime": !1
    }) : t.setData({
        "ui.showShopTime": !0
    }), m.request(n.default.fetchShopDate).then(function(e) {
        if (400 !== e.code) {
            t.setData({
                "ui.showShopTime": !0
            });
            var a = e.data;
            t.formatShopDate(a);
        } else t.setData({
            "ui.showShopTime": !1
        });
    });
}), e(o, "initOndoorMapInfo", function(t, e) {
    var a = this, o = t.location ? t.location.lng : t.longitude, i = t.location ? t.location.lat : t.latitude, n = f(o, i);
    if (t.location ? t.location.lng : t.longitude = n[0], t.location ? t.location.lat : t.latitude = n[1], 
    "user-select" === e) a.setData({
        "ondoorMapInfo.street": t.district ? t.city + t.district + t.title : t.city + t.title,
        "ondoorMapInfo.location": t,
        "sfexpressInfo.street": t.district ? t.city + t.district + t.title : t.city + t.title,
        "sfexpressInfo.location": t
    }), a.checkLocationSupportOndoor(t.location.lng, t.location.lat); else if ("auto-select" === e) {
        a.setData({
            "ondoorMapInfo.location": t,
            "sfexpressInfo.location": t
        });
        h.regeocoding({
            fail: function(t) {},
            success: function(e) {
                a.setData({
                    "ondoorMapInfo.street": e.wxMarkerData[0].address,
                    "sfexpressInfo.street": e.wxMarkerData[0].address
                }), a.checkLocationSupportOndoor(t.longitude, t.latitude);
            }
        });
    }
}), e(o, "formatOndoorDate", function(t) {
    var e = this;
    e.setData({
        ondoorDateRaw: t
    });
    var a = r.default.map(t, function(t) {
        return new Date(t).pattern("yyyy年MM月dd日 （EE）");
    });
    e.setData({
        ondoorDateList: a
    });
}), e(o, "formatShopDate", function(t) {
    var e = this;
    e.setData({
        storeDataRaw: t
    });
    var a = [], o = [];
    a = r.default.map(t, function(t) {
        var e = [], a = {};
        return r.default.forEach(t.items, function(t) {
            var a = {};
            t.enable && (a.name = t.durationTime, a.startTime = t.startTime, a.endTime = t.endTime, 
            e.push(a));
        }), o.push(e), a.name = new Date(t.date).pattern("MM月dd日"), a;
    }), 0 == o[0].length && (a.shift(), o.shift()), e.setData({
        formartedStoreTime: o,
        formartedStoreDate: a,
        storeDateList: [ a, o[0] ],
        storeDateIndex: [ a[0], o[0][0] ]
    });
}), e(o, "formatSFexpressDate", function(t) {
    var e = this;
    e.setData({
        sfondoorDataRaw: t
    });
    var a = [], o = [];
    a = r.default.map(t, function(t) {
        var e = [], a = {};
        return r.default.forEach(t.times, function(t) {
            var a = {};
            t.available && (a.name = t.hour + ":00-" + (t.hour + 1) + ":00", t.hour < 10 && (t.hour = "0" + t.hour), 
            a.value = t.hour + ":00:00", e.push(a));
        }), o.push(e), a.name = new Date(t.date).pattern("MM月dd日"), a.value = new Date(t.date).pattern("yyyy-MM-dd"), 
        a;
    }), 0 == o[0].length && (a.shift(), o.shift()), e.setData({
        formartedSFexpressTime: o,
        formartedSFexpressDate: a,
        sfondoorDateList: [ a, o[0] ],
        sfondoorDateIndex: [ a[0], o[0][0] ]
    });
}), e(o, "bindChooseOndoorType", function(t) {
    this.setData({
        ondoorType: t.currentTarget.dataset.type
    });
}), e(o, "bindChooseExpressType", function(t) {
    this.setData({
        expressType: t.currentTarget.dataset.type
    });
}), e(o, "bindMultiPickerChange", function(t) {
    var e = this;
    this.setData({
        "metroInfo.line": {
            index: t.detail.value[0],
            id: e.data.metroInfo.rawData[t.detail.value[0]].id,
            name: e.data.metroInfo.rawData[t.detail.value[0]].name
        },
        "metroInfo.site": {
            index: t.detail.value[1],
            id: e.data.metroInfo.rawData[t.detail.value[0]].metroSites[t.detail.value[1]].id,
            name: "，" + e.data.metroInfo.rawData[t.detail.value[0]].metroSites[t.detail.value[1]].name
        }
    });
}), e(o, "bindMultiPickerColumnChange", function(t) {
    var e = this, a = {
        multiArray: e.data.multiArray,
        multiIndex: e.data.multiIndex
    };
    switch (t.detail.column) {
      case 0:
        a.multiIndex[0] = t.detail.value, a.multiIndex[1] = 0, a.multiArray[1] = [], r.default.forEach(e.data.metroInfo.rawData[t.detail.value].metroSites, function(t) {
            a.multiArray[1].push(t.name);
        });
        break;

      case 1:
        a.multiIndex[1] = t.detail.value;
    }
    e.setData(a);
}), e(o, "handlePickerChange", function(t) {
    this.setData({
        ondoorDateIndex: t.detail.value
    });
}), e(o, "resetForm", function() {
    this.setData({
        contactName: "",
        captchCode: "",
        phoneNumber: "",
        captchImgUrl: "",
        count: 60,
        getCode: "获取验证码",
        showOrderPricePopUp: !1
    }), clearInterval(m.verifyTimer);
}), e(o, "showTip", function() {
    this.wetoast.toast({
        title: "顺丰要求实名寄件",
        duration: 1700
    });
}), e(o, "autoGps", function() {
    return new u.default(function(t, e) {
        wx.getLocation({
            type: "wgs84",
            success: function(e) {
                m.saveCache("curLocation", {
                    code: e
                }), t(e);
            },
            fail: function(t) {
                m.saveCache("curLocation", {
                    code: ""
                }), e();
            }
        });
    });
}), e(o, "handleAutoLoginByPhone", function(t, e) {
    var a = this, o = e.detail.encryptedData, i = e.detail.iv;
    m.postLongTimeToast(n.default.getWeixinBindPhone, {
        encryptedData: o,
        iv: i
    }, function(o, i, n) {
        console.log("postLongTimeToast"), i && 0 == i.code && (a.setData({
            phoneNumber: i.data.phoneNumber,
            userPhone: i.data.phoneNumber,
            userLogin: !0,
            "orderInfo.contactName": "小程序用户" + i.data.phoneNumber.slice(7, 11)
        }), m.saveCache("user-phone-info", {
            phone: i.data.phoneNumber
        }), m.saveCache("contactName", {
            nickName: "小程序用户" + i.data.phoneNumber.slice(7, 11)
        }), t(e));
    }), wx.hideToast();
}), e(o, "handleSubscibePrice", function() {
    var t = this;
    this._piwik("miniapp/inquiryPage", "subscribeclick", "basicInfo"), m.aldstat.sendEvent("询价结果页-订阅按钮", "subscribesuccess"), 
    m.request(n.default.subscribePrice, {
        inquiryKey: this.data.submitInfo.inquiryKey
    }, "POST").then(function(e) {
        t.setData({
            isSubscribe: !0,
            showOrderPricePopUp: !1
        }), setTimeout(function() {
            t.resetUserInputInfo();
        }, 100), t._piwik("miniapp/inquiryPage", "subscribesuccess", "basicInfo"), m.aldstat.sendEvent("询价结果页-订阅成功", "subscribesuccess"), 
        t.setData({
            showDialog: !0
        });
    }).catch(function(e) {
        var a = e.message;
        51108 == e.code ? a = "亲，您的订阅数量已达到上限～" : 51109 == e.code && (a = "亲，您已经订阅过该机型啦～", 
        t.setData({
            isSubscribe: !0
        })), t.wetoast.toast({
            title: a,
            duration: 700
        });
    });
}), e(o, "getOrderPhoneNumber", function(t) {
    this._piwik("miniapp/inquiryPage", "subscribeclick", "basicInfo"), m.aldstat.sendEvent("询价结果页-订阅按钮", "subscribesuccess"), 
    m.getPhoneNumber(t, this.handleAutoLoginByPhone.bind(this, this.handleSubscibePrice.bind(this)), this.getAutoPhoneFail.bind(this));
}), e(o, "getAutoPhoneFail", function() {
    this.setData({
        showOrderPricePopUp: !0,
        writeByselfPopUp: !1
    });
}), e(o, "toggleDialogPrice", function() {
    var t = this;
    this.setData({
        showOrderPricePopUp: !1,
        writeByselfPopUp: !1
    }), setTimeout(function() {
        t.resetUserInputInfo();
    }, 100);
}), e(o, "manualInputDialogPrice", function() {
    this.setData({
        writeByselfPopUp: !this.data.writeByselfPopUp,
        confirmTextOrder: "手动填写" === this.data.confirmTextOrder ? "自动填写" : "手动填写"
    });
}), e(o, "getPhoneNumberInPopupByOrder", function(t) {
    m.getPhoneNumber(t, this.handleAutoLoginByPhone.bind(this, this.handleSubscibePrice.bind(this)), function() {});
}), e(o, "resetUserInputInfo", function() {
    this.setData({
        confirmTextOrder: "手动填写",
        writeByselfPopUp: !1,
        contactName: "",
        phoneNumber: "",
        getCode: "获取验证码",
        captchImgUrl: "",
        captchCode: "",
        showOrderPricePopUp: !1,
        count: 60
    });
}), e(o, "handleOnFormSubmitPopUp", function(t) {
    var e = this;
    e.setData({
        smsCaptchText: t.detail.value.smsCaptcha
    }), m.fetch(n.default.fetchUser, {}, function(t, a, o) {
        a.data && a.data.mobile === e.data.phoneNumber ? (e.handleSubscibePrice(), setTimeout(function() {
            e.resetUserInputInfo();
        }, 100)) : m.post(n.default.ahsUserLogin, {
            mobile: e.data.phoneNumber,
            smsCaptcha: e.data.smsCaptchText
        }, function(t, a, o) {
            0 == a.code ? (e.setData({
                showOrderPricePopUp: !1,
                userPhone: e.data.phoneNumber,
                userLogin: !0
            }), m.saveCache("user-phone-info", {
                phone: e.data.phoneNumber
            }), e.handleSubscibePrice(), setTimeout(function() {
                e.resetUserInputInfo();
            }, 100)) : e.wetoast.toast({
                title: a.message,
                duration: 700
            });
        });
    });
}), e(o, "handleOrderPrice", function(t) {
    return !this.data.isSubscribe && (t.detail.formId && this.handlePostFormId(t.detail.formId), 
    !!this.data.userLogin && void this.handleSubscibePrice());
}), e(o, "handlePostFormId", function(t) {
    m.request(n.default.uploadFormId, {
        formId: t
    }, "POST");
}), e(o, "getSupportRecycleType", function(t) {
    var a = this, o = [ 1, 4, 5 ], i = [];
    i.push(this.data.submitInfo.inquiryKey), m.post(n.default.getSupportRecycleType, {
        inquiryKeys: i,
        cityId: t
    }, function(t, i, n) {
        0 == i.code && (i.data && 1 == i.data.length ? a.setData({
            isShowTradeWay: !1
        }) : a.setData({
            isShowTradeWay: !0
        }), o.forEach(function(t) {
            var o = "supportRecycleType." + t;
            a.setData(e({}, o, i.data.includes(t)));
        }));
    });
}), e(o, "getRecommendType", function(t, e, a) {
    var o = this, i = wx.getStorageSync("CurCity");
    e = e || this.data.location.longitude, a = a || this.data.location.latitude;
    var r = s.coordtransform.wgs84togcj02(e, a), u = s.coordtransform.gcj02tobd09(r[0], r[1]), c = [];
    c.push(this.data.submitInfo.inquiryKey), m.post(n.default.getRecycleMode, {
        cityid: t,
        longitude: u[0],
        latitude: u[1],
        locationCityName: i,
        inquiryKeys: c
    }, function(t, e, a) {
        if (0 == e.code && e.data) {
            console.log(e.data);
            var i = 0;
            switch (e.data) {
              case 5:
                i = 0;
                break;

              case 4:
                i = 1;
                break;

              case 1:
                i = 2;
                break;

              default:
                i = 0;
            }
            o.setData({
                "ui.currentTab": i
            });
        }
    });
}), o));