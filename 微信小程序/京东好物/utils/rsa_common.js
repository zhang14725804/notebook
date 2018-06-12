function t(i) {
    this.modulus = d(i), this.k = S(this.modulus) + 1;
    var t = new g();
    t.digits[2 * this.k] = 1, this.mu = j(t, this.modulus), this.bkplus1 = new g(), 
    this.bkplus1.digits[this.k + 1] = 1, this.modulo = r, this.multiplyMod = s, this.powMod = n;
}

function r(i) {
    var t = x(y(x(i, this.k - 1), this.mu), this.k + 1), r = M(E(i, this.k + 1), E(y(t, this.modulus), this.k + 1));
    r.isNeg && (r = k(r, this.bkplus1));
    for (var s = R(r, this.modulus) >= 0; s; ) s = R(r = M(r, this.modulus), this.modulus) >= 0;
    return r;
}

function s(i, t) {
    var r = y(i, t);
    return this.modulo(r);
}

function n(i, t) {
    var r = new g();
    r.digits[0] = 1;
    for (var s = i, n = t; ;) {
        if (0 != (1 & n.digits[0]) && (r = this.multiplyMod(r, s)), 0 == (n = z(n, 1)).digits[0] && 0 == S(n)) break;
        s = this.multiplyMod(s, s);
    }
    return r;
}

function e(i) {
    q = i, D = new Array(q);
    for (var t = 0; t < D.length; t++) D[t] = 0;
    B = new g(), (F = new g()).digits[0] = 1;
}

function g(i) {
    this.digits = "boolean" == typeof i && 1 == i ? null : D.slice(0), this.isNeg = !1;
}

function d(i) {
    var t = new g(!0);
    return t.digits = i.digits.slice(0), t.isNeg = i.isNeg, t;
}

function o(i) {
    var t = new g();
    t.isNeg = i < 0, i = Math.abs(i);
    for (var r = 0; i > 0; ) t.digits[r++] = i & O, i >>= G;
    return t;
}

function u(i) {
    for (var t = "", r = i.length - 1; r > -1; --r) t += i.charAt(r);
    return t;
}

function a(i, t) {
    var r = new g();
    r.digits[0] = t;
    for (var s = K(i, r), n = Q[s[1].digits[0]]; 1 == R(s[0], B); ) s = K(s[0], r), 
    digit = s[1].digits[0], n += Q[s[1].digits[0]];
    return (i.isNeg ? "-" : "") + u(n);
}

function h(t) {
    var r = "";
    for (i = 0; i < 4; ++i) r += T[15 & t], t >>>= 4;
    return u(r);
}

function f(i) {
    for (var t = "", r = (S(i), S(i)); r > -1; --r) t += h(i.digits[r]);
    return t;
}

function c(i) {
    return i >= 48 && i <= 57 ? i - 48 : i >= 65 && i <= 90 ? 10 + i - 65 : i >= 97 && i <= 122 ? 10 + i - 97 : 0;
}

function l(i) {
    for (var t = 0, r = Math.min(i.length, 4), s = 0; s < r; ++s) t <<= 4, t |= c(i.charCodeAt(s));
    return t;
}

function N(i) {
    for (var t = new g(), r = i.length, s = 0; r > 0; r -= 4, ++s) t.digits[s] = l(i.substr(Math.max(r - 4, 0), Math.min(r, 4)));
    return t;
}

function v(i, t) {
    var r = "-" == i.charAt(0), s = r ? 1 : 0, n = new g(), e = new g();
    e.digits[0] = 1;
    for (var d = i.length - 1; d >= s; d--) n = k(n, p(e, c(i.charCodeAt(d)))), e = p(e, t);
    return n.isNeg = r, n;
}

function w(i) {
    for (var t = "", r = S(i); r > -1; --r) t += m(i.digits[r]);
    return t;
}

function m(i) {
    var t = String.fromCharCode(255 & i);
    return i >>>= 8, String.fromCharCode(255 & i) + t;
}

function k(i, t) {
    var r;
    if (i.isNeg != t.isNeg) t.isNeg = !t.isNeg, r = M(i, t), t.isNeg = !t.isNeg; else {
        r = new g();
        for (var s, n = 0, e = 0; e < i.digits.length; ++e) s = i.digits[e] + t.digits[e] + n, 
        r.digits[e] = 65535 & s, n = Number(s >= I);
        r.isNeg = i.isNeg;
    }
    return r;
}

function M(i, t) {
    var r;
    if (i.isNeg != t.isNeg) t.isNeg = !t.isNeg, r = k(i, t), t.isNeg = !t.isNeg; else {
        r = new g();
        var s, n;
        n = 0;
        for (e = 0; e < i.digits.length; ++e) s = i.digits[e] - t.digits[e] + n, r.digits[e] = 65535 & s, 
        r.digits[e] < 0 && (r.digits[e] += I), n = 0 - Number(s < 0);
        if (-1 == n) {
            n = 0;
            for (var e = 0; e < i.digits.length; ++e) s = 0 - r.digits[e] + n, r.digits[e] = 65535 & s, 
            r.digits[e] < 0 && (r.digits[e] += I), n = 0 - Number(s < 0);
            r.isNeg = !i.isNeg;
        } else r.isNeg = i.isNeg;
    }
    return r;
}

function S(i) {
    for (var t = i.digits.length - 1; t > 0 && 0 == i.digits[t]; ) --t;
    return t;
}

function b(i) {
    var t, r = S(i), s = i.digits[r], n = (r + 1) * H;
    for (t = n; t > n - H && 0 == (32768 & s); --t) s <<= 1;
    return t;
}

function y(i, t) {
    for (var r, s, n, e = new g(), d = S(i), o = S(t), u = 0; u <= o; ++u) {
        r = 0, n = u;
        for (var a = 0; a <= d; ++a, ++n) s = e.digits[n] + i.digits[a] * t.digits[u] + r, 
        e.digits[n] = s & O, r = s >>> G;
        e.digits[u + d + 1] = r;
    }
    return e.isNeg = i.isNeg != t.isNeg, e;
}

function p(i, t) {
    var r, s, n, e = new g();
    r = S(i), s = 0;
    for (var d = 0; d <= r; ++d) n = e.digits[d] + i.digits[d] * t + s, e.digits[d] = n & O, 
    s = n >>> G;
    return e.digits[1 + r] = s, e;
}

function A(i, t, r, s, n) {
    for (var e = Math.min(t + n, i.length), g = t, d = s; g < e; ++g, ++d) r[d] = i[g];
}

function C(i, t) {
    var r = Math.floor(t / H), s = new g();
    A(i.digits, 0, s.digits, r, s.digits.length - r);
    for (var n = t % H, e = H - n, d = s.digits.length - 1, o = d - 1; d > 0; --d, --o) s.digits[d] = s.digits[d] << n & O | (s.digits[o] & U[n]) >>> e;
    return s.digits[0] = s.digits[d] << n & O, s.isNeg = i.isNeg, s;
}

function z(i, t) {
    var r = Math.floor(t / H), s = new g();
    A(i.digits, r, s.digits, 0, i.digits.length - r);
    for (var n = t % H, e = H - n, d = 0, o = d + 1; d < s.digits.length - 1; ++d, ++o) s.digits[d] = s.digits[d] >>> n | (s.digits[o] & V[n]) << e;
    return s.digits[s.digits.length - 1] >>>= n, s.isNeg = i.isNeg, s;
}

function P(i, t) {
    var r = new g();
    return A(i.digits, 0, r.digits, t, r.digits.length - t), r;
}

function x(i, t) {
    var r = new g();
    return A(i.digits, t, r.digits, 0, r.digits.length - t), r;
}

function E(i, t) {
    var r = new g();
    return A(i.digits, 0, r.digits, 0, t), r;
}

function R(i, t) {
    if (i.isNeg != t.isNeg) return 1 - 2 * Number(i.isNeg);
    for (var r = i.digits.length - 1; r >= 0; --r) if (i.digits[r] != t.digits[r]) return i.isNeg ? 1 - 2 * Number(i.digits[r] > t.digits[r]) : 1 - 2 * Number(i.digits[r] < t.digits[r]);
    return 0;
}

function K(i, t) {
    var r, s, n = b(i), e = b(t), o = t.isNeg;
    if (n < e) return i.isNeg ? ((r = d(F)).isNeg = !t.isNeg, i.isNeg = !1, t.isNeg = !1, 
    s = M(t, i), i.isNeg = !0, t.isNeg = o) : (r = new g(), s = d(i)), new Array(r, s);
    r = new g(), s = i;
    for (var u = Math.ceil(e / H) - 1, a = 0; t.digits[u] < J; ) t = C(t, 1), ++a, ++e, 
    u = Math.ceil(e / H) - 1;
    s = C(s, a), n += a;
    for (var h = Math.ceil(n / H) - 1, f = P(t, h - u); -1 != R(s, f); ) ++r.digits[h - u], 
    s = M(s, f);
    for (var c = h; c > u; --c) {
        var l = c >= s.digits.length ? 0 : s.digits[c], N = c - 1 >= s.digits.length ? 0 : s.digits[c - 1], v = c - 2 >= s.digits.length ? 0 : s.digits[c - 2], w = u >= t.digits.length ? 0 : t.digits[u], m = u - 1 >= t.digits.length ? 0 : t.digits[u - 1];
        r.digits[c - u - 1] = l == w ? O : Math.floor((l * I + N) / w);
        for (var y = r.digits[c - u - 1] * (w * I + m), A = l * L + (N * I + v); y > A; ) --r.digits[c - u - 1], 
        y = r.digits[c - u - 1] * (w * I | m), A = l * I * I + (N * I + v);
        (s = M(s, p(f = P(t, c - u - 1), r.digits[c - u - 1]))).isNeg && (s = k(s, f), --r.digits[c - u - 1]);
    }
    return s = z(s, a), r.isNeg = i.isNeg != o, i.isNeg && (r = o ? k(r, F) : M(r, F), 
    s = M(t = z(t, a), s)), 0 == s.digits[0] && 0 == S(s) && (s.isNeg = !1), new Array(r, s);
}

function j(i, t) {
    return K(i, t)[0];
}

var q, D, B, F, G = 16, H = G, I = 65536, J = I >>> 1, L = I * I, O = I - 1;

e(20);

o(1e15);

var Q = new Array("0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"), T = new Array("0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"), U = new Array(0, 32768, 49152, 57344, 61440, 63488, 64512, 65024, 65280, 65408, 65472, 65504, 65520, 65528, 65532, 65534, 65535), V = new Array(0, 1, 3, 7, 15, 31, 63, 127, 255, 511, 1023, 2047, 4095, 8191, 16383, 32767, 65535), W = {};

W.NoPadding = "NoPadding", W.PKCS1Padding = "PKCS1Padding", W.RawEncoding = "RawEncoding", 
W.NumericEncoding = "NumericEncoding", module.exports = {
    RSAAPP: W,
    setMaxDigits: e,
    RSAKeyPair: function(i, r, s, n) {
        this.e = N(i), this.d = N(r), this.m = N(s), this.chunkSize = "number" != typeof n ? 2 * S(this.m) : n / 8, 
        this.radix = 16, this.barrett = new t(this.m);
    },
    encryptedString: function(i, t, r, s) {
        var n, e, d, o, u, h, c, l, N, v = new Array(), m = t.length, k = "";
        for (o = "string" == typeof r ? r == W.NoPadding ? 1 : r == W.PKCS1Padding ? 2 : 0 : 0, 
        u = "string" == typeof s && s == W.RawEncoding ? 1 : 0, 1 == o ? m > i.chunkSize && (m = i.chunkSize) : 2 == o && m > i.chunkSize - 11 && (m = i.chunkSize - 11), 
        n = 0, e = 2 == o ? m - 1 : i.chunkSize - 1; n < m; ) o ? v[e] = t.charCodeAt(n) : v[n] = t.charCodeAt(n), 
        n++, e--;
        for (1 == o && (n = 0), e = i.chunkSize - m % i.chunkSize; e > 0; ) {
            if (2 == o) {
                for (h = Math.floor(256 * Math.random()); !h; ) h = Math.floor(256 * Math.random());
                v[n] = h;
            } else v[n] = 0;
            n++, e--;
        }
        for (2 == o && (v[m] = 0, v[i.chunkSize - 2] = 2, v[i.chunkSize - 1] = 0), c = v.length, 
        n = 0; n < c; n += i.chunkSize) {
            for (l = new g(), e = 0, d = n; d < n + i.chunkSize; ++e) l.digits[e] = v[d++], 
            l.digits[e] += v[d++] << 8;
            N = i.barrett.powMod(l, i.e), k += 1 == u ? w(N) : 16 == i.radix ? f(N) : a(N, i.radix);
        }
        return k;
    },
    decryptedString: function(i, t) {
        var r, s, n, e, g = t.split(" "), d = "";
        for (s = 0; s < g.length; ++s) for (e = 16 == i.radix ? N(g[s]) : v(g[s], i.radix), 
        r = i.barrett.powMod(e, i.d), n = 0; n <= S(r); ++n) d += String.fromCharCode(255 & r.digits[n], r.digits[n] >> 8);
        return 0 == d.charCodeAt(d.length - 1) && (d = d.substring(0, d.length - 1)), d;
    }
};