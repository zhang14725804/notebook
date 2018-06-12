(function() {
    function a(a) {
        return a && a.__esModule ? a : {
            default: a
        };
    }
    Object.defineProperty(exports, "__esModule", {
        value: !0
    }), exports.slice = exports.fillZero = exports.getNewStr = void 0;
    var b = require("../../utils/ppdog"), c = a(b), d = require("../../utils/regenerator-runtime"), e = a(d), f = exports.getNewStr = function() {
        var a = new Date(), b = a.getFullYear(), c = a.getMonth() + 1, d = a.getDate(), e = a.getHours(), f = a.getMinutes(), h = a.getSeconds();
        return b + "-" + g(c) + "-" + g(d) + " " + g(e) + ":" + g(f) + ":" + g(h);
    }, g = exports.fillZero = function(a) {
        return 9 < a ? a + "" : "0" + (a + "");
    }, h = exports.slice = function(a, b, c) {
        var d = [];
        if (!a) return d;
        b || (b = 0), (!c || c > a.length - 1) && (c = a.length - 1);
        for (var e = 0; e < a.length; e++) if (!(e < b)) {
            if (e > c) break;
            d.push(a[e]);
        }
        return d;
    };
})();