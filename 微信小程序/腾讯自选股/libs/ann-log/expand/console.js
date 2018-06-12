(function() {
    function a(a) {
        return a && a.__esModule ? a : {
            default: a
        };
    }
    Object.defineProperty(exports, "__esModule", {
        value: !0
    }), exports.default = function(a) {
        return function(b) {
            var c = (0, f.slice)(b.args);
            c.unshift("[" + b.name + "]" + (a.printTime ? "[" + b.time + "]" : "") + ":");
            var d = b.level;
            ("log" === d || "error" === d) && (d = "debug"), console && console[d].apply(console, c);
        };
    };
    var b = require("../../../utils/ppdog"), c = a(b), d = require("../../../utils/regenerator-runtime"), e = a(d), f = require("../utils");
    module.exports = exports["default"];
})();