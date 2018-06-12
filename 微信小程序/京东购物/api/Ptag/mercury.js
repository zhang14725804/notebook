function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function r(e, r) {
    if (!(e instanceof r)) throw new TypeError("Cannot call a class as a function");
}

function n(e, r, n, u, i, s) {
    var c = a.default.gUserData().visitkey;
    c ? o(c, e, r, n, u, i, s) : t().then(function(t) {
        o(t, e, r, n, u, i, s);
    });
}

function t() {
    return new y(function(e, r) {
        c.default.setVisitKey(s.wxaProxy(p.PTAG_URL), function(n) {
            n ? e(n) : r("");
        });
    });
}

function o(e, r, n, t, o, i, s) {
    i && (o = i);
    var c = {
        t: r || "",
        v: n.toString(),
        ref: o,
        pin: l.getCookie("pin") || "",
        visitkey: e,
        source: void 0 === t ? "" : t
    }, a = new u();
    f.get({
        url: p.GUESS_YOU_LIKE_URL,
        data: c,
        dataType: "text",
        priority: "REPORT"
    }).then(function(e) {
        var r = e.body, n = e.header;
        a.success(r, n);
    }, a.fail);
}

function u() {
    this.success = function(e, r) {
        console.log("#####################################response: [mercury success]-----------\x3e", e, r);
    }, this.fail = function(e) {
        console.log("#####################################response: [mercury error]-----------\x3e", e);
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var i = function() {
    function e(e, r) {
        for (var n = 0; n < r.length; n++) {
            var t = r[n];
            t.enumerable = t.enumerable || !1, t.configurable = !0, "value" in t && (t.writable = !0), 
            Object.defineProperty(e, t.key, t);
        }
    }
    return function(r, n, t) {
        return n && e(r.prototype, n), t && e(r, t), r;
    };
}(), s = function(e) {
    if (e && e.__esModule) return e;
    var r = {};
    if (null != e) for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (r[n] = e[n]);
    return r.default = e, r;
}(require("../../common/url_utils")), c = e(require("./report")), a = e(require("../../common/user_info")), f = require("../../common/request/request.js"), l = require("../../common/cookie-v2/cookie.js"), p = require("../APIs.js"), y = require("../../libs/promise.min.js"), v = function() {
    function e() {
        r(this, e);
    }
    return i(e, null, [ {
        key: "reportGuessyouLike",
        value: function(e, r, t, o, u, i) {
            n(e, r, t, o, u, i);
        }
    } ]), e;
}();

exports.default = v;