function e(e, n) {
    if (!(e instanceof n)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var n = function() {
    function e(e, n) {
        for (var t = 0; t < n.length; t++) {
            var r = n[t];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
            Object.defineProperty(e, r.key, r);
        }
    }
    return function(n, t, r) {
        return t && e(n.prototype, t), r && e(n, r), n;
    };
}(), t = function() {
    function t() {
        e(this, t), this.eventObjs = {};
    }
    return n(t, [ {
        key: "on",
        value: function(e, n, t, r) {
            this.eventObjs[e] || (this.eventObjs[e] = []), this.eventObjs[e].push({
                handler: n,
                once: t,
                context: r
            });
            var o = this;
            return function() {
                o.off(e, n);
            };
        }
    }, {
        key: "off",
        value: function(e, n) {
            var t = this;
            return (e ? [ e ] : []).forEach(function(e) {
                if (n) {
                    var r = [];
                    (t.eventObjs[e] || []).forEach(function(e) {
                        e.handler !== n && r.push(e);
                    }), t.eventObjs[e] = r;
                } else t.eventObjs[e] = [];
            }), this;
        }
    }, {
        key: "emit",
        value: function(e) {
            var n = Array.prototype.slice.call(arguments, 1);
            (this.eventObjs[e] || []).forEach(function(e) {
                if (!e.once || !e.called) {
                    e.called = !0;
                    try {
                        e.handler && e.handler.apply(e.context, n);
                    } catch (e) {
                        console.error(e.stack || e.message || e);
                    }
                }
            });
        }
    } ]), t;
}();

exports.default = t;