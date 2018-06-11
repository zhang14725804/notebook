function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = require("../../common/index"), r = e(require("../../constants/groups")), o = e(require("../../models/format/index_goods_item")), a = [ r.default.EventType.FREE_TRIAL, r.default.EventType.LUCKY_DRAW ];

exports.default = {
    processSpecialGoods: function(e, n) {
        var s = [];
        return (e = e || []).forEach(function(e) {
            var u = !0;
            if (a.indexOf(parseInt(e.event_type, 10)) >= 0 && 1 != e.is_app) {
                var d = o.default.formatData(e, n);
                t.User.getShowPortalFreeTrialGoods() || d.eventType !== r.default.EventType.FREE_TRIAL || (u = !1), 
                t.User.getShowPortalLotteryGoods() || d.eventType !== r.default.EventType.LUCKY_DRAW || (u = !1), 
                u && s.push(d);
            }
        }), s;
    }
};