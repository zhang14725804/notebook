(function() {
    function a(a) {
        return a && a.__esModule ? a : {
            default: a
        };
    }
    Object.defineProperty(exports, "__esModule", {
        value: !0
    });
    var b = require("../../utils/ppdog"), c = a(b), d = require("../../utils/regenerator-runtime"), e = a(d);
    exports.default = {
        level: !0,
        throwError: !1,
        expand: {
            console: {
                printTime: !0
            },
            wxlogreport: {
                printTime: !0
            }
        }
    }, module.exports = exports["default"];
})();