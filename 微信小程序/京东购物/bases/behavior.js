function t(t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}

function e(t, e) {
    if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !e || "object" != typeof e && "function" != typeof e ? t : e;
}

function r(t, e) {
    if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
    t.prototype = Object.create(e && e.prototype, {
        constructor: {
            value: t,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e);
}

var o = function() {
    function t(t, e) {
        for (var r = 0; r < e.length; r++) {
            var o = e[r];
            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), 
            Object.defineProperty(t, o.key, o);
        }
    }
    return function(e, r, o) {
        return r && t(e.prototype, r), o && t(e, o), e;
    };
}(), n = function t(e, r, o) {
    null === e && (e = Function.prototype);
    var n = Object.getOwnPropertyDescriptor(e, r);
    if (void 0 === n) {
        var i = Object.getPrototypeOf(e);
        return null === i ? void 0 : t(i, r, o);
    }
    if ("value" in n) return n.value;
    var a = n.get;
    if (void 0 !== a) return a.call(o);
}, i = require("./base.js"), a = function(a) {
    function c(r) {
        t(this, c);
        var o = e(this, (c.__proto__ || Object.getPrototypeOf(c)).apply(this, arguments));
        return o.object = r, o.lifeCircle(), o.attachMethods(), o.behavior = Behavior(r), 
        o;
    }
    return r(c, i), o(c, [ {
        key: "lifeCircle",
        value: function() {
            var t = this, e = this, r = [ "created", "attached", "ready", "moved", "detached" ], o = !0, n = !1, i = void 0;
            try {
                for (var a, c = r[Symbol.iterator](); !(o = (a = c.next()).done); o = !0) !function() {
                    var r = a.value, o = t.object[r];
                    t.object[r] = function() {
                        for (var t = arguments.length, n = Array(t), i = 0; i < t; i++) n[i] = arguments[i];
                        e[r] && (n = e[r].apply(this, n) || n), o && o.apply(this, n);
                    };
                }();
            } catch (t) {
                n = !0, i = t;
            } finally {
                try {
                    !o && c.return && c.return();
                } finally {
                    if (n) throw i;
                }
            }
        }
    }, {
        key: "created",
        value: function() {}
    }, {
        key: "attachMethods",
        value: function() {
            var t = n(c.prototype.__proto__ || Object.getPrototypeOf(c.prototype), "methods", this).call(this);
            for (var e in t) {
                if ("methods" in this.object) {
                    if (this.object.methods[e]) throw new Error("Method " + e + " is already exists");
                } else this.object.methods = {};
                this.object.methods[e] = t[e];
            }
        }
    } ]), c;
}();

module.exports = a;