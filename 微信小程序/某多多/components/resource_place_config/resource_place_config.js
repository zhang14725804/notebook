function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function r(e, r) {
    if (!(e instanceof r)) throw new TypeError("Cannot call a class as a function");
}

function t(e, r) {
    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !r || "object" != typeof r && "function" != typeof r ? e : r;
}

function a(e, r) {
    if ("function" != typeof r && null !== r) throw new TypeError("Super expression must either be null or a function, not " + typeof r);
    e.prototype = Object.create(r && r.prototype, {
        constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), r && (Object.setPrototypeOf ? Object.setPrototypeOf(e, r) : e.__proto__ = r);
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var n = function() {
    function e(e, r) {
        for (var t = 0; t < r.length; t++) {
            var a = r[t];
            a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), 
            Object.defineProperty(e, a.key, a);
        }
    }
    return function(r, t, a) {
        return t && e(r.prototype, t), a && e(r, a), r;
    };
}(), i = e(require("../component.js")), o = require("../../common/index"), c = e(require("../../storage/ram_manager")), l = (e(require("../../libs/es6-promise.min")), 
e(require("../../libs/co/we-index"))), u = e(require("../../libs/regenerator-runtime/runtime")), s = e(require("../../controller/config_controller")), p = e(require("../../constants/tracking/resource_place")), f = function(e) {
    function f(e) {
        var a = e.page, n = e.ns, i = e.resourcePlaceKey, o = e.top;
        r(this, f);
        var c = t(this, (f.__proto__ || Object.getPrototypeOf(f)).call(this, a, n));
        return a && (c.page = a, c.resourcePlaceKey = i, c.top = o || 0), c.imprBannerHandler = null, 
        c.bannerInit = {}, c.setCowrap(), c.addFunc("_forwardTargetUrl", c.forwardTargetUrl), 
        c.getResourcePlaceInfo(c.resourcePlaceKey), c;
    }
    return a(f, i.default), n(f, [ {
        key: "setCowrap",
        value: function() {
            var e = this;
            e.getResourcePlaceInfo = l.default.wrap(u.default.mark(function r(t) {
                var a, n, i, o, l, f, g, d, m, b, y, h, v;
                return u.default.wrap(function(r) {
                    for (;;) switch (r.prev = r.next) {
                      case 0:
                        return r.prev = 0, r.next = 3, s.default.getConfig(t);

                      case 3:
                        if (!((a = r.sent).length > 0)) {
                            r.next = 21;
                            break;
                        }
                        n = a[0].image_src, i = a[0].route, o = a[0].activity, l = !a[0].scene_ids, f = a[0].resource_el_sn, 
                        g = "", f && f.length > 0 && (g = f[0]), r.t0 = u.default.keys(a[0].scene_ids);

                      case 13:
                        if ((r.t1 = r.t0()).done) {
                            r.next = 20;
                            break;
                        }
                        if (d = r.t1.value, a[0].scene_ids[d] != c.default.sceneId) {
                            r.next = 18;
                            break;
                        }
                        return l = !0, r.abrupt("break", 20);

                      case 18:
                        r.next = 13;
                        break;

                      case 20:
                        "floating_subject" === t ? (m = a[0].subject_id, b = this.page.options.subject_id, 
                        y = -1 == m.indexOf(b), l && e.setData({
                            resourcePlaceImg: n,
                            forwardTargetUrl: i,
                            activity: o,
                            isShowResourcePlace: y,
                            elSn: g
                        })) : l && (e.setData({
                            resourcePlaceImg: n,
                            forwardTargetUrl: i,
                            activity: o,
                            isShowResourcePlace: !0,
                            elSn: g
                        }), t.indexOf("float") > -1 ? (h = o || i.split("/")[3].split("?")[0], v = {
                            op: "impr",
                            pageName: e.page.$pageName,
                            pageSection: "float",
                            pageElement: h,
                            activity: o,
                            url: i,
                            pageElSn: 99680
                        }, p.default.resourcePlaceTracking(v)) : e.imprBanTime || (e.imprBanTime = setTimeout(function() {
                            e.imprBanner();
                        }, 500)));

                      case 21:
                        r.next = 26;
                        break;

                      case 23:
                        r.prev = 23, r.t2 = r.catch(0), console.error(r.t2);

                      case 26:
                      case "end":
                        return r.stop();
                    }
                }, r, this, [ [ 0, 23 ] ]);
            }));
        }
    }, {
        key: "onPageScroll",
        value: function() {
            var e = this;
            (this.resourcePlaceKey.indexOf("banner") > -1 || this.resourcePlaceKey.indexOf("anomalous") > -1 && this.data.isShowResourcePlace) && (this.imprBannerHandler && clearTimeout(this.imprBannerHandler), 
            this.imprBannerHandler = setTimeout(function() {
                e.imprBanner(), e.imprBannerHandler = null;
            }, 200));
        }
    }, {
        key: "imprBanner",
        value: function() {
            var e = this, r = parseInt(this.top);
            wx.canIUse && wx.canIUse("createSelectorQuery") && wx.createSelectorQuery().selectAll("#little-banner-id").boundingClientRect(function(t) {
                t.length > 0 ? (t.forEach(function(t, a) {
                    if (t.top >= r && t.bottom > r) {
                        if (!e.bannerInit[a + ""]) {
                            var n = e.data.activity, i = e.data.forwardTargetUrl, o = n || i.split("/")[3].split("?")[0], c = {
                                op: "impr",
                                pageName: e.page.$pageName,
                                pageSection: "banner",
                                pageElement: o,
                                activity: n,
                                url: i,
                                pageElSn: 98963
                            };
                            "coupons" === e.page.$pageName ? a === e.page.data.curSwiperItem && (p.default.resourcePlaceTracking(c), 
                            e.bannerInit[a + ""] = !0) : (p.default.resourcePlaceTracking(c), e.bannerInit[a + ""] = !0);
                        }
                    } else e.bannerInit[a + ""] = !1;
                }), e.imprBanTime = null) : e.imprBanner();
            }).exec();
        }
    }, {
        key: "forwardTargetUrl",
        value: function(e) {
            var r = e.currentTarget.dataset.elsn;
            r && c.default.elSnArray.indexOf(r) < 0 && c.default.elSnArray.push(r);
            var t = e.currentTarget.dataset.route, a = e.currentTarget.dataset.activity, n = e.currentTarget.dataset.pageSection, i = a || t.split("/")[3].split("?")[0], l = "banner" === n ? 98963 : 99680, u = {
                op: "click",
                pageName: this.page.$pageName,
                pageSection: n,
                pageElement: i,
                activity: a,
                url: t,
                pageElSn: l
            }, s = "";
            s = t.indexOf("?") > -1 ? t + "&refer_page_el_sn=" + l : t + "?refer_page_el_sn=" + l, 
            o.Navigation.forward(s), p.default.resourcePlaceTracking(u);
        }
    } ]), f;
}();

exports.default = f;