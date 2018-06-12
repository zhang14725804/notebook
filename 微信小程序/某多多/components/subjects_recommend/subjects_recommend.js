Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = require("../../common/index"), r = {
    formatData: function(r) {
        var t = [];
        return (r.goods_list || []).forEach(function(r) {
            var o = {
                goodsId: r.goods_id,
                goodsName: r.short_name || r.goods_name || "",
                thumbUrl: e.ImageUtil.cdnCompress(r.hd_thumb_url || r.thumb_url, r.hd_thumb_wm || r.thumb_wm),
                price: e.StdFormat.price(r.group.price, 100),
                marketPrice: e.StdFormat.price(r.market_price, 100),
                eventType: r.event_type
            };
            t.push(o);
        }), {
            dayRecGoodsList: t
        };
    }
};

exports.default = r;