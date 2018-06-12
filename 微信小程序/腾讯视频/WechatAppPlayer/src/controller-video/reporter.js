function n(n) {
    return {
        1: 1,
        2: 1,
        10001: 4,
        10002: 3,
        10003: 2,
        10201: 4,
        10202: 3,
        10203: 2,
        100001: 2,
        320089: 2,
        320091: 3,
        320092: 4,
        320093: 5
    }[n];
}

function e(n) {
    var e = !1, o = function() {
        e || (e = !0, n.done = e, n.apply(this, arguments));
    };
    return o.done = e, o;
}

var o = require("./report-play"), t = require("../module/reporter/index"), r = [ 5, 30 ];

module.exports = function(a, i) {
    function u() {
        return {
            iformat: d ? d.dltype : 0,
            duration: d ? Math.floor(d.duration) : "",
            defn: d ? n(d.fmid) : "",
            playtime: s + (l ? Date.now() - l : 0),
            vid: c || "",
            cid: v || ""
        };
    }
    var l, c = a.vid, v = a.cid, f = i.getReportParam || function(n) {
        return n({});
    }, d = null, p = 0, s = 0, m = !1, w = !1, y = e(function(n) {
        var e = u();
        e.val1 = 0, e.val2 = 0, e.val3 = n, e.videourl = n, o(7, e, f);
    }), D = e(function(n) {
        var e = u();
        e.val1 = p ? Date.now() - p : 0, e.val2 = m ? 0 : 1, e.val3 = n, e.videourl = n, 
        o(6, e, f);
    }), h = e(function(n, e) {
        var t = u();
        t.val1 = p ? Date.now() - p : 0, t.val2 = {
            error: 3,
            complete: 1,
            incomplete: w ? 2 : 0
        }[n], void 0 == t.val2 && (t.val2 = 2), t.val3 = e, o(5, t, f);
    }), g = null, C = e(function(n, e) {
        t.reportCache.del("step30");
        var r = u();
        r.val1 = n, r.val2 = e, o(30, r, f);
    }), q = function(n, e) {
        if (1e4 == n) {
            g = setTimeout(function() {
                C(n);
            }, 11e3);
            var r = u();
            r.val1 = n, r.val2 = e, o(30, r, f, function(n, e) {
                t.reportCache.set("step30", e);
            });
        } else clearTimeout(g), C(n);
    };
    return o(3, u(), f), t.on("_save", function() {
        var n = u();
        n.val1 = p ? Date.now() - p : 0, n.val2 = w ? 2 : 0, o(5, n, f, function(n, e) {
            t.reportCache.set("step5", e);
        });
    }), t.on("_restore", function() {
        r.forEach(function(n) {
            t.reportCache.del("step" + n);
        });
    }), {
        setPlayFlow: e(function(n) {
            n.on("adplaying", function(n) {
                m = !0, y(n.url);
            }), n.on("videoplay", function(n) {
                !p && (p = Date.now()), l = Date.now();
            }), n.on("videoplaying", function(n) {
                w = !0, D(n.url), q(p ? Date.now() - p : 0, 0);
            }), n.on("videopause", function() {
                s += Date.now() - l, l = 0;
            }), n.on("videotimeout", function(n) {
                q(n, 1);
            }), n.on("terminate", function() {
                h("incomplete");
            }), n.on("end", function() {
                h("complete");
            }), n.on("error", function(n) {
                h("error", "1 " + (n.code || "") + " " + n.message);
            });
        }),
        setVideoInfo: e(function(n) {
            d = n;
        }),
        error: function(n) {
            h("error", "2 " + (n.code || "") + " " + n.message);
        }
    };
};