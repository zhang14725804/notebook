function t(i) {
    this.modulus = d(i), this.k = k(this.modulus) + 1;
    var t = new g();
    t.digits[2 * this.k] = 1, this.mu = K(t, this.modulus), this.bkplus1 = new g(), 
    this.bkplus1.digits[this.k + 1] = 1, this.modulo = s, this.multiplyMod = r, this.powMod = n;
}

function s(i) {
    var t = C(S(C(i, this.k - 1), this.mu), this.k + 1), s = w(P(i, this.k + 1), P(S(t, this.modulus), this.k + 1));
    s.isNeg && (s = m(s, this.bkplus1));
    for (var r = x(s, this.modulus) >= 0; r; ) r = x(s = w(s, this.modulus), this.modulus) >= 0;
    return s;
}

function r(i, t) {
    var s = S(i, t);
    return this.modulo(s);
}

function n(i, t) {
    var s = new g();
    s.digits[0] = 1;
    for (var r = i, n = t; 0 != (1 & n.digits[0]) && (s = this.multiplyMod(s, r)), 0 != (n = z(n, 1)).digits[0] || 0 != k(n); ) r = this.multiplyMod(r, r);
    return s;
}

function e(i) {
    R = i, j = new Array(R);
    for (var t = 0; t < j.length; t++) j[t] = 0;
    q = new g(), (D = new g()).digits[0] = 1;
}

function g(i) {
    this.digits = "boolean" == typeof i && 1 == i ? null : j.slice(0), this.isNeg = !1;
}

function d(i) {
    var t = new g(!0);
    return t.digits = i.digits.slice(0), t.isNeg = i.isNeg, t;
}

function o(i) {
    for (var t = "", s = i.length - 1; s > -1; --s) t += i.charAt(s);
    return t;
}

function u(i, t) {
    var s = new g();
    s.digits[0] = t;
    for (var r = E(i, s), n = L[r[1].digits[0]]; 1 == x(r[0], q); ) r = E(r[0], s), 
    digit = r[1].digits[0], n += L[r[1].digits[0]];
    return (i.isNeg ? "-" : "") + o(n);
}

function a(t) {
    var s = "";
    for (i = 0; i < 4; ++i) s += O[15 & t], t >>>= 4;
    return o(s);
}

function h(i) {
    for (var t = "", s = (k(i), k(i)); s > -1; --s) t += a(i.digits[s]);
    return t;
}

function f(i) {
    return i >= 48 && 57 >= i ? i - 48 : i >= 65 && 90 >= i ? 10 + i - 65 : i >= 97 && 122 >= i ? 10 + i - 97 : 0;
}

function c(i) {
    for (var t = 0, s = Math.min(i.length, 4), r = 0; s > r; ++r) t <<= 4, t |= f(i.charCodeAt(r));
    return t;
}

function l(i) {
    for (var t = new g(), s = i.length, r = 0; s > 0; s -= 4, ++r) t.digits[r] = c(i.substr(Math.max(s - 4, 0), Math.min(s, 4)));
    return t;
}

function N(i) {
    for (var t = "", s = k(i); s > -1; --s) t += v(i.digits[s]);
    return t;
}

function v(i) {
    var t = String.fromCharCode(255 & i);
    return i >>>= 8, String.fromCharCode(255 & i) + t;
}

function m(i, t) {
    var s;
    if (i.isNeg != t.isNeg) t.isNeg = !t.isNeg, s = w(i, t), t.isNeg = !t.isNeg; else {
        s = new g();
        for (var r, n = 0, e = 0; e < i.digits.length; ++e) r = i.digits[e] + t.digits[e] + n, 
        s.digits[e] = 65535 & r, n = Number(r >= G);
        s.isNeg = i.isNeg;
    }
    return s;
}

function w(i, t) {
    var s;
    if (i.isNeg != t.isNeg) t.isNeg = !t.isNeg, s = m(i, t), t.isNeg = !t.isNeg; else {
        s = new g();
        var r, n;
        n = 0;
        for (e = 0; e < i.digits.length; ++e) r = i.digits[e] - t.digits[e] + n, s.digits[e] = 65535 & r, 
        s.digits[e] < 0 && (s.digits[e] += G), n = 0 - Number(0 > r);
        if (-1 == n) {
            n = 0;
            for (var e = 0; e < i.digits.length; ++e) r = 0 - s.digits[e] + n, s.digits[e] = 65535 & r, 
            s.digits[e] < 0 && (s.digits[e] += G), n = 0 - Number(0 > r);
            s.isNeg = !i.isNeg;
        } else s.isNeg = i.isNeg;
    }
    return s;
}

function k(i) {
    for (var t = i.digits.length - 1; t > 0 && 0 == i.digits[t]; ) --t;
    return t;
}

function M(i) {
    var t, s = k(i), r = i.digits[s], n = (s + 1) * F;
    for (t = n; t > n - F && 0 == (32768 & r); --t) r <<= 1;
    return t;
}

function S(i, t) {
    for (var s, r, n, e, d = new g(), o = k(i), u = k(t), a = 0; u >= a; ++a) {
        for (r = 0, e = a, s = 0; s <= o; ++s, ++e) n = d.digits[e] + i.digits[s] * t.digits[a] + r, 
        d.digits[e] = n & J, r = n >>> B;
        d.digits[a + o + 1] = r;
    }
    return d.isNeg = i.isNeg != t.isNeg, d;
}

function y(i, t) {
    for (var s, r = new g(), n = k(i), e = 0, d = 0; n >= d; ++d) s = r.digits[d] + i.digits[d] * t + e, 
    r.digits[d] = s & J, e = s >>> B;
    return r.digits[1 + n] = e, r;
}

function b(i, t, s, r, n) {
    for (var e = Math.min(t + n, i.length), g = t, d = r; e > g; ++g, ++d) s[d] = i[g];
}

function p(i, t) {
    var s = Math.floor(t / F), r = new g();
    b(i.digits, 0, r.digits, s, r.digits.length - s);
    for (var n = t % F, e = F - n, d = r.digits.length - 1, o = d - 1; d > 0; --d, --o) r.digits[d] = r.digits[d] << n & J | (r.digits[o] & Q[n]) >>> e;
    return r.digits[0] = r.digits[d] << n & J, r.isNeg = i.isNeg, r;
}

function z(i, t) {
    var s = Math.floor(t / F), r = new g();
    b(i.digits, s, r.digits, 0, i.digits.length - s);
    for (var n = t % F, e = F - n, d = 0, o = d + 1; d < r.digits.length - 1; ++d, ++o) r.digits[d] = r.digits[d] >>> n | (r.digits[o] & T[n]) << e;
    return r.digits[r.digits.length - 1] >>>= n, r.isNeg = i.isNeg, r;
}

function A(i, t) {
    var s = new g();
    return b(i.digits, 0, s.digits, t, s.digits.length - t), s;
}

function C(i, t) {
    var s = new g();
    return b(i.digits, t, s.digits, 0, s.digits.length - t), s;
}

function P(i, t) {
    var s = new g();
    return b(i.digits, 0, s.digits, 0, t), s;
}

function x(i, t) {
    if (i.isNeg != t.isNeg) return 1 - 2 * Number(i.isNeg);
    for (var s = i.digits.length - 1; s >= 0; --s) if (i.digits[s] != t.digits[s]) return i.isNeg ? 1 - 2 * Number(i.digits[s] > t.digits[s]) : 1 - 2 * Number(i.digits[s] < t.digits[s]);
    return 0;
}

function E(i, t) {
    var s, r, n = M(i), e = M(t), o = t.isNeg;
    if (e > n) return i.isNeg ? (s = d(D), s.isNeg = !t.isNeg, i.isNeg = !1, t.isNeg = !1, 
    r = w(t, i), i.isNeg = !0, t.isNeg = o) : (s = new g(), r = d(i)), new Array(s, r);
    s = new g(), r = i;
    for (var u = Math.ceil(e / F) - 1, a = 0; t.digits[u] < H; ) t = p(t, 1), ++a, ++e, 
    u = Math.ceil(e / F) - 1;
    r = p(r, a), n += a;
    for (var h = Math.ceil(n / F) - 1, f = A(t, h - u); -1 != x(r, f); ) ++s.digits[h - u], 
    r = w(r, f);
    for (var c = h; c > u; --c) {
        var l = c >= r.digits.length ? 0 : r.digits[c], N = c - 1 >= r.digits.length ? 0 : r.digits[c - 1], v = c - 2 >= r.digits.length ? 0 : r.digits[c - 2], S = u >= t.digits.length ? 0 : t.digits[u], b = u - 1 >= t.digits.length ? 0 : t.digits[u - 1];
        s.digits[c - u - 1] = l == S ? J : Math.floor((l * G + N) / S);
        for (var C = s.digits[c - u - 1] * (S * G + b), P = l * I + (N * G + v); C > P; ) --s.digits[c - u - 1], 
        C = s.digits[c - u - 1] * (S * G | b), P = l * G * G + (N * G + v);
        (r = w(r, y(f = A(t, c - u - 1), s.digits[c - u - 1]))).isNeg && (r = m(r, f), --s.digits[c - u - 1]);
    }
    return r = z(r, a), s.isNeg = i.isNeg != o, i.isNeg && (s = o ? m(s, D) : w(s, D), 
    t = z(t, a), r = w(t, r)), 0 == r.digits[0] && 0 == k(r) && (r.isNeg = !1), new Array(s, r);
}

function K(i, t) {
    return E(i, t)[0];
}

var R, j, q, D, B = 16, F = B, G = 65536, H = G >>> 1, I = G * G, J = G - 1;

e(20);

!function(i) {
    var t = new g();
    t.isNeg = 0 > i, i = Math.abs(i);
    for (var s = 0; i > 0; ) t.digits[s++] = i & J, i >>= B;
}(1e15);

var L = new Array("0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"), O = new Array("0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"), Q = new Array(0, 32768, 49152, 57344, 61440, 63488, 64512, 65024, 65280, 65408, 65472, 65504, 65520, 65528, 65532, 65534, 65535), T = new Array(0, 1, 3, 7, 15, 31, 63, 127, 255, 511, 1023, 2047, 4095, 8191, 16383, 32767, 65535), U = {};

U.NoPadding = "NoPadding", U.PKCS1Padding = "PKCS1Padding", U.RawEncoding = "RawEncoding", 
U.NumericEncoding = "NumericEncoding", module.exports = {
    setMaxDigits: e,
    RSAKeyPair: function(i, s, r, n) {
        this.e = l(i), this.d = l(s), this.m = l(r), this.chunkSize = "number" != typeof n ? 2 * k(this.m) : n / 8, 
        this.radix = 16, this.barrett = new t(this.m);
    },
    encryptedString: function(i, t, s, r) {
        var n, e, d, o, a, f, c, l, v, m = new Array(), w = t.length, k = "";
        for (o = "string" == typeof s ? s == U.NoPadding ? 1 : s == U.PKCS1Padding ? 2 : 0 : 0, 
        a = "string" == typeof r && r == U.RawEncoding ? 1 : 0, 1 == o ? w > i.chunkSize && (w = i.chunkSize) : 2 == o && w > i.chunkSize - 11 && (w = i.chunkSize - 11), 
        n = 0, e = 2 == o ? w - 1 : i.chunkSize - 1; w > n; ) o ? m[e] = t.charCodeAt(n) : m[n] = t.charCodeAt(n), 
        n++, e--;
        for (1 == o && (n = 0), e = i.chunkSize - w % i.chunkSize; e > 0; ) {
            if (2 == o) {
                for (f = Math.floor(256 * Math.random()); !f; ) f = Math.floor(256 * Math.random());
                m[n] = f;
            } else m[n] = 0;
            n++, e--;
        }
        for (2 == o && (m[w] = 0, m[i.chunkSize - 2] = 2, m[i.chunkSize - 1] = 0), c = m.length, 
        n = 0; c > n; n += i.chunkSize) {
            for (l = new g(), e = 0, d = n; d < n + i.chunkSize; ++e) l.digits[e] = m[d++], 
            l.digits[e] += m[d++] << 8;
            v = i.barrett.powMod(l, i.e), k += 1 == a ? N(v) : 16 == i.radix ? h(v) : u(v, i.radix);
        }
        return k;
    }
};