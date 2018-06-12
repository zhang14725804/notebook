var e = getApp(), r = require("util.js"), o = require("./message_push.js");

module.exports = {
    gotopay: function(t) {
        if (!t || t == {}) return console.log("request can not be executed without data."), 
        !1;
        var s, c = t.orderId ? t.orderId : "", n = t.orderType ? t.orderType : "0", a = t.orderTypeCode ? t.orderTypeCode : "0", u = t.factPrice ? t.factPrice : "", d = t.source ? t.source : "", i = wx.getStorageSync("wxappStorageName"), p = (wx.getStorageSync(i), 
        wx.getStorageSync("appid") || ""), l = t.formId ? t.formId : null;
        wx.login({
            success: function(t) {
                (s = t.code) ? wx.getUserInfo({
                    success: function(t) {
                        var i = t.iv, g = t.encryptedData, y = "";
                        y = e.globalWxclient ? e.globalRequestUrl + "/kwxp/wx/pay.json?code=" + s + "&iv=" + i + "&encryptedData=" + g + "&orderId=" + c + "&orderType=" + n + "&orderTypeCode=" + a + "&factPrice=" + u + "&appId=" + p + "&wxclient=" + e.globalWxclient : e.globalRequestUrl + "/kwxp/wx/pay.json?code=" + s + "&iv=" + i + "&encryptedData=" + g + "&orderId=" + c + "&orderType=" + n + "&orderTypeCode=" + a + "&factPrice=" + u + "&appId=" + p, 
                        r.request({
                            url: y,
                            success: function(t) {
                                var s = t.nonceStr, n = t.timeStamp, a = t.package, i = t.paySign, p = t.signType;
                                l && o.messagePush({
                                    formId: l,
                                    times: 1,
                                    type: 30002
                                }), wx.requestPayment({
                                    timeStamp: n,
                                    nonceStr: s,
                                    package: a,
                                    signType: p,
                                    paySign: i,
                                    success: function(t) {
                                        "requestPayment:ok" == t.errMsg && (o.sendMsgFront({
                                            commonId: a.split("=")[1],
                                            businessId: c,
                                            businessType: 30008
                                        }), r.request({
                                            url: e.globalRequestUrl + "/kwxp/wx/succeed.json?payResult=1&orderId=" + c,
                                            success: function(e) {}
                                        }), wx.redirectTo({
                                            url: "../orderSubmitSuccess/orderSubmitSuccess?factPrice=" + u + "&btnType=primary"
                                        }));
                                    },
                                    fail: function(t) {
                                        o.messagePush({
                                            formId: a.split("=")[1],
                                            times: 3,
                                            type: 30008
                                        }), r.request({
                                            url: e.globalRequestUrl + "/kwxp/wx/succeed.json?payResult=0&orderId=" + c,
                                            success: function(e) {}
                                        }), "requestPayment:fail cancel" == t.errMsg ? "" == d && wx.redirectTo({
                                            url: "../order/order"
                                        }) : (wx.showModal({
                                            title: "支付失败",
                                            confirmText: "我知道了",
                                            showCancel: !1
                                        }), "" == d && setTimeout(function() {
                                            wx.redirectTo({
                                                url: "../order/order"
                                            });
                                        }, 500));
                                    },
                                    complete: function(e) {
                                        "requestPayment:cancel" == e.errMsg && "" == d && wx.redirectTo({
                                            url: "../order/order"
                                        });
                                    }
                                });
                            }
                        });
                    },
                    fail: function(e) {
                        wx.openSetting();
                    }
                }) : console.log("获取用户登录态失败！" + t.errMsg);
            }
        });
    }
};