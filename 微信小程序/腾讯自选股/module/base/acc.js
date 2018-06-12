(function() {
    function a(a) {
        return a && a.__esModule ? a : {
            default: a
        };
    }
    var b = Math.pow, d = Math.max, c = require("../../utils/ppdog"), e = a(c), f = require("../../utils/regenerator-runtime"), g = a(f);
    "use strict", module.exports = {
        add: function(a, e) {
            var f, g, h, i, c = a.toString(), j = e.toString();
            try {
                f = c.split(".")[1].length;
            } catch (a) {
                f = 0;
            }
            try {
                g = j.split(".")[1].length;
            } catch (a) {
                g = 0;
            }
            if (i = Math.abs(f - g), h = b(10, d(f, g)), 0 < i) {
                var k = b(10, i);
                f > g ? (a = +c.replace(".", ""), e = +j.replace(".", "") * k) : (a = +c.replace(".", "") * k, 
                e = +j.replace(".", ""));
            } else a = +c.replace(".", ""), e = +j.replace(".", "");
            return (a + e) / h;
        },
        sub: function(a, c) {
            var e, f, g, h;
            try {
                e = a.toString().split(".")[1].length;
            } catch (a) {
                e = 0;
            }
            try {
                f = c.toString().split(".")[1].length;
            } catch (a) {
                f = 0;
            }
            return g = b(10, d(e, f)), h = e >= f ? e : f, ((a * g - c * g) / g).toFixed(h);
        },
        mul: function(a, c) {
            var d = 0, e = a.toString(), f = c.toString();
            try {
                d += e.split(".")[1].length;
            } catch (a) {}
            try {
                d += f.split(".")[1].length;
            } catch (a) {}
            return +e.replace(".", "") * +f.replace(".", "") / b(10, d);
        },
        div: function(a, c) {
            var d, e, f = 0, g = 0;
            try {
                f = a.toString().split(".")[1].length;
            } catch (a) {}
            try {
                g = c.toString().split(".")[1].length;
            } catch (a) {}
            return d = +a.toString().replace(".", ""), e = +c.toString().replace(".", ""), d / e * b(10, g - f);
        },
        isEqual: function(c, a) {
            if (c && a) return c = parseFloat(c), a = parseFloat(a), c === a;
        },
        isLess: function(c, a) {
            if (c && a) return c = parseFloat(c), a = parseFloat(a), c < a;
        },
        isMore: function(c, a) {
            if (c && a) return c = parseFloat(c), a = parseFloat(a), c > a;
        }
    };
})();