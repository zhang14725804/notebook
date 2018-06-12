function hex_sha1(r) {
    return binb2hex(core_sha1(str2binb(r), r.length * chrsz));
}

function b64_sha1(r) {
    return binb2b64(core_sha1(str2binb(r), r.length * chrsz));
}

function str_sha1(r) {
    return binb2str(core_sha1(str2binb(r), r.length * chrsz));
}

function hex_hmac_sha1(r, a) {
    return binb2hex(core_hmac_sha1(r, a));
}

function b64_hmac_sha1(r, a) {
    return binb2b64(core_hmac_sha1(r, a));
}

function str_hmac_sha1(r, a) {
    return binb2str(core_hmac_sha1(r, a));
}

function sha1_vm_test() {
    return "a9993e364706816aba3e25717850c26c9cd0d89d" == hex_sha1("abc");
}

function core_sha1(r, a) {
    r[a >> 5] |= 128 << 24 - a % 32, r[15 + (a + 64 >> 9 << 4)] = a;
    for (var h = Array(80), e = 1732584193, s = -271733879, t = -1732584194, n = 271733878, c = -1009589776, _ = 0; _ < r.length; _ += 16) {
        for (var o = e, b = s, f = t, u = n, i = c, d = 0; d < 80; d++) {
            h[d] = d < 16 ? r[_ + d] : rol(h[d - 3] ^ h[d - 8] ^ h[d - 14] ^ h[d - 16], 1);
            var x = safe_add(safe_add(rol(e, 5), sha1_ft(d, s, t, n)), safe_add(safe_add(c, h[d]), sha1_kt(d)));
            c = n, n = t, t = rol(s, 30), s = e, e = x;
        }
        e = safe_add(e, o), s = safe_add(s, b), t = safe_add(t, f), n = safe_add(n, u), 
        c = safe_add(c, i);
    }
    return Array(e, s, t, n, c);
}

function sha1_ft(r, a, h, e) {
    return r < 20 ? a & h | ~a & e : r < 40 ? a ^ h ^ e : r < 60 ? a & h | a & e | h & e : a ^ h ^ e;
}

function sha1_kt(r) {
    return r < 20 ? 1518500249 : r < 40 ? 1859775393 : r < 60 ? -1894007588 : -899497514;
}

function core_hmac_sha1(r, a) {
    var h = str2binb(r);
    h.length > 16 && (h = core_sha1(h, r.length * chrsz));
    for (var e = Array(16), s = Array(16), t = 0; t < 16; t++) e[t] = 909522486 ^ h[t], 
    s[t] = 1549556828 ^ h[t];
    var n = core_sha1(e.concat(str2binb(a)), 512 + a.length * chrsz);
    return core_sha1(s.concat(n), 672);
}

function safe_add(r, a) {
    var h = (65535 & r) + (65535 & a);
    return (r >> 16) + (a >> 16) + (h >> 16) << 16 | 65535 & h;
}

function rol(r, a) {
    return r << a | r >>> 32 - a;
}

function str2binb(r) {
    for (var a = Array(), h = (1 << chrsz) - 1, e = 0; e < r.length * chrsz; e += chrsz) a[e >> 5] |= (r.charCodeAt(e / chrsz) & h) << 24 - e % 32;
    return a;
}

function binb2str(r) {
    for (var a = "", h = (1 << chrsz) - 1, e = 0; e < 32 * r.length; e += chrsz) a += String.fromCharCode(r[e >> 5] >>> 24 - e % 32 & h);
    return a;
}

function binb2hex(r) {
    for (var a = hexcase ? "0123456789ABCDEF" : "0123456789abcdef", h = "", e = 0; e < 4 * r.length; e++) h += a.charAt(r[e >> 2] >> 8 * (3 - e % 4) + 4 & 15) + a.charAt(r[e >> 2] >> 8 * (3 - e % 4) & 15);
    return h;
}

function binb2b64(r) {
    for (var a = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", h = "", e = 0; e < 4 * r.length; e += 3) for (var s = (r[e >> 2] >> 8 * (3 - e % 4) & 255) << 16 | (r[e + 1 >> 2] >> 8 * (3 - (e + 1) % 4) & 255) << 8 | r[e + 2 >> 2] >> 8 * (3 - (e + 2) % 4) & 255, t = 0; t < 4; t++) 8 * e + 6 * t > 32 * r.length ? h += b64pad : h += a.charAt(s >> 6 * (3 - t) & 63);
    return h;
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var hexcase = 0, b64pad = "", chrsz = 8;

exports.hex_sha1 = hex_sha1, exports.b64_sha1 = b64_sha1, exports.str_sha1 = str_sha1, 
exports.hex_hmac_sha1 = hex_hmac_sha1, exports.b64_hmac_sha1 = b64_hmac_sha1, exports.str_hmac_sha1 = str_hmac_sha1;