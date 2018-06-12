(function() {
    function a(a) {
        return a && a.__esModule ? a : {
            default: a
        };
    }
    function b(a) {
        g || (g = !0, wx.navigateTo({
            url: a
        }), setTimeout(function() {
            g = !1;
        }, 1e3));
    }
    var c = require("../utils/ppdog"), d = a(c), e = require("../utils/regenerator-runtime"), f = a(e);
    module.exports = function(a, c) {
        var d = a.url;
        return b(d), c(a);
    };
    var g;
})();