Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = require("../pass_config"), t = require("../pass_utils/toastFn"), a = require("../pass_utils/apiAjax"), s = function(e, t) {
    wx.setStorage({
        key: "userInfo",
        data: {
            bduss: e.ppUser.bduss,
            waimai_stoken: e.ppUser.waimai_stoken,
            stoken: e.ppUser.stoken,
            bdstoken: e.ppData.bdstoken,
            authsid: e.ppData.authsid
        },
        success: function() {
            var e = void 0, a = getCurrentPages();
            if (t && 140001 == t) try {
                (e = wx.getStorageSync("pageStackLength")) && wx.navigateBack({
                    delta: a.length - e + 1
                });
            } catch (e) {
                console.log(e);
            }
        },
        fail: function() {
            console.log("setStorage fail");
        }
    });
}, o = function(e, a) {
    var o = e.data;
    140001 == o.ppErrorInfo.errNo ? (a.setData({
        errno: o.ppErrorInfo.errNo
    }), s(o, "140001")) : 400410 == o.ppErrorInfo.errNo ? (s(o, "400410"), wx.navigateTo({
        url: "/pages/pass_setpassword/setpassword?errNo=400410&showIgnoreBtn=true&notRegist=" + a.data.notRegist + "&smsCode=" + a.data.inputValue + "&telnum=" + a.data.telnum
    })) : 400412 == o.ppErrorInfo.errNo ? (s(o, "400412"), wx.navigateTo({
        url: "/pages/pass_userinfo/userinfo?errNo=400412&showIgnoreBtn=true&notRegist=" + a.data.notRegist + "&smsCode=" + a.data.inputValue + "&telnum=" + a.data.telnum
    })) : t.toastFn(a, o.ppErrorInfo.msg);
};

exports.getLoginInfo = function(t) {
    var s = {
        username: t.data.telnum.replace(/[ ]/g, ""),
        password: t.data.inputValue,
        action: "login",
        sms: 1,
        smsverify: 1,
        clientfrom: "wap",
        is_voice_sms: "0",
        wechat: 1,
        tpl: e.tpl
    };
    a.apiAjax("wp/api/login", s, "POST", o, t);
};