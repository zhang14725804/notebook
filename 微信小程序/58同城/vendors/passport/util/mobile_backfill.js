var e = require("./fetch"), t = require("./store"), a = require("./set_fingerprint"), n = require("./encrypt_string"), r = require("./mobile_check"), i = require("./get_code"), o = (require("./push_data"), 
require("./get_data")), s = {
    isSendCode: !1,
    num: 0,
    codeNum: 0,
    initData: {},
    dataInit: function() {
        if (!this.initData.rsaExponent) {
            o({
                url: "https://passport.58.com/rsa",
                name: this.initData
            });
        }
        t.getSync("fingerprint") || a();
    },
    getData: function(e, t) {
        var a = "https://passport.58.com/warn/getdata?warnkey=" + e.warnkey + "&source=" + e.source;
        o({
            url: a,
            name: this.initData
        }, t);
    },
    getCode: function(e) {
        var t = this;
        !t.initData.token && t.codeNum < 50 ? setTimeout(function() {
            t.getCode(e), t.codeNum++;
        }, 100) : i.passport_getcodeUtil.getCode(e, this, "&warnkey=" + e.warnkey);
    },
    freshValidateCode: function() {
        return i.passport_getcodeUtil.freshValidateCode(this.vcodekey);
    },
    formSubmit: function(a) {
        var r = this, i = t.getSync("fingerprint");
        if (i && r.initData.rsaModulus || !(r.num < 20)) {
            var o = this.initData.token || "", s = a.source || "58-weapp", u = a.mobile || "", c = a.mobilecode || "", p = a.warnkey || "", d = a.callback || function() {}, m = a.flag || !1, l = a.setIsGoBack || function() {}, f = a.isBind || !1, g = (a.templateCode, 
            a.opentype || "1"), h = a.username || "";
            if (this.validate(u, c, d, m)) {
                var k = t.getSync("ppu") ? {
                    ppu: t.getSync("ppu")
                } : {}, w = a.warnurl + "?callback=weapp" || "https://passport.58.com/warn/remove?callback=weapp";
                e(w, {
                    source: s,
                    token: o,
                    mobile: n(u, r.initData.rsaExponent, r.initData.rsaModulus),
                    mobilecode: c,
                    tokencode: r.tokencode,
                    warnkey: p,
                    fingerprint: i
                }, function(e, a) {
                    if (a) {
                        if (0 == (a = a.data).code) t.setSync("ppu", a.data.ppu), h && t.setSync("username", h); else if (2 == a.code) {
                            if ("true" == f) return a.msg = " 账号存在安全风险，请在其它端登录解除", void d(a);
                            l();
                            var n = a.data.warnkey, r = a.data.warnurl || "https://passport.58.com/warn/remove";
                            return void wx.redirectTo({
                                url: "./passport?type=6&warnkey=" + n + "&source=" + s + "&warnurl=" + encodeURIComponent(r) + "&username=" + h + "&opentype=" + g
                            });
                        }
                        a.isBind = f, a.username = h, d(a);
                    }
                }, k, "POST");
            }
        } else setTimeout(function() {
            r.formSubmit(a), r.num++;
        }, 100);
    },
    validate: function(e, t, a, n) {
        if (r.passport_mobileCheck.checkMobileInput(e, a, n)) return this.isSendCode ? !(void 0 === t || t.length < 5) || (a({
            code: -1,
            msg: "请填写正确的手机确认码"
        }), !1) : (a({
            code: -1,
            msg: "请点击获取验证码按钮！"
        }), !1);
    }
};

s.dataInit(), module.exports = {
    passport_warn: s
};