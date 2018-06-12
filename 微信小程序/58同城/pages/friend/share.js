var e = getApp(), t = require("../../utils/tipsUtil");

e.createPage([ {
    methodOptions: {
        e_saveQrCode: {
            type: "save"
        },
        e_share_chat: {
            type: "share"
        }
    },
    data: {
        pageType: "web-view",
        pageName: "friends-share",
        thirdKey: "",
        versionNormal: !1,
        answers: "无辣不欢,都可以,咸香,鬼灵精怪,酸酸甜甜,有点污".split(","),
        avatar: "",
        showQrImg: !1,
        friendsShareImg: ""
    },
    _onLoad: function(t) {
        var n = this, o = e.storage.getSync(e.constData.PROFILE_FRIEND_KEY);
        t.answers && this.setDataLazy({
            answers: t.answers.split(",")
        }), o ? this.setDataLazy({
            avatar: "/" === o.pic.charAt(0) ? "https:" + e.pathData.CDN_PIC + o.pic : o.pic
        }) : e.request(e.pathData.GET_USER_PROFILE).then(function(t) {
            console.log("用户信息", t), e.storage.setSync(e.constData.PROFILE_FRIEND_KEY, t.data), 
            n.setDataLazy({
                avatar: t.data.pic.replace(/\/0$/, "/132")
            });
        }), console.log(e.globalData), e.globalData.friendsScene || e.request("https://activity.58.com/wxa/love/sharequiz").then(function(t) {
            t.error || (e.globalData.friendsScene = t.data, n.friendsScene = e.globalData.friendsScene);
        });
    },
    _onShow: function() {},
    $e_saveQrCode: function(n) {
        var o = this;
        if (t.showLoading("图片生成中", {
            timeout: 1e4
        }), e.globalData.friendsShareImg) return this.setDataLazy({
            friendsShareImg: e.globalData.friendsShareImg,
            showQrImg: !0
        }), void t.hideLoading();
        e.request("https://activity.58.com/wxa/love/sharecode").then(function(n) {
            if (!n.error && n.data) {
                var i = "https://pic2.58cdn.com.cn" + n.data;
                e.globalData.friendsShareImg = i, o.setDataLazy({
                    friendsShareImg: i,
                    showQrImg: !0
                });
            } else e.alert("生成二维码图片失败，请稍候重试");
            t.hideLoading();
        });
    },
    $e_share_chat: function(e) {},
    saveImg: function(t) {
        e.doLogClick.call(this, {
            clickType: "downLoad",
            clickName: this.pageName + "-save-friend-code"
        }, t), this.downLoadImg(e.globalData.friendsShareImg);
    },
    e_shareAlertHide: function(e) {
        e && "share" !== e.target.id || this.setDataLazy({
            showQrImg: !1
        });
    },
    downLoadImg: function(e) {
        var n = this;
        t.showLoading("请稍候...", {
            timeout: 3e3
        }), console.log("下载图片", e), this.checkSaveImgSetting(function() {
            n.downAndSaveImg(e).then(function(e) {
                t.hideLoading(), console.log("download", e), n.e_shareAlertHide();
            });
        });
    },
    _openSettingPromise: null,
    openSetting: function(t) {
        var n = this;
        return this._openSettingPromise ? this._openSettingPromise : this._openSettingPromise = new Promise(function(o) {
            setTimeout(function() {
                wx.openSetting({
                    success: function(n) {
                        n.authSetting["scope.userInfo"] && 0 === t ? (console.log("openSetting true"), e.userData.removeUserInfo(), 
                        o({})) : n.authSetting["scope.writePhotosAlbum"] && 1 === t ? (console.log("相册 openSetting true"), 
                        o({})) : (console.log("openSetting false"), o({
                            error: !0
                        }));
                    },
                    fail: function(e) {
                        console.log("openSetting fail" + e), o({
                            error: !0,
                            msg: e
                        });
                    },
                    complete: function() {
                        n._openSettingPromise = null, e.storage.setSync("pagetype", "");
                    }
                });
            }, 1e3);
        }).then(function(e) {
            return e;
        }).then(function(e) {
            return n._openSettingPromise = null, e;
        });
    },
    _getSettingPromise: null,
    getSetting: function() {
        var e = this, t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        return this._getSettingPromise ? this._getSettingPromise : wx.getSetting ? this._getSettingPromise = new Promise(function(t) {
            wx.getSetting({
                success: function(e) {
                    return t(e.authSetting);
                },
                fail: function(e) {
                    return t({
                        error: !0,
                        msg: msg
                    });
                },
                complete: function(t) {
                    e._getSettingPromise = null;
                }
            });
        }) : (!t.isTipHidden && tip.versionLowTip(), new Promise(function(e) {
            e({
                error: !0,
                msg: "版本过低"
            });
        }));
    },
    checkSaveImgSetting: function(e) {
        var t = this;
        this.getSetting().then(function(e) {
            if (e.error) return {
                error: !0
            };
            var n = e["scope.writePhotosAlbum"];
            return console.log("获取相册设置信息" + n), void 0 === e["scope.writePhotosAlbum"] || e["scope.writePhotosAlbum"] ? {} : t.openSetting(1);
        }).then(function(t) {
            !t.error && e && e();
        });
    },
    saveImgToLocal: function(e, n, o, i) {
        return new Promise(function(a, s) {
            wx.saveImageToPhotosAlbum({
                filePath: e,
                success: function(e) {
                    return t.toast("图片保存成功", {
                        duration: 1e3
                    }), console.log("图片保存成功"), n && n(e), a(e);
                },
                fail: function(e) {
                    return console.log("图片保存失败原因：" + e.errMsg), o && o(e), a(e);
                },
                complete: function() {
                    i && i();
                }
            });
        });
    },
    downloadFile: function(e) {
        return new Promise(function(t, n) {
            wx.downloadFile({
                url: e,
                success: function(n) {
                    return console.log("图片下载成功，url" + e), t(n);
                },
                fail: function(e) {
                    return console.log("图片下载失败" + e), t();
                }
            });
        });
    },
    downAndSaveImg: function(t) {
        var n = this;
        {
            if (wx.saveImageToPhotosAlbum) {
                var o = e.storage.getSync(t);
                return o ? this.saveImgToLocal(o) : this.downloadFile(t).then(function(o) {
                    return e.storage.setSync(t, o.tempFilePath), n.saveImgToLocal(o.tempFilePath);
                }).catch(function(e) {
                    console.log("失败原因：" + e);
                });
            }
            e.alert("微信版本过低");
        }
    },
    onShareAppMessage: function() {
        var t = this;
        return e.doLogClick.call(this, {
            clickType: "share-friend-type-tongcheng",
            clickName: "share-friends-click-tongcheng"
        }), {
            title: "你真的了解我是什么样的人嘛？",
            path: "/pages/index/index?pagetype=friend&scene=" + e.globalData.friendsScene,
            imageUrl: "https://img.58cdn.com.cn/weixin/img/wechat-app/webview/friends/share-message.png",
            success: function() {
                t.shareCallback && t.shareCallback(t.pageParam);
            }
        };
    }
} ]);