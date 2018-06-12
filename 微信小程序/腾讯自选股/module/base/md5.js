(function() {
    function a(a) {
        return a && a.__esModule ? a : {
            default: a
        };
    }
    function b(e, l) {
        e[l >> 5] |= 128 << l % 32, e[(l + 64 >>> 9 << 4) + 14] = l;
        for (var m = 1732584193, a = -271733879, b = -1732584194, c = 271733878, d = 0; d < e.length; d += 16) {
            var i = m, n = a, o = b, p = c;
            m = f(m, a, b, c, e[d + 0], 7, -680876936), c = f(c, m, a, b, e[d + 1], 12, -389564586), 
            b = f(b, c, m, a, e[d + 2], 17, 606105819), a = f(a, b, c, m, e[d + 3], 22, -1044525330), 
            m = f(m, a, b, c, e[d + 4], 7, -176418897), c = f(c, m, a, b, e[d + 5], 12, 1200080426), 
            b = f(b, c, m, a, e[d + 6], 17, -1473231341), a = f(a, b, c, m, e[d + 7], 22, -45705983), 
            m = f(m, a, b, c, e[d + 8], 7, 1770035416), c = f(c, m, a, b, e[d + 9], 12, -1958414417), 
            b = f(b, c, m, a, e[d + 10], 17, -42063), a = f(a, b, c, m, e[d + 11], 22, -1990404162), 
            m = f(m, a, b, c, e[d + 12], 7, 1804603682), c = f(c, m, a, b, e[d + 13], 12, -40341101), 
            b = f(b, c, m, a, e[d + 14], 17, -1502002290), a = f(a, b, c, m, e[d + 15], 22, 1236535329), 
            m = g(m, a, b, c, e[d + 1], 5, -165796510), c = g(c, m, a, b, e[d + 6], 9, -1069501632), 
            b = g(b, c, m, a, e[d + 11], 14, 643717713), a = g(a, b, c, m, e[d + 0], 20, -373897302), 
            m = g(m, a, b, c, e[d + 5], 5, -701558691), c = g(c, m, a, b, e[d + 10], 9, 38016083), 
            b = g(b, c, m, a, e[d + 15], 14, -660478335), a = g(a, b, c, m, e[d + 4], 20, -405537848), 
            m = g(m, a, b, c, e[d + 9], 5, 568446438), c = g(c, m, a, b, e[d + 14], 9, -1019803690), 
            b = g(b, c, m, a, e[d + 3], 14, -187363961), a = g(a, b, c, m, e[d + 8], 20, 1163531501), 
            m = g(m, a, b, c, e[d + 13], 5, -1444681467), c = g(c, m, a, b, e[d + 2], 9, -51403784), 
            b = g(b, c, m, a, e[d + 7], 14, 1735328473), a = g(a, b, c, m, e[d + 12], 20, -1926607734), 
            m = h(m, a, b, c, e[d + 5], 4, -378558), c = h(c, m, a, b, e[d + 8], 11, -2022574463), 
            b = h(b, c, m, a, e[d + 11], 16, 1839030562), a = h(a, b, c, m, e[d + 14], 23, -35309556), 
            m = h(m, a, b, c, e[d + 1], 4, -1530992060), c = h(c, m, a, b, e[d + 4], 11, 1272893353), 
            b = h(b, c, m, a, e[d + 7], 16, -155497632), a = h(a, b, c, m, e[d + 10], 23, -1094730640), 
            m = h(m, a, b, c, e[d + 13], 4, 681279174), c = h(c, m, a, b, e[d + 0], 11, -358537222), 
            b = h(b, c, m, a, e[d + 3], 16, -722521979), a = h(a, b, c, m, e[d + 6], 23, 76029189), 
            m = h(m, a, b, c, e[d + 9], 4, -640364487), c = h(c, m, a, b, e[d + 12], 11, -421815835), 
            b = h(b, c, m, a, e[d + 15], 16, 530742520), a = h(a, b, c, m, e[d + 2], 23, -995338651), 
            m = j(m, a, b, c, e[d + 0], 6, -198630844), c = j(c, m, a, b, e[d + 7], 10, 1126891415), 
            b = j(b, c, m, a, e[d + 14], 15, -1416354905), a = j(a, b, c, m, e[d + 5], 21, -57434055), 
            m = j(m, a, b, c, e[d + 12], 6, 1700485571), c = j(c, m, a, b, e[d + 3], 10, -1894986606), 
            b = j(b, c, m, a, e[d + 10], 15, -1051523), a = j(a, b, c, m, e[d + 1], 21, -2054922799), 
            m = j(m, a, b, c, e[d + 8], 6, 1873313359), c = j(c, m, a, b, e[d + 15], 10, -30611744), 
            b = j(b, c, m, a, e[d + 6], 15, -1560198380), a = j(a, b, c, m, e[d + 13], 21, 1309151649), 
            m = j(m, a, b, c, e[d + 4], 6, -145523070), c = j(c, m, a, b, e[d + 11], 10, -1120210379), 
            b = j(b, c, m, a, e[d + 2], 15, 718787259), a = j(a, b, c, m, e[d + 9], 21, -343485551), 
            m = k(m, i), a = k(a, n), b = k(b, o), c = k(c, p);
        }
        return [ m, a, b, c ];
    }
    function e(d, e, a, b, f, g) {
        return k(c(k(k(e, d), k(b, g)), f), a);
    }
    function f(f, a, g, c, d, h, i) {
        return e(a & g | ~a & c, f, a, d, h, i);
    }
    function g(f, a, b, c, g, h, i) {
        return e(a & c | b & ~c, f, a, g, h, i);
    }
    function h(f, a, b, c, d, g, h) {
        return e(a ^ b ^ c, f, a, d, g, h);
    }
    function j(f, a, b, c, g, h, i) {
        return e(b ^ (a | ~c), f, a, g, h, i);
    }
    function k(a, b) {
        var c = (65535 & a) + (65535 & b);
        return (a >> 16) + (b >> 16) + (c >> 16) << 16 | 65535 & c;
    }
    function c(a, b) {
        return a << b | a >>> 32 - b;
    }
    function d(a) {
        for (var b = [], c = 0; c < a.length * t; c += t) b[c >> 5] |= (a.charCodeAt(c / t) & (1 << t) - 1) << c % 32;
        return b;
    }
    function i(a) {
        for (var b = "", c = 0; c < 32 * a.length; c += t) b += String.fromCharCode(a[c >> 5] >>> c % 32 & (1 << t) - 1);
        return b;
    }
    function l(a) {
        for (var b = "0123456789abcdef", c = "", d = 0; d < 4 * a.length; d++) c += b.charAt(15 & a[d >> 2] >> 8 * (d % 4) + 4) + b.charAt(15 & a[d >> 2] >> 8 * (d % 4));
        return c;
    }
    function m(a) {
        for (var b, c = "", d = 0; d < 4 * a.length; d += 3) {
            b = (255 & a[d >> 2] >> 8 * (d % 4)) << 16 | (255 & a[d + 1 >> 2] >> 8 * ((d + 1) % 4)) << 8 | 255 & a[d + 2 >> 2] >> 8 * ((d + 2) % 4);
            for (var e = 0; 4 > e; e++) c += 8 * d + 6 * e > 32 * a.length ? s : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(63 & b >> 6 * (3 - e));
        }
        return c;
    }
    var n = require("../../utils/ppdog"), o = a(n), p = require("../../utils/regenerator-runtime"), q = a(p);
    var r = 0, s = "", t = 8;
    module.exports = {
        hexEncode: function(a) {
            return l(b(d(a), a.length * t));
        },
        b64Encode: function(a) {
            return m(b(d(a), a.length * t));
        },
        strEncode: function(a) {
            return i(b(d(a), a.length * t));
        }
    };
})();