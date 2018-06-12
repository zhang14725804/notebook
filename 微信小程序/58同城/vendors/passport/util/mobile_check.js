var e = {
    validMobileFormat: function(e) {
        var t = /^\d{11}$/;
        if (new RegExp(t).test(e)) {
            var o = /^(13|14|15|16|17|18|19)\d{9}$/;
            if (new RegExp(o).test(e)) return !0;
        }
    },
    checkMobileInput: function(e, t, o) {
        return void 0 === e || 0 == e.length ? (t({
            code: -1,
            msg: "请输入手机号"
        }), !1) : !(!this.validMobileFormat(e) && !o) || (t({
            code: -1,
            msg: "请填写正确的手机号"
        }), !1);
    }
};

module.exports = {
    passport_mobileCheck: e
};