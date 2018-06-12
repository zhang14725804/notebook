function n() {
    this.handlers = {};
}

n.prototype = {
    clear: function() {
        this.handlers = {};
    },
    has: function(n) {
        return this.handlers[n] && this.handlers[n].length > 0;
    },
    on: function(n, r) {
        var t = this;
        return [].concat(n).forEach(function(n) {
            (t.handlers[n] = t.handlers[n] || []).push(r), t.emit("__event-on-" + n, r);
        }), this;
    },
    first: function(n, r) {
        var t = this;
        return [].concat(n).forEach(function(n) {
            t.off(n).on(n, r);
        }), this;
    },
    offOn: function(n, r) {
        return this.off(n, r).on(n, r);
    },
    offOnce: function(n, r) {
        return this.off(n, r).once(n, r);
    },
    once: function(n, r) {
        var t = this;
        return [].concat(n).forEach(function(n) {
            (t.handlers[n] = t.handlers[n] || []).push(function o() {
                for (var e = arguments.length, i = Array(e), a = 0; a < e; a++) i[a] = arguments[a];
                r.apply(null, i), t.off(n, o);
            });
        }), this;
    },
    emit: function(n) {
        for (var r = this, t = arguments.length, o = Array(t > 1 ? t - 1 : 0), e = 1; e < t; e++) o[e - 1] = arguments[e];
        var i = void 0;
        return [].concat(n).forEach(function(n) {
            var t = r.handlers[n];
            if (r._checkActions(t)) {
                var e = !0, a = !1, c = void 0;
                try {
                    for (var f, h = t[Symbol.iterator](); !(e = (f = h.next()).done); e = !0) {
                        var l = f.value;
                        i = l.apply(null, o);
                    }
                } catch (n) {
                    a = !0, c = n;
                } finally {
                    try {
                        !e && h.return && h.return();
                    } finally {
                        if (a) throw c;
                    }
                }
            } else r.once("__event-on-" + n, function(n) {
                n.apply(null, o);
            });
        }), i;
    },
    off: function(n, r) {
        var t = this;
        return [].concat(n).forEach(function(n) {
            var o = t.handlers[n];
            if (t._checkActions(o)) if (r) {
                var e = 0, i = !0, a = !1, c = void 0;
                try {
                    for (var f, h = o[Symbol.iterator](); !(i = (f = h.next()).done); i = !0) {
                        var l = f.value;
                        if (r === l) break;
                        e++;
                    }
                } catch (n) {
                    a = !0, c = n;
                } finally {
                    try {
                        !i && h.return && h.return();
                    } finally {
                        if (a) throw c;
                    }
                }
                o.splice(e, 1);
            } else o.splice(0, o.length);
        }), this;
    },
    _checkActions: function(n) {
        return n && Array.isArray(n);
    }
}, module.exports = {
    EventHandle: n
};