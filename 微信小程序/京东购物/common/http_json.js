function t(t) {
    var e = u.parseURL(t);
    return e ? (e.protocol || (t = "https:" + t), u.changeToHttps(t)) : t;
}

var e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
}, u = require("./url_utils"), r = require("./http_constant"), n = require("./request/request.js"), o = function(t) {
    return function() {
        return "http_uid_" + new Date().getTime() + "_" + t++;
    };
}(0);

module.exports = {
    ENCODE_GBK: r.ENCODE_GBK,
    ENCODE_UTF8: r.ENCODE_UTF8,
    getByEncode: function(u, r, o, i, a, l) {
        var c = {
            method: "GET"
        };
        "object" === (void 0 === u ? "undefined" : e(u)) ? (c.url = u.url, c.data = u.data, 
        c.uniKey = u.uniqueKey, i = u.callback) : (c.url = u, c.data = r), c.encoding = "GBK", 
        c.url = t(c.url), n.get(c).then(function(t) {
            var e = t.body;
            return i.success(e);
        }, i.fail);
    },
    get: function(u, r, o, i, a) {
        var l = {
            method: "GET"
        };
        "object" === (void 0 === u ? "undefined" : e(u)) ? (l.url = u.url, l.data = u.data, 
        l.uniKey = u.uniqueKey, o = u.callback) : (l.url = u, l.data = r), l.url = t(l.url), 
        console.log("%%%%%%%%%%% url", l.url), 30 == i && (l.priority = "REPORT"), n.get(l).then(function(t) {
            var e = t.body;
            return o.success(e);
        }, o.fail);
    },
    post: function(u, r, o, i, a) {
        var l = {
            method: "POST"
        };
        "object" === (void 0 === u ? "undefined" : e(u)) ? (l.url = u.url, l.data = u.data, 
        l.uniKey = u.uniqueKey, o = u.callback) : (l.url = u, l.data = r), l.url = t(l.url), 
        30 == i && (l.priority = "REPORT"), n.post(l).then(function(t) {
            var e = t.body;
            return o.success(e);
        }, o.fail);
    },
    getUniqueKey: o
};