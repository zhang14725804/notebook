function t() {
    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, o = arguments[1];
    if (!/^https:\/\//.test(t.url)) throw new Error("Url should be start with https://");
    return new n(function(e, r) {
        u(t, function(t, n) {
            return t ? (o && o(t), r(t)) : (o && o(null, n), e(n));
        });
    });
}

function o(t, o, e) {
    "function" == typeof o && (e = o);
    var n = {};
    return "object" === (void 0 === o ? "undefined" : r(o)) ? Object.assign(n, {
        data: o
    }, {
        url: t
    }) : "string" == typeof t ? Object.assign(n, {
        url: t
    }) : Object.assign(n, t), {
        options: n,
        cb: e
    };
}

function e() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "GET";
    return function(r, n, u) {
        var s = o(r, n, u), i = s.options, l = s.cb;
        return i.method = e, t(i, l);
    };
}

var r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
}, n = require("../../libs/promise.min.js"), u = require("./process.js");

module.exports = t, module.exports.get = e("GET"), module.exports.post = e("POST"), 
module.exports.put = e("PUT"), module.exports.del = e("DELETE");