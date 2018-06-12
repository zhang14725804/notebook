(function() {
    function a(a) {
        return a && a.__esModule ? a : {
            default: a
        };
    }
    Object.defineProperty(exports, "__esModule", {
        value: !0
    });
    var b = require("../../utils/ppdog"), c = a(b), d = require("../../utils/regenerator-runtime"), e = a(d), f = require("./Log"), g = a(f), h = require("./config"), i = a(h), j = require("./expand/index");
    (0, j.generate)(i.default.expand);
    var k = new g.default("ann-log");
    k.config = function(a) {
        a && Object.keys(i.default).forEach(function(b) {
            i.default[b] !== void 0 && (i.default[b] = a[b]);
        });
    }, k.create = function(a, b) {
        return a || k.warn("please input name"), new g.default(a || "null", b);
    }, exports.default = k, module.exports = exports["default"];
})();