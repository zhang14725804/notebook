(function() {
    function a(a) {
        return a && a.__esModule ? a : {
            default: a
        };
    }
    function b(a) {
        var b = +a;
        return 0 < b ? "red" : 0 > b ? "green" : "";
    }
    function c(a) {
        var b = +a;
        return 0 < b ? "+" + b.toFixed(2) + "%" : b.toFixed(2) + "%";
    }
    function d(a) {
        var b = +a;
        return 0 < b ? "+" + b.toFixed(2) : b.toFixed(2);
    }
    function e(a, e) {
        var f, g, h = r[e.get("Status")];
        return "zdf" == a ? (f = e.get("ChgRatio"), g = c(f), g = h || g) : "zde" == a ? (f = e.get("Chg"), 
        g = d(f), g = h || g) : "sz" == a && (e = e.set("CS", 100 == e.get("Mkt") ? e.get("MktCap_H") : e.get("CS")), 
        f = e.get("Chg"), g = 0 == +e.get("CS") ? "--" : e.get("CS")), e.set("Color", b(f)).set("Updown", b(f)).set("Area", g);
    }
    function f(a, b) {
        var c = {};
        return c.isShow = "us-gp" == b && "us" == a.get("Market") || "hk-gp" == b && "hk" == a.get("Market") || ("cn-gp" != b || /us|hk/.test(a.get("Market")) ? "all" == b : !0), 
        -1 == [ "jj", "nq" ].indexOf(a.get("Market")) && /GP|ZS/.test(a.get("Type")) && "sh881637" !== a.get("Symbol") || (c.isShow = !1), 
        a.merge((0, p.Map)(c));
    }
    function g(c, a, b, d) {
        var e, f;
        "zxj" == b ? (e = +c.get("Price"), f = +a.get("Price")) : "zdf" == b ? (e = +c.get("ChgRatio"), 
        f = +a.get("ChgRatio")) : "zde" == b ? (e = +c.get("Chg"), f = +a.get("Chg")) : "sz" == b && (e = +c.get("CS"), 
        f = +a.get("CS"));
        var g = "0" !== c.get("Status") && "" != c.get("Status"), h = "0" !== a.get("Status") && "" != a.get("Status");
        if ("sz" != b) {
            if (!0 == g && !1 == h) return 1;
            if (!1 == g && !0 == h) return -1;
            if (!0 == g && !0 == h) {
                if ("退市" == c.ChgRatio && "停牌" == a.ChgRatio) return -1;
                if ("停牌" == c.ChgRatio && "退市" == a.ChgRatio) return 1;
            }
        }
        if ("sz" === b) {
            if ("ZS" != c.get("Type") && "ZS" == a.get("Type")) return -1;
            if ("ZS" == c.get("Type") && "ZS" != a.get("Type")) return 1;
            if (0 != e && 0 == f) return -1;
            if (0 == e && 0 != f) return 1;
        }
        return "up" == d ? e > f ? 1 : -1 : e < f ? 1 : -1;
    }
    function h() {
        return /android/i.test(getApp().SystemInfo.system);
    }
    function i(a) {
        var b = {
            NameStyle: function() {
                var b = a.get("Name") ? o.default.strLen(a.get("Name")) : 0;
                return "hk" == a.get("Market") && 7 < b ? "stocklist__tr__cell__name--smaller" : 11 <= b ? "stocklist__tr__cell__name--smallest" : 222 > b && 9 <= b ? "stocklist__tr__cell__name--smaller" : 9 > b && 7 <= b ? "stocklist__tr__cell__name--small" : "stocklist__tr__cell__name";
            }(),
            isMkShow: -1 != [ "hk", "us" ].indexOf(a.get("Market"))
        };
        return b;
    }
    var j = require("../utils/ppdog"), k = a(j), l = require("../utils/regenerator-runtime"), m = a(l), n = require("../utils/Tool"), o = a(n), p = require("../libs/immutable"), q = 200, r = {
        D: "退市",
        S: "停牌",
        U: "未上市",
        Z: "停牌"
    };
    module.exports = function(a, b) {
        var c = a.sortData, d = c.type, j = c.updown, k = c.areaSort, l = c.mkSort, m = c.priceUpdown, n = c.dropUpdown, o = {
            all: 0,
            "cn-gp": 0,
            "hk-gp": 0,
            "us-gp": 0
        }, r = a.listData.map(function(a) {
            var b = e(k, a);
            return l && (b = f(b, l)), b;
        });
        d && "" != j && (r = r.sort(function(c, a) {
            return g(c, a, d, j);
        }));
        var s = 0, t = h();
        t && (q = 60), r = r.map(function(a) {
            var b = Math.round, c = (a.get("isShow") ? s++ : -1).toString(), d = {};
            if (d.Index = c, d.tapped = !1, c >= q && (d.isShow = !1), "sz" == k) {
                var e = +a.get("CS");
                0 == e ? (d.Area = "--", d.Color = "", d.Updown = "") : 1 < e ? d.Area = b(e) + "亿" : 1 > e && (d.Area = b(100 * e) / 100 + "亿");
            }
            return "us" === a.get("Market") ? o["us-gp"]++ : "hk" === a.get("Market") ? o["hk-gp"]++ : o["cn-gp"]++, 
            o.all++, a.merge((0, p.Map)(d), (0, p.Map)(i(a)));
        });
        var u = o.all > q;
        return b({
            listData: r,
            mkNum: o,
            limitTip: {
                limitNum: q,
                show: u
            }
        });
    };
})();