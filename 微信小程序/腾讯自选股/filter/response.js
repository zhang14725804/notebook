(function() {
    function a(a) {
        return a && a.__esModule ? a : {
            default: a
        };
    }
    var b = require("../utils/ppdog"), c = a(b), d = require("../utils/regenerator-runtime"), e = a(d);
    module.exports = function(a, b) {
        var d = a.statusCode, e = a.data;
        return 200 == d ? 0 == e.code ? (e.data.response && delete e.data.response, b(e.data)) : c.default.reject(e.msg) : c.default.reject(a.errMsg);
    };
})();