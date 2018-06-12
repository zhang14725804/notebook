Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = require("../pass_utils/toastFn"), r = require("../pass_requestapi/regNamePwd"), a = require("../pass_utils/apiAjax"), s = require("../pass_config"), t = function(a, s) {
    var t = a.data;
    0 == t.errInfo.no ? r.regNamePwd(s) : e.toastFn(s, t.errInfo.msg);
};

exports.regUser = function(e) {
    var r = {
        tpl: s.tpl,
        username: e.data.user_name
    };
    a.apiAjax("wp/api/reg/check/uname", r, "GET", t, e);
};