function n(n, r) {
    var t = (65535 & n) + (65535 & r);
    return (n >> 16) + (r >> 16) + (t >> 16) << 16 | 65535 & t;
}

function r(n, r) {
    return n << r | n >>> 32 - r;
}

function t(t, e, u, o, c, f) {
    return n(r(n(n(e, t), n(o, f)), c), u);
}

function e(n, r, e, u, o, c, f) {
    return t(r & e | ~r & u, n, r, o, c, f);
}

function u(n, r, e, u, o, c, f) {
    return t(r & u | e & ~u, n, r, o, c, f);
}

function o(n, r, e, u, o, c, f) {
    return t(r ^ e ^ u, n, r, o, c, f);
}

function c(n, r, e, u, o, c, f) {
    return t(e ^ (r | ~u), n, r, o, c, f);
}

function f(r, t) {
    r[t >> 5] |= 128 << t % 32, r[14 + (t + 64 >>> 9 << 4)] = t;
    var f, i, a, h, d, g = 1732584193, l = -271733879, v = -1732584194, s = 271733878;
    for (f = 0; f < r.length; f += 16) i = g, a = l, h = v, d = s, l = c(l = c(l = c(l = c(l = o(l = o(l = o(l = o(l = u(l = u(l = u(l = u(l = e(l = e(l = e(l = e(l, v = e(v, s = e(s, g = e(g, l, v, s, r[f], 7, -680876936), l, v, r[f + 1], 12, -389564586), g, l, r[f + 2], 17, 606105819), s, g, r[f + 3], 22, -1044525330), v = e(v, s = e(s, g = e(g, l, v, s, r[f + 4], 7, -176418897), l, v, r[f + 5], 12, 1200080426), g, l, r[f + 6], 17, -1473231341), s, g, r[f + 7], 22, -45705983), v = e(v, s = e(s, g = e(g, l, v, s, r[f + 8], 7, 1770035416), l, v, r[f + 9], 12, -1958414417), g, l, r[f + 10], 17, -42063), s, g, r[f + 11], 22, -1990404162), v = e(v, s = e(s, g = e(g, l, v, s, r[f + 12], 7, 1804603682), l, v, r[f + 13], 12, -40341101), g, l, r[f + 14], 17, -1502002290), s, g, r[f + 15], 22, 1236535329), v = u(v, s = u(s, g = u(g, l, v, s, r[f + 1], 5, -165796510), l, v, r[f + 6], 9, -1069501632), g, l, r[f + 11], 14, 643717713), s, g, r[f], 20, -373897302), v = u(v, s = u(s, g = u(g, l, v, s, r[f + 5], 5, -701558691), l, v, r[f + 10], 9, 38016083), g, l, r[f + 15], 14, -660478335), s, g, r[f + 4], 20, -405537848), v = u(v, s = u(s, g = u(g, l, v, s, r[f + 9], 5, 568446438), l, v, r[f + 14], 9, -1019803690), g, l, r[f + 3], 14, -187363961), s, g, r[f + 8], 20, 1163531501), v = u(v, s = u(s, g = u(g, l, v, s, r[f + 13], 5, -1444681467), l, v, r[f + 2], 9, -51403784), g, l, r[f + 7], 14, 1735328473), s, g, r[f + 12], 20, -1926607734), v = o(v, s = o(s, g = o(g, l, v, s, r[f + 5], 4, -378558), l, v, r[f + 8], 11, -2022574463), g, l, r[f + 11], 16, 1839030562), s, g, r[f + 14], 23, -35309556), v = o(v, s = o(s, g = o(g, l, v, s, r[f + 1], 4, -1530992060), l, v, r[f + 4], 11, 1272893353), g, l, r[f + 7], 16, -155497632), s, g, r[f + 10], 23, -1094730640), v = o(v, s = o(s, g = o(g, l, v, s, r[f + 13], 4, 681279174), l, v, r[f], 11, -358537222), g, l, r[f + 3], 16, -722521979), s, g, r[f + 6], 23, 76029189), v = o(v, s = o(s, g = o(g, l, v, s, r[f + 9], 4, -640364487), l, v, r[f + 12], 11, -421815835), g, l, r[f + 15], 16, 530742520), s, g, r[f + 2], 23, -995338651), v = c(v, s = c(s, g = c(g, l, v, s, r[f], 6, -198630844), l, v, r[f + 7], 10, 1126891415), g, l, r[f + 14], 15, -1416354905), s, g, r[f + 5], 21, -57434055), v = c(v, s = c(s, g = c(g, l, v, s, r[f + 12], 6, 1700485571), l, v, r[f + 3], 10, -1894986606), g, l, r[f + 10], 15, -1051523), s, g, r[f + 1], 21, -2054922799), v = c(v, s = c(s, g = c(g, l, v, s, r[f + 8], 6, 1873313359), l, v, r[f + 15], 10, -30611744), g, l, r[f + 6], 15, -1560198380), s, g, r[f + 13], 21, 1309151649), v = c(v, s = c(s, g = c(g, l, v, s, r[f + 4], 6, -145523070), l, v, r[f + 11], 10, -1120210379), g, l, r[f + 2], 15, 718787259), s, g, r[f + 9], 21, -343485551), 
    g = n(g, i), l = n(l, a), v = n(v, h), s = n(s, d);
    return [ g, l, v, s ];
}

function i(n) {
    var r, t = "", e = 32 * n.length;
    for (r = 0; r < e; r += 8) t += String.fromCharCode(n[r >> 5] >>> r % 32 & 255);
    return t;
}

function a(n) {
    var r, t = [];
    for (t[(n.length >> 2) - 1] = void 0, r = 0; r < t.length; r += 1) t[r] = 0;
    var e = 8 * n.length;
    for (r = 0; r < e; r += 8) t[r >> 5] |= (255 & n.charCodeAt(r / 8)) << r % 32;
    return t;
}

function h(n) {
    return i(f(a(n), 8 * n.length));
}

function d(n) {
    var r, t, e = "";
    for (t = 0; t < n.length; t += 1) r = n.charCodeAt(t), e += "0123456789abcdef".charAt(r >>> 4 & 15) + "0123456789abcdef".charAt(15 & r);
    return e;
}

function g(n) {
    return unescape(encodeURIComponent(n));
}

function l(n) {
    return h(g(n));
}

function v(n) {
    return d(l(n));
}

module.exports = {
    rstrMD5: h,
    rawMD5: l,
    hexMD5: v
};