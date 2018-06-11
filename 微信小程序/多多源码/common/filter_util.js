function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = e(require("../constants/goods")), d = e(require("../constants/groups")), T = {
    filter: function(e, T) {
        e = parseInt(e, 10), T = parseInt(T, 10);
        var E = [ t.default.GoodsType.DEFAULT, t.default.GoodsType.IMPORTS, t.default.GoodsType.OVERSEAS_TRANSSHIP, t.default.GoodsType.OVERSEAS_DM, t.default.GoodsType.MOBILE_DATA, t.default.GoodsType.MOBILE_FARE, t.default.GoodsType.TRADE_COUPON, t.default.GoodsType.QQ_COIN, t.default.GoodsType.OIL_CARD, t.default.GoodsType.MAKE_UP ], u = [ d.default.EventType.DEFAULT, d.default.EventType.SPIKE, d.default.EventType.FREE_GROUP, d.default.EventType.SUPER_SPIKE, d.default.EventType.FREE_TRIAL, d.default.EventType.LUCKY_DRAW, d.default.EventType.NEW_USER_GROUP, d.default.EventType.LIMIT_TIME_FREE, d.default.EventType.MORE_THAN_ONE_DISCOUNT, d.default.EventType.LIMIT_TIME_DISCOUNT, d.default.EventType.LIMIT_COUNT_DISCOUNT, d.default.EventType.DUODUO_JINBAO ];
        return E.indexOf(T) >= 0 && u.indexOf(e) >= 0;
    }
};

exports.default = T;