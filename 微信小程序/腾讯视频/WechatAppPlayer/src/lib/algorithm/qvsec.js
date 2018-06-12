var r = {};

r.ha = function(r) {
    function t(r, t) {
        return ((r >> 1) + (t >> 1) << 1) + (1 & r) + (1 & t);
    }
    for (var e = [], n = 0; n < 64; ) e[n] = 0 | 4294967296 * Math.abs(Math.sin(++n));
    return function(r) {
        for (var n, a, o, u, c = [], h = decodeURIComponent(encodeURI(r)), f = h.length, i = [ n = 1732584193, a = -271733879, ~n, ~a ], d = 0; d <= f; ) c[d >> 2] |= (h.charCodeAt(d) || 128) << d++ % 4 * 8;
        for (c[r = 16 * (f + 8 >> 6) + 14] = 8 * f, d = 0; d < r; d += 16) {
            for (f = i, u = 0; u < 64; ) f = [ o = f[3], t(n = f[1], (o = t(t(f[0], [ n & (a = f[2]) | ~n & o, o & n | ~o & a, n ^ a ^ o, a ^ (n | ~o) ][f = u >> 4]), t(e[u], c[[ u, 5 * u + 1, 3 * u + 5, 7 * u ][f] % 16 + d]))) << (f = [ 7, 12, 17, 22, 5, 9, 14, 20, 4, 11, 16, 23, 6, 10, 15, 21 ][4 * f + u++ % 4]) | o >>> 32 - f), n, a ];
            for (u = 4; u; ) i[--u] = t(i[u], f[u]);
        }
        for (r = ""; u < 32; ) r += (i[u >> 3] >> 4 * (1 ^ 7 & u++) & 15).toString(16);
        return r;
    };
}(), r.stringToHex = function(r) {
    for (var t = "", e = new Array("0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"), n = 0; n < r.length; n++) t += e[r.charCodeAt(n) >> 4] + e[15 & r.charCodeAt(n)];
    return t;
}, r.hexToString = function(r) {
    for (var t = "", e = "0x" == r.substr(0, 2) ? 2 : 0; e < r.length; e += 2) t += String.fromCharCode(parseInt(r.substr(e, 2), 16));
    return t;
}, r._Seed = "#$#@#*ad", r.tempcalc = function(r, t) {
    for (var e = "", n = 0; n < r.length; n++) e += String.fromCharCode(r.charCodeAt(n) ^ t.charCodeAt(n % 4));
    return e;
}, r.u1 = function(r, t) {
    for (var e = "", n = t; n < r.length; n += 2) e += r.charAt(n);
    return e;
}, r._urlStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", 
r.urlenc = function(t, e, n) {
    for (var a, o, u, c, h, f, i, d = "", s = 0; s < t.length; ) a = t.charCodeAt(s++), 
    o = t.charCodeAt(s++), u = t.charCodeAt(s++), 15 == s && (d += "A", d += e, d += n), 
    c = a >> 2, h = (3 & a) << 4 | o >> 4, f = (15 & o) << 2 | u >> 6, i = 63 & u, isNaN(o) ? f = i = 64 : isNaN(u) && (i = 64), 
    d = d + r._urlStr.charAt(c) + r._urlStr.charAt(h) + r._urlStr.charAt(f) + r._urlStr.charAt(i);
    return d;
}, r.$xx = function(t, e, n, a, o) {
    var o = o || parseInt(+new Date() / 1e3);
    return r.ha(t + e + o + r._Seed + n + "heherand");
}, r.$xxzb = function(t, e, n, a, o) {
    var o = o || parseInt(+new Date() / 1e3);
    return r.ha(e + "tmp123" + t + "#$$&c2*KA" + o);
}, r.$xxf = function(t, e, n, a, o) {
    var o = o || parseInt(+new Date() / 1e3);
    return r.ha(t + "ques" + o + "*&%$(SD!L}" + e + n);
}, r.$xxzbf = function(t, e, n, a, o) {
    var o = o || parseInt(+new Date() / 1e3);
    return r.ha(e + o + "*#016" + t + "zput");
}, module.exports = r;