function t(t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}

function e(t) {
    var e = {};
    return (t instanceof Array ? t : [].slice.call(arguments, 0)).forEach(function(t) {
        var n = t.initialize;
        Object.defineProperty(e, t.name, {
            get: function() {
                return n;
            },
            set: function(e) {
                var r = n;
                n = e, t.onChange && t.onChange(e, r);
            }
        });
    }), e;
}

var n = function() {
    function t(t, e) {
        for (var n = 0; n < e.length; n++) {
            var r = e[n];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
            Object.defineProperty(t, r.key, r);
        }
    }
    return function(e, n, r) {
        return n && t(e.prototype, n), r && t(e, r), e;
    };
}(), r = require("../lib/message"), i = require("../../lib-inject").Promise;

module.exports = function() {
    function o() {
        for (var n = this, a = arguments.length, c = Array(a), u = 0; u < a; u++) c[u] = arguments[u];
        t(this, o), this.started = i.defer(), new r().assign(this);
        var s = this.model = new e([ {
            name: "state",
            onChange: function(t, e) {
                n.emit("statechange", t, e);
            },
            initialize: "loading"
        }, {
            name: "currentContent",
            initialize: null
        } ]);
        Object.defineProperties(this, {
            currentContent: {
                get: function() {
                    return s.currentContent;
                }
            },
            state: {
                get: function() {
                    return s.state;
                }
            }
        }), this.flow = this.createFlow.apply(this, c), this.flow.catch(function(t) {
            n.emit("error", t);
        }), [ "End", "Play", "Pause", "Timeupdate", "Error", "Skip" ].forEach(function(t) {
            n["onContent" + t] = function() {
                for (var e = arguments.length, r = Array(e), i = 0; i < e; i++) r[i] = arguments[i];
                n.emit.apply(n, [ "content" + t.toLowerCase() ].concat(r));
            }, n["on" + t] = function() {
                console.warn("不建议再使用video.on" + t + "，请使用onContent" + t), this["onContent" + t].apply(this, arguments);
            };
        });
    }
    return n(o, [ {
        key: "createFlow",
        value: function() {}
    }, {
        key: "start",
        value: function() {
            return this.started.resolve(), this;
        }
    }, {
        key: "stop",
        value: function() {
            return this.started.reject(), this.off(), this;
        }
    } ]), o;
}();