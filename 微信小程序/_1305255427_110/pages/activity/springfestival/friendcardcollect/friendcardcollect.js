function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var t = e(require("../../../../libs/lodash.core.min.js")), a = e(require("../../../../utils/api.js")), i = e(require("../util/function.js")), n = e(require("../../../../libs/es6-promise.min")), d = (e(require("../../../../utils/md5.min")), 
getApp());

Page({
    data: {
        ui: {
            isShowPopup: !1,
            isFriend: !0,
            isBrandHelp: !1,
            isBrandHelped: !1,
            isHelp: !1,
            isHelped: !1,
            isClick: !1,
            isLogin: !1,
            friendCardMode: "index",
            friendCardAmount: "0",
            brandImage: ""
        },
        helpFriend: {
            formId: "",
            button: {
                isStar: !1,
                content: ""
            }
        },
        popup: {
            mode: "",
            modeType: 0,
            amount: 0
        },
        resource: {
            images: {
                ahslogoImage: "https://sr.aihuishou.com/activity/minapp/ahslogo.png"
            },
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
        var t = this, a = "";
        e && e.from && (a = e.from), this.setData({
            "tracking.scene": getApp().globalData.scene,
            "tracking.from": a
        }), i.default.getUserInfo(), t.getGameId(e), i.default.getUserProductType().then(function(e) {
            t.getGameDetail(e);
        }, function() {
            wx.redirectTo({
                url: "/pages/activity/springfestival/index/index"
            });
        });
    },
    onShareAppMessage: function() {},
    getGameId: function(e) {
        var t = this;
        "" != e.gameId && t.setData({
            "activityInfo.id": e.gameId
        });
    },
    getGameDetail: function(e) {
        var t = this, i = t.data.activityInfo.id;
        d.fetch(a.default.getDetailCollectCardActivity + i, {}, function(i, n, r) {
            if (0 == n.code && "success" == r) {
                var o = n.data;
                if (o.headerImgUrl = decodeURIComponent(o.headerImgUrl), t.setData({
                    activityInfo: o
                }), t.checkUserFinashGame(), o.loginIsOwner) {
                    if (1 == o.status) return void d.fetch(a.default.IsFirstEntryActivity, {}, function(e, t, a) {
                        0 == t.code && "success" == a && wx.redirectTo({
                            url: "/pages/activity/springfestival/mycardcollect/mycardcollect?gameId=" + t.data.id
                        });
                    });
                    if (3 == o.status) return void wx.redirectTo({
                        url: "/pages/activity/springfestival/index/index"
                    });
                }
                t.checkUserSystemIsHelpFriend(e);
            }
        });
        var n = wx.getStorageSync("mobileInfo");
        "" != n && t.setData({
            systemInfo: n
        });
    },
    isHelpMyFriend: function() {
        var e = this, t = "", i = wx.getStorageSync("mobileInfo");
        return wx.getStorageInfo({
            success: function(e) {}
        }), "" != i && (t = {
            brandId: i.idBrand,
            productId: i.idProduct,
            collectCardId: e.data.activityInfo.id
        }), new n.default(function(i, n) {
            d.post(a.default.checkHelpFriendCollectCardActivity, t, function(t, r, o) {
                var c = !1, s = r.code;
                d.fetch(a.default.IsFirstEntryActivity, {}, function(t, a, d) {
                    switch (c = 51028 != a.code, s) {
                      case 51024:
                        e.data.ui.friendCardMode = "helpedOther", e.data.ui.isHelp = !1, e.data.helpFriend.button.content = c ? "继续我的搜集，集齐得2018元现金" : "发起我的搜集，集齐得2018元现金";
                        break;

                      case 51025:
                        e.data.ui.friendCardMode = "inconsistent", e.data.ui.isHelp = !1, e.data.helpFriend.button.content = c ? "继续我的搜集，集齐得2018元现金" : "发起我的搜集，集齐得2018元现金";
                        break;

                      case 51026:
                        e.data.ui.friendCardMode = "finashed", e.data.ui.isHelp = !1, e.data.helpFriend.button.content = c ? "继续我的搜集，集齐得2018元现金" : "发起我的搜集，集齐得2018元现金";
                        break;

                      case 51027:
                        e.data.ui.friendCardMode = "inconsistent", e.data.ui.isHelp = !1, e.data.helpFriend.button.content = c ? "继续我的搜集，集齐得2018元现金" : "发起我的搜集，集齐得2018元现金";
                        break;

                      case 51030:
                        e.data.ui.friendCardMode = "helpedfriend", e.data.ui.isHelp = !1, e.data.helpFriend.button.content = c ? "继续我的搜集，集齐得2018元现金" : "发起我的搜集，集齐得2018元现金";
                        break;

                      case 51029:
                        e.data.activityInfo.hasCompleted ? (e.data.ui.friendCardMode = "finashed", e.data.ui.isHelp = !1, 
                        e.data.helpFriend.button.content = c ? "继续我的搜集，集齐得2018元现金" : "发起我的搜集，集齐得2018元现金") : (e.data.activityInfo.loginIsOwner ? e.data.ui.friendCardMode = "gameEnd" : e.data.ui.friendCardMode = "friendGameEnd", 
                        e.data.ui.isHelp = !1, e.data.helpFriend.button.content = c ? "继续我的搜集，集齐得2018元现金" : "发起我的搜集，集齐得2018元现金");
                        break;

                      case 51031:
                        wx.redirectTo({
                            url: "/pages/activity/springfestival/mycardcollect/mycardcollect?gameId=" + e.data.activityInfo.id
                        });
                        break;

                      case 0:
                        e.data.ui.isHelp = !0, e.data.helpFriend.button.content = "帮ta集卡 你也可得现金";
                    }
                    e.data.helpFriend.button.isStar = c, e.setData({
                        ui: e.data.ui,
                        helpFriend: e.data.helpFriend
                    }), e.data.ui.isHelp ? i() : (n(), e.comment = e.selectComponent("#friend_card"), 
                    e.comment.getModuleControl());
                });
            });
        });
    },
    checkUserSystemIsHelpFriend: function(e) {
        var a = this, i = wx.getStorageSync("mobileInfo");
        if ("" != i || e) {
            var n = a.data.activityInfo.remainBrandIds;
            t.default.forEach(n, function(t) {
                t == e.idBrand && (a.data.ui.brandImage = i.imgUrl, a.data.ui.isBrandHelp = !0, 
                a.data.helpFriend.button.content = "帮ta集卡 你也可得现金");
            }), a.data.ui.isBrandHelp || (a.data.ui.friendCardMode = "inconsistent", a.data.ui.isBrandHelp = !1, 
            a.data.ui.isHelp = !1, a.data.helpFriend.button.content = "发起我的搜集，集齐得2018元现金"), 
            a.setData({
                ui: a.data.ui,
                helpFriend: a.data.helpFriend
            }), a.comment = a.selectComponent("#friend_card"), a.comment.getModuleControl(), 
            a.comment.setBrandImage();
        }
    },
    checkUserLogin: function(e) {
        var t = !1;
        return new n.default(function(e, i) {
            d.fetch(a.default.fetchUser, {}, function(a, n, d) {
                try {
                    null == n.data ? i(t = !1) : e(t = !0);
                } catch (e) {}
            });
        });
    },
    handleonFriendCardCollect: function() {
        var e = this;
        e.checkUserLogin().then(function(t) {
            e.setData({
                "ui.isLogin": t
            }), e.data.ui.isHelped ? e.checkUserCreateGame() : e.isHelpMyFriend().then(function() {
                e.helpfriendcardCollect(), e.data.ui.isHelped = !0;
            }, function() {
                e.data.ui.isClick && (e.data.ui.isBrandHelp, e.checkUserCreateGame()), e.data.ui.isClick = !0;
            });
        }, function(t) {
            var a = {
                mode: "loginAhsAccount",
                modeType: 0,
                isFrom: "helpMyFriend"
            };
            e.setData({
                popup: a,
                "ui.isShowPopup": !e.data.ui.isShowPopup
            });
        });
    },
    checkUserCreateGame: function() {
        var e = this;
        d.fetch(a.default.IsFirstEntryActivity, {}, function(t, a, i) {
            switch (a.code) {
              case 51028:
                e.createNewGame();
                break;

              case 51029:
                wx.redirectTo({
                    url: "/pages/activity/springfestival/index/index"
                });
                break;

              case 1005:
                break;

              case 0:
                e.navigateToPages(a.data.id);
            }
        });
    },
    createNewGame: function(e) {
        var t = this, i = wx.getStorageSync("mobileInfo"), n = wx.getStorageSync("userInfo"), r = {};
        "" != i && "" != n && (r = {
            formId: t.data.helpFriend.formId,
            brandId: i.idBrand,
            productId: i.idProduct,
            nickName: n.nickName,
            headerImgUrl: encodeURIComponent(n.avatarUrl)
        }), d.post(a.default.createCollectCardActivity, r, function(e, a, i) {
            if (0 == a.code && "success" == i) {
                var n = a.data.id;
                t.navigateToPages(n);
            }
        });
    },
    resetNewGame: function(e) {
        var t = this;
        d.post(a.default.resetCollectCardActivity, {
            collectCardId: e
        }, function(a, i, n) {
            0 == i.code && "success" == n && t.navigateToPages(e);
        });
    },
    navigateToPages: function(e) {
        var t = "/pages/activity/springfestival/mycardcollect/mycardcollect?gameId=" + e;
        wx.redirectTo({
            url: t
        });
    },
    formSubmit: function(e) {
        var t = this, a = e.detail.formId;
        t.data.helpFriend.formId = a;
    },
    helpfriendcardCollect: function() {
        var e = this;
        setTimeout(function() {
            if (e.data.helpFriend.formId) {
                var t = wx.getStorageSync("mobileInfo"), i = wx.getStorageSync("userInfo");
                if ("" != t && "" != i) {
                    var n = {
                        brandId: t.idBrand,
                        productId: t.idProduct,
                        nickName: i.nickName,
                        headerImgUrl: encodeURIComponent(i.avatarUrl),
                        formId: e.data.helpFriend.formId,
                        collectCardId: e.data.activityInfo.id
                    };
                    d.post(a.default.helpFriendCollectCardActivity, n, function(t, a, i) {
                        if (0 == a.code && "success" == i) {
                            var n = a.data;
                            e.data.helpFriend.button.isStar ? e.data.helpFriend.button.content = "继续我的搜集，集齐得2018元现金" : e.data.helpFriend.button.content = "发起我的搜集，集齐得2018元现金", 
                            e.data.ui.friendCardMode = "collectSuccess", e.data.ui.friendCardAmount = n, e.data.ui.isHelp = !1, 
                            e.setData({
                                helpFriend: e.data.helpFriend,
                                ui: e.data.ui
                            }), e.comment = e.selectComponent("#friend_card"), e.comment.getModuleControl(), 
                            e.comment = e.selectComponent("#product_icon"), e.comment.getActivityInfo(), e.comment = e.selectComponent("#friend_list"), 
                            e.comment.getActivityInfo();
                        }
                    });
                }
            }
        }, 1e3);
    },
    checkUserFinashGame: function() {
        var e = this;
        d.fetch(a.default.checkCollectActivityDate, {}, function(t, a, i) {
            try {
                if (0 == a.code && "success" == i) {
                    var n = new Date(a.data.StartDate), d = new Date(a.data.endDate), r = new Date();
                    r > d && r < n && (e.data.activityInfo.amount > 2 ? e.handleOnShowEndGamePopup("endGame", 0) : e.handleOnShowEndGamePopup("endGame", 1));
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
    }
});