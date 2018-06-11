function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = require("../constants/event_constant"), a = e(require("./data_util")), r = e(require("./std_format")), i = e(require("./object_util"));

exports.default = {
    getLotteryRules: function(e, o) {
        function u(e) {
            function t(e) {
                return e < 10 && (e = "0" + e), e;
            }
            var r = e.getMonth() + 1, i = e.getDate(), o = t(e.getHours()), u = t(e.getMinutes());
            return a.default.formatByPos("{0}月{1}日{2}:{3}", r, i, o, u);
        }
        var d = new Date(1e3 * e.start_time), l = new Date(1e3 * e.end_time);
        o = o || e.rule || i.default.assign({}, t.Rules.LuckyDraw);
        var s = u(d), n = u(l), f = e.name, m = e.goods_quantity, c = r.default.price(e.coupons_value, 100), y = void 0, _ = void 0;
        switch (_ = e.shipping_time ? new Date(1e3 * e.shipping_time) : new Date(1e3 * (e.end_time + 86400)), 
        y = a.default.formatByPos("{0}月{1}日", _.getMonth() + 1, _.getDate()), o.time = a.default.formatByPos(o.time, s, n), 
        o.key) {
          case "LuckyDraw":
            o.detail = [ o.detail[0], a.default.formatByPos(o.detail[1], f, m, c), a.default.formatByPos(o.detail[2], y) ];
            break;

          case "FreeTrial":
            o.detail = [ a.default.formatByPos(o.detail[0], m, f), a.default.formatByPos(o.detail[1], y), o.detail[2] ];
            break;

          case "DepositeGroup":
            o.detail = [ a.default.formatByPos(o.detail[0], m, f), a.default.formatByPos(o.detail[1], c), o.detail[2], a.default.formatByPos(o.detail[3], y), o.detail[4] ];
        }
        return o;
    }
};