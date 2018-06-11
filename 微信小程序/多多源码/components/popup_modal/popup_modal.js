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

function o(e, t) {
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

var r = function() {
    function e(e, t) {
        for (var a = 0; a < t.length; a++) {
            var o = t[a];
            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), 
            Object.defineProperty(e, o.key, o);
        }
    }
    return function(t, a, o) {
        return a && e(t.prototype, a), o && e(t, o), t;
    };
}(), n = e(require("../../components/component.js")), u = e(require("../../storage/ram_manager")), p = e(require("../../controller/config_controller")), i = e(require("../../common/event_queue")), s = e(require("../../constants/tracking/resource_place")), l = require("../../common/index"), c = (e(require("../../libs/es6-promise.min.js")), 
e(require("../../libs/co/we-index"))), d = e(require("../../libs/regenerator-runtime/runtime")), h = function(e) {
    function h(e) {
        var o = e.page, r = e.ns, n = e.key, u = e.autoBegin, p = void 0 === u || u, s = e.showFnCallback, l = e.hideFnCallback;
        t(this, h);
        var c = a(this, (h.__proto__ || Object.getPrototypeOf(h)).call(this, o, r));
        return c.key = n, c.autoBegin = p, c.showFnCallback = s, c.hideFnCallback = l, c.eventQueue = new i.default(o), 
        c.addFunc("_showPopupModalFn", c.showPopupModalFn), c.addFunc("_popupModalTap", c.popupModalTap), 
        c.addFunc("_hidePopupModalFn", c.hidePopupModalFn), c.setCoWrap(), c.autoBegin && c.loadData(), 
        c;
    }
    return o(h, n.default), r(h, [ {
        key: "getEventQueue",
        value: function() {
            return this.eventQueue;
        }
    }, {
        key: "setCoWrap",
        value: function() {
            this.checkStorage = c.default.wrap(d.default.mark(function e(t) {
                var a, o, r, n;
                return d.default.wrap(function(e) {
                    for (;;) switch (e.prev = e.next) {
                      case 0:
                        return e.prev = 0, a = !1, e.next = 4, l.StorageUtil.getStorage(t);

                      case 4:
                        return (o = e.sent) ? (r = new Date().setHours(0, 0, 0, 0), n = new Date(r).getTime(), 
                        o <= n && (a = !0)) : a = !0, e.abrupt("return", a);

                      case 9:
                        e.prev = 9, e.t0 = e.catch(0), console.error(e.t0);

                      case 12:
                      case "end":
                        return e.stop();
                    }
                }, e, this, [ [ 0, 9 ] ]);
            }));
        }
    }, {
        key: "loadData",
        value: function() {
            if (this.key) {
                var e = this;
                return (0, c.default)(d.default.mark(function t() {
                    var a, o, r, n, i;
                    return d.default.wrap(function(t) {
                        for (;;) switch (t.prev = t.next) {
                          case 0:
                            return t.next = 2, p.default.getConfig(e.key);

                          case 2:
                            if (!(a = t.sent)) {
                                t.next = 26;
                                break;
                            }
                            e.popupModalData = [], e.popupIdx = 0, o = 0;

                          case 7:
                            if (!(o < a.length)) {
                                t.next = 25;
                                break;
                            }
                            r = !a[o].scene_ids, t.t0 = d.default.keys(a[o].scene_ids);

                          case 10:
                            if ((t.t1 = t.t0()).done) {
                                t.next = 17;
                                break;
                            }
                            if (n = t.t1.value, a[o].scene_ids[n] != u.default.sceneId) {
                                t.next = 15;
                                break;
                            }
                            return r = !0, t.abrupt("break", 17);

                          case 15:
                            t.next = 10;
                            break;

                          case 17:
                            if (!r) {
                                t.next = 22;
                                break;
                            }
                            return t.next = 20, e.checkStorage(a[o].name);

                          case 20:
                            (i = t.sent) && (e.popupModalData.push(a[o]), e.eventQueue.pushHandler("_showPopupModalFn", "_hidePopupModalFn"), 
                            e.popupIdx++);

                          case 22:
                            o++, t.next = 7;
                            break;

                          case 25:
                            e.autoBegin && e.eventQueue.triggerHandler();

                          case 26:
                            return t.abrupt("return", a);

                          case 27:
                          case "end":
                            return t.stop();
                        }
                    }, t, this);
                }));
            }
        }
    }, {
        key: "showPopupModalFn",
        value: function() {
            this.setData({
                showPopupModel: !0,
                popupModalData: this.popupModalData[0]
            });
            var e = this.popupModalData && this.popupModalData[0] && this.popupModalData[0].activity, t = this.popupIdx - this.popupModalData.length, a = {
                op: "impr",
                pageName: this.page.$pageName,
                pageSection: e + "_popup",
                pageElement: null,
                activity: e,
                pageElSn: 98084,
                idx: t
            };
            s.default.resourcePlaceTracking(a), this.showFnCallback && this.showFnCallback(t);
        }
    }, {
        key: "hidePopupModalFn",
        value: function() {
            try {
                this.setData({
                    showPopupModel: !1
                });
                var e = this.popupIdx - this.popupModalData.length;
                this.hideFnCallback && this.hideFnCallback(e), l.StorageUtil.setStorage(this.popupModalData.shift().name, Date.now());
            } catch (e) {
                console.error(e);
            }
        }
    }, {
        key: "popupModalTap",
        value: function(e) {
            var t = this;
            try {
                var a = "";
                a = this.popupModalData[0].route.indexOf("?") > -1 ? this.popupModalData[0].route + "&refer_page_el_sn=98082" : this.popupModalData[0].route + "?refer_page_el_sn=98082";
                var o = "", r = this.popupModalData && this.popupModalData[0];
                r && r.resource_el_sn && r.resource_el_sn.length && (o = r.resource_el_sn[0]), o && u.default.elSnArray.indexOf(o) < 0 && u.default.elSnArray.push(o), 
                l.Navigation.route(a);
                var n = r && r.activity, p = this.popupIdx - this.popupModalData.length, i = {
                    op: "click",
                    pageName: this.page.$pageName,
                    pageSection: n + "_popup",
                    pageElement: n,
                    activity: n,
                    pageElSn: 98082,
                    idx: p
                };
                s.default.resourcePlaceTracking(i);
            } catch (e) {
                console.error(e);
            }
            setTimeout(function() {
                t.page._hidePopupModalFn(e);
            }, 1e3), this.page.$uploadFormId(e);
        }
    } ]), h;
}();

exports.default = h;