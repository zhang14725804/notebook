var r = new Array(-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1), e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

module.exports = {
    base64encode: function(r) {
        var a, t, h, o, c, d;
        for (h = r.length, t = 0, a = ""; t < h; ) {
            if (o = 255 & r.charCodeAt(t++), t == h) {
                a += e.charAt(o >> 2), a += e.charAt((3 & o) << 4), a += "==";
                break;
            }
            if (c = r.charCodeAt(t++), t == h) {
                a += e.charAt(o >> 2), a += e.charAt((3 & o) << 4 | (240 & c) >> 4), a += e.charAt((15 & c) << 2), 
                a += "=";
                break;
            }
            d = r.charCodeAt(t++), a += e.charAt(o >> 2), a += e.charAt((3 & o) << 4 | (240 & c) >> 4), 
            a += e.charAt((15 & c) << 2 | (192 & d) >> 6), a += e.charAt(63 & d);
        }
        return a;
    },
    base64decode: function(e) {
        var a, t, h, o, c, d, i;
        for (d = e.length, c = 0, i = ""; c < d; ) {
            do {
                a = r[255 & e.charCodeAt(c++)];
            } while (c < d && -1 == a);
            if (-1 == a) break;
            do {
                t = r[255 & e.charCodeAt(c++)];
            } while (c < d && -1 == t);
            if (-1 == t) break;
            i += String.fromCharCode(a << 2 | (48 & t) >> 4);
            do {
                if (61 == (h = 255 & e.charCodeAt(c++))) return i;
                h = r[h];
            } while (c < d && -1 == h);
            if (-1 == h) break;
            i += String.fromCharCode((15 & t) << 4 | (60 & h) >> 2);
            do {
                if (61 == (o = 255 & e.charCodeAt(c++))) return i;
                o = r[o];
            } while (c < d && -1 == o);
            if (-1 == o) break;
            i += String.fromCharCode((3 & h) << 6 | o);
        }
        return i;
    }
};