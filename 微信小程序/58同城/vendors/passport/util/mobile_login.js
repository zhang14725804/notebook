var t = {
    1: 0,
    3: 14
}, e = require("./fetch"), i = require("./store"), o = require("./set_fingerprint"), n = require("./encrypt_string"), a = require("./mobile_check"), r = require("./get_code"), p = (require("./push_data"), 
require("./get_data")), s = {
    isSend: !1,
    num: 0,
    codeNum: 0,
    initData: {},
    dataInit: function() {
        if (!this.initData.rsaExponent) {
            p({
                url: "https://passport.58.com/rsa",
                name: this.initData
            });
        }
        i.getSync("fingerprint") || o();
    },
    getData: function(t) {
        p({
            url: "https://passport.58.com/mobile/m/init",
            name: this.initData
        }, t);
    },
    getCode: function(t) {
        var e = this;
        !e.initData.token && e.codeNum < 50 ? setTimeout(function() {
            e.getCode(t), e.codeNum++;
        }, 100) : "3" == t.templateCode ? r.passport_getcodeUtil.getCode(t, this, "&thirdtype=19") : r.passport_getcodeUtil.getCode(t, this);
    },
    freshValidateCode: function() {
        return r.passport_getcodeUtil.freshValidateCode(this.vcodekey);
    },
    formSubmit: function(o) {
        var a = this, r = i.getSync("fingerprint");
        if (r && a.initData.rsaModulus || !(a.num < 20)) {
            var p = o.source || "passport", s = this.initData.token || "", u = o.mobile || "", c = o.mobilecode || "", d = o.callback || function() {}, l = o.url_bind ? "&url_bind=" + o.url_bind : "", m = o.opentype || "1", h = o.path || "", f = o.templateCode ? t[o.templateCode] : 0, g = o.setIsGoBack || function() {};
            if (this.validate(u, c, d)) {
                var b = i.getSync("ppu") ? {
                    ppu: i.getSync("ppu")
                } : {}, y = "https://passport.58.com/mobile/m/login?token=" + s + "&mobile=" + n(u, this.initData.rsaExponent, this.initData.rsaModulus) + "&mobilecode=" + c + "&source=" + p + "&tokencode=" + this.tokencode + "&codetype=" + f + "&fingerprint=" + r;
                e(y, {}, function(t, e) {
                    if (e) if (0 == (e = e.data).code) i.setSync("ppu", e.data.ppu), i.setSync("pptmobile", u), 
                    d(e); else if (2 == e.code) {
                        g();
                        var n = e.data.warnkey, a = e.data.warnurl || "https://passport.58.com/warn/remove", r = o.pathUrl || "./";
                        wx.redirectTo({
                            url: r + "passport?type=6&warnkey=" + n + "&source=" + p + "&opentype=" + m + "&warnurl=" + encodeURIComponent(a) + l + "&path=" + h
                        });
                    } else d(e);
                }, b);
            }
        } else setTimeout(function() {
            a.formSubmit(o), a.num++;
        }, 100);
    },
    validate: function(t, e, i) {
        if (a.passport_mobileCheck.checkMobileInput(t, i)) return this.isSendCode ? !(void 0 === e || e.length < 5) || (i({
            code: -1,
            msg: "请填写正确的手机确认码"
        }), !1) : (i({
            code: -1,
            msg: "请点击获取验证码按钮！"
        }), !1);
    },
    bind: function(t, o) {
        i.remove("pptmobile");
        var n = i.getSync("ppu") ? {
            ppu: i.getSync("ppu")
        } : {};
        e(t, {}, function(t, e) {
            e && (0 != (e = e.data).code && i.remove("ppu"), o(e));
        }, n);
    }
};

s.dataInit(), module.exports = {
    passport_mobileUtil: s
};