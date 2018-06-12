(function() {
    function a(a) {
        return a && a.__esModule ? a : {
            default: a
        };
    }
    function b(a, b) {
        return a && a.hasOwnProperty && a.hasOwnProperty(b);
    }
    var c, d = require("../../utils/ppdog"), e = a(d), f = require("../../utils/regenerator-runtime"), g = a(f), h = {
        type: function(a) {
            if (null === a) return "null";
            if (a === c) return "undefined";
            var b = /\[object (\w+)\]/.exec(Object.prototype.toString.call(a));
            return b ? b[1].toLowerCase() : "";
        },
        bind: function(a, b) {
            return a.bind ? a.bind(b) : function() {
                return a.apply(b, arguments);
            };
        },
        extend: function(a) {
            if ("object" != h.type(a) && "function" != h.type(a)) return a;
            for (var c, d, e = 1, f = arguments.length; e < f; e++) for (d in c = arguments[e], 
            c) b(c, d) && (a[d] = c[d]);
            return a;
        },
        forEach: function(a, b) {
            if (a.forEach) return a.forEach(b);
            for (var c = a.length, d = 0; d < c; d++) b(a[d], d);
            return a;
        },
        objEach: function(a, c) {
            if (a) for (var d in a) if (b(a, d) && !1 === c(d, a[d])) break;
        },
        nextTick: function() {
            var a;
            return a = "function" == typeof requestAnimationFrame ? function() {
                requestAnimationFrame.apply(window, arguments);
            } : function() {
                setTimeout.apply(window, arguments);
            }, a;
        }(),
        lock: function(a) {
            var b;
            return function() {
                if (!b) {
                    b = !0;
                    var c = [].slice.call(arguments, 0);
                    return c.unshift(function() {
                        b = !1;
                    }), a.apply(this, c);
                }
            };
        },
        queue: function(a, b) {
            function c() {
                var a = d.shift();
                if (!a) return void (e = b);
                e--;
                var f = a[0], g = a[1], i = a[2];
                i.unshift(function() {
                    e++, c.apply(this, arguments);
                }), h.nextTick(function() {
                    return f.apply(g, i);
                });
            }
            b = b || 1;
            var d = [], e = b;
            return function() {
                return d.push([ a, this, [].slice.call(arguments, 0) ]), e ? c() : void 0;
            };
        },
        delegator: function(a) {
            var b, c = [];
            return function(d) {
                return b ? c.push(d) : void (b = !0, a.call(this, function() {
                    b = !1;
                    var a = this, e = arguments;
                    d && d.apply(a, e), h.forEach(c, function(b) {
                        b && b.apply(a, e);
                    });
                }));
            };
        },
        once: function(a) {
            var b, c = arguments;
            return function() {
                if (!b && a) return b = !0, a.apply(2 <= c.length ? c[1] : null, arguments);
            };
        },
        queryParse: function(a, b) {
            if (!a) return {};
            b = b || "&";
            var c = a.replace(/^\?/, ""), d = {}, e = c ? c.split(b) : null;
            return e && 0 < e.length && e.forEach(function(a) {
                a = a.split("=");
                var b = a.splice(0, 1), c = a.join("=");
                d[b] = c;
            }), d;
        },
        queryJoin: function(a, b, c) {
            var d = h.queryStringify(b, "&", c);
            if (!d) return a;
            var e;
            return e = /[\?&]$/.test(a) ? "" : ~a.indexOf("?") ? "&" : "?", a + e + d;
        },
        queryStringify: function(a, b, c) {
            return a ? Object.keys(a).map(function(b) {
                var d = a[b];
                return b + "=" + (c ? d : encodeURIComponent(d));
            }).join(b || "&") : "";
        },
        hltext: function(a) {
            var b = "_hlspliter_", c = [], d = [], e = 1, f = a.replace(/\u0005(.*?)\u0006/g, function(a, d) {
                return c.push({
                    id: e++,
                    w: d,
                    hl: !0
                }), b;
            });
            return f.split(b).forEach(function(a) {
                d.push({
                    id: e++,
                    w: a,
                    hl: !1
                }), c.length && d.push(c.shift());
            }), d = d.reduce(function(a, b) {
                return b.w && a.push(b), a;
            }, []), {
                raw: a,
                text: d.map(function(a) {
                    return a.w;
                }).join(""),
                parts: d
            };
        }
    };
    module.exports = h;
})();