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

function o(e, r) {
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
            var o = r[t];
            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), 
            Object.defineProperty(e, o.key, o);
        }
    }
    return function(r, t, o) {
        return t && e(r.prototype, t), o && e(r, o), r;
    };
}(), a = e(require("../component.js")), i = require("../../common/index"), s = e(require("../../configs/api")), u = (e(require("../../libs/es6-promise.min")), 
e(require("../../libs/co/we-index"))), f = e(require("../../libs/regenerator-runtime/runtime")), c = function(e) {
    function c(e) {
        var o = e.page, n = e.ns, a = e.opts;
        r(this, c);
        var i = t(this, (c.__proto__ || Object.getPrototypeOf(c)).call(this, o, n));
        if (o && (i.page = o, i.opts = a), i.isShowTip = parseInt(a.is_show_tip, 10), isNaN(i.isShowTip)) return t(i);
        i.addFunc("_fowardOrderdetail", i.forwardOrderdetail), i.setCowrap();
        var s = [ 0, 1, 2, 3, 4, 5, 7, 8, 10 ];
        if ([ 1, 2, 3, 5, 7, 8 ].indexOf(i.isShowTip) >= 0) {
            if (a.group_order_id) {
                var u = {
                    group_order_id: a.group_order_id
                };
                i.getLandPageGoodsInfo(o, u);
            }
            if (a.order_sn) {
                var f = a.order_sn;
                i.setData({
                    orderSn: f
                });
            }
        }
        return s.indexOf(i.isShowTip) >= 0 && i.setData({
            isShowServiceNotice: !0,
            isShowTip: i.isShowTip
        }), i;
    }
    return o(c, a.default), n(c, [ {
        key: "setCowrap",
        value: function() {
            var e = this;
            e.getLandPageGoodsInfo = u.default.wrap(f.default.mark(function r(t, o) {
                var n, a, u, c, d;
                return f.default.wrap(function(r) {
                    for (;;) switch (r.prev = r.next) {
                      case 0:
                        return r.prev = 0, n = i.DataUtil.formatByPos(s.default.getLandPageGoodsInfo), a = i.Request.requestDataWithUrl("GET", n, o), 
                        r.next = 5, i.Request.runMainRequestForPage(a, t);

                      case 5:
                        u = r.sent, c = u.group_goods, d = c.goods_name, e.setData({
                            goodsName: d
                        }), r.next = 14;
                        break;

                      case 11:
                        r.prev = 11, r.t0 = r.catch(0), console.error(r.t0);

                      case 14:
                      case "end":
                        return r.stop();
                    }
                }, r, this, [ [ 0, 11 ] ]);
            }));
        }
    }, {
        key: "forwardOrderdetail",
        value: function(e) {
            var r = this, t = e.currentTarget.dataset.orderSn;
            r.page.$forward("order", {
                ordersn: t
            });
        }
    }, {
        key: "onPageScroll",
        value: function() {}
    } ]), c;
}();

exports.default = c;