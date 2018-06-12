(function() {
    function a(a) {
        return a && a.__esModule ? a : {
            default: a
        };
    }
    function b(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function");
    }
    function c() {}
    var d = function() {
        function a(a, b) {
            for (var c, d = 0; d < b.length; d++) c = b[d], c.enumerable = c.enumerable || !1, 
            c.configurable = !0, "value" in c && (c.writable = !0), Object.defineProperty(a, c.key, c);
        }
        return function(b, c, d) {
            return c && a(b.prototype, c), d && a(b, d), b;
        };
    }(), e = require("../utils/ppdog"), f = a(e), g = require("../utils/regenerator-runtime"), h = a(g), i = require("../utils/is"), j = require("../utils/extend"), k = Page, l = [ "onLoad", "onUnload" ], m = [ "name", "data", "props", "onLoad", "onUnload", "methods" ], n = {}, o = function() {
        function a(c) {
            b(this, a), this.origin = c, this.config = {
                data: {}
            }, this.childrens = {}, this.childrensEvents = {};
            var d = this.needs = c.components;
            if (!d) return k(c);
            for (var e in d) {
                var f = d[e] || {}, g = new p(require("../components/" + e + "/index"));
                n[e] = g.data, g.name || g.setName(e), this.setChildProps(g, f), this.pushChild(e, g), 
                this.mergeData(e, g), this.mergeMethods(e, g), this.mergeChildEvents(e, g);
            }
            return this.setChildrens(), this.mergePageEvent(), k(this.config);
        }
        return d(a, [ {
            key: "pushChild",
            value: function(a, b) {
                this.childrens[a] = b;
            }
        }, {
            key: "setChildProps",
            value: function(a, b) {
                for (var c in b) {
                    var d = b[c];
                    i.fn(d) && (b[c] = d.bind(a));
                }
                a.setProps(b);
            }
        }, {
            key: "mergeMethods",
            value: function(a, b) {
                for (var c in b.methods) this.config[c] = b.methods[c].bind(b);
            }
        }, {
            key: "mergeData",
            value: function(a, b) {
                var c = this.config, d = this.origin;
                if (j(!0, c, d, b.config), j(b.data, b.props), a in c.data || a in d.data) throw Error('You need rename "' + a + '" in data, because it is the name of Component');
                j(!0, c.data, d.data), c.data[a] = {}, j(!0, c.data[a], b.data);
            }
        }, {
            key: "mergeChildEvents",
            value: function(a, b) {
                var c = this.childrensEvents;
                c[a] = {}, l.forEach(function(d) {
                    c[a][d] = b.config[d];
                });
            }
        }, {
            key: "mergePageEvent",
            value: function() {
                var a = this;
                l.forEach(function(b) {
                    a.config[b] = function() {
                        for (var c in a.needs) {
                            var d = a.childrens[c];
                            "onLoad" == b ? (d.data = n[c], d.setParent(this)) : "onUnload" == b && d.removeParent(), 
                            a.childrensEvents[c][b].apply(d, arguments);
                        }
                        a.origin[b] && a.origin[b].apply(this, arguments);
                    };
                });
            }
        }, {
            key: "setChildrens",
            value: function() {
                this.config.childrens = this.childrens;
            }
        } ]), a;
    }(), p = function() {
        function a(d) {
            for (var e in b(this, a), d) ~m.join("|").indexOf(e) || (this[e] = d[e]);
            d.onLoad = d.onLoad || c, d.onUnload = d.onUnload || c, this.data = d.data || {}, 
            this.config = d, this.methods = d.methods || {}, this.setMethods(d.methods);
        }
        return d(a, [ {
            key: "setData",
            value: function(a) {
                var b = this.name, c = this.parent, d = c.data[b], e = j(!0, d, a), f = {};
                f[b] = e, this.data = e, c.setData(f);
            }
        }, {
            key: "setProps",
            value: function(a) {
                this.props = j(this.props, a);
            }
        }, {
            key: "setName",
            value: function(a) {
                this.name = a;
            }
        }, {
            key: "setParent",
            value: function(a) {
                this.parent = a;
            }
        }, {
            key: "removeParent",
            value: function() {
                this.parent = null;
            }
        }, {
            key: "setMethods",
            value: function(a) {
                for (var b in a) this[b] = a[b];
            }
        } ]), a;
    }();
    Page = function(a) {
        return new o(a);
    }, module.exports = {
        originalPage: k,
        Page: Page,
        Component: p
    };
})();