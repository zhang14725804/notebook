function e(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

function t() {}

var o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
}, n = function() {
    function e(e, t) {
        for (var o = 0; o < t.length; o++) {
            var n = t[o];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), 
            Object.defineProperty(e, n.key, n);
        }
    }
    return function(t, o, n) {
        return o && e(t.prototype, o), n && e(t, n), t;
    };
}(), r = require("./util.js"), a = require("../cookie-v2/cookie.js"), i = 0, u = function() {
    function u(o) {
        var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : t;
        return e(this, u), o.id = i++, o.method = o.method || "GET", o.dataType = o.dataType || "json", 
        o.encoding = o.encoding || "UTF8", o.priority = o.priority || "NORMAL", o.retry = o.retry || 1, 
        o.retryNum = o.retry, o.exchange = void 0 === o.exchange || !!o.exchange, o.exchangeFlag = o.exchange, 
        o.responseList = [], o.callback = n, o.handler = {}, o.speed = {}, o.url = this.formatURL(o), 
        o.data = this.formatData(o), o.header = this.getHeader(o), o;
    }
    return n(u, [ {
        key: "getToken",
        value: function() {
            var e = a.getCookie("wq_skey");
            if (e) return {
                g_ty: "ls",
                g_tk: r.getCSRFToken(e)
            };
        }
    }, {
        key: "formatURL",
        value: function(e) {
            var t = e.url, n = e.method, a = e.data, i = e.noToken ? null : this.getToken(), u = t.indexOf("?") > -1 ? "&" : "?";
            return "GET" == n && "object" === (void 0 === a ? "undefined" : o(a)) ? t + u + r.toFormData(Object.assign({}, a, i || {})) : i ? t + u + r.toFormData(i) : t;
        }
    }, {
        key: "formatData",
        value: function(e) {
            var t = e.method, o = e.data;
            switch (e.rawData = o, t) {
              case "GET":
                return "";

              default:
                return o;
            }
        }
    }, {
        key: "getHeader",
        value: function(e) {
            var t = e.method, o = e.header, n = {
                Cookie: a.getCookie()
            };
            return "POST" == t && (n["Content-Type"] = "application/x-www-form-urlencoded"), 
            Object.assign({}, n, o);
        }
    } ]), u;
}();

module.exports = u;