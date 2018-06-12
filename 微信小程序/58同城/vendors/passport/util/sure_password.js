var t = require("../util/fetch"), e = require("../util/store"), i = (require("../util/password_check"), 
require("./set_fingerprint")), r = require("./encrypt_string"), a = (require("./push_data"), 
require("./get_data")), n = {
    num: 0,
    initData: {},
    dataInit: function() {
        if (!this.initData.rsaExponent) {
            a({
                url: "https://passport.58.com/rsa",
                name: this.initData
            });
        }
        e.getSync("fingerprint") || i();
    },
    formSubmit: function(i) {
        var a = this, n = e.getSync("fingerprint");
        if (n && a.initData.rsaModulus || !(a.num < 20)) {
            i.source;
            var u = i.password || "", s = i.validcode || "", o = i.vcodekey || "", c = i.callback || function() {};
            if (a.validate(u, s, c)) {
                var p = u, d = e.getSync("ppu") ? {
                    ppu: e.getSync("ppu")
                } : {}, l = p + "＃" + o + "＃" + s, f = i.url ? i.url + "&licence=" + r(l, a.initData.rsaExponent, a.initData.rsaModulus) + "&fingerprint=" + n : "";
                t(f, {}, function(t, i) {
                    i && (0 == (i = i.data).code && e.setSync("ppu", i.data.ppu), c(i));
                }, d);
            }
        } else setTimeout(function() {
            a.formSubmit(i), a.num++;
        }, 100);
    },
    freshValidateCode: function(t) {
        return "https://passport.58.com/validcode/get?vcodekey=" + t + "&time=" + +new Date();
    },
    validate: function(t, e, i) {
        return 0 == t.length ? (i({
            code: -1,
            msg: "请填写正确的密码"
        }), !1) : !(void 0 === e || e.length < 4) || (i({
            code: -1,
            msg: "请填写正确的图片验证码"
        }), !1);
    }
};

n.dataInit(), module.exports = {
    passport_surepassword: n
};