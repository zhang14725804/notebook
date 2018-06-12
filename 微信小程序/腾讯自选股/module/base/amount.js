(function() {
    function a(a) {
        return a && a.__esModule ? a : {
            default: a
        };
    }
    var b = require("../../utils/ppdog"), c = a(b), d = require("../../utils/regenerator-runtime"), e = a(d);
    "use strict", module.exports = {
        fen2Yuan: function(a) {
            var b = /^[\+|-]?[0-9]+$/;
            return "string" != typeof a && (a = a.toString()), b.test(a) ? (parseFloat(a) / 100).toFixed(2) : "0.00";
        },
        yuan2Fen: function(a) {
            var b = /^[\+|-]?\d+(\.\d+)?$/;
            return "string" != typeof a && (a = a.toString()), b.test(a) ? (100 * parseFloat(a)).toFixed(0) : "0";
        },
        toCurrency: function(a, b) {
            a = a || "", b = "undefined" == typeof b ? 2 : b;
            var c = /^(\-?)(\d+)(\.\d+)?$/, d = c.exec(a), e = null == d ? "" : RegExp.$1 || "", f = null == d ? "0" : RegExp.$2 || "0", g = null == d ? ".00" : RegExp.$3 || ".00", h = f.length, j = 3 < h ? h % 3 : 0, k = "", l = 0 == j ? "" : f.substr(0, j) + ",", m = 0;
            g = 0 == b ? "" : g.length >= b + 1 ? g.substr(0, b + 1) : (g + Array(b + 1 - g.length + 1).join("0")).substr(0, b + 1);
            for (var n = j; n < h; n++) k += f.charAt(n), m++, 0 == m % 3 && n < h - 1 && (k += ",", 
            m = 0);
            return c = null, e + l + k + g;
        },
        formatBigToText: function(a, b, c, d, e) {
            return a = parseInt(a || 0, 10), b = parseInt(b || 1, 10), c = parseInt(c || 0, 10), 
            d = parseInt(d || 2, 10), e = e || "", a = a < 1e4 * b ? a.toFixed(c) : a >= 1e4 * b && 1e8 > a ? (a / 1e4).toFixed(d) + "万" : (a / 1e8).toFixed(d) + "亿", 
            a + e;
        }
    };
})();