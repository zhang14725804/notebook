var e = require("../util/fetch"), t = require("../util/store"), a = require("../util/password_check"), i = require("./set_fingerprint"), n = require("./encrypt_string"), r = require("./mobile_check"), o = require("./get_code"), s = (require("./push_data"), 
require("./get_data")), u = {
    isSendCode: !1,
    num: 0,
    codeNum: 0,
    initData: {},
    dataInit: function() {
        if (!this.initData.rsaExponent) {
            s({
                url: "https://passport.58.com/rsa",
                name: this.initData
            });
        }
        t.getSync("fingerprint") || i();
    },
    getData: function(e, t) {
        var a = "https://passport.58.com/warn/getdata?warnkey=" + e.warnkey + "&source=" + e.source;
        s({
            url: a,
            name: this.initData
        }, t);
    },
    getCode: function(e) {
        var t = this;
        !t.initData.token && t.codeNum < 50 ? setTimeout(function() {
            t.getCode(e), t.codeNum++;
        }, 100) : o.passport_getcodeUtil.getCode(e, this, "&warnkey=" + e.warnkey);
    },
    freshValidateCode: function() {
        return o.passport_getcodeUtil.freshValidateCode(this.vcodekey);
    },
    formSubmit: function(a) {
        var i = this, r = t.getSync("fingerprint");
        if (r && i.initData.rsaModulus || !(i.num < 20)) {
            var o = this.initData.token || "", s = a.source || "58-weapp", u = a.password || "", c = a.mobile || "", d = a.mobilecode || "", p = a.warnkey || "", l = a.callback || function() {}, m = (a.url_bind, 
            a.flag || !1), f = a.username || "";
            if (this.validate(u, c, d, l, m)) {
                var g = n(u, i.initData.rsaExponent, i.initData.rsaModulus), h = t.getSync("ppu") ? {
                    ppu: t.getSync("ppu")
                } : {}, k = a.warnurl + "?callback=weapp" || "";
                e(k, {
                    source: s,
                    token: o,
                    password: g,
                    mobile: n(c, i.initData.rsaExponent, i.initData.rsaModulus),
                    mobilecode: d,
                    tokencode: i.tokencode,
                    warnkey: p,
                    fingerprint: r
                }, function(e, a) {
                    a && (0 == (a = a.data).code && (t.setSync("ppu", a.data.ppu), f && t.setSync("username", f)), 
                    l(a));
                }, h, "POST");
            }
        } else setTimeout(function() {
            i.formSubmit(a), i.num++;
        }, 100);
    },
    validate: function(e, t, i, n, o) {
        return !!a.passport_pwdCheck.validate(e, n) && (!!r.passport_mobileCheck.checkMobileInput(t, n, o) && (this.isSendCode ? !(void 0 === i || i.length < 5) || (n({
            code: -1,
            msg: "请填写正确的手机确认码"
        }), !1) : (n({
            code: -1,
            msg: "请点击获取验证码按钮！"
        }), !1)));
    }
};

u.dataInit(), module.exports = {
    passport_warn: u
};