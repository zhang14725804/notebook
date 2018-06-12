Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = require("../pass_utils/showModalFn"), s = require("../pass_utils/toastFn"), t = require("../pass_utils/apiAjax"), a = require("./getSmsCodeFn"), r = function(t, r) {
    0 == t.data.ppErrorNo ? a.getSmsCodeFn(r) : 3 == t.data.ppErrorNo ? e.showModalFn(r) : s.toastFn(r, t.data.msg);
};

exports.getPhoneStatusFn = function(e, s) {
    var a = {
        username: e,
        clientfrom: "wap",
        is_voice_sms: "0",
        wechat: 1
    };
    t.apiAjax("wp/api/security/getphonestatus", a, "POST", r, s);
};