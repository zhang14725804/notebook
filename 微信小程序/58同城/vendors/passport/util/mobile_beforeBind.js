var t = require("./fetch"), e = require("./store"), i = require("./set_fingerprint"), n = require("./encrypt_string"), a = require("./mobile_check"), o = require("./get_code"), r = (require("./push_data"), 
require("./get_data")), s = {
    isSend: !1,
    num: 0,
    initData: {},
    dataInit: function() {
        if (!this.initData.rsaExponent) {
            r({
                url: "https://passport.58.com/rsa",
                name: this.initData
            });
        }
        e.getSync("fingerprint") || i();
    },
    getData: function(t, e) {
        var i = "https://passport.58.com/sec/challengebind/binddata?warnkey=" + t.warnkey;
        r({
            url: i,
            name: this.initData
        }, e);
    },
    getCode: function(t) {
        var e = this;
        this.getData(t, function(i) {
            t.codetype = i.codetype, t.type = "new", o.passport_getcodeUtil.getCode(t, e, "&warnkey=" + t.warnkey);
        });
    },
    freshValidateCode: function() {
        return o.passport_getcodeUtil.freshValidateCode(this.vcodekey, "new");
    },
    formSubmit: function(i) {
        var a = this, o = this, r = e.getSync("fingerprint");
        if (r && o.initData.rsaModulus || !(o.num < 20)) {
            var s = i.source || "passport", c = this.initData.token || "", p = i.mobile || "", u = i.mobilecode || "", d = i.warnkey || "", l = i.callback || function() {}, h = (i.username, 
            void 0 != this.initData.codetype ? this.initData.codetype : 0);
            if (this.validate(p, u, l)) {
                var m = e.getSync("ppu") ? {
                    ppu: e.getSync("ppu")
                } : {}, g = "https://passport.58.com/sec/challengebind/m/bind?token=" + c + "&warnkey=" + d + "&mobile=" + n(p, this.initData.rsaExponent, this.initData.rsaModulus) + "&mobilecode=" + u + "&source=" + s + "&tokencode=" + this.tokencode + "&codetype=" + h + "&fingerprint=" + r;
                t(g, {}, function(t, e) {
                    e && (0 == (e = e.data).code ? a.bindTologin(e.data, i, l) : l(e));
                }, m);
            }
        } else setTimeout(function() {
            o.formSubmit(i), o.num++;
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
    bindTologin: function(i, n, a) {
        var o = e.getSync("ppu") ? {
            ppu: e.getSync("ppu")
        } : {}, r = "https:" + i.redirctUrl + "?warnkey=" + i.tokenid;
        t(r, {}, function(t, i) {
            i && (0 == (i = i.data).code ? (e.setSync("ppu", i.data.ppu), e.setSync("username", n.username)) : i.msg = "绑定成功，请前往登录页面登录", 
            a(i));
        }, o);
    }
};

s.dataInit(), module.exports = {
    passport_mobileUtil: s
};