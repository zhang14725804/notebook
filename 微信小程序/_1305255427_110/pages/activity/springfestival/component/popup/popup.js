function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

e(require("../../../../../libs/lodash.core.min.js"));

var a = e(require("../../../../../utils/api.js")), t = getApp();

Component({
    properties: {
        mode: {
            type: String,
            value: ""
        },
        modeType: {
            type: Number,
            value: 0
        },
        amount: {
            type: Number,
            value: 0
        },
        round: {
            type: Number,
            value: 0
        },
        gameId: {
            type: String,
            value: ""
        },
        isFrom: {
            type: String,
            value: ""
        }
    },
    data: {
        ui: {
            defaultHeight: 796,
            popupHeight: 796
        },
        moduleControl: {
            endGame: !1,
            failGame: !1,
            finashedGame: !1,
            refreshfail: !1,
            refreshsuccess: !1,
            loginAhsAccount: !1,
            productNotFound: !1
        },
        popupInfo: {
            title: {
                image: "",
                content: "恭喜获得奖金"
            },
            userInfo: {
                headImage: "",
                nickName: "",
                getmoney: 0
            },
            tips: {
                title: "",
                content: ""
            },
            btn: {
                text: "",
                url: ""
            },
            formId: ""
        },
        resource: {
            images: {
                endGameSmileImage: "https://sr.aihuishou.com/activity/minapp/endgamesmileImage.png",
                endGamePhoneImage: "https://sr.aihuishou.com/activity/minapp/endgamephoneImage.png",
                failGameImage: "https://sr.aihuishou.com/activity/minapp/failgameImage.png",
                finashedGameImage: "",
                refreshImage: "https://sr.aihuishou.com/activity/minapp/dogsmile.png"
            }
        }
    },
    methods: {
        handleonClosePopup: function() {
            var e = this, a = {
                mode: e.data.mode,
                modeType: e.data.modeType
            }, t = {
                bubbles: !0
            };
            e.triggerEvent("closePopup", a, t);
        },
        handleonFistEnety: function() {
            var e = this, a = {
                formId: e.data.popupInfo.formId
            }, t = {
                bubbles: !0
            };
            e.triggerEvent("currentgame", a, t);
        },
        handleonNavigatorMyGame: function() {
            var e = this, a = {
                formId: e.data.popupInfo.formId
            }, t = {
                bubbles: !0
            };
            e.triggerEvent("navigatorMyCollect", a, t);
        },
        handleonReSetNavigatorMyGame: function() {
            var e = this, a = {}, t = {
                bubbles: !0
            };
            "" != e.data.gameId && (a = {
                gameId: e.data.gameId
            }), e.triggerEvent("reSetnavigatorMyCollect", a, t);
        },
        handleonShareMyCardCollect: function() {
            var e = this, a = {}, t = {
                bubbles: !0
            };
            "" != e.data.gameId && (a = {
                gameId: e.data.gameId
            }), e.triggerEvent("ShareMyCollect", a, t);
        },
        handleonisHelpMyFriend: function() {
            var e = this, a = {}, t = {
                bubbles: !0
            };
            "" != e.data.gameId && (a = {
                gameId: e.data.gameId
            }), e.triggerEvent("isHelpMyFriend", a, t);
        },
        getModeandModeType: function() {
            var e = this, a = e.properties.mode, t = e.properties.modeType;
            switch (a) {
              case "endGame":
                0 == t ? (e.data.popupInfo.tips = {
                    title: "游戏已经结束！",
                    content: "您可以前往爱回收钱包进行提现哦"
                }, e.data.popupInfo.title.image = e.data.resource.images.endGameSmileImage, e.data.popupInfo.btn = {
                    text: "立即提现",
                    url: "/pages/activity/springfestival/withdraw_m_aihuishou/withdraw"
                }) : 1 == t && (e.data.popupInfo.tips = {
                    title: "游戏已经结束！",
                    content: "您可以到爱回收为闲置物品估价 换取更多零花钱！"
                }, e.data.popupInfo.title.image = e.data.resource.images.endGamePhoneImage, e.data.popupInfo.btn = {
                    text: "为闲置估价",
                    url: "/pages/index/index"
                }), e.data.moduleControl.endGame = !0;
                break;

              case "Refresh":
                1 == e.data.modeType && (e.data.moduleControl.refreshsuccess = !0), 0 == e.data.modeType && (e.data.moduleControl.refreshfail = !0), 
                e.setData({
                    "ui.popupHeight": 634
                });
                break;

              case "finashedGame":
                e.data.popupInfo.userInfo.getmoney = e.data.amount, e.data.popupInfo.tips = {
                    title: "",
                    content: "已经累计完成" + e.data.round + "轮游戏"
                }, e.data.popupInfo.btn = {
                    text: e.data.round <= 4 ? "继续我的搜集，集齐得2018元现金" : "前往爱回收钱包提现",
                    url: "/pages/activity/springfestival/withdraw_m_aihuishou/withdraw"
                }, e.data.moduleControl.finashedGame = !0;
                break;

              case "failGame":
                "0" == e.data.modeType ? e.data.popupInfo.tips = {
                    title: "",
                    content: "您的好友差一点就完成本轮游戏"
                } : "1" == e.data.modeType && (e.data.popupInfo.tips = {
                    title: "",
                    content: "您差一点就完成本轮游戏"
                }), e.data.popupInfo.title.image = e.data.resource.images.failGameImage, e.data.popupInfo.btn = {
                    text: "继续我的搜集，集齐得2018元现金",
                    url: ""
                }, e.data.moduleControl.failGame = !0;
                break;

              case "loginAhsAccount":
                e.setData({
                    "ui.popupHeight": 437
                }), e.data.moduleControl.loginAhsAccount = !0;
                break;

              case "productNotFound":
                e.data.popupInfo.tips = {
                    title: "程序猿还在路上",
                    content: "小爱还没找到您的品牌哦，请您可以稍后再试"
                }, e.data.popupInfo.title.image = e.data.resource.images.failGameImage, e.data.popupInfo.btn = {
                    text: "为闲置估价",
                    url: "/pages/index/index"
                }, e.data.moduleControl.productNotFound = !0;
            }
            e.setData({
                moduleControl: e.data.moduleControl,
                popupInfo: e.data.popupInfo
            });
        },
        getUserInfo: function() {
            var e = this;
            wx.getUserInfo({
                success: function(a) {
                    var t = a.userInfo;
                    "" != t && (e.data.popupInfo.userInfo.headImage = t.avatarUrl, e.data.popupInfo.userInfo.nickName = t.nickName, 
                    e.setData({
                        "popupInfo.userInfo": e.data.popupInfo.userInfo
                    }));
                },
                fail: function() {
                    wx.reLaunch({
                        url: "pages/index/index"
                    });
                }
            });
        },
        getPhoneNumber: function(e) {
            t.getPhoneNumber(e, this.getPhoneSuccess.bind(this), this.getPhoneFailed.bind(this));
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
                }), "helpMyFriend" == o.data.isFrom && o.handleonisHelpMyFriend(), "createNewGame" == o.data.isFrom && o.handleonFistEnety(), 
                o.handleonClosePopup());
            });
        },
        toggleDialog: function() {
            this.handleonClosePopup();
        },
        formSubmit: function(e) {
            var a = this, t = e.detail.formId;
            a.data.popupInfo.formId = t;
        }
    },
    ready: function() {
        var e = this;
        e.getUserInfo(), e.getModeandModeType();
    }
});