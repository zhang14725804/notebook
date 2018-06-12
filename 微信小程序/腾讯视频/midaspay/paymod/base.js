function e(e, i) {
    if (!(e instanceof i)) throw new TypeError("Cannot call a class as a function");
}

var i, n = function() {
    function e(e, i) {
        for (var n = 0; n < i.length; n++) {
            var s = i[n];
            s.enumerable = s.enumerable || !1, s.configurable = !0, "value" in s && (s.writable = !0), 
            Object.defineProperty(e, s.key, s);
        }
    }
    return function(i, n, s) {
        return n && e(i.prototype, n), s && e(i, s), i;
    };
}(), s = require("../libs/session"), t = require("../libs/cgi"), r = (require("../global/errorCode"), 
require("../libs/util")), a = (require("../global/context"), function(e) {
    e.prototype.checkPublicParams = function() {
        var e = this.params, i = "", n = {
            status: !0,
            msg: ""
        };
        return r.fn.each([ "appid", "openid", "openkey", "session_id", "session_type" ], function(n) {
            if (!e[n]) return i = n + "错误", !1;
        }), i && (n.status = !1, n.msg = i), n;
    };
}(i = function() {
    function i(n) {
        e(this, i), this.params = n, this.session = new s({
            openid: n.openid,
            openkey: n.openkey,
            sessionid: n.sessionid || "hy_gameid",
            sessiontype: n.sessiontype || "wc_actoken"
        }), this.cgi = null;
    }
    return n(i, [ {
        key: "initCgi",
        value: function() {
            this.cgi = new t({
                pf: this.params.pf,
                pfkey: this.params.pfkey || "pfkey",
                appid: this.params.appid,
                sandbox: ~~this.params.env,
                sessionObj: this.session
            });
        }
    }, {
        key: "getInfoPublicParams",
        value: function() {}
    }, {
        key: "getSavePublicParams",
        value: function() {
            return {
                from_https: "1",
                from_h5: "1",
                provide_uin: this.params.provide_uin || "",
                wx_appid: this.params.login_wx_appid || ""
            };
        }
    }, {
        key: "getDefaultBizAppid",
        value: function() {
            return "wx951bdcac522929b6";
        }
    }, {
        key: "save",
        value: function(e, i) {}
    } ]), i;
}()) || i);

module.exports = a;