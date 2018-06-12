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
    exports.default = {
        strLen: function(a) {
            var b, c;
            for (c = 0, b = 0; b < a.length; b++) 0 <= a.charCodeAt(b) && 255 >= a.charCodeAt(b) ? 0 == b % 2 && ++c : ++c;
            return c;
        },
        ColorSet: function(a) {
            var b = +a;
            return 0 < b ? "red" : 0 > b ? "green" : "";
        },
        fmPrice: function(a) {
            var b = +a;
            return 0 < b ? "+" + b : 0 > b ? b : "--";
        },
        fmChgRatio: function(a) {
            var b = +a;
            return 0 < b ? "+" + b + "%" : 0 > b ? b + "%" : "--";
        },
        getProperDecimal: function(a, b) {
            var c = (1 * a).toFixed(b);
            return c;
        },
        fmtVol: function(a, b) {
            var c = Math.abs, d = b.slice(0, 2).toUpperCase();
            return "HK" === d && this.isIndex(b) && (d = "HKZS"), 1e8 <= c(a) ? {
                data: (a / 1e8).toFixed(2),
                fmtUnit: "亿",
                mktUnit: f[d]
            } : 1e4 <= c(a) ? {
                data: (a / 1e4).toFixed(1),
                fmtUnit: "万",
                mktUnit: f[d]
            } : {
                data: a.toFixed(0),
                fmtUnit: "",
                mktUnit: f[d]
            };
        },
        isIndex: function(a) {
            return a.match(/sh000|sz399|nq899|hkHSI$|hkHSCEI$|hkHSCCI$|hkGEM$|hkCES100$|hkCES300$|usDJI$|usIXIC$|usINX$|us.DJI$|us.IXIC$|us.INX$/);
        }
    };
    var f = {
        SZ: "手",
        SH: "手",
        HK: "股",
        US: "股",
        HKZS: ""
    };
    module.exports = exports["default"];
})();