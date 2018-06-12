(function() {
    function a(a) {
        return a && a.__esModule ? a : {
            default: a
        };
    }
    var b = require("../utils/ppdog"), c = a(b), d = require("../utils/regenerator-runtime"), e = a(d);
    module.exports = function(a, b) {
        var c = a.qt[a.symbol].Status;
        if (!c) {
            var d = a.qt[a.symbol].Market, e = a.mktstt, f = e.split("|"), g = f.shift(), h = {};
            f.forEach(function(a) {
                var b = a.split("_"), c = b.shift().toLowerCase();
                h[c] = b;
            }), a.mktstt = h[d];
        } else a.mktstt = [ "close", c ];
        return b(a);
    };
})();