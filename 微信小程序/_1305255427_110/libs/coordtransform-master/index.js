var t = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
};

!function(n, a) {
    "function" == typeof define && define.amd ? define([], a) : "object" === ("undefined" == typeof module ? "undefined" : t(module)) && module.exports ? module.exports = a() : n.coordtransform = a();
}(void 0, function() {
    var t = 52.35987755982988, n = 3.141592653589793, a = 6378245, o = .006693421622965943, r = function(t, a) {
        var o = 2 * (t = +t) - 100 + 3 * (a = +a) + .2 * a * a + .1 * t * a + .2 * Math.sqrt(Math.abs(t));
        return o += 2 * (20 * Math.sin(6 * t * n) + 20 * Math.sin(2 * t * n)) / 3, o += 2 * (20 * Math.sin(a * n) + 40 * Math.sin(a / 3 * n)) / 3, 
        o += 2 * (160 * Math.sin(a / 12 * n) + 320 * Math.sin(a * n / 30)) / 3;
    }, e = function(t, a) {
        var o = 300 + (t = +t) + 2 * (a = +a) + .1 * t * t + .1 * t * a + .1 * Math.sqrt(Math.abs(t));
        return o += 2 * (20 * Math.sin(6 * t * n) + 20 * Math.sin(2 * t * n)) / 3, o += 2 * (20 * Math.sin(t * n) + 40 * Math.sin(t / 3 * n)) / 3, 
        o += 2 * (150 * Math.sin(t / 12 * n) + 300 * Math.sin(t / 30 * n)) / 3;
    }, i = function(t, n) {
        var n = +n;
        return !((t = +t) > 73.66 && t < 135.05 && n > 3.86 && n < 53.55);
    };
    return {
        bd09togcj02: function(n, a) {
            var o = (n = +n) - .0065, r = (a = +a) - .006, e = Math.sqrt(o * o + r * r) - 2e-5 * Math.sin(r * t), i = Math.atan2(r, o) - 3e-6 * Math.cos(o * t);
            return [ e * Math.cos(i), e * Math.sin(i) ];
        },
        gcj02tobd09: function(n, a) {
            var a = +a, n = +n, o = Math.sqrt(n * n + a * a) + 2e-5 * Math.sin(a * t), r = Math.atan2(a, n) + 3e-6 * Math.cos(n * t);
            return [ o * Math.cos(r) + .0065, o * Math.sin(r) + .006 ];
        },
        wgs84togcj02: function(t, s) {
            if (i(t = +t, s = +s)) return [ t, s ];
            var h = r(t - 105, s - 35), u = e(t - 105, s - 35), M = s / 180 * n, c = Math.sin(M);
            c = 1 - o * c * c;
            var f = Math.sqrt(c);
            return h = 180 * h / (a * (1 - o) / (c * f) * n), [ t + (u = 180 * u / (a / f * Math.cos(M) * n)), s + h ];
        },
        gcj02towgs84: function(t, s) {
            if (i(t = +t, s = +s)) return [ t, s ];
            var h = r(t - 105, s - 35), u = e(t - 105, s - 35), M = s / 180 * n, c = Math.sin(M);
            c = 1 - o * c * c;
            var f = Math.sqrt(c);
            return h = 180 * h / (a * (1 - o) / (c * f) * n), [ 2 * t - (t + (u = 180 * u / (a / f * Math.cos(M) * n))), 2 * s - (s + h) ];
        }
    };
});