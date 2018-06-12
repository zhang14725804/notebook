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

function o() {
    var e = getCurrentPages().slice(0).pop(), t = e.route || e.__route__ || "";
    return e = null, t;
}

function r() {
    var e = this, t = {
        enable: 0
    };
    return k.get({
        url: "https://wq.360buyimg.com/data/ppms/js/ppms.pagev33214.jsonp",
        data: {
            t: Date.now()
        }
    }).then(function(n) {
        var r = n.body.data || [], i = r.length, a = o();
        return i && (t = r.find(function(e) {
            return e.page == a;
        }) || t, Object.assign(e.data, t)), f.resolve(t);
    }, function(e) {
        return f.reject(e);
    });
}

function i(e) {
    return Math.min(+e.pageSize || 0, 100);
}

function a(e) {
    var t = 1 == e.enablePagin, n = i(e);
    return t = t && 0 != n;
}

function u(e) {
    this.init = e.data.length, this.data.list = e.data, this.data.impr = e.impr, c.call(this), 
    this.setData(this.data);
}

function s(e, t) {
    var n = arguments[1] || this.data.impr, o = new RegExp(e + "=([^$|&]*)"), r = n.substr(n.indexOf("?") + 1).match(o);
    return null != r ? r[1] : "";
}

function l(e, t) {
    var n = 1 == e, o = g.getUrlParam("t", this.data.impr), r = n ? t.clk : "", i = {
        t: "rec." + o,
        m: "MO_J2011-2",
        cul: "",
        ref: "",
        pin: w.getCookie("pin"),
        sid: w.getCookie("visitkey") + "|" + this.visitCount,
        uuid: s.call(this, "uuid"),
        rm: "",
        v: []
    }, a = {
        action: e,
        sku: s.call(this, "sku", r),
        skus: s.call(this, "skus", r),
        csku: n ? t.sku : s.call(this, "csku"),
        index: s.call(this, "index", r),
        expid: s.call(this, "expid"),
        chan_type: 5,
        net_type: P.networkType,
        reqsig: s.call(this, "reqsig"),
        os: P.systemInfo.system,
        user_type: y.isLogin() ? 1 : 0,
        openid: w.getCookie("open_id"),
        rm: Date.now()
    };
    for (var u in a) {
        var l = a[u];
        i.v.push(u + "=" + l);
    }
    return i.v = i.v.join("$"), "https://mercury.jd.com/log.gif?" + g.querystring(i);
}

function c(e) {
    var t = this.data.list.find(function(t) {
        return t.sku == e;
    }), n = {
        report: {}
    };
    e ? (n.report[e] = 1 == t.source ? n.report[e] = t.clk : l.call(this, 1, t), this.setData(n)) : (n.report.show = l.call(this, 0), 
    this.setData(n));
}

var p = function() {
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
}(), h = function e(t, n, o) {
    null === t && (t = Function.prototype);
    var r = Object.getOwnPropertyDescriptor(t, n);
    if (void 0 === r) {
        var i = Object.getPrototypeOf(t);
        return null === i ? void 0 : e(i, n, o);
    }
    if ("value" in r) return r.value;
    var a = r.get;
    if (void 0 !== a) return a.call(o);
}, f = require("../../../libs/promise.min.js"), d = require("../../component.js"), k = require("../../../common/request/request"), m = require("../../../common/logger.js"), g = require("../../../common/fe_helper.js"), v = require("../../../common/toast/toast.js"), y = require("../../../common/login/login.js"), _ = new m("guess you like 组件"), b = require("../../components/sku_panel/sku_panel"), w = require("../../../common/cookie-v2/cookie"), S = require("../../../common/localStorage"), P = getApp(), j = function(o) {
    function r() {
        return e(this, r), t(this, (r.__proto__ || Object.getPrototypeOf(r)).apply(this, arguments));
    }
    return n(r, b), p(r, [ {
        key: "onSkuPanelShow",
        value: function() {}
    }, {
        key: "onSkuPanelHide",
        value: function() {}
    }, {
        key: "hideSkuPanel",
        value: function() {
            h(r.prototype.__proto__ || Object.getPrototypeOf(r.prototype), "hideSkuPanel", this).call(this), 
            this.onSkuPanelHide();
        }
    } ]), r;
}(), O = function(s) {
    function l() {
        e(this, l);
        var n = t(this, (l.__proto__ || Object.getPrototypeOf(l)).apply(this, arguments));
        return n.addFunc("onReported", n.onReported), n.addFunc("showSkuPanel", n._showSkuPanel), 
        n.addFunc("gotoDetails", n._gotoDetails), n.on("confirmSkuPanel", n._confirmSkuPanel), 
        !n.data.autoLoad && n.on("load", n.show), n.components.gyl_skupanel.onSkuPanelShow = n.onSkuPanelShow, 
        n.components.gyl_skupanel.onSkuPanelHide = n.onSkuPanelHide, S.get("splashCount").then(function(e) {
            n.visitCount = e;
        }), n;
    }
    return n(l, d), p(l, [ {
        key: "defaultData",
        value: function() {
            return {
                enable: 0,
                pi: 1,
                enableAdd2Cart: 0,
                scrollIntoView: "",
                autoLoad: !0
            };
        }
    }, {
        key: "components",
        value: function() {
            return {
                gyl_skupanel: j
            };
        }
    } ]), p(l, [ {
        key: "load",
        value: function(e) {
            var t = this;
            if (0 == e.enable || 0 == e.reclist.length || 0 == i(e)) return f.resolve({
                data: [],
                impr: ""
            });
            var n = a(e), o = {
                pi: this.data.pi,
                pc: i(e),
                recpos: this.getRecId(e.reclist)
            };
            return this.data.recId = o.recpos, k.get({
                url: "https://wq.jd.com/mcoss/reclike/getrecinfo",
                data: o
            }).then(function(e) {
                var o = e.body;
                return o.success ? (n && ++t.data.pi, o.data.map(function(e) {
                    return e.img = g.getImg(e.img), e;
                }), f.resolve({
                    data: o.data,
                    impr: o.impr
                })) : f.reject(new Error("message:" + o.error_msg));
            }, function(e) {
                return f.reject(e);
            });
        }
    }, {
        key: "_confirmSkuPanel",
        value: function(e) {
            var t = this, n = e.others.fromCompGuessYouLike, r = e.info.sku, i = this.page, a = i.route || i.__route__, u = o() === a, s = "gyl_sku_" + r;
            n && this.biz.addCart({
                skuId: r,
                buyNum: e.num
            }).then(function(e) {
                v.show({
                    icon: v.ICON.SUCCESS,
                    content: "已成功加入购物车~"
                }), u ? (t.data.scrollIntoView = s, t.page.refresh && t.page.refresh()) : t.refresh();
            }, function(e) {
                v.show({
                    icon: v.ICON.WARNING,
                    content: e
                });
            });
        }
    }, {
        key: "_showSkuPanel",
        value: function(e) {
            var t = e.currentTarget.dataset, n = t.sku;
            t.clk;
            c.call(this, n), this.components.gyl_skupanel.onSkuPanelShow(), this.components.gyl_skupanel.showSkuPanel({
                numController: !0,
                sku: n,
                others: {
                    fromCompGuessYouLike: !0
                }
            });
        }
    }, {
        key: "_gotoDetails",
        value: function(e) {
            var t = e.currentTarget.dataset, n = t.sku, o = t.cover, r = t.name, i = t.price, a = t.pps, u = (t.clk, 
            {
                sku: n,
                cover: o,
                name: r,
                price: i,
                pps: a
            });
            c.call(this, n), this.$goto("/pages/item/detail/detail", u);
        }
    }, {
        key: "onLoad",
        value: function() {
            this.data.autoLoad && this.show();
        }
    }, {
        key: "show",
        value: function() {
            var e = this;
            this.init || r.call(this).then(this.load.bind(this)).then(u.bind(this)).catch(function(t) {
                e.onFail(t), _.error(t);
            });
        }
    }, {
        key: "onReported",
        value: function() {
            this.setData({
                report: {}
            });
        }
    }, {
        key: "onUnload",
        value: function() {
            this.init = !1;
        }
    }, {
        key: "onShow",
        value: function(e) {}
    }, {
        key: "refresh",
        value: function() {}
    }, {
        key: "getRecId",
        value: function(e) {
            return e[0].recid;
        }
    }, {
        key: "onFail",
        value: function(e) {
            _.debug("onFail");
        }
    }, {
        key: "onSkuPanelShow",
        value: function() {}
    }, {
        key: "onSkuPanelHide",
        value: function() {}
    } ]), l;
}();

module.exports = O;