function e(e) {
    return (e = e.toString())[1] ? e : "0" + e;
}

function o(e) {
    if (!e || e == {} || !e.url) return console.log("Data request can not be executed without URL."), 
    !1;
    var o = e.url;
    o.indexOf("?") > 0 ? o += "&fromType=wxapp" : o += "?fromType=wxapp";
    var n = r(), g = e.selfCookie;
    g && (n += g), e.data = t(e.data), wx.request({
        url: o,
        data: e.data || {},
        header: {
            "Content-Type": "application/x-www-form-urlencoded",
            Cookie: n
        },
        method: e.method || "POST",
        success: function(o) {
            wx.setStorageSync("desPin", o.data.desPin), a(o.data), e.success && e.success(o.data);
        },
        fail: function(o) {
            e.fail && e.fail(o), console.log(o.errMsg), wx.showToast({
                title: "网络信号较差",
                icon: "loading",
                duration: 3e3
            });
        },
        complete: function() {
            e.complete && e.complete();
        }
    });
}

function t(e) {
    var o = "";
    for (var t in e) o += t + "=" + encodeURIComponent(e[t]) + "&";
    return o.substring(0, o.length - 1);
}

function r() {
    var e = getApp(), o = "";
    try {
        var t = wx.getStorageSync("sid"), r = wx.getStorageSync("USER_FLAG_CHECK");
        t && r && (o = "sid=" + t + ";USER_FLAG_CHECK=" + r + ";");
        var a = wx.getStorageSync("jdlogin_pt_key");
        a && (o = o + "pt_key=" + a + ";");
        var n = wx.getStorageSync("unpl");
        n && (o = o + "unpl=" + n + ";");
        var i = wx.getStorageSync("wxappStorageName"), l = wx.getStorageSync(i);
        l && l.wxversion && (o = o + "appkey=" + l.wxversion + ";");
        var c = g.getCustomerinfo();
        if (c && (o = o + "kepler-customerInfo=" + c + ";"), e && e.globalConfig && e.globalConfig.isTriTemplate) {
            var u = g.getExtuserid();
            u && (o = o + "extuserid=" + u + ";");
        }
        var s = wx.getStorageSync("appid");
        s && (o = o + "appid=" + s + ";"), o += "tempwx" == getApp().globalWxclient ? "wxclient=tempwx;" : "wxclient=gxhwx;";
        var p = wx.getStorageSync("oi_key");
        p && (o = o + "oikey=" + p + ";");
    } catch (e) {
        console.log(e);
    }
    return o;
}

function a(e) {
    try {
        e && (e.sid && e.userFlagCheck ? (wx.setStorageSync("sid", e.sid), wx.setStorageSync("USER_FLAG_CHECK", e.userFlagCheck)) : e.cookie && e.cookie.sid && e.cookie.userFlagCheck && (wx.setStorageSync("sid", e.cookie.sid), 
        wx.setStorageSync("USER_FLAG_CHECK", e.cookie.userFlagCheck)));
    } catch (e) {
        console.log(e);
    }
}

!function(e) {
    e && e.__esModule;
}(require("../components/toast/toast.js"));

var n = require("./lib/promise.js"), g = require("individualMark.js");

getApp();

module.exports = {
    formatTime: function(o) {
        var t = o.getFullYear(), r = o.getMonth() + 1, a = o.getDate(), n = o.getHours(), g = o.getMinutes(), i = o.getSeconds();
        return [ t, r, a ].map(e).join("/") + " " + [ n, g, i ].map(e).join(":");
    },
    request: o,
    transfer2Array: function(e) {
        var o = [], t = [];
        for (var r in e) o.push(r), t.push(e[r]);
        return {
            arrKey: o,
            arrValue: t
        };
    },
    reportErr: function(e) {
        var o = getApp(), t = getCurrentPages(), r = t[t.length - 1].__route__, a = o.globalRequestUrl + "/mapi/log/extraction.action?data=", n = {};
        e && (n.product = r, n.exception = e, a += JSON.stringify(n), wx.request({
            url: a
        }));
    },
    globalLoginShow: function(e) {
        wx.removeStorageSync("jdlogin_pt_key"), wx.removeStorageSync("jdlogin_pt_pin");
        var o = "";
        e.data.returnpage && (o = encodeURIComponent(e.data.returnpage));
        var t;
        e.data.fromPageType && (t = encodeURIComponent(e.data.fromPageType));
        var r;
        e.data.fromPageLevel && (r = e.data.fromPageLevel), setTimeout(function() {
            r && 1 == r ? wx.navigateTo({
                url: "/pages/login/login?returnpage=" + o + (t ? "&fromPageType=" + t : "")
            }) : wx.redirectTo({
                url: "/pages/login/login?returnpage=" + o + (t ? "&fromPageType=" + t : "")
            });
        }, 500);
    },
    globallogout: function(e) {
        var t = getApp();
        t.globalData.globalLoginFlag = 0;
        var r;
        e.data.fromPageType && (r = encodeURIComponent(e.data.fromPageType));
        var a;
        e.data.fromPageLevel && (a = e.data.fromPageLevel), o({
            url: t.globalRequestUrl + "/kwxhome/myJd/logout.json",
            success: function(o) {
                if (null != o && "0" == o.code) {
                    wx.removeStorageSync("sid"), wx.removeStorageSync("USER_FLAG_CHECK"), wx.removeStorageSync("jdlogin_pt_key"), 
                    wx.removeStorageSync("jdlogin_pt_pin"), wx.removeStorageSync("itemCartNum"), t.globalConfig && t.globalConfig.isOperatorTemplate && (wx.removeStorageSync("extuserid"), 
                    wx.removeStorageSync("customerinfo"), wx.removeStorageSync("unpl"), wx.setStorageSync("isUserRelBinded", !1));
                    var n = "";
                    if (e.data.returnpage) n = encodeURIComponent(e.data.returnpage); else {
                        var g = getCurrentPages(), i = g[g.length - 1].__route__;
                        n = encodeURIComponent(i);
                    }
                    var l = "/pages/login/login?returnpage=" + n + (r ? "&fromPageType=" + r : "");
                    e.isLogout && (l += "&isLogout=1"), a && 1 == a ? wx.navigateTo({
                        url: l
                    }) : wx.redirectTo({
                        url: l
                    });
                }
            }
        });
    },
    promiseRequest: function(e) {
        return new n(function(t, r) {
            o({
                url: e.url,
                data: e.data,
                success: t,
                fail: r
            });
        });
    },
    loginSuccessCb: function() {
        var e = getApp();
        e.globalConfig && e.globalConfig.needBindUserRel && require("bindUserRel.js").bindUserRel();
    }
};