var t = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../../utils/api.js")), e = getApp();

Page({
    data: {
        piwikSource: "",
        ui: {
            showCaptchaPopup: !1
        },
        isImgCaptchError: !1,
        captchImgUrl: "",
        smsCaptchText: "",
        getCode: "获取验证码",
        count: 60,
        orderInfo: {
            contactName: "",
            pickupType: 0,
            inquiries: [ {
                inquiryKey: ""
            } ],
            cityId: 0,
            productSource: "",
            shopId: 0
        },
        phoneNumber: "",
        tracking: {
            scene: "",
            from: ""
        }
    },
    pageData: {
        toastSuccessIcon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAMAAAD04JH5AAAAk1BMVEUAAAD////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////ROyVeAAAAMHRSTlMA+/fsfTTxrloVAuFOG9QkDwW4l4hnLQrlyr6OO3JjRNzbpMIfEqFBqG5JB9d0Kw62ZipOAAACSUlEQVR42u3Y646iQBCG4aJBERQFD6PCeD6Mo3P47v/qNmuyMqbcNobpYjNbz38TO93QL0VKKaWUUkop9R/aFivPWxUJ1WRucGZGVIsAF3OqwRAlsyVxA3xVkLB4jSsrkpWFuOaRqHEftf6BNEephi3YTcEUJCfqgjEJiUmW4EYkptcGNyMxTxMwnuD6Gz4Yr0VinptgvA6JWRgwZkFiOh6Y5jOJaXlg/AaJGXlgJk8kZgau3SMxAbhlQmKG4LoRiRmAm+5ISrwGl6ckJQvB9cfkDM8vLsxISpqDW8ck43Z+YUACyvxihiTAkl8BWf34/JrTPf9QfkWt2XtnXFt+pQNzTpYg+778enlkAy8HaJPWkV8tg4tuIp5fcXFdDj3h/Ipy9mPR/Gq0q9VrAG6VPLT9nFlI5VdWgHnkEY4r5leZD/wlKpJfB/zdu0B+LWAzdJ9fIawGMdmkm8r55cPuYFtN9A35hXv6Y7f5ZXDPJnWaXxtcMdZ3yv38eqVHjfBVuAvBLbcO8+vUxYUXEMV7cJMPh9OvD/+SD0f6rQDnNxxOv7Y5zvpby93WXFTLL7tGsF8HDXYu2PLkpl8t79YBk5x+HQ24WbX8qt74GEpOv578m1fTvfxy/Z15OAlOv5I3cG1w05ScKC9bu/yTGGfTHunp1ykEIzv9ivew28fkWAFGePoVWKNZwitKktMvfjXx/JLSMbc/3OS8NCvkl5sBnOmQrF6b5Zew5I3ll7BoyvJL2Gf45/rvUU2OoQ+zGWWklFJKKaWUUj/GL07nk4k3zSK9AAAAAElFTkSuQmCC",
        toastFailIcon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAMAAAD04JH5AAAAflBMVEUAAAD+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v5yViGVAAAAKXRSTlMA+t3s5SQPBvfYvUksHBUK8dKyloltZc/JxqWQe1M3Hq+jmIBeQkA9NO32K2AAAAIOSURBVHja7NbZbsIwEIXh45QkFNoAZStt2dfz/i9YiQsQ8VDHM0itKn/3jmIntn8kSZIkSZIkSZL8YcvPzLnsc/lbzxi3eeYmUJs4nrXHirG8GEFpxIvoWeSOV0OoDHnlcsNgcg2FNWmYRMYbqxKRyhVvZIjDmk4PUXod1iCOY82sQIRixhqHOAPWTSs0Vk1ZN0CcLT3Pr2jo9ZmeLeIUT/RkORrJM3qeCkTqOnpaL2jgpUWP6yJaty3M44Sgk7B27S4U9n16+kcEHKVRe6gsxLko1m0BgfprzvGDufznqOUt+na4a0dfK4fAsqM5xh1jiqeHSTWg7wuiL/oGFYyKd/pGcn743guY9Tr0DeWCkO5Qu/KNvg/UfND3VuIhSvnh4Zcs8SgbcXkDn2kDk/APNiuk/LC3dGCLCYlSTeWtahc+ZCIOK7MJpUSR84MTKMVfNIELK8SeKJr8UDv02UD/AAVtotjyw54oj8wPTXJr0/1BiWLLD3uimPPDnij2/LAnij0/7IkSzo9/9wLf7ZoJDcBADMP4sx6GZdWsRDaFe9o8749g6xIGz3DqI0q+4qVhlIzjpYUkW8l2ltJwLZ8RJqk0WxGnsTzfMCi+WTT9JtV3m67bqLyxanvN6ju7vjOwuI1s+kKr89iuLbjEo1s8vMbje7zAgFc48BILXuPBi0x8lYsvs4mIiIiIiPzEA73Vp4SlD7MAAAAAAElFTkSuQmCC"
    },
    onLoad: function(t) {
        var a = "";
        switch (t && t.from && (a = t.from), this.setData({
            "tracking.scene": getApp().globalData.scene,
            "tracking.from": a
        }), new e.WeToast(), this.setData({
            "orderInfo.contactName": t.name,
            "orderInfo.pickupType": t.pickupType,
            "orderInfo.productSource": t.productSource ? t.productSource : "",
            "orderInfo.cityId": t.cityId,
            "orderInfo.shopId": t.shopId,
            "orderInfo.inquiries[0].inquiryKey": t.inquirykey,
            phoneNumber: t.phone
        }), parseInt(t.pickupType)) {
          case 1:
            this.setData({
                "orderInfo.onDoorAddress.address": t.address,
                "orderInfo.onDoorAddress.pickupDate": t.pickupDate
            });
            break;

          case 2:
            this.setData({
                "orderInfo.metroInfo.lineId": t.lineId,
                "orderInfo.metroInfo.siteId": t.siteId,
                "orderInfo.metroInfo.pickupDate": t.pickupDate
            });
        }
    },
    getPhoneNumber: function(t) {
        e.getPhoneNumber(t, this.makeOrder);
    },
    makeOrder: function(a) {
        var o = this, r = a.detail.encryptedData, n = a.detail.iv;
        r && e.post(t.default.getWeixinBindPhone, {
            encryptedData: r,
            iv: n
        }, function(a, r, n) {
            if (0 == r.code) {
                var i = o.data.orderInfo.contactName, s = r.data.phoneNumber;
                "小程序用户" === i && o.setData({
                    "orderInfo.contactName": i + r.data.phoneNumber.slice(7, 11)
                });
            }
            e.post(t.default.postOrder, o.data.orderInfo, function(t, e, a) {
                0 == e.code ? wx.redirectTo({
                    url: "/pages/order/order?orderno=" + e.data + "&phone=" + s
                }) : wx.showModal({
                    title: "提示",
                    content: e.message,
                    showCancel: !1,
                    success: function(t) {
                        t.confirm ? console.log("用户点击确定") : t.cancel && console.log("用户点击取消");
                    }
                });
            });
        });
    },
    handleOnPhoneNumberInput: function(t) {
        this.setData({
            phoneNumber: t.detail.value
        });
    },
    handleOnTapCaptcha: function() {
        "获取验证码" == this.data.getCode && (/^1[34578]\d{9}$/.test(this.data.phoneNumber) ? (this.setCaptchUrl(), 
        this.setData({
            "ui.showCaptchaPopup": !0
        })) : this.wetoast.toast({
            title: "请填写正确手机号",
            duration: 700
        }));
    },
    handleOnFormSubmit: function(t) {
        console.log(t.detail), this.setData({
            "orderInfo.contactName": t.detail.value.contactName,
            smsCaptchText: t.detail.value.smsCaptcha,
            phoneNumber: t.detail.value.phoneNumber
        }), this.verifyData() && this.submitOrder();
    },
    setCaptchUrl: function() {
        var a = this;
        e.fetch(t.default.fetchCaptchUrl, {}, function(t, e, o) {
            "success" !== o && o || a.setData({
                captchImgUrl: e.data
            });
        });
    },
    checkImgCaptchSubmit: function(a) {
        var o = this, r = this, n = a.detail.value.captch;
        if ("string" == typeof n && n.trim().length > 3) if (/^\d{4}$/.test(n)) {
            r.data.phoneNumber;
            e.fetch(t.default.fetchSmsCaptcha, {
                type: "Login",
                mobile: r.data.phoneNumber,
                imgCaptcha: n
            }, function(t, e, a) {
                "img-captch-error" === a ? (r.setData({
                    isImgCaptchError: !0
                }), r.setCaptchUrl()) : (o.setData({
                    "ui.showCaptchaPopup": !1,
                    isImgCaptchError: !1
                }), r.wetoast.toast({
                    title: "发送成功",
                    duration: 700
                }), r.beginTimer());
            });
        } else r.setData({
            isImgCaptchError: !0
        });
    },
    submitOrder: function() {
        var a = this;
        e.fetch(t.default.fetchUser, {}, function(o, r, n) {
            r.data && r.data.mobile === a.data.phoneNumber ? e.post(t.default.postOrder, a.data.orderInfo, function(t, e, o) {
                0 == e.code ? wx.navigateTo({
                    url: "/pages/order/order?orderno=" + e.data + "&phone=" + a.data.phoneNumber
                }) : wx.showModal({
                    title: "提示",
                    content: e.message,
                    showCancel: !1,
                    success: function(t) {
                        t.confirm ? console.log("用户点击确定") : t.cancel && console.log("用户点击取消");
                    }
                });
            }) : e.post(t.default.ahsUserLogin, {
                mobile: a.data.phoneNumber,
                smsCaptcha: a.data.smsCaptchText
            }, function(o, r, n) {
                "sms-captch-error" === n ? a.wetoast.toast({
                    title: "验证码错误",
                    duration: 700
                }) : e.post(t.default.postOrder, a.data.orderInfo, function(t, e, o) {
                    0 == e.code ? wx.redirectTo({
                        url: "/pages/order/order?orderno=" + e.data + "&phone=" + a.data.phoneNumber
                    }) : wx.showModal({
                        title: "提示",
                        content: e.message,
                        showCancel: !1,
                        success: function(t) {
                            t.confirm ? console.log("用户点击确定") : t.cancel && console.log("用户点击取消");
                        }
                    });
                });
            });
        });
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
    hideAllPopups: function(t) {
        "popup" === t.target.dataset.type && this.setData({
            "ui.showCaptchaPopup": !1
        });
    },
    beginTimer: function() {
        var t = this;
        e.verifyTimer = setInterval(function() {
            var a = t.data.count - 1;
            t.setData({
                count: a,
                getCode: a
            }), a < 1 && (clearInterval(e.verifyTimer), t.setData({
                count: 60,
                getCode: "获取验证码"
            }));
        }, 1e3);
    }
});