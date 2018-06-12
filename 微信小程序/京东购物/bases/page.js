function e(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

function t(e, t) {
    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !t || "object" != typeof t && "function" != typeof t ? e : t;
}

function r(e, t) {
    if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
    e.prototype = Object.create(t && t.prototype, {
        constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);
}

var a = function() {
    function e(e, t) {
        for (var r = 0; r < t.length; r++) {
            var a = t[r];
            a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), 
            Object.defineProperty(e, a.key, a);
        }
    }
    return function(t, r, a) {
        return r && e(t.prototype, r), a && e(t, a), t;
    };
}(), o = function e(t, r, a) {
    null === t && (t = Function.prototype);
    var o = Object.getOwnPropertyDescriptor(t, r);
    if (void 0 === o) {
        var i = Object.getPrototypeOf(t);
        return null === i ? void 0 : e(i, r, a);
    }
    if ("value" in o) return o.value;
    var n = o.get;
    if (void 0 !== n) return n.call(a);
}, i = require("./base.js"), n = require("../common/navigator.js"), p = require("../common/h5jump.js"), s = require("../common/pr.js"), u = require("../common/utils.js"), c = require("../common/wdref.js"), l = require("../common/report/pps.js"), d = require("../api/reportGDT.js"), g = require("../api/Ptag/Ptag_utils.js").default, m = require("../api/Ptag/report_manager.js"), f = require("../common/jdwebm.js"), h = require("../common/pretreatment"), y = {}, _ = function(_) {
    function v() {
        var r = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        e(this, v);
        var a = t(this, (v.__proto__ || Object.getPrototypeOf(v)).apply(this, arguments));
        return a.object = r, a.object.pageId = o(v.prototype.__proto__ || Object.getPrototypeOf(v.prototype), "__getRandomID", a).call(a), 
        a.attachPlugins(), a.attachMethods(), a.attachActions(), a.mergeModel(), a.lifeCircle(), 
        Page(r), h.register(r), a;
    }
    return r(v, i), a(v, [ {
        key: "lifeCircle",
        value: function() {
            var e = this, t = this, r = [ "Load", "Ready", "Show", "Hide", "Unload" ], a = !0, o = !1, i = void 0;
            try {
                for (var n, p = r[Symbol.iterator](); !(a = (n = p.next()).done); a = !0) !function() {
                    var r = n.value, a = e.object["on" + r];
                    e.object["on" + r] = function() {
                        for (var e = arguments.length, o = Array(e), i = 0; i < e; i++) o[i] = arguments[i];
                        t["on" + r] && (o = t["on" + r].apply(this, o) || o), a && a.apply(this, o);
                    };
                }();
            } catch (e) {
                o = !0, i = e;
            } finally {
                try {
                    !a && p.return && p.return();
                } finally {
                    if (o) throw i;
                }
            }
        }
    }, {
        key: "mergeModel",
        value: function() {
            if (this.object.hasOwnProperty("model")) {
                var e = this.object.model();
                for (var t in e) void 0 === this.object.data[t] && (this.object.data[t] = e[t]);
            }
        }
    }, {
        key: "attachActions",
        value: function() {
            if (this.object.hasOwnProperty("actions")) {
                var e = this.object.actions;
                for (var t in e) {
                    if (this.object[t]) throw new Error("Prop " + t + " is already exists");
                    this.object[t] = e[t];
                }
            }
        }
    }, {
        key: "attachPlugins",
        value: function() {
            var e = o(v.prototype.__proto__ || Object.getPrototypeOf(v.prototype), "plugins", this).call(this);
            for (var t in e) {
                if (this.object[t]) throw new Error("Prop " + t + " is already exists");
                this.object[t] = e[t];
            }
        }
    }, {
        key: "attachMethods",
        value: function() {
            var e = o(v.prototype.__proto__ || Object.getPrototypeOf(v.prototype), "methods", this).call(this);
            for (var t in e) {
                if (this.object[t]) throw new Error(t + " is already exists");
                this.object[t] = e[t];
            }
        }
    }, {
        key: "onLoad",
        value: function(e) {
            var t = new Date(), r = n.getParams(e), a = y[this.route];
            if (a && (this.speedInit(a, r && r.navStart), this.speedMark(2, t)), u.handleQueryScene(e), 
            r.pps && (m.setPPS(r.pps), l(r.pps)), getApp().utmProps = {
                utm_campaign: r.utm_campaign || "",
                utm_source: r.utm_source || "",
                utm_medium: r.utm_medium || "",
                utm_term: r.utm_term || ""
            }, (r.utm_campaign || r.utm_source || r.utm_medium || r.utm_term || r.platform) && (getApp().utmJdvProps = {
                utm_campaign: r.platform ? 1 == r.platform ? "t_256716187_1" : "t_1000072653_1" : r.utm_campaign || "",
                utm_source: r.platform ? "jdzt_wxsq_refer_null" : r.utm_source || "",
                utm_medium: r.platform ? "weixin_shouq" : r.utm_medium || "",
                utm_term: r.platform ? r.gdt_vid || "" : r.utm_term || "",
                platform: r.platform
            }), "pages/h5/index" == u.getPageUrl().route && (r.encode_url && (r.url = u.decode(r.encode_url), 
            delete r.encode_url), r.url)) {
                var o = r.platform, i = r.gdt_vid, f = r.gaid, h = r.gsid;
                o && d.reportGDT(o, {
                    gdt_vid: i,
                    gaid: f,
                    gsid: h
                });
                var _ = u.getUrlParam("ptag", r.url);
                _ && g.addPtag(_);
                var v = getCurrentPages(), b = v.length > 1 ? v[v.length - 2].route : "";
                "pages/h5/index" != b && "pages/gwq/index" != b && -1 == r.url.indexOf("//union-click.jd.com") && (r.url = p.addParamsToH5Url(r.url, r.referer)), 
                s.addPrToH5(r.url, r.pr), delete r.pr;
            }
            var j = r.ptag;
            j && "string" == typeof j && (g.addPtag(j), this.setData({
                ptag: j
            }));
            var P = r && r.pr || "";
            P && (getApp().pr = P), c.addUrlParams(this.pageId, r), c.onLoadSet(this.pageId), 
            p.updateCookie(r);
            for (var x = arguments.length, w = Array(x > 1 ? x - 1 : 0), O = 1; O < x; O++) w[O - 1] = arguments[O];
            return [ r ].concat(w);
        }
    }, {
        key: "onUnload",
        value: function() {
            var e = c.getUrlParams(this.pageId, !0);
            "pages/h5/index" == u.getPageUrl().route && e && (e = p.removeH5Params(e), console.log("back: h5 to wxa", e), 
            c.backSet(e));
        }
    }, {
        key: "onReady",
        value: function() {
            this.speedMark(3);
        }
    }, {
        key: "onShow",
        value: function() {
            this.manualReportPV ? m.clearPPS() : (m.setCurrentPageAndAddPv(), g.tabbarReport()), 
            f();
        }
    } ]), v;
}();

y = {
    "pages/index/index": 1024,
    "pages/search/list/list": 1157,
    "pages/cart/cart/index": 600,
    "pages/cart/cart/cart": 1035,
    "pages/item/detail/detail": 601,
    "pages/store/index/index": 602,
    "pages/pay/index/index": 603,
    "pages/coupon/index": 604,
    "pages/cate/cate": 605,
    "pages/my/coupon/coupon": 606,
    "pages/order/list/list": 608,
    "pages/order/detail/detail": 609,
    "pages/my_pages/ecard/index/index": 775,
    "pages/my_pages/ecard/bind/bind": 776,
    "pages/my_pages/account/account": 786,
    "pages/pingou/item/item": 851,
    "pages/pingou/ziying/ziying": 854,
    "pages/pingou/tuan99/tuan99": 855,
    "pages/pingou/my/my": 856,
    "pages/pingou/index/index": 853,
    "pages/pingou/detail/index": 867,
    "pages/pingou_second/darentuan/darentuan": 1123,
    "pages/pingou/brand/index": 1092,
    "pages/pingou/brand/detail": 1093,
    "pages/specialpay/qianggou/qianggou": 1037,
    "pages/my/index/index": 1102,
    "pages/adpage/item/item": 1132,
    "pages/adpage/lp/lp": 1133
}, module.exports = _;