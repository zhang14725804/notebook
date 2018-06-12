function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function t(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

function a(e, t) {
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

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
}, o = function() {
    function e(e, t) {
        for (var a = 0; a < t.length; a++) {
            var r = t[a];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
            Object.defineProperty(e, r.key, r);
        }
    }
    return function(t, a, r) {
        return a && e(t.prototype, a), r && e(t, r), t;
    };
}(), i = e(require("../index_component.js")), s = e(require("../../../libs/co/we-index")), c = e(require("../../../libs/regenerator-runtime/runtime")), u = e(require("../../../configs/api")), l = e(require("../../../common/request.js")), d = e(require("../../../common/storage_util.js")), f = e(require("../../../common/data_util.js")), p = e(require("../../../common/util.js")), h = e(require("../../../storage/ram_manager.js")), g = e(require("../../../common/navigation")), m = e(require("../../../constants/storage_keys")), _ = e(require("../../../common/object_util.js")), v = e(require("../../../constants/tracking/subjects")), y = e(require("../../../constants/index_quick_entrance")), C = e(require("../../../components/resource_place_config/resource_place_config")), x = require("../../../common/index"), b = {
    time_spike: 99956,
    super_spike: 99955,
    commodity_bargain: 99003,
    food: 99291,
    haitao_code: 99948,
    entry_lux: 99946,
    bargain: 99952,
    go_shopping: 99290,
    lottery: 99951,
    charge_center: 99293,
    economical_brand: 99294,
    good_fruit: 99950
}, w = function(e) {
    function w(e) {
        t(this, w);
        var r = a(this, (w.__proto__ || Object.getPrototypeOf(w)).call(this, e));
        r.shsScrollHeightValue = p.default.rpxToPx(465), r.scrollLeftDeno = 6, r.shsCoordinate = [ 0, 0, 78, 2 ], 
        r.page.scroll = p.default.bind(r.scroll, r), r.page.quickEntranceClick = p.default.bind(r.quickEntranceClick, r), 
        r.page.viewCatgoods = p.default.bind(r.viewCatgoods, r), r.page.viewAllCatgoods = p.default.bind(r.viewAllCatgoods, r), 
        r.shsCtx = wx.createCanvasContext("scrollHorizontalScrollbar");
        var n = p.default.rpxToPx(700), o = "anomalousBanner";
        return e.data[o] && (e.data[o] = {}), r.resourcePlaceControl = new C.default({
            page: e,
            ns: o,
            resourcePlaceKey: "anomalous_index",
            top: n
        }), r.loadComponentData(), r;
    }
    return r(w, i.default), o(w, [ {
        key: "loadComponentData",
        value: function() {
            this.getCacheEntranceData(), this.getEntranceData(!0);
        }
    }, {
        key: "onPageScroll",
        value: function(e) {
            var t = parseInt(e.scrollTop);
            0 == this.data.curTabIndex && (t > this.shsScrollHeightValue ? this.hideShsCtx() : this.drawShsCtx());
        }
    }, {
        key: "getEntranceData",
        value: function(e) {
            var t = this, a = void 0, r = void 0, n = void 0, o = void 0;
            (0, s.default)(c.default.mark(function i() {
                var s;
                return c.default.wrap(function(i) {
                    for (;;) switch (i.prev = i.next) {
                      case 0:
                        if (i.prev = 0, a = u.default.indexQuickEntranceList, !e) {
                            i.next = 8;
                            break;
                        }
                        return o = setTimeout(function() {
                            t.getEntranceData(t, !1);
                        }, 300), i.next = 6, d.default.getStorage("QUICK_ENTRANCE_DATA_UPDATE");

                      case 6:
                        n = i.sent, clearTimeout(o);

                      case 8:
                        return r = {
                            forceUseApiGZ: !0,
                            reqConfigHeader: {},
                            needResponseHeader: !0
                        }, n && "string" == typeof n && (r.reqConfigHeader["If-Modified-Since"] = n), i.next = 12, 
                        l.default.apiRequest("GET", a, {
                            scene_id: h.default.sceneId
                        }, !0, r);

                      case 12:
                        s = i.sent, t.processEntranceData(s, !0), i.next = 19;
                        break;

                      case 16:
                        i.prev = 16, i.t0 = i.catch(0), i.t0 && "request:ok" !== i.t0.error_msg && console.error(i.t0);

                      case 19:
                      case "end":
                        return i.stop();
                    }
                }, i, this, [ [ 0, 16 ] ]);
            }));
        }
    }, {
        key: "getCacheEntranceData",
        value: function() {
            var e = this;
            (0, s.default)(c.default.mark(function t() {
                var a;
                return c.default.wrap(function(t) {
                    for (;;) switch (t.prev = t.next) {
                      case 0:
                        return t.next = 2, d.default.getStorage("QUICK_ENTRANCE_DATA");

                      case 2:
                        (a = t.sent) && Array.isArray(a) && a.length > 0 ? e.processEntranceData({
                            data: a
                        }, !1) : e.processEntranceData({
                            data: y.default
                        }, !1);

                      case 4:
                      case "end":
                        return t.stop();
                    }
                }, t, this);
            }));
        }
    }, {
        key: "processEntranceData",
        value: function(e, t) {
            if (e && e.data && 0 != e.data.length) {
                var a = e.data, r = [], n = a.length / 2, o = [];
                this.shsCoordinate[2] = Math.floor(10 / a.length * 112), this.scrollLeftDeno = p.default.rpxToPx(750) * (a.length / 10) / 112, 
                this.drawShsCtx(), a.forEach(function(e, t) {
                    if ((e.redPoint || e.newGif) && r.push(e), t < n) {
                        var i = [ a[t], a[t + n] ];
                        o.push(i);
                    }
                }), this.setData({
                    entranceDataColumn: o
                }), t && (f.default.isArray(a) && d.default.setStorage("QUICK_ENTRANCE_DATA", a), 
                e.header && e.header["Last-Modified"] && d.default.setStorage("QUICK_ENTRANCE_DATA_UPDATE", e.header["Last-Modified"])), 
                this.getOpenPageTime(r);
            }
        }
    }, {
        key: "getOpenPageTime",
        value: function(e) {
            var t = this;
            (0, s.default)(c.default.mark(function a() {
                var r;
                return c.default.wrap(function(a) {
                    for (;;) switch (a.prev = a.next) {
                      case 0:
                        return a.prev = 0, a.next = 3, d.default.getStorage(m.default.USER_OPEN_PAGE_TIME);

                      case 3:
                        r = a.sent, !Array.isArray(e) && (e = []), r || (r = {}, e.forEach(function(e) {
                            r[e.pageSrc] = {
                                hitTimes: 0,
                                timeStamp: 0
                            };
                        })), r && e.forEach(function(e) {
                            var t = r[e.pageSrc];
                            ("object" !== (void 0 === t ? "undefined" : n(t)) || 0 === Object.keys(t).length) && (r[e.pageSrc] = {
                                hitTimes: 0,
                                timeStamp: 0
                            });
                        }), t.lastOpenPageData = r, t.initOpenPageData(e, r), a.next = 14;
                        break;

                      case 11:
                        a.prev = 11, a.t0 = a.catch(0), console.error(a.t0);

                      case 14:
                      case "end":
                        return a.stop();
                    }
                }, a, this, [ [ 0, 11 ] ]);
            }));
        }
    }, {
        key: "initOpenPageData",
        value: function(e, t) {
            var a = new Date().setHours(0, 0, 0, 0), r = new Date(a).getTime(), n = {};
            !Array.isArray(e) && (e = []), e.forEach(function(e) {
                t[e.pageSrc].timeStamp && 1 * t[e.pageSrc].timeStamp > r ? 1 * e.hitTimes < 0 ? n["showRedCircle." + e.pageSrc] = !0 : 1 * e.hitTimes > 1 * t[e.pageSrc].hitTimes ? n["showRedCircle." + e.pageSrc] = !0 : n["showRedCircle." + e.pageSrc] = !1 : n["showRedCircle." + e.pageSrc] = !0;
            }), this.setData(n);
        }
    }, {
        key: "quickEntranceClick",
        value: function(e) {
            var t = e.currentTarget.dataset;
            if (t) {
                var a = t.pageSrc, r = t.index, n = t.url, o = new Date().getTime(), i = this.lastOpenPageData, s = {
                    showRedCircle: this.data.showRedCircle
                }, c = isNaN(1 * t.hitTimes) ? 0 : 1 * t.hitTimes;
                if (i[a] && f.default.isObject(i[a]) && (i[a].hitTimes++, i[a].timeStamp = o, c < 0 ? s.showRedCircle[a] = !0 : i[a].hitTimes < c ? s.showRedCircle[a] = !0 : s.showRedCircle[a] = !1, 
                this.setData(s), this.saveOpenPageTime(i)), g.default.route(n, null), a && void 0 !== r) {
                    var u = _.default.assign({}, v.default.EntryClick, {
                        page_element: a,
                        idx: r,
                        page_el_sn: b[a]
                    });
                    u["refer_xcx_campaign_" + a] = 0, (0, x.TrackingRecord)(u);
                }
            }
            this.page.$uploadFormId(e);
        }
    }, {
        key: "saveOpenPageTime",
        value: function(e) {
            e && d.default.setStorage(m.default.USER_OPEN_PAGE_TIME, e);
        }
    }, {
        key: "forwardCatgoods",
        value: function(e, t) {
            var a = e.currentTarget.dataset.cat;
            if (a && a.opt_id) {
                var r = a.children ? 1 : 2;
                this.page.$forward("catgoods", {
                    opt_id: a.opt_id,
                    opt_type: r,
                    opt_name: a.opt_name
                });
                var n = {
                    op: "click",
                    event: "sub_opt_entry_clk",
                    page_name: "index",
                    page_section: "opt",
                    page_element: "sub_opt",
                    section_id: this.data.homeOperations[this.data.curTabIndex].opt_id,
                    element_id: t ? 0 : a.opt_id,
                    idx: t ? 0 : e.currentTarget.dataset.index
                };
                (0, x.TrackingRecord)(n);
            }
        }
    }, {
        key: "viewCatgoods",
        value: function(e) {
            this.forwardCatgoods(e, !1);
        }
    }, {
        key: "viewAllCatgoods",
        value: function(e) {
            this.forwardCatgoods(e, !0);
        }
    }, {
        key: "scroll",
        value: function(e) {
            var t = Math.floor(e.detail.scrollLeft / this.scrollLeftDeno);
            this.shsCoordinate[0] = t, this.iconScrollLeft != t && (this.iconScrollLeft = t, 
            this.drawShsCtx());
        }
    }, {
        key: "drawShsCtx",
        value: function() {
            this.shsCtx.clearRect(0, 0, 113, 2), this.shsCtx.setFillStyle("#FF6969"), this.shsCtx.fillRect.apply(this.shsCtx, this.shsCoordinate), 
            this.shsCtx.draw();
        }
    }, {
        key: "hideShsCtx",
        value: function() {
            this.shsCtx.clearRect(0, 0, 113, 2), this.shsCtx.draw();
        }
    } ]), w;
}();

exports.default = w;