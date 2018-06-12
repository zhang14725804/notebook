function a(a) {
    if (-1 != a.indexOf("//pro.m.jd.com") || -1 != a.indexOf("//h5.m.jd.com") || -1 != a.indexOf("//h5static.m.jd.com")) {
        var e = void 0, r = void 0, t = void 0;
        t = (e = a.split("#"))[1] || "", -1 != (r = (e = e[0].split("?"))[1] || "").indexOf("wxAppName=") ? r = r.replace(/wxAppName=[^&]*/, "wxAppName=jd") : r += (r && "&" != r.substr(-1) ? "&" : "") + "wxAppName=jd", 
        a = e[0] + "?" + r + (t ? "#" + t : "");
    }
    return a;
}

var e = require("./utils.js"), r = require("./cookie-v2/cookie.js"), t = {}, o = {
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
    "wqs.jd.com/my/coupon/index.shtml": {
        params: {
            ptag: "ptag"
        },
        url: "/pages/my/coupon/coupon"
    },
    "wqs.jd.com/pingou/my.shtml": {
        params: {
            ptag: "ptag"
        },
        url: "/pages/pingou/account/index"
    },
    "wqs.jd.com/portal/wx/tuan/pinggou_tuan99.shtml": {
        params: {
            ptag: "ptag"
        },
        url: "/pages/pingou/tuan99/tuan99"
    },
    "wqs.jd.com/portal/wx/tuan/ziyingtuan.shtml": {
        params: {
            ptag: "ptag"
        },
        url: "/pages/pingou/ziying/ziying"
    },
    "wqs.jd.com/pingou/onecent/index.shtml": {
        params: {
            ptag: "ptag"
        },
        url: "/pages/penny/index/index"
    },
    "wqs.jd.com/portal/wx/tuan/pingouv3.shtml": {
        params: {
            ptag: "ptag"
        },
        url: "/pages/pingou/index/index"
    },
    "wqs.jd.com/portal/wx/tuan/pinggou_pinpaituanV2.shtml": {
        params: {
            ptag: "ptag"
        },
        url: "/pages/pingou/brand/index"
    },
    "wqs.jd.com/portal/wx/tuan/pinggou_darentuanV2.shtml": {
        params: {
            ptag: "ptag"
        },
        url: "/pages/pingou/darentuan/darentuan"
    }
}, p = {
    "/pages/store/index/index": {
        params: {
            venderId: "venderId",
            ptag: "ptag"
        },
        url: "https://wqshop.jd.com/mshop/gethomepage"
    }
}, s = function(a) {
    return a.replace(/^(http:|https:)?\/\//, "");
}, i = function(a) {
    return a.match(/[^?#]+/)[0];
}, n = function(a) {
    return a.replace(/\/$/, "");
}, l = function(a) {
    var r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, t = {};
    if (a && r.params) {
        var o = a.match(/([^?]*)\??(.*)/)[2], p = e.querystr(o, null, !0).query;
        for (var s in r.params) p[s] && (t[r.params[s]] = p[s] || "");
    }
    if (a && r.wxaPrams) for (var i in r.wxaPrams) t[i] = r.wxaPrams[i];
    return t;
}, g = function() {
    var a = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, e = arguments[1], r = {};
    if (a && a.params) for (var t in a.params) t in e && (r[a.params[t]] = e[t]);
    return r;
};

t.getWxaUrl = function() {
    var a = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "";
    if (!a) return null;
    var e = n(i(s(a)));
    return o[e] ? {
        params: l(a, o[e]),
        url: o[e].url
    } : null;
}, t.addH5Params = function(a) {
    if (a && a.url) {
        var t = [ r.getCookie("visitkey"), r.getCookie("__wga"), r.getCookie("PPRD_P"), r.getCookie("__jda"), r.getCookie("__jdv"), r.getCookie("unpl"), r.getCookie("wq_addr") ], o = t[0], p = t[1], s = t[2], i = t[3], n = t[4], l = t[5], g = t[6], u = [ "cookie=" + encodeURIComponent(JSON.stringify({
            visitkey: o,
            __wga: p,
            PPRD_P: s,
            __jda: i,
            __jdv: n,
            unpl: l,
            wq_addr: g
        })), "wdref=" + encodeURIComponent(e.getPageUrl().vurl), "wxa_level=" + (getCurrentPages().length + 1) ].join("&"), d = "#" == a.url.substr(-1) ? "" : -1 == a.url.indexOf("#") ? "#" : "&";
        a.url += d + u;
    }
    return a;
}, t.removeH5Params = function(a) {
    if (a && a.url) {
        var e = a.url.split("#"), r = e[1];
        if (r) {
            var t = r.split("&").filter(function(a) {
                return -1 == a.indexOf("cookie=") && -1 == a.indexOf("wdref=") && -1 == a.indexOf("wxa_level=");
            });
            t.length > 0 ? a.url = e[0] + "#" + t.join("&") : a.url = e[0];
        }
    }
    return a;
}, t.updateCookie = function(a) {
    var e = (arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}).dataType;
    if (a && a.cookie) {
        var t = void 0, o = {
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
            wq_addr: {}
        };
        try {
            t = "json" == e ? a.cookie : JSON.parse(decodeURIComponent(a.cookie));
            var p = [];
            for (var s in t) if ("" != t[s]) {
                var i = {};
                i[s] = Object.assign(o[s], {
                    value: t[s]
                }), p.push({
                    data: i
                });
            }
            r.setCookies(p);
        } catch (a) {
            console.log("解析url的cookie参数出错", a);
        }
        console.log("parse cookies: ", r);
    }
}, t.jumpParams = function(a, r) {
    var o = void 0;
    if ("/pages/h5/index" == a) {
        var s = t.getWxaUrl(r.url);
        s ? (a = s.url, delete r.url, o = Object.assign({}, r, s.params)) : (o = t.addH5Params(r)).url = e.fixProtocol(r.url);
    } else if (p[a]) {
        var i = a;
        a = "/pages/h5/index", o = {};
        var n = e.querystr(g(p[i], r));
        return o.url = p[i].url + "?" + n, t.jumpParams(a, o);
    }
    return {
        url: a,
        params: o || r
    };
}, t.switchUrl = function(a, r) {
    var o = void 0;
    if ("/pages/h5/index" == a) if (/^(https?:)?\/\/union-click\.jd\.com/.test(r.url)) a = "/pages/union/proxy/proxy", 
    o = {
        spreadUrl: encodeURIComponent(r.url)
    }; else {
        var s = t.getWxaUrl(r.url);
        s && (a = s.url, delete r.url, o = Object.assign({}, r, s.params));
    } else if (p[a]) {
        var i = a;
        a = "/pages/h5/index", o = {};
        var n = e.querystr(g(p[i], r));
        o.url = p[i].url + "?" + n;
    }
    return {
        url: a,
        params: o || r
    };
}, t.addParamsToH5Url = function(t, o) {
    if (!t) return "https://wqs.jd.com/error.shtml?ngx_static_err=44";
    var p = [ r.getCookie("visitkey"), r.getCookie("__wga"), r.getCookie("PPRD_P"), r.getCookie("__jda"), r.getCookie("__jdv"), r.getCookie("unpl"), r.getCookie("wxapp_type"), r.getCookie("wq_addr") ], s = p[0], i = p[1], n = p[2], l = p[3], g = p[4], u = p[5], d = p[6], c = p[7], m = [ "cookie=" + encodeURIComponent(JSON.stringify({
        visitkey: s,
        __wga: i,
        PPRD_P: n,
        __jda: l,
        __jdv: g,
        unpl: u,
        wxapp_type: d,
        wq_addr: c
    })), "wdref=" + (o || encodeURIComponent(e.getPageUrl().vurl)), "wxa_level=" + (getCurrentPages().length + 1) ].join("&");
    return t += ("#" == t.substr(-1) ? "" : -1 == t.indexOf("#") ? "#" : "&") + m, t = t.replace(/^(https?:)?\/\//, "https://"), 
    a(t);
}, module.exports = t;