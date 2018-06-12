function e(e) {
    if (e && e.__esModule) return e;
    var t = {};
    if (null != e) for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
    return t.default = e, t;
}

function t(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function r(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
}, a = function() {
    function e(e, t) {
        for (var r = 0; r < t.length; r++) {
            var n = t[r];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), 
            Object.defineProperty(e, n.key, n);
        }
    }
    return function(t, r, n) {
        return r && e(t.prototype, r), n && e(t, n), t;
    };
}(), o = t(require("./hermes")), u = e(require("../APIs")), i = e(require("../../common/url_utils")), l = t(require("./report_manager")), f = require("./v"), c = e(require("./Ptag_constants")), d = function() {
    function e() {
        r(this, e);
    }
    return a(e, null, [ {
        key: "addPtag",
        value: function(e, t) {
            (0, f.initAppReport)().then(function(r) {
                t && "object" == (void 0 === t ? "undefined" : n(t)) ? Object.assign(t, r) : t = r;
                var a = l.default.getCurrentPageUrl(), c = l.default.getRerrerUrl(), d = new f.ClickV(i.wxaProxy(u.PTAG_URL), a, e, t);
                o.default.reportPtag(d, a, c);
            });
        }
    }, {
        key: "addSearchPageRelatedKWDPtag",
        value: function(t, r, n, a) {
            var o = {
                key: t,
                relatedkey: r,
                number: n,
                type: a
            };
            e.addPtag(c.SEARCH_RELATED_KWD, o);
        }
    }, {
        key: "tabbarReport",
        value: function() {
            var t = l.default.getCurrentPageUrl(), r = l.default.getRerrerUrl(), n = !1, a = !1, o = "", u = {
                "/pages/index/index": "7574.1.1",
                "/pages/cate/cate": "7574.1.2",
                "/pages/gwq/index": "7574.1.3",
                "/pages/cart/cart/index": "7574.1.4",
                "/pages/my/index/index": "7574.1.5"
            };
            for (var i in u) -1 !== t.indexOf(i) && (n = !0, o = u[i]), -1 !== r.indexOf(i) && (a = !0);
            n && a && o && e.addPtag(o);
        }
    } ]), e;
}();

exports.default = d;