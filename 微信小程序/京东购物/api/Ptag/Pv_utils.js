function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function r(e, r) {
    if (!(e instanceof r)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = function() {
    function e(e, r) {
        for (var t = 0; t < r.length; t++) {
            var a = r[t];
            a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), 
            Object.defineProperty(e, a.key, a);
        }
    }
    return function(r, t, a) {
        return t && e(r.prototype, t), a && e(r, a), r;
    };
}(), a = require("./v"), n = e(require("../../common/url_utils")), u = e(require("./hermes")), o = e(require("./mercury")), i = e(require("../APIs")), l = (function(e) {
    if (e && e.__esModule) return e;
    var r = {};
    if (null != e) for (var t in e) Object.prototype.hasOwnProperty.call(e, t) && (r[t] = e[t]);
    r.default = e;
}(require("./Ptag_constants")), e(require("../../common/fe_report/usability"))), s = function() {
    function e() {
        r(this, e);
    }
    return t(e, null, [ {
        key: "addPv",
        value: function(e, r, t) {
            var o = n.default.wxaProxy(i.default.PTAG_URL);
            (0, a.initAppReport)().then(function(i) {
                var l = new a.PageV(o, e, "", i);
                if (t) {
                    for (var s in t) t.hasOwnProperty(s) && (l[s] = t[s]);
                    t.isItem && t.sku_id && (e = n.default.addUrlParam(e, {
                        sku: t.sku_id
                    }));
                }
                u.default.reportPv(l, e, r);
            });
        }
    }, {
        key: "addSearchExposure",
        value: function(e, r, t) {
            (0, a.initAppReport)().then(function(o) {
                t.sf_url = "http://wq.jd.com/wxapp/pages/index/index";
                var l = n.default.wxaProxy(i.default.PTAG_URL);
                Object.assign(t, o);
                var s = new a.SearchExposureV(l, e, t);
                u.default.reportSearchExposure(s, e, r);
            });
        }
    }, {
        key: "addPtagExposure",
        value: function(e, r, t) {
            var o = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {};
            (0, a.initAppReport)().then(function(l) {
                var s = n.default.wxaProxy(i.default.PTAG_URL);
                Object.assign(o, l);
                var f = new a.ItemExposureV(s, e, t, o);
                u.default.reportPtagExposure(f, e, r);
            });
        }
    }, {
        key: "addGuessyouLikeReport",
        value: function(e, r) {
            var t = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
            if (1 == t.action && t.clk && 1 == t.source) {
                var u = t.clk.replace(/http\b/, "https");
                wx.request({
                    url: u
                }), l.default.umpBiz({
                    bizid: 749,
                    operation: t.operation || 1,
                    result: 0,
                    message: ""
                }), delete t.operation, delete t.clk;
            } else (0, a.initAppReport)().then(function(u) {
                var l = n.default.wxaProxy(i.default.GUESS_YOU_LIKE_URL);
                Object.assign(t, u);
                var s = t.t, f = t.source, p = t.insteadRef;
                0 === t.action && (t.action = "0"), delete t.t, delete t.source, delete t.insteadRef;
                var d = new a.GuessyouLikeV(l, e, t);
                o.default.reportGuessyouLike(s, d, f, r, p, t);
            });
        }
    }, {
        key: "addUserShareReport",
        value: function(e, r) {
            var t = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}, o = n.default.wxaProxy(i.default.PTAG_URL);
            (0, a.initAppReport)().then(function(n) {
                var i = new a.UserShareV(o, e, n);
                if (t) for (var l in t) t.hasOwnProperty(l) && (i[l] = t[l]);
                i.report_type = "user_share", u.default.reportUserShare(i, e, r);
            });
        }
    } ]), e;
}();

exports.default = s;