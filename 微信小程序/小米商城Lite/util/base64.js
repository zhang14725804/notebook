!function(e) {
    var r, t = e.Base64;
    if ("undefined" != typeof module && module.exports) try {
        r = require("buffer").Buffer;
    } catch (e) {}
    var n = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", o = function(e) {
        for (var r = {}, t = 0, n = e.length; t < n; t++) r[e.charAt(t)] = t;
        return r;
    }(n), u = String.fromCharCode, c = function(e) {
        if (e.length < 2) return (r = e.charCodeAt(0)) < 128 ? e : r < 2048 ? u(192 | r >>> 6) + u(128 | 63 & r) : u(224 | r >>> 12 & 15) + u(128 | r >>> 6 & 63) + u(128 | 63 & r);
        var r = 65536 + 1024 * (e.charCodeAt(0) - 55296) + (e.charCodeAt(1) - 56320);
        return u(240 | r >>> 18 & 7) + u(128 | r >>> 12 & 63) + u(128 | r >>> 6 & 63) + u(128 | 63 & r);
    }, a = /[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g, i = function(e) {
        return e.replace(a, c);
    }, f = function(e) {
        var r = [ 0, 2, 1 ][e.length % 3], t = e.charCodeAt(0) << 16 | (e.length > 1 ? e.charCodeAt(1) : 0) << 8 | (e.length > 2 ? e.charCodeAt(2) : 0);
        return [ n.charAt(t >>> 18), n.charAt(t >>> 12 & 63), r >= 2 ? "=" : n.charAt(t >>> 6 & 63), r >= 1 ? "=" : n.charAt(63 & t) ].join("");
    }, d = e.btoa ? function(r) {
        return e.btoa(r);
    } : function(e) {
        return e.replace(/[\s\S]{1,3}/g, f);
    }, h = r ? function(e) {
        return (e.constructor === r.constructor ? e : new r(e)).toString("base64");
    } : function(e) {
        return d(i(e));
    }, g = function(e, r) {
        return r ? h(String(e)).replace(/[+\/]/g, function(e) {
            return "+" == e ? "-" : "_";
        }).replace(/=/g, "") : h(String(e));
    }, l = r ? function(e) {
        return s(new r(e).toString("base64"));
    } : function(e) {
        return s(d(i(e)));
    }, s = function(e) {
        e = e.replace(/\r\n/g, "\n");
        for (var r = "", t = 0; t < e.length; t++) {
            var n = e.charCodeAt(t);
            n < 128 ? r += String.fromCharCode(n) : n > 127 && n < 2048 ? (r += String.fromCharCode(n >> 6 | 192), 
            r += String.fromCharCode(63 & n | 128)) : (r += String.fromCharCode(n >> 12 | 224), 
            r += String.fromCharCode(n >> 6 & 63 | 128), r += String.fromCharCode(63 & n | 128));
        }
        return r;
    }, p = new RegExp([ "[À-ß][-¿]", "[à-ï][-¿]{2}", "[ð-÷][-¿]{3}" ].join("|"), "g"), C = function(e) {
        switch (e.length) {
          case 4:
            var r = ((7 & e.charCodeAt(0)) << 18 | (63 & e.charCodeAt(1)) << 12 | (63 & e.charCodeAt(2)) << 6 | 63 & e.charCodeAt(3)) - 65536;
            return u(55296 + (r >>> 10)) + u(56320 + (1023 & r));

          case 3:
            return u((15 & e.charCodeAt(0)) << 12 | (63 & e.charCodeAt(1)) << 6 | 63 & e.charCodeAt(2));

          default:
            return u((31 & e.charCodeAt(0)) << 6 | 63 & e.charCodeAt(1));
        }
    }, A = function(e) {
        return e.replace(p, C);
    }, b = function(e) {
        var r = e.length, t = r % 4, n = (r > 0 ? o[e.charAt(0)] << 18 : 0) | (r > 1 ? o[e.charAt(1)] << 12 : 0) | (r > 2 ? o[e.charAt(2)] << 6 : 0) | (r > 3 ? o[e.charAt(3)] : 0), c = [ u(n >>> 16), u(n >>> 8 & 255), u(255 & n) ];
        return c.length -= [ 0, 0, 2, 1 ][t], c.join("");
    }, S = e.atob ? function(r) {
        return e.atob(r);
    } : function(e) {
        return e.replace(/[\s\S]{1,4}/g, b);
    }, B = r ? function(e) {
        return (e.constructor === r.constructor ? e : new r(e, "base64")).toString();
    } : function(e) {
        return A(S(e));
    }, m = function(e) {
        return B(String(e).replace(/[-_]/g, function(e) {
            return "-" == e ? "+" : "/";
        }).replace(/[^A-Za-z0-9\+\/]/g, ""));
    };
    if (e.Base64 = {
        VERSION: "2.1.9",
        atob: S,
        btoa: d,
        fromBase64: m,
        toBase64: g,
        utob: i,
        encode: g,
        encodeURI: function(e) {
            return g(e, !0);
        },
        btou: A,
        decode: m,
        noConflict: function() {
            var r = e.Base64;
            return e.Base64 = t, r;
        },
        encode_utf8: function(e, r) {
            return r ? l(e).replace(/[+\/]/g, function(e) {
                return "+" == e ? "-" : "_";
            }).replace(/=/g, "") : l(e);
        }
    }, "function" == typeof Object.defineProperty) {
        var y = function(e) {
            return {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0
            };
        };
        e.Base64.extendString = function() {
            Object.defineProperty(String.prototype, "fromBase64", y(function() {
                return m(this);
            })), Object.defineProperty(String.prototype, "toBase64", y(function(e) {
                return g(this, e);
            })), Object.defineProperty(String.prototype, "toBase64URI", y(function() {
                return g(this, !0);
            }));
        };
    }
    e.Meteor && (Base64 = e.Base64), "undefined" != typeof module && module.exports && (module.exports.Base64 = e.Base64), 
    "function" == typeof define && define.amd && define([], function() {
        return e.Base64;
    });
}("undefined" != typeof self ? self : "undefined" != typeof window ? window : "undefined" != typeof global ? global : void 0);