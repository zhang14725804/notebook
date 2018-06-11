function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = e(require("../../common/std_format")), a = e(require("../../common/time_util")), m = {
    formatData: function(e) {
        var m = {};
        return m.mallId = e.mall_id, m.mallName = e.mall_name, m.goodsNum = e.goods_num, 
        m.isOpen = e.is_open, m.logo = e.logo, m.mallCoupons = [], (e.mall_coupons || []).forEach(function(e) {
            e.min_amount === e.discount && e.min_amount++, m.mallCoupons.push({
                batchId: e.id,
                batchName: e.batch_name,
                mallId: e.mall_id,
                startTime: a.default.formatTime(new Date(1e3 * e.start_time), "yyyy.M.d"),
                endTime: a.default.formatTime(new Date(1e3 * e.end_time), "yyyy.M.d"),
                discount: t.default.price(e.discount, 100),
                startTimeForToast: a.default.formatTime(new Date(1e3 * e.start_time), "yyyy.MM.dd"),
                endTimeForToast: a.default.formatTime(new Date(1e3 * e.end_time), "yyyy.MM.dd"),
                minAmount: t.default.price(e.min_amount, 100),
                couponDisableText: e.is_taken_out ? "已抢光" : "已领取",
                takenOut: e.is_taken_out,
                canReceived: !e.is_taken_out,
                displayType: e.display_type
            });
        }), m.mallDesc = e.mall_desc, m.mallId = e.mall_id, m.mallSales = e.mall_sales, 
        m.soldQuantity = t.default.sales(e.mall_sales), m;
    },
    formatMallCouponData: function(e) {
        var m = [];
        return (e.mall_coupons || []).forEach(function(e) {
            e.min_amount === e.discount && e.min_amount++, m.push({
                batchId: e.id,
                batchName: e.batch_name,
                mallId: e.mall_id,
                startTime: a.default.formatTime(new Date(1e3 * e.start_time), "yyyy.M.d"),
                endTime: a.default.formatTime(new Date(1e3 * e.end_time), "yyyy.M.d"),
                discount: t.default.price(e.discount, 100),
                startTimeForToast: a.default.formatTime(new Date(1e3 * e.start_time), "yyyy.MM.dd"),
                endTimeForToast: a.default.formatTime(new Date(1e3 * e.end_time), "yyyy.MM.dd"),
                minAmount: t.default.price(e.min_amount, 100),
                couponDisableText: e.is_taken_out ? "已抢光" : "已领取",
                takenOut: e.is_taken_out,
                canTakenCount: e.can_taken_count,
                displayType: parseInt(e.display_type || "")
            });
        }), m;
    }
};

exports.default = m;