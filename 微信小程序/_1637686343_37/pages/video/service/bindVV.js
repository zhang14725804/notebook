function t() {
    o({
        t: "15"
    });
}

function n() {
    o({
        t: "1"
    });
}

function e() {
    l && clearTimeout(l), l = setTimeout(function t() {
        l = setTimeout(t, r), "END" != a && "PAUSE" != a && (15 === ++m || 75 === m ? o({
            t: "2",
            tm: Math.min(m, 60)
        }) : (m - 75) % 120 == 0 && (o({
            t: "2",
            tm: 120
        }), m = 75));
    }, r);
}

function u() {
    o({
        t: "13"
    });
}

function i() {
    var t = 0;
    m >= 75 ? t = m - 75 : m >= 15 ? t = m - 15 : m > 0 && (t = m), t && (o({
        t: "2",
        tm: t
    }), m = 75);
}

function o(t) {
    c.default.send(Object.assign({}, d, t));
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var c = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../../../common/pingback/vv")), r = 1e3, f = !0, a = "PLAY", l = null, s = null, m = 0, d = {};

exports.default = {
    bind: function(o) {
        o && (o.on("ready", function() {
            f = !0, a = "PLAY", clearTimeout(l), m = 0, t();
        }), o.on("play", function() {
            a = "PLAY";
        }), o.on("pause", function() {
            clearTimeout(s), s = setTimeout(function() {
                "PAUSE" === a && i();
            }, 1e3), a = "PAUSE";
        }), o.on("timeupdate", function(t) {
            f && t.detail.currentTime > 0 && (n(), e(), f = !1);
        }), o.on("ended", function() {
            a = "END", i(), u();
        }));
    },
    init: function(t) {
        d = Object.assign({
            purl: "wx_player",
            c1: "",
            ht: "",
            r: "",
            ra: 1,
            rfr: ""
        }, t || {});
    }
};