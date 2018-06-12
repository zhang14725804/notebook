var r = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", t = function() {
    for (var t = {}, e = 0, n = r.length; e < n; e++) t[r.charAt(e)] = e;
    return t;
}(), e = String.fromCharCode, n = function(r) {
    if (r.length < 2) {
        var t = r.charCodeAt(0);
        return t < 128 ? r : t < 2048 ? e(192 | t >>> 6) + e(128 | 63 & t) : e(224 | t >>> 12 & 15) + e(128 | t >>> 6 & 63) + e(128 | 63 & t);
    }
    var n = 65536 + 1024 * (r.charCodeAt(0) - 55296) + (r.charCodeAt(1) - 56320);
    return e(240 | n >>> 18 & 7) + e(128 | n >>> 12 & 63) + e(128 | n >>> 6 & 63) + e(128 | 63 & n);
}, c = /[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g, a = function(r) {
    return r.replace(c, n);
}, o = function(t) {
    var e = [ 0, 2, 1 ][t.length % 3], n = t.charCodeAt(0) << 16 | (t.length > 1 ? t.charCodeAt(1) : 0) << 8 | (t.length > 2 ? t.charCodeAt(2) : 0);
    return [ r.charAt(n >>> 18), r.charAt(n >>> 12 & 63), e >= 2 ? "=" : r.charAt(n >>> 6 & 63), e >= 1 ? "=" : r.charAt(63 & n) ].join("");
}, u = function(r) {
    return r.replace(/[\s\S]{1,3}/g, o);
}, h = function(r) {
    return u(a(r));
}, i = function(r, t) {
    return t ? h(String(r)).replace(/[+\/]/g, function(r) {
        return "+" == r ? "-" : "_";
    }).replace(/=/g, "") : h(String(r));
}, A = new RegExp([ "[À-ß][-¿]", "[à-ï][-¿]{2}", "[ð-÷][-¿]{3}" ].join("|"), "g"), d = function(r) {
    switch (r.length) {
      case 4:
        var t = ((7 & r.charCodeAt(0)) << 18 | (63 & r.charCodeAt(1)) << 12 | (63 & r.charCodeAt(2)) << 6 | 63 & r.charCodeAt(3)) - 65536;
        return e(55296 + (t >>> 10)) + e(56320 + (1023 & t));

      case 3:
        return e((15 & r.charCodeAt(0)) << 12 | (63 & r.charCodeAt(1)) << 6 | 63 & r.charCodeAt(2));

      default:
        return e((31 & r.charCodeAt(0)) << 6 | 63 & r.charCodeAt(1));
    }
}, f = function(r) {
    return r.replace(A, d);
}, g = function(r) {
    var n = r.length, c = n % 4, a = (n > 0 ? t[r.charAt(0)] << 18 : 0) | (n > 1 ? t[r.charAt(1)] << 12 : 0) | (n > 2 ? t[r.charAt(2)] << 6 : 0) | (n > 3 ? t[r.charAt(3)] : 0), o = [ e(a >>> 16), e(a >>> 8 & 255), e(255 & a) ];
    return o.length -= [ 0, 0, 2, 1 ][c], o.join("");
}, l = function(r) {
    return r.replace(/[\s\S]{1,4}/g, g);
}, C = function(r) {
    return f(l(r));
}, p = function(r) {
    return C(String(r).replace(/[-_]/g, function(r) {
        return "-" == r ? "+" : "/";
    }).replace(/[^A-Za-z0-9\+\/]/g, ""));
};

module.exports = {
    fromBase64: p,
    toBase64: i,
    encode: i,
    encodeURI: function(r) {
        return i(r, !0);
    },
    decode: p
};