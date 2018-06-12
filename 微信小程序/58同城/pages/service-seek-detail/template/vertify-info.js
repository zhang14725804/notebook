var e = getApp(), i = "";

module.exports = {
    reSendVerifyCode: function() {
        0 === this.data.verifyTime && (this.verifyCodeTime(), this.getVerifyCode());
    },
    getVerifyCode: function() {
        var i = this;
        e.request(e.pathData.serviceSeekDetail.GET_VERTIFY_CODE_PATH, {
            mobile: this.data.tel
        }).then(function(e) {
            i.verifyTipsShow(e.msg || e.data.msg || "发送失败，请稍后重试");
        });
    },
    getVerifyInput: function(e) {
        i = e.detail.value;
    },
    checkVerifyCode: function(t) {
        var r = this;
        e.request(e.pathData.serviceSeekDetail.CHECK_VERTIFY_CODE_PATH, {
            vertifyCode: i || ""
        }).then(function(e) {
            0 == e.code ? (r.verifyAlertToggle(), r.serviceDataSubmit(t)) : r.verifyTipsShow(e.data.msg || "验证失败，请稍后再试");
        });
    },
    verifyCodeValidate: function(e) {
        var t = "";
        if (i) {
            if (!(i.length < 4)) return !0;
            t = "验证码不正确";
        } else t = "请输入验证码";
        return this.verifyTipsShow(t), !1;
    },
    verifyTipsShow: function(e) {
        var i = this;
        this.setDataLazy({
            verifyTips: e
        }), clearTimeout(this.verifyTimeout), this.verifyTimeout = setTimeout(function() {
            i.setDataLazy({
                verifyTips: ""
            });
        }, 1e3);
    },
    verifyAlertToggle: function(e) {
        i = "";
        var t = this.data, r = t.isVerifyAlertShow;
        t.verifyTime;
        this.setDataLazy({
            isVerifyAlertShow: !r,
            verifyTime: 60
        }), r || this.verifyCodeTime();
    },
    verifyCodeTime: function() {
        var e = this, i = 60;
        60 !== this.data.verifyTime && this.setDataLazy({
            verifyTime: i
        }), clearInterval(this.vertifyCodeInterval), this.vertifyCodeInterval = setInterval(function() {
            i--, e.setDataLazy({
                verifyTime: i
            }), 0 !== i || clearInterval(e.vertifyCodeInterval);
        }, 1e3);
    },
    $e_verifySubmit: function(e) {
        this.verifyCodeValidate() && this.checkVerifyCode(e);
    }
};