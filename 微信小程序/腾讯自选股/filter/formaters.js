(function() {
    function a(a) {
        return a && a.__esModule ? a : {
            default: a
        };
    }
    var b = require("../utils/ppdog"), c = a(b), d = require("../utils/regenerator-runtime"), e = a(d);
    module.exports = function(a, b) {
        var c = a.fn, d = a.data;
        return b(a);
    };
})();