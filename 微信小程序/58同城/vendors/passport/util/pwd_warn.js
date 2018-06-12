var t = require("../util/fetch"), e = require("../util/ppt_security2"), r = require("../util/store"), n = require("../util/password_check"), a = {
    getData: function() {
        var e = this;
        t("https://passport.58.com/rsa", {}, function(t, r) {
            r && 0 == (r = r.data).code && (e.rsaExponent = r.data.rsaExponent, e.rsaModulus = r.data.rsaModulus);
        });
    },
    formSubmit: function(e) {
        var a = this, p = e.source || "", i = e.password || "", u = e.warnkey || "", o = e.callback || function() {}, s = e.url_bind || "", c = r.getSync("fingerprint");
        if (n.passport_pwdCheck.validate(i, o)) {
            var d = this.encryptString(i), f = r.getSync("ppu") ? {
                ppu: r.getSync("ppu")
            } : {}, l = e.warnurl + "?callback=weapp" || "";
            t(l, {
                source: p,
                password: d,
                warnkey: u,
                fingerprint: c
            }, function(t, e) {
                if (e) if (0 == (e = e.data).code) {
                    if (r.setSync("ppu", e.data.ppu), s) return void a.bind(decodeURIComponent(s), o);
                    o(e);
                } else o(e);
            }, f, "POST");
        }
    },
    bind: function(e, n) {
        var a = r.getSync("ppu") ? {
            ppu: r.getSync("ppu")
        } : {};
        t(e, {}, function(t, e) {
            e && (0 != (e = e.data).code && r.remove("ppu"), n(e));
        }, a);
    },
    encryptString: function(t) {
        var r = 1411093327735 - new Date().getTime(), n = new Date().getTime() + r;
        return e.encryptString(n + encodeURIComponent(t), this.rsaExponent, this.rsaModulus);
    }
};

a.getData(), module.exports = {
    passport_warn: a
};