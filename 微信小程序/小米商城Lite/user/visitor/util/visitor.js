function i(i, o, e, t) {
    var r = [], a = [ i, o ];
    for (var s in t) r.push([ s, t[s] ]);
    for (var s in e) r.push([ s, e[s] ]);
    r.sort(function(i, o) {
        return i[0] <= o[0] ? -1 : 1;
    }), r.map(function(i, o) {
        a.push(i[0] + "=" + i[1]);
    }), a.push("BEYBuDbVZqYHzAVT+TAAAA==");
    var c = a.join("&");
    return c = n.hash(c);
}

var o = require("../../../util/conf.js"), e = require("../../../user/milogin/util/util"), t = null, n = require("util"), r = o.conf.env, a = require("../../../util/tracker.js"), s = {
    dev: {
        root: "http://visitor.preview.n.xiaomi.net"
    },
    pro: {
        root: "https://v.id.mi.com"
    }
}, c = {
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
};

module.exports = {
    login: function(o, d) {
        var u = "/visitor/login", f = {
            visitorDeviceId: (c = n.extend(c, o)).visitorDeviceId,
            visitorSdkVersion: c.visitorSdkVersion,
            visitorPassToken: c.visitorPassToken
        }, p = {
            sid: c.sid,
            visitorId: c.visitorId
        };
        f._sign = i("POST", u, p, f), wx.request({
            method: "POST",
            url: s[r].root + u,
            data: p,
            header: {
                "content-type": "application/x-www-form-urlencoded",
                cookie: n.concatCookie(f)
            },
            success: function(i) {
                if (t || (t = getApp()), i.data && "ok" == i.data.result || a.push({
                    logCode: "wx#bid=3076643.5&page=milogin",
                    clue: "openId:" + t.storageData.xm_open_id + "|" + JSON.stringify(i.data),
                    analyse: "tap"
                }), i.data && "ok" == i.data.result) {
                    var o = i.data.data.visitorId;
                    t.storageData.vToken = i.data.data.visitorPassToken, t.storageData.vid = i.data.data.visitorId, 
                    t.storageData.serviceToken = i.data.data.serviceToken || i.data.data.mieshop_weixin_serviceToken, 
                    wx.setStorageSync("loginInfo", t.storageData), e.getWXCode(function(n, r) {
                        e.getWXUserInfo(function(r, a) {
                            t.request("user/loguser", {
                                code: n
                            }, function(n, r) {
                                r || (t.storageData.user_token = n.data ? n.data.user_token : "", wx.setStorageSync("loginInfo", t.storageData), 
                                "function" == typeof d && d(i.data, null), e.getWXUserInfo(function(i, e) {
                                    if (!e) {
                                        var n = i.encryptedData, r = i.iv;
                                        t.request("user/bindVisitor", {
                                            vid: o,
                                            encrypted_data: n,
                                            iv: r
                                        }, function(i, o) {});
                                    }
                                }));
                            });
                        });
                    });
                }
            },
            fail: function(i) {
                "function" == typeof d && d({}, i);
            }
        });
    },
    register: function(o, e) {
        var t = "/visitor/register", a = {
            appId: (c = n.extend(c, o)).appId,
            code: c.code
        }, d = JSON.stringify(a), u = {
            visitorDeviceId: c.visitorDeviceId,
            visitorSdkVersion: c.visitorSdkVersion
        }, f = {
            appPackage: c.appPackage,
            visitorType: 4,
            sid: c.sid || "",
            psid: c.psid || "",
            clientInfo: d
        };
        u._sign = i("POST", t, f, u), u.userInfo = encodeURIComponent(JSON.stringify(c.userInfo)), 
        wx.request({
            method: "POST",
            url: s[r].root + t,
            data: f,
            header: {
                "content-type": "application/x-www-form-urlencoded",
                cookie: n.concatCookie(u)
            },
            success: function(i) {
                "function" == typeof e && e(i.data, null);
            },
            fail: function(i) {
                "function" == typeof e && e({}, i);
            }
        });
    },
    checkAsso: function(o, e) {
        var t = "/visitor/check-association", a = {
            appId: (c = n.extend(c, o)).appId,
            code: c.code
        }, d = JSON.stringify(a), u = {
            visitorDeviceId: c.visitorDeviceId,
            visitorSdkVersion: c.visitorSdkVersion
        }, f = {
            visitorType: 4,
            sid: c.sid,
            clientInfo: d
        };
        u._sign = i("POST", t, f, u), u.userInfo = encodeURIComponent(JSON.stringify(c.userInfo)), 
        wx.request({
            method: "POST",
            url: s[r].root + t,
            data: {
                visitorType: 4,
                sid: c.sid,
                clientInfo: d
            },
            header: {
                "content-type": "application/x-www-form-urlencoded",
                cookie: n.concatCookie(u)
            },
            success: function(i) {
                "function" == typeof e && e(i.data, null);
            },
            fail: function(i) {
                "function" == typeof e && e({}, i);
            }
        });
    },
    checkVid: function(i, o) {
        wx.request({
            method: "GET",
            url: s[r].root + "/visitor/check-vid",
            data: {
                visitorId: i
            },
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            success: function(i) {
                "function" == typeof o && o(i.data, null);
            },
            fail: function(i) {
                "function" == typeof o && o({}, i);
            }
        });
    }
};