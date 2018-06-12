function t(t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}

var e = function() {
    function t(t, e) {
        for (var a = 0; a < e.length; a++) {
            var n = e[a];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), 
            Object.defineProperty(t, n.key, n);
        }
    }
    return function(e, a, n) {
        return a && t(e.prototype, a), n && t(e, n), e;
    };
}(), a = require("../paymod/channelHandler/channelRoute"), n = require("../global/context"), i = require("../libs/util"), r = require("../global/report"), s = function() {
    function s(e) {
        var a = e.params, o = e.callback, u = e.opt;
        if (t(this, s), this.params = a, this.opt = u, this.callback = o, this.env = {}, 
        !i.lang.isFunction(this.callback)) throw new Error("callback must be a function");
        this.payMod = null, n.setContext(this), i.fn.extend(this.params, {
            env: ~~this.opt.env
        }), this.reportObj = new r(), this.payStartTime = new Date().getTime();
    }
    return e(s, [ {
        key: "checkEnv",
        value: function(t) {
            var e = this;
            wx.getSystemInfo({
                success: function(t) {
                    e.env = t;
                },
                complete: function() {
                    i.lang.isFunction(t) && t();
                }
            });
        }
    }, {
        key: "getPlatform",
        value: function() {
            var t = this.env;
            return t.model ? t.model.indexOf("iPhone") > -1 ? "ios" : "android" : "";
        }
    }, {
        key: "getVersion",
        value: function() {
            var t = this.env;
            return t ? t.version || "" : "";
        }
    }, {
        key: "getPayStartTime",
        value: function() {
            return this.payStartTime;
        }
    }, {
        key: "report",
        value: function(t, e, a) {
            this.reportObj.send(t, e, {
                3: this.params.openid,
                37: this.params.session_id,
                43: this.params.session_type,
                41: this.params.login_wx_appid,
                26: this.params.pf,
                19: this.params.service_code,
                24: this.params.appid,
                50: this.getPlatform() + "_" + this.getVersion(),
                51: this.params.aid || ""
            });
        }
    }, {
        key: "getPayMod",
        value: function() {
            return this.payMod;
        }
    }, {
        key: "directPay",
        value: function() {
            var t = this;
            return !(!this.params.direct_channel || !a.hasOwnProperty(this.params.direct_channel) || (this.report("directpay", {
                channel: this.params.direct_channel
            }), a[this.params.direct_channel](null, function(e) {
                try {
                    var a = new Date().getTime();
                    t.report("payduration", {
                        time: a - t.getPayStartTime()
                    });
                } catch (t) {}
                t.callback(e);
            }), 0));
        }
    }, {
        key: "getBizAppid",
        value: function() {
            return 1 != this.opt.use_default_wxappid ? this.params.biz_appid || "1" : this.payMod.getDefaultBizAppid();
        }
    }, {
        key: "destroy",
        value: function() {
            n.destroyContext(), this.report = null, this.payMod = null;
        }
    } ]), s;
}();

module.exports = s;