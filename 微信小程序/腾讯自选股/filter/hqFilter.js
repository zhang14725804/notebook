(function() {
    function a(a) {
        return a && a.__esModule ? a : {
            default: a
        };
    }
    function b(a) {
        return a.forEach(function(a, b, c) {
            var d = "";
            0 < a.zd ? (d = "up", c[b].zdf = "+" + c[b].zdf, c[b].zd = "+" + c[b].zd) : 0 > a.zd && (d = "down"), 
            c[b].code = a.code.replace(".", ""), c[b].Updown = d, c[b].zdf += "%";
        }), 3 < a.length ? [ [ a[0], a[1], a[2] ], [ a[3], a[4], a[5] ] ] : [ [ a[0], a[1], a[2] ] ];
    }
    function c(a, b) {
        return a.forEach(function(a, c, d) {
            0 < a.bd_zdf ? (d[c].Updown = "up", d[c].bd_zdf = "+" + d[c].bd_zdf) : 0 > a.bd_zdf ? d[c].Updown = "down" : (d[c].bd_zdf = (a.bd_zdf + "").replace("-", ""), 
            d[c].Updown = ""), 0 < a.nzg_zdf && (d[c].nzg_zdf = "+" + d[c].nzg_zdf), d[c].bd_zdf += "%", 
            d[c].nzg_zdf += "%", d[c].mkt = b;
        }), a;
    }
    function d(a) {
        var b = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : !0;
        return a.forEach(function(a, c, d) {
            var f = a.code.substring(0, 2);
            /^hk/i.test(f) || /^us/i.test(f) || (f = ""), b && (0 < a.zdf ? (d[c].Updown = "up", 
            d[c].zdf = "+" + a.zdf) : 0 > a.zdf ? d[c].Updown = "down" : (d[c].zdf = (a.zdf + "").replace("-", ""), 
            d[c].Updown = "")), d[c].Spc = f.toUpperCase(), d[c].zdf += "%", d[c].zf += "%", 
            d[c].hsl += "%";
            var g = a.name ? e(a.name) : 0, h = "";
            7 == g || 8 == g ? h = "small" : 9 == g || 10 == g ? h = "smaller" : 10 < g && (h = "smallest"), 
            "hk" == f && 7 < g && (h = "smaller"), d[c].nameSize = h;
            var i = +a.cje;
            d[c].cje = 1e8 <= i ? 100 * (i / 1e8).toFixed(2) / 100 + "亿" : 1e4 <= i ? 100 * (i / 1e4).toFixed(1) / 100 + "万" : 1e3 * i.toFixed(0) / 1e3, 
            d[c].showCode = a.code.slice(2).split(".")[0];
        }), a;
    }
    function e(a) {
        var b, c;
        for (c = 0, b = 0; b < a.length; b++) 0 <= a.charCodeAt(b) && 255 >= a.charCodeAt(b) ? 0 == b % 2 && ++c : ++c;
        return b == 2 * c && (c += 1), c;
    }
    var f = require("../utils/ppdog"), g = a(f), h = require("../utils/regenerator-runtime"), i = a(h);
    module.exports = function(a, b) {
        var c = a.fnName, d = j[c] && j[c](a);
        return b(d);
    };
    var j = {}, k = {
        averatio: {
            title: "热门板块",
            itemid: 0,
            keyword: "zdf",
            type: "averatio",
            order: 0
        },
        chr0: {
            title: "涨幅榜",
            itemid: 1,
            keyword: "zdf",
            type: "ranka/chr0",
            order: 0
        },
        chr1: {
            title: "跌幅榜",
            itemid: 2,
            keyword: "zdf",
            type: "ranka/chr1",
            order: 1
        },
        trunrl: {
            title: "换手率榜",
            itemid: 3,
            keyword: "hsl",
            type: "ranka/trunr",
            order: 0
        },
        dtzf: {
            title: "振幅榜",
            itemid: 4,
            keyword: "zf",
            type: "ranka/dtzf",
            order: 0
        },
        hk_industry_list: {
            title: "热门行业",
            itemid: 5,
            keyword: "zdf",
            type: "hk_industry_list",
            order: 0
        },
        main_all_desc: {
            title: "主板涨幅榜",
            itemid: 6,
            keyword: "zdf",
            type: "main_all0",
            order: 0
        },
        main_all_asc: {
            title: "主板跌幅榜",
            itemid: 7,
            keyword: "zdf",
            type: "main_all1",
            order: 1
        },
        main_all_amount_desc: {
            title: "主板成交额榜",
            itemid: 8,
            keyword: "cje",
            type: "main_all_amount",
            order: 0
        },
        gem_all_desc: {
            title: "创业板涨幅榜",
            itemid: 9,
            keyword: "zdf",
            type: "gem_all0",
            order: 0
        },
        gem_all_asc: {
            title: "创业板跌幅榜",
            itemid: 10,
            keyword: "zdf",
            type: "gem_all1",
            order: 1
        },
        gem_all_amount_desc: {
            title: "创业板成交额榜",
            itemid: 11,
            keyword: "cje",
            type: "gem_all_amount",
            order: 0
        },
        zgg: {
            title: "中概股",
            itemid: 12,
            keyword: "zdf",
            type: "zgg",
            order: 0
        },
        ustec: {
            title: "美股科技股",
            itemid: 13,
            keyword: "zdf",
            type: "ustec",
            order: 0
        }
    };
    j.hq = function(a) {
        var e, f = a.mkt, g = !1, h = a.data.mkt_stat;
        return "Hs" == f ? (g = h && "close" == h.sh, e = {
            mkt: "hs",
            hszsData: b(a.data.zs),
            chr0: {
                titem: k.chr0,
                data: d(a.data["ranka/chr/0"])
            },
            chr1: {
                titem: k.chr1,
                data: d(a.data["ranka/chr/1"])
            },
            dtzf: {
                titem: k.dtzf,
                data: d(a.data["ranka/dtzf/0"], !1)
            },
            trunrl: {
                titem: k.trunrl,
                data: d(a.data["ranka/trunrl/0"], !1)
            },
            averatio1: c(a.data["01/averatio/0"].splice(0, 3), "Hs"),
            averatio2: c(a.data["02/averatio/0"].splice(0, 3), "Hs"),
            close: g
        }, e.averatio = {
            titem: k.averatio,
            data: e.averatio1.concat(e.averatio2)
        }) : "Hk" == f ? (g = h && "close" == h.hk, e = {
            mkt: "hk",
            hkzsData: b(a.data.zs),
            hk_industry_list: {
                titem: k.hk_industry_list,
                data: c(a.data.hk_industry_list, "Hk")
            },
            main_all_desc: {
                titem: k.main_all_desc,
                data: d(a.data.main_all_desc)
            },
            main_all_asc: {
                titem: k.main_all_asc,
                data: d(a.data.main_all_asc)
            },
            main_all_amount_desc: {
                titem: k.main_all_amount_desc,
                data: d(a.data.main_all_amount_desc, !1)
            },
            gem_all_desc: {
                titem: k.gem_all_desc,
                data: d(a.data.gem_all_desc)
            },
            gem_all_asc: {
                titem: k.gem_all_asc,
                data: d(a.data.gem_all_asc)
            },
            gem_all_amount_desc: {
                titem: k.gem_all_amount_desc,
                data: d(a.data.gem_all_amount_desc, !1)
            },
            close: g
        }) : "Us" == f && (g = h && "close" == h.us, e = {
            mkt: "us",
            uszsData: b(a.data.zs),
            zgg: {
                titem: k.zgg,
                data: d(a.data.zgg)
            },
            ustec: {
                titem: k.ustec,
                data: d(a.data.ustec)
            },
            close: g
        }), e;
    }, j.hqRanking = function(a) {
        var b = a.data, c = a.keyword;
        return a.list = d(b, "cje" != c && "zf" != c && "hsl" != c), a;
    }, j.hqRemen = function(a) {
        var b = a.data, d = a.kw;
        return a.rsData = {
            list: c(b)
        }, a;
    };
})();