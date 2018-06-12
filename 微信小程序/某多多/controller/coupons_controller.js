function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var n = e(require("../common/data_util")), o = e(require("../common/std_format")), t = e(require("../common/time_util")), u = e(require("../common/object_util")), a = {
    getLeftNumber: function(e, n) {
        var o = 0;
        if (!e || !n) return o;
        if (n.price * n.limitQuantity < e.min_amount) return o;
        var t = Math.ceil(e.min_amount / n.price - n.goodsNumber);
        return t > 0 && (o = t), o;
    },
    formatCouponsData: function(e, i) {
        var s = [], r = {}, _ = [], m = [], p = [], l = e.serverTime || 0;
        n.default.isArray(e.enableCoupons) || (e.enableCoupons = []), n.default.isArray(e.disableCoupons) || (e.disableCoupons = []);
        for (var c = function(e) {
            return {
                couponId: e.coupon_id,
                batchName: e.batch_name,
                discount: o.default.price(e.discount, 100),
                minAmount: o.default.price(e.min_amount, 100),
                startTime: t.default.formatTime(new Date(1e3 * e.start_time), "yyyy.M.d"),
                endTime: t.default.formatTime(new Date(1e3 * e.end_time), "yyyy.M.d"),
                displayType: e.display_type
            };
        }, d = void 0, f = e.enableCoupons.length, b = 0; b < f; b++) (d = e.enableCoupons[b]).min_amount === d.discount && d.min_amount++, 
        s.push(c(d));
        e.enableSuperpositionCoupons && (r = function(e) {
            return {
                batchName: e.batch_name,
                discount: o.default.price(e.discount, 100),
                startTime: t.default.formatTime(new Date(1e3 * e.start_time), "yyyy.M.d"),
                endTime: t.default.formatTime(new Date(1e3 * e.end_time), "yyyy.M.d"),
                rulesDesc: e.rules_desc,
                maxAvailableNum: e.max_available_num,
                selectedNum: e.max_available_num,
                selectedCertainNum: e.max_available_num,
                reduceSuperDisable: 1 == e.max_available_num,
                increaseSuperDisable: !0,
                showSuperEditBtn: !1,
                usable: e.usable,
                userPossessNum: e.user_possess_num,
                superpositionConfig: {
                    maxAvailableNum: e.superposition_coupon_config && e.superposition_coupon_config.max_available_num ? e.superposition_coupon_config.max_available_num : 5,
                    minOrderAmount: e.superposition_coupon_config && e.superposition_coupon_config.min_order_amount ? o.default.price(e.superposition_coupon_config.min_order_amount, 100) : 50
                },
                couponId: "101010"
            };
        }(e.enableSuperpositionCoupons));
        for (var A = e.disableCoupons.length, O = [], y = 0; y < A; y++) if ("COUPON_AVAILABLE_FOR_APP_ONLY" != (d = e.disableCoupons[y]).unusable_reason_code) {
            d.coupon_info.min_amount === d.coupon_info.discount && d.coupon_info.min_amount++;
            var N = u.default.assign({
                leftNumber: a.getLeftNumber(d, i) + "",
                disableReason: "",
                activated: 1
            }, c(d.coupon_info));
            l > 0 && l < d.start_time && (N.activated = 0, N.disableReason = "未到使用时间"), "COUPON_UNAVAILABLE_FOR_GOODS" == d.unusable_reason_code ? (N.disableReason = "COUPON_UNAVAILABLE_FOR_GOODS", 
            p.push(N)) : "CATEGORY_IS_UNAVAILABLE" == d.unusable_reason_code || d.unusable_reason_code.indexOf("COUPON_UNAVAILABLE_FOR") > -1 ? (N.disableReason = "当前商品所属品类不可用", 
            p.push(N)) : "ORDER_AMOUNT_BELOW_LIMITATION" == d.unusable_reason_code ? (N.disableReason = "ORDER_AMOUNT_BELOW_LIMITATION", 
            m.push(N)) : p.push(N), l > 0 && l < d.start_time ? O.push(N) : _.push(N);
        }
        return m.length > 0 && (m = (m = m.sort(function(e, n) {
            return parseInt(n.discount, 10) - parseInt(e.discount, 10);
        })).sort(function(e, n) {
            return parseInt(e.minAmount, 10) - parseInt(n.minAmount, 10);
        })), p.length > 0 && (p = (p = p.sort(function(e, n) {
            return parseInt(n.discount, 10) - parseInt(e.discount, 10);
        })).sort(function(e, n) {
            return parseInt(e.minAmount, 10) - parseInt(n.minAmount, 10);
        })), _ = m.concat(p).concat(O), {
            enableCoupons: s,
            enableSuperpositionCoupons: r,
            disableCoupons: _
        };
    }
};

exports.default = a;