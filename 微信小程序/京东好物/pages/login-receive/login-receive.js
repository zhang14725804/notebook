function e(e) {
    var t = "";
    for (var n in e) t += n + "=" + encodeURIComponent(e[n]) + "&";
    return t.substring(0, t.length - 1);
}

require("../../utils/rsa_common.js"), require("../../utils/base64.js");

var t = require("../../utils/util.js"), n = require("../../utils/h5Login.js"), a = getApp();

Page({
    data: {
        iconClear: !0,
        canLogin: !1,
        receive: "",
        warnShow: !0,
        warnText: "",
        returnpage: ""
    },
    onLoad: function(e) {
        this.mobile = e.mobile, this.data.returnpage = decodeURIComponent(e.returnpage), 
        this.data.fromPageType = e.fromPageType;
    },
    onShow: function() {},
    inputFocus: function(e) {
        this.setData({
            iconClear: !1
        });
    },
    inputBlur: function(e) {
        this.setData({
            iconClear: !0
        });
    },
    changeInput: function(e) {
        var t = e.detail.value;
        this.setData({
            receive: t
        }), t ? this.setData({
            canLogin: !0
        }) : this.setData({
            canLogin: !1
        });
    },
    clearInput: function(e) {
        this.setData({
            canLogin: !1,
            receive: ""
        });
    },
    checkreceiver: function(i) {
        if (this.data.canLogin) {
            this.setData({
                warnShow: !0,
                warnText: "",
                canLogin: !1
            });
            var r = this, o = wx.getStorageSync("jdlogin_guid"), c = wx.getStorageSync("jdlogin_lsid"), g = wx.getStorageSync("jdlogin_pt_pin") || "", s = wx.getStorageSync("jdlogin_pt_key") || "", l = wx.getStorageSync("jdlogin_pt_token") || "", u = wx.getStorageSync("activityUrl") || "", p = e({
                mobile: this.mobile,
                receiver: r.data.receive,
                s_token: null
            });
            wx.request({
                url: a.globalRequestUrl + "/wxapplogin/cgi-bin/login/smslogin_checkreceiver",
                data: p,
                method: "POST",
                header: {
                    "content-type": "application/x-www-form-urlencoded",
                    cookie: "guid=" + o + "; lsid=" + c + "; pt_pin=" + g + "; pt_key=" + s + "; pt_token=" + l
                },
                success: function(e) {
                    var a = e.data;
                    a.err_code ? r.setData({
                        warnShow: !1,
                        warnText: a.err_msg
                    }) : (wx.setStorageSync("jdlogin_pt_pin", a.pt_pin), wx.setStorageSync("jdlogin_pt_key", a.pt_key), 
                    wx.setStorageSync("jdlogin_pt_token", a.pt_token), wx.setStorageSync("jdlogin_pt_key_expire_time", a.expire_time), 
                    wx.setStorageSync("jdlogin_pt_key_refresh_time", a.refresh_time), r.data.returnpage && (r.data.fromPageType && "switchTab" == r.data.fromPageType ? (t.loginSuccessCb(), 
                    wx.switchTab({
                        url: r.data.returnpage
                    })) : u ? n.jshopH5Login(r.data.returnpage) : (t.loginSuccessCb(), wx.redirectTo({
                        url: r.data.returnpage
                    }))));
                },
                fail: function() {
                    console.log("checkreceiver fail");
                }
            });
        }
    }
});