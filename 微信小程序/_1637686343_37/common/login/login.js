function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function t() {
    return new f.default(function(e, t) {
        wx.login({
            success: function(t) {
                e(t);
            },
            fail: function(e) {
                t(e);
            }
        });
    });
}

function n() {
    var e = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0];
    return new f.default(function(t, n) {
        wx.getUserInfo({
            withCredentials: e,
            success: function(e) {
                t(e);
            },
            fail: function(e) {
                n(e);
            }
        });
    });
}

function o(e) {
    wx.authorize({
        scope: "scope.userInfo",
        success: function() {
            e && "function" == typeof e && e();
        },
        fail: function() {
            wx.showModal({
                title: "获取用户信息授权",
                content: "微信登录需要获取您的用户信息，请前往设置页打开用户信息授权",
                confirmText: wx.openSetting ? "去设置" : "知道了",
                success: function(e) {
                    e.confirm && wx.openSetting ? wx.openSetting({
                        success: function(e) {
                            e.authSetting["scope.userInfo"];
                        }
                    }) : e.cancel;
                }
            });
        }
    });
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var i = e(require("config")), r = e(require("constant")), c = e(require("session")), u = e(require("../utils/RSA/rsaUtil")), f = e(require("../polyfill/promise")), s = e(require("../user/user")), a = i.default.host + "/apis/thirdparty/weichat_program_login.action", d = i.default.host + "/apis/reglogin/mobile_login.action", l = i.default.host + "/apis/user/info.action", p = function(e, t) {
    c.default.Session.get(c.default.SESSION_AUTH_KEY) ? wx.checkSession({
        success: function() {
            "function" == typeof e && e();
        },
        fail: function() {
            "function" == typeof t && t();
        }
    }) : "function" == typeof t && t();
}, g = function(e, o) {
    t().then(function(t) {
        n().then(function(e) {
            return e;
        }, function(e) {
            wx.showToast({
                title: "用户拒绝提供信息",
                icon: "fail"
            });
        }).then(function(n) {
            var i = {
                code: t.code,
                encryptedData: n.encryptedData,
                iv: n.iv
            };
            i.ptid = r.default.ptid, i.agenttype = r.default.agenttype, i.verifyPhone = 1, i.qd_sc = u.default.getQiyiQtsc(i), 
            wx.request({
                url: a,
                data: i,
                method: "POST",
                header: {
                    "content-type": "application/x-www-form-urlencoded"
                },
                success: function(t) {
                    "function" == typeof e && e(t.data, n);
                },
                fail: function(e) {
                    "function" == typeof o && o(e);
                }
            });
        });
    }, function(e) {
        "function" == typeof o && o(e);
    });
}, w = {
    A00001: "系统错误",
    A00002: "参数错误",
    A00003: "HTTP方法不支持",
    A00004: "图片未找到",
    A00005: "静态校验失败",
    A00006: "风控动态校验失败",
    A00007: "超过最大错误校验次数"
}, h = [ "P00100", "P00102", "P00101", "P00105", "P00106", "P00108" ], y = "P00119", m = "P00125", P = "P00141";

exports.default = {
    login: function(e, t, o) {
        p(function() {
            n().then(function(e) {
                return e;
            }, function(e) {
                wx.showToast({
                    title: "用户拒绝提供信息",
                    icon: "fail"
                });
            }).then(function(t) {
                "function" == typeof e && e(t);
            });
        }, function() {
            g(t, o);
        });
    },
    normalLogin: function(e) {
        var t = Object.assign({}, e, {
            ptid: r.default.ptid,
            agenttype: r.default.agenttype,
            device_id: s.default.getAnonymousUid(),
            QC005: s.default.getAnonymousUid()
        });
        return new f.default(function(e, n) {
            wx.request({
                url: d,
                data: t,
                method: "POST",
                header: {
                    "content-type": "application/x-www-form-urlencoded"
                },
                success: function(t) {
                    var n = t.data;
                    n && "A00000" == n.code ? ("1" == n.data.highrisk_state && (n.data.success = "highrisk"), 
                    e(n)) : n && (n.msg = w[n.msg] || n.msg || "登录失败！", "P00108" === n.code ? (n.error = "register", 
                    n.msg = "这个账户还没有注册过") : h.indexOf(n.code) > -1 ? n.error = "usernameError" : "P00117" === n.code ? n.error = "passwordError" : "P00806" === n.code ? n.error = "bindPhone" : "P00807" === n.code ? n.error = "verifyPhone" : n.code === y ? (n.error = "forgetPwd", 
                    n.msg = "") : n.code === m ? n.error = "forgetPwd" : n.code === P ? n.error = "pwdLock" : "P00908" === n.code ? n.error = "deviceLoack" : "P00159" === n.code ? n.error = "hrisk" : n.data && 1 == n.data.needcode ? 4 == n.data.imgtype ? n.error = "slideVerify" : 1 != n.data.imgtype && 2 != n.data.imgtype || (n.error = "verifyCode") : "" != n.msg && "A00007" === n.msg ? n.error = "verifyCode" : n.error = "stopWarning", 
                    e(n));
                },
                fail: function(e) {
                    n(e, null);
                }
            });
        });
    },
    getWxUserInfo: n,
    authorize: function(e) {
        setTimeout(function() {
            wx.getSetting ? wx.getSetting({
                success: function(t) {
                    t.authSetting["scope.userInfo"] ? e && "function" == typeof e && e() : o(e);
                }
            }) : o(e);
        }, 50);
    },
    getUserInfo: function(e) {
        return new f.default(function(t, n) {
            wx.request({
                url: l,
                method: "POST",
                header: {
                    "content-type": "application/x-www-form-urlencoded"
                },
                data: e,
                success: function(e) {
                    t(e);
                },
                fail: function(e) {
                    n(e);
                }
            });
        });
    },
    wxLogin: t
};