function e(e) {
    var r = e.jp.length >= 4 && e.dpicon && 0 != e.dpicon.icon && 0 != e.paicon && 6 != e.paicon, t = e.jp.length > 5 && e.dpicon && 0 != e.dpicon.icon && 6 != e.paicon;
    return r || t;
}

function r() {
    for (var r = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [], t = 0; t < r.length - 1; t += 2) e(r[t]) || e(r[t + 1]) ? (r[t].hasClsDoublePrice = !0, 
    r[t + 1].hasClsDoublePrice = !0) : (r[t].hasClsDoublePrice = !1, r[t + 1].hasClsDoublePrice = !1);
}

function t(e) {
    var r = e.tp, t = e.yd;
    if (r && t) {
        var n = r.s === t.start && r.e === t.end, o = u.unix(+r.s).format("M.D") + "-" + u.unix(+r.e).format("M.D"), a = u.unix(+t.start).format("M.D") + "-" + u.unix(+t.end).format("M.D");
        return n ? {
            yd: {
                content: t.content,
                url: i.getImg(t.url)
            },
            tp: {
                c: r.c,
                p: r.p,
                date: o
            }
        } : u().isBetween(u.unix(+t.start), u.unix(+t.end)) ? {
            yd: {
                content: t.content + "（" + a + "）",
                url: i.getImg(t.url)
            }
        } : {
            tp: {
                c: r.c,
                p: r.p,
                date: o
            }
        };
    }
    if (r && !t) {
        var c = u.unix(+r.s).format("M.D") + "-" + u.unix(+r.e).format("M.D");
        return {
            tp: {
                c: r.c,
                p: r.p,
                date: c
            }
        };
    }
    if (!r && t) {
        var s = u.unix(+t.start).format("M.D") + "-" + u.unix(+t.end).format("M.D");
        return {
            yd: {
                content: t.content + "（" + s + "）",
                url: i.getImg(t.url)
            }
        };
    }
    return null;
}

var n = require("../../common/request/request"), i = require("../../common/utils"), o = require("../../common/fe_helper.js"), a = require("../../common/biz"), c = require("../../common/cookie-v2/cookie"), u = require("../../libs/moment.min"), s = require("../../libs/promise.min.js");

module.exports = {
    getConfig: function() {
        var e = {
            enable: 0
        }, r = i.getPageUrl().route;
        return a.getPPMS(33214).then(function(t) {
            var n = t.find(function(e) {
                return e.page == r;
            }) || e;
            return Object.assign(e, n, {
                cornerMark: i.getImg(n.cornerMark)
            }), s.resolve(e);
        }, function(e) {
            return s.reject(e);
        });
    },
    getRecommendList: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        return Object.assign(e, {
            hi: "visitkey:" + c.getCookie("visitkey") + ",pin:" + c.getCookie("pin") + ",openid:" + c.getCookie("open_id") + ",page:" + e.pi
        }), n.get({
            url: "https://wq.jd.com/mcoss/reclike/getrecinfo",
            data: e,
            expire: "5m"
        }).then(function(e) {
            var n = e.body;
            return n.success ? (n.data.forEach(function(e, r) {
                e.img = o.getImg(e.img), e.psp = t(e);
            }), r(n.data), s.resolve({
                list: n.data,
                impr: n.impr
            })) : s.reject(new Error("message:" + n.error_msg));
        });
    },
    isCartPage: function(e) {
        var r = i.getPageUrl().route;
        return "pages/cart/cart/cart" === r || "pages/cart/cart/index" === r;
    },
    getVParams: function(e, r) {
        var t = r, n = new RegExp(e + "=([^$|&]*)"), i = t.substr(t.indexOf("?") + 1).match(n);
        return null != i ? i[1] : "";
    },
    setClsDoublePrice: r
};