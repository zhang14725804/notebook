(function() {
    function a(a) {
        return a && a.__esModule ? a : {
            default: a
        };
    }
    function b(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function");
    }
    var c = function() {
        function a(a, b) {
            for (var c, d = 0; d < b.length; d++) c = b[d], c.enumerable = c.enumerable || !1, 
            c.configurable = !0, "value" in c && (c.writable = !0), Object.defineProperty(a, c.key, c);
        }
        return function(b, c, d) {
            return c && a(b.prototype, c), d && a(b, d), b;
        };
    }(), d = require("./ppdog"), e = a(d), f = require("./regenerator-runtime"), g = a(f), h = function() {
        function a() {
            b(this, a), this.events = {};
        }
        return c(a, [ {
            key: "on",
            value: function(a, b, c) {
                var d = [ b, c ], e = this.events[a];
                Array.isArray(e) ? e.push(d) : this.events[a] = [ d ];
            }
        }, {
            key: "remove",
            value: function(a, b) {
                var c = this.events[a];
                Array.isArray(c) && (this.events[a] = c.filter(function(a) {
                    return a[0] != b;
                }));
            }
        }, {
            key: "emit",
            value: function(a, b) {
                var c = this.events[a];
                Array.isArray(c) && c.map(function(a) {
                    var c = a[0], d = a[1];
                    d.call(c, b);
                });
            }
        } ]), a;
    }();
    module.exports = {
        Event: h
    };
})();