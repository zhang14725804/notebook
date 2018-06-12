function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = e(require("../../common/data_util")), a = e(require("../../common/std_format")), r = {
    LuckyDraw: {
        key: "LuckyDraw",
        title: "抽奖规则",
        desc: '抽奖结果将实时公布，请前往微信公众号"拼多多”查看。',
        time: "{0}~{1}",
        detail: [ "1. 活动结束后将从拼单成功的所有订单中，随机抽取中奖者。", "2. 一等奖为{0}（共{1}名），二等奖会全额退款并赠送88元代金券。未达拼团人数，款项将自动原路返还。拼团成功100%中奖，至少获得二等奖。", "3. 中奖的商品预计{0}发放。" ]
    },
    FreeTrial: {
        key: "FreeTrial",
        title: "活动规则",
        desc: '活动结果将实时公布，请前往微信公众号"拼多多”查看。',
        time: "{0}~{1}",
        detail: [ "1. 活动结束后将从拼单成功的所有订单中，随机选取{0}名试用者赠送。", "2.一等奖为{0}（共{1}名），二等奖会全额退款并赠送88元代金券。未达拼团人数，款项将自动原路返还。拼团成功100%中奖，至少获得二等奖。", "3. 试用的商品预计{0}发放。", "4. 试用者完成试用报告后可以保留试用品。" ]
    }
}, i = function(e, r) {
    function i(e) {
        function a(e) {
            return e < 10 && (e = "0" + e), e;
        }
        var r = e.getMonth() + 1, i = e.getDate(), u = a(e.getHours()), o = a(e.getMinutes());
        return t.default.formatByPos("{0}月{1}日{2}:{3}", r, i, u, o);
    }
    var u = new Date(1e3 * e.start_time), o = new Date(1e3 * e.end_time), l = i(u), n = i(o), d = e.name, s = e.goods_quantity, f = a.default.price(e.coupons_value, 100), m = void 0, y = void 0;
    return y = e.shipping_time ? new Date(1e3 * e.shipping_time) : new Date(1e3 * (e.end_time + 86400)), 
    m = t.default.formatByPos("{0}月{1}日", y.getMonth() + 1, y.getDate()), r.time = t.default.formatByPos(r.time, l, n), 
    "LuckyDraw" === r.key ? r.detail = [ r.detail[0], t.default.formatByPos(r.detail[1], d, s, f), t.default.formatByPos(r.detail[2], m) ] : "FreeTrial" === r.key && (r.detail = [ t.default.formatByPos(r.detail[0], s, d), t.default.formatByPos(r.detail[1], d, s), t.default.formatByPos(r.detail[2], m), r.detail[3] ]), 
    r;
}, u = {
    formatData: function(e, t) {
        var a = {}, u = {}, o = r[(t = t || {}).rulesKey] ? JSON.parse(JSON.stringify(r[t.rulesKey])) : {};
        return e && (u = {
            luckyId: e.lucky_id,
            luckyStatus: parseInt(e.status, 10) || 0,
            luckyStartTime: parseInt(e.start_time, 10),
            luckyEndTime: parseInt(e.end_time, 10)
        }, a = i(e, o)), {
            rules: a,
            info: u
        };
    }
};

exports.default = u;