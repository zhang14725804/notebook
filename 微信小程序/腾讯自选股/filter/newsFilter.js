(function() {
    function a(a) {
        return a && a.__esModule ? a : {
            default: a
        };
    }
    function b(a) {
        var b = [], c = /<a[^>]*>[^>]+<\/a>/g, d = /<P>/, e = [];
        if (a && "<P>" != a && "</P>" != a && "" != a) {
            var f = a, g = /[<\/P> | <strong> | <STRONG> | <\/STRONG> | <H1> | <\/H1>]/g, h = f.replace(g, ""), i = [];
            if ("" != f || "" != h) {
                var j = f.match(c);
                f.split(c).forEach(function(a, c) {
                    if (i.push({
                        type: "text",
                        info: a.replace(g, "")
                    }), j && j.length) {
                        var d = j[c];
                        try {
                            var e = d.split("stock://")[1].split('">')[0].split("/");
                            i.push({
                                type: "stock",
                                symbol: e[0],
                                name: e[1]
                            }), b.push(e[0]);
                        } catch (a) {}
                    }
                }), e = i;
            }
            return {
                content: e
            };
        }
    }
    var c = Object.assign || function(a) {
        for (var b, c = 1; c < arguments.length; c++) for (var d in b = arguments[c], b) Object.prototype.hasOwnProperty.call(b, d) && (a[d] = b[d]);
        return a;
    }, d = require("../utils/ppdog"), e = a(d), f = require("../utils/regenerator-runtime"), g = a(f);
    module.exports = function(a, b) {
        var c = a.data, d = a.keyword, e = h[d] && h[d](c);
        return b(e);
    };
    var h = {
        getNewsCon: function(a) {
            var b = {};
            if ("ne" == a.newsId.substr(0, 2)) for (var c in b.title = a.cltitle, b.date = a.pubtime, 
            b.src = a.source && "string" == typeof a.source ? a.source : "", b.content = [], 
            a.content) ("text" == a.content[c].type || "img" == a.content[c].type) && ("text" === a.content[c].type && (a.content[c].info = a.content[c].info.replace(/&nbsp;/g, " ")), 
            b.content.push(a.content[c])); else {
                if (console.log("研报公告"), a = a[0], b.title = a.title, b.src = a.jgmc && "string" == typeof a.jgmc ? a.jgmc : "", 
                b.date = a.time, b.url = a.url ? a.url : "", /^https?:\/\//.test(a.detail)) b.content = [], 
                b.pdfOnly = !!a.pdf && ".HTM" != a.pdf.substr(-4); else {
                    var d = a.detail.split("\n");
                    b.content = d.map(function(a) {
                        return {
                            info: a,
                            type: "text"
                        };
                    });
                }
                b.pdf = a.pdf ? a.pdf : null;
            }
            return b;
        },
        getRelatedNews: function(a) {
            var b = [], c = new Date().getFullYear().toString();
            return a.data.forEach(function(a) {
                if ("6" == a.articletype) {
                    var d = a.id.split("-")[0];
                    if (!/kuaibao/.test(d)) return void console.log("过滤掉非快报类型:", a.title);
                }
                var e = a.id.substr(0, 2), f = "";
                "re" == e ? f = "【研报】" : "no" == e && (f = "【公告】");
                var g = new Date(), h = g.getFullYear() + "-" + +(g.getMonth() + 1) + "-" + g.getDate(), i = -1 < a.time.indexOf(c) ? a.time.slice(5, 10) : a.time.slice(0, 10);
                i = -1 < a.time.indexOf(h) ? a.time.slice(11, 16) : i;
                var j = {
                    id: a.id,
                    src: a.src,
                    date: i,
                    url: "",
                    title: f + a.title,
                    articletype: a.articletype
                };
                b.push(j);
            }), b;
        },
        getKuaiXun: function(a) {
            var d = c({}, a, {
                date: a.pubtime,
                url: a.orgurl
            });
            a.stockcode && 0 != a.stockcode.length && (d.hasStock = !0);
            var e = [];
            return a.formatContent.forEach(function(a) {
                if ("cnt_article" == a.type) {
                    var c = b(a.desc);
                    e.push({
                        content: c.content,
                        type: a.type
                    });
                }
            }), d.kuaixun = !0, d.content = e, d;
        }
    };
})();