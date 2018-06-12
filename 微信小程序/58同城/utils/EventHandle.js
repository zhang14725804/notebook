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
    on: function(n, t) {
        var r = this;
        return [].concat(n).forEach(function(n) {
            (r.handlers[n] = r.handlers[n] || []).push(t), r.emit("__event-on-" + n, t);
        }), this;
    },
    first: function(n, t) {
        var r = this;
        return [].concat(n).forEach(function(n) {
            r.off(n).on(n, t);
        }), this;
    },
    offOn: function(n, t) {
        return this.off(n, t).on(n, t);
    },
    offOnce: function(n, t) {
        return this.off(n, t).once(n, t);
    },
    once: function(n, t) {
        var r = this;
        return [].concat(n).forEach(function(n) {
            (r.handlers[n] = r.handlers[n] || []).push(function o() {
                for (var e = arguments.length, i = Array(e), a = 0; a < e; a++) i[a] = arguments[a];
                t.apply(null, i), r.off(n, o);
            });
        }), this;
    },
    emit: function(n) {
        for (var t = this, r = arguments.length, o = Array(r > 1 ? r - 1 : 0), e = 1; e < r; e++) o[e - 1] = arguments[e];
        console.log("event emit->" + n, Date.now());
        var i = void 0;
        return [].concat(n).forEach(function(n) {
            var r = t.handlers[n];
            if (t._checkActions(r)) {
                var e = !0, a = !1, c = void 0;
                try {
                    for (var f, h = r[Symbol.iterator](); !(e = (f = h.next()).done); e = !0) {
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
            } else t.once("__event-on-" + n, function(n) {
                n.apply(null, o);
            });
        }), i;
    },
    off: function(n, t) {
        var r = this;
        return [].concat(n).forEach(function(n) {
            var o = r.handlers[n];
            if (r._checkActions(o)) if (t) {
                var e = 0, i = !0, a = !1, c = void 0;
                try {
                    for (var f, h = o[Symbol.iterator](); !(i = (f = h.next()).done); i = !0) {
                        var l = f.value;
                        if (t === l) break;
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