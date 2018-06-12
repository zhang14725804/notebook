(function() {
    function a(a) {
        return a && a.__esModule ? a : {
            default: a
        };
    }
    function b(a) {
        var b = +a;
        return 0 < b ? "red" : 0 > b ? "green" : "";
    }
    function c(a) {
        return 0 < +a ? "+" + a : "" + a;
    }
    function d(a) {
        var b = +a;
        return 0 < b ? "+" + b + "%" : 0 > b ? b + "%" : "0.00%";
    }
    function e(a) {
        return 0 == +a ? "" : 0 < +a ? "up" : "down";
    }
    var f = require("../utils/ppdog"), g = a(f), h = require("../utils/regenerator-runtime"), i = a(h);
    module.exports = function(a, f) {
        var g = a.map(function(a) {
            return a.set("Color", b(a.get("Chg"))).set("Chg", c(a.get("Chg"))).set("ChgRatio", d(a.get("ChgRatio"))).set("Updown", e(a.get("Chg")));
        });
        return f(g);
    };
})();