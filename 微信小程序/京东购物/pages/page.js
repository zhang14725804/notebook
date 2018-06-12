function e(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

function t(e, t) {
    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !t || "object" != typeof t && "function" != typeof t ? e : t;
}

function n(e, t) {
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

var o = function() {
    function e(e, t) {
        for (var n = 0; n < t.length; n++) {
            var o = t[n];
            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), 
            Object.defineProperty(e, o.key, o);
        }
    }
    return function(t, n, o) {
        return n && e(t.prototype, n), o && e(t, o), t;
    };
}(), r = function e(t, n, o) {
    null === t && (t = Function.prototype);
    var r = Object.getOwnPropertyDescriptor(t, n);
    if (void 0 === r) {
        var a = Object.getPrototypeOf(t);
        return null === a ? void 0 : e(a, n, o);
    }
    if ("value" in r) return r.value;
    var i = r.get;
    if (void 0 !== i) return i.call(o);
}, a = require("./base.js"), i = require("../libs/emitter.js"), s = require("../api/Ptag/Ptag_utils.js").default, p = require("../common/jdwebm.js"), u = require("../common/h5jump.js"), l = require("../common/utils.js"), c = require("../common/wdref.js"), g = require("../common/report/pps.js"), d = require("../api/Ptag/report_manager.js"), h = require("../common/navigator.js"), f = {}, y = {}, v = {}, m = require("../common/pretreatment"), b = function(b) {
    function _(n) {
        e(this, _);
        var o = t(this, (_.__proto__ || Object.getPrototypeOf(_)).call(this, n));
        o.obj = n, o.obj.pageId = r(_.prototype.__proto__ || Object.getPrototypeOf(_.prototype), "__getRandomID", o).call(o), 
        o.initPlugins(), o.initComponents(), o.initLifeCircle();
        for (var a = arguments.length, i = Array(a > 1 ? a - 1 : 0), s = 1; s < a; s++) i[s - 1] = arguments[s];
        return Page.apply(void 0, [ n ].concat(i)), m.register(n), o;
    }
    return n(_, a), o(_, [ {
        key: "initLifeCircle",
        value: function() {
            var e = this, t = [ "onLoad", "onReady", "onShow", "onHide", "onUnload", "onRouteEnd" ], n = this, o = !0, r = !1, a = void 0;
            try {
                for (var i, s = t[Symbol.iterator](); !(o = (i = s.next()).done); o = !0) !function() {
                    var t = i.value, o = e.obj[t];
                    e.obj[t] = function() {
                        for (var e = arguments.length, r = Array(e), a = 0; a < e; a++) r[a] = arguments[a];
                        n[t] && (r = n[t].apply(this, r) || r), o && o.apply(this, r);
                    };
                }();
            } catch (e) {
                r = !0, a = e;
            } finally {
                try {
                    !o && s.return && s.return();
                } finally {
                    if (r) throw a;
                }
            }
        }
    }, {
        key: "initComponents",
        value: function() {
            var e = this.obj.components;
            if (e) {
                this.components = {};
                for (var t in e) this.components[t] = new e[t](this.obj, t);
                v["components" + this.obj.pageId] = this.components;
            }
        }
    }, {
        key: "initPlugins",
        value: function() {
            var e = this;
            y = {
                toast: this.toast,
                helper: this.helper,
                biz: this.biz,
                us: this.us,
                $request: this.$request,
                _events: {},
                $goto: this.$goto,
                $preload: m.preload
            }, this.obj._events = {}, this.obj.emitter = new i(this.obj), Object.getOwnPropertyNames(this.__proto__.__proto__).map(function(t) {
                "constructor" !== t && (e.obj[t] = r(_.prototype.__proto__ || Object.getPrototypeOf(_.prototype), t, e));
            });
            var t = [ "on", "emit" ], n = !0, o = !1, a = void 0;
            try {
                for (var s, p = t[Symbol.iterator](); !(n = (s = p.next()).done); n = !0) {
                    var u = s.value;
                    this.obj[u] = this[u];
                }
            } catch (e) {
                o = !0, a = e;
            } finally {
                try {
                    !n && p.return && p.return();
                } finally {
                    if (o) throw a;
                }
            }
            var l = [ "onWrapperTap" ], c = !0, g = !1, d = void 0;
            try {
                for (var h, f = l[Symbol.iterator](); !(c = (h = f.next()).done); c = !0) !function() {
                    var t = h.value, n = e.obj[t] || null;
                    e.obj[t] = function() {
                        for (var o = arguments.length, r = Array(o), a = 0; a < o; a++) r[a] = arguments[a];
                        n && n.apply(e, r), e[t].apply(e, r);
                    };
                }();
            } catch (e) {
                g = !0, d = e;
            } finally {
                try {
                    !c && f.return && f.return();
                } finally {
                    if (g) throw d;
                }
            }
        }
    }, {
        key: "onLoad",
        value: function(e) {
            for (var t in y) y.hasOwnProperty(t) && (this[t] = y[t]);
            this.components = v["components" + this.pageId];
            var n = new Date(), o = h.getParams(e), r = f[this.route];
            r && (this.speedInit(r, o && o.navStart), this.speedMark(2, n)), o.pps && (d.setPPS(o.pps), 
            g(o.pps));
            var a = o.ptag;
            a && "string" == typeof a && (s.addPtag(a), this.setData({
                ptag: a
            }));
            var i = o && o.pr || "";
            i && (getApp().pr = i), c.addUrlParams(this.pageId, o), c.onLoadSet(this.pageId), 
            u.updateCookie(o);
            var p = this.events;
            if (p) for (var l in p) this.on(l, this[p[l]]);
            this.$pages = getCurrentPages(), this.$pages.length > 1 && (this.$prev = this.$pages[this.$pages.length - 2]);
            for (var m = arguments.length, b = Array(m > 1 ? m - 1 : 0), _ = 1; _ < m; _++) b[_ - 1] = arguments[_];
            if (o) return [ o ].concat(b);
        }
    }, {
        key: "onUnload",
        value: function() {
            for (var e in this._events) {
                for (var t in this._events[e]) {
                    var n = this._events[e][t];
                    this.emitter.off(e, n);
                }
                delete this._events[e];
            }
            var o = c.getUrlParams(this.pageId, !0);
            "pages/h5/index" == l.getPageUrl().route && o && (o = u.removeH5Params(o), console.log("back: h5 to wxa", o), 
            c.backSet(o));
        }
    }, {
        key: "onReady",
        value: function() {
            this.speedMark(3);
        }
    }, {
        key: "onShow",
        value: function() {
            p(), this.manualReportPV ? d.clearPPS() : (d.setCurrentPageAndAddPv(), s.tabbarReport());
        }
    }, {
        key: "on",
        value: function(e, t) {
            this._events[e] || (this._events[e] = []), t = t.bind(this), this._events[e].push(t), 
            this.emitter.on(e, t);
        }
    }, {
        key: "emit",
        value: function() {
            var e;
            (e = this.emitter).emit.apply(e, arguments);
        }
    }, {
        key: "onWrapperTap",
        value: function(e) {
            if (console.log("in page=======", e), e) {
                var t = e.target.dataset.ptag;
                t && (console.log("====>", t), this.$report(t));
            }
        }
    } ]), _;
}();

f = {
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
    "pages/my_pages/coupon_detail/coupon_detail": 900,
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
    "pages/pingou/darentuan/darentuan": 1123,
    "pages/pingou/brand/index": 1092,
    "pages/pingou/brand/detail": 1093,
    "pages/specialpay/qianggou/qianggou": 1037,
    "pages/penny/index/index": 1053,
    "pages/penny/item/item": 1054,
    "pages/penny/pay/pay": 1055,
    "pages/penny/detail/detail": 1056,
    "pages/my/index/index": 1102,
    "pages/events/sportshb/index/index": 1214
}, module.exports = b;