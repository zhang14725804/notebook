Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = require("../pass_config"), s = require("../pass_utils/toastFn"), t = require("../pass_utils/apiAjax"), a = require("../pass_utils/RSA"), r = function(e, t) {
    var a = e.data;
    if (140001 == a.ppErrorInfo.errNo) wx.setStorage({
        key: "userInfo",
        data: {
            bduss: a.ppUser.bduss,
            waimai_stoken: a.ppUser.waimai_stoken,
            stoken: a.ppUser.stoken
        },
        success: function() {
            var e = void 0, s = getCurrentPages();
            try {
                (e = wx.getStorageSync("pageStackLength")) && wx.navigateBack({
                    delta: s.length - e + 1
                });
            } catch (e) {
                console.log(e);
            }
        },
        fail: function() {
            console.log("setStorage fail");
        }
    }); else if (0 == a.ppErrorInfo.errNo) {
        var r = void 0, o = getCurrentPages();
        try {
            (r = wx.getStorageSync("pageStackLength")) && wx.navigateBack({
                delta: o.length - r + 1
            });
        } catch (e) {
            console.log(e);
        }
    } else s.toastFn(t, a.ppErrorInfo.msg);
};

exports.regNamePwd = function(s) {
    var o = s.data || {}, n = o.telnum && o.telnum.replace(/[ ]/g, ""), i = void 0, p = void 0, g = void 0, d = void 0, c = void 0, u = void 0, l = void 0, E = {
        tpl: e.tpl,
        action: "login",
        sms: 1,
        smsverify: 1,
        clientfrom: "wap",
        is_voice_sms: "0",
        wechat: 1
    };
    try {
        var v = wx.getStorageSync("userInfo");
        v && (d = v.stoken, c = v.bduss, u = v.authsid, l = v.bdstoken);
    } catch (e) {
        console.log(e);
    }
    try {
        a.setMaxDigits(131), p = new a.RSAKeyPair("10001", "", "B3C61EBBA4659C4CE3639287EE871F1F48F7930EA977991C7AFE3CC442FEA49643212E7D570C853F368065CC57A2014666DA8AE7D493FD47D171C0D894EEE3ED7F99F6798B7FFD7B5873227038AD23E3197631A8CB642213B9F27D4901AB0D92BFA27542AE890855396ED92775255C977F5C302F1E7ED4B1E369C12CB6B1822F"), 
        g = a.encryptedString(p, o.password);
    } catch (e) {
        console.log(e);
    }
    1 == o.notRegist ? (i = "wp/api/login", s.setData({
        respErrno: 140001
    }), E.setuname = o.user_name ? o.user_name : "", E.setpwd = g || "", E.BDUSS = c || "", 
    E.STOKEN = d || "", E.username = n || "", E.password = o.smsCode ? o.smsCode : "") : 400412 == o.errNo ? (i = "v3/getpass/api/showsetpwdusername/?v=" + new Date().getTime(), 
    s.setData({
        respErrno: 0
    }), E.password = g || "", E.username = o.user_name ? o.user_name : "", E.bdstoken = l || "", 
    E.authsid = u || "", E.BDUSS = c || "", E.STOKEN = d || "") : 400410 == o.errNo && (i = "/v3/getpass/api/setpwd/?v=" + new Date().getTime(), 
    s.setData({
        respErrno: 0
    }), E.password = g || "", E.bdstoken = l || "", E.authsid = u || "", E.BDUSS = c || "", 
    E.STOKEN = d || ""), t.apiAjax(i, E, "POST", r, s);
};