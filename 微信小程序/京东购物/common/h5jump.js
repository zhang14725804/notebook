function e(e) {
    if (-1 != e.indexOf("//pro.m.jd.com") || -1 != e.indexOf("//h5.m.jd.com") || -1 != e.indexOf("//h5static.m.jd.com")) {
        var a = void 0, r = void 0, t = void 0;
        t = (a = e.split("#"))[1] || "", -1 != (r = (a = a[0].split("?"))[1] || "").indexOf("wxAppName=") ? r = r.replace(/wxAppName=[^&]*/, "wxAppName=jd") : r += (r && "&" != r.substr(-1) ? "&" : "") + "wxAppName=jd", 
        e = a[0] + "?" + r + (t ? "#" + t : "");
    }
    return e;
}

var a = function() {
    function e(e, a) {
        var r = [], t = !0, o = !1, p = void 0;
        try {
            for (var i, s = e[Symbol.iterator](); !(t = (i = s.next()).done) && (r.push(i.value), 
            !a || r.length !== a); t = !0) ;
        } catch (e) {
            o = !0, p = e;
        } finally {
            try {
                !t && s.return && s.return();
            } finally {
                if (o) throw p;
            }
        }
        return r;
    }
    return function(a, r) {
        if (Array.isArray(a)) return a;
        if (Symbol.iterator in Object(a)) return e(a, r);
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
    };
}(), r = require("./utils.js"), t = require("./cookie-v2/cookie.js"), o = {}, p = {
    "wqitem.jd.com/item/view": {
        params: {
            sku: "sku",
            ptag: "ptag"
        },
        url: "/pages/item/detail/detail"
    },
    "wq.jd.com/mcoss/wxportal/mainentry": {
        params: {
            ptag: "ptag"
        },
        url: "/pages/index/index"
    },
    "wqs.jd.com/portal/wx/seckill_v2/index.shtml": {
        params: {
            ptag: "ptag"
        },
        url: "/pages/seckill/index/index"
    },
    "wqs.jd.com/portal/wx/seckill_v2/category.shtml": {
        params: {
            cgid: "seckill_cgid",
            ptag: "ptag"
        },
        url: "/pages/seckill/category/category"
    },
    "wqs.jd.com/portal/wx/seckill_v2/brand.shtml": {
        params: {
            ptag: "ptag"
        },
        url: "/pages/seckill/brand/brand"
    },
    "wqs.jd.com/portal/wx/seckill_v2/cate.shtml": {
        params: {
            ptag: "ptag"
        },
        url: "/pages/seckill/cate/cate"
    },
    "wqs.jd.com/portal/wx/seckill_v2/branddetail.shtml": {
        params: {
            id: "seckillid",
            ptag: "ptag"
        },
        wxaPrams: {
            pageType: "brand"
        },
        url: "/pages/seckill/detail/detail"
    },
    "wqs.jd.com/portal/wx/seckill_v2/catedetail.shtml": {
        params: {
            id: "seckillid",
            ptag: "ptag"
        },
        wxaPrams: {
            pageType: "cate"
        },
        url: "/pages/seckill/detail/detail"
    },
    "wqdeal.jd.com/deal/mshopcart/mycart": {
        params: {
            ptag: "ptag"
        },
        url: "/pages/cart/cart/index"
    },
    "wqs.jd.com/portal/wx/category_m.shtml": {
        params: {
            ptag: "ptag"
        },
        url: "/pages/cate/cate"
    },
    "wqs.jd.com/my/coupon/coupon_center_v3_wx.shtml": {
        params: {
            ptag: "ptag"
        },
        url: "/pages/coupon/index"
    },
    "wqsou.jd.com/search/searchn": {
        params: {
            key: "key",
            ptag: "ptag"
        },
        url: "/pages/search/list/list"
    },
    "wq.jd.com/search/searchco": {
        params: {
            coupon_batch: "batch",
            coupon_kind: "kind",
            ptag: "ptag"
        },
        url: "/pages/search/subPackages/coupon/coupon"
    },
    "wqs.jd.com/my/indexv2.shtml": {
        params: {
            ptag: "ptag"
        },
        url: "/pages/my/index/index"
    },
    "wqs.jd.com/order/orderlist_merge.shtml": {
        params: {
            ptag: "ptag"
        },
        url: "/pages/order/list/list"
    },
    "wqs.jd.com/portal/wx/tuan/pingouv3.shtml": {
        params: {
            ptag: "ptag"
        },
        url: "/pages/pingou/index/index"
    },
    "wqs.jd.com/my/coupon/index.shtml": {
        params: {
            ptag: "ptag"
        },
        url: "/pages/my/coupon/coupon"
    },
    "wqs.jd.com/promote/201801/bean/index.html": {
        params: {
            ptag: "ptag"
        },
        url: "/pages/bean/index/index"
    },
    "wi.jd.com/fcgi-bin/goods_view": {
        params: {
            sku: "sku"
        },
        url: "/pages/adpage/item/item"
    },
    "wqdeal.jd.com/deal/confirmorder/adview": {
        params: {
            sku: "sku"
        },
        url: "/pages/aditem/index"
    }
}, i = {
    "/pages/store/index/index": {
        params: {
            venderId: "venderId",
            ptag: "ptag"
        },
        url: "https://wqshop.jd.com/mshop/gethomepage"
    }
}, s = function(e) {
    return e.replace(/^(http:|https:)?\/\//, "");
}, l = function(e) {
    return e.match(/[^?#]+/)[0];
}, n = function(e) {
    return e.replace(/\/$/, "");
}, d = function(e) {
    var a = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, t = {};
    if (e && a.params) {
        var o = e.match(/([^?]*)\??(.*)/)[2], p = r.querystr(o, null, !0).query;
        for (var i in a.params) p[i] && (t[a.params[i]] = p[i] || "");
    }
    if (e && a.wxaPrams) for (var s in a.wxaPrams) t[s] = a.wxaPrams[s];
    return t;
}, c = function() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, a = arguments[1], r = {};
    if (e && e.params) for (var t in e.params) t in a && (r[e.params[t]] = a[t]);
    return r;
};

o.getWxaUrl = function() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "";
    if (!e) return null;
    var a = n(l(s(e)));
    return p[a] ? {
        params: d(e, p[a]),
        url: p[a].url
    } : null;
}, o.removeH5Params = function(e) {
    if (e && e.url) {
        var a = e.url.split("#"), r = a[1];
        if (r) {
            var t = r.split("&").filter(function(e) {
                return -1 == e.indexOf("cookie=") && -1 == e.indexOf("wdref=") && -1 == e.indexOf("wxa_level=");
            });
            t.length > 0 ? e.url = a[0] + "#" + t.join("&") : e.url = a[0];
        }
    }
    return e;
}, o.updateCookie = function(e) {
    var a = (arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}).dataType;
    if (e && e.cookie) {
        var r = void 0, o = {
            visitkey: {},
            __wga: {
                maxAge: 3153e3
            },
            PPRD_P: {
                maxAge: 259200
            },
            __jda: {
                maxAge: 259200
            },
            __jdv: {
                maxAge: 86400
            },
            unpl: {
                maxAge: 1296e3
            },
            wq_addr: {},
            wxapp_type: {}
        };
        try {
            r = "json" == a ? e.cookie : JSON.parse(decodeURIComponent(e.cookie));
            var p = [];
            for (var i in r) if ("" != r[i] && o[i]) {
                var s = {};
                s[i] = Object.assign(o[i], {
                    value: r[i]
                }), p.push({
                    data: s
                });
            }
            t.setCookies(p);
        } catch (e) {
            console.log("解析url的cookie参数出错", e);
        }
        console.log("parse cookies: ", t);
    }
}, o.switchUrl = function(e, t) {
    var p = void 0, s = void 0;
    if ("/pages/h5/index" == e) if (/^(https?:)?\/\/union-click\.jd\.com/.test(t.url)) e = "/pages/union/proxy/proxy", 
    p = {
        spreadUrl: encodeURIComponent(t.url)
    }; else if (s = /^(?:https?:)?\/\/lp\.jd\.com\/page\/(\d+)\/([^.]+)\.html/.exec(t.url)) {
        var l = a(s, 3), n = (l[0], l[1]), d = l[2];
        if (!d.startsWith("lp_")) {
            var m = r.getUrlParam("lppage", t.url);
            if (!m) return {
                url: e,
                params: t
            };
            d = "lp_" + m;
        }
        e = "/pages/adpage/lp/lp", p = {
            lppage: encodeURIComponent(n + "/" + d)
        };
    } else {
        var u = o.getWxaUrl(t.url);
        u && (e = u.url, delete t.url, p = Object.assign({}, t, u.params));
    } else if (i[e]) {
        var g = e;
        e = "/pages/h5/index", p = {};
        var x = r.querystr(c(i[g], t));
        p.url = i[g].url + "?" + x;
    }
    return {
        url: e,
        params: p || t
    };
}, o.addParamsToH5Url = function(a, o) {
    if (!a) return "https://wqs.jd.com/error.shtml?ngx_static_err=44";
    var p = [ t.getCookie("visitkey"), t.getCookie("__wga"), t.getCookie("PPRD_P"), t.getCookie("__jda"), t.getCookie("__jdv"), t.getCookie("unpl"), t.getCookie("wxapp_type"), t.getCookie("wq_addr") ], i = p[0], s = p[1], l = p[2], n = p[3], d = p[4], c = p[5], m = p[6], u = p[7], g = [ "cookie=" + encodeURIComponent(JSON.stringify({
        visitkey: i,
        __wga: s,
        PPRD_P: l,
        __jda: n,
        __jdv: d,
        unpl: c,
        wxapp_type: m,
        wq_addr: u
    })), "wdref=" + (o || encodeURIComponent(r.getPageUrl().vurl)), "wxa_level=" + (getCurrentPages().length + 1) ].join("&");
    return a += ("#" == a.substr(-1) ? "" : -1 == a.indexOf("#") ? "#" : "&") + g, a = a.replace(/^(https?:)?\/\//, "https://"), 
    e(a);
}, module.exports = o;