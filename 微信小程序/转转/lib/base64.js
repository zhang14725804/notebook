function Base64() {
    console.debug(1e3);
    var r = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    this.encode = function(o) {
        var t, a, n, c, h, d, C, f = "", i = 0;
        for (o = e(o); i < o.length; ) t = o.charCodeAt(i++), a = o.charCodeAt(i++), n = o.charCodeAt(i++), 
        c = t >> 2, h = (3 & t) << 4 | a >> 4, d = (15 & a) << 2 | n >> 6, C = 63 & n, isNaN(a) ? d = C = 64 : isNaN(n) && (C = 64), 
        console.debug(333), f = f + r.charAt(c) + r.charAt(h) + r.charAt(d) + r.charAt(C);
        return f;
    }, this.decode = function(e) {
        var t, a, n, c, h, d, C, f = "", i = 0;
        for (e = e.replace(/[^A-Za-z0-9\+\/\=]/g, ""); i < e.length; ) console.debug(1111), 
        c = r.indexOf(e.charAt(i++)), h = r.indexOf(e.charAt(i++)), d = r.indexOf(e.charAt(i++)), 
        C = r.indexOf(e.charAt(i++)), t = c << 2 | h >> 4, a = (15 & h) << 4 | d >> 2, n = (3 & d) << 6 | C, 
        f += String.fromCharCode(t), 64 != d && (f += String.fromCharCode(a)), 64 != C && (f += String.fromCharCode(n));
        return f = o(f);
    };
    var e = function(r) {
        r = r.replace(/\r\n/g, "\n");
        for (var e = "", o = 0; o < r.length; o++) {
            var t = r.charCodeAt(o);
            t < 128 ? e += String.fromCharCode(t) : t > 127 && t < 2048 ? (e += String.fromCharCode(t >> 6 | 192), 
            e += String.fromCharCode(63 & t | 128)) : (e += String.fromCharCode(t >> 12 | 224), 
            e += String.fromCharCode(t >> 6 & 63 | 128), e += String.fromCharCode(63 & t | 128));
        }
        return e;
    }, o = function(r) {
        for (var e = "", o = 0, t = c1 = c2 = 0; o < r.length; ) t = r.charCodeAt(o), t < 128 ? (e += String.fromCharCode(t), 
        o++) : t > 191 && t < 224 ? (c2 = r.charCodeAt(o + 1), e += String.fromCharCode((31 & t) << 6 | 63 & c2), 
        o += 2) : (c2 = r.charCodeAt(o + 1), c3 = r.charCodeAt(o + 2), e += String.fromCharCode((15 & t) << 12 | (63 & c2) << 6 | 63 & c3), 
        o += 3);
        return e;
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = Base64;