Object.defineProperty(exports, "__esModule", {
    value: !0
});

var _slicedToArray = function() {
    function e(e, t) {
        var r = [], o = !0, i = !1, a = void 0;
        try {
            for (var l, n = e[Symbol.iterator](); !(o = (l = n.next()).done) && (r.push(l.value), 
            !t || r.length !== t); o = !0) ;
        } catch (e) {
            i = !0, a = e;
        } finally {
            try {
                !o && n.return && n.return();
            } finally {
                if (i) throw a;
            }
        }
        return r;
    }
    return function(t, r) {
        if (Array.isArray(t)) return t;
        if (Symbol.iterator in Object(t)) return e(t, r);
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
    };
}();

exports.default = {
    aspectFill: function(e) {
        var t = e.ctx, r = e.picFile, o = e.picInfo, i = e.x, a = e.y, l = e.w, n = e.h, f = e.bgColor, c = void 0 === f ? "#ffffff" : f, s = o.width / o.height, u = 0, v = 0, h = 0, y = 0, d = [];
        s < l / n ? (h = l, y = h / s, u = i, v = a - (y - n) / 2, d = [ [ u - 1, v - 1, h + 2, (y - n) / 2 + 1 ], [ u - 1, v + (y - n) / 2 + n, h + 2, (y - n) / 2 + 1 ] ]) : (y = n, 
        h = y * s, u = i - (h - l) / 2, v = a, d = [ [ u - 1, v - 1, (h - l) / 2 + 1, y + 2 ], [ u + (h - l) / 2 + l, v - 1, (h - l) / 2 + 1, y + 2 ] ]), 
        t.drawImage(r, u, v, h, y), t.save(), t.setFillStyle(c);
        var T = !0, g = !1, b = void 0;
        try {
            for (var x, p = d[Symbol.iterator](); !(T = (x = p.next()).done); T = !0) {
                var P = x.value, S = _slicedToArray(P, 4), m = S[0], w = S[1], A = S[2], C = S[3];
                m + A <= 0 || w + C <= 0 || (m < 0 && (A -= Math.abs(m), m = 0), w < 0 && (C -= Math.abs(w), 
                w = 0), t.fillRect(m, w, A, C));
            }
        } catch (e) {
            g = !0, b = e;
        } finally {
            try {
                !T && p.return && p.return();
            } finally {
                if (g) throw b;
            }
        }
        t.restore();
    },
    rounded: function(e) {
        var t = e.ctx, r = e.x, o = e.y, i = e.w, a = e.bgColor, l = void 0 === a ? "#ffffff" : a;
        t.save(), t.translate(r, o), t.beginPath(), t.moveTo(i, i / 2), t.arc(i / 2, i / 2, i / 2, 0, 2 * Math.PI, !1), 
        t.lineTo(i, 0), t.lineTo(0, 0), t.lineTo(0, i), t.lineTo(i, i), t.closePath(), t.setFillStyle(l), 
        t.fill(), t.restore();
    },
    borderRadius: function(e) {
        var t = e.ctx, r = e.x, o = e.y, i = e.w, a = e.h, l = e.radius, n = e.bgColor, f = void 0 === n ? "#ffffff" : n;
        t.save(), t.translate(r, o), t.setFillStyle(f), t.beginPath(), t.moveTo(0, 0 + l), 
        t.quadraticCurveTo(0, 0, 0 + l, 0), t.lineTo(0, 0), t.closePath(), t.fill(), t.beginPath(), 
        t.moveTo(i - l, 0), t.quadraticCurveTo(i, 0, i, l), t.lineTo(i, 0), t.closePath(), 
        t.fill(), t.beginPath(), t.moveTo(i - l, a), t.quadraticCurveTo(i, a, i, a - l), 
        t.lineTo(i, a), t.closePath(), t.fill(), t.beginPath(), t.moveTo(0, a - l), t.quadraticCurveTo(0, a, 0 + l, a), 
        t.lineTo(0, a), t.closePath(), t.fill(), t.restore();
    },
    fillText: function(e, t) {
        var r = t.text, o = t.x, i = t.y, a = t.fontSize, l = t.color, n = t.lineHeight, f = t.textAlign;
        e.save(), n = n || a, a && e.setFontSize(a), l && e.setFillStyle(l), f && e.setTextAlign(f);
        var c = r.split("\n"), s = !0, u = !1, v = void 0;
        try {
            for (var h, y = c[Symbol.iterator](); !(s = (h = y.next()).done); s = !0) {
                var d = h.value;
                e.fillText(d, o, i + n - (n - a) / 2), i += n;
            }
        } catch (e) {
            u = !0, v = e;
        } finally {
            try {
                !s && y.return && y.return();
            } finally {
                if (u) throw v;
            }
        }
        e.restore();
    },
    ellipsisStr: function(e, t) {
        var r = !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2], o = 0, i = 0, a = new String();
        i = e.length;
        for (var l = 0; l < i; l++) {
            var n = e.charAt(l);
            if (o++, escape(n).length > 4 && o++, a = a.concat(n), o >= t) return a = a.concat(r && (o > t || l + 1 < i) ? "..." : "");
        }
        if (o < t) return e;
    },
    strLenGraphic: function(e) {
        for (var t = 0, r = 0; r < e.length; r++) {
            var o = e.charAt(r);
            t++, escape(o).length > 4 && t++;
        }
        return t;
    }
};