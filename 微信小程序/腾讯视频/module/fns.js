function n(n, t) {
    return n && n.hasOwnProperty && n.hasOwnProperty(t);
}

var t = {
    type: function(n) {
        if (null === n) return "null";
        if (void 0 === n) return "undefined";
        var t = /\[object (\w+)\]/.exec(Object.prototype.toString.call(n));
        return t ? t[1].toLowerCase() : "";
    },
    bind: function(n, t) {
        return n.bind ? n.bind(t) : function() {
            return n.apply(t, arguments);
        };
    },
    extend: function(r) {
        if ("object" != t.type(r) && "function" != t.type(r)) return r;
        for (var e, i, u = 1, o = arguments.length; u < o; u++) {
            e = arguments[u];
            for (i in e) n(e, i) && (r[i] = e[i]);
        }
        return r;
    },
    forEach: function(n, t) {
        if (n.forEach) return n.forEach(t);
        for (var r = n.length, e = 0; e < r; e++) t(n[e], e);
        return n;
    },
    objEach: function(t, r) {
        if (t) for (var e in t) if (n(t, e) && !1 === r(e, t[e])) break;
    },
    nextTick: "function" == typeof requestAnimationFrame ? function() {
        requestAnimationFrame.apply(window, arguments);
    } : function() {
        setTimeout.apply(window, arguments);
    },
    lock: function(n) {
        var t;
        return function() {
            if (!t) {
                t = !0;
                var r = [].slice.call(arguments, 0);
                return r.unshift(function() {
                    t = !1;
                }), n.apply(this, r);
            }
        };
    },
    queue: function(n, r) {
        function e() {
            var n = i.shift();
            if (n) {
                u--;
                var o = n[0], f = n[1], c = n[2];
                c.unshift(function() {
                    u++, e.apply(this, arguments);
                }), t.nextTick(function() {
                    return o.apply(f, c);
                });
            } else u = r;
        }
        var i = [], u = r = r || 1;
        return function() {
            if (i.push([ n, this, [].slice.call(arguments, 0) ]), u) return e();
        };
    },
    delegator: function(n) {
        var r, e = [];
        return function(i) {
            if (r) return e.push(i);
            r = !0, n.call(this, function() {
                r = !1;
                var n = this, u = arguments;
                i && i.apply(n, u);
                var o = e;
                e = [], t.forEach(o, function(t) {
                    t && t.apply(n, u);
                });
            });
        };
    },
    once: function(n) {
        var t, r = arguments;
        return function() {
            if (!t && n) return t = !0, n.apply(r.length >= 2 ? r[1] : null, arguments);
        };
    },
    queryParse: function(n, t) {
        if (!n) return {};
        t = t || "&";
        var r = n.replace(/^\?/, ""), e = {}, i = r ? r.split(t) : null;
        return i && i.length > 0 && i.forEach(function(n) {
            var t = (n = n.split("=")).splice(0, 1), r = n.join("=");
            e[t] = r;
        }), e;
    },
    queryJoin: function(n, r, e) {
        var i = t.queryStringify(r, "&", e);
        if (!i) return n;
        var u;
        return u = /[\?&]$/.test(n) ? "" : ~n.indexOf("?") ? "&" : "?", n + u + i;
    },
    queryStringify: function(n, t, r) {
        return n ? Object.keys(n).map(function(t) {
            var e = n[t];
            return t + "=" + (r ? e : encodeURIComponent(e));
        }).join(t || "&") : "";
    },
    hltext: function(n) {
        var t = [], r = [], e = 1;
        return n.replace(/\u0005(.*?)\u0006/g, function(n, r) {
            return t.push({
                id: e++,
                w: r,
                hl: !0
            }), "_hlspliter_";
        }).split("_hlspliter_").forEach(function(n) {
            r.push({
                id: e++,
                w: n,
                hl: !1
            }), t.length && r.push(t.shift());
        }), r = r.reduce(function(n, t) {
            return t.w && n.push(t), n;
        }, []), {
            raw: n,
            text: r.map(function(n) {
                return n.w;
            }).join(""),
            parts: r
        };
    }
};

module.exports = t;