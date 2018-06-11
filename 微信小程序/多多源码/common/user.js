function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = e(require("../storage/user_storage")), n = e(require("../controller/user_controller")), o = e(require("../constants/grade")), r = e(require("./request")), a = e(require("../configs/app_config")), i = e(require("../configs/api")), u = require("./message"), s = e(require("./logger")), c = e(require("../constants/tracking/subjects")), f = e(require("../storage/ram_manager")), l = e(require("../libs/co/we-index")), d = e(require("../libs/es6-promise.min")), p = e(require("../libs/regenerator-runtime/runtime")), g = e(require("../controller/config_controller")), h = function(e, t) {
    s.default.send(e, t);
}, y = o.default.ExtraField, v = null, I = !1, _ = {
    isLogining: !1,
    loginExtraInfo: null,
    fetchUserType: l.default.wrap(p.default.mark(function e() {
        var t, n, o;
        return p.default.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                return e.prev = 0, e.next = 3, r.default.apiRequest("GET", i.default.hasOrders, {
                    check_has_normal_order: 1
                });

              case 3:
                t = e.sent, n = !1, t && t.user_tags && (o = t.user_tags, n = 0 == o.has_normal_order, 
                "0" === f.default.pddUserType && n && (f.default.pddUserType = "2")), e.next = 11;
                break;

              case 8:
                e.prev = 8, e.t0 = e.catch(0), console.error(e.t0);

              case 11:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 0, 8 ] ]);
    })),
    doStartupJobs: function() {
        var e = this;
        u.Message.on(u.KEYS.REQUEST_NEED_LOGIN, function(t) {
            t && (e.hasAccessToken() ? r.default.buildRequest(t) : e.requireLogin(function() {
                r.default.buildRequest(t);
            }, function() {
                r.default.buildRequest(t);
            }));
        }), u.Message.on(u.KEYS.REQUEST_TOKEN_INVALID, function() {
            e.requireLogin();
        });
        var n = t.default.getUserLocalInfo(), o = t.default.getUserId();
        n && o && n.openId || t.default.clearUserLocalInfo();
    },
    latestLoginExtraInfo: function() {
        return v;
    },
    resetLoginExtraInfo: function() {
        (v = {}).useCache = !1, v.isSuccess = !1, v.loginType = 0, v.isClickWxAuthBtn = !1, 
        v.isClickWxDenyBtn = !1, v.isClickPddOKBtn = !1, v.isClickPddCancelBtn = !1;
    },
    requireLogin: function(e, n) {
        var o = this;
        if (this.hasLogin()) return o.resetLoginExtraInfo(), v.isSuccess = !0, v.useCache = !0, 
        "function" == typeof e && e(o.getUserLocalInfo(), v), void (f.default.pddUserType || (f.default.pddUserType = "0"));
        var s = function(e, n) {
            o.getCompleteUserInfo(function(o) {
                var u = {
                    code: o.code,
                    app_id: a.default.appId,
                    encrypted_data: o.encryptedData,
                    iv: o.iv,
                    raw_data: o.rawData,
                    signature: o.signature,
                    has_auth: !0
                };
                r.default.apiRequest("POST", i.default.login, u, !0, {
                    disableRetry: !0
                }).then(function(n) {
                    n.nickName = o.nickName, n.avatarUrl = o.avatarUrl, n.createTime = Date.now(), t.default.saveUserInfo(n), 
                    "function" == typeof e && e(n);
                }, function(e) {
                    "function" == typeof n && n(e);
                });
            }, function(e) {
                "function" == typeof n && n(e);
            });
        };
        if (this.isLogining) u.Message.on(u.KEYS.USER_LOGIN_FINISHED, function(t) {
            o.hasAccessToken() ? "function" == typeof e && e(t, v) : "function" == typeof n && n(t, v);
        }, !0); else {
            var c = function(e) {
                var n = t.default.getOpenId(), o = t.default.getUserLocalInfo(), r = o && o.is_weapp_newer, a = "boolean" == typeof r ? Number(r) : 2;
                h({
                    op: "event",
                    sub_op: "silent_login",
                    is_success: e,
                    xcx_new_user: a,
                    openId: n
                });
            };
            this.isLogining = !0, this.resetLoginExtraInfo(), o.requireSilentLogin(function(t) {
                o.isLogining = !1, v.isSuccess = !0, v.useCache = !1, "function" == typeof e && e(t, v), 
                u.Message.emit(u.KEYS.USER_LOGIN_FINISHED, t), f.default.pddUserType || (f.default.pddUserType = "0"), 
                c(1);
            }, function(t) {
                v.useCache = !1, s(function(t) {
                    o.isLogining = !1, v.isSuccess = !0, "function" == typeof e && e(t, v), u.Message.emit(u.KEYS.USER_LOGIN_FINISHED, t);
                }, function(e) {
                    o.isLogining = !1, v.isSuccess = !1, "function" == typeof n && n(e, v), u.Message.emit(u.KEYS.USER_LOGIN_FINISHED, null);
                }), 43504 === t.error_code && (f.default.pddUserType = "1"), c(0);
            });
        }
    },
    requireSilentLogin: function(e, n) {
        v.loginType = 0;
        var o = this;
        wx.login({
            success: function(u) {
                if (u.code) {
                    var s = {
                        code: u.code,
                        has_auth: !1,
                        app_id: a.default.appId
                    };
                    r.default.apiRequest("POST", i.default.silentLogin, s, !0, {
                        disableRetry: !0
                    }).then(function(n) {
                        var r = n.user_info || {};
                        n.nickName = r.nick_name, n.avatarUrl = r.avatar_url, n.openId = r.open_id, n.createTime = Date.now(), 
                        t.default.saveUserInfo(n), n.user_info && Object.keys(n.user_info).length > 0 ? "function" == typeof e && e(n) : o.fetchUserInfo(function() {
                            var n = t.default.getUserLocalInfo();
                            "function" == typeof e && e(n);
                        });
                    }, function(e) {
                        "function" == typeof n && n(e);
                    });
                } else "function" == typeof n && n(u);
            },
            fail: function(e) {
                "function" == typeof n && n(e);
            }
        });
    },
    getUserInfo: function(e) {
        var t = this, n = this.getUserLocalInfo();
        n && n.nickName ? e && e(!0, n) : t.fetchUserInfo(function() {
            var n = t.getUserLocalInfo(), o = !(!n || !n.nickName);
            e && e(o, n);
        });
    },
    hasAccessToken: function() {
        return null != t.default.getAccessToken();
    },
    hasOpenId: function() {
        return null != t.default.getOpenId();
    },
    hasLogin: function() {
        return this.hasAccessToken();
    },
    getUserLocalInfo: function() {
        return t.default.getUserLocalInfo();
    },
    saveNickNameAndAvatarUrl: function(e) {
        e && t.default.setNickNameAndAvatarUrl(e);
    },
    logout: function() {
        t.default.clearUserLocalInfo();
    },
    getResultByScene: function(e) {
        var t = this.getGrade();
        return o.default.Result[t][e];
    },
    getShowPortalFreeTrialGoods: function() {
        return !!(this.getResultByScene(o.default.Scene.PortalFreeTrial) & y.PortalFreeTrial.Goods);
    },
    getShowPortalLotteryGoods: function() {
        return !!(this.getResultByScene(o.default.Scene.PortalLottery) & y.PortalLottery.Goods);
    },
    getShowGroupTitlePrefix: function() {
        return !!this.getResultByScene(o.default.Scene.ShowGroupTitlePrefix);
    },
    getShowShareTimeline: function() {
        return !!this.getResultByScene(o.default.Scene.ShowShareTimeline);
    },
    getGroupBuyButtonText: function() {
        return !!this.getResultByScene(o.default.Scene.GroupBuyButtonText);
    },
    getPromoteLotteryIcon: function() {
        return !!this.getResultByScene(o.default.Scene.LotteryRule);
    },
    getLotteryRule: function() {
        return this.getResultByScene(o.default.Scene.LotteryRule) ? "说明" : "";
    },
    getGrade: function() {
        var e = t.default.getEgrp();
        return null == e ? (n.default.reqUserAB(), o.default.Role.BanList) : e;
    },
    getUserProvinceId: l.default.wrap(p.default.mark(function e(o) {
        var r;
        return p.default.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (e.prev = 0, null != (r = t.default.getProvinceId())) {
                    e.next = 6;
                    break;
                }
                return e.next = 5, n.default.reqUserProvince(o);

              case 5:
                r = e.sent;

              case 6:
                return e.abrupt("return", r);

              case 9:
                e.prev = 9, e.t0 = e.catch(0), console.error(e.t0);

              case 12:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 0, 9 ] ]);
    })),
    getCompleteUserInfo: function(e, t, n) {
        function o(e) {
            v.loginType = 1, (0, l.default)(p.default.mark(function t() {
                var n;
                return p.default.wrap(function(t) {
                    for (;;) switch (t.prev = t.next) {
                      case 0:
                        return t.next = 2, g.default.getConfig("unauthorized_popup_order");

                      case 2:
                        I = t.sent, n = I ? "popup_order_1" : "popup_order_0", f.default.user_authorization_model_type = I, 
                        c.default.authApproveParams.ab_test = n, c.default.authRefuseParams.ab_test = n, 
                        c.default.authPromptParams.ab_test = n, c.default.authRecallImprParams.ab_test = n, 
                        c.default.authRecallApproveParams.ab_test = n, c.default.authRecallRefuseParams.ab_test = n, 
                        I && void 0 === u ? (I && (e = !1), d(null, e)) : (wx.getUserInfo({
                            success: function(t) {
                                s(t, e);
                            },
                            fail: function(t) {
                                d(t, e);
                            }
                        }), h(c.default.authPromptParams));

                      case 12:
                      case "end":
                        return t.stop();
                    }
                }, t, this);
            }));
        }
        var r = this, a = !!(n = n || {}).notShowSettingHint, i = void 0, u = void 0, s = function(n, o) {
            n && n.userInfo ? (i.nickName = n.userInfo.nickName, i.avatarUrl = n.userInfo.avatarUrl, 
            i.encryptedData = n.encryptedData, i.iv = n.iv, i.rawData = n.rawData, i.signature = n.signature, 
            "function" == typeof e && e(i)) : "function" == typeof t && t(n), o && (v.isClickWxAuthBtn = !0, 
            v.isClickWxDenyBtn = !1, h(c.default.authApproveParams));
        }, d = function(n, o) {
            wx.openSetting && !a ? r.showUserInfoModal(function(t) {
                t && (t.code = i.code), e(t);
            }, t, {
                needRetryGetUserInfo: !0
            }) : "function" == typeof t && t(n), o && (v.isClickWxAuthBtn = !1, v.isClickWxDenyBtn = !0, 
            h(c.default.authRefuseParams));
        };
        wx.login({
            complete: function(e) {
                e.code ? (i = {
                    code: e.code
                }, wx.getSetting ? wx.getSetting({
                    success: function(e) {
                        var t = !1;
                        e.authSetting && void 0 === e.authSetting["scope.userInfo"] && (t = !0, u = void 0), 
                        o(t);
                    },
                    error: function(e) {
                        "function" == typeof t && t(e);
                    }
                }) : o(!1)) : "function" == typeof t && t(e);
            }
        });
    },
    openSetting: function(e, t, n) {
        var o = this;
        if (n = n || {}, wx.openSetting) {
            var r = !!n.needRetryGetUserInfo, a = {};
            wx.openSetting({
                success: function(n) {
                    var i = !!(n.authSetting || {})["scope.userInfo"];
                    a.authUserInfo = i, r ? i ? o.getCompleteUserInfo(e, t) : "function" == typeof t && t(n) : "function" == typeof e && e(a);
                },
                fail: function(e) {
                    "function" == typeof t && t(e);
                }
            });
        } else "function" == typeof t && t({});
    },
    showUserInfoModal: function(e, t, n) {
        var o = this;
        wx.canIUse && wx.canIUse("button.open-type.getUserInfo") ? o.hasLogin() || f.default.CPPage.$showUserAuthorizeModal(function(t) {
            v.isClickWxAuthBtn = !0, v.isClickPddOKBtn = !0, e(t);
        }, function(e) {
            e && e.wx_deny ? (v.isClickWxDenyBtn = !0, v.isClickPddOKBtn = !0) : v.isClickPddCancelBtn = !0, 
            t();
        }) : this.showAuthorizeModelDialog("scope.userInfo", e, t, n);
    },
    saveImageToPhotosAlbum: function(e) {
        return new d.default(function(t, n) {
            e && 0 != e.length || n(), wx.saveImageToPhotosAlbum ? wx.saveImageToPhotosAlbum({
                filePath: e,
                success: t,
                fail: n
            }) : n();
        });
    },
    authorize: function(e, t) {
        return new d.default(function(n, o) {
            e && 0 != e.length && "string" == typeof e || o(), wx.getSetting && wx.authorize ? wx.getSetting({
                success: function(o) {
                    o.authSetting[e] ? n(!0) : (void 0 === o.authSetting[e] && "function" == typeof t && t(), 
                    wx.authorize({
                        scope: e,
                        success: function() {
                            n(!0);
                        },
                        fail: function() {
                            n(!1);
                        }
                    }));
                }
            }) : n(!1);
        });
    },
    fetchUserInfo: function(e) {
        this.hasLogin() ? r.default.apiRequest("GET", i.default.fetchUserInfo, {}, !1).then(function(n) {
            var o = t.default.getUserLocalInfo();
            n && (n.nickname && (o.nickName = n.nickname), n.avatar && (o.avatarUrl = n.avatar), 
            n.gender && (o.gender = n.gender), n.address && (o.country = n.address.country, 
            o.province = n.address.province, o.city = n.address.city), t.default.saveUserLocalInfo(o)), 
            e(!0);
        }).catch(function(t) {
            e(!1), console.error(t);
        }) : e && e(!1);
    },
    uploadUserInfo: function(e, t) {
        this.hasLogin() ? r.default.apiRequest("POST", i.default.updateUserInfo, e, !1).then(function(e) {
            t(e.result);
        }).catch(function(e) {
            t(!1), console.error(e);
        }) : t && t(!1);
    },
    showAuthorizeModelDialog: function(e, t, n, o) {
        var r = {
            "scope.userInfo": [ "用户信息", "公开信息（昵称、头像等）" ],
            "scope.userLocation": [ "地理位置", "地理位置" ],
            "scope.address": [ "通讯地址", "通讯地址" ],
            "scope.invoiceTitle": [ "发票抬头", "发票抬头" ],
            "scope.werun": [ "微信运动步数", "微信运动步数" ],
            "scope.record": [ "录音功能", "录音功能" ],
            "scope.writePhotosAlbum": [ "保存到相册", "相册 (保存图片)" ]
        };
        if (r.hasOwnProperty(e)) {
            var a = "", i = r[e];
            a = wx.openSetting ? "需要访问您的" + i[1] + "，请到小程序的设置中打开" + i[0] + "授权" : "需要访问您的" + i[1] + "，请升级微信到最新版本，在小程序的设置中打开" + i[0] + "授权";
            var u = this;
            wx.showModal({
                title: "信息授权提示",
                confirmText: wx.openSetting ? "去设置" : "确定",
                content: a,
                success: function(e) {
                    e.confirm ? (u.openSetting(t, n, o), h({
                        op: "click",
                        page_section: "setup_prompt",
                        page_element: "setting"
                    })) : ("function" == typeof n && n(e), h({
                        op: "click",
                        page_section: "setup_prompt",
                        page_element: "cancel"
                    }));
                }
            }), h({
                op: "impr",
                page_section: "setup_prompt"
            });
        } else "function" == typeof n && n();
    }
};

exports.default = _;