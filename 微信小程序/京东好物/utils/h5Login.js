function e() {
    var e = wx.getStorageSync("jdlogin_guid") || "", r = wx.getStorageSync("jdlogin_lsid") || "", i = encodeURIComponent(wx.getStorageSync("jdlogin_pt_pin") || ""), a = wx.getStorageSync("jdlogin_pt_token") || "", d = wx.getStorageSync("jdlogin_pt_key") || "", p = parseInt(new Date() / 1e3), g = "appid=269&pt_key=" + d + "&ts=" + p + "dzHdg!ax0g927gYr3zf&dSrvm@t4a+8F", c = t.Mmd5().hex_md5(g);
    return new n(function(t, n) {
        wx.request({
            url: o.globalRequestUrl + "/plogin/cgi-bin/app/wxapp_gentoken",
            data: {
                appid: 269,
                ts: p,
                sign: c
            },
            method: "POST",
            header: {
                "content-type": "application/x-www-form-urlencoded",
                cookie: "guid=" + e + "; lsid=" + r + "; pt_pin=" + i + "; pt_key=" + d + "; pt_token=" + a
            },
            success: t,
            fail: n
        });
    });
}

var t = require("Mmd5.js"), n = require("./lib/promise.js"), o = getApp();

module.exports = {
    jshopH5Login: function(t) {
        var n = "", o = encodeURIComponent(wx.getStorageSync("activityUrl")) || "";
        e().then(function(e) {
            0 == e.data.err_code && (n = decodeURIComponent(e.data.url + "?to=" + o + "&tokenkey=" + e.data.tokenkey), 
            wx.setStorageSync("h5NewUrl", n));
        }).then(function() {
            t && wx.redirectTo({
                url: t
            });
        });
    },
    promiseGentoken: e
};