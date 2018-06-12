(function() {
    function a(a) {
        return a && a.__esModule ? a : {
            default: a
        };
    }
    function b(a, b, c) {
        return b in a ? Object.defineProperty(a, b, {
            value: c,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : a[b] = c, a;
    }
    function c(a) {
        var c = {
            ids: a.ids,
            headline: []
        };
        return a.news.forEach(function(a) {
            var d, e = (d = {
                id: a.id,
                img: a.thumbnails[0],
                source: a.source,
                time: a.time,
                timestamp: a.timestamp,
                title: a.title,
                type: a.flag
            }, b(d, "type", a.flag), b(d, "articletype", a.articletype), b(d, "url", ""), d);
            c.headline.push(e);
        }), c;
    }
    function d(a, b) {
        var c = [], d = [], e = {
            hasnext: a.has_more
        }, g = /【(.+)】/, h = /(\x1e\[\S+\s\S+\]\x1e)|(\x1e\[\S+[\s|\S]*\S+\]\x1e)/g;
        return a.list.forEach(function(a) {
            var e, i = a.content, j = i.match(h), k = [];
            i.match(g) && (e = i.match(g)[1], i = i.substr(e.length + 2)), i = i.replace(h, function(a) {
                var c = a.split(" ")[0].substr(2), e = a.split(" ")[1];
                e = e.substr(0, e.length - 2);
                var g = f(c, e, b);
                return k.push(g), d.push(c), e;
            }), c.push({
                id: a.publish_id,
                title: e,
                content: i,
                stocks: k,
                time: a.created_at,
                source: ""
            });
        }), e.news = c, e.stocklist = d, e;
    }
    function e(a, b) {
        var c = a.data, d = a.symbolsName, e = {}, g = [], h = [];
        d.forEach(function(a) {
            e[a.symbol] = a.name;
        });
        var i = {
            isend: 0,
            optional: [],
            total_num: a.total_num,
            total_page: a.total_page
        };
        return c.forEach(function(a) {
            var c = f(a.symbol, e[a.symbol], b);
            h.push({
                id: a.id,
                type: a.type,
                title: a.title,
                source: a.src,
                time: a.time,
                stocks: [ c ]
            }), g.push(a.symbol);
        }), i.stocklist = g, i.optional = h, i;
    }
    function f(a, b) {
        var c = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : {}, d = a.substr(0, 2), e = c[a], f = {
            m: {
                sh: 0,
                sz: 1,
                hk: 2
            }[d],
            c: a.substr(2),
            n: b,
            state: "",
            zdf: "--",
            cls: "",
            symbol: a,
            namelen: g(b)
        };
        return e && (f.zdf = 0 < e.ChgRatio ? "+" + e.ChgRatio : e.ChgRatio, f.state = {
            D: "退市",
            S: "停牌",
            U: "未上市",
            Z: "停牌"
        }[e.Status] || "", f = h(f, e)), f;
    }
    function g(a) {
        var b, c;
        for (c = 0, b = 0; b < a.length; b++) 0 <= a.charCodeAt(b) && 255 >= a.charCodeAt(b) ? 0 != b % 2 && ++c : ++c;
        return b == 2 * c && (c += 1), c;
    }
    var h = Object.assign || function(a) {
        for (var b, c = 1; c < arguments.length; c++) for (var d in b = arguments[c], b) Object.prototype.hasOwnProperty.call(b, d) && (a[d] = b[d]);
        return a;
    }, i = require("../utils/ppdog"), j = a(i), k = require("../utils/regenerator-runtime"), l = a(k);
    module.exports = function(a, b) {
        var f = a.data, g = a.key, i = a.cachedQtData;
        if (0 != f.code) return {
            retcode: f.code
        };
        var j;
        return 1 === g ? j = c(f.data) : 2 === g ? j = d(f.data, i) : 3 === g ? j = e(f.data, i) : void 0, 
        j = h(j, {
            retcode: 0,
            retmsg: ""
        }), b(j);
    };
})();