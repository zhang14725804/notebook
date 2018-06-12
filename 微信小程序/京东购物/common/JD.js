function e(e, t, n) {
    return t in e ? Object.defineProperty(e, t, {
        value: n,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = n, e;
}

function t(e) {
    throw new Error("注意，" + e + "函数在小程序并不支持，请检查代码！");
}

require("request/request");

var n = require("fe_report/usability"), a = require("logger.js"), r = require("cookie-v2/cookie"), o = require("fe_helper"), i = require("../api/Ptag/report_manager"), g = require("../api/Ptag/Ptag_utils"), c = require("url_utils"), u = require("navigator"), s = null, p = null, l = null, d = {}, f = {}, m = {}, y = {}, x = {}, w = {}, v = {}, k = {};

s = function(e, t) {
    wx.request({
        url: e,
        method: "GET",
        success: function() {
            t.onLoad.apply(t, arguments);
        },
        fail: function() {
            t.onLoad.apply(t, arguments);
        }
    });
}, p = function() {
    t("sendJs");
}, l = function() {
    t("sendJsByDomain");
}, function() {
    var e = {};
    try {
        e = wx.getSystemInfoSync();
    } catch (t) {
        e = {};
    }
    d.retina = e.pixelRatio >= 1.5, d.sticky = e.system && -1 !== e.system.indexOf("iOS"), 
    d.scene = "wxapp", d.webp = !!getApp().webpSupport, d.getNetwork = function(e) {
        var t = r.getCookie("network");
        t && -1 !== "2g,3g,4g,wifi".indexOf(t.toLowerCase()) ? e && e(t) : wx.getNetworkType({
            success: function(t) {
                r.setCookie({
                    data: {
                        network: {
                            value: t.networkType,
                            maxAge: 3600
                        }
                    }
                }), e && e(t.networkType);
            },
            fail: function() {
                e && e("unknown");
            }
        });
    }, d.getNetwork();
}(), f.useScaleImg = function() {
    var e = x.getCookie("network"), t = d.retina;
    return "wifi" !== e || !t;
}, f.getScaleImg = o.getImg, m.useScaleImg = f.useScaleImg, m.getScaleImg = f.getScaleImg, 
m.getImgUrl = f.getScaleImg, y.itil = !1, y.rd = function(e) {
    e && (e = "[object Object]" === Object.prototype.toString.call(e) ? e : {
        ptag: e
    }, g.addPtag(e.ptag));
}, y.badJs = function() {
    t("badJs");
}, y.umpBiz = function() {
    for (var e = arguments.length, t = Array(e), a = 0; a < e; a++) t[a] = arguments[a];
    n.umpBiz.apply(n, t);
}, y.imageLoadError = function(e) {
    console.error("imageLoadError已经过期");
}, y.pv = i.setCurrentPageAndAddPv, x.get = function(e) {
    return r.getCookie(e);
}, x.set = function(t, n, a, o, i, g) {
    r.setCookie({
        data: e({}, t, {
            value: n,
            maxAge: 60 * a
        })
    });
}, x.del = function(e, t, n, a) {
    r.removeCookie([ e ]);
}, w.setHash = function() {
    t("setHash");
}, w.getHash = function() {
    t("getHash");
}, w.getHashParam = function() {
    t("getHashParam");
}, w.getUrlParam = c.getUrlParam, w.parseUrl = c.parseURL, w.addUrlParam = function(e, t) {
    for (var n in t) {
        var a = new RegExp("([?&])" + n + "=[^&]*(&|$)", "i");
        a.test(e) ? (e = e.replace(a, "$1" + n + "=" + t[n] + "$2"), delete t[n]) : e = c.addUrlParam(e, t);
    }
    return e;
}, w.addRd = function(e, t) {
    return w.addUrlParam(e, {
        PTAG: t
    });
}, w.getValidImageDomain = function() {
    t("getValidImageDomain");
}, w.getPageUrl = function() {
    t("getPageUrl");
}, w.getImageUrl = function() {
    t("getImageUrl");
}, w.getCgiUrl = function() {
    t("getCgiUrl");
}, w.getStaticDisRec = function() {
    t("getStaticDisRec");
}, v.listen = function(e, t) {
    getApp().event.on(e, t);
}, v.one = function(e, t) {
    getApp().event.once(e, t);
}, v.trigger = function(e) {
    for (var t, n = arguments.length, a = Array(n > 1 ? n - 1 : 0), r = 1; r < n; r++) a[r - 1] = arguments[r];
    (t = getApp().event).emit.apply(t, [ e ].concat(a));
}, v.remove = function(e) {
    getApp().event.off(e);
}, function() {
    var e = {
        index: "/pages/index/index",
        detail: "/pages/item/detail/detail",
        my: "/pages/my/index/index",
        cart: "/pages/cart/cart/cart",
        search: "/pages/search/list/list",
        buy: "/pages/pay/index/index",
        account: "/pages/my_pages/account/account",
        pgitem: "/pages/pingou/item/item",
        pgdetail: "/pages/pingou/detail/index",
        shop: "/pages/store/index/index",
        gwqpage: "/pages/gwq/index",
        category: "/pages/cate/cate",
        coupon: "/pages/my/coupon/coupon",
        proxy: "/pages/union/proxy/proxy"
    };
    k.urls = e, k.isWxapp = function(e) {
        e(!0);
    }, k.goto = function(e, t) {
        u.goto(e, {}, {
            method: t
        });
    };
}(), module.exports = {
    send: s,
    sendJs: p,
    sendJsByDomain: l,
    device: d,
    performance: f,
    img: m,
    report: y,
    url: w,
    events: v,
    wxapp: k,
    log: a
};