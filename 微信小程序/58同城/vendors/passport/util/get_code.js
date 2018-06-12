var e = {
    1: 0,
    3: 14,
    5: 5,
    6: 5,
    7: 6
}, t = require("../util/fetch"), o = require("../util/store"), i = require("/mobile_check"), c = require("/encrypt_string"), a = {
    getCode: function(a, d, r) {
        var n = this, s = o.getSync("fingerprint");
        if (s && d.initData.rsaModulus || !(d.num < 10)) {
            var p = d.initData.token || "", l = a.source || "", u = a.mobile || "", v = a.validcode ? a.validcode : "", m = a.flag || !1, k = a.callback ? a.callback : function() {};
            if (i.passport_mobileCheck.checkMobileInput(u, k, m)) {
                var y = d.vcodekey ? "&vcodekey=" + d.vcodekey : "", f = r || "", g = "";
                g = void 0 != a.codetype ? a.codetype : a.templateCode ? e[a.templateCode] : 0;
                var h = (void 0 != a.type && "new" == a.type ? "https://passport.58.com/sec/mobile/getcode" : "https://passport.58.com/mobile/getcode") + "?token=" + p + "&mobile=" + c(u, d.initData.rsaExponent, d.initData.rsaModulus) + "&validcode=" + v + "&codetype=" + g + "&source=" + l + y + "&fingerprint=" + s + f;
                t(h, {}, function(e, t) {
                    t && (0 == (t = t.data).code ? (d.tokencode = t.data.tokencode, d.isSendCode = !0) : 785 == t.code && (d.vcodekey = t.data.vcodekey), 
                    k(t));
                });
            }
        } else setTimeout(function() {
            n.getCode(a), d.num++;
        }, 100);
    },
    freshValidateCode: function(e, t) {
        return (void 0 != t && "new" == t ? "https://passport.58.com/sec/validcode/get" : "https://passport.58.com/validcode/get") + "?vcodekey=" + e + "&time=" + +new Date();
    }
};

module.exports = {
    passport_getcodeUtil: a
};