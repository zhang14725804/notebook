function t(t) {
    var n = t / 30, e = 30 * Math.floor(n) + 1;
    return {
        start: e,
        end: e + 29
    };
}

var n = require("../../../module/request/request"), e = require("../../../module/fns");

module.exports = function(o, r) {
    r = r || function() {};
    var u = 0, a = null, d = {};
    return {
        timeupdate: function(i) {
            if (i = Math.round(i), u != i) if (u = i, d[i]) console.log("danmu:", i, "got data"), 
            d[i].forEach(r); else {
                var c = t(i);
                (a = a || e.delegator(function(t) {
                    n.vaccess("danmu", {
                        ddwTargetId: o,
                        dwStart: c.start,
                        dwEnd: c.end,
                        dwMaxCountPerSec: 2,
                        dwMaxCount: 45
                    }).then(function(n) {
                        if (!n.vComments) throw new Error("get danmu error: nodata");
                        d = {};
                        for (var e = c.start; e < c.end; e++) d[e] = [];
                        n.vComments.forEach(function(t) {
                            d[t.dwTimePoint].length >= 2 || d[t.dwTimePoint].push({
                                content: t.sContent,
                                id: t.ddwCommentId
                            });
                        }), a = null, t(null, n);
                    }).catch(t);
                }))(function(t) {
                    !t && d[i].forEach(r);
                });
            }
        }
    };
};