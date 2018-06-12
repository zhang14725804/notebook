(function() {
    function a(a) {
        return a && a.__esModule ? a : {
            default: a
        };
    }
    var b = Math.round, c = require("../utils/ppdog"), d = a(c), e = require("../utils/regenerator-runtime"), f = a(e), g = require("../utils/is"), h = a(g), i = {
        D: "退市",
        S: "停牌",
        U: "未上市",
        Z: "停牌"
    };
    module.exports = function(a, b) {
        var c;
        return c = a.qt ? a.qt : a, Object.keys(c).forEach(function(a) {
            var b = c[a], d = Object.keys(b);
            d.forEach(function(a) {
                b[a] = void 0 == l[a] ? l.Other.call(null, b[a]) : l[a].call(null, b);
            }), b.Updown = l.Updown.call(null, b), b.fmPostions = l.fmPostions.call(null, b);
        }), b(a);
    };
    var j = Array.prototype.slice, l = {
        Code: function() {
            var a = j.call(arguments, 0)[0];
            return "us" == a.Market ? a.Code.replace(/\.[OQNAM]+$/, "") : a.Code;
        },
        Status: function() {
            var a = j.call(arguments, 0)[0];
            return "0" !== a.Status && "" != a.Status ? i[a.Status] : "";
        },
        Price: function() {
            var a = j.call(arguments, 0)[0];
            return "0" !== a.Status && "" != a.Status ? a.PrevClose : a.Price;
        },
        Open: function() {
            var a = j.call(arguments, 0)[0];
            return "0" !== a.Status && "" != a.Status ? a.PrevClose : a.Open;
        },
        Amp: function() {
            var a = j.call(arguments, 0)[0];
            return a.Amp ? a.Amp + "%" : "--";
        },
        LimitDown: function() {
            var a = j.call(arguments, 0)[0];
            return "0" !== a.Status && "" != a.Status ? "--" : .01 == +a.LimitDown ? "--" : a.LimitDown ? a.LimitDown : "--";
        },
        LimitUp: function() {
            var a = j.call(arguments, 0)[0];
            return "0" !== a.Status && "" != a.Status ? "--" : 0 > +a.LimitUp ? "--" : a.LimitUp ? a.LimitUp : "--";
        },
        TurnoverRate: function() {
            var a = j.call(arguments, 0)[0];
            return 0 < +a.TurnoverRate ? a.TurnoverRate + "%" : "0";
        },
        DY: function() {
            var a = j.call(arguments, 0)[0];
            return 0 < +a.DY ? a.DY + "%" : "--";
        },
        IB: function() {
            var a = j.call(arguments, 0)[0], b = a.IB ? parseFloat(a.IB) : 0, c = "--";
            return 0 != b && (1e4 < b ? c = (b / 1e4).toFixed(2).replace(/0$|\.00/, "") + "万" : c = b), 
            c;
        },
        OB: function() {
            var a = j.call(arguments, 0)[0], b = a.OB ? parseFloat(a.OB) : 0, c = "--";
            return 0 != b && (1e4 < b ? c = (b / 1e4).toFixed(2).replace(/0$|\.00/, "") + "万" : c = b), 
            c;
        },
        Vol: function() {
            var a = j.call(arguments, 0)[0], b = a.Vol ? parseFloat(a.Vol) : 0, c = "0";
            if (0 != b) {
                if (1e8 < b) {
                    var d = b / 1e8;
                    c = 1e4 < d ? d.toFixed(0) + "亿" : d.toFixed(2).replace(/0$|\.00/, "") + "亿";
                } else if (1e4 < b) {
                    var e = b / 1e4;
                    c = 1e3 < e ? e.toFixed(0) + "万" : e.toFixed(2).replace(/0$|\.00/, "") + "万";
                } else c = b.toFixed(2).replace(/0$|\.00/, "");
                c = c.replace(/0$|\.00/, ""), c += /us|hk/.test(a.Market) ? "股" : "手";
            }
            return c;
        },
        Turnover: function() {
            var a = j.call(arguments, 0)[0], b = a.Turnover ? parseFloat(a.Turnover) : 0;
            if (/us/.test(a.Market) || 0 == b) return "--";
            var c;
            return 1e8 < b ? (c = (b / 1e8).toFixed(2), c = c.replace(/0$|\.00/, ""), c += /sh|sz/.test(a.Market) ? "万亿" : a.isZS ? "万亿" : "亿") : 1e4 < b ? (c = (b / 1e4).toFixed(2), 
            c = c.replace(/0$|\.00/, ""), c += /sh|sz/.test(a.Market) ? "亿" : a.isZS ? "亿" : "万") : (c = b.toFixed(2), 
            c = c.replace(/0$|\.00/, ""), c += /sh|sz/.test(a.Market) ? "万" : a.isZS ? "万" : ""), 
            c;
        },
        CS: function() {
            var a = j.call(arguments, 0)[0], c = "hk" == a.Market ? a.MktCap_H : a.CS, d = +c;
            return 0 == d ? "--" : 1 < d ? b(d) + "亿" : 1 > d ? b(100 * d) / 100 + "亿" : void 0;
        },
        MktCap_H: function() {
            var a = j.call(arguments, 0)[0], c = +a.MktCap_H;
            return 0 == c ? "--" : 1 < c ? b(c) + "亿" : 1 > c ? b(100 * c) / 100 + "亿" : void 0;
        },
        MktCap_AH: function() {
            var a = j.call(arguments, 0)[0], c = +a.MktCap_AH;
            return 0 == c ? "--" : 1 < c ? b(c) + "亿" : 1 > c ? b(100 * c) / 100 + "亿" : void 0;
        },
        CSIC: function() {
            var a = j.call(arguments, 0)[0];
            return 0 == +a.CSIC ? "--" : b(a.CSIC) + "亿";
        },
        Chg: function() {
            var a = j.call(arguments, 0)[0];
            return 0 < +a.Chg ? "+" + a.Chg : "" + a.Chg;
        },
        ChgRatio: function() {
            var a = j.call(arguments, 0)[0];
            return 0 < +a.ChgRatio ? "+" + a.ChgRatio + "%" : a.ChgRatio + "%";
        },
        TimeStamp: function() {
            var a = j.call(arguments, 0)[0];
            if (h.default.empty(a.TimeStamp)) return "--";
            switch (a.Market) {
              case "sh":
              case "sz":
                return a.TimeStamp.slice(4, 6) + "-" + a.TimeStamp.slice(6, 8) + " " + a.TimeStamp.slice(8, 10) + ":" + a.TimeStamp.slice(10, 12) + ":" + a.TimeStamp.slice(12, 14);

              case "hk":
                return a.TimeStamp.slice(5, 16).replace("/", "-");

              case "us":
                return a.TimeStamp.slice(5, 19);

              default:
                return "";
            }
        },
        Updown: function() {
            var a = j.call(arguments, 0)[0], b = +a.Chg;
            return "0" !== a.Status && "" != a.Status ? "" : 0 < b ? "up" : 0 > b ? "down" : "";
        },
        PE: function() {
            var a = j.call(arguments, 0)[0], b = +a.PE;
            return 0 < b ? b : "--";
        },
        fmPostions: function() {
            var a = j.call(arguments, 0)[0], b = [];
            if (-1 != [ "sh", "sz" ].indexOf(a.Market) && a.AP1) {
                var c, d, e, f, g = +a.PrevClose, h = [ 1, 2, 3, 4, 5 ];
                h.forEach(function(h) {
                    c = "卖" + h, d = a["AP" + h], e = a["AS" + h], f = d > g ? "--up" : d < g ? "--down" : "", 
                    b.unshift({
                        t: c,
                        p: d,
                        v: e,
                        updown: 0 == +d ? "" : f
                    });
                }), h.forEach(function(h) {
                    c = "买" + h, d = a["BP" + h], e = a["BS" + h], f = d > g ? "--up" : d < g ? "--down" : "", 
                    b.push({
                        t: c,
                        p: d,
                        v: e,
                        updown: 0 == +d ? "" : f
                    });
                });
            }
            return 0 === b.length && (b = [ {
                updown: "",
                p: "--",
                t: "卖5",
                v: "--"
            }, {
                updown: "",
                p: "--",
                t: "卖4",
                v: "--"
            }, {
                updown: "",
                p: "--",
                t: "卖3",
                v: "--"
            }, {
                updown: "",
                p: "--",
                t: "卖2",
                v: "--"
            }, {
                updown: "",
                p: "--",
                t: "卖1",
                v: "--"
            }, {
                updown: "",
                p: "--",
                t: "买1",
                v: "--"
            }, {
                updown: "",
                p: "--",
                t: "买2",
                v: "--"
            }, {
                updown: "",
                p: "--",
                t: "买3",
                v: "--"
            }, {
                updown: "",
                p: "--",
                t: "买4",
                v: "--"
            }, {
                updown: "",
                p: "--",
                t: "买5",
                v: "--"
            } ]), b;
        },
        Other: function() {
            var a = j.call(arguments, 0)[0];
            return h.default.empty(a) ? "--" : a;
        }
    };
})();