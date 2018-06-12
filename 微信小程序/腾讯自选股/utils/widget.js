(function() {
    function a(a) {
        return a && a.__esModule ? a : {
            default: a
        };
    }
    Object.defineProperty(exports, "__esModule", {
        value: !0
    });
    var b = require("./ppdog"), c = a(b), d = require("./regenerator-runtime"), e = a(d);
    exports.default = widget = {
        isEncodeJson: function(a) {
            return "string" == typeof a && "%" === a.trim()[0];
        },
        getWidgetParam: function(a, b) {
            return "query" === a ? "wxSearchQuery" in b ? decodeURIComponent(b.wxSearchQuery) : b.query : b[a] ? "widgetData" === a || "wxParamData" === a || "data" === a ? this.isEncodeJson(b[a]) ? JSON.parse(decodeURIComponent(b[a])) : JSON.parse(b[a]) : void 0 : void 0;
        }
    }, module.exports = exports["default"];
})();