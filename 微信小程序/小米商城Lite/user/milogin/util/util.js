function e(e) {
    var o = "";
    for (var t in e) o += t + "=" + e[t] + ";";
    return o;
}

function o(e) {
    wx.getUserInfo({
        withCredentials: !0,
        success: function(o) {
            wx.setStorageSync("userInfo", o), "function" == typeof e && e(o, null);
        },
        fail: function(e) {
            wx.getStorageSync("getWXUserInfoFail") || (wx.navigateTo({
                url: "/pages/common/authorize/index"
            }), wx.setStorageSync("getWXUserInfoFail", "1"));
        }
    });
}

function t(e) {
    wx.login({
        success: function(o) {
            if (o.code) "function" == typeof e && e(o.code, null); else if (!o.code) return void r.showTipsSwitchTab("用户授权失败", "/pages/index/index");
        },
        fail: function(e) {
            wx.navigateTo({
                url: "/pages/common/authorize/index"
            });
        }
    });
}

function a(i, r) {
    var l = {
        wxSToken: i.wxSToken,
        userInfo: encodeURIComponent(JSON.stringify(i.userInfo))
    };
    if (i.phoneIV && i.phoneData) w = {
        phoneIV: i.phoneIV,
        sid: i.sid,
        appid: i.appid,
        callback: i.callback || "",
        authType: i.authType,
        phoneData: i.phoneData
    }; else var w = {
        phone: i.phone,
        sid: i.sid,
        appid: i.appid,
        callback: i.callback || "",
        authType: i.authType,
        ticket: i.ticket
    };
    wx.request({
        method: "POST",
        url: p[u].root + "/pass/sns/wxapp/v2/ticketLogin",
        data: w,
        header: {
            "content-type": "application/x-www-form-urlencoded",
            cookie: e(l)
        },
        success: function(e) {
            if (10031 != e.data.code && 21327 != e.data.code) {
                var u = f[e.data.code] || null;
                if (e.data && 0 == e.data.code) d.storageData.serviceToken = e.data.serviceToken, 
                t(function(t, a) {
                    o(function(o) {
                        d.request("user/loguser", {
                            code: t
                        }, function(o, t) {
                            t || (d.storageData.user_token = o.data ? o.data.user_token : "", wx.setStorage({
                                key: "loginInfo",
                                data: d.storageData
                            }), "function" == typeof r && r(e.data, u));
                        });
                    });
                }); else if (e.data && e.data.code) switch (e.data.code) {
                  case 24005:
                  case 24013:
                  case 10013:
                  case 20023:
                  case 70008:
                  case 70022:
                  case 70014:
                  case 70016:
                    "function" == typeof r && r({}, f[e.data.code]);
                    break;

                  default:
                    "function" == typeof r && r({}, "网络请求失败，请稍后再试～");
                }
            } else t(function(e, t) {
                t || o(function(o) {
                    var t = o;
                    d || (d = getApp());
                    var u = {
                        sid: d.appInfo.sid,
                        appid: d.appInfo.appid,
                        code: e,
                        userInfo: t
                    };
                    d.storageData.userInfo = o.userInfo, n(u, function(e, o) {
                        if (o) "function" == typeof r && r(o); else if (0 === e.code) {
                            var t = e.data.wxSToken;
                            d.storageData.wxSToken = t, d.storageData.openId = e.data.openId, d.storageData.openId && (d.storageData.xm_open_id = s.aes(c.keyStr, d.storageData.openId)), 
                            a(i, r);
                        }
                    });
                });
            });
        },
        fail: function(e) {
            "function" == typeof r && r({}, f.network);
        }
    });
}

function n(o, t) {
    var a = {
        userInfo: encodeURIComponent(JSON.stringify(o.userInfo))
    }, n = {
        code: o.code,
        appid: o.appid,
        sid: o.sid
    };
    wx.request({
        method: "POST",
        url: p[u].root + "/pass/sns/wxapp/v2/code",
        data: n,
        header: {
            "content-type": "application/x-www-form-urlencoded",
            cookie: e(a)
        },
        success: function(e) {
            var o = null;
            o = 401 === e.statusCode ? "MiPassport:请确认已经将向帐号组申请了权限" : 403 === e.statusCode ? "MiPassport:sid填写错误，需为真实的sid。请确认sid,appid及env填写正确" : f[e.data.code] || null, 
            "function" == typeof t && t(e.data, o);
        },
        fail: function(e) {
            "function" == typeof t && t({}, f.network);
        }
    });
}

function i(o, t) {
    var a = {
        wxSToken: o.wxSToken,
        userInfo: encodeURIComponent(JSON.stringify(o.userInfo))
    }, n = {
        appid: o.appid,
        sid: o.sid,
        authType: o.authType,
        callback: o.callback || ""
    };
    wx.request({
        method: "POST",
        url: p[u].root + "/pass/sns/wxapp/v2/tokenLogin",
        data: n,
        header: {
            "content-type": "application/x-www-form-urlencoded",
            cookie: e(a)
        },
        success: function(e) {
            var o = f[e.data.code] || null;
            wx.setStorageSync("ssecurity", e.data.ssecurity), "function" == typeof t && t(e.data, o);
        },
        fail: function(e) {
            "function" == typeof t && t({}, f.network);
        }
    });
}

var s = require("../../../util/aes.js"), r = require("../../../util/util.js"), c = require("../../../util/conf.js"), d = getApp(), u = c.conf.env, p = {
    dev: {
        root: "http://account.preview.n.xiaomi.net"
    },
    pro: {
        root: "https://account.xiaomi.com"
    }
}, f = {
    10031: "wxSToken字段不合法",
    20509: "获取小米帐号信息失败",
    20522: "关联微信帐号失败",
    21327: "wxSToken过期",
    24002: "获取社交网站个人资料时失败",
    10001: "系统错误",
    96013: "授权码无效",
    24001: "MiPassport:appid无效,请确定填写的appid是本小程序的appid",
    247007: "对社交网站处理失败",
    10017: "authType字段不合法",
    24005: "微信已关联小米帐号",
    24013: "帐号上已关联了其他微信帐号，不能关联",
    10013: "此手机对应的小米帐号已经注销或者被禁用",
    20023: "半年内解绑绑定次数已达3次",
    70008: "手机号格式错误",
    70022: "您今天已经发送太多短信，请换个时间或改用其他验证方式",
    70014: "短信验证码错误",
    70016: "用户名密码错误",
    codeFail: "获取code失败",
    network: "网络连接失败"
};

module.exports = {
    validateUser: function(e) {
        e = (e + "").replace(/\s+/, "");
        var o = {
            miid: /^\d{3,}/.test(e),
            phoneLike: /^\d{6,}$/.test(e),
            phone: /^\++\d{6,}$/.test(e) || /^0{2}\d{6,}/.test(e),
            emailLike: -1 !== (e + "").indexOf("@"),
            email: /^[\w.\-]+@(?:[A-Za-z0-9]+(?:-[A-Za-z0-9]+)*\.)+[A-Za-z]{2,6}$/.test(e),
            nonum: /[^0-9]/.test(e)
        };
        return !!(o.phoneLike || o.phone || o.email || o.miid) && o;
    },
    validatePhone: function(e) {
        return e = (e + "").replace(/\s+/, ""), /^1(2|3|4|5|7|8)\d{9}$/.test(e);
    },
    extend: function(e, o) {
        var t = {};
        for (var a in o) a in t || (e[a] = o[a]);
        return e;
    },
    concatCookie: e,
    getWXUserInfo: o,
    getWXCode: t,
    sendTicket: function(o, t) {
        var a = {
            wxSToken: o.wxSToken
        }, n = {
            phone: o.phone,
            sid: o.sid
        };
        wx.request({
            method: "POST",
            url: p[u].root + "/pass/sns/wxapp/v2/sendTicket",
            data: n,
            header: {
                "content-type": "application/x-www-form-urlencoded",
                cookie: e(a)
            },
            success: function(e) {
                var o = f[e.data.code] || null;
                "function" == typeof t && t(e.data, o);
            },
            fail: function(e) {
                "function" == typeof t && t({}, f.network);
            }
        });
    },
    ERR_MSG: f,
    wxSnsLogin: n,
    smslogin: a,
    pwdlogin: function(a, n) {
        var i = {
            wxSToken: a.wxSToken,
            userInfo: encodeURIComponent(JSON.stringify(a.userInfo))
        }, s = {
            user: a.user,
            sid: a.sid,
            appid: a.appid,
            callback: a.callback || "",
            authType: a.authType,
            hash: a.hash
        };
        wx.request({
            method: "POST",
            url: p[u].root + "/pass/sns/wxapp/v2/pwdLogin",
            data: s,
            header: {
                "content-type": "application/x-www-form-urlencoded",
                cookie: e(i)
            },
            success: function(e) {
                var a = f[e.data.code] || null;
                e.data && 0 == e.data.code ? (d.storageData.serviceToken = e.data ? e.data.serviceToken : "", 
                t(function(t, i) {
                    o(function(o, i) {
                        d.request("user/loguser", {
                            code: t
                        }, function(o, t) {
                            t || (d.storageData.user_token = o.data ? o.data.user_token : "", wx.setStorage({
                                key: "loginInfo",
                                data: d.storageData
                            }), "function" == typeof n && n(e.data, a));
                        });
                    });
                })) : e.data && 24013 == e.data.code && wx.showToast({
                    title: "该账号和已经绑定的社交账号冲突",
                    icon: "none",
                    duration: 2e3
                });
            },
            fail: function(e) {
                "function" == typeof n && n({}, f.network);
            }
        });
    },
    checkSMSQuota: function(e, o) {
        var t = {
            address: e,
            contentType: 160033,
            userId: -1
        };
        wx.request({
            method: "POST",
            url: p[u].root + "/pass/sms/quota",
            data: t,
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            success: function(e) {
                var t = JSON.parse((e.data + "").replace("&&&START&&&", ""));
                "function" == typeof o && o(t, null);
            },
            fail: function(e) {
                "function" == typeof o && o({}, f.network);
            }
        });
    },
    tokenLogin: i,
    login: function(e, a, r) {
        d || (d = getApp()), d.conf.callback = a, t(function(a, u) {
            u ? console.error(error) : o(function(u) {
                var p = u, f = {
                    sid: d.appInfo.sid,
                    appid: d.appInfo.appid,
                    code: a,
                    userInfo: p
                };
                d.storageData.userInfo = u.userInfo, n(f, function(n, u) {
                    if (u) return console.error(u), void ("function" == typeof r && r(u));
                    if (0 === n.code) {
                        var f = n.data.wxSToken;
                        d.storageData.wxSToken = f, d.storageData.openId = n.data.openId, d.storageData.openId && (d.storageData.xm_open_id = s.aes(c.keyStr, d.storageData.openId)), 
                        i({
                            code: a,
                            sid: d.appInfo.sid,
                            appid: d.appInfo.appid,
                            callback: "",
                            authType: d.appInfo.authType,
                            wxSToken: d.storageData.wxSToken,
                            userInfo: p
                        }, function(a, n) {
                            if (n) return console.error(n), void ("function" == typeof r && r(n));
                            if (0 === a.code) {
                                var i = d.storageData.vid;
                                d.storageData.serviceToken = a.serviceToken || "", d.storageData.location = a.location || "", 
                                d.storageData.userId = a.userId, d.storageData.vid = "", d.storageData.vToken = "", 
                                d.storageData.loginEnd = !0, t(function(e, t) {
                                    o(function(t, n) {
                                        d.request("user/loguser", {
                                            code: e
                                        }, function(e, t) {
                                            t || (d.storageData.user_token = e.data ? e.data.user_token : "", wx.setStorage({
                                                key: "loginInfo",
                                                data: d.storageData
                                            }), "function" == typeof r && r(), i && o(function(e, o) {
                                                if (!o) {
                                                    var t = e.encryptedData, n = e.iv;
                                                    d.request("user/bindVisitor", {
                                                        vid: i,
                                                        user_id: a.userId,
                                                        encrypted_data: t,
                                                        iv: n
                                                    }, function(e, o) {});
                                                }
                                            }));
                                        });
                                    });
                                });
                            } else if (20003 === a.code) {
                                if (e) return void wx.navigateTo({
                                    url: d.conf.loginPage
                                });
                                "function" == typeof r && r();
                            }
                        });
                    }
                });
            });
        });
    }
};