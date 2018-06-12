var e = require("../../../lib-inject").Promise, i = require("./data/ad"), o = require("./data/getinfo");

module.exports = function(n, r) {
    n = n || {}, r = r || {};
    var t = n.vid, d = n.cid, f = n.from, u = n.openid, a = n.defn, c = n.noad, v = n.chid, l = "function" == typeof r.onBeforeGetinfo ? r.onBeforeGetinfo : function() {};
    return e.all([ -1 == [ "v4138" ].indexOf(f) || c ? e.resolve({}) : i({
        coverid: d,
        vid: t,
        live: 0,
        chid: v || 41,
        pu: 1,
        openid: u || ""
    }), o(t, f, a, {
        onBeforeGetinfo: l
    }) ]).then(function(e) {
        return {
            ad: e[0],
            videoinfo: e[1]
        };
    });
};