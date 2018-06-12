(function() {
    function a(a) {
        return a && a.__esModule ? a : {
            default: a
        };
    }
    function b(a) {
        var b = {
            "<": "&#60;",
            ">": "&#62;",
            '"': "&#34;",
            "'": "&#39;",
            "&": "&#38;"
        };
        return a.replace(/&(?![\w#]+;)|[<>"']/g, function(a) {
            return b[a];
        });
    }
    function c(a) {
        var c = a.content.text, d = a.attribute, e = [], f = [], g = /<!--\s*(\w+)\s*-->/, h = /<a[^>]*>[^>]+<\/a>/g, i = /<P>/, j = [], k = [], l = c.split(g);
        return l.forEach(function(a) {
            if (a && "<P>" != a && "</P>" != a && "" != a) {
                var c = d && d[a];
                if (!c) a.split(i).forEach(function(a) {
                    var b = /[<\/P> | <strong> | <STRONG> | <\/STRONG> | <H1> | <\/H1>]/g, c = a.replace(b, ""), d = [];
                    if ("" != a || "" != c) {
                        var f = a.match(h);
                        a.split(h).forEach(function(a, c) {
                            if (d.push({
                                type: "word",
                                text: a.replace(b, "")
                            }), f && f.length) {
                                var g = f[c];
                                try {
                                    var h = g.split("stock://")[1].split('">')[0].split("/");
                                    d.push({
                                        type: "stock",
                                        symbol: h[0],
                                        name: h[1]
                                    }), e.push(h[0]);
                                } catch (a) {}
                            }
                        }), j.push({
                            type: "plain",
                            text: d
                        });
                    }
                }); else if (/^IMG_/.test(a)) {
                    var g = 690 < c.width ? 690 : c.width, l = c.height / c.width * g;
                    j.push({
                        type: "image",
                        src: b(c.url || ""),
                        width: g,
                        height: l,
                        attribute: c,
                        title: b(c.desc || "")
                    }), k.push(b(c.url || ""));
                } else if (/^VIDEO_/.test(a)) j.push({
                    type: "video",
                    vid: b(c.vid || ""),
                    vimg: b(c.img || ""),
                    vdesc: b(c.desc || ""),
                    width: c.width,
                    height: c.height
                }); else if (/^STOCK_/.test(a)) f.push(c.name), e.push(b(c.code)), j.push({
                    type: "stock",
                    symbol: b(c.code),
                    name: b(c.name)
                }); else {
                    var m = a.replace(/<\P>/g, "");
                    "" != m && j.push({
                        type: "plain",
                        text: a.replace(/<\P>/g, "")
                    });
                }
            }
        }), {
            content: j,
            stocks: e,
            images: k
        };
    }
    var d = require("../utils/ppdog"), e = a(d), f = require("../utils/regenerator-runtime"), g = a(f);
    module.exports = function(a, b) {
        var d = a.content.text;
        a.stockInfo && 0 != a.stockInfo.length && (a.hasStock = !0);
        var e = /[\u4E00-\u9FA5]/gi;
        a.allEnglish = !e.exec(d);
        var f = c(a);
        return a.contentArr = f.content, a.stockName = f.stockName, a.stocks = f.stocks, 
        a.images = f.images, b(a);
    };
})();