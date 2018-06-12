function t() {
    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "", r = e.exec(t);
    if (r) return {
        source: r[0],
        protocol: r[1],
        slash: r[2],
        host: r[3],
        port: r[4],
        path: r[5],
        query: r[6],
        hash: r[7]
    };
}

var e = /^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/, r = [ "wxa.jd.com", "wq.360buyimg.com" ], o = [ "ddsearch.jd.com", "suit.3.cn/suit", "hk.jd.com/notice" ];

module.exports = {
    parse: t,
    toSocketURI: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "", r = t(e);
        if (!r) return e;
        var o = r.host.split("."), n = "";
        switch (r.host) {
          case "wq.360buyimg.com":
            n = o[1];
            break;

          default:
            n = o[0];
        }
        return e.replace(new RegExp("http(s)?://" + r.host), "/" + n);
    },
    toGBKURI: function() {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "";
        return "https://wxa.jd.com/api.php?url=" + encodeURIComponent(t.replace(/^https/, "http"));
    },
    toProxyURI: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "", o = t(e);
        if (!o) return e;
        if (-1 != r.findIndex(function(t) {
            return t == o.host;
        })) return e;
        var n = o.host.split(".");
        return e.replace(o.host, "wxa.jd.com/" + n[0]);
    },
    checkSpacialDomain: function(t) {
        for (var e = 0, r = o.length; e < r; e++) if (~t.indexOf(o[e])) return !0;
        return !1;
    }
};