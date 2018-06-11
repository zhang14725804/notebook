function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var a = e(require("../../common/std_format")), t = e(require("../../common/image_util"));

exports.default = {
    formatData: function(e) {
        var r = e.group || {}, o = parseInt(r.customer_num || e.customer_num || 0), i = r.price || e.price, s = {
            ad: e.ad,
            key: "goods-" + e.goods_id,
            goodsId: e.goods_id,
            isApp: e.is_app,
            imgUrl: t.default.cdnCompress(e.hd_thumb_url || e.thumb_url, e.hd_thumb_wm || e.thumb_wm),
            goodsName: e.goods_name,
            brandName: e.brand_name,
            groupDesc: o + "人团",
            price: a.default.price(i, 100),
            marketPrice: a.default.price(e.market_price, 100),
            soldQuantity: a.default.sales(e.sales || e.cnt),
            customerNum: parseInt(o, 10),
            nationalFlag: e.country ? t.default.getCDNImgURL("nation/rect/" + e.country + ".png") : "",
            tag: parseInt(e.tag, 10),
            icon: e.icon,
            eventType: e.event_type,
            hasMallCoupon: parseInt(e.has_mall_coupon, 10) || 0,
            priceDiscount: e.priceDiscount || ""
        }, c = [ "spike", "economical-brand", "go-shopping", "good-fruit", "brand-clean" ];
        return !isNaN(s.tag) && s.tag >= 0 && s.tag < c.length && (s.activityFlagClass = "activity-flag activity-flag-gap activity-flag-" + c[s.tag]), 
        s.allowance = a.default.getDiscount(s.price, s.marketPrice), s.transData = {
            goodsId: s.goodsId,
            preGroupPrice: parseInt(i, 10),
            preSinglePrice: parseInt(e.normal_price, 10),
            preMarketPrice: parseInt(e.market_price, 10),
            goodsName: s.goodsName,
            customerNum: s.customerNum,
            ad: e.ad,
            p_rec: e.p_rec,
            p_search: e.p_search,
            preloadImgUrl: s.imgUrl
        }, s;
    }
};