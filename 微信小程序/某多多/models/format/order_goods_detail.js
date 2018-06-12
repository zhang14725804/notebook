function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
}, o = e(require("../../common/std_format")), r = e(require("../../common/image_util")), s = e(require("../../constants/goods")), i = require("../../common/message"), n = {
    getGroupTypes: function(e) {
        e = e || [];
        for (var t = [], r = {}, s = 0; s < e.length; s++) {
            var i = e[s];
            "0" == i.is_open || r[i.customer_num] || (t.push({
                requireNum: i.customer_num.toString(),
                customerNum: i.customer_num.toString(),
                price: o.default.price(i.price, 100),
                totalPrice: o.default.price(i.price * i.customer_num, 100),
                groupId: i.group_id,
                startTime: parseInt(i.start_time),
                endTime: parseInt(i.end_time),
                orderLimit: parseInt(i.order_limit || "1")
            }), r[i.customer_num] = !0);
        }
        return t.sort(function(e, t) {
            return e.requireNum - t.requireNum;
        }), t;
    },
    getSkus: function(e) {
        for (var t = [], o = 0; o < e.length; o++) {
            var s = e[o];
            if ("0" != s.is_onsale) {
                var i = parseInt(s.limit_quantity, 10) || 0;
                t.push({
                    skuId: s.sku_id,
                    quantity: parseInt(s.quantity),
                    initQuantity: parseInt(s.init_quantity),
                    isOnSale: !0,
                    soldQuantity: parseInt(s.sold_quantity),
                    specs: s.specs,
                    thumbUrl: r.default.cdnCompress(s.thumb_url, s.thumb_wm),
                    limitQuantity: i,
                    groupPrice: parseInt(s.group_price, 10),
                    normalPrice: parseInt(s.normal_price, 10),
                    weight: parseInt(s.weight)
                });
            }
        }
        return t;
    },
    formatData: function(e) {
        var u = e.promotion_events ? e.promotion_events : [];
        if (u.length > 0) for (var a in u) {
            var p = u[a].event_items, m = u[a].discount_type;
            for (var _ in p) {
                var d = p[_];
                switch (m) {
                  case 4:
                    u[a].event_items[_].descountDesc = "第" + d.goods_number + "件" + o.default.price(d.discount_param, 100) + "元";
                    break;

                  case 5:
                    u[a].event_items[_].descountDesc = "第" + d.goods_number + "件减" + o.default.price(d.discount_param, 100) + "元";
                    break;

                  case 6:
                    u[a].event_items[_].descountDesc = "第" + d.goods_number + "件" + o.default.price(10 * d.discount_param, 100) + "折";
                }
            }
        }
        var c = {};
        return c.goodsId = e.goods_id || "", c.goodsDesc = e.goods_desc || "", c.goodsName = e.goods_name || "", 
        c.goodsType = e.goods_type, c.isOnsale = e.is_onsale, c.isPresale = e.is_pre_sale, 
        c.allowedRegion = e.allowed_region, c.isApp = e.is_app, c.mallId = e.mall_id, c.skus = n.getSkus(e.sku), 
        c.thumbUrl = r.default.cdnCompress(e.hd_thumb_url || e.thumb_url, e.hd_thumb_wm || e.thumb_wm), 
        c.groupTypes = n.getGroupTypes(e.group), c.eventType = e.event_type, c.freeCoupon = e.free_coupon, 
        c.realNameAuth = e.real_name_auth, c.captainCoupon = e.captain_coupon, c.costTemplateId = e.cost_template_id, 
        c.promotionEvents = u, c.isRefundable = e.is_refundable, c.spikeGroup = e.spike_group, 
        c.serverTime = e.server_time, c.hasPromotion = e.has_promotion, c.promotionActivityId = e.promotion_activity_id, 
        void 0 === t(c.eventType) && i.Message.emit(i.KEYS.UNDEFINED_EVENT_TYPE), c.isVirtualGoods = [ s.default.GoodsType.MOBILE_DATA, s.default.GoodsType.QQ_COIN, s.default.GoodsType.OIL_CARD, s.default.GoodsType.MOBILE_FARE ].indexOf(parseInt(e.goods_type, 10)) >= 0, 
        c;
    }
};

exports.default = n;