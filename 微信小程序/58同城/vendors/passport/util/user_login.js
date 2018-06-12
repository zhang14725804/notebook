var e = require("./fetch"), t = require("./encrypt_string"), a = require("./store"), r = (require("./push_data"), 
require("./set_fingerprint")), n = require("./get_data"), i = {
    num: 0,
    initData: {},
    dataInit: function() {
        var e = this;
        if (!e.initData.rsaExponent) {
            n({
                url: "https://passport.58.com/rsa",
                name: this.initData
            });
        }
        e.initData.token || this.getData(), a.getSync("fingerprint") || r();
    },
    getData: function(e) {
        n({
            url: "https://passport.58.com/login/init",
            name: this.initData
        }, e);
    },
    formSubmit: function(r) {
        var n = this, i = this, o = a.getSync("fingerprint");
        if (o && i.initData.rsaModulus || !(i.num < 20)) {
            var s = r.source || "", p = r.username || "", u = r.password || "", c = r.validcode || "", d = r.callback || function() {}, l = r.opentype || "1", m = r.path || "", h = r.templateCode || "", v = "9" == h, g = r.setIsGoBack || function() {}, f = r.url_bind || "";
            if (this.validate(p, u, d)) {
                var y = a.getSync("ppu") ? {
                    ppu: a.getSync("ppu")
                } : {}, k = {
                    username: p,
                    password: t(u, this.initData.rsaExponent, this.initData.rsaModulus),
                    source: s,
                    token: i.initData.token,
                    validcode: c,
                    fingerprint: o
                };
                this.vcodekey && (k.vcodekey = this.vcodekey), e("https://passport.58.com/login/pc/dologin?callback=weapp", k, function(e, t) {
                    if (t) {
                        t = t.data;
                        var o = r.pathUrl || "./";
                        if (0 == t.code) a.setSync("ppu", t.data.ppu), a.setSync("userName", p); else {
                            if (2 == t.code) {
                                if (!n.challengeTips(h, t, d)) return;
                                g();
                                var u = t.data.warnkey, c = t.data.warnurl || "https://passport.58.com/warn/remove";
                                return void wx.redirectTo({
                                    url: o + "passport?type=5&warnkey=" + u + "&source=" + s + "&opentype=" + l + "&mobile=" + t.data.mobile + "&warnurl=" + encodeURIComponent(c) + "&username=" + p + "&path=" + m
                                });
                            }
                            if (18 == t.code) {
                                if (!n.challengeTips(h, t, d)) return;
                                g();
                                var y = t.data.warnkey;
                                return void wx.redirectTo({
                                    url: o + "passport?type=8&warnkey=" + y + "&source=" + s + "&bindType=1&opentype=" + l + "&username=" + p + "&path=" + m
                                });
                            }
                            if (3 == t.code) {
                                g();
                                var k = t.data.warnkey, w = t.data.warnurl || "https://passport.58.com/warn/remove";
                                return void wx.redirectTo({
                                    url: o + "passport?type=7&warnkey=" + k + "&source=" + s + "&opentype=" + l + "&mobile=" + t.data.mobile + "&username=" + p + "&warnurl=" + encodeURIComponent(w) + "&path=" + m + "&isBind=" + v + "&url_bind=" + f
                                });
                            }
                            785 == t.code && (i.vcodekey = t.data.vcodekey);
                        }
                        d(t);
                    }
                }, y, "POST");
            }
        } else setTimeout(function() {
            i.formSubmit(r), i.num++;
        }, 100);
    },
    validate: function(e, t, a) {
        return void 0 === e || 0 == e.length ? (a({
            code: -1,
            msg: "请输入用户名！"
        }), !1) : void 0 === t || 0 == t.length ? (a({
            code: -1,
            msg: "请输入密码！"
        }), !1) : t.length > 0 && t.length < 6 ? (a({
            code: -1,
            msg: "密码太短，最少为6位。"
        }), !1) : !(t.length > 16) || (a({
            code: -1,
            msg: "密码不应超过16个字符"
        }), !1);
    },
    challengeTips: function(e, t, a) {
        return "9" != e || (t.msg = " 账号存在安全风险，请在其它端登录解除", a(t), !1);
    },
    freshValidateCode: function() {
        var e = +new Date();
        return "https://passport.58.com/validcode/get?vcodekey=" + this.vcodekey + "&time=" + e;
    },
    bind: function(t, r) {
        a.remove("userName");
        var n = a.getSync("ppu") ? {
            ppu: a.getSync("ppu")
        } : {};
        e(t, {}, function(e, t) {
            t && (0 != (t = t.data).code && a.remove("ppu"), r(t));
        }, n);
    }
};

i.dataInit(), module.exports = {
    passport_userNameUtil: i
};