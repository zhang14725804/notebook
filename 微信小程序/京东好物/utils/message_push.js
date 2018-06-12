function e(e, t) {
    var n = e || getApp().globalRequestUrl;
    return wx.removeStorageSync("oi_key"), new Promise(function(e, o) {
        wx.login({
            success: function(o) {
                var s = o.code;
                i.request({
                    url: n + "/kwxhome/myJd/initOpenIdKey.json",
                    method: "POST",
                    data: {
                        wxcode: s,
                        wxAppId: t.appid,
                        clientType: "tempwx"
                    },
                    success: function(t) {
                        t && t.openIdKey ? (wx.setStorageSync("oi_key", t.openIdKey), e()) : wx.removeStorageSync("oi_key");
                    }
                });
            },
            fail: function() {
                o();
            },
            complete: function() {}
        });
    });
}

function t(e, t) {
    i.request({
        url: e,
        method: "POST",
        data: t,
        success: function(e) {},
        fail: function() {},
        complete: function() {}
    });
}

function n(e) {
    var n = wx.getStorageSync("oi_key");
    t(getApp().messagePushRequestUrl + "/sendTemplateMsg/saveCacheFormId", {
        identityKey: n,
        cacheFormJson: JSON.stringify(e)
    });
}

function o(e) {
    t(getApp().messagePushRequestUrl + "/sendTemplateMsg/sendMsgFront", {
        frontInfoBoJson: JSON.stringify(e)
    });
}

var i = require("./util.js");

module.exports = {
    messagePush: function(t) {
        if ("the formId is a mock one" != t.formId && "tempwx" == getApp().globalWxclient && getApp().globalConfig && getApp().globalConfig.isMessagePush) {
            var o = require("./onLaunch.js");
            wx.getStorageSync("oi_key") ? n(t) : e(getApp().messagePushRequestUrl, o.getExtConfig()).then(function() {
                return n(t);
            }, function() {
                wx.removeStorageSync("oi_key");
            });
        }
    },
    getOpenIdKey: e,
    sendMsgFront: function(t) {
        if ("tempwx" == getApp().globalWxclient && getApp().globalConfig && getApp().globalConfig.isMessagePush) {
            var n = require("./onLaunch.js");
            t.appId = n.getExtConfig().appid, t.identityKey = wx.getStorageSync("oi_key"), t.pin = wx.getStorageSync("jdlogin_pt_key"), 
            wx.getStorageSync("oi_key") ? o(t) : e(getApp().messagePushRequestUrl, n.getExtConfig()).then(function() {
                return o(t);
            }, function() {
                wx.removeStorageSync("oi_key");
            });
        }
    }
};