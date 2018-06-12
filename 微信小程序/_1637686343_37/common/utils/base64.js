Object.defineProperty(exports, "__esModule", {
    value: !0
});

var r = function(r) {
    this.message = r;
};

(r.prototype = new Error()).name = "InvalidCharacterError";

var t = function(t) {
    throw new r(t);
}, e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", a = /[\t\n\f\r ]/g;

exports.default = {
    encode: function(r) {
        r = String(r), /[^\0-\xFF]/.test(r) && t("The string to be encoded contains characters outside of the Latin1 range.");
        for (var a, c = r.length % 3, n = "", o = -1, h = r.length - c; ++o < h; ) a = (r.charCodeAt(o) << 16) + (r.charCodeAt(++o) << 8) + r.charCodeAt(++o), 
        n += e.charAt(a >> 18 & 63) + e.charAt(a >> 12 & 63) + e.charAt(a >> 6 & 63) + e.charAt(63 & a);
        return 2 == c ? (a = (r.charCodeAt(o) << 8) + r.charCodeAt(++o), n += e.charAt(a >> 10) + e.charAt(a >> 4 & 63) + e.charAt(a << 2 & 63) + "=") : 1 == c && (a = r.charCodeAt(o), 
        n += e.charAt(a >> 2) + e.charAt(a << 4 & 63) + "=="), n;
    },
    decode: function(r) {
        var c = (r = String(r).replace(a, "")).length;
        c % 4 == 0 && (c = (r = r.replace(/==?$/, "")).length), (c % 4 == 1 || /[^+a-zA-Z0-9/]/.test(r)) && t("Invalid character: the string to be decoded is not correctly encoded.");
        for (var n, o, h = 0, d = "", i = -1; ++i < c; ) o = e.indexOf(r.charAt(i)), n = h % 4 ? 64 * n + o : o, 
        h++ % 4 && (d += String.fromCharCode(255 & n >> (-2 * h & 6)));
        return d;
    }
};