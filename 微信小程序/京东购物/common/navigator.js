function e(e, a, t) {
    return a in e ? Object.defineProperty(e, a, {
        value: t,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[a] = t, e;
}

function a(a) {
    var f = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, l = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
    if (c = 2 == p.getCookie("wxapp_type"), "string" == typeof f) {
        var x = [ f, {} ];
        l = x[0], f = x[1];
    }
    "string" == typeof l && (l = {
        method: l
    });
    var m = l.method || "navigateTo", v = [ {
        url: "/pages/order/detail/detail",
        appId: "wx91d27dbf599dff74",
        source: "app_pingou"
    }, {
        url: "/pages/my/frozenaccount/frozenaccount",
        appId: "wx91d27dbf599dff74",
        source: "app_pingou"
    }, {
        url: "/pages/my_pages/frozenaccount/frozenaccount",
        appId: "wx91d27dbf599dff74",
        source: "app_pingou"
    }, {
        url: "/pages/my/account/account",
        appId: "wx91d27dbf599dff74",
        source: "app_pingou"
    }, {
        url: "/pages/my_pages/account/account",
        appId: "wx91d27dbf599dff74",
        source: "app_pingou"
    }, {
        url: "/pages/cate/cate",
        appId: "wx91d27dbf599dff74",
        source: "app_pingou"
    }, {
        url: "/pages/my/ecard/bind/bind",
        appId: "wx91d27dbf599dff74",
        source: "app_pingou"
    }, {
        url: "/pages/my_pages/ecard/bind/bind",
        appId: "wx91d27dbf599dff74",
        source: "app_pingou"
    }, {
        url: "/pages/item/detail/detail",
        appId: "wx91d27dbf599dff74",
        source: "app_pingou"
    }, {
        url: "/pages/my/index/index",
        appId: "wx91d27dbf599dff74",
        source: "app_pingou"
    }, {
        url: "/pages/order/list/list",
        appId: "wx91d27dbf599dff74",
        source: "app_pingou"
    } ], y = v.findIndex(function(e) {
        return 0 == a.indexOf(e.url);
    }), b = getApp().appId, w = -1 != y ? v[y].appId : b, I = -1 != y ? v[y].source : "";
    if (b == w || -1 == y) {
        if (s.onNavigate(a, f), /^(https?:)?\/\//i.test(a) && (f.url = a, a = "/pages/h5/index"), 
        !l.skipSwitchUrl) {
            var h = n.switchUrl(a, f);
            a = h.url, f = h.params;
        }
        i.addPr(a, f);
        var _ = r.getRandomID("Px");
        f.navStart = new Date(), f.referer = r.getPageUrl().vurl, o.set(_, f), f = r.querystring(e({}, d, _));
        var T = c ? [ "/pages/pingou/index/index", "/pages/pingou/cate/index", "/pages/pingou/account/index" ] : [ "/pages/index/index", "/pages/cate/cate", "/pages/cart/cart/index", "/pages/my/index/index" ];
        "/pages/cart/cart/cart" == a ? m = "navigateTo" : -1 != T.findIndex(function(e) {
            return e == a;
        }) && (m = "switchTab"), 0 === a.indexOf("/pages/index/index") && (getApp().navigateToIndexByCode = !0);
        var j = getCurrentPages();
        "navigateTo" == m && j.length >= u - 3 && (m = "redirectTo"), "navigateToByForce" == m && (m = "navigateTo"), 
        "navigateTo" == m && j.length == u && (m = "redirectTo"), wx[m]({
            url: a + "?" + f
        });
    } else {
        i.addPr(a, f), I && (f.source = I);
        for (var q in f) null !== f[q] && "object" === t(f[q]) && (f[q] = JSON.stringify(f[q]));
        g.show({
            icon: g.ICON.INFO,
            content: "您即将跳转至京东购物小程序，点击返回拼购即可回到拼购小程序",
            duration: 3e3
        });
        var P = a + "?" + r.querystring(f);
        setTimeout(function() {
            wx.navigateToMiniProgram({
                appId: w,
                path: P,
                envVersion: "release",
                extraData: l.extraData ? l.extraData : {}
            });
        }, 3e3);
    }
}

var t = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
}, r = require("./utils.js"), n = require("./h5jump.js"), i = require("./pr.js"), p = require("./cookie-v2/cookie"), o = new Map(), d = "__pid", u = 10, s = require("./pretreatment"), g = require("./toast/toast.js"), c = 2 == p.getCookie("wxapp_type");

module.exports = {
    goto: a,
    gotoItem: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
        if (t.isPingou) return a("/pages/pingou/item/item", e, t);
        if (t.useH5) {
            var r = "https://wqitem.jd.com/item/view?sku=" + e.sku;
            return a("/pages/h5/index", Object.assign({}, e, {
                url: r
            }), Object.assign({}, t, {
                skipSwitchUrl: !0
            }));
        }
        return a("/pages/item/detail/detail", e, t);
    },
    getParams: function(e) {
        if (e && e[d]) {
            var a = e[d];
            e = o.get(a) || {}, o.delete(a);
        }
        return e;
    }
};