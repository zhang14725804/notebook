(function() {
    function a(a) {
        return a && a.__esModule ? a : {
            default: a
        };
    }
    function b(a) {
        return a.match(/sh000|sz399|nq899|hkHSI$|hkHSCEI$|hkHSCCI$|hkCES100$|hkCES300$|usDJI$|usIXIC$|usINX$/);
    }
    function c(a) {
        var b = {};
        for (var c in a) b[a[c]] = c;
        return b;
    }
    function d(a) {
        return {
            sh: n,
            sz: n,
            hk: o
        }[a];
    }
    var e = require("../utils/ppdog"), f = a(e), g = require("../utils/regenerator-runtime"), h = a(g), i = require("../utils/is"), j = a(i), k = /^(sh|sz|hk|r_hk|jj|s_jj|us|nq)/;
    module.exports = function(a, c) {
        var e = a.zsData, f = a.symbol;
        if (!e) return c(a);
        var g = k.exec(f)[0];
        if ("hk" == g && !b(f)) return c(a);
        if ("hk" == g) {
            var h = f.substr(2);
            e = e[h];
        }
        var i = d(g), j = {};
        return e.forEach(function(a, b) {
            i[b] && (j[i[b]] = a);
        }), a.zsData = j, c(a);
    };
    var l = {
        Zjs: 2,
        Pjs: 3,
        Djs: 4
    }, m = {
        Zjs: 0,
        Pjs: 1,
        Djs: 2
    }, n = c(l), o = c(m);
})();