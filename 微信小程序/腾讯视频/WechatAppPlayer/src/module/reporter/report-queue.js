var e = require("../../../lib-inject").request;

module.exports = function(t) {
    function n(t) {
        ~t.reportUrl.indexOf("btrace.qq.com") ? e(t.reportUrl).then(function() {
            r.release();
        }).catch(function() {
            r.onReport && r.onReport(t);
        }) : r.onReport && r.onReport(t), c = setTimeout(function() {
            r.release();
        }, o);
    }
    var r, o = 3e3, u = !1, i = [], c = null;
    return r = {
        release: function(e) {
            u && e && e != u || (u = !1, clearTimeout(c), i.length && n(i.shift()));
        },
        push: function(e) {
            u ? i.push(e) : (u = e, n(e));
        }
    };
}();