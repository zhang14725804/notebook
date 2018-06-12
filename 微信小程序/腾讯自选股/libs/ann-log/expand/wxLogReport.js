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
            c.unshift(a.printTime ? "[" + b.time + "]" : "");
            var d = b.level;
            this._logHistory[d] || (this._logHistory[d] = []);
            var e = Object.prototype.toString, g = c.map(function(a) {
                return "[object String]" === e.call(a) ? a : JSON.stringify(a);
            });
            this._logHistory[d].push(g.join("~"));
        };
    };
    var b = require("../../../utils/ppdog"), c = a(b), d = require("../../../utils/regenerator-runtime"), e = a(d), f = require("../utils");
    module.exports = exports["default"];
})();