(function() {
    function a(a) {
        return a && a.__esModule ? a : {
            default: a
        };
    }
    function b(a, b) {
        var c = {};
        return Object.keys(a).forEach(function(d) {
            var e = a[d], f = o.exec(d)[0], g = c[f] || (c[f] = function() {
                var a = h(f);
                return 0 === b.length ? a : b.reduce(function(b, c) {
                    return b.push(a[c]), b;
                }, []);
            }());
            a[d] = e.reduce(function(a, b, c) {
                return void 0 === g[c] ? a : (a[g[c]] = b, a);
            }, {});
        }), a;
    }
    function c() {
        for (var a = [], b = {}, c = 0; c < arguments.length; c++) for (var d, e = 0; e < arguments[c].length; e++) d = arguments[c][e], 
        b[d] || (b[d] = 1, a.push(d));
        return a;
    }
    function d(a) {
        var b = {
            symbol: [],
            key: []
        };
        if ("object" !== ("undefined" == typeof a ? "undefined" : i(a))) "string" == typeof a && (b.symbol = [ a ], 
        b.key = []); else if (a.hasOwnProperty("symbol") && (b.symbol = a.symbol), a.hasOwnProperty("key") && Array.isArray(a.key)) {
            var d = a.key, e = a.symbol, f = e.reduce(function(a, b) {
                var e = o.exec(b)[0], f = g(e), h = d.filter(function(a) {
                    return void 0 !== f[a];
                }), i = h.map(function(a) {
                    return f[a];
                });
                return a = c(a, i), a.sort();
            }, []);
            b.key = f;
        }
        return b;
    }
    function e(a) {
        if (/^us/.test(a)) {
            var b = a.split(".");
            return 2 < b.length ? (b.pop(), b = b.join("__")) : "us" === b[0] ? b = b.join("") : b = b.shift().replace(".", "__"), 
            p[b] = a, b;
        }
        return p[a] = a, a;
    }
    function f(a) {
        var b = {};
        for (var c in a) b[a[c]] = c;
        return b;
    }
    function g(a) {
        return {
            sh: u,
            sz: u,
            nq: u,
            hk: v,
            r_hk: v,
            us: w,
            jj: y,
            s_jj: x
        }[a];
    }
    function h(a) {
        return {
            sh: z,
            sz: z,
            nq: z,
            hk: A,
            r_hk: A,
            us: B,
            jj: C,
            s_jj: D
        }[a];
    }
    Object.defineProperty(exports, "__esModule", {
        value: !0
    });
    var i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(a) {
        return typeof a;
    } : function(a) {
        return a && "function" == typeof Symbol && a.constructor === Symbol && a !== Symbol.prototype ? "symbol" : typeof a;
    }, j = require("../utils/ppdog"), k = a(j), l = require("../utils/regenerator-runtime"), m = a(l), n = "https://proxyplus.finance.qq.com/sqt/utf8/fmt=json&", o = /^(sh|sz|hk|r_hk|jj|s_jj|us|nq)/, p = {}, q = 0, r = null;
    exports.default = {
        getEmpty: function(a) {
            var b = o.exec(a)[0], c = g(b), d = {};
            return Object.keys(c).forEach(function(a) {
                d[a] = "--";
            }), d;
        },
        get: function(a) {
            r = d(a);
            var c = r.symbol.slice(), f = r.key.slice();
            if (0 !== c.length) {
                for (var g = (n + "q=").length, h = 0 === f.length ? "" : "&offset=" + f.map(function(a) {
                    return +a + 1;
                }).join(","), i = "&r=" + Math.random() + q++, j = 2083 - g - h.length - i.length, l = [], m = -1, o = 0; 0 < c.length; ) {
                    var s = c[0], u = s.length + 1;
                    o > u ? (l[m].push(e(s)), o -= u, c.shift()) : (m += 1, l.push([]), o = j);
                }
                var v = l.map(function(a) {
                    return k.default.wx.request({
                        url: n + "q=" + a.join(",") + h + i
                    }).then(function(c) {
                        var d = a.reduce(function(a, b) {
                            return a[p[b]] = c.data[b], a;
                        }, {});
                        d = b(d, f), t.set(d);
                    });
                });
                return k.default.all(v).then(function() {
                    return t.getData();
                }).catch(function(a) {
                    console.log("getqt err ", a), getApp().Event.emit("operateStockNetworkError");
                });
            }
        },
        qtFmt: function(a, c) {
            var d = o.exec(a)[0], e = h(d);
            r = {
                symbol: [ a ],
                key: Object.keys(e)
            };
            var f = {};
            return f[a] = c, t.set(b(f, r.key)), t.getData();
        }
    };
    var s = {}, t = {
        set: function(a) {
            var b = this;
            Object.keys(a).forEach(function(c) {
                b.setData(c, a[c]);
            });
        },
        setData: function(a, b) {
            s[a] = b;
        },
        getData: function() {
            if (null === r) return {};
            var a = r.symbol, b = r.key;
            return a.reduce(function(a, c) {
                var d = o.exec(c)[0], e = h(d);
                return 0 === b.length && (b = Object.keys(e)), a[c] = b.reduce(function(a, b) {
                    var d = e[b];
                    return d && (a[d] = s[c] && s[c][d] || ""), a;
                }, {}), "r" === c.charAt(0) ? (a[c].Symbol = c.substring(2), a[c].Market = c.substr(2, 2)) : (a[c].Symbol = c, 
                a[c].Market = c.substr(0, 2)), a;
            }, {});
        }
    }, u = {
        Mkt: 0,
        Name: 1,
        Code: 2,
        Price: 3,
        PrevClose: 4,
        Open: 5,
        Vol: 6,
        OB: 7,
        IB: 8,
        BP1: 9,
        BS1: 10,
        BP2: 11,
        BS2: 12,
        BP3: 13,
        BS3: 14,
        BP4: 15,
        BS4: 16,
        BP5: 17,
        BS5: 18,
        AP1: 19,
        AS1: 20,
        AP2: 21,
        AS2: 22,
        AP3: 23,
        AS3: 24,
        AP4: 25,
        AS4: 26,
        AP5: 27,
        AS5: 28,
        Uptodate: 29,
        TimeStamp: 30,
        Chg: 31,
        ChgRatio: 32,
        High: 33,
        Low: 34,
        _Price: 35,
        _Vol: 36,
        Turnover: 37,
        TurnoverRate: 38,
        PE: 39,
        Status: 40,
        _High: 41,
        _Low: 42,
        Amp: 43,
        CSIC: 44,
        CS: 45,
        _Change: 46,
        LimitUp: 47,
        LimitDown: 48,
        VolRate: 49
    }, v = {
        Mkt: 0,
        Name: 1,
        Code: 2,
        Price: 3,
        PrevClose: 4,
        Open: 5,
        Vol: 6,
        OB: 7,
        IB: 8,
        BP1: 9,
        BS1: 10,
        BP2: 11,
        BS2: 12,
        BP3: 13,
        BS3: 14,
        BP4: 15,
        BS4: 16,
        BP5: 17,
        BS5: 18,
        AP1: 19,
        AS1: 20,
        AP2: 21,
        AS2: 22,
        AP3: 23,
        AS3: 24,
        AP4: 25,
        AS4: 26,
        AP5: 27,
        AS5: 28,
        Uptodate: 29,
        TimeStamp: 30,
        Chg: 31,
        ChgRatio: 32,
        High: 33,
        Low: 34,
        Nominal: 35,
        _Vol: 36,
        Turnover: 37,
        TurnoverRate: 38,
        PE: 39,
        Status: 40,
        _High: 41,
        _Low: 42,
        Amp: 43,
        MktCap_H: 44,
        MktCap_AH: 45,
        EName: 46,
        DY: 47,
        WK52_High: 48,
        WK52_Low: 49,
        _Change: 50
    }, w = {
        Mkt: 0,
        Name: 1,
        Code: 2,
        Price: 3,
        PrevClose: 4,
        Open: 5,
        Vol: 6,
        IB: 7,
        OB: 8,
        BP1: 9,
        BS1: 10,
        BP2: 11,
        BS2: 12,
        BP3: 13,
        BS3: 14,
        BP4: 15,
        BS4: 16,
        BP5: 17,
        BS5: 18,
        AP1: 19,
        AS1: 20,
        AP2: 21,
        AS2: 22,
        AP3: 23,
        AS3: 24,
        AP4: 25,
        AS4: 26,
        AP5: 27,
        AS5: 28,
        Uptodate: 29,
        TimeStamp: 30,
        Chg: 31,
        ChgRatio: 32,
        High: 33,
        Low: 34,
        Color: 35,
        _Vol: 36,
        Turnover: 37,
        TurnoverRate: 38,
        PE: 39,
        Status: 40,
        _High: 41,
        _Low: 42,
        Amp: 43,
        CSIC: 44,
        CS: 45,
        EName: 46,
        EPS: 47,
        WK52_High: 48,
        WK52_Low: 49,
        _Change: 50
    }, x = {
        Code: 0,
        Name: 1,
        ExpDate: 2,
        IOPV: 3,
        ACCIOPV: 4,
        ACCIOPVGR: 5,
        Chg: 6,
        ADJIOPV: 7,
        M3_ROR: 8,
        M3_RORRank: 9,
        Y1_ROR: 10,
        Y1_RORRank: 11,
        Y2_MSRank: 12,
        FundManager: 13,
        M1_ROR: 14,
        M1_RORRank: 15,
        Purchase: 16,
        Redeem: 17,
        FundType: 18,
        FundStyle: 19,
        InvestStyle: 20,
        FundShares: 21,
        NetWorth: 22,
        FundAdvisor: 23,
        FundCustodian: 24,
        ManagingCosts: 25,
        FoundingDate: 26,
        WanFen: 27,
        QiRi: 28
    }, y = {
        Code: 0,
        Name: 1,
        Valuation: 2,
        ValChgRatio: 3,
        ValTime: 4,
        IOPV: 5,
        ACCIOPV: 6,
        ACCIOPVGR: 7,
        IOPVTime: 8
    }, z = f(u), A = f(v), B = f(w), C = f(u), D = f(x);
    module.exports = exports["default"];
})();