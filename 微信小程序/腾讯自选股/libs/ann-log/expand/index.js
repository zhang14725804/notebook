(function() {
    function a(a) {
        return a && a.__esModule ? a : {
            default: a
        };
    }
    function b(a) {
        if (a && 0 !== a.length) for (var b = 0; b < a.length; b++) a.splice(b, 1), b--;
    }
    Object.defineProperty(exports, "__esModule", {
        value: !0
    }), exports.generate = exports.expanders = exports.request = void 0;
    var c = require("../../../utils/ppdog"), d = a(c), e = require("../../../utils/regenerator-runtime"), f = a(e), g = require("./console"), h = a(g), i = require("./wxLogReport"), j = a(i), k = {}, l = exports.request = function(a, b) {
        k[a] = b;
    }, m = exports.expanders = [], n = exports.generate = function(a) {
        return b(m), a ? void Object.keys(a).forEach(function(b) {
            k[b] && m.push(k[b](a[b]));
        }) : m.push((0, h.default)({
            printTime: !1
        }));
    };
    l("console", h.default), l("wxlogreport", j.default);
})();