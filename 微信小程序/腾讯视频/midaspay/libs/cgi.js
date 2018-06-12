var e = void 0, t = e = require("./util"), i = require("./cryptojs"), s = (require("./timer"), 
module.exports = function(e) {
    e = e || {}, this.pf = e.pf || "vip_m-pay_html5-html5", this.pfkey = e.pfkey || "pfkey", 
    this.appid = e.appid, this.sandbox = ~~e.sandbox, this.sessionObj = e.sessionObj || null, 
    this.mid = e.mid || "r", this.domain = "api.unipay.qq.com", 1 == this.sandbox ? this.domain = "sandbox.api.unipay.qq.com" : 2 == this.sandbox && (this.domain = "dev.api.unipay.qq.com"), 
    this.domainq = this.sandbox ? "sandbox.api.unipay.qq.com" : "q.unipay.qq.com", this.aesKey = this.sandbox ? "0269bd8009164afc" : "2Wozy2aksie1puXU", 
    this.sessionToken = e.sessionToken || t.fn.uuid() + new Date().getTime(), e.extend && (this.extend = e.extend);
});

s.url = {
    mobileGetConfig: {
        url: "$domain$/v1/r/$appid$/mobile_get_config",
        https: !0
    },
    mobileMonthInfo: {
        url: "$domain$/v1/r/$appid$/mobile_month_info?",
        https: !0
    },
    mobileSaveMonth: {
        url: "$domain$/v1/r/$appid$/mobile_save_month",
        https: !0
    },
    mobileBuyPage: {
        url: "$domain$/v1/r/$appid$/mobile_buy_page?",
        https: !0
    },
    mobileGetToken: {
        url: "$domain$/v1/r/$appid$/mobile_get_token?",
        https: !0
    },
    mobileSave: {
        url: "$domain$/v1/r/$appid$/mobile_save?",
        https: !0
    },
    mobileGoodsInfo: {
        url: "$domain$$params$&",
        https: !0
    },
    mobileSaveGoods: {
        url: "$domain$/v1/$mid$/$appid$/mobile_save_goods?",
        https: !0
    },
    mobileSaveGoods2: {
        url: "$params$&",
        https: !0
    },
    mobileSaveGoods3: {
        url: "$domain$$params$&",
        https: !0
    },
    getQqacctYue: {
        url: "$domain$/v1/r/$appid$/wechat_query?cmd=4&",
        https: !1
    },
    getQQNick: {
        url: "$domain$/v1/r/$appid$/wechat_query?cmd=1&",
        https: !1
    },
    mobileGetImage: {
        url: "$domain$/v1/r/$appid$/mobile_get_image?",
        https: !1
    },
    mobileGetCardbillInfo: {
        url: "$domain$/v1/r/$appid$/mobile_get_cardbill_info?",
        https: !1
    },
    waterQuery: {
        url: "$domain$/v1/r/$appid$/water_query?",
        https: !1
    },
    getPayResult: {
        url: "$domain$/v1/r/$appid$/get_pay_result?",
        https: !0
    },
    mobileWirelessProc: {
        url: "$domain$/v1/r/$appid$/mobile_wireless_proc?",
        https: !0
    },
    jifenPayGoods: {
        url: "https://m.jifen.qq.com/cgi-bin/pay_goods?",
        https: !0
    }
}, s.isEnterprise = !1, s.prototype = {
    setEnv: function(e) {
        if (e && this.sandbox) switch (this.env = e, e) {
          case "dev":
            this.domain = "dev.api.unipay.qq.com";
            break;

          case "sandbox":
            this.domain = "sandbox.api.unipay.qq.com";
        }
    },
    restoreEnv: function() {
        this.sandbox && this.setEnv("sandbox");
    },
    set isSandbox(e) {
        this.sandbox = e, this.domain = this.sandbox ? "sandbox.api.unipay.qq.com" : "api.unipay.qq.com", 
        this.aesKey = this.sandbox ? "0269bd8009164afc" : "2Wozy2aksie1puXU";
    },
    aes: function(e, s) {
        var n = [];
        return t.fn.each(s, function(t) {
            n.push(t + "=" + (e[t] || ""));
        }), n = n.join("&"), {
            encrypt_msg: i.AES.encrypt(i.enc.Latin1.parse(n), i.enc.Latin1.parse(this.aesKey), {
                padding: i.pad.ZeroPadding,
                iv: i.enc.Latin1.parse(this.aesKey),
                mode: i.mode.ECB
            }).ciphertext.toString(i.enc.Hex),
            msg_len: n.length
        };
    },
    aesDecrypt: function(e) {
        return e = i.enc.Hex.parse(e), e = i.enc.Base64.stringify(e), i.AES.decrypt(e, i.enc.Utf8.parse(this.aesKey), {
            padding: i.pad.ZeroPadding,
            mode: i.mode.ECB
        }).toString(i.enc.Utf8);
    },
    _getCgiUrl: function(e, i, s) {
        i = i || {}, s = s || {};
        return t.tmpl(e.url, t.fn.extend({
            appid: this.appid,
            mid: this.mid || "r",
            domain: [ "https:", "//", s.domainq ? this.domainq : this.domain ].join("")
        }, i));
    },
    setSession: function(e) {
        this.sessionObj = e;
    },
    _getSessionParam: function() {
        return t.fn.extend({
            pf: this.pf,
            pfkey: this.pfkey,
            from_h5: 1,
            session_token: this.sessionToken,
            r: Math.random()
        }, this.sessionObj.getSessionParam());
    },
    request: function(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, i = arguments[2], s = arguments[3];
        s = s || {}, wx && function() {
            try {
                wx.showToast({
                    title: "支付中...",
                    icon: "loading",
                    duration: 3e3
                });
            } catch (e) {}
            var s = !1, n = {
                ret: -1
            };
            wx.request({
                url: e,
                method: "GET",
                header: {},
                data: t,
                success: function(e) {
                    s = !0, n = e.statusCode >= 200 && e.statusCode <= 299 ? e.data : {
                        ret: -9998,
                        msg: "系统繁忙，请稍后再试！"
                    };
                },
                fail: function() {
                    s = !1, n = {
                        ret: -9999,
                        msg: "请求超时！"
                    };
                },
                complete: function() {
                    try {
                        wx.hideToast();
                    } catch (e) {}
                    i(n);
                }
            });
        }();
    },
    mobileSave: function(e, i, n) {
        var o;
        o = {
            wx_direct_pay: 0,
            wx_publice_pay: "wechat" === (e = e || {}).pay_method ? 1 : 0,
            format: "request_buy"
        }, t.fn.extend(o, this._getSessionParam()), t.fn.extend(o, e), t.fn.extend(o, this.aes(o, [ "biz_appid", "token_id", "openid", "openkey", "session_id", "session_type", "zoneid", "pay_method", "buy_quantity", "mb_pwd", "pay_id", "auth_key", "card_value", "accounttype" ])), 
        this.request(this._getCgiUrl(s.url.mobileSave), o, i, n);
    },
    mobileSaveMonth: function(e, i) {
        var n = {
            wx_direct_pay: 0,
            wx_publice_pay: "wechat" === (e = e || {}).pay_method ? 1 : 0
        };
        t.fn.extend(n, this._getSessionParam()), t.fn.extend(n, e), t.fn.extend(n, this.aes(n, [ "openid", "openkey", "session_id", "session_type", "zoneid", "pay_method", "buy_quantity", "mb_pwd", "pay_id", "auth_key", "card_value", "accounttype" ])), 
        this.request(this._getCgiUrl(s.url.mobileSaveMonth), n, i, "buy_month");
    },
    mobileBuyPage: function(e, i, n) {
        e = e || {};
        var o = {};
        t.fn.extend(o, this._getSessionParam()), t.fn.extend(o, e), t.fn.extend(o, this.aes(o, [ "openid", "openkey", "session_id", "session_type" ])), 
        this.request(this._getCgiUrl(s.url.mobileBuyPage), o, i, n);
    },
    mobileGetToken: function(e, i, n) {
        e = e || {};
        var o = {};
        t.fn.extend(o, this._getSessionParam()), t.fn.extend(o, e), t.fn.extend(o, this.aes(o, [ "openid", "openkey", "session_id", "session_type" ])), 
        this.request(this._getCgiUrl(s.url.mobileGetToken), o, i, n);
    },
    mobileMonthInfo: function(e, i) {
        e = e || {};
        var n = "_mobileMonthInfo", o = {
            format: "request_" + n
        };
        t.fn.extend(o, this._getSessionParam()), t.fn.extend(o, e), this.request(this._getCgiUrl(s.url.mobileMonthInfo), o, i, n);
    },
    mobileGoodsInfo: function(e, i, n) {
        e = e || {};
        var o = {};
        t.fn.extend(o, this._getSessionParam()), t.fn.extend(o, e), this.request(this._getCgiUrl(s.url.mobileGoodsInfo, {
            params: e.params
        }), o, i, n);
    },
    mobileSaveGoods: function(e, i, n) {
        e = e || {};
        var o = {
            biz_appid: this.sessionObj.appid || ""
        }, a = e._url, r = e._mid, d = e._params;
        delete e._url, delete e._mid, delete e._params, t.fn.extend(o, this._getSessionParam()), 
        t.fn.extend(o, e), t.fn.extend(o, this.aes(o, [ "openid", "openkey", "session_id", "session_type", "pay_method", "buy_quantity", "mb_pwd", "pay_id", "auth_key", "card_value" ])), 
        d ? /\/mobile_goods_info\?/.test(d) ? (d = d.replace(/\/[a-z_]+\?/, "/mobile_save_goods?"), 
        this.request(this._getCgiUrl(s.url.mobileSaveGoods3, {
            params: d
        }), o, i, n)) : this.request(this._getCgiUrl(s.url.mobileSaveGoods2, {
            params: d
        }), o, i, n) : a ? this.request(a, o, i, n) : this.request(this._getCgiUrl(s.url.mobileSaveGoods, {
            mid: r
        }), o, i, n);
    },
    getQqacctYue: function(e, i, n) {
        e = e || {};
        var o = {
            format: "request__getQqacctYue"
        };
        t.fn.extend(o, this._getSessionParam()), t.fn.extend(o, e), this.request(this._getCgiUrl(s.url.getQqacctYue), o, i, n);
    },
    getQQNick: function(e, i, n) {
        e = e || {};
        var o = {
            extend: encodeURIComponent("TencentUnipayApp=1")
        };
        t.fn.extend(o, this._getSessionParam()), t.fn.extend(o, e), this.request(this._getCgiUrl(s.url.getQQNick), o, cllback, n);
    },
    mobileGetImage: function(e, i, n) {
        e = e || {};
        var o = {};
        t.fn.extend(o, this._getSessionParam()), t.fn.extend(o, e), this.request(this._getCgiUrl(s.url.mobileGetImage), o, i, n);
    },
    mobileGetCardbillInfo: function(e, i) {
        e = e || {};
        var n = {};
        t.fn.extend(n, this._getSessionParam()), t.fn.extend(n, e), this.request(this._getCgiUrl(s.url.mobileGetCardbillInfo), n, i);
    },
    waterQuery: function(e, i, n) {
        e = e || {};
        var o = {
            CmdCode: "query",
            SubCmdCode: "sdk",
            TimeFormat: "unix"
        };
        t.fn.extend(o, this.sessionObj.getSessionParam()), t.fn.extend(o, e), this.request(this._getCgiUrl(s.url.waterQuery, o, {}, n), i, n);
    },
    getPayResult: function(e, i, n) {
        e = e || {};
        var o = {};
        t.fn.extend(o, e), t.fn.extend(o, this.sessionObj.getSessionParam()), this.request(this._getCgiUrl(s.url.getPayResult, o), i, n);
    },
    mobileWirelessProc: function(e, i, n) {
        e = e || {};
        var o = {};
        t.fn.extend(o, e), t.fn.extend(o, this._getSessionParam()), t.fn.extend(o, this.aes(o, [ "openid", "openkey", "pf", "pfkey", "zoneid", "accounttype", "action", "uuid", "type", "buy_quantity", "amt", "service_code", "product_id", "sms_authcode", "hf_billno", "portal_serial_no", "provide_openid", "mobile" ])), 
        this.request(this._getCgiUrl(s.url.mobileWirelessProc, o), i, n);
    },
    mobileGetConfig: function(e, i, n) {
        e = e || {};
        var o = {};
        t.fn.extend(o, e), t.fn.extend(o, {
            offer_id: this.appid,
            req_type: "cpay"
        }), t.fn.extend(o, this._getSessionParam()), t.fn.extend(o, this.aes(o, [ "openid", "openkey", "session_id", "session_type", "pf", "pfkey" ])), 
        this.request(this._getCgiUrl(s.url.mobileGetConfig, o), i, n);
    },
    jifenPayGoods: function(e, i, n) {
        e = e || {};
        var o = {};
        t.fn.extend(o, this._getSessionParam()), t.fn.extend(o, e), t.fn.extend(o, this.aes(o, [ "openid", "openkey", "session_id", "session_type", "pay_method", "buy_quantity" ])), 
        this.request(this._getCgiUrl(s.url.jifenPayGoods, o), o, i, n);
    }
};