function t() {
    return "https:";
}

function r(t) {
    return /^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/.exec(t);
}

function e(t) {
    var e = r(t);
    return e && {
        source: e[0],
        protocol: e[1],
        slash: e[2],
        host: e[3],
        port: e[4],
        path: e[5],
        query: e[6],
        hash: e[7]
    };
}

function o(t) {
    return "http" == e(t).protocol && (t = t.replace("http", "https")), t;
}

function n(t, r) {
    var e = [];
    for (var o in r) e.push(o + "=" + encodeURIComponent(r[o]));
    return t + (t.indexOf("?") > -1 ? "&" : "?") + e.join("&");
}

function i(t, r) {
    var e = new RegExp("(^|&)" + t + "=([^&]*)(&|$)", "i"), o = r.substr(r.indexOf("?") + 1).match(e);
    return null != o ? o[2] : "";
}

function u(r, i, u, a) {
    if (r == h.HTTP_CFG_URL) return i == f.CHANNEL_HTTP ? r : h.WS_CFG_URL;
    var c = e(r);
    if (c.protocol || (r = t() + r), a || (r = o(r)), i == f.CHANNEL_HTTP && a) return "https://wxa.jd.com/api.php?url=" + encodeURIComponent(n(r.replace(/^https/, "http"), u));
    if (p.directHosts.indexOf(c.host) > -1) return r;
    var s = c.host.split(".");
    if (i == f.CHANNEL_HTTP) return r.replace(c.host, "wxa.jd.com/" + s[0]);
    var d = "/";
    return "wq.360buyimg.com" === c.host ? d += s[1] : d += s[0], r.replace(new RegExp("http(s)?://" + c.host), d);
}

function a(t) {
    for (var r = 0, e = t.length, o = 5381; r < e; ++r) o += (o << 5) + t.charAt(r).charCodeAt();
    return "" + (2147483647 & o);
}

var c = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
}, p = require("./config"), f = require("./http_constant"), s = require("./cookie-v2/cookie.js"), h = require("../api/APIs");

module.exports = {
    parseURL: e,
    changeToHttps: o,
    getDomain: function(t) {
        return e(t).host;
    },
    getQueryArray: function(t) {
        var r, o = e(t).query;
        if (o) {
            r = [];
            for (var n = o.split("&"), i = 0; i < n.length; i++) {
                var u = n[i].indexOf("=");
                r[n[i].substring(0, u)] = n[i].substring(u + 1, n[i].length);
            }
        }
        return r;
    },
    getUrlParam: i,
    wxaProxy: u,
    createURL: n,
    transToWebsocketUrl: function(t) {
        if (t.indexOf("api.php") > -1) {
            var r = i("url", t);
            return u(decodeURIComponent(r));
        }
        return t;
    },
    addCsrfToken: function(t) {
        if ("object" != (void 0 === t ? "undefined" : c(t))) throw new Error("addCsrfToken的'paramObj'参数必须是object");
        var r = s.getCookie("wq_skey");
        r && (t.g_ty = "ls", t.g_tk = a(r));
    },
    addUrlParam: function(t, r) {
        if (t && r && "object" == (void 0 === r ? "undefined" : c(r))) {
            var e = [];
            for (var o in r) r.hasOwnProperty(o) && e.push(o + "=" + encodeURIComponent(r[o]));
            if (e[0]) {
                var n = e.join("&");
                t = t.indexOf("?") > -1 ? t + "&" + n : t + "?" + n;
            }
        }
        return t;
    }
};