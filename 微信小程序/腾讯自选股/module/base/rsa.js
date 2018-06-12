(function() {
    function a(a) {
        return a && a.__esModule ? a : {
            default: a
        };
    }
    function b(a) {
        L = a, M = Array(L);
        for (var b = 0; b < M.length; b++) M[b] = 0;
        N = new d(), O = new d(), O.digits[0] = 1;
    }
    function d(a) {
        this.digits = "boolean" == typeof a && !0 == a ? null : M.slice(0), this.isNeg = !1;
    }
    function c(a) {
        var b = new d(!0);
        return b.digits = a.digits.slice(0), b.isNeg = a.isNeg, b;
    }
    function e(a) {
        for (var b = "", c = a.length - 1; -1 < c; --c) b += a.charAt(c);
        return b;
    }
    function f(a, c) {
        var f = new d();
        f.digits[0] = c;
        for (var b = r(a, f), g = X[b[1].digits[0]]; 1 == z(b[0], N); ) b = r(b[0], f), 
        digit = b[1].digits[0], g += X[b[1].digits[0]];
        return (a.isNeg ? "-" : "") + e(g);
    }
    function g(a) {
        for (var b = "", c = 0; 4 > c; ++c) b += Y[a & 15], a >>>= 4;
        return e(b);
    }
    function h(a) {
        for (var b = "", c = o(a), d = o(a); -1 < d; --d) b += g(a.digits[d]);
        return b;
    }
    function j(a) {
        var b, c = 48, d = 97, e = 65;
        return b = a >= c && a <= c + 9 ? a - c : a >= e && a <= 90 ? 10 + a - e : a >= d && a <= d + 25 ? 10 + a - d : 0, 
        b;
    }
    function k(a) {
        for (var b = 0, c = G(a.length, 4), d = 0; d < c; ++d) b <<= 4, b |= j(a.charCodeAt(d));
        return b;
    }
    function i(a) {
        for (var b = new d(), c = a.length, e = c, f = 0; 0 < e; e -= 4, ++f) b.digits[f] = k(a.substr(Math.max(e - 4, 0), G(e, 4)));
        return b;
    }
    function l(a, b) {
        var e;
        if (a.isNeg != b.isNeg) b.isNeg = !b.isNeg, e = m(a, b), b.isNeg = !b.isNeg; else {
            e = new d();
            for (var f, g = 0, c = 0; c < a.digits.length; ++c) f = a.digits[c] + b.digits[c] + g, 
            e.digits[c] = 65535 & f, g = +(f >= R);
            e.isNeg = a.isNeg;
        }
        return e;
    }
    function m(a, b) {
        var e;
        if (a.isNeg != b.isNeg) b.isNeg = !b.isNeg, e = l(a, b), b.isNeg = !b.isNeg; else {
            e = new d();
            var f, g;
            g = 0;
            for (var c = 0; c < a.digits.length; ++c) f = a.digits[c] - b.digits[c] + g, e.digits[c] = 65535 & f, 
            0 > e.digits[c] && (e.digits[c] += R), g = 0 - +(0 > f);
            if (-1 == g) {
                g = 0;
                for (var c = 0; c < a.digits.length; ++c) f = 0 - e.digits[c] + g, e.digits[c] = 65535 & f, 
                0 > e.digits[c] && (e.digits[c] += R), g = 0 - +(0 > f);
                e.isNeg = !a.isNeg;
            } else e.isNeg = a.isNeg;
        }
        return e;
    }
    function o(a) {
        for (var b = a.digits.length - 1; 0 < b && 0 == a.digits[b]; ) --b;
        return b;
    }
    function p(a) {
        for (var b = o(a), c = a.digits[b], d = (b + 1) * Q, e = d; e > d - Q && !(0 != (32768 & c)); --e) c <<= 1;
        return e;
    }
    function n(a, b) {
        for (var e, c, f, g = new d(), h = o(a), k = o(b), l = 0; l <= k; ++l) {
            e = 0, f = l;
            for (var i = 0; i <= h; ++i, ++f) c = g.digits[f] + a.digits[i] * b.digits[l] + e, 
            g.digits[f] = c & U, e = c >>> P;
            g.digits[l + h + 1] = e;
        }
        return g.isNeg = a.isNeg != b.isNeg, g;
    }
    function s(a, b) {
        var e, f, c, g = new d();
        e = o(a), f = 0;
        for (var h = 0; h <= e; ++h) c = g.digits[h] + a.digits[h] * b + f, g.digits[h] = c & U, 
        f = c >>> P;
        return g.digits[1 + e] = f, g;
    }
    function q(a, b, c, d, e) {
        for (var f = G(b + e, a.length), g = b, h = d; g < f; ++g, ++h) c[h] = a[g];
    }
    function u(a, b) {
        var c = F(b / Q), e = new d();
        q(a.digits, 0, e.digits, c, e.digits.length - c);
        for (var f = b % Q, g = e.digits.length - 1, h = g - 1; 0 < g; --g, --h) e.digits[g] = e.digits[g] << f & U | (e.digits[h] & Z[f]) >>> Q - f;
        return e.digits[0] = e.digits[g] << f & U, e.isNeg = a.isNeg, e;
    }
    function v(a, b) {
        var c = F(b / Q), e = new d();
        q(a.digits, c, e.digits, 0, a.digits.length - c);
        for (var f = b % Q, g = 0, h = g + 1; g < e.digits.length - 1; ++g, ++h) e.digits[g] = e.digits[g] >>> f | (e.digits[h] & $[f]) << Q - f;
        return e.digits[e.digits.length - 1] >>>= f, e.isNeg = a.isNeg, e;
    }
    function w(a, b) {
        var c = new d();
        return q(a.digits, 0, c.digits, b, c.digits.length - b), c;
    }
    function t(a, b) {
        var c = new d();
        return q(a.digits, b, c.digits, 0, c.digits.length - b), c;
    }
    function y(a, b) {
        var c = new d();
        return q(a.digits, 0, c.digits, 0, b), c;
    }
    function z(a, b) {
        if (a.isNeg != b.isNeg) return 1 - 2 * +a.isNeg;
        for (var c = a.digits.length - 1; 0 <= c; --c) if (a.digits[c] != b.digits[c]) return a.isNeg ? 1 - 2 * +(a.digits[c] > b.digits[c]) : 1 - 2 * +(a.digits[c] < b.digits[c]);
        return 0;
    }
    function r(a, e) {
        var f, g, h = p(a), j = p(e), k = e.isNeg;
        if (h < j) return a.isNeg ? (f = c(O), f.isNeg = !e.isNeg, a.isNeg = !1, e.isNeg = !1, 
        g = m(e, a), a.isNeg = !0, e.isNeg = k) : (f = new d(), g = c(a)), [ f, g ];
        f = new d(), g = a;
        for (var q = E(j / Q) - 1, r = 0; e.digits[q] < S; ) e = u(e, 1), ++r, ++j, q = E(j / Q) - 1;
        g = u(g, r), h += r;
        for (var t = E(h / Q) - 1, n = w(e, t - q); -1 != z(g, n); ) ++f.digits[t - q], 
        g = m(g, n);
        for (var b = t; b > q; --b) {
            var i = b >= g.digits.length ? 0 : g.digits[b], x = b - 1 >= g.digits.length ? 0 : g.digits[b - 1], y = b - 2 >= g.digits.length ? 0 : g.digits[b - 2], A = q >= e.digits.length ? 0 : e.digits[q], B = q - 1 >= e.digits.length ? 0 : e.digits[q - 1];
            f.digits[b - q - 1] = i == A ? U : F((i * R + x) / A);
            for (var C = f.digits[b - q - 1] * (A * R + B), D = i * T + (x * R + y); C > D; ) --f.digits[b - q - 1], 
            C = f.digits[b - q - 1] * (A * R | B), D = i * R * R + (x * R + y);
            n = w(e, b - q - 1), g = m(g, s(n, f.digits[b - q - 1])), g.isNeg && (g = l(g, n), 
            --f.digits[b - q - 1]);
        }
        return g = v(g, r), f.isNeg = a.isNeg != k, a.isNeg && (f = k ? l(f, O) : m(f, O), 
        e = v(e, r), g = m(e, g)), 0 == g.digits[0] && 0 == o(g) && (g.isNeg = !1), [ f, g ];
    }
    function x(a, b) {
        return r(a, b)[0];
    }
    function A(a) {
        this.modulus = c(a), this.k = o(this.modulus) + 1;
        var b = new d();
        b.digits[2 * this.k] = 1, this.mu = x(b, this.modulus), this.bkplus1 = new d(), 
        this.bkplus1.digits[this.k + 1] = 1, this.modulo = B, this.multiplyMod = C, this.powMod = D;
    }
    function B(a) {
        var b = t(a, this.k - 1), c = n(b, this.mu), d = t(c, this.k + 1), e = y(a, this.k + 1), f = n(d, this.modulus), g = y(f, this.k + 1), h = m(e, g);
        h.isNeg && (h = l(h, this.bkplus1));
        for (var i = 0 <= z(h, this.modulus); i; ) h = m(h, this.modulus), i = 0 <= z(h, this.modulus);
        return h;
    }
    function C(a, b) {
        var c = n(a, b);
        return this.modulo(c);
    }
    function D(b, c) {
        var e = new d();
        e.digits[0] = 1;
        for (var f = b, a = c; 0 != (1 & a.digits[0]) && (e = this.multiplyMod(e, f)), a = v(a, 1), 
        0 != a.digits[0] || 0 != o(a); ) f = this.multiplyMod(f, f);
        return e;
    }
    var L, M, N, O, E = Math.ceil, F = Math.floor, G = Math.min, H = require("../../utils/ppdog"), I = a(H), J = require("../../utils/regenerator-runtime"), K = a(J), P = 16, Q = P, R = 65536, S = R >>> 1, T = R * R, U = R - 1;
    b(20);
    var V = 15, W = function(a) {
        var b = new d();
        b.isNeg = 0 > a, a = Math.abs(a);
        for (var c = 0; 0 < a; ) b.digits[c++] = a & U, a >>= P;
        return b;
    }(1e15);
    var X = [ "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z" ];
    var Y = [ "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f" ];
    var Z = [ 0, 32768, 49152, 57344, 61440, 63488, 64512, 65024, 65280, 65408, 65472, 65504, 65520, 65528, 65532, 65534, 65535 ];
    var $ = [ 0, 1, 3, 7, 15, 31, 63, 127, 255, 511, 1023, 2047, 4095, 8191, 16383, 32767, 65535 ];
    var _ = {
        _genRandomValue: function() {
            var a = E(255 * Math.random());
            return a;
        },
        _transTimeSeed: function(a) {
            for (var b = a.length, c = "", d = 0; d < b; d += 2) c += String.fromCharCode(parseInt(a.substr(d, 2), 16));
            return c;
        },
        _encrypt2: function(b, c) {
            for (var e = [], a = c.length, g = 0, i = b.chunkSize; g < a; ) e[g] = c.charCodeAt(g), 
            g++;
            for (;0 != e.length % i; ) e[g] = g == a || g == i - 1 ? 0 : g == i - 2 ? 2 : _._genRandomValue(), 
            g++;
            var l, j, k, m = e.length, n = "";
            for (g = 0; g < m; g += i) {
                for (k = new d(), l = 0, j = g; j < g + i; ++l) k.digits[l] = e[j++], k.digits[l] += e[j++] << 8;
                var o = b.barrett.powMod(k, b.e), p = 16 == b.radix ? h(o) : f(o, b.radix);
                n += p + " ";
            }
            return n.substring(0, n.length - 1);
        },
        _encrypt1: function(b, c) {
            var e = [], a = c.length, g = 0, i = b.chunkSize;
            for (l = a - 1; 0 <= l; l--) e[g] = c.charCodeAt(l), g++;
            for (;0 != e.length % i; ) e[g] = g == a || g == i - 1 ? 0 : g == i - 2 ? 2 : _._genRandomValue(), 
            g++;
            var l, j, k, m = e.length, n = "";
            for (g = 0; g < m; g += i) {
                for (k = new d(), l = 0, j = g; j < g + i; ++l) k.digits[l] = e[j++], k.digits[l] += e[j++] << 8;
                var o = b.barrett.powMod(k, b.e), p = 16 == b.radix ? h(o) : f(o, b.radix);
                n += p + " ";
            }
            return n.substring(0, n.length - 1);
        },
        encrypt: function(a, b, c) {
            var d = "";
            return d = !0 === c ? _._encrypt1(a, b).toUpperCase() : _._encrypt2(a, b).toUpperCase(), 
            d;
        },
        encrypt1: function(a, b, c, d) {
            var e = _._transTimeSeed(c), f = e + b;
            return !d || (f = e + d + b), _.encrypt(a, f, !0);
        },
        encrypt2: function(a, b, c, d) {
            var e = _._transTimeSeed(c), f = e + b;
            return !0 === d && (f = e + "00000000000000" + b), _.encrypt(a, f, !1);
        }
    };
    module.exports = {
        setMaxDigits: b,
        RSAKeyPair: function(a, b, c) {
            this.e = i(a), this.d = i(b), this.m = i(c), this.chunkSize = 2 * (o(this.m) + 1), 
            this.radix = 16, this.barrett = new A(this.m);
        },
        encrypt: _.encrypt,
        encrypt1: _.encrypt1,
        encrypt2: _.encrypt2,
        getTimeSeed: _._transTimeSeed
    };
})();