function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

e(require("../../../../libs/lodash.core.min.js"));

var a = e(require("../../../../utils/api.js")), t = (e(require("../util/function.js")), 
getApp());

Page({
    data: {
        ui: {
            isShowPopup: !1,
            isFromMyCollect: !1,
            isFromFriendCollect: !1
        },
        popup: {
            mode: "",
            modeType: ""
        },
        userInfo: {
            isGetUserInfo: !1,
            isLogin: !1,
            isFirstEntry: !0,
            isProductNotFound: !1
        },
        createGameInfo: {
            formId: "",
            productId: "",
            brandId: "",
            nickName: "",
            headerImgUrl: ""
        },
        activityInfo: {
            id: ""
        },
        resource: {
            url: {
                activityrule: "/pages/activity/springfestival/activityrule_h5/activityrule"
            }
        },
        tracking: {
            scene: "",
            from: ""
        }
    },
    onLoad: function(e) {
        var a = this, t = "";
        e && e.from && (t = e.from), this.setData({
            "tracking.scene": getApp().globalData.scene,
            "tracking.from": t
        }), e && e.from && (t = e.from), this.setData({
            "tracking.scene": getApp().globalData.scene,
            "tracking.from": t
        }), e.gameId && a.shareIsFromCollect(e), a.getUserInfo(), a.getUserProductType(), 
        a.checkUserLogin(), a.firstEntry();
    },
    onShareAppMessage: function() {},
    getUserInfo: function() {
        var e = this;
        wx.getUserInfo({
            success: function(a) {
                var o = a.userInfo;
                t.saveCache("userInfo", o), e.setData({
                    "userInfo.isGetUserInfo": !0,
                    "createGameInfo.nickName": o.nickName,
                    "createGameInfo.headerImgUrl": o.avatarUrl
                });
            },
            fail: function() {}
        });
    },
    getUserProductType: function() {
        var e = this;
        try {
            var o = wx.getStorageSync("mobileInfo");
            "" == o || void 0 === o.idProduct && void 0 === o.brandId ? wx.getSystemInfo({
                success: function(o) {
                    if (o.model) {
                        var n = o.model;
                        /^.*<.*iphone.*>/i.test(n) && (n = n.split("<")[1].split(">")[0]), t.fetch(a.default.fetchMobileType, {
                            model: n
                        }, function(o, n, i) {
                            if ("success" === i && n.data) {
                                var d = {
                                    idBrand: n.data.idBrand,
                                    idProduct: n.data.idProduct,
                                    name: n.data.productName
                                };
                                e.setData({
                                    "createGameInfo.productId": n.data.idProduct,
                                    "createGameInfo.brandId": n.data.idBrand,
                                    "systemInfo.productId": n.data.idProduct,
                                    "systemInfo.productName": n.data.productName
                                }), t.fetch(a.default.fetchBrands, {
                                    brandId: n.data.idBrand
                                }, function(a, o, n) {
                                    if (0 == o.code && "success" == n) {
                                        var i = o.data[0].imgUrl;
                                        e.setData({
                                            "systemInfo.brandImg": i,
                                            "systemInfo.brandImgUrl": encodeURIComponent(i)
                                        }), d.imgUrl = i, t.saveCache("mobileInfo", d);
                                    } else e.data.userInfo.isProductNotFound = !0;
                                });
                            } else e.data.userInfo.isProductNotFound = !0;
                        });
                    }
                }
            }) : ("" != o.idProduct && "" != o.idBrand || (e.data.userInfo.isProductNotFound = !0), 
            e.setData({
                "createGameInfo.productId": o.idProduct,
                "createGameInfo.brandId": o.idBrand
            }));
        } catch (e) {}
    },
    getPhoneNumber: function(e) {
        t.getPhoneNumber(e, this.getPhoneSuccess, this.getPhoneFailed);
    },
    getPhoneSuccess: function(e) {
        this.loginAutoFunc(e);
    },
    getPhoneFailed: function(e) {
        this.toggleDialog();
    },
    loginAutoFunc: function(e) {
        var o = this, n = e.detail.encryptedData, i = e.detail.iv;
        wx.checkSession({
            success: function() {
                t.fetch(a.default.checkOpenId, {}, function(e, a) {
                    a && a.data || t.saveOpenId();
                });
            },
            fail: function() {
                t.saveOpenId();
            }
        }), t.post(a.default.getWeixinBindPhone, {
            encryptedData: n,
            iv: i
        }, function(e, a, n) {
            0 == a.code && (t.saveCache("user-phone-info", {
                phone: a.data.purePhoneNumber
            }), o.setData({
                "userInfo.isLogin": !0
            }), o.firstEntry());
        });
    },
    toggleDialog: function() {
        this.handleonRefreshProductIcon();
    },
    navigateToPages: function(e) {
        var a = "";
        a = this.data.ui.isFromMyCollect ? "/pages/activity/springfestival/friendcardcollect/friendcardcollect?gameId=" + e + "&fromMyCollect" : "/pages/activity/springfestival/mycardcollect/mycardcollect?gameId=" + e, 
        wx.redirectTo({
            url: a
        });
    },
    navigateToPagesUnLogin: function() {
        this.firstEntry();
    },
    shareIsFromCollect: function(e) {
        var a = this;
        switch (e.from) {
          case "mycardcollect":
            a.data.ui.isFromMyCollect = !0, a.data.activityInfo.id = e.gameId;
            break;

          case "friendcardcollect":
            a.data.ui.isFromFriendCollect = !0, a.data.activityInfo.id = e.gameId;
        }
    },
    handleOnShowPopup: function(e, a) {
        var t = {
            mode: e,
            modeType: a
        };
        this.setData({
            popup: t
        });
    },
    handleOnClosePopup: function(e) {
        var a = this, t = !0, o = {
            mode: e.detail.mode,
            modeType: e.detail.modeType
        };
        "endGame" != e.detail.mode && "productNotFound" != e.detail.mode || (t = !1, wx.redirectTo({
            url: "/pages/index/index"
        })), a.setData({
            popup: o,
            "ui.isShowPopup": !t
        });
    },
    handleOnShowEndGamePopup: function(e, a) {
        var t = {
            mode: e,
            modeType: a
        };
        this.setData({
            popup: t,
            "ui.isShowPopup": !0
        });
    },
    handleOnShowProductNotFoundPopup: function(e, a) {
        var t = {
            mode: e,
            modeType: a
        };
        this.setData({
            popup: t,
            "ui.isShowPopup": !0
        });
    },
    handleOnShowFailGame: function(e, a, t, o) {
        var n = this, i = {
            mode: e,
            modeType: a,
            gameId: t,
            round: o
        };
        n.setData({
            popup: i,
            "ui.isShowPopup": !n.data.ui.isShowPopup
        });
    },
    handleOnShowFinashGame: function(e, a, t, o) {
        var n = this, i = {
            mode: e,
            modeType: a,
            amount: t,
            round: o
        };
        n.setData({
            popup: i,
            "ui.isShowPopup": !n.data.ui.isShowPopup
        });
    },
    handleonRefreshProductIcon: function() {
        var e = this, a = {
            mode: "loginAhsAccount",
            modeType: 0
        };
        e.setData({
            popup: a,
            "ui.isShowPopup": !e.data.ui.isShowPopup
        });
    },
    checkUserLogin: function() {
        var e = this;
        t.fetch(a.default.fetchUser, {}, function(a, t, o) {
            null == t.data ? e.data.userInfo.isLogin = !1 : e.data.userInfo.isLogin = !0, e.setData({
                userInfo: e.data.userInfo
            });
        });
    },
    checkUserFinashGame: function() {
        return new Promise(function(e, o) {
            t.fetch(a.default.checkCollectActivityDate, {}, function(a, t, n) {
                try {
                    if (0 == t.code && "success" == n) {
                        t.data.isExpire ? e() : o();
                    }
                } catch (e) {}
            });
        });
    },
    firstEntry: function() {
        var e = this;
        wx.login({
            success: function(o) {
                if (o.code) {
                    if (t.saveCache("userLoginInfo", {
                        code: o.code
                    }), e.data.userInfo.isLogin && e.data.ui.isFromMyCollect) return void wx.redirectTo({
                        url: "/pages/activity/springfestival/friendcardcollect/friendcardcollect?gameId=" + e.data.activityInfo.id + "&from=mycardcollect"
                    });
                    if (e.data.userInfo.isProductNotFound) return void e.handleOnShowProductNotFoundPopup("productNotFound", 0);
                    t.fetch(a.default.IsFirstEntryActivity, {}, function(a, t, o) {
                        switch (t.code) {
                          case 51028:
                            e.createNewGame();
                            break;

                          case 51029:
                            t.data.hasCompleted ? t.data.round < 5 ? e.handleOnShowFinashGame("finashedGame", 0, t.data.amount, t.data.round) : e.navigateToPages(t.data.id) : e.handleOnShowFailGame("failGame", 1, t.data.id, t.data.round);
                            break;

                          case 1005:
                            break;

                          case 10008:
                            var n = t.data.prizeAmount;
                            e.checkUserFinashGame().then(function() {
                                n > 2 ? e.handleOnShowEndGamePopup("endGame", 0) : e.handleOnShowEndGamePopup("endGame", 1);
                            });
                            break;

                          case 0:
                            var i = -1;
                            "" != e.data.activityInfo.id ? (i = e.data.activityInfo.id, e.navigateToPages(i)) : (i = t.data.id, 
                            t.data.hasCompleted && t.data.round < 5 ? e.handleOnShowFinashGame("finashedGame", 0, t.data.amount, t.data.round) : e.navigateToPages(i));
                        }
                    });
                }
            }
        });
    },
    formSubmit: function(e) {
        var a = this, t = e.detail.formId;
        a.data.createGameInfo.formId = t;
    },
    createNewGame: function(e) {
        var o = this;
        e && e.detail && e.detail.formId && (o.data.createGameInfo.formId = e.detail.formId);
        var n = {
            formId: o.data.createGameInfo.formId,
            productId: o.data.createGameInfo.productId,
            brandId: o.data.createGameInfo.brandId,
            nickName: o.data.createGameInfo.nickName,
            headerImgUrl: encodeURIComponent(o.data.createGameInfo.headerImgUrl)
        };
        t.post(a.default.createCollectCardActivity, n, function(e, a) {
            for (var t = arguments.length, n = Array(t > 2 ? t - 2 : 0), i = 2; i < t; i++) n[i - 2] = arguments[i];
            if (0 == a.code && "success" == n) {
                var d = a.data.id;
                o.navigateToPages(d);
            }
        });
    },
    resetNewGame: function(e) {
        var o = this, n = e.detail.gameId;
        t.post(a.default.resetCollectCardActivity, {
            collectCardId: n
        }, function(e, a, t) {
            0 == a.code && "success" == t && o.navigateToPages(n);
        });
    }
});