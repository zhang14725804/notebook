(function() {
    function a(a) {
        return a && a.__esModule ? a : {
            default: a
        };
    }
    var b = require("../../utils/ppdog"), c = a(b), d = require("../../utils/regenerator-runtime"), e = a(d);
    var f, g, h, i, j, k = require("./rsa"), l = require("./md5"), m = !1, n = function(a) {
        var b;
        return b = a ? "https://wzq.tenpay.com" : "https://wzq.newone.com.cn", b + "/cgi-bin/tradeprepare.cgi";
    }, o = function(a) {
        j = !1, i = a;
    }, p = function() {
        return j = !0, i;
    }, q = function() {
        return j;
    }, r = function(a) {
        var b = l.hexEncode(a);
        return b.substring(0, 14);
    }, s = function(a) {
        var b = n(a);
        b && wx.request({
            url: b,
            method: "POST",
            success: function(a) {
                if (m = !1, "200" != a.statusCode) return void wx.showModal({
                    title: "",
                    content: a.errMsg,
                    showCancel: !1,
                    confirmText: "我知道了"
                });
                var b = a.data || {};
                return b && "0" != b.retcode ? void wx.showModal({
                    title: "",
                    content: b.retmsg,
                    showCancel: !1,
                    confirmText: "我知道了"
                }) : void (u("10001", b.key), o(b.timeseed), f && f(t(g)), f = null, g = null);
            },
            fail: function() {
                m = !1, console && console.log("time seed file update error!", "warn");
            }
        });
    }, t = function(a) {
        var b = p(), c = r(b), d = k.encrypt1(h, a, b, c);
        return {
            encodePwd: c + "000000" + "0000000000000000000000000000000000000000" + d
        };
    }, u = function(a, b) {
        h = new k.RSAKeyPair(a, "", b);
    };
    k.setMaxDigits(131), module.exports = {
        setSeed: function(a) {
            o(a);
        },
        updateSeed: s,
        resetkey: u,
        cryptPasswd: function(a, b, c) {
            var d = q();
            c = !1 !== c || c, m ? (f = b, g = a) : d ? (f = b, g = a, s(c)) : b(t(a));
        }
    };
})();