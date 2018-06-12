function i(i) {
    R = i, j = new Array(R);
    for (var s = 0; s < j.length; s++) j[s] = 0;
    q = new t(), (D = new t()).digits[0] = 1;
}

function t(i) {
    this.digits = "boolean" == typeof i && 1 == i ? null : j.slice(0), this.isNeg = !1;
}

function s(i) {
    var s = new t(!0);
    return s.digits = i.digits.slice(0), s.isNeg = i.isNeg, s;
}

function r(i) {
    var s = new t();
    s.isNeg = 0 > i, i = Math.abs(i);
    for (var r = 0; i > 0; ) s.digits[r++] = i & J, i >>= B;
    return s;
}

function n(i) {
    for (var t = "", s = i.length - 1; s > -1; --s) t += i.charAt(s);
    return t;
}

function e(i, s) {
    var r = new t();
    r.digits[0] = s;
    for (var e = A(i, r), g = L[e[1].digits[0]]; 1 == z(e[0], q); ) e = A(e[0], r), 
    digit = e[1].digits[0], g += L[e[1].digits[0]];
    return (i.isNeg ? "-" : "") + n(g);
}

function g(i) {
    for (var t = "", s = 0; 4 > s; ++s) t += O[15 & i], i >>>= 4;
    return n(t);
}

function d(i) {
    for (var t = "", s = (N(i), N(i)); s > -1; --s) t += g(i.digits[s]);
    return t;
}

function o(i) {
    return i >= 48 && 57 >= i ? i - 48 : i >= 65 && 90 >= i ? 10 + i - 65 : i >= 97 && 122 >= i ? 10 + i - 97 : 0;
}

function u(i) {
    for (var t = 0, s = Math.min(i.length, 4), r = 0; s > r; ++r) t <<= 4, t |= o(i.charCodeAt(r));
    return t;
}

function a(i) {
    for (var s = new t(), r = i.length, n = 0; r > 0; r -= 4, ++n) s.digits[n] = u(i.substr(Math.max(r - 4, 0), Math.min(r, 4)));
    return s;
}

function h(i) {
    for (var t = "", s = N(i); s > -1; --s) t += f(i.digits[s]);
    return t;
}

function f(i) {
    var t = String.fromCharCode(255 & i);
    return i >>>= 8, String.fromCharCode(255 & i) + t;
}

function c(i, s) {
    var r;
    if (i.isNeg != s.isNeg) s.isNeg = !s.isNeg, r = l(i, s), s.isNeg = !s.isNeg; else {
        r = new t();
        for (var n, e = 0, g = 0; g < i.digits.length; ++g) n = i.digits[g] + s.digits[g] + e, 
        r.digits[g] = 65535 & n, e = Number(n >= G);
        r.isNeg = i.isNeg;
    }
    return r;
}

function l(i, s) {
    var r;
    if (i.isNeg != s.isNeg) s.isNeg = !s.isNeg, r = c(i, s), s.isNeg = !s.isNeg; else {
        r = new t();
        var n, e;
        e = 0;
        for (g = 0; g < i.digits.length; ++g) n = i.digits[g] - s.digits[g] + e, r.digits[g] = 65535 & n, 
        r.digits[g] < 0 && (r.digits[g] += G), e = 0 - Number(0 > n);
        if (-1 == e) {
            e = 0;
            for (var g = 0; g < i.digits.length; ++g) n = 0 - r.digits[g] + e, r.digits[g] = 65535 & n, 
            r.digits[g] < 0 && (r.digits[g] += G), e = 0 - Number(0 > n);
            r.isNeg = !i.isNeg;
        } else r.isNeg = i.isNeg;
    }
    return r;
}

function N(i) {
    for (var t = i.digits.length - 1; t > 0 && 0 == i.digits[t]; ) --t;
    return t;
}

function v(i) {
    var t, s = N(i), r = i.digits[s], n = (s + 1) * F;
    for (t = n; t > n - F && 0 == (32768 & r); --t) r <<= 1;
    return t;
}

function m(i, s) {
    for (var r, n, e, g = new t(), d = N(i), o = N(s), u = 0; o >= u; ++u) {
        r = 0, e = u;
        for (var a = 0; d >= a; ++a, ++e) n = g.digits[e] + i.digits[a] * s.digits[u] + r, 
        g.digits[e] = n & J, r = n >>> B;
        g.digits[u + d + 1] = r;
    }
    return g.isNeg = i.isNeg != s.isNeg, g;
}

function w(i, s) {
    var r, n, e, g = new t();
    r = N(i), n = 0;
    for (var d = 0; r >= d; ++d) e = g.digits[d] + i.digits[d] * s + n, g.digits[d] = e & J, 
    n = e >>> B;
    return g.digits[1 + r] = n, g;
}

function k(i, t, s, r, n) {
    for (var e = Math.min(t + n, i.length), g = t, d = r; e > g; ++g, ++d) s[d] = i[g];
}

function M(i, s) {
    var r = Math.floor(s / F), n = new t();
    k(i.digits, 0, n.digits, r, n.digits.length - r);
    for (var e = s % F, g = F - e, d = n.digits.length - 1, o = d - 1; d > 0; --d, --o) n.digits[d] = n.digits[d] << e & J | (n.digits[o] & Q[e]) >>> g;
    return n.digits[0] = n.digits[d] << e & J, n.isNeg = i.isNeg, n;
}

function S(i, s) {
    var r = Math.floor(s / F), n = new t();
    k(i.digits, r, n.digits, 0, i.digits.length - r);
    for (var e = s % F, g = F - e, d = 0, o = d + 1; d < n.digits.length - 1; ++d, ++o) n.digits[d] = n.digits[d] >>> e | (n.digits[o] & T[e]) << g;
    return n.digits[n.digits.length - 1] >>>= e, n.isNeg = i.isNeg, n;
}

function y(i, s) {
    var r = new t();
    return k(i.digits, 0, r.digits, s, r.digits.length - s), r;
}

function b(i, s) {
    var r = new t();
    return k(i.digits, s, r.digits, 0, r.digits.length - s), r;
}

function p(i, s) {
    var r = new t();
    return k(i.digits, 0, r.digits, 0, s), r;
}

function z(i, t) {
    if (i.isNeg != t.isNeg) return 1 - 2 * Number(i.isNeg);
    for (var s = i.digits.length - 1; s >= 0; --s) if (i.digits[s] != t.digits[s]) return i.isNeg ? 1 - 2 * Number(i.digits[s] > t.digits[s]) : 1 - 2 * Number(i.digits[s] < t.digits[s]);
    return 0;
}

function A(i, r) {
    var n, e, g = v(i), d = v(r), o = r.isNeg;
    if (d > g) return i.isNeg ? (n = s(D), n.isNeg = !r.isNeg, i.isNeg = !1, r.isNeg = !1, 
    e = l(r, i), i.isNeg = !0, r.isNeg = o) : (n = new t(), e = s(i)), new Array(n, e);
    n = new t(), e = i;
    for (var u = Math.ceil(d / F) - 1, a = 0; r.digits[u] < H; ) r = M(r, 1), ++a, ++d, 
    u = Math.ceil(d / F) - 1;
    e = M(e, a), g += a;
    for (var h = Math.ceil(g / F) - 1, f = y(r, h - u); -1 != z(e, f); ) ++n.digits[h - u], 
    e = l(e, f);
    for (var m = h; m > u; --m) {
        var k = m >= e.digits.length ? 0 : e.digits[m], b = m - 1 >= e.digits.length ? 0 : e.digits[m - 1], p = m - 2 >= e.digits.length ? 0 : e.digits[m - 2], A = u >= r.digits.length ? 0 : r.digits[u], C = u - 1 >= r.digits.length ? 0 : r.digits[u - 1];
        n.digits[m - u - 1] = k == A ? J : Math.floor((k * G + b) / A);
        for (var P = n.digits[m - u - 1] * (A * G + C), x = k * I + (b * G + p); P > x; ) --n.digits[m - u - 1], 
        P = n.digits[m - u - 1] * (A * G | C), x = k * G * G + (b * G + p);
        (e = l(e, w(f = y(r, m - u - 1), n.digits[m - u - 1]))).isNeg && (e = c(e, f), --n.digits[m - u - 1]);
    }
    return e = S(e, a), n.isNeg = i.isNeg != o, i.isNeg && (n = o ? c(n, D) : l(n, D), 
    r = S(r, a), e = l(r, e)), 0 == e.digits[0] && 0 == N(e) && (e.isNeg = !1), new Array(n, e);
}

function C(i, t) {
    return A(i, t)[0];
}

function P(i) {
    this.modulus = s(i), this.k = N(this.modulus) + 1;
    var r = new t();
    r.digits[2 * this.k] = 1, this.mu = C(r, this.modulus), this.bkplus1 = new t(), 
    this.bkplus1.digits[this.k + 1] = 1, this.modulo = x, this.multiplyMod = E, this.powMod = K;
}

function x(i) {
    var t = b(m(b(i, this.k - 1), this.mu), this.k + 1), s = l(p(i, this.k + 1), p(m(t, this.modulus), this.k + 1));
    s.isNeg && (s = c(s, this.bkplus1));
    for (var r = z(s, this.modulus) >= 0; r; ) r = z(s = l(s, this.modulus), this.modulus) >= 0;
    return s;
}

function E(i, t) {
    var s = m(i, t);
    return this.modulo(s);
}

function K(i, s) {
    var r = new t();
    r.digits[0] = 1;
    for (var n = i, e = s; 0 != (1 & e.digits[0]) && (r = this.multiplyMod(r, n)), 0 != (e = S(e, 1)).digits[0] || 0 != N(e); ) n = this.multiplyMod(n, n);
    return r;
}

var R, j, q, D, B = 16, F = B, G = 65536, H = G >>> 1, I = G * G, J = G - 1;

i(20);

r(1e15);

var L = new Array("0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"), O = new Array("0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"), Q = new Array(0, 32768, 49152, 57344, 61440, 63488, 64512, 65024, 65280, 65408, 65472, 65504, 65520, 65528, 65532, 65534, 65535), T = new Array(0, 1, 3, 7, 15, 31, 63, 127, 255, 511, 1023, 2047, 4095, 8191, 16383, 32767, 65535), U = {};

U.NoPadding = "NoPadding", U.PKCS1Padding = "PKCS1Padding", U.RawEncoding = "RawEncoding", 
U.NumericEncoding = "NumericEncoding", module.exports = {
    setMaxDigits: i,
    RSAKeyPair: function(i, t, s, r) {
        this.e = a(i), this.d = a(t), this.m = a(s), this.chunkSize = "number" != typeof r ? 2 * N(this.m) : r / 8, 
        this.radix = 16, this.barrett = new P(this.m);
    },
    encryptedString: function(i, s, r, n) {
        var g, o, u, a, f, c, l, N, v, m = new Array(), w = s.length, k = "";
        for (a = "string" == typeof r ? r == U.NoPadding ? 1 : r == U.PKCS1Padding ? 2 : 0 : 0, 
        f = "string" == typeof n && n == U.RawEncoding ? 1 : 0, 1 == a ? w > i.chunkSize && (w = i.chunkSize) : 2 == a && w > i.chunkSize - 11 && (w = i.chunkSize - 11), 
        g = 0, o = 2 == a ? w - 1 : i.chunkSize - 1; w > g; ) a ? m[o] = s.charCodeAt(g) : m[g] = s.charCodeAt(g), 
        g++, o--;
        for (1 == a && (g = 0), o = i.chunkSize - w % i.chunkSize; o > 0; ) {
            if (2 == a) {
                for (c = Math.floor(256 * Math.random()); !c; ) c = Math.floor(256 * Math.random());
                m[g] = c;
            } else m[g] = 0;
            g++, o--;
        }
        for (2 == a && (m[w] = 0, m[i.chunkSize - 2] = 2, m[i.chunkSize - 1] = 0), l = m.length, 
        g = 0; l > g; g += i.chunkSize) {
            for (N = new t(), o = 0, u = g; u < g + i.chunkSize; ++o) N.digits[o] = m[u++], 
            N.digits[o] += m[u++] << 8;
            v = i.barrett.powMod(N, i.e), k += 1 == f ? h(v) : 16 == i.radix ? d(v) : e(v, i.radix);
        }
        return k;
    }
};