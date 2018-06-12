Object.defineProperty(exports, "__esModule", {
    value: !0
});

var i = require("../../util/conf.js"), t = require("../../util/util.js"), e = require("../../user/visitor/util/util.js"), o = require("../../util/tracker.js"), r = (require("../../util/aes.js"), 
{
    visitorDeviceId: -1,
    visitorSdkVersion: -1,
    visitorType: 4,
    appPackage: "",
    clientInfo: "",
    cb: "",
    psid: "",
    sid: "",
    userInfo: "",
    _onlyRecover: !1
}), n = {
    install: function(n) {
        arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
        n.$visitor = function() {
            var s = n;
            return {
                post: function(e) {
                    var o = i.visitorRoot[i.conf.env].root, r = s.getCookie(e.url) + ";" + s.$http.concatCookie(e.externalCookie || {});
                    return e.config = e.config || {}, new Promise(function(i, n) {
                        s.$http.checkSession().then(function(a) {
                            a ? wx.request({
                                url: o + e.url,
                                method: e.method || "POST",
                                data: e.data || {},
                                header: Object.assign({
                                    "content-type": "application/x-www-form-urlencoded",
                                    cookie: r
                                }, e.config),
                                success: function(t) {
                                    (t.statusCode >= 200 && t.statusCode < 300 || 304 == t.statusCode) && i(t.data);
                                },
                                fail: function(i) {
                                    n(i), wx.redirectTo({
                                        url: "/pages/common/index"
                                    });
                                }
                            }) : (s.$http.wxLogin(), t.showError("服务异常，请稍后再试～"));
                        });
                    });
                },
                sign: function(i, t, o, r) {
                    var n = [], s = [ i, t ];
                    for (var a in r) n.push([ a, r[a] ]);
                    for (var a in o) n.push([ a, o[a] ]);
                    n.sort(function(i, t) {
                        return i[0] <= t[0] ? -1 : 1;
                    }), n.map(function(i, t) {
                        s.push(i[0] + "=" + i[1]);
                    }), s.push("BEYBuDbVZqYHzAVT+TAAAA==");
                    var d = s.join("&");
                    return d = e.hash(d);
                },
                bindVisitor: function(i) {
                    return new Promise(function(t, e) {
                        i.vid ? s.$http.getWxUserInfo().then(function(i) {
                            return new Promise(function(t) {
                                t({
                                    userInfo: i
                                });
                            });
                        }).then(function(e) {
                            s.$http.post({
                                url: "user/bindVisitor",
                                data: {
                                    vid: i.vid,
                                    user_id: i.userId || "",
                                    encrypted_data: e.userInfo.encryptedData,
                                    iv: e.userInfo.iv
                                }
                            }).then(function(i) {
                                t();
                            });
                        }) : t();
                    });
                },
                visitorRegister: function(i) {
                    return new Promise(function(i) {
                        s.$http.wxLogin().then(function(i) {
                            return new Promise(function(t) {
                                s.$http.getWxUserInfo().then(function(e) {
                                    t({
                                        userInfo: e,
                                        code: i
                                    });
                                });
                            });
                        }).then(function(o) {
                            var n = {
                                appPackage: s.appInfo.appPackage,
                                appId: s.appInfo.appid,
                                psid: s.appInfo.psid,
                                sid: s.appInfo.sid,
                                userInfo: o.userInfo,
                                code: o.code
                            };
                            r = e.extend(r, n);
                            var a = JSON.stringify({
                                appId: r.appId,
                                code: r.code
                            }), d = {
                                visitorDeviceId: r.visitorDeviceId,
                                visitorSdkVersion: r.visitorSdkVersion
                            }, u = {
                                appPackage: r.appPackage,
                                visitorType: 4,
                                sid: r.sid || "",
                                psid: r.psid || "",
                                clientInfo: a
                            };
                            d._sign = s.$visitor.sign("POST", "/visitor/register", u, d), d.userInfo = encodeURIComponent(JSON.stringify(r.userInfo)), 
                            s.$visitor.post({
                                url: "/visitor/register",
                                data: u,
                                externalCookie: d
                            }).then(function(e) {
                                if ("ok" !== e.result) return t.showError("登录授权服务异常，请稍后再试或者下载小米商城App"), void reject({
                                    errType: "visitorRegisterError"
                                });
                                var o = {
                                    sid: s.appInfo.sid,
                                    visitorPassToken: e.data.visitorPassToken,
                                    visitorId: e.data.visitorId
                                };
                                i({
                                    params: o
                                });
                            });
                        });
                    });
                },
                visitorLogin: function(i) {
                    return new Promise(function(t) {
                        var n = {
                            visitorDeviceId: (r = e.extend(r, i.params)).visitorDeviceId,
                            visitorSdkVersion: r.visitorSdkVersion,
                            visitorPassToken: r.visitorPassToken
                        }, a = {
                            sid: r.sid,
                            visitorId: r.visitorId
                        };
                        n._sign = s.$visitor.sign("POST", "/visitor/login", a, n), s.$visitor.post({
                            url: "/visitor/login",
                            data: a,
                            externalCookie: n
                        }).then(function(i) {
                            if (i.data && "ok" == i.result || o.push({
                                logCode: "wx#bid=3076643.5&page=milogin",
                                clue: JSON.stringify(i.data),
                                analyse: "tap"
                            }), i.data && "ok" == i.result) {
                                i.data.visitorId;
                                s.storageData.vToken = i.data.visitorPassToken, s.storageData.vid = i.data.visitorId, 
                                s.storageData.serviceToken = i.data.serviceToken || i.data.mieshop_weixin_serviceToken, 
                                wx.setStorageSync("loginInfo", s.storageData);
                            }
                            t({
                                vid: r.visitorId
                            });
                        });
                    });
                }
            };
        }();
    }
};

exports.default = n;