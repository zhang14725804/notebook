Object.defineProperty(exports, "__esModule", {
    value: !0
});

exports.sendSmsBtnFn = function(t, e) {
    var n = setInterval(function() {
        var a = e--;
        0 !== a ? t.setData({
            textContent: "重新发送(" + a + ")",
            flag: !0
        }) : (t.setData({
            textContent: "重新获取验证码",
            flag: !1
        }), clearInterval(n));
    }, 1e3);
};