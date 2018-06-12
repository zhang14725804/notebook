function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var t = e(require("../../utils/api.js")), a = e(require("../inquiry/pickupTypes.js")), n = getApp();

Page({
    data: {
        productId: 0,
        pollCount: 0,
        piwikSource: "",
        identity: "",
        brandname: "",
        isGetModel: !1,
        orderInfo: {},
        tradetype: "",
        phonenumber: "",
        okIcon: "../../resource/images/order/okicon.png",
        iconIdcard: "../../resource/images/order/icon-idcard.png",
        iconClock: "../../resource/images/order/icon-clock.png",
        iconPower: "../../resource/images/order/icon-power.png",
        iconExpress: "../../resource/images/order/icon-express.png",
        iconQuestion: "../../resource/images/order/icon-question.png",
        expressType: "",
        receiveCouponType: "",
        tracking: {
            scene: "",
            from: "",
            activity_name: "",
            receiveCouponType: "",
            productName: "",
            tradetype: ""
        },
        friendAssistance: {
            isShowFriendAssistance: !1,
            isShowPopup: !1,
            bannerImage: "https://sr.aihuishou.com/activity/minapp/friendassistance_order.png",
            zhuLiShareUrl: "",
            autoLoginToken: "",
            navigatortoUrl: "/pages/activity/friendAssistance/friendAssistance"
        }
    },
    baseData: {
        iphoneModelRegExp: /^.*<.*iphone.*>/i
    },
    onLoad: function(e) {
        var t = this, o = "", i = wx.getStorageSync("from");
        e.productId && this.setData({
            productId: e.productId
        }), e && e.from && (o = e.from), "" != i && i && (o = i);
        e && e.receiveCouponType && e.productName && (t.data.tracking.receiveCouponType = e.receiveCouponType, 
        t.data.tracking.productName = e.productName);
        var r = wx.getStorageSync("from_activity");
        "" != r && (t.data.tracking.activity_name = r), t.data.tracking.scene = getApp().globalData.scene, 
        t.data.tracking.from = o, this.setData({
            tracking: t.data.tracking
        }), n.aldstat.sendEvent("提交UV", n.getGuid(!1)), t.setData({
            orderNo: e.orderno,
            phonenumber: e.phone
        }), wx.setNavigationBarTitle({
            title: e.productname
        }), wx.getStorage({
            key: "express",
            success: function(e) {
                t.setData({
                    expressType: e.data
                });
            }
        }), "wx-push" == e.from ? wx.getStorage({
            key: e.orderno,
            success: function(e) {
                t.setData({
                    orderInfo: {
                        amount: e.data.amount
                    }
                }), a.default.forEach(function(a) {
                    a.type === e.data.tradetype && (4 == a.type && t.data.orderInfo.customerExpress && (a.value = "selfsend"), 
                    t.setData({
                        tradetype: a.value,
                        "tracking.tradetype": a.value
                    }));
                });
            }
        }) : t.fetchOrderInfo(e.orderno).then(function(a) {
            t._piwik("miniapp/orderPage", t.piwikData(), "basicInfo"), console.log(t.piwikData(!0)), 
            n.aldstat.sendEvent("提交订单成功页", t.piwikData(!0)), a && a.zhuliTwoFriendAmount ? t.setData({
                "friendAssistance.isShowFriendAssistance": a.isShowFriendAssistance,
                "friendAssistance.isShowPopup": a.isShowFriendAssistance,
                "friendAssistance.zhuLiShareUrl": encodeURIComponent(a.zhuLiShareUrl),
                "friendAssistance.autoLoginToken": encodeURIComponent(a.autoLoginToken)
            }) : (t.data.pollCount = 0, t.fetchZhuliProcess(e.orderno));
        });
    },
    fetchZhuliProcess: function(e) {
        var a = this;
        3 !== a.data.pollCount && setTimeout(function() {
            n.fetch(t.default.fetchZhuliProcess + e, {}, function(t, n, o) {
                if (0 == n.code) {
                    var i = n.data;
                    i && i.zhuliTwoFriendAmount ? a.setData({
                        "orderInfo.zhuliTwoFriendAmount": i.zhuliTwoFriendAmount,
                        "friendAssistance.isShowFriendAssistance": i.isShowFriendAssistance,
                        "friendAssistance.isShowPopup": i.isShowFriendAssistance,
                        "friendAssistance.zhuLiShareUrl": encodeURIComponent(i.zhuLiShareUrl)
                    }) : (a.data.pollCount = a.data.pollCount + 1, a.fetchZhuliProcess(e));
                }
            });
        }, 500);
    },
    fetchOrderInfo: function(e) {
        var o = this;
        return new Promise(function(i, r) {
            n.fetch(t.default.fetchOrderInfo + e, {}, function(t, n, s) {
                var c = o;
                c.setData({
                    orderInfo: n.data,
                    "friendAssistance.navigatortoUrl": c.data.friendAssistance.navigatortoUrl + "?url=" + encodeURIComponent(n.data.zhuLiShareUrl + "&userid=" + n.data.autoLoginToken)
                });
                var d = n.data.orderItems[0].product.brandId;
                c.data.identity = "184" == d ? "小米" : "24" == d ? "Flyme" : "365" == d ? "乐视" : "52" == d ? "iCloud" : "", 
                c.setData({
                    identity: c.data.identity
                }), a.default.forEach(function(e) {
                    e.type === n.data.pickupType && (4 == e.type && n.data.customerExpress && (e.value = "selfsend"), 
                    c.setData({
                        tradetype: e.value,
                        "tracking.tradetype": e.value
                    }));
                }), wx.setStorage({
                    key: e,
                    data: {
                        amount: n.data.amount,
                        tradetype: n.data.pickupType
                    }
                }), t ? r(t) : i(n.data);
            });
        });
    },
    handleOnTapCheckOrder: function() {
        var e = "../activity/private/private?url=" + encodeURIComponent("https://m.aihuishou.com/m/index.html#/user/orderlist?utm_source=miniprog_activity&utm_medium=miniprogme&utm_campaign=orderlist");
        wx.navigateTo({
            url: e
        });
    },
    handleOnTapBackup: function() {
        wx.navigateTo({
            url: "help/backup-tutorial"
        });
    },
    handleOnTapUnlock: function() {
        wx.navigateTo({
            url: "help/unlock-tutorial"
        });
    },
    onShareAppMessage: function() {
        return {
            title: "我在爱回收卖了旧机器，挣钱又环保，你也来试试",
            path: "/pages/index/index",
            imageUrl: "https://aihuishou-internal.oss-cn-hangzhou.aliyuncs.com/miniapps/earth/earth_share_banner.png"
        };
    },
    onUnload: function() {
        "wx-push" != this.data.tracking.from && wx.navigateBack({
            delta: 10
        });
    },
    showtip: function() {
        n.showModal({
            title: "",
            content: "如果订单的号码不是您常用的号码，请返回重新提交订单。",
            confirmText: "我知道了",
            showCancel: !1
        });
    },
    handleonClosePopup: function() {
        this.setData({
            "friendAssistance.isShowPopup": !1
        });
    },
    piwikData: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0], t = this.data, n = t.phonenumber, o = t.orderInfo, i = t.productId, r = o.pickupType, s = o.amount, c = o.orderNo, d = "";
        console.log(o.orderItems[0]), d = "submitDevice/" + o.orderItems[0].product.name + ";price/" + s + ";phone/" + n + ";tradeno/" + c + ";productId/" + i + ";", 
        a.default.forEach(function(e) {
            e.type == r && (d = d + "recycleType/" + e.value + ";");
        });
        var u = getCurrentPages();
        if (u.length > 1) {
            var p = u[u.length - 2];
            d = d + "inquiryId/" + p.data.submitInfo.inquiryKey + ";";
        } else d += "inquiryId/null;";
        return e ? d.replace(/\//g, "_") : d;
    }
});