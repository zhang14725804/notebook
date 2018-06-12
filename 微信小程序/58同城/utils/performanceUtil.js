module.exports = {
    debounce: function(t, n, e) {
        function i() {
            o(), clearTimeout(s), s = setTimeout(function() {
                u = !1;
            }, c);
        }
        function o() {
            c = t;
            var n = Date.now();
            c = n - r < t ? t - (n - r) : 0;
        }
        e = Object.assign({
            firstRun: !1,
            lastRun: !0
        }, e);
        var u = !1, r = Date.now(), a = void 0, c = void 0, s = void 0, f = function() {
            var s = void 0;
            o();
            var f = this, v = arguments;
            return clearTimeout(a), new Promise(function(o) {
                function l() {
                    u = !0;
                    var t = n.apply(f, v);
                    r = Date.now(), i(), o(t);
                }
                !u && e.firstRun ? s = l() : (r = Date.now(), u = !0, a = setTimeout(function() {
                    s = l();
                }, e.lastRun ? t : c));
            });
        };
        return f.optimized = !0, f;
    },
    throttle: function(t, n) {
        var e = 0, i = function() {
            var i = this, o = arguments, u = null, r = new Date();
            return new Promise(function(a) {
                r - e > t && (u = n.apply(i, o), e = r), a(u);
            });
        };
        return i.optimized = !0, i;
    }
};