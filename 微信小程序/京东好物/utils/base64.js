!function() {
    function r(r, t) {
        var e = h.indexOf(r.charAt(t));
        if (-1 === e) throw "Cannot decode base64";
        return e;
    }
    function t(r, t) {
        var e = r.charCodeAt(t);
        if (e > 255) throw "INVALID_CHARACTER_ERR: DOM Exception 5";
        return e;
    }
    var e = {}, n = "=", h = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    e.encode = function(r) {
        if (1 !== arguments.length) throw "SyntaxError: exactly one argument required";
        var e, a, c = [], o = (r = String(r)).length - r.length % 3;
        if (0 === r.length) return r;
        for (e = 0; e < o; e += 3) a = t(r, e) << 16 | t(r, e + 1) << 8 | t(r, e + 2), c.push(h.charAt(a >> 18)), 
        c.push(h.charAt(a >> 12 & 63)), c.push(h.charAt(a >> 6 & 63)), c.push(h.charAt(63 & a));
        switch (r.length - o) {
          case 1:
            a = t(r, e) << 16, c.push(h.charAt(a >> 18) + h.charAt(a >> 12 & 63) + n + n);
            break;

          case 2:
            a = t(r, e) << 16 | t(r, e + 1) << 8, c.push(h.charAt(a >> 18) + h.charAt(a >> 12 & 63) + h.charAt(a >> 6 & 63) + n);
        }
        return c.join("");
    }, e.decode = function(t) {
        var e, h, a = 0, c = t.length, o = [];
        if (t = String(t), 0 === c) return t;
        if (c % 4 != 0) throw "Cannot decode base64";
        for (t.charAt(c - 1) === n && (a = 1, t.charAt(c - 2) === n && (a = 2), c -= 4), 
        e = 0; e < c; e += 4) h = r(t, e) << 18 | r(t, e + 1) << 12 | r(t, e + 2) << 6 | r(t, e + 3), 
        o.push(String.fromCharCode(h >> 16, h >> 8 & 255, 255 & h));
        switch (a) {
          case 1:
            h = r(t, e) << 18 | r(t, e + 1) << 12 | r(t, e + 2) << 6, o.push(String.fromCharCode(h >> 16, h >> 8 & 255));
            break;

          case 2:
            h = r(t, e) << 18 | r(t, e + 1) << 12, o.push(String.fromCharCode(h >> 16));
        }
        return o.join("");
    }, module.exports = e;
}();