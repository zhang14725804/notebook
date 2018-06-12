Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = require("../pass_utils/toastFn"), t = require("../pass_requestapi/getSmsCodeFn"), a = require("../pass_utils/apiAjax"), r = function(a, r) {
    var s = a.data;
    0 == s.errInfo.no ? (r.setData({
        vcode: 1
    }), t.getSmsCodeFn(r)) : e.toastFn(r, s.errInfo.msg);
};

exports.checkVcodeFn = function(e) {
    var t = {
        verifycode: e.data.inputValue,
        codestring: e.data.vcodestr
    };
    a.apiAjax("wp/api/security/checkvcode", t, "GET", r, e);
};