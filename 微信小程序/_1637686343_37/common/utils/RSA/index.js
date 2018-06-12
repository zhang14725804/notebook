Object.defineProperty(exports, "__esModule", {
    value: !0
});

var i = void 0;

!function(t) {
    function r(i) {
        this.digits = "boolean" == typeof i && !0 === i ? null : d.slice(0), this.isNeg = !1;
    }
    function e(t) {
        var r = i, e = r.biDivideByRadixPower(t, this.k - 1), s = r.biMultiply(e, this.mu), g = r.biDivideByRadixPower(s, this.k + 1), n = r.biModuloByRadixPower(t, this.k + 1), d = r.biMultiply(g, this.modulus), o = r.biModuloByRadixPower(d, this.k + 1), u = r.biSubtract(n, o);
        u.isNeg && (u = r.biAdd(u, this.bkplus1));
        for (var a = r.biCompare(u, this.modulus) >= 0; a; ) u = r.biSubtract(u, this.modulus), 
        a = r.biCompare(u, this.modulus) >= 0;
        return u;
    }
    function s(t, r) {
        var e = i.biMultiply(t, r);
        return this.modulo(e);
    }
    function g(t, e) {
        var s = new r();
        s.digits[0] = 1;
        for (var g = t, n = e; ;) {
            if (0 != (1 & n.digits[0]) && (s = this.multiplyMod(s, g)), 0 == (n = i.biShiftRight(n, 1)).digits[0] && 0 == i.biHighIndex(n)) break;
            g = this.multiplyMod(g, g);
        }
        return s;
    }
    void 0 === t.RSAUtils && (i = t.RSAUtils = {});
    var n, d, o, u;
    i.setMaxDigits = function(i) {
        n = i, d = new Array(n);
        for (var t = 0; t < d.length; t++) d[t] = 0;
        o = new r(), (u = new r()).digits[0] = 1;
    }, i.setMaxDigits(20);
    i.biFromNumber = function(i) {
        var t = new r();
        t.isNeg = i < 0, i = Math.abs(i);
        for (var e = 0; i > 0; ) t.digits[e++] = 65535 & i, i = Math.floor(i / 65536);
        return t;
    };
    var a = i.biFromNumber(1e15);
    i.biFromDecimal = function(t) {
        for (var e, s = "-" == t.charAt(0), g = s ? 1 : 0; g < t.length && "0" == t.charAt(g); ) ++g;
        if (g == t.length) e = new r(); else {
            var n = (t.length - g) % 15;
            for (0 == n && (n = 15), e = i.biFromNumber(Number(t.substr(g, n))), g += n; g < t.length; ) e = i.biAdd(i.biMultiply(e, a), i.biFromNumber(Number(t.substr(g, 15)))), 
            g += 15;
            e.isNeg = s;
        }
        return e;
    }, i.biCopy = function(i) {
        var t = new r(!0);
        return t.digits = i.digits.slice(0), t.isNeg = i.isNeg, t;
    }, i.reverseStr = function(i) {
        for (var t = "", r = i.length - 1; r > -1; --r) t += i.charAt(r);
        return t;
    };
    var b = [ "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z" ];
    i.biToString = function(t, e) {
        var s = new r();
        s.digits[0] = e;
        for (var g = i.biDivideModulo(t, s), n = b[g[1].digits[0]]; 1 == i.biCompare(g[0], o); ) g = i.biDivideModulo(g[0], s), 
        digit = g[1].digits[0], n += b[g[1].digits[0]];
        return (t.isNeg ? "-" : "") + i.reverseStr(n);
    }, i.biToDecimal = function(t) {
        var e = new r();
        e.digits[0] = 10;
        for (var s = i.biDivideModulo(t, e), g = String(s[1].digits[0]); 1 == i.biCompare(s[0], o); ) s = i.biDivideModulo(s[0], e), 
        g += String(s[1].digits[0]);
        return (t.isNeg ? "-" : "") + i.reverseStr(g);
    };
    var l = [ "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f" ];
    i.digitToHex = function(t) {
        for (var r = "", e = 0; e < 4; ++e) r += l[15 & t], t >>>= 4;
        return i.reverseStr(r);
    }, i.biToHex = function(t) {
        for (var r = "", e = (i.biHighIndex(t), i.biHighIndex(t)); e > -1; --e) r += i.digitToHex(t.digits[e]);
        return r;
    }, i.charToHex = function(i) {
        return i >= 48 && i <= 57 ? i - 48 : i >= 65 && i <= 90 ? 10 + i - 65 : i >= 97 && i <= 122 ? 10 + i - 97 : 0;
    }, i.hexToDigit = function(t) {
        for (var r = 0, e = Math.min(t.length, 4), s = 0; s < e; ++s) r <<= 4, r |= i.charToHex(t.charCodeAt(s));
        return r;
    }, i.biFromHex = function(t) {
        for (var e = new r(), s = t.length, g = 0; s > 0; s -= 4, ++g) e.digits[g] = i.hexToDigit(t.substr(Math.max(s - 4, 0), Math.min(s, 4)));
        return e;
    }, i.biFromString = function(t, e) {
        var s = "-" == t.charAt(0), g = s ? 1 : 0, n = new r(), d = new r();
        d.digits[0] = 1;
        for (var o = t.length - 1; o >= g; o--) {
            var u = t.charCodeAt(o), a = i.charToHex(u), b = i.biMultiplyDigit(d, a);
            n = i.biAdd(n, b), d = i.biMultiplyDigit(d, e);
        }
        return n.isNeg = s, n;
    }, i.biDump = function(i) {
        return (i.isNeg ? "-" : "") + i.digits.join(" ");
    }, i.biAdd = function(t, e) {
        var s;
        if (t.isNeg != e.isNeg) e.isNeg = !e.isNeg, s = i.biSubtract(t, e), e.isNeg = !e.isNeg; else {
            s = new r();
            for (var g, n = 0, d = 0; d < t.digits.length; ++d) g = t.digits[d] + e.digits[d] + n, 
            s.digits[d] = g % 65536, n = Number(g >= 65536);
            s.isNeg = t.isNeg;
        }
        return s;
    }, i.biSubtract = function(t, e) {
        var s;
        if (t.isNeg != e.isNeg) e.isNeg = !e.isNeg, s = i.biAdd(t, e), e.isNeg = !e.isNeg; else {
            s = new r();
            var g, n;
            n = 0;
            for (d = 0; d < t.digits.length; ++d) g = t.digits[d] - e.digits[d] + n, s.digits[d] = g % 65536, 
            s.digits[d] < 0 && (s.digits[d] += 65536), n = 0 - Number(g < 0);
            if (-1 == n) {
                n = 0;
                for (var d = 0; d < t.digits.length; ++d) g = 0 - s.digits[d] + n, s.digits[d] = g % 65536, 
                s.digits[d] < 0 && (s.digits[d] += 65536), n = 0 - Number(g < 0);
                s.isNeg = !t.isNeg;
            } else s.isNeg = t.isNeg;
        }
        return s;
    }, i.biHighIndex = function(i) {
        for (var t = i.digits.length - 1; t > 0 && 0 == i.digits[t]; ) --t;
        return t;
    }, i.biNumBits = function(t) {
        var r, e = i.biHighIndex(t), s = t.digits[e], g = 16 * (e + 1);
        for (r = g; r > g - 16 && 0 == (32768 & s); --r) s <<= 1;
        return r;
    }, i.biMultiply = function(t, e) {
        for (var s, g, n, d = new r(), o = i.biHighIndex(t), u = i.biHighIndex(e), a = 0; a <= u; ++a) {
            s = 0, n = a;
            for (var b = 0; b <= o; ++b, ++n) g = d.digits[n] + t.digits[b] * e.digits[a] + s, 
            d.digits[n] = 65535 & g, s = g >>> 16;
            d.digits[a + o + 1] = s;
        }
        return d.isNeg = t.isNeg != e.isNeg, d;
    }, i.biMultiplyDigit = function(t, e) {
        var s, g, n, d = new r();
        s = i.biHighIndex(t), g = 0;
        for (var o = 0; o <= s; ++o) n = d.digits[o] + t.digits[o] * e + g, d.digits[o] = 65535 & n, 
        g = n >>> 16;
        return d.digits[1 + s] = g, d;
    }, i.arrayCopy = function(i, t, r, e, s) {
        for (var g = Math.min(t + s, i.length), n = t, d = e; n < g; ++n, ++d) r[d] = i[n];
    };
    var h = [ 0, 32768, 49152, 57344, 61440, 63488, 64512, 65024, 65280, 65408, 65472, 65504, 65520, 65528, 65532, 65534, 65535 ];
    i.biShiftLeft = function(t, e) {
        var s = Math.floor(e / 16), g = new r();
        i.arrayCopy(t.digits, 0, g.digits, s, g.digits.length - s);
        for (var n = e % 16, d = 16 - n, o = g.digits.length - 1, u = o - 1; o > 0; --o, 
        --u) g.digits[o] = g.digits[o] << n & 65535 | (g.digits[u] & h[n]) >>> d;
        return g.digits[0] = g.digits[o] << n & 65535, g.isNeg = t.isNeg, g;
    };
    var f = [ 0, 1, 3, 7, 15, 31, 63, 127, 255, 511, 1023, 2047, 4095, 8191, 16383, 32767, 65535 ];
    i.biShiftRight = function(t, e) {
        var s = Math.floor(e / 16), g = new r();
        i.arrayCopy(t.digits, s, g.digits, 0, t.digits.length - s);
        for (var n = e % 16, d = 16 - n, o = 0, u = o + 1; o < g.digits.length - 1; ++o, 
        ++u) g.digits[o] = g.digits[o] >>> n | (g.digits[u] & f[n]) << d;
        return g.digits[g.digits.length - 1] >>>= n, g.isNeg = t.isNeg, g;
    }, i.biMultiplyByRadixPower = function(t, e) {
        var s = new r();
        return i.arrayCopy(t.digits, 0, s.digits, e, s.digits.length - e), s;
    }, i.biDivideByRadixPower = function(t, e) {
        var s = new r();
        return i.arrayCopy(t.digits, e, s.digits, 0, s.digits.length - e), s;
    }, i.biModuloByRadixPower = function(t, e) {
        var s = new r();
        return i.arrayCopy(t.digits, 0, s.digits, 0, e), s;
    }, i.biCompare = function(i, t) {
        if (i.isNeg != t.isNeg) return 1 - 2 * Number(i.isNeg);
        for (var r = i.digits.length - 1; r >= 0; --r) if (i.digits[r] != t.digits[r]) return i.isNeg ? 1 - 2 * Number(i.digits[r] > t.digits[r]) : 1 - 2 * Number(i.digits[r] < t.digits[r]);
        return 0;
    }, i.biDivideModulo = function(t, e) {
        var s, g, n = i.biNumBits(t), d = i.biNumBits(e), o = e.isNeg;
        if (n < d) return t.isNeg ? ((s = i.biCopy(u)).isNeg = !e.isNeg, t.isNeg = !1, e.isNeg = !1, 
        g = biSubtract(e, t), t.isNeg = !0, e.isNeg = o) : (s = new r(), g = i.biCopy(t)), 
        [ s, g ];
        s = new r(), g = t;
        for (var a = Math.ceil(d / 16) - 1, b = 0; e.digits[a] < 32768; ) e = i.biShiftLeft(e, 1), 
        ++b, ++d, a = Math.ceil(d / 16) - 1;
        g = i.biShiftLeft(g, b), n += b;
        for (var l = Math.ceil(n / 16) - 1, h = i.biMultiplyByRadixPower(e, l - a); -1 != i.biCompare(g, h); ) ++s.digits[l - a], 
        g = i.biSubtract(g, h);
        for (var f = l; f > a; --f) {
            var v = f >= g.digits.length ? 0 : g.digits[f], c = f - 1 >= g.digits.length ? 0 : g.digits[f - 1], N = f - 2 >= g.digits.length ? 0 : g.digits[f - 2], m = a >= e.digits.length ? 0 : e.digits[a], M = a - 1 >= e.digits.length ? 0 : e.digits[a - 1];
            s.digits[f - a - 1] = v == m ? 65535 : Math.floor((65536 * v + c) / m);
            for (var y = s.digits[f - a - 1] * (65536 * m + M), p = 4294967296 * v + (65536 * c + N); y > p; ) --s.digits[f - a - 1], 
            y = s.digits[f - a - 1] * (65536 * m | M), p = 65536 * v * 65536 + (65536 * c + N);
            h = i.biMultiplyByRadixPower(e, f - a - 1), (g = i.biSubtract(g, i.biMultiplyDigit(h, s.digits[f - a - 1]))).isNeg && (g = i.biAdd(g, h), 
            --s.digits[f - a - 1]);
        }
        return g = i.biShiftRight(g, b), s.isNeg = t.isNeg != o, t.isNeg && (s = o ? i.biAdd(s, u) : i.biSubtract(s, u), 
        e = i.biShiftRight(e, b), g = i.biSubtract(e, g)), 0 == g.digits[0] && 0 == i.biHighIndex(g) && (g.isNeg = !1), 
        [ s, g ];
    }, i.biDivide = function(t, r) {
        return i.biDivideModulo(t, r)[0];
    }, i.biModulo = function(t, r) {
        return i.biDivideModulo(t, r)[1];
    }, i.biMultiplyMod = function(t, r, e) {
        return i.biModulo(i.biMultiply(t, r), e);
    }, i.biPow = function(t, r) {
        for (var e = u, s = t; ;) {
            if (0 != (1 & r) && (e = i.biMultiply(e, s)), 0 == (r >>= 1)) break;
            s = i.biMultiply(s, s);
        }
        return e;
    }, i.biPowMod = function(t, r, e) {
        for (var s = u, g = t, n = r; ;) {
            if (0 != (1 & n.digits[0]) && (s = i.biMultiplyMod(s, g, e)), 0 == (n = i.biShiftRight(n, 1)).digits[0] && 0 == i.biHighIndex(n)) break;
            g = i.biMultiplyMod(g, g, e);
        }
        return s;
    }, t.BarrettMu = function(t) {
        this.modulus = i.biCopy(t), this.k = i.biHighIndex(this.modulus) + 1;
        var n = new r();
        n.digits[2 * this.k] = 1, this.mu = i.biDivide(n, this.modulus), this.bkplus1 = new r(), 
        this.bkplus1.digits[this.k + 1] = 1, this.modulo = e, this.multiplyMod = s, this.powMod = g;
    };
    var v = function(r, e, s) {
        var g = i;
        this.e = g.biFromHex(r), this.d = g.biFromHex(e), this.m = g.biFromHex(s), this.chunkSize = 2 * g.biHighIndex(this.m), 
        this.radix = 16, this.barrett = new t.BarrettMu(this.m);
    };
    i.getKeyPair = function(i, t, r) {
        return new v(i, t, r);
    }, void 0 === t.twoDigit && (t.twoDigit = function(i) {
        return (i < 10 ? "0" : "") + String(i);
    }), i.encryptedString = function(t, e) {
        for (var s = [], g = e.length, n = 0; n < g; ) s[n] = e.charCodeAt(n), n++;
        for (;s.length % t.chunkSize != 0; ) s[n++] = 0;
        var d, o, u, a = s.length, b = "";
        for (n = 0; n < a; n += t.chunkSize) {
            for (u = new r(), d = 0, o = n; o < n + t.chunkSize; ++d) u.digits[d] = s[o++], 
            u.digits[d] += s[o++] << 8;
            var l = t.barrett.powMod(u, t.e);
            b += (16 == t.radix ? i.biToHex(l) : i.biToString(l, t.radix)) + " ";
        }
        return b.substring(0, b.length - 1);
    }, i.decryptedString = function(t, r) {
        var e, s, g, n = r.split(" "), d = "";
        for (e = 0; e < n.length; ++e) {
            var o;
            for (o = 16 == t.radix ? i.biFromHex(n[e]) : i.biFromString(n[e], t.radix), g = t.barrett.powMod(o, t.d), 
            s = 0; s <= i.biHighIndex(g); ++s) d += String.fromCharCode(255 & g.digits[s], g.digits[s] >> 8);
        }
        return 0 == d.charCodeAt(d.length - 1) && (d = d.substring(0, d.length - 1)), d;
    }, i.setMaxDigits(130);
}(global || {}), exports.default = i;