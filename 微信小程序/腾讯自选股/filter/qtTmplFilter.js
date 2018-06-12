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
        return a.match(/usIXIC$/);
    }
    var d = require("../utils/ppdog"), e = a(d), f = require("../utils/regenerator-runtime"), g = a(f);
    module.exports = function(a, d) {
        var e = a, f = e.substr(0, 2), g = /sh|sz/.test(f) ? "cn" : f;
        return b(e) && !c(e) && (g += "_zs"), d(g);
    };
})();