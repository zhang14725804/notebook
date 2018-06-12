function e(e) {
    if (0 === e.length) return [];
    if (1 === e.length) return [ e.charCodeAt(0) ];
    for (var t = [], n = 0; n < e.length; ++n) t[t.length] = e.charCodeAt(n);
    return t;
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.parse = function(r, i, l) {
    var f = {};
    if ("string" != typeof r || 0 === r.length) return f;
    for (var s = i ? e(i + "") : t, c = l ? e(l + "") : n, o = s.length, h = c.length, a = [], g = 0, u = 0, v = 0, p = "", d = "", x = 0; x < r.length; ++x) {
        var A = r.charCodeAt(x);
        if (A === s[u]) {
            if (++u === o) {
                var C = x - u + 1;
                if (v < h) {
                    if (!(g < C)) {
                        g = x + 1, u = v = 0;
                        continue;
                    }
                    p += r.slice(g, C);
                } else g < C && (d += r.slice(g, C));
                if (-1 === a.indexOf(p)) f[p] = d, a[a.length] = p; else {
                    var O = f[p];
                    O.pop ? O[O.length] = d : f[p] = [ O, d ];
                }
                p = d = "", g = x + 1, u = v = 0;
            }
        } else {
            if (u = 0, v < h) {
                if (A === c[v]) {
                    if (++v === h) {
                        var y = x - v + 1;
                        g < y && (p += r.slice(g, y)), g = x + 1;
                    }
                    continue;
                }
                if (v = 0, 43 === A) {
                    g < x && (p += r.slice(g, x)), p += " ", g = x + 1;
                    continue;
                }
            }
            43 === A && (g < x && (d += r.slice(g, x)), d += " ", g = x + 1);
        }
    }
    if (g < r.length) v < h ? p += r.slice(g) : u < o && (d += r.slice(g)); else if (0 === v) return f;
    if (-1 === a.indexOf(p)) f[p] = d, a[a.length] = p; else {
        var _ = f[p];
        _.pop ? _[_.length] = d : f[p] = [ _, d ];
    }
    return f;
};

var t = [ 38 ], n = [ 61 ];