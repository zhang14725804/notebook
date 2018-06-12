function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function r(e, r) {
    if (!(e instanceof r)) throw new TypeError("Cannot call a class as a function");
}

function t(e, r, t, o, i) {
    var s = c.default.gUserData().visitkey;
    s ? n(s, e, r, t, o, i) : u().then(function(u) {
        n(u, e, r, t, o, i);
    });
}

function n(e, r, t, n, u, i) {
    var s = l.getCookie("pin"), a = {
        t: t,
        m: "MO_J2011-2",
        pin: s || "-",
        sid: e + "|" + r.visit_times,
        url: n,
        ref: u,
        rm: Date.now(),
        v: i ? JSON.stringify(r) : r.toString()
    }, c = new o();
    f.get({
        url: p.PTAG_URL,
        data: a,
        dataType: "text",
        priority: "REPORT"
    }).then(function(e) {
        var r = e.body, t = e.header;
        c.success(r, t);
    }, c.fail);
}

function o() {
    this.success = function(e, r) {
        console.log("#####################################response: [hermes success]-----------\x3e", e, r);
    }, this.fail = function(e) {};
}

function u() {
    return new v(function(e, r) {
        a.default.setVisitKey(s.wxaProxy(p.PTAG_URL), function(t) {
            t ? e(t) : r("");
        });
    });
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var i = function() {
    function e(e, r) {
        for (var t = 0; t < r.length; t++) {
            var n = r[t];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), 
            Object.defineProperty(e, n.key, n);
        }
    }
    return function(r, t, n) {
        return t && e(r.prototype, t), n && e(r, n), r;
    };
}(), s = function(e) {
    if (e && e.__esModule) return e;
    var r = {};
    if (null != e) for (var t in e) Object.prototype.hasOwnProperty.call(e, t) && (r[t] = e[t]);
    return r.default = e, r;
}(require("../../common/url_utils")), a = e(require("./report")), c = e(require("../../common/user_info")), f = require("../../common/request/request.js"), l = (require("../../common/http_constant.js"), 
require("../../common/cookie-v2/cookie.js")), p = require("../APIs.js"), v = require("../../libs/promise.min.js"), y = function() {
    function e() {
        r(this, e);
    }
    return i(e, null, [ {
        key: "reportPtag",
        value: function(e, r, n) {
            t(e, "wg_wx.000001", r, n);
        }
    }, {
        key: "reportPv",
        value: function(e, r, n) {
            t(e, "wg_wx.000000", r, n);
        }
    }, {
        key: "reportSearchExposure",
        value: function(e, r, n) {
            t(e, "wg_wx.000002", r, n, !0);
        }
    }, {
        key: "reportPtagExposure",
        value: function(e, r, n) {
            t(e, "wg_wx.000003", r, n);
        }
    }, {
        key: "reportUserShare",
        value: function(e, r, n) {
            t(e, "wg_wx.000007", r, n);
        }
    } ]), e;
}();

exports.default = y;