function e(e) {
    wx.requestPayment({
        timeStamp: e.timeStamp,
        nonceStr: e.nonceStr,
        package: e.package,
        signType: e.signType,
        paySign: e.paySign,
        success: function(s) {
            "requestPayment:ok" == s.errMsg && (wx.redirectTo({
                url: "../orderSubmitSuccess/orderSubmitSuccess?factPrice=" + e.factPrice + "&btnType=primary"
            }), r.sendMsgFront({
                commonId: e.package.split("=")[1],
                businessId: e.submitResult.submitOrder.OrderId,
                businessType: 30008
            }), t.request({
                url: a.globalRequestUrl + "/kwxp/wx/succeed.json?payResult=1&orderId=" + e.submitResult.submitOrder.OrderId,
                success: function(e) {}
            }));
        },
        fail: function(s) {
            t.request({
                url: a.globalRequestUrl + "/kwxp/wx/succeed.json?payResult=0&orderId=" + e.submitResult.submitOrder.OrderId,
                success: function(e) {}
            }), r.messagePush({
                formId: e.package.split("=")[1],
                times: 3,
                type: 30008
            }), "requestPayment:fail cancel" == s.errMsg ? wx.redirectTo({
                url: "../order/order"
            }) : (wx.showModal({
                title: "支付失败",
                confirmText: "我知道了",
                showCancel: !1
            }), setTimeout(function() {
                wx.redirectTo({
                    url: "../order/order"
                });
            }, 500));
        },
        complete: function(e) {
            "requestPayment:cancel" == e.errMsg && wx.redirectTo({
                url: "../order/order"
            });
        }
    });
}

var s = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../components/toast/toast.js")), a = getApp(), t = require("util.js"), r = require("./message_push.js");

module.exports = {
    newGotopay: function(o, i, d) {
        var l, c = wx.getStorageSync("wxappStorageName"), n = (wx.getStorageSync(c), wx.getStorageSync("appid") || ""), u = d.formId || null, p = [ "__jda", (a.globalData.__ad__ ? a.globalData.__ad__.jda : wx.getStorageSync("__jda")) + ";" ].join("="), m = [ "__jdv", (a.globalData.__ad__ ? a.globalData.__ad__.getJDV() : wx.getStorageSync("__jdv")) + ";" ].join("="), w = new Date();
        wx.login({
            success: function(d) {
                (l = d.code) ? wx.getUserInfo({
                    success: function(d) {
                        var c = d.iv, g = d.encryptedData, f = a.globalRequestUrl + "/kwxp/wx/submitOrderUnion.json", b = o.data.isPasswordModalData.passWordValue, x = {};
                        x = o.data.isPasswordModalData.modalDisplay ? {
                            code: l,
                            iv: c,
                            "order.securityPayPassword": b,
                            encryptedData: g,
                            appId: n,
                            wxclient: a.globalWxclient ? a.globalWxclient : null
                        } : {
                            code: l,
                            iv: c,
                            encryptedData: g,
                            appId: n,
                            wxclient: a.globalWxclient ? a.globalWxclient : null
                        }, t.request({
                            url: f,
                            data: x,
                            selfCookie: "kxcxtype=" + a.globalData.kxcxtype + ";" + p + m,
                            success: function(a) {
                                var t = a.submitResult.submitOrder, d = new Date() - w;
                                if (console.log(d), a.flag && t.OrderId > 0) {
                                    u && r.messagePush({
                                        formId: u,
                                        times: 1,
                                        type: 30001
                                    }), o.setData({
                                        "isPasswordModalData.modalDisplay": !1,
                                        "isPasswordModalData.passwordFocus": !1
                                    });
                                    var l = t.OrderId, c = t.FactPrice, n = a.skuIdsList;
                                    i.order({
                                        eid: "",
                                        orderList: o.strList2ArrObjList(n),
                                        orderid: l,
                                        total: c
                                    }), t.FactPrice > 0 ? e(a) : wx.redirectTo({
                                        url: "../orderSubmitSuccess/orderSubmitSuccess?factPrice=" + a.factPrice + "&btnType=primary"
                                    });
                                } else a.submitResult.needPassword ? o.data.isOpenPassword ? o.setData({
                                    "isPasswordModalData.modalDisplay": !0,
                                    "isPasswordModalData.passwordFocus": !0
                                }) : s.default.show({
                                    icon: s.default.icon.error,
                                    message: "请到“京东APP-账户设置-账户安全-支付密码”设置支付密码",
                                    pageObj: o,
                                    duration: 3e3,
                                    complete: function() {}
                                }) : 60065 == a.submitResult.submitOrder.MessageType ? (o.setData({
                                    "isPasswordModalData.modalDisplay": !1,
                                    "isPasswordModalData.passwordFocus": !1
                                }), wx.showModal({
                                    content: a.submitResult.submitOrder.Message,
                                    showCancel: !1,
                                    confirmText: "我知道了",
                                    confirmColor: "#f23030",
                                    success: function(e) {
                                        e.confirm && o.setData({
                                            "isPasswordModalData.modalDisplay": !0,
                                            "isPasswordModalData.passwordFocus": !0,
                                            "isPasswordModalData.passWordValue": ""
                                        });
                                    }
                                })) : wx.showModal({
                                    title: "提示",
                                    content: a.submitResult.submitOrder.Message,
                                    showCancel: !1,
                                    confirmText: "我知道了",
                                    confirmColor: "#f23030"
                                });
                            }
                        });
                    },
                    fail: function(e) {
                        wx.openSetting();
                    }
                }) : console.log("获取用户登录态失败！" + d.errMsg);
            }
        });
    }
};