function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = e(require("../../common/std_format")), r = e(require("../../common/image_util")), a = e(require("../../constants/groups")), n = {
    formatData: function(e, n) {
        var p = {};
        return p.goodsId = e.goods_id || "", p.normalPrice = t.default.price(parseInt(e.normal_price || 0), 100), 
        p.shortName = e.short_name || "", p.eventType = parseInt(e.event_type || "0"), p.isApp = parseInt(e.is_app || "0"), 
        p.goodsName = e.goods_name || "", p.imgUrl = r.default.cdnCompress(e[n] || "", e.hd_thumb_wm || e.image_wm), 
        p.customerNum = e.group.customer_num, p.price = t.default.price(parseInt(e.group.price || 0), 100), 
        p.isFreeTrial = p.eventType === a.default.EventType.FREE_TRIAL, p.soldQuantity = t.default.sales(parseInt(e.cnt || 0)), 
        p.isCompleteLottery = [ a.default.EventType.LUCKY_DRAW, a.default.EventType.FREE_TRIAL, a.default.EventType.CAPITAL_GIFT_LOTTERY, a.default.EventType.DEPOSITE_GROUP ].indexOf(p.eventType) >= 0, 
        p.nationalFlag = e.country ? r.default.getCDNImgURL("nation/rect/" + e.country + ".png") : "", 
        p.preMarketPrice = parseInt(e.market_price || 0, 10), p.preGroupPrice = parseInt(e.group.price || 0, 10), 
        p.preSinglePrice = parseInt(e.normal_price || 0, 10), p;
    }
};

exports.default = n;