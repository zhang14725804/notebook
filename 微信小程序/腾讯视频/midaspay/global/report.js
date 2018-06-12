function e(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

var t = function() {
    function e(e, t) {
        for (var n = 0; n < t.length; n++) {
            var r = t[n];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
            Object.defineProperty(e, r.key, r);
        }
    }
    return function(t, n, r) {
        return n && e(t.prototype, n), r && e(t, r), t;
    };
}(), n = require("../libs/util"), r = require("./context"), o = function() {
    function o() {
        e(this, o), this.reportQueue = [], this.pid = 0, this.iformatPrefix = "";
    }
    return t(o, [ {
        key: "constructParams",
        value: function(e, t, o) {
            var i = {};
            n.fn.extend(i, {
                6: 10,
                7: 0,
                8: t ? n.req.serializeParam(t) : "",
                13: this.pid++,
                21: [ this.iformatPrefix, e ].join("."),
                31: "midas_wx_sdk_" + r.getVersion(),
                38: new Date().getTime()
            });
            var u = [];
            n.fn.each(i, function(e, t) {
                u.push(t + "=" + encodeURIComponent(e));
            });
            var a = [];
            return n.fn.each(o, function(e, t) {
                a.push("&" + t + "=" + encodeURIComponent(e));
            }), "https://api.unipay.qq.com/v1/900/15499/log_data?num=1&record0=" + encodeURIComponent(u.join("|")) + a.join("") + "&rr" + Math.random();
        }
    }, {
        key: "doSend",
        value: function() {
            var e = this, t = this.reportQueue[0];
            wx.request({
                url: t,
                method: "GET",
                complete: function() {
                    e.reportQueue.shift(), e.reportQueue.length > 0 && e.doSend();
                }
            });
        }
    }, {
        key: "send",
        value: function(e, t) {
            var n = this, r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}, o = this.constructParams(e, t, r);
            this.reportQueue.push(o), 1 == this.reportQueue.length && setTimeout(function() {
                n.doSend();
            }, 0);
        }
    }, {
        key: "setIformatPrefix",
        value: function(e) {
            this.iformatPrefix = e;
        }
    } ]), o;
}();

module.exports = o;