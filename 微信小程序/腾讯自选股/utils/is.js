(function() {
    function a(a) {
        return a && a.__esModule ? a : {
            default: a
        };
    }
    var b = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(a) {
        return typeof a;
    } : function(a) {
        return a && "function" == typeof Symbol && a.constructor === Symbol && a !== Symbol.prototype ? "symbol" : typeof a;
    }, c = require("./ppdog"), d = a(c), e = require("./regenerator-runtime"), f = a(e);
    var g, h = Object.prototype, i = h.hasOwnProperty, j = h.toString;
    "function" == typeof Symbol && (g = Symbol.prototype.valueOf);
    var k = function(a) {
        return a !== a;
    }, l = {
        boolean: 1,
        number: 1,
        string: 1,
        undefined: 1
    }, m = /^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{4}|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)$/, n = /^[A-Fa-f0-9]+$/, o = {};
    o.a = o.type = function(a, c) {
        return ("undefined" == typeof a ? "undefined" : b(a)) === c;
    }, o.defined = function(a) {
        return "undefined" != typeof a;
    }, o.empty = function(a) {
        var b, c = j.call(a);
        if ("[object Array]" === c || "[object Arguments]" === c || "[object String]" === c) return 0 === a.length;
        if ("[object Object]" === c) {
            for (b in a) if (i.call(a, b)) return !1;
            return !0;
        }
        return !a;
    }, o.equal = function(a, b) {
        if (a === b) return !0;
        var c, d = j.call(a);
        if (d !== j.call(b)) return !1;
        if ("[object Object]" === d) {
            for (c in a) if (!o.equal(a[c], b[c]) || !(c in b)) return !1;
            for (c in b) if (!o.equal(a[c], b[c]) || !(c in a)) return !1;
            return !0;
        }
        if ("[object Array]" === d) {
            if (c = a.length, c !== b.length) return !1;
            for (;c--; ) if (!o.equal(a[c], b[c])) return !1;
            return !0;
        }
        return "[object Function]" === d ? a.prototype === b.prototype : "[object Date]" === d && a.getTime() === b.getTime();
    }, o.hosted = function(a, c) {
        var d = b(c[a]);
        return "object" === d ? !!c[a] : !l[d];
    }, o.instance = o["instanceof"] = function(a, b) {
        return a instanceof b;
    }, o.nil = o["null"] = function(a) {
        return null === a;
    }, o.undef = o.undefined = function(a) {
        return "undefined" == typeof a;
    }, o.args = o.arguments = function(a) {
        var b = "[object Arguments]" === j.call(a), c = !o.array(a) && o.arraylike(a) && o.object(a) && o.fn(a.callee);
        return b || c;
    }, o.array = Array.isArray || function(a) {
        return "[object Array]" === j.call(a);
    }, o.args.empty = function(a) {
        return o.args(a) && 0 === a.length;
    }, o.array.empty = function(a) {
        return o.array(a) && 0 === a.length;
    }, o.arraylike = function(a) {
        return !!a && !o.bool(a) && i.call(a, "length") && isFinite(a.length) && o.number(a.length) && 0 <= a.length;
    }, o.bool = o.boolean = function(a) {
        return "[object Boolean]" === j.call(a);
    }, o["false"] = function(a) {
        return o.bool(a) && !1 === !!+a;
    }, o["true"] = function(a) {
        return o.bool(a) && !0 === !!+a;
    }, o.date = function(a) {
        return "[object Date]" === j.call(a);
    }, o.date.valid = function(a) {
        return o.date(a) && !isNaN(+a);
    }, o.element = function(a) {
        return a !== void 0 && "undefined" != typeof HTMLElement && a instanceof HTMLElement && 1 === a.nodeType;
    }, o.error = function(a) {
        return "[object Error]" === j.call(a);
    }, o.fn = o["function"] = function(a) {
        var b = "undefined" != typeof window && a === window.alert;
        if (b) return !0;
        var c = j.call(a);
        return "[object Function]" === c || "[object GeneratorFunction]" === c || "[object AsyncFunction]" === c;
    }, o.number = function(a) {
        return "[object Number]" === j.call(a);
    }, o.infinite = function(a) {
        return a === Infinity || a === -Infinity;
    }, o.decimal = function(a) {
        return o.number(a) && !k(a) && !o.infinite(a) && 0 != a % 1;
    }, o.divisibleBy = function(a, b) {
        var c = o.infinite(a), d = o.infinite(b), e = o.number(a) && !k(a) && o.number(b) && !k(b) && 0 !== b;
        return c || d || e && 0 == a % b;
    }, o.integer = o.int = function(a) {
        return o.number(a) && !k(a) && 0 == a % 1;
    }, o.maximum = function(a, b) {
        if (k(a)) throw new TypeError("NaN is not a valid value"); else if (!o.arraylike(b)) throw new TypeError("second argument must be array-like");
        for (var c = b.length; 0 <= --c; ) if (a < b[c]) return !1;
        return !0;
    }, o.minimum = function(a, b) {
        if (k(a)) throw new TypeError("NaN is not a valid value"); else if (!o.arraylike(b)) throw new TypeError("second argument must be array-like");
        for (var c = b.length; 0 <= --c; ) if (a > b[c]) return !1;
        return !0;
    }, o.nan = function(a) {
        return !o.number(a) || a !== a;
    }, o.even = function(a) {
        return o.infinite(a) || o.number(a) && a === a && 0 == a % 2;
    }, o.odd = function(a) {
        return o.infinite(a) || o.number(a) && a === a && 0 != a % 2;
    }, o.ge = function(a, b) {
        if (k(a) || k(b)) throw new TypeError("NaN is not a valid value");
        return !o.infinite(a) && !o.infinite(b) && a >= b;
    }, o.gt = function(a, b) {
        if (k(a) || k(b)) throw new TypeError("NaN is not a valid value");
        return !o.infinite(a) && !o.infinite(b) && a > b;
    }, o.le = function(a, b) {
        if (k(a) || k(b)) throw new TypeError("NaN is not a valid value");
        return !o.infinite(a) && !o.infinite(b) && a <= b;
    }, o.lt = function(a, b) {
        if (k(a) || k(b)) throw new TypeError("NaN is not a valid value");
        return !o.infinite(a) && !o.infinite(b) && a < b;
    }, o.within = function(a, b, c) {
        if (k(a) || k(b) || k(c)) throw new TypeError("NaN is not a valid value"); else if (!o.number(a) || !o.number(b) || !o.number(c)) throw new TypeError("all arguments must be numbers");
        var d = o.infinite(a) || o.infinite(b) || o.infinite(c);
        return d || a >= b && a <= c;
    }, o.object = function(a) {
        return "[object Object]" === j.call(a);
    }, o.primitive = function(a) {
        return !a || ("object" === ("undefined" == typeof a ? "undefined" : b(a)) || o.object(a) || o.fn(a) || o.array(a) ? !1 : !0);
    }, o.hash = function(a) {
        return o.object(a) && a.constructor === Object && !a.nodeType && !a.setInterval;
    }, o.regexp = function(a) {
        return "[object RegExp]" === j.call(a);
    }, o.string = function(a) {
        return "[object String]" === j.call(a);
    }, o.base64 = function(a) {
        return o.string(a) && (!a.length || m.test(a));
    }, o.hex = function(a) {
        return o.string(a) && (!a.length || n.test(a));
    }, o.symbol = function(a) {
        return "function" == typeof Symbol && "[object Symbol]" === j.call(a) && "symbol" === b(g.call(a));
    }, module.exports = o;
})();