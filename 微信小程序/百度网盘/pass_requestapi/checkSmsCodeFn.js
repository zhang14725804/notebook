Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = require("../pass_utils/apiAjax"), a = require("../pass_utils/toastFn"), t = function(e, t) {
    var r = e.data;
    11e4 == r.ppErrorInfo.errNo ? wx.navigateTo({
        url: "../pass_userinfo/userinfo?notRegist=" + t.data.notRegist + "&smsCode=" + t.data.inputValue + "&telnum=" + t.data.telnum
    }) : a.toastFn(t, r.ppErrorInfo.msg);
};

exports.checkSmsCode = function(a) {
    var r = {
        username: a.data.telnum.replace(/[ ]/g, ""),
        password: a.data.inputValue
    };
    e.apiAjax("wp/v3/login/checkvcode", r, "POST", t, a);
};