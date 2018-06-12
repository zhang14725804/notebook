var n = require("../../../lib-inject").Promise, e = require("../../lib/message"), t = require("../../classes/Content");

module.exports = function(o, i, r) {
    var u = {
        time: 0,
        duration: 0,
        skipable: !1
    }, a = {}, c = {}, f = [], d = n.defer(), s = d.promise, l = new e(), p = null, m = function(n) {
        console.log("contentchange:", n, c);
        var e = {
            currentContent: n = n || p,
            preloadContents: f.filter(function(e) {
                return !c[e.id] && e != n;
            }),
            getinforaw: h.raw
        };
        n && n.isad && (e.progress = u), p = n, r(e);
    }, v = o.ad, h = o.videoinfo, g = !1;
    (v.adList || []).forEach(function(e) {
        var o = e(), i = new t({
            url: o.url,
            duration: o.duration,
            isad: !0
        }), r = new n(function(n) {
            g || (i.on("end", function() {
                n(), o.onEnd();
            }, !0), i.on("error", function() {
                n(), o.onError();
            }, !0), i.on("timeout", function() {
                n(), o.onError();
            }, !0), i.on("skip", function() {
                g = !0, n(), o.onSkip();
            }, !0), i.on("start", function() {
                l.emit("adplaying", i), o.onStart();
            }, !0), i.on("timeupdate", function(n) {
                o.onTimeupdate(n);
            }, !0), l.on("_terminate", function() {
                n();
            }));
        }).then(function(n) {
            return c[i.id] = !0, n;
        });
        a[i.id] = i, f.push(i), u.duration += o.duration, u.skipable = o.skipable, s = s.then(function() {
            return console.info("playflow: ad." + o.url), "1" == o.oid ? (console.log("这是一个空单，往下走"), 
            void o.onReportEmpty()) : (m(i), r.then(function(n) {
                u.time += i.duration;
            }));
        });
    });
    var w = new t({
        url: h.url,
        duration: h.duration,
        filesize: h.filesize,
        isad: !1,
        preview: h.preview,
        charged: h.charged
    });
    a[w.id] = w, f.unshift(w);
    var y = new n(function(n, e) {
        function t(t) {
            !o && t.on("start", function() {
                l.emit("videoplaying", t), o = !0;
            }, !0), t.on("start", function() {
                l.emit("videostart", t);
            }), t.on("play", function() {
                l.emit("videoplay", t);
            }), t.on("pause", function() {
                l.emit("videopause", t);
            }), t.on("timeupdate", function(n) {
                l.emit("videotimeupdate", n, h.duration);
            }), t.on("error", function(n) {
                var t = new Error(n ? n.detail && n.detail.errMsg || n.message : "播放出错");
                t.code = "P.0", e(t);
            }, !0), t.on("end", n, !0), t.on("timeout", function(n) {
                l.emit("videotimeout", n);
            });
        }
        var o = !1;
        t(w), l.on("_terminate", function() {
            n();
        }), l.on("_changevideocontent", function(n) {
            w.off(), c[w.id] = !0, f.every(function(e, t) {
                return e != w || (f.splice(t, 1, n), !1);
            }), t(n), m(p == w ? n : null), a[n.id] = n, w = n;
        });
    }).then(function(n) {
        return c[w.id] = !0, n;
    });
    s = s.then(function() {
        return w.off("change"), w.on("change", function() {
            m(w);
        }), l.on("_changevideocontent", function(n) {
            w.off("change"), n.on("change", function() {
                m(n);
            });
        }), m(w), y;
    }).then(function() {
        l.emit("end");
    }).catch(function(n) {
        throw l.emit("error", n), n;
    }), m(null);
    var E = {
        progress: s,
        stop: function() {
            return l.emit("_terminate"), l.emit("terminate"), Object.keys(a).forEach(function(n) {
                a[n].off();
            }), l.off(), this;
        },
        start: function() {
            return d.resolve(), s;
        },
        on: function() {
            return l.on.apply(l, arguments);
        },
        switchVideo: function(n) {
            var e = n.videoinfo;
            h = e;
            var o = new t({
                url: e.url,
                duration: e.duration,
                filesize: e.filesize,
                isad: !1,
                preview: e.preview,
                charged: e.charged
            });
            l.emit("_changevideocontent", o);
        }
    };
    return [ "End", "Play", "Pause", "Timeupdate", "Error", "Skip" ].forEach(function(n) {
        i.on("content" + n.toLowerCase(), function(e) {
            for (var t = e && a[e] ? a[e] : p, o = arguments.length, i = Array(o > 1 ? o - 1 : 0), r = 1; r < o; r++) i[r - 1] = arguments[r];
            t && t["onContent" + n].apply(t, i);
        });
    }), E;
};