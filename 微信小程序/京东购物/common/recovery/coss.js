function e(e) {
    return e.replace("//wq.jd.com/mcoss/", "//wqcoss.jd.com/mcoss/");
}

function s(s) {
    if (!i && 1 != o.open || !s || !t.length) return s;
    for (var n = 0, l = t.length; n < l; n++) {
        var u = t[n];
        if (e(s).indexOf(u.cgiUrl) > -1) {
            if (i || "1" == o.recoveryAll || c < u.vk) try {
                return r(u, s);
            } catch (e) {
                return console.warn("createRecoverUrl:" + e), s;
            }
            break;
        }
    }
    return s;
}

function r(e, s) {
    if ("md5" == e.recoveryType) {
        if (!l._coss_cgi_recovery) return s;
        var r = s.split("/"), o = r[r.length - 2], t = r[r.length - 1].split("?")[0], i = s.split("?")[1], c = {}, a = i.split("&").map(function(e) {
            var s = (e = decodeURIComponent(e)).split("=")[0];
            if ("show_new" == t && "gids" == s) {
                var r = e.split("=")[1];
                (r = r.split("|")).sort(), c[s] = s + "=" + r.join("|");
            } else if ("show_new" == t && "pcs" == s) {
                var o = e.split("=")[1];
                (o = o.split(",")).sort(), c[s] = s + "=" + o.join(",");
            } else if ("batchkeywordsearch" == t && "pcs" == s) {
                var i = e.split("=")[1];
                (i = i.split(",")).sort(), c[s] = s + "=" + i.join(",");
            } else if ("detai" == t && "seckillids" == s) {
                var n = e.split("=")[1];
                (n = n.split("|")).sort(), c[s] = s + "=" + n.join("|");
            } else c[s] = e;
            return s;
        }), v = u[o] || [];
        (a = a.filter(function(e) {
            return v.some(function(s) {
                return e == s;
            });
        })).sort();
        var d = a.reduce(function(e, s, r) {
            return e + "_" + c[s].replace(/[,:;|/=]/g, "_");
        }, "mcoss_" + o + "_" + t);
        console.log("[Coss Recovery] md5Str: ", d);
        var p = n.md5.getHash(d), f = (c[e.pKey] || "").split("=")[1];
        return "focusbi" == o && "show_new" == t && (f = f.split("|")[0]), "brandseckill" == o && "detail" == t && (f = f.split("|")[0]), 
        "seckill" == o && "pingou" == t && (o = "pingou_v0"), "//wqs.jd.com/data/coss/recovery/" + o + "2/" + f + "/" + p + ".shtml?" + i;
    }
    return s;
}

var o = void 0, t = void 0, i = void 0, c = 0, n = {
    md5: {
        getHash: require("../../libs/md5.js").hexMD5
    }
}, l = {
    _coss_cgi_recovery: null
}, u = void 0;

module.exports = {
    setCossConfigData: function(e) {
        l._coss_cgi_recovery = e, u = e, console.log("[Coss Recovery] _coss_cgi_recovery: ", e);
    },
    setPpmsConfigData: function(e) {
        t = (o = e).rules || [], console.log("[Coss Recovery] cgiRule: ", o);
    },
    getCossRecovery: function(e) {
        if (!u || !o) return e;
        var r = !1, t = e;
        return 0 === (e = s(e)).indexOf("//wqs.jd.com/data/coss/recovery/") && (r = !0, 
        e = "https:" + e, console.log("[Coss Recovery] didRecover, src: " + t + " ; dist: " + e)), 
        {
            url: e,
            didRecover: r
        };
    }
};