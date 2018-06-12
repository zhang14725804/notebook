(function() {
    function a(a) {
        return a && a.__esModule ? a : {
            default: a
        };
    }
    var b = String.fromCharCode, c = Object.assign || function(a) {
        for (var b, c = 1; c < arguments.length; c++) for (var d in b = arguments[c], b) Object.prototype.hasOwnProperty.call(b, d) && (a[d] = b[d]);
        return a;
    }, d = require("./ppdog"), e = a(d), f = require("./regenerator-runtime"), g = a(f), h = function(e) {
        function f(a, b) {
            return a << b | a >>> 32 - b;
        }
        function g(a, b) {
            var c, d, e, f, g;
            return e = 2147483648 & a, f = 2147483648 & b, c = 1073741824 & a, d = 1073741824 & b, 
            g = (1073741823 & a) + (1073741823 & b), c & d ? 2147483648 ^ g ^ e ^ f : c | d ? 1073741824 & g ? 3221225472 ^ g ^ e ^ f : 1073741824 ^ g ^ e ^ f : g ^ e ^ f;
        }
        function h(a, b, c) {
            return a & b | ~a & c;
        }
        function i(a, b, c) {
            return a & c | b & ~c;
        }
        function j(a, b, c) {
            return a ^ b ^ c;
        }
        function l(a, b, c) {
            return b ^ (a | ~c);
        }
        function m(e, a, b, c, d, i, j) {
            return e = g(e, g(g(h(a, b, c), d), j)), g(f(e, i), a);
        }
        function n(e, a, b, c, d, h, j) {
            return e = g(e, g(g(i(a, b, c), d), j)), g(f(e, h), a);
        }
        function o(e, a, b, c, d, h, i) {
            return e = g(e, g(g(j(a, b, c), d), i)), g(f(e, h), a);
        }
        function p(e, a, b, c, d, h, i) {
            return e = g(e, g(g(l(a, b, c), d), i)), g(f(e, h), a);
        }
        function q(a) {
            for (var b, c = a.length, d = c + 8, e = 16 * ((d - d % 64) / 64 + 1), f = Array(e - 1), g = 0, h = 0; h < c; ) b = (h - h % 4) / 4, 
            g = 8 * (h % 4), f[b] |= a.charCodeAt(h) << g, h++;
            return b = (h - h % 4) / 4, g = 8 * (h % 4), f[b] |= 128 << g, f[e - 2] = c << 3, 
            f[e - 1] = c >>> 29, f;
        }
        function r(a) {
            var b, c, d = "", e = "";
            for (c = 0; 3 >= c; c++) b = 255 & a >>> 8 * c, e = "0" + b.toString(16), d += e.substr(e.length - 2, 2);
            return d;
        }
        function s(a) {
            a = a.replace(/\r\n/g, "\n");
            for (var d, c = "", e = 0; e < a.length; e++) d = a.charCodeAt(e), 128 > d ? c += b(d) : 127 < d && 2048 > d ? (c += b(192 | d >> 6), 
            c += b(128 | 63 & d)) : (c += b(224 | d >> 12), c += b(128 | 63 & d >> 6), c += b(128 | 63 & d));
            return c;
        }
        var t, k, u, v, w, y, a, z, c, d = [], x = 7, A = 12, B = 17, C = 22, D = 5, E = 9, F = 14, G = 20, H = 4, I = 11, J = 16, K = 23, L = 6, M = 10, N = 15, O = 21;
        for (e = s(e), d = q(e), y = 1732584193, a = 4023233417, z = 2562383102, c = 271733878, 
        t = 0; t < d.length; t += 16) k = y, u = a, v = z, w = c, y = m(y, a, z, c, d[t + 0], x, 3614090360), 
        c = m(c, y, a, z, d[t + 1], A, 3905402710), z = m(z, c, y, a, d[t + 2], B, 606105819), 
        a = m(a, z, c, y, d[t + 3], C, 3250441966), y = m(y, a, z, c, d[t + 4], x, 4118548399), 
        c = m(c, y, a, z, d[t + 5], A, 1200080426), z = m(z, c, y, a, d[t + 6], B, 2821735955), 
        a = m(a, z, c, y, d[t + 7], C, 4249261313), y = m(y, a, z, c, d[t + 8], x, 1770035416), 
        c = m(c, y, a, z, d[t + 9], A, 2336552879), z = m(z, c, y, a, d[t + 10], B, 4294925233), 
        a = m(a, z, c, y, d[t + 11], C, 2304563134), y = m(y, a, z, c, d[t + 12], x, 1804603682), 
        c = m(c, y, a, z, d[t + 13], A, 4254626195), z = m(z, c, y, a, d[t + 14], B, 2792965006), 
        a = m(a, z, c, y, d[t + 15], C, 1236535329), y = n(y, a, z, c, d[t + 1], D, 4129170786), 
        c = n(c, y, a, z, d[t + 6], E, 3225465664), z = n(z, c, y, a, d[t + 11], F, 643717713), 
        a = n(a, z, c, y, d[t + 0], G, 3921069994), y = n(y, a, z, c, d[t + 5], D, 3593408605), 
        c = n(c, y, a, z, d[t + 10], E, 38016083), z = n(z, c, y, a, d[t + 15], F, 3634488961), 
        a = n(a, z, c, y, d[t + 4], G, 3889429448), y = n(y, a, z, c, d[t + 9], D, 568446438), 
        c = n(c, y, a, z, d[t + 14], E, 3275163606), z = n(z, c, y, a, d[t + 3], F, 4107603335), 
        a = n(a, z, c, y, d[t + 8], G, 1163531501), y = n(y, a, z, c, d[t + 13], D, 2850285829), 
        c = n(c, y, a, z, d[t + 2], E, 4243563512), z = n(z, c, y, a, d[t + 7], F, 1735328473), 
        a = n(a, z, c, y, d[t + 12], G, 2368359562), y = o(y, a, z, c, d[t + 5], H, 4294588738), 
        c = o(c, y, a, z, d[t + 8], I, 2272392833), z = o(z, c, y, a, d[t + 11], J, 1839030562), 
        a = o(a, z, c, y, d[t + 14], K, 4259657740), y = o(y, a, z, c, d[t + 1], H, 2763975236), 
        c = o(c, y, a, z, d[t + 4], I, 1272893353), z = o(z, c, y, a, d[t + 7], J, 4139469664), 
        a = o(a, z, c, y, d[t + 10], K, 3200236656), y = o(y, a, z, c, d[t + 13], H, 681279174), 
        c = o(c, y, a, z, d[t + 0], I, 3936430074), z = o(z, c, y, a, d[t + 3], J, 3572445317), 
        a = o(a, z, c, y, d[t + 6], K, 76029189), y = o(y, a, z, c, d[t + 9], H, 3654602809), 
        c = o(c, y, a, z, d[t + 12], I, 3873151461), z = o(z, c, y, a, d[t + 15], J, 530742520), 
        a = o(a, z, c, y, d[t + 2], K, 3299628645), y = p(y, a, z, c, d[t + 0], L, 4096336452), 
        c = p(c, y, a, z, d[t + 7], M, 1126891415), z = p(z, c, y, a, d[t + 14], N, 2878612391), 
        a = p(a, z, c, y, d[t + 5], O, 4237533241), y = p(y, a, z, c, d[t + 12], L, 1700485571), 
        c = p(c, y, a, z, d[t + 3], M, 2399980690), z = p(z, c, y, a, d[t + 10], N, 4293915773), 
        a = p(a, z, c, y, d[t + 1], O, 2240044497), y = p(y, a, z, c, d[t + 8], L, 1873313359), 
        c = p(c, y, a, z, d[t + 15], M, 4264355552), z = p(z, c, y, a, d[t + 6], N, 2734768916), 
        a = p(a, z, c, y, d[t + 13], O, 1309151649), y = p(y, a, z, c, d[t + 4], L, 4149444226), 
        c = p(c, y, a, z, d[t + 11], M, 3174756917), z = p(z, c, y, a, d[t + 2], N, 718787259), 
        a = p(a, z, c, y, d[t + 9], O, 3951481745), y = g(y, k), a = g(a, u), z = g(z, v), 
        c = g(c, w);
        return (r(y) + r(a) + r(z) + r(c)).toLowerCase();
    };
    module.exports = function(a, d) {
        function e(a) {
            return function(a) {
                for (var b, c, d = a + "", e = 0, f = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", g = ""; d.charAt(0 | e) || (f = "=", 
                e % 1); g += f.charAt(63 & b >> 8 - 8 * (e % 1))) {
                    if (c = d.charCodeAt(e += 3 / 4), 255 < c) throw new InvalidCharacterError("'btoa' failed: The string to be encoded contains characters outside of the Latin1 range.");
                    b = b << 8 | c;
                }
                return g;
            }(encodeURIComponent(a).replace(/%([0-9A-F]{2})/g, function(a, c) {
                return b(parseInt(c, 16));
            }));
        }
        var f = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : !0, g = c({}, a, d), i = [], j = [];
        for (var k in g) ("" != g[k] || "string" != typeof g[k]) && i.push(k);
        i.sort().forEach(function(a) {
            j.push(a + "=" + g[a]);
        });
        var l = function(a) {
            for (var b = "", c = 0; c < a.length; c++) b += "%" + a[c].toString(16);
            return decodeURIComponent(b);
        }([ 56, 57, 56, 50, 102, 49, 51, 52, 99, 51, 101, 50, 56, 48, 53, 57, 100, 49, 52, 50, 53, 57, 52, 50, 102, 98, 53, 98, 53, 51, 57, 52 ]);
        if (j.push("key=" + l), f) {
            var m = e(j.join("&"));
            return h(m);
        }
        return h(j.join("&"));
    };
})();