function n(n) {
    var r = this, e = f.call(arguments, 1);
    return new l(function(o, c) {
        function i(t) {
            var r;
            try {
                r = n.next(t);
            } catch (n) {
                return c(n);
            }
            f(r);
        }
        function a(t) {
            var r;
            try {
                r = n.throw(t);
            } catch (n) {
                return c(n);
            }
            f(r);
        }
        function f(n) {
            if (n.done) return o(n.value);
            var e = t.call(r, n.value);
            return e && u(e) ? e.then(i, a) : a(new TypeError('You may only yield a function, promise, generator, array, or object, but the following object was passed: "' + String(n.value) + '"'));
        }
        if ("function" == typeof n && (n = n.apply(r, e)), !n || "function" != typeof n.next) return o(n);
        i();
    });
}

function t(t) {
    return t ? u(t) ? t : i(t) || c(t) ? n.call(this, t) : "function" == typeof t ? r.call(this, t) : Array.isArray(t) ? e.call(this, t) : a(t) ? o.call(this, t) : t : t;
}

function r(n) {
    var t = this;
    return new l(function(r, e) {
        n.call(t, function(n, t) {
            if (n) return e(n);
            arguments.length > 2 && (t = f.call(arguments, 1)), r(t);
        });
    });
}

function e(n) {
    return l.all(n.map(t, this));
}

function o(n) {
    for (var r = new n.constructor(), e = Object.keys(n), o = [], c = 0; c < e.length; c++) {
        var i = e[c], a = t.call(this, n[i]);
        a && u(a) ? function(n, t) {
            r[t] = void 0, o.push(n.then(function(n) {
                r[t] = n;
            }));
        }(a, i) : r[i] = n[i];
    }
    return l.all(o).then(function() {
        return r;
    });
}

function u(n) {
    return "function" == typeof n.then;
}

function c(n) {
    return "function" == typeof n.next && "function" == typeof n.throw;
}

function i(n) {
    var t = n.constructor;
    return !!t && ("GeneratorFunction" === t.name || "GeneratorFunction" === t.displayName || c(t.prototype));
}

function a(n) {
    return Object == n.constructor;
}

var f = Array.prototype.slice, l = require("../es6-promise.min").Promise;

module.exports = n.default = n.co = n, n.wrap = function(t) {
    function r() {
        return n.call(this, t.apply(this, arguments));
    }
    return r.__generatorFunction__ = t, r;
};