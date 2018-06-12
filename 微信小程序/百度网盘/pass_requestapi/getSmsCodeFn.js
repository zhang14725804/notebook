Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = require("../pass_utils/apiAjax"), a = require("../pass_utils/toastFn"), t = function(e, t) {
    var o = e.data, s = t.data.notRegist ? t.data.notRegist : "", n = o.data.vcodestr ? o.data.vcodestr : "", r = o.data.vcodesign ? o.data.vcodesign : "";
    t.setData({
        vcodestr: n,
        vcodesign: r,
        errno: o.errInfo.no ? o.errInfo.no : ""
    }), "50021" == o.errInfo.no || "50020" == o.errInfo.no ? wx.navigateTo({
        url: "/pages/pass_checkcode/checkcode?notRegist=" + s + "&vcodesign=" + r + "&vcodestr=" + n + "&telnum=" + t.data.telnum + "&vcodesign=" + t.data.vcodesign
    }) : 0 != o.errInfo.no || t.reget ? 0 != o.errInfo.no && a.toastFn(t, o.errInfo.msg) : wx.redirectTo({
        url: "/pages/pass_smscheck/smscheck?telnum=" + t.data.telnum + "&notRegist=" + s + "&vcodestr=" + n + "&vcodesign=" + r
    });
};

exports.getSmsCodeFn = function(a) {
    var o = a.data.telnum.replace(/[ ]/g, ""), s = a.data.vcodestr, n = a.data.vcodesign ? a.data.vcodesign : "";
    a.vcode && "1" == a.vcode && (o = a.data.telnum.replace(/[ ]/g, ""));
    var r = {
        username: o,
        clientfrom: "wap",
        is_voice_sms: "0",
        wechat: 1,
        vcodestr: s || "",
        vcodesign: n || "",
        dialogVerifyCode: a.data.inputValue ? a.data.inputValue : ""
    };
    e.apiAjax("wp/api/login/sms", r, "POST", t, a);
};