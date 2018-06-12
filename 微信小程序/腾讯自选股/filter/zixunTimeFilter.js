(function() {
    function a(a) {
        return a && a.__esModule ? a : {
            default: a
        };
    }
    function b(a) {
        var b = a;
        return b.forEach(function(a) {
            var b = a.time, e = a.timestamp || null;
            if ("" == b) {
                e = 1e3 * parseInt(e), b = new Date(e);
                var f = b.getFullYear(), g = c(b.getMonth() + 1), i = c(b.getDate()), d = c(b.getHours()), h = c(b.getMinutes()), j = c(b.getSeconds());
                b = f + "-" + g + "-" + i + " " + d + ":" + h + ":" + j;
            } else e = e ? 1e3 * parseInt(e) : new Date(b).getTime();
            var k = new Date(), l = k.getTime(), m = new Date().setHours(0, 0, 0, 0), n = parseInt(l) - parseInt(e), o = b;
            o = 0 < n && 36e5 > n ? parseInt(n / 6e4) + "分钟前" : 36e5 < n && 72e5 > n ? "1小时前" : 72e5 < n && e > m ? b && b.split(" ")[1] ? b.split(" ")[1].substr(0, 5) : "2小时前" : b.split(" ")[0] && b.split(" ")[0].substr(5, 5) && b.split(" ")[0].substr(5, 5).replace("-", "月") + "日 " + b.split(" ")[1], 
            a.time = b, a.FormatTime = o;
        }), b;
    }
    function c(a) {
        var b = (a + "").split("");
        return 1 >= b.length && b.splice(0, 0, "0"), b.join("");
    }
    var d = require("../utils/ppdog"), e = a(d), f = require("../utils/regenerator-runtime"), g = a(f);
    module.exports = function(a, c) {
        if (!a) return c(a);
        var d = a.news || a.relate_news;
        return d || a.idlist ? (d ? b(d) : a.idlist.forEach(function(a) {
            var c = a.newslist;
            b(c);
        }), c(a)) : c(a);
    };
})();