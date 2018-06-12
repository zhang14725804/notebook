(function() {
    function a(a) {
        return a && a.__esModule ? a : {
            default: a
        };
    }
    var b = require("../../utils/ppdog"), c = a(b), d = require("../../utils/regenerator-runtime"), e = a(d);
    Page({
        data: {
            pageUrl: ""
        },
        onLoad: function(a) {
            this.setData({
                pageUrl: a.url
            });
        }
    });
})();