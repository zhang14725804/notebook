function e(e) {
    return f.info("getLoginPromise"), r() && !e ? (f.info("is login"), new u(function(e, n) {
        e(p.success);
    })) : (m || (m = new u(function(e, o) {
        f.info("wx login"), wx.login({
            success: function(t) {
                f.info("log success");
                var r = t.code;
                i().then(function(i) {
                    n(r, i).then(function() {
                        m = null, l.umpBiz({
                            bizid: "649",
                            operation: 1,
                            result: "0",
                            message: ""
                        }), e(p.success);
                    }).catch(function(e) {
                        m = null, l.umpBiz({
                            bizid: "649",
                            operation: 1,
                            result: "2",
                            message: "wxsq login fail:" + e
                        }), o(p.wxsqLoginFail);
                    });
                }).catch(function(i) {
                    200 != i ? n(r).then(function() {
                        m = null, l.umpBiz({
                            bizid: "649",
                            operation: 1,
                            result: "0",
                            message: ""
                        }), e(p.success1);
                    }).catch(function() {
                        i == p.authDeny ? (l.umpBiz({
                            bizid: "649",
                            operation: 1,
                            result: "5",
                            message: ""
                        }), x && (wx.showModal({
                            title: "提示",
                            content: "该页面需要获取您的昵称等公开信息，请到小程序的设置中打开用户授权!",
                            showCancel: !0,
                            align: "left",
                            cancelText: "下次再说",
                            confirmText: "重新授权",
                            cancelColor: "#E93B3D",
                            confirmColor: "#3cc51f",
                            success: function(e) {
                                e.confirm && wx.openSetting({
                                    success: function(e) {}
                                });
                            }
                        }), setTimeout(function() {
                            m = null;
                        }, 2e3)), o(p.authDeny)) : (m = null, l.umpBiz({
                            bizid: "649",
                            operation: 1,
                            result: "3",
                            message: ""
                        }), o(p.wxsqLoginFail));
                    }) : o(p.frozenLoginFail);
                });
            },
            fail: function(e) {
                f.error("wx login fail", e.errMsg), l.umpBiz({
                    bizid: "649",
                    operation: 1,
                    result: "1",
                    message: "wx.login fail:" + e.errMsg
                }), m = null, o(p.fail);
            }
        });
    })), m);
}

function n(e, n) {
    return f.info("wqLogin", e), new u(function(i, t) {
        a.default.get("wqLoginOu", "").then(function(r) {
            var u = {
                code: e,
                ou: r,
                appid: getApp().appId
            };
            n && (u.encrytData = n.encryptedData, u.signature = n.signature, u.rawData = n.rawData, 
            u.iv = n.iv), c.get({
                url: "https://wq.jd.com/mlogin/wxapp/login_lt",
                data: u
            }).then(function(e) {
                var n = e.body, r = (e.header, n.info);
                if (!r) return l.umpBiz({
                    bizid: "649",
                    operation: 3,
                    result: "2",
                    message: "wxsq login fail: info is emtpy"
                }), void t(p.wxsqLoginFail);
                var u = {};
                if (u.wid = r.wid, u.open_id = r.wxopenid, u.unionid = r.unionid, u.wq_unionid = r.unionid, 
                u.skey = r.skey, u.pin = r.pin, u.wxapp_openid = r.openid, 200 != n.retCode && 201 != n.retCode && o(u), 
                u.ou = r.ou, a.default.set("wqLoginOu", r.ou, {
                    expire: "365d"
                }).catch(function() {
                    f.error("wqLoginOu写storage失败");
                }), (0, require("../user_info.js").updateUserData)(u), [ 0, 100, 101, 102 ].indexOf(n.retCode) >= 0) l.umpBiz({
                    bizid: "649",
                    operation: 3,
                    result: "0",
                    message: ""
                }), i(p.success); else {
                    l.umpBiz({
                        bizid: "649",
                        operation: 200 == n.retCode || 201 == n.retCode ? 0 : 3,
                        result: n.retCode,
                        message: "wxsq login fail: " + n.retCode
                    });
                    var c = getCurrentPages(), m = c[c.length - 1].route, w = 2 == s.getCookie("wxapp_type") ? "pages/pingou/index/index" : "pages/index/index";
                    if (200 == n.retCode && m != w) {
                        var x = d.base64encode(encodeURIComponent(n.info.pin)), h = m, q = n.info.isDefaultAssets, y = d.base64encode(encodeURIComponent(n.info.otherpin));
                        2 == q ? g.goto("/pages/my_pages/account/account", {
                            rurl: h,
                            sceneid: 521192480,
                            frozen: 2,
                            loginData: u
                        }, "redirectTo") : g.goto("/pages/my_pages/frozenaccount/frozenaccount", {
                            name: x,
                            rurl: h,
                            isDefaultAssets: q,
                            otherPin: y,
                            data: u
                        }, "redirectTo");
                    }
                    if (201 == n.retCode && m != w) {
                        var z = {
                            rurl: App.accountReturnUrl ? App.accountReturnUrl : 0 == m.indexOf("pages") ? "/" + m : m,
                            sceneid: 521392590,
                            force: 1,
                            loginData: u
                        };
                        App.accountReturnUrl = "", g.goto("/pages/my_pages/account/account", z);
                    }
                    t(n.retCode);
                }
            }).catch(function(e) {
                e.code;
                var n = e.message;
                l.umpBiz({
                    bizid: "649",
                    operation: 3,
                    result: "999",
                    message: "wxsq login fail: " + n
                }), t(p.wxsqLoginFail);
            });
        });
    });
}

function i(e) {
    f.info("getUserInfo");
    var n = require("../user_info.js").updateUserData;
    return new u(function(e, i) {
        wx.getUserInfo({
            success: function(i) {
                f.info("getUserInfo success");
                var o = i.userInfo, t = {
                    gender: o.gender,
                    province: o.province,
                    city: o.city,
                    country: o.country,
                    wxNickName: o.nickName,
                    wxAvatarUrl: o.avatarUrl,
                    nickName: o.nickName,
                    avatarUrl: o.avatarUrl
                };
                n(t), s.setCookie({
                    data: t,
                    defaultExpires: !0
                }), x = !1, l.umpBiz({
                    bizid: "649",
                    operation: 2,
                    result: 0,
                    message: ""
                }), e(i);
            },
            fail: function(e) {
                f.error("wx getUserInfo fail", e);
                var o = {
                    gender: 1,
                    province: "Guangdong",
                    city: "Shenzhen",
                    country: "China",
                    nickName: "JD用户",
                    avatarUrl: "https://img11.360buyimg.com/jdphoto/s120x120_jfs/t13840/48/224229347/6400/4eec0fe2/5a0697abN8a425d5c.png",
                    wxNickName: "JD用户",
                    wxAvatarUrl: "https://img11.360buyimg.com/jdphoto/s120x120_jfs/t13840/48/224229347/6400/4eec0fe2/5a0697abN8a425d5c.png"
                };
                n(o), s.setCookie({
                    data: o,
                    defaultExpires: !0
                });
                var t = e.errMsg || "";
                -1 != t.includes(function(e) {
                    return "auth" == e;
                }) && -1 != t.includes(function(e) {
                    return "fail" == e;
                }) ? (l.umpBiz({
                    bizid: "649",
                    operation: 2,
                    result: 5,
                    message: "wx.getUserInfo fail: " + t
                }), x = !0, i(p.authDeny)) : (x = !1, l.umpBiz({
                    bizid: "649",
                    operation: 2,
                    result: 1,
                    message: "wx.getUserInfo fail: " + t
                }), i(p.getUserInfoFail));
            }
        });
    });
}

function o(e) {
    e.jdpin = e.pin, e.wq_uin = e.wid, e.wq_skey = e.skey, e.cid = "5", s.setCookie({
        data: e,
        defaultExpires: !0
    });
}

function t() {
    return x ? new u(function(e, n) {
        n(p.authDeny);
    }) : m || (Date.now() - w < 3e3 ? (w = Date.now(), new u(function(e, n) {
        n(p.beyondMaxLoginCount);
    })) : (w = Date.now(), e(!0)));
}

function r() {
    var e = s.getCookie("wq_uin"), n = s.getCookie("wq_skey");
    return e && n;
}

var a = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../localStorage")), s = require("../cookie-v2/cookie.js"), u = require("../../libs/promise.min.js"), c = require("../request/request.js"), l = require("../fe_report/usability.js"), f = new (require("../logger.js"))("login"), g = require("../navigator.js"), d = require("../base64/base64.js"), p = (require("../address_api/address_api.js"), 
{
    success: 0,
    success1: 1,
    fail: -1,
    getUserInfoFail: -2,
    wxsqLoginFail: -3,
    beyondMaxLoginCount: -4,
    authDeny: -5,
    frozenLoginFail: -6
}), m = null, w = 0, x = !1;

module.exports = {
    getLoginPromise: e,
    doLogin: t,
    isLogin: r,
    afterLogin: function(n) {
        for (var i = arguments.length, o = Array(i > 1 ? i - 1 : 0), r = 1; r < i; r++) o[r - 1] = arguments[r];
        return e().then(function(e) {
            return n.apply(void 0, o);
        }).catch(function(e) {
            return 1 != e.code ? u.reject(e) : t().then(function(e) {
                return n.apply(void 0, o);
            });
        });
    }
};