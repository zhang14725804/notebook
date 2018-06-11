Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../common/std_format")), s = {
    formatData: function(s) {
        var t = s.goods, r = s.isOnsale, i = s.isDeleted;
        r = r && "0" !== t.is_onsale;
        var o = function(e) {
            if (!e) return {};
            var s = {};
            return Object.keys(e).map(function(t) {
                s[t] = {
                    skuId: e[t].id,
                    quantity: parseInt(e[t].quantity, 10) || 0
                };
            }), s;
        }(t.skus), u = !1;
        return u = !!(t.skus && t.skus[0] && t.skus[0].id) && Object.keys(o).some(function(e) {
            var s = o[e];
            if (s.quantity > 0) return s;
        }), {
            actTag: parseInt(t.act_tag, 10),
            goodsId: t.goods_id,
            goodsName: t.goods_name,
            goodsNumber: t.goods_number,
            price: e.default.price(t.goods_price, 100),
            originPrice: t.goods_price,
            thumbUrl: t.hd_thumb_url || t.thumb_url,
            isOnSale: r && u,
            isDeleted: i,
            goodsType: t.goods_type,
            skus: o,
            isRefundable: "1" === t.is_refundable,
            shareDesc: t.share_desc || "",
            imageUrl: t.image_url,
            listDesc: t.list_desc,
            eventType: parseInt(t.event_type, 10),
            allowedRegions: t.allowed_regions || "",
            luckyDraw: t.lucky_draw || {},
            sales: t.sales,
            singlePrice: e.default.price(t.single_price, 100),
            gapPrice: e.default.price(t.market_price - t.goods_price, 100),
            country: t.country,
            shipmentLimitHour: t.shipment_limit_second ? t.shipment_limit_second / 3600 : 0,
            quickRefund: "1" === t.quick_refund
        };
    }
};

exports.default = s;