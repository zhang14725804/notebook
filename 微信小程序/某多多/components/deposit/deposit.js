function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function t(e, t, r) {
    return t in e ? Object.defineProperty(e, t, {
        value: r,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = r, e;
}

function r(e, t) {
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

var s = function() {
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
}(), u = e(require("../component.js")), i = e(require("../../controller/group")), n = e(require("../../controller/formid_controller")), c = (e(require("../../libs/es6-promise.min.js")), 
e(require("../../libs/co/we-index"))), l = e(require("../../libs/regenerator-runtime/runtime")), p = require("../../common/index"), d = {
    getChargeHistory: 10423,
    getChargeRouter: 10427,
    getNeighbourGroup: 10428
}, g = function(e) {
    function g(e) {
        var t = e.page, o = e.ns;
        r(this, g);
        var s = a(this, (g.__proto__ || Object.getPrototypeOf(g)).call(this, t, o));
        return s.page = t, s.setCoWrap(), s.addFunc("_relatedInfo", s.relatedInfo), s.addFunc("_cloRelatedInfo", s.cloRelatedInfo), 
        s.addFunc("_clearMobile", s.clearMobile), s.addFunc("_changeTel", s.changeTel), 
        s.addFunc("_changePrice", s.changePrice), s.addFunc("_localGroupClick", s.localGroupClick), 
        s.addFunc("_groupBuy", s.groupBuy), s.addFunc("_singleBuy", s.singleBuy), s.addFunc("_inputTelChange", s.inputTelChange), 
        s.setData({
            isIpx: p.SystemInfo.getIpxJudgment()
        }), s.getDepositInfo(), s.isClickCloseButton = !1, s;
    }
    return o(g, u.default), s(g, [ {
        key: "setCoWrap",
        value: function() {
            var e = this;
            this.requestChargeRouter = c.default.wrap(l.default.mark(function r(a, o) {
                var s, u, i, n, c;
                return l.default.wrap(function(r) {
                    for (;;) switch (r.prev = r.next) {
                      case 0:
                        if (e.setData({
                            showDefault: !1
                        }), a != e.mobileNumber) {
                            r.next = 3;
                            break;
                        }
                        return r.abrupt("return");

                      case 3:
                        return e.mobileNumber = a, r.prev = 4, s = {
                            charge_type: 0,
                            mobile: a
                        }, u = p.Request.requestDataWithCmd(d.getChargeRouter, {
                            params: s
                        }), r.next = 9, p.Request.runMainRequestForPage(u, e);

                      case 9:
                        if (!(i = r.sent).error_code) {
                            r.next = 14;
                            break;
                        }
                        return i.error_msg && e.page.$showToast(i.error_msg), e.page.setData((n = {}, t(n, "topTab[0].showError", !0), 
                        t(n, "topTab[0].loadingVisible[0]", !1), n)), r.abrupt("return");

                      case 14:
                        i.routers.length > 0 && (c = [], i.routers.forEach(function(t, r) {
                            t.par_price == o && (t.isActive = !0, e.setData({
                                curRoutersIndex: r
                            }), e.requestNeighbourGroup(t.id)), t.par_price = p.StdFormat.price(t.par_price, 100), 
                            t.normal_price = p.StdFormat.price(t.sku.normal_price, 100), t.group_price = p.StdFormat.price(t.sku.group_price, 100), 
                            c.push(t);
                        }), e.setData({
                            routersList: c
                        })), r.next = 20;
                        break;

                      case 17:
                        r.prev = 17, r.t0 = r.catch(4), console.error(r.t0);

                      case 20:
                      case "end":
                        return r.stop();
                    }
                }, r, this, [ [ 4, 17 ] ]);
            })), this.requestNeighbourGroup = c.default.wrap(l.default.mark(function r(a) {
                var o, s;
                return l.default.wrap(function(r) {
                    for (;;) switch (r.prev = r.next) {
                      case 0:
                        return r.prev = 0, o = p.Request.requestDataWithCmd(d.getNeighbourGroup, {
                            params: {
                                router_id: a
                            }
                        }), r.next = 4, p.Request.runMainRequestForPage(o, e);

                      case 4:
                        if (!(s = r.sent).error_code) {
                            r.next = 8;
                            break;
                        }
                        return s.error_msg && e.page.$showToast(s.error_msg), r.abrupt("return");

                      case 8:
                        s.groups.length > 0 && s.groups.forEach(function(e) {
                            e.expireTime = e.expire_time;
                        }), e.page.setData(t({}, "topTab[0].loadingVisible[0]", !1)), e.serverTime = s.server_time, 
                        i.default.setupLocalGroup(!0, s.groups, e), r.next = 17;
                        break;

                      case 14:
                        r.prev = 14, r.t0 = r.catch(0), console.error(r.t0);

                      case 17:
                      case "end":
                        return r.stop();
                    }
                }, r, this, [ [ 0, 14 ] ]);
            }));
        }
    }, {
        key: "getDepositInfo",
        value: function() {
            var e = this;
            (0, c.default)(l.default.mark(function r() {
                var a, o, s, u;
                return l.default.wrap(function(r) {
                    for (;;) switch (r.prev = r.next) {
                      case 0:
                        if (r.prev = 0, !e.chargeHistorySuccess) {
                            r.next = 3;
                            break;
                        }
                        return r.abrupt("return");

                      case 3:
                        return a = p.Request.requestDataWithCmd(d.getChargeHistory), r.next = 6, p.Request.runMainRequestForPage(a, e);

                      case 6:
                        if (!(o = r.sent).error_code) {
                            r.next = 12;
                            break;
                        }
                        return e.chargeHistorySuccess = !1, o.error_msg && e.page.$showToast(o.error_msg), 
                        e.page.setData((s = {}, t(s, "topTab[0].showError", !0), t(s, "topTab[0].loadingVisible[0]", !1), 
                        s)), r.abrupt("return");

                      case 12:
                        if (e.chargeHistorySuccess = !1, !(o.records.length > 0)) {
                            r.next = 21;
                            break;
                        }
                        return u = [], o.records.forEach(function(e) {
                            e.mobile_part = e.mobile.slice(0, 3) + " " + e.mobile.slice(3, 7) + " " + e.mobile.slice(7, 11), 
                            u.push(e);
                        }), e.setData({
                            chargeHistoryList: u,
                            inputValue: u[0].mobile_part
                        }), r.next = 19, e.requestChargeRouter(u[0].mobile, u[0].par_price);

                      case 19:
                        r.next = 22;
                        break;

                      case 21:
                        e.page.setData(t({}, "topTab[0].loadingVisible[0]", !1));

                      case 22:
                        r.next = 27;
                        break;

                      case 24:
                        r.prev = 24, r.t0 = r.catch(0), console.error(r.t0);

                      case 27:
                      case "end":
                        return r.stop();
                    }
                }, r, this, [ [ 0, 24 ] ]);
            }));
        }
    }, {
        key: "relatedInfo",
        value: function(e) {
            var t = !1;
            "" != e.detail.value && (t = !0), this.setData({
                showRelate: !0,
                mobileClear: t
            });
        }
    }, {
        key: "inputTelChange",
        value: function(e) {
            var t = e.detail.value, r = {
                inputValue: t
            };
            0 === t.length && (r.showDefault = !0), this.setData(r);
        }
    }, {
        key: "cloRelatedInfo",
        value: function() {
            var e = this;
            setTimeout(function() {
                if (e.isClickCloseButton) e.isClickCloseButton = !1; else {
                    e.setData({
                        showRelate: !1,
                        mobileClear: !1
                    });
                    var t = e.data.inputValue;
                    if (t = t.replace(/\s+/g, "")) if (/^1[34578]\d{9}$/.test(t)) {
                        var r = t.slice(0, 3) + " " + t.slice(3, 7) + " " + t.slice(7, 11);
                        e.setData({
                            inputValue: r
                        }), e.requestChargeRouter(t, 1e4);
                    } else e.page.$showToast("请填写正确的手机号码"), e.setData({
                        showDefault: !0
                    }); else e.setData({
                        showDefault: !0
                    });
                }
            }, 310);
        }
    }, {
        key: "matchMobile",
        value: function() {
            var e = this.data.inputValue;
            return e = e.replace(/\s+/g, ""), /^1[34578]\d{9}$/.test(e);
        }
    }, {
        key: "clearMobile",
        value: function() {
            this.isClickCloseButton = !0, this.setData({
                inputValue: "",
                focus: !0,
                showDefault: !0,
                mobileClear: !1
            });
        }
    }, {
        key: "changeTel",
        value: function(e) {
            var t = this;
            if (e.currentTarget.dataset) {
                var r = e.currentTarget.dataset.tel, a = e.currentTarget.dataset.parPrice, o = e.currentTarget.dataset.telPart;
                if (r == t.data.inputValue) return;
                this.setData({
                    inputValue: o
                }), t.requestChargeRouter(r, a);
            }
        }
    }, {
        key: "changePrice",
        value: function(e) {
            var r = this;
            if (e.currentTarget.dataset) {
                var a, o = e.currentTarget.dataset.routerId, s = e.currentTarget.dataset.index, u = r.data.curRoutersIndex;
                if (s === u) return;
                r.setData((a = {}, t(a, "routersList[" + u + "].isActive", !1), t(a, "routersList[" + s + "].isActive", !0), 
                t(a, "curRoutersIndex", s), a)), r.requestNeighbourGroup(o);
            }
        }
    }, {
        key: "localGroupClick",
        value: function(e) {
            if (this.matchMobile()) {
                var t = e.currentTarget.dataset, r = void 0, a = this.data.routersList && this.data.routersList[this.data.curRoutersIndex], o = a && a.goods_id, s = a && a.sku && a.sku.sku_id, u = a && a.groups && a.groups[1] && a.groups[1].id;
                t && (r = t.groupOrderId), r && (this.page.$forward("group", {
                    goods_id: o,
                    group_order_id: r,
                    mobile: this.mobileNumber,
                    sku_id: s,
                    group_id: u,
                    is_from_deposit: !0
                }), (0, p.TrackingRecord)({
                    op: "click",
                    page_name: "subjects",
                    page_sn: 10046,
                    page_section: "local_group",
                    page_element: "join_btn",
                    page_el_sn: 99363,
                    group_order_id: r,
                    subjects_id: this.page.subjectsCollectionId
                }));
            }
        }
    }, {
        key: "groupBuy",
        value: function(e) {
            if (this.matchMobile() && this.data.inputValue && !this.data.showDefault) {
                var t = this.data.routersList[this.data.curRoutersIndex];
                e && e.detail && e.detail.formId && n.default.uploadFormIdToSH(e.detail.formId, !1), 
                this.page.$forward("order_checkout", {
                    fast_group: "0",
                    goods_id: t.goods_id,
                    goods_number: "1",
                    group_id: t.groups[1].id,
                    group_num: t.groups[1].customer_num,
                    refer_page_element: "open_btn",
                    sku_id: t.sku.sku_id,
                    mobile: this.mobileNumber,
                    is_from_deposit: !0
                }), (0, p.TrackingRecord)({
                    op: "click",
                    page_name: "subjects",
                    page_sn: 10046,
                    page_section: "subject_bottom",
                    page_element: "open_btn",
                    page_el_sn: 99377,
                    price: t.par_price,
                    subjects_id: this.page.subjectsCollectionId
                });
            }
        }
    }, {
        key: "singleBuy",
        value: function(e) {
            if (this.matchMobile() && this.data.inputValue && !this.data.showDefault) {
                var t = this.data.routersList[this.data.curRoutersIndex];
                e && e.detail && e.detail.formId && n.default.uploadFormIdToSH(e.detail.formId, !1), 
                this.page.$forward("order_checkout", {
                    fast_group: "0",
                    goods_id: t.goods_id,
                    goods_number: "1",
                    group_id: t.groups[0].id,
                    group_num: t.groups[0].customer_num,
                    refer_page_element: "single_buy",
                    sku_id: t.sku.sku_id,
                    mobile: this.mobileNumber,
                    is_from_deposit: !0
                }), (0, p.TrackingRecord)({
                    op: "click",
                    page_name: "subjects",
                    page_sn: 10046,
                    page_section: "subject_bottom",
                    page_element: "single_buy",
                    page_el_sn: 99378,
                    price: t.par_price,
                    subjects_id: this.page.subjectsCollectionId
                });
            }
        }
    } ]), g;
}();

exports.default = g;