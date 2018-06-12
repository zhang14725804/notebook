var e = null, t = require("../../utils/util.js"), a = getApp();

Page({
    data: {
        nickname: "",
        userImgUrl: "",
        returnpage: "",
        fromPageType: ""
    },
    onLoad: function(t) {
        this.data.fromPageType = t.fromPageType, e = t.token;
        var a = null;
        a = t.returnpage, this.setData({
            nickname: t.nickname,
            userImgUrl: decodeURIComponent(t.url),
            returnpage: a
        });
    },
    onShow: function() {},
    doSure: function() {
        var n = this, o = wx.getStorageSync("jdlogin_guid"), r = wx.getStorageSync("jdlogin_lsid"), i = wx.getStorageSync("activityUrl") || "";
        wx.request({
            url: a.globalRequestUrl + "/wxapplogin/cgi-bin/login/wxconfirmlogin",
            data: {
                wx_token: e
            },
            method: "POST",
            header: {
                "content-type": "application/x-www-form-urlencoded",
                cookie: "guid=" + o + "; lsid=" + r
            },
            success: function(e) {
                var a = e.data;
                if (a.err_code) wx.showModal({
                    content: a.err_msg,
                    showCancel: !1,
                    success: function(e) {
                        wx.redirectTo({
                            url: "../login/login?jdlogin=1&returnpage=" + n.data.returnpage + "&fromPageType=" + n.data.fromPageType
                        });
                    }
                }); else {
                    try {
                        wx.setStorageSync("jdlogin_pt_pin", a.pt_pin), wx.setStorageSync("jdlogin_pt_key", a.pt_key), 
                        wx.setStorageSync("jdlogin_pt_token", a.pt_token);
                    } catch (e) {}
                    t.loginSuccessCb(), n.data.returnpage && (n.data.fromPageType && "switchTab" == n.data.fromPageType ? wx.switchTab({
                        url: n.data.returnpage
                    }) : i ? h5Login.jshopH5Login(n.data.returnpage) : wx.redirectTo({
                        url: n.data.returnpage
                    }));
                }
            },
            fail: function() {
                console.log("wxlogin fail");
            }
        });
    },
    otherWay: function() {
        wx.redirectTo({
            url: "../login/login?jdlogin=1&returnpage=" + this.data.returnpage + "&fromPageType=" + this.data.fromPageType
        });
    }
});