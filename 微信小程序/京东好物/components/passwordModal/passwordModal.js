var a = {
    passwordListClick: function() {
        this.data.isPasswordModalData.passwordFocus ? this.setData({
            "isPasswordModalData.passwordFocus": !1
        }) : this.setData({
            "isPasswordModalData.passwordFocus": !0
        });
    },
    setPasswordValue: function(a) {
        this.setData({
            "isPasswordModalData.passWordValue": a.detail.value,
            "isPasswordModalData.mondalHint": ""
        });
    },
    passwordConfirm: function(a) {
        var s = this, o = this.data.isPasswordModalData.passWordValue;
        (this.data.isPasswordModalData.passwordShort ? /^\d{6}$/ : /^[0-9a-zA-Z]{6,20}$/).test(o) ? s.submitOrder(a) : 0 == o.length ? this.setData({
            "isPasswordModalData.mondalHint": "请输入支付密码"
        }) : this.setData({
            "isPasswordModalData.mondalHint": "密码格式错误"
        });
    },
    passWordModalClose: function() {
        this.setData({
            "isPasswordModalData.passwordFocus": !0,
            "isPasswordModalData.modalDisplay": !1,
            "isPasswordModalData.passWordValue": "",
            "isPasswordModalData.mondalHint": ""
        });
    },
    forgetPassword: function(a) {
        var s = this;
        s.setData({
            "isPasswordModalData.passwordFocus": !1,
            "isPasswordModalData.modalDisplay": !1
        }), wx.showModal({
            content: "请到“京东APP-账户设置-账户安全-支付密码”找回支付密码",
            showCancel: !1,
            confirmText: "我知道了",
            confirmColor: "#f23030",
            success: function(a) {
                a.confirm && s.setData({
                    "isPasswordModalData.modalDisplay": !0,
                    "isPasswordModalData.passwordFocus": !0,
                    "isPasswordModalData.passWordValue": ""
                });
            }
        });
    },
    setShortPassWord: function() {
        this.setData({
            "isPasswordModalData.passwordFocus": !1
        });
    }
};

module.exports = {
    passwordModalObject: a
};