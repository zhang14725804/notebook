Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = require("../../util/conf.js"), t = require("../../util/util.js"), o = (require("../../util/aes.js"), 
require("../../user/visitor/util/util.js"), require("../../user/milogin/util/util.js")), n = {
    install: function(n) {
        arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
        n.$user = function() {
            var r = n;
            return {
                post: function(t) {
                    var o = e.passportRoot[e.conf.env].root, n = r.$http.concatCookie(t.cookie) || r.getCookie(t.url) + ";" + r.$http.concatCookie(t.externalCookie || {});
                    return t.config = t.config || {}, new Promise(function(e, r) {
                        wx.request({
                            url: o + t.url,
                            method: t.method || "POST",
                            data: t.data || {},
                            header: Object.assign({
                                "content-type": "application/x-www-form-urlencoded",
                                cookie: n
                            }, t.config),
                            success: function(t) {
                                t.statusCode >= 200 && t.statusCode < 300 || 304 == t.statusCode ? e(t.data) : r(t);
                            },
                            fail: function(e) {
                                r(e), wx.redirectTo({
                                    url: "/pages/common/index"
                                });
                            }
                        });
                    });
                },
                checkXmSession: function() {
                    return new Promise(function(e, t) {
                        var o = wx.getStorageSync("loginInfo");
                        o.user_token && o.serviceToken ? r.$http.post({
                            url: "user/checkSession",
                            notNeedAuth: !0
                        }).then(function(t) {
                            if (t) switch (t.code) {
                              case 0:
                                e(0);
                                break;

                              case 10001002:
                                e(1);
                                break;

                              case 10001008:
                                e(2);
                            }
                        }).catch(function(e) {
                            t(e);
                        }) : e(1);
                    });
                },
                passportLogin: function(e) {
                    return new Promise(function(t) {
                        r.$user.passportWxstokenLogin(e).then(r.$user.passportserviceTokenLogin).then(r.$user.getUserToken).then(r.$visitor.bindVisitor).then(function() {
                            return t();
                        }).catch(function(e) {
                            "noServiceToken" == e.errorType && r.$visitor.visitorRegister().then(r.$visitor.visitorLogin).then(r.$user.getUserToken).then(r.$visitor.bindVisitor).then(function() {
                                return t();
                            });
                        });
                    });
                },
                passportWxstokenLogin: function(e) {
                    return new Promise(function(n, i) {
                        r.$http.wxLogin().then(function(e) {
                            return new Promise(function(t, o) {
                                r.$http.getWxUserInfo().then(function(o) {
                                    r.storageData.userInfo = o && o.userInfo, t({
                                        code: e,
                                        userInfo: o
                                    });
                                });
                            });
                        }).then(function(i) {
                            var s = {
                                userInfo: encodeURIComponent(JSON.stringify(i.userInfo))
                            };
                            r.$user.post({
                                url: "/pass/sns/wxapp/v2/code",
                                data: {
                                    sid: r.appInfo.sid,
                                    appid: r.appInfo.appid,
                                    code: i.code
                                },
                                externalCookie: s
                            }).then(function(o) {
                                0 == o.code ? (r.storageData.wxSToken = o.data.wxSToken, n({
                                    sid: r.appInfo.sid,
                                    appid: r.appInfo.appid,
                                    callback: "",
                                    authType: r.appInfo.authType,
                                    wxSToken: r.storageData.wxSToken,
                                    userInfo: i.userInfo,
                                    option: e
                                })) : t.showError("服务异常，请稍后再试～");
                            }).catch(function(e) {
                                var t = null;
                                e && (t = 401 === e.statusCode ? "MiPassport:请确认已经将向帐号组申请了权限" : 403 === e.statusCode ? "MiPassport:sid填写错误，需为真实的sid。请确认sid,appid及env填写正确" : o.ERR_MSG[res.data.code] || null), 
                                console.log(t);
                            });
                        });
                    });
                },
                passportserviceTokenLogin: function(e) {
                    return new Promise(function(t, o) {
                        var n = {
                            wxSToken: e.wxSToken,
                            userInfo: encodeURIComponent(JSON.stringify(e.userInfo))
                        };
                        r.$user.post({
                            url: "/pass/sns/wxapp/v2/tokenLogin",
                            data: {
                                appid: r.appInfo.appid,
                                sid: r.appInfo.sid,
                                callback: "",
                                authType: r.appInfo.authType
                            },
                            externalCookie: n
                        }).then(function(n) {
                            if (0 === n.code) {
                                var i = r.storageData.vid || "";
                                r.storageData.serviceToken = n.serviceToken || "", r.storageData.location = n.location || "", 
                                r.storageData.userId = n.userId, r.storageData.vid = "", r.storageData.vToken = "", 
                                r.storageData.loginEnd = !0, wx.setStorageSync("serviceToken", r.storageData.serviceToken), 
                                t({
                                    serviceToken: r.storageData.serviceToken,
                                    vid: i,
                                    userId: n.userId
                                });
                            } else 20003 === n.code ? (e.option && e.option.isForceToRedirect && wx.navigateTo({
                                url: r.conf.loginPage
                            }), o({
                                errorType: "noServiceToken",
                                vid: r.storageData.vid
                            })) : o({
                                errorType: "noServiceToken",
                                vid: r.storageData.vid
                            });
                        });
                    });
                },
                getUserToken: function(e) {
                    return new Promise(function(t, o) {
                        r.$http.wxLogin().then(function(o) {
                            r.$http.getWxUserInfo().then(function(n) {
                                r.$http.post({
                                    url: "user/loguser",
                                    data: {
                                        code: o
                                    }
                                }).then(function(o) {
                                    0 == o.code && (r.storageData.user_token = o.data ? o.data.user_token : "", wx.setStorage({
                                        key: "loginInfo",
                                        data: r.storageData
                                    }), t({
                                        vid: e.vid,
                                        userId: e.userId
                                    }));
                                });
                            });
                        });
                    });
                },
                checkVisitorIsUnbindXmAccount: function() {
                    return new Promise(function(e, t) {
                        r.$http.post({
                            url: "user/checkvisitor"
                        }).then(function(t) {
                            var o = wx.getStorageSync("timestampOfChangeingVirtualAccount") || 0, n = new Date().getTime();
                            e(t && t.data && 1 == t.data.length && t.data[0].is_ever_bind && n - o > 12e4 ? !0 : !1);
                        }).catch(function(e) {
                            t(e);
                        });
                    });
                },
                changeToVirtualAccount: function() {
                    return new Promise(function(e) {
                        r.storageData.userId = "", r.storageData.serviceToken = "", r.$visitor.visitorRegister().then(function(t) {
                            wx.setStorageSync("checkout:address", ""), wx.setStorageSync("timestampOfChangeingVirtualAccount", new Date().getTime());
                            var o = getCurrentPages(), n = "/" + o[o.length - 1].route;
                            e(!0), wx.reLaunch({
                                url: n
                            });
                        }).then(r.$visitor.visitorLogin).then(r.$user.getUserToken).then(r.$visitor.bindVisitor).then(function() {
                            return e(!0);
                        }).catch(function(t) {
                            e(!1);
                        });
                    });
                }
            };
        }();
    }
};

exports.default = n;