Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.wxReq = void 0;

var e = require("./storage.js"), r = require("./wxApiToPromise.js"), t = wx.ENV, n = t.hostPanName, i = t.version, o = require("./thirdLib/sha1.min.js"), a = function() {
    var e = getApp();
    return e ? e.globalData : {};
}, s = function(e, r) {
    var t = getApp();
    t && (t[e] = r);
}, c = function() {
    var e = wx.getStorageSync("userInfo"), r = wx.getStorageSync("PANWX");
    return "BDUSS=" + e.bduss + ";PANWX=" + r + ";";
}, R = exports.wxReq = function r(t) {
    var R = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, E = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "GET", l = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : n, w = a();
    if (w.isLogining) return Promise.reject(r.ERROR_IS_LOGINING);
    if (w.errTimes > 3) return wx.wetoast({
        content: "服务器出错，请退出稍后重试",
        duration: 1500
    }), Promise.reject(r.ERROR_REQUEST_SERVER_FAILURE);
    var g = t.includes("api/wechat/login"), _ = t.includes("api/wechat/collect"), d = t.includes("api/analytics"), S = new Date().getTime(), m = wx.getStorageSync("lsk"), v = o("25" + S + m + "weixin"), x = l + t + (/\?/.test(t) ? "&" : "?") + "channel=weixin&time=" + S + "&rand=" + v + "&version=" + i + "&clienttype=25&web=1";
    return new Promise(function(e, r) {
        g && (s("isLogining", !0), void 0 !== w.errTimes && s("errTimes", w.errTimes + 1)), 
        wx.request({
            url: x,
            data: R,
            method: E,
            success: e,
            fail: r,
            complete: function() {
                g && (w.isLogining = !1);
            },
            dataType: "json",
            header: {
                "content-type": "application/x-www-form-urlencoded",
                Cookie: c()
            }
        });
    }).then(function(t) {
        if (d) return Promise.resolve();
        var n = t.data, i = n.errno, o = n.lsk;
        return -6 === i && w.hasWxAuthor ? (_ || (s("firstVisit", !1), wx.navigateTo({
            url: "../pass_login/login"
        })), Promise.reject(r.ERROR_USER_NOT_LOGIN)) : 19101 === i || 113 === i ? (u(), 
        Promise.reject(r.ERROR_USER_LOGIN_FAILURE)) : 1 === i ? (wx.wetoast({
            content: "服务器出错，请退出稍后重试",
            duration: 1500
        }), Promise.reject(r.ERROR_SERVER_UNAVAILABLE)) : (g ? ((0, e.setCookieToStorage)(t.header, [ "PANWX" ]), 
        wx.setStorageSync("lsk", o)) : s("errTimes", 0), t);
    }, function(e) {
        return Promise.reject(e);
    }).catch(function(e) {
        return Promise.reject(e);
    });
};

R.ERROR_IS_LOGINING = 16, R.ERROR_REQUEST_SERVER_FAILURE = 17, R.ERROR_USER_NOT_LOGIN = 18, 
R.ERROR_USER_LOGIN_FAILURE = 19, R.ERROR_SERVER_UNAVAILABLE = 20;

var u = function() {
    var t = a().userWxInfo;
    if (t) {
        var n = t.nickName, i = t.avatarUrl;
        return (0, r.wxLogin)().then(function(e) {
            var r = e.code;
            return R("api/wechat/login", {
                wcode: r,
                wname: n,
                wurl: i
            }, "POST");
        }).then(function(r) {
            var t = r.data, n = void 0 === t ? {} : t, i = r.header, o = n.errno, a = n.lsk;
            0 === o && ((0, e.setCookieToStorage)(i, [ "PANWX" ]), wx.setStorageSync("lsk", a), 
            wx.getCurrentViewPage().onShow(!0));
        });
    }
};