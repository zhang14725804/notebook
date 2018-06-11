Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = {
    buildQuery: function(e) {
        if ("string" == typeof e) return e;
        var t = {};
        if (e) for (var n in e) {
            var r = e[n];
            null != n && null != r && (t[encodeURIComponent(n)] = encodeURIComponent(r));
        }
        var o = "";
        for (var i in t) o.length > 0 && (o += "&"), o += i + "=" + t[i];
        return o;
    },
    parseQuery: function(e) {
        var t = {};
        if (!e) return e;
        for (var n in e) t[decodeURIComponent(n)] = decodeURIComponent(e[n]);
        return t;
    },
    parseUrlQueryStr: function(e) {
        for (var t = {}, n = e.split("&"), r = 0; r < n.length; ++r) {
            var o = n[r].split("=");
            if (null != o[0] && o[0].length > 0) {
                var i = o[1] || "";
                t[decodeURIComponent(o[0])] = decodeURIComponent(i);
            }
        }
        return t;
    },
    filterLink: function(e, t) {
        var n = e.split("//"), r = n[0].split(".")[0];
        return n.length > 1 && (r = n[1].split("/")[1].split(".")[0]), [ "subject", "promotion", "promotion_subject", "subjects", "goods", "mall_page", "spike" ].indexOf(r) < 0 ? t ? "spike" : "" : r;
    },
    urlDraw: function(e) {
        var t = {}, n = e.split("?").length > 1 ? e.split("?")[1] : "";
        return n && n.split("&").forEach(function(e) {
            t[e.split("=")[0]] = e.split("=")[1];
        }), t;
    }
};

exports.default = e;