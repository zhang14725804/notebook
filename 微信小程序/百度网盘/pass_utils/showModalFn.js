Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = require("../pass_requestapi/getSmsCodeFn");

exports.showModalFn = function(t) {
    wx.showModal({
        title: "提示",
        content: "您的手机号尚未注册，点击注册将为您注册百度账号，您可以通过手机号和短信验证码登录",
        confirmText: "立即注册",
        confirmColor: "#3c76ff",
        success: function(o) {
            o.confirm && (t.setData({
                notRegist: 1
            }), e.getSmsCodeFn(t));
        }
    });
};