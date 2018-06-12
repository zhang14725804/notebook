(function() {
    function a(a) {
        return a && a.__esModule ? a : {
            default: a
        };
    }
    var b = require("../../utils/ppdog"), c = a(b), d = require("../../utils/regenerator-runtime"), e = a(d), f = require("./util"), g = require("./config"), h = [ "_qluin", "_qlskey", "_lastlogin" ], j = [ "d_qluin", "d_qlskey", "d_lastlogin" ];
    module.exports = {
        loginCGI: "https://wzq.tenpay.com/cgi-bin/wx_login.cgi",
        getDealerCodeCGI: "https://wzq.tenpay.com/cgi-bin/auth.cgi",
        qlappid: "wx082534a3cdeb40e3",
        isLogin: function() {
            var a = this.getLoginInfo(h), b = new Date().getTime() - a.lastlogin >= 5184e5;
            return !!a.qluin && !!a.qlskey && !b;
        },
        isDealerLogin: function() {
            var a = this.getDealerLoginInfo(), b = new Date().getTime() - a.lastlogin >= 828e5;
            return !!a.qluin && !!a.qlskey && !b;
        },
        getLoginInfo: function(a) {
            var b = {};
            a = a === void 0 ? h : a;
            for (var c = 0; c < a.length; c++) {
                var d = a[c], e = d.replace(/(_|d_)/, "");
                b[e] = wx.getStorageSync(d);
            }
            return b;
        },
        getDealerLoginInfo: function() {
            return this.getLoginInfo(j);
        },
        reLogin: function(a) {
            var b = this;
            wx.login({
                success: function(c) {
                    c && c.code ? b.goLogin({
                        url: b.loginCGI,
                        code: c.code,
                        success: a
                    }) : wx.showModal({
                        title: "",
                        content: "获取用户登录态失败：" + c.errMsg,
                        showCancel: !1,
                        confirmText: "我知道了",
                        success: function() {}
                    });
                },
                fail: function(a) {
                    wx.showModal({
                        title: "",
                        content: "调用wx.login失败：" + a.errMsg,
                        showCancel: !1,
                        confirmText: "我知道了"
                    });
                }
            });
        },
        goLogin: function(a) {
            a.loginType === void 0 && (a.loginType = 1), wx.request({
                url: a.url,
                data: {
                    code: a.code,
                    code_from: "wxapp"
                },
                method: "POST",
                header: {
                    "content-type": "application/x-www-form-urlencoded"
                },
                success: function(b) {
                    var c = b.data;
                    if ("200" != b.statusCode) return void wx.showModal({
                        title: "",
                        content: b.errMsg,
                        showCancel: !1,
                        confirmText: "我知道了"
                    });
                    if (!c || "0" != c.retcode) return void wx.showModal({
                        title: "",
                        content: c.retmsg,
                        showCancel: !1,
                        confirmText: "我知道了"
                    });
                    for (var d, e = [ c.qluin, c.qlskey, new Date().getTime() ], f = 2 == a.loginType ? j : h, g = 0; g < f.length; g++) d = f[g], 
                    wx.setStorageSync(d, e[g]);
                    "function" == typeof a.success && a.success();
                },
                fail: function() {
                    wx.showModal({
                        title: "",
                        content: "登录失败，请稍候再试",
                        showCancel: !1,
                        confirmText: "我知道了"
                    });
                }
            });
        },
        getDealerLoginCode: function(a, b) {
            var c = this.getLoginInfo();
            wx.request({
                url: "https://wzq.tenpay.com/cgi-bin/auth.cgi",
                data: {
                    action: "authcode",
                    outputtype: "3",
                    qluin: c.qluin,
                    qlskey: c.qlskey
                },
                method: "GET",
                success: function(a) {
                    var c = f.resCommonHandle(a);
                    if (!1 !== c.check) {
                        var d = c.json;
                        "function" == typeof b && b(d);
                    }
                },
                fail: function() {
                    wx.showModal({
                        title: "",
                        content: "获取独立部署登录凭据失败",
                        showCancel: !1,
                        confirmText: "我知道了"
                    });
                }
            });
        }
    };
})();