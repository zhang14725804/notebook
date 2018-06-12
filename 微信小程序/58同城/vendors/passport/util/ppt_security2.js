var i = {};

!function(i) {
    function t(i) {
        var t = g, r = t.biDivideByRadixPower(i, this.k - 1), e = t.biMultiply(r, this.mu), s = t.biDivideByRadixPower(e, this.k + 1), n = t.biModuloByRadixPower(i, this.k + 1), d = t.biMultiply(s, this.modulus), o = t.biModuloByRadixPower(d, this.k + 1), u = t.biSubtract(n, o);
        u.isNeg && (u = t.biAdd(u, this.bkplus1));
        for (var a = t.biCompare(u, this.modulus) >= 0; a; ) u = t.biSubtract(u, this.modulus), 
        a = t.biCompare(u, this.modulus) >= 0;
        return u;
    }
    function r(i, t) {
        var r = g.biMultiply(i, t);
        return this.modulo(r);
    }
    function e(i, t) {
        var r = new o();
        r.digits[0] = 1;
        for (var e = i, s = t; ;) {
            if (0 != (1 & s.digits[0]) && (r = this.multiplyMod(r, e)), 0 == (s = g.biShiftRight(s, 1)).digits[0] && 0 == g.biHighIndex(s)) break;
            e = this.multiplyMod(e, e);
        }
        return r;
    }
    if (void 0 === i.RSAUtils) var g = i.RSAUtils = {};
    var s, n, d, o = i.BigInt = function(i) {
        this.digits = "boolean" == typeof i && 1 == i ? null : n.slice(0), this.isNeg = !1;
    };
    g.setMaxDigits = function(i) {
        s = i, n = new Array(s);
        for (var t = 0; t < n.length; t++) n[t] = 0;
        d = new o(), new o().digits[0] = 1;
    }, g.setMaxDigits(20);
    g.biFromNumber = function(i) {
        var t = new o();
        t.isNeg = i < 0, i = Math.abs(i);
        for (var r = 0; i > 0; ) t.digits[r++] = 65535 & i, i = Math.floor(i / 65536);
        return t;
    };
    var u = g.biFromNumber(1e15);
    g.biFromDecimal = function(i) {
        for (var t, r = "-" == i.charAt(0), e = r ? 1 : 0; e < i.length && "0" == i.charAt(e); ) ++e;
        if (e == i.length) t = new o(); else {
            var s = (i.length - e) % 15;
            for (0 == s && (s = 15), t = g.biFromNumber(Number(i.substr(e, s))), e += s; e < i.length; ) t = g.biAdd(g.biMultiply(t, u), g.biFromNumber(Number(i.substr(e, 15)))), 
            e += 15;
            t.isNeg = r;
        }
        return t;
    }, g.biCopy = function(i) {
        var t = new o(!0);
        return t.digits = i.digits.slice(0), t.isNeg = i.isNeg, t;
    }, g.reverseStr = function(i) {
        for (var t = "", r = i.length - 1; r > -1; --r) t += i.charAt(r);
        return t;
    };
    var a = [ "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z" ];
    g.biToString = function(i, t) {
        var r = new o();
        r.digits[0] = t;
        for (var e = g.biDivideModulo(i, r), s = a[e[1].digits[0]]; 1 == g.biCompare(e[0], d); ) e = g.biDivideModulo(e[0], r), 
        digit = e[1].digits[0], s += a[e[1].digits[0]];
        return (i.isNeg ? "-" : "") + g.reverseStr(s);
    }, g.biToDecimal = function(i) {
        var t = new o();
        t.digits[0] = 10;
        for (var r = g.biDivideModulo(i, t), e = String(r[1].digits[0]); 1 == g.biCompare(r[0], d); ) r = g.biDivideModulo(r[0], t), 
        e += String(r[1].digits[0]);
        return (i.isNeg ? "-" : "") + g.reverseStr(e);
    };
    var b = [ "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f" ];
    g.digitToHex = function(i) {
        for (var t = "", r = 0; r < 4; ++r) t += b[15 & i], i >>>= 4;
        return g.reverseStr(t);
    }, g.biToHex = function(i) {
        for (var t = "", r = (g.biHighIndex(i), g.biHighIndex(i)); r > -1; --r) t += g.digitToHex(i.digits[r]);
        return t;
    }, g.charToHex = function(i) {
        return i >= 48 && i <= 57 ? i - 48 : i >= 65 && i <= 90 ? 10 + i - 65 : i >= 97 && i <= 122 ? 10 + i - 97 : 0;
    }, g.hexToDigit = function(i) {
        for (var t = 0, r = Math.min(i.length, 4), e = 0; e < r; ++e) t <<= 4, t |= g.charToHex(i.charCodeAt(e));
        return t;
    }, g.biFromHex = function(i) {
        for (var t = new o(), r = i.length, e = 0; r > 0; r -= 4, ++e) t.digits[e] = g.hexToDigit(i.substr(Math.max(r - 4, 0), Math.min(r, 4)));
        return t;
    }, g.biFromString = function(i, t) {
        var r = "-" == i.charAt(0), e = r ? 1 : 0, s = new o(), n = new o();
        n.digits[0] = 1;
        for (var d = i.length - 1; d >= e; d--) {
            var u = i.charCodeAt(d), a = g.charToHex(u), b = g.biMultiplyDigit(n, a);
            s = g.biAdd(s, b), n = g.biMultiplyDigit(n, t);
        }
        return s.isNeg = r, s;
    }, g.biDump = function(i) {
        return (i.isNeg ? "-" : "") + i.digits.join(" ");
    }, g.biAdd = function(i, t) {
        var r;
        if (i.isNeg != t.isNeg) t.isNeg = !t.isNeg, r = g.biSubtract(i, t), t.isNeg = !t.isNeg; else {
            r = new o();
            for (var e, s = 0, n = 0; n < i.digits.length; ++n) e = i.digits[n] + t.digits[n] + s, 
            r.digits[n] = e % 65536, s = Number(e >= 65536);
            r.isNeg = i.isNeg;
        }
        return r;
    }, g.biSubtract = function(i, t) {
        var r;
        if (i.isNeg != t.isNeg) t.isNeg = !t.isNeg, r = g.biAdd(i, t), t.isNeg = !t.isNeg; else {
            r = new o();
            var e, s;
            s = 0;
            for (n = 0; n < i.digits.length; ++n) e = i.digits[n] - t.digits[n] + s, r.digits[n] = e % 65536, 
            r.digits[n] < 0 && (r.digits[n] += 65536), s = 0 - Number(e < 0);
            if (-1 == s) {
                s = 0;
                for (var n = 0; n < i.digits.length; ++n) e = 0 - r.digits[n] + s, r.digits[n] = e % 65536, 
                r.digits[n] < 0 && (r.digits[n] += 65536), s = 0 - Number(e < 0);
                r.isNeg = !i.isNeg;
            } else r.isNeg = i.isNeg;
        }
        return r;
    }, g.biHighIndex = function(i) {
        for (var t = i.digits.length - 1; t > 0 && 0 == i.digits[t]; ) --t;
        return t;
    }, g.biNumBits = function(i) {
        var t, r = g.biHighIndex(i), e = i.digits[r], s = 16 * (r + 1);
        for (t = s; t > s - 16 && 0 == (32768 & e); --t) e <<= 1;
        return t;
    }, g.biMultiply = function(i, t) {
        for (var r, e, s, n = new o(), d = g.biHighIndex(i), u = g.biHighIndex(t), a = 0; a <= u; ++a) {
            r = 0, s = a;
            for (var b = 0; b <= d; ++b, ++s) e = n.digits[s] + i.digits[b] * t.digits[a] + r, 
            n.digits[s] = 65535 & e, r = e >>> 16;
            n.digits[a + d + 1] = r;
        }
        return n.isNeg = i.isNeg != t.isNeg, n;
    }, g.biMultiplyDigit = function(i, t) {
        var r, e, s, n = new o();
        r = g.biHighIndex(i), e = 0;
        for (var d = 0; d <= r; ++d) s = n.digits[d] + i.digits[d] * t + e, n.digits[d] = 65535 & s, 
        e = s >>> 16;
        return n.digits[1 + r] = e, n;
    }, g.arrayCopy = function(i, t, r, e, g) {
        for (var s = Math.min(t + g, i.length), n = t, d = e; n < s; ++n, ++d) r[d] = i[n];
    };
    var h = [ 0, 32768, 49152, 57344, 61440, 63488, 64512, 65024, 65280, 65408, 65472, 65504, 65520, 65528, 65532, 65534, 65535 ];
    g.biShiftLeft = function(i, t) {
        var r = Math.floor(t / 16), e = new o();
        g.arrayCopy(i.digits, 0, e.digits, r, e.digits.length - r);
        for (var s = t % 16, n = 16 - s, d = e.digits.length - 1, u = d - 1; d > 0; --d, 
        --u) e.digits[d] = e.digits[d] << s & 65535 | (e.digits[u] & h[s]) >>> n;
        return e.digits[0] = e.digits[d] << s & 65535, e.isNeg = i.isNeg, e;
    };
    var l = [ 0, 1, 3, 7, 15, 31, 63, 127, 255, 511, 1023, 2047, 4095, 8191, 16383, 32767, 65535 ];
    g.biShiftRight = function(i, t) {
        var r = Math.floor(t / 16), e = new o();
        g.arrayCopy(i.digits, r, e.digits, 0, i.digits.length - r);
        for (var s = t % 16, n = 16 - s, d = 0, u = d + 1; d < e.digits.length - 1; ++d, 
        ++u) e.digits[d] = e.digits[d] >>> s | (e.digits[u] & l[s]) << n;
        return e.digits[e.digits.length - 1] >>>= s, e.isNeg = i.isNeg, e;
    }, g.biMultiplyByRadixPower = function(i, t) {
        var r = new o();
        return g.arrayCopy(i.digits, 0, r.digits, t, r.digits.length - t), r;
    }, g.biDivideByRadixPower = function(i, t) {
        var r = new o();
        return g.arrayCopy(i.digits, t, r.digits, 0, r.digits.length - t), r;
    }, g.biModuloByRadixPower = function(i, t) {
        var r = new o();
        return g.arrayCopy(i.digits, 0, r.digits, 0, t), r;
    }, g.biCompare = function(i, t) {
        if (i.isNeg != t.isNeg) return 1 - 2 * Number(i.isNeg);
        for (var r = i.digits.length - 1; r >= 0; --r) if (i.digits[r] != t.digits[r]) return i.isNeg ? 1 - 2 * Number(i.digits[r] > t.digits[r]) : 1 - 2 * Number(i.digits[r] < t.digits[r]);
        return 0;
    }, g.biDivideModulo = function(i, t) {
        var r, e, s = g.biNumBits(i), n = g.biNumBits(t), d = t.isNeg;
        if (s < n) return i.isNeg ? ((r = g.biCopy(bigOne)).isNeg = !t.isNeg, i.isNeg = !1, 
        t.isNeg = !1, e = biSubtract(t, i), i.isNeg = !0, t.isNeg = d) : (r = new o(), e = g.biCopy(i)), 
        [ r, e ];
        r = new o(), e = i;
        for (var u = Math.ceil(n / 16) - 1, a = 0; t.digits[u] < 32768; ) t = g.biShiftLeft(t, 1), 
        ++a, ++n, u = Math.ceil(n / 16) - 1;
        e = g.biShiftLeft(e, a), s += a;
        for (var b = Math.ceil(s / 16) - 1, h = g.biMultiplyByRadixPower(t, b - u); -1 != g.biCompare(e, h); ) ++r.digits[b - u], 
        e = g.biSubtract(e, h);
        for (var l = b; l > u; --l) {
            var f = l >= e.digits.length ? 0 : e.digits[l], v = l - 1 >= e.digits.length ? 0 : e.digits[l - 1], c = l - 2 >= e.digits.length ? 0 : e.digits[l - 2], N = u >= t.digits.length ? 0 : t.digits[u], m = u - 1 >= t.digits.length ? 0 : t.digits[u - 1];
            r.digits[l - u - 1] = f == N ? 65535 : Math.floor((65536 * f + v) / N);
            for (var M = r.digits[l - u - 1] * (65536 * N + m), y = 4294967296 * f + (65536 * v + c); M > y; ) --r.digits[l - u - 1], 
            M = r.digits[l - u - 1] * (65536 * N | m), y = 65536 * f * 65536 + (65536 * v + c);
            h = g.biMultiplyByRadixPower(t, l - u - 1), (e = g.biSubtract(e, g.biMultiplyDigit(h, r.digits[l - u - 1]))).isNeg && (e = g.biAdd(e, h), 
            --r.digits[l - u - 1]);
        }
        return e = g.biShiftRight(e, a), r.isNeg = i.isNeg != d, i.isNeg && (r = d ? g.biAdd(r, bigOne) : g.biSubtract(r, bigOne), 
        t = g.biShiftRight(t, a), e = g.biSubtract(t, e)), 0 == e.digits[0] && 0 == g.biHighIndex(e) && (e.isNeg = !1), 
        [ r, e ];
    }, g.biDivide = function(i, t) {
        return g.biDivideModulo(i, t)[0];
    }, g.biModulo = function(i, t) {
        return g.biDivideModulo(i, t)[1];
    }, g.biMultiplyMod = function(i, t, r) {
        return g.biModulo(g.biMultiply(i, t), r);
    }, g.biPow = function(i, t) {
        for (var r = bigOne, e = i; ;) {
            if (0 != (1 & t) && (r = g.biMultiply(r, e)), 0 == (t >>= 1)) break;
            e = g.biMultiply(e, e);
        }
        return r;
    }, g.biPowMod = function(i, t, r) {
        for (var e = bigOne, s = i, n = t; ;) {
            if (0 != (1 & n.digits[0]) && (e = g.biMultiplyMod(e, s, r)), 0 == (n = g.biShiftRight(n, 1)).digits[0] && 0 == g.biHighIndex(n)) break;
            s = g.biMultiplyMod(s, s, r);
        }
        return e;
    }, i.BarrettMu = function(i) {
        this.modulus = g.biCopy(i), this.k = g.biHighIndex(this.modulus) + 1;
        var s = new o();
        s.digits[2 * this.k] = 1, this.mu = g.biDivide(s, this.modulus), this.bkplus1 = new o(), 
        this.bkplus1.digits[this.k + 1] = 1, this.modulo = t, this.multiplyMod = r, this.powMod = e;
    };
    var f = function(t, r, e) {
        var s = g;
        this.e = s.biFromHex(t), this.d = s.biFromHex(r), this.m = s.biFromHex(e), this.chunkSize = 2 * s.biHighIndex(this.m), 
        this.radix = 16, this.barrett = new i.BarrettMu(this.m);
    };
    g.getKeyPair = function(i, t, r) {
        return new f(i, t, r);
    }, void 0 === i.twoDigit && (i.twoDigit = function(i) {
        return (i < 10 ? "0" : "") + String(i);
    }), g.encryptedString = function(i, t) {
        for (var r = [], e = t.length, s = 0; s < e; ) r[s] = t.charCodeAt(s), s++;
        for (;r.length % i.chunkSize != 0; ) r[s++] = 0;
        var n, d, u, a = r.length, b = "";
        for (s = 0; s < a; s += i.chunkSize) {
            for (u = new o(), n = 0, d = s; d < s + i.chunkSize; ++n) u.digits[n] = r[d++], 
            u.digits[n] += r[d++] << 8;
            var h = i.barrett.powMod(u, i.e);
            b += (16 == i.radix ? g.biToHex(h) : g.biToString(h, i.radix)) + " ";
        }
        return b.substring(0, b.length - 1);
    }, g.decryptedString = function(i, t) {
        var r, e, s, n = t.split(" "), d = "";
        for (r = 0; r < n.length; ++r) {
            var o;
            for (o = 16 == i.radix ? g.biFromHex(n[r]) : g.biFromString(n[r], i.radix), s = i.barrett.powMod(o, i.d), 
            e = 0; e <= g.biHighIndex(s); ++e) d += String.fromCharCode(255 & s.digits[e], s.digits[e] >> 8);
        }
        return 0 == d.charCodeAt(d.length - 1) && (d = d.substring(0, d.length - 1)), d;
    }, g.setMaxDigits(130);
}(i), module.exports = {
    encryptString: function(t, r, e) {
        var g = i.RSAUtils.getKeyPair(r, "", e);
        return i.RSAUtils.encryptedString(g, t);
    }
};