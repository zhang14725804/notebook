var e = require("../request/request.js"), t = require("../debug.js")("Usability 前端功能可用性上报"), O = {}, r = {}, _ = {
    prepare: function(e) {
        var t = this, r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 15e3;
        this._reset(e), O[e] = setTimeout(function() {
            t.report(e, 408, "REQUEST_TIMEOUT");
        }, r);
    },
    start: function(e, t, O) {
        var _ = this, i = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 8e3;
        if (!e || !t || !O) throw new Error("参数不合法");
        return r[e] = {
            bizid: t,
            operation: O,
            rid: setTimeout(function() {
                r[e] && (delete r[e], _.report(O, 408, "REQUEST_TIMEOUT", t));
            }, i)
        }, function(i, o, P) {
            r[e] && (clearTimeout(r[e].rid), delete r[e], _.umpBiz({
                operation: O,
                result: i,
                message: o,
                bizid: t
            }, P));
        };
    },
    umpBiz: function(e, t) {
        var O = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
        if (void 0 !== (t = t || 10) && Math.floor(10 * Math.random()) > t) return !1;
        this.report(e.operation, e.result, e.message, e.bizid, O);
    },
    umpReport: function(e, t, O, _) {
        if (!e) throw new Error("参数不合法");
        var i = r[e];
        i && (clearTimeout(i.rid), delete r[e], i.result = t, i.message = O, this.umpBiz(i, _));
    },
    report: function(O, r, _, i) {
        var o = this;
        if ((!(!(arguments.length > 4 && void 0 !== arguments[4]) || arguments[4]) || this._reset(O)) && (_ = _ || "", 
        _ += "", O = parseInt(O), !isNaN(O))) {
            if (r = parseInt(r), isNaN(r) && (r = 1), 1 == r && _) {
                var P = _.match(/[\(（](\d+)[\)）]/);
                P && (r = ~~P[1] || 1);
            }
            this.records = this.records || [], this.records.push([ i || 441, O, r, 0, _ ].join("|")), 
            clearTimeout(this.debounce), this.debounce = setTimeout(function() {
                var O = {
                    contents: o.records.join(","),
                    t: Math.random()
                };
                o.records = [], e({
                    method: "POST",
                    url: "https://wq.jd.com/webmonitor/collect/biz.json",
                    data: O,
                    priority: "REPORT"
                }), t(O);
            }, 1e3);
        }
    },
    _reset: function(e) {
        var t = O[e];
        return !!t && (clearTimeout(t), delete O[e], !0);
    },
    OP_SECKILL: 1,
    OP_CART: 2,
    OP_ITEM_MAIN: 3,
    OP_ITEM_ALL: 4,
    OP_SEARCH: 5,
    OP_PAY: 6,
    OP_CATE: 7,
    OP_USER_INFO: 8,
    OP_ORDER_LIST: 9,
    OP_ORDER_DETAIL: 10,
    OP_MY_COUPON_2: 12,
    OP_SHOP_INFO: 13,
    OP_SHOP_ALL: 14,
    OP_SHOP_NEW: 15,
    OP_SHOP_PROMOTE: 16,
    OP_COUPON_TODAY: 17,
    OP_COUPON_RECOMMEND: 18,
    OP_COUPON_MORE: 19,
    OP_COUPON_FIND: 20,
    OP_COUPON_GOODS: 21,
    OP_COUPON_DRAW: 22,
    OP_ITEM_ADD_CART: 23,
    OP_SECKILL_SUBSCRIBE: 24,
    OP_SECKILL_UNSUBSCRIBE: 25,
    OP_ORDER_TRACE: 26,
    OP_3C_SHOP_INFO: 27,
    OP_3C_SHOP_GOODS: 28,
    OP_SECKILL_BRANDCATE: 31,
    OP_SECKILL_DETAILLIST: 32,
    OP_SECKILL_DETAILBRAND: 33,
    OP_SECKILL_CATEGORYLIST: 34,
    OP_SECKILL_CATEGORYPPMS: 35,
    OP_COUPON_GUESS: 39,
    OP_COUPON_STATUS: 40
};

module.exports = _;