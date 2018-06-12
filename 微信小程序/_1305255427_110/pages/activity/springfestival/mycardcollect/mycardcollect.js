function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

e(require("../../../../libs/lodash.core.min.js"));

var t = e(require("../../../../utils/api.js")), a = e(require("../util/function.js")), i = getApp();

Page({
    data: {
        systemInfo: {
            productName: "",
            productId: ""
        },
        ui: {
            isFirstEntry: !1,
            isFriend: !1,
            isWithDraw: !0,
            isShowPopup: !1,
            isRefresh: !0
        },
        userInfo: {},
        activityInfo: {
            id: ""
        },
        countdown: {
            h: "11",
            m: "59",
            s: "59"
        },
        popup: {
            mode: "",
            modeType: 0
        },
        collectInfo: {
            isFinished: !1,
            collectedList: []
        },
        resource: {
            images: {
                headImage: "https://sr.aihuishou.com/activity/minapp/headImage.png",
                redpackImage: "https://sr.aihuishou.com/activity/minapp/redpack.png",
                headImages: "",
                shareImage: "https://sr.aihuishou.com/activity/minapp/messageTemplate.png"
            },
            url: {
                activityrule: "/pages/activity/springfestival/activityrule_h5/activityrule"
            }
        },
        tracking: {
            scene: "",
            from: "",
            shareType: ""
        }
    },
    baseData: {
        iphoneModelRegExp: /^.*<.*iphone.*>/i
    },
    onLoad: function(e) {
        var t = this, i = "";
        e && e.from && (i = e.from), this.setData({
            "tracking.scene": getApp().globalData.scene,
            "tracking.from": i
        }), a.default.checkUserLogin(e), t.getGameId(e), t.getUserProductType(), t.getUserInfo(), 
        t.getGameDetail();
    },
    onShareAppMessage: function(e) {
        var t = this;
        return e.from, t.setData({
            "tracking.shareType": "shareAll"
        }), {
            title: "我正在集手机品牌赢2018元现金,老铁就差你啦!",
            path: "/pages/activity/springfestival/friendcardcollect/friendcardcollect?gameId=" + t.data.activityInfo.id + "&from=mycardcollect",
            imageUrl: t.data.resource.images.shareImage,
            success: function(e) {
                t.setData({
                    "tracking.shareType": "shareSuccess"
                });
            },
            fail: function(e) {}
        };
    },
    ShowPopup: function(e, t) {
        var a = this, i = {
            mode: e,
            modeType: t
        };
        a.setData({
            popup: i,
            "ui.isShowPopup": !a.data.ui.isShowPopup
        });
    },
    getGameId: function(e) {
        var t = this;
        "" != e.gameId && (t.data.activityInfo.id = e.gameId, t.setData({
            "activityInfo.id": t.data.activityInfo.id
        }));
    },
    getGameDetail: function() {
        var e = this, a = e.data.activityInfo.id;
        i.fetch(t.default.getDetailCollectCardActivity + a, {}, function(t, a, i) {
            if (0 == a.code && "success" == i) {
                var o = a.data;
                o.hasCompleted && o.round < 5 && wx.redirectTo({
                    url: "/pages/activity/springfestival/index/index"
                }), e.processdataforActivityInfo(o), e.setData({
                    activityInfo: o
                }), e.checkUserFinashGame();
            }
        });
    },
    getUserProductType: function() {
        var e = this;
        try {
            "" == wx.getStorageSync("mobileInfo") && wx.getSystemInfo({
                success: function(a) {
                    if (a.model) {
                        var o = a.model;
                        e.baseData.iphoneModelRegExp.test(o) && (o = o.split("<")[1].split(">")[0]), i.fetch(t.default.fetchMobileType, {
                            model: o
                        }, function(a, o, n) {
                            if ("success" === n && o.data) {
                                var c = {
                                    id: o.data.idProduct,
                                    name: o.data.productName
                                };
                                i.saveCache("mobileInfo", c), e.setData({
                                    "systemInfo.productId": o.data.idProduct,
                                    "systemInfo.productName": o.data.productName
                                }), i.fetch(t.default.fetchProduct, {
                                    productId: o.data.idProduct
                                }, function(t, a, o) {
                                    "success" === o && a.data && a.data.imgUrl && (e.setData({
                                        "systemInfo.productImg": a.data.imgUrl,
                                        "systemInfo.productImgUrl": encodeURIComponent(a.data.imgUrl)
                                    }), c.imgUrl = a.data.imgUrl, i.saveCache("mobileInfo", c));
                                });
                            }
                        });
                    }
                }
            });
        } catch (e) {}
    },
    getUserInfo: function() {
        wx.getUserInfo({
            success: function(e) {
                e.userInfo;
            }
        });
    },
    handleonRefreshProductIcon: function(e) {
        var a = this, o = this, n = o.data.activityInfo.id;
        i.post(t.default.refreshCollectCardActivity, {
            collectCardId: n
        }, function(e, t, i) {
            0 == t.code ? (a.comment = a.selectComponent("#product_icon"), a.comment.getActivityInfo(), 
            o.setData({
                activityInfo: t.data,
                "ui.isRefresh": !1
            }), o.ShowPopup("Refresh", 1)) : 400 == t.code && o.ShowPopup("Refresh", 0);
        });
    },
    processdataforActivityInfo: function(e) {
        function t() {
            var t = e.endDate;
            if ("" != t) {
                var o = new Date(t), n = new Date();
                (o.getTime() - n.getTime()) / 36e5 % 24 > 12 && (n = new Date().getTime() + 288e5), 
                n = new Date(n);
                var c = o.getTime() - n.getTime() - 6e4, r = (parseInt(c / 1e3 / 60 / 60 / 24, 10), 
                parseInt(c / 1e3 / 60 / 60 % 24, 10)), s = parseInt(c / 1e3 / 60 % 60, 10), d = parseInt(c / 1e3 % 60, 10);
                c > 0 ? a.setData({
                    "countdown.h": r < 10 ? "0" + r : r,
                    "countdown.m": s < 10 ? "0" + s : s,
                    "countdown.s": d < 10 ? "0" + d : d
                }) : (clearInterval(i), a.data.activityInfo.round < 5 && wx.redirectTo({
                    url: "/pages/activity/springfestival/index/index"
                }));
            }
        }
        var a = this, i = setInterval(function() {
            t();
        }, 1e3);
    },
    navigetorwidthdraw: function() {
        wx.navigateTo({
            url: "/pages/activity/springfestival/withdraw_m_aihuishou/withdraw"
        });
    },
    checkUserFinashGame: function() {
        var e = this;
        i.fetch(t.default.checkCollectActivityDate, {}, function(t, a, i) {
            try {
                if (0 == a.code && "success" == i) {
                    var o = new Date(a.data.StartDate), n = new Date(a.data.endDate), c = new Date();
                    c > n && c < o && (e.data.activityInfo.amount > 2 ? e.handleOnShowEndGamePopup("endGame", 0) : e.handleOnShowEndGamePopup("endGame", 1));
                }
            } catch (e) {}
        });
    },
    handleOnShowEndGamePopup: function(e, t) {
        var a = {
            mode: e,
            modeType: t
        };
        this.setData({
            popup: a,
            "ui.isShowPopup": !0
        });
    },
    handleOnClosePopup: function(e) {
        var t = this, a = !0, i = {
            mode: e.detail.mode,
            modeType: e.detail.modeType
        };
        "endGame" == e.detail.mode && (a = !1, wx.redirectTo({
            url: "/pages/index/index"
        })), t.setData({
            popup: i,
            "ui.isShowPopup": !a
        });
    },
    createNewGame: function() {
        var e = this, a = {
            formId: e.data.createGameInfo.formId,
            productId: e.data.createGameInfo.productId,
            brandId: e.data.createGameInfo.brandId,
            nickName: e.data.createGameInfo.nickName,
            headerImgUrl: encodeURIComponent(e.data.createGameInfo.headerImgUrl)
        };
        i.post(t.default.createCollectCardActivity, a, function(t, a) {
            for (var i = arguments.length, o = Array(i > 2 ? i - 2 : 0), n = 2; n < i; n++) o[n - 2] = arguments[n];
            if (0 == a.code && "success" == o) {
                var c = a.data.id;
                e.navigateToPages(c);
            }
        });
    },
    resetNewGame: function(e) {
        var a = this, o = e.detail.gameId;
        i.post(t.default.resetCollectCardActivity, {
            collectCardId: o
        }, function(e, t, i) {
            0 == t.code && "success" == i && a.navigateToPages(o);
        });
    }
});