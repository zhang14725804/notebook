function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = function(e, s, m) {
    var g = [];
    if (!a.default.isArray(e)) return g;
    for (var _ = 0; _ < e.length; _++) {
        var v = e[_], h = parseInt(v.discount, 10), N = parseInt(v.min_amount, 10), A = parseInt(v.type, 10), S = parseInt(v.source_type, 10), M = parseInt(v.display_type, 10) || 0, D = 1 === parseInt(v.is_invalid, 10), x = parseInt(v.start_time, 10), F = parseInt(v.end_time, 10), B = parseInt(v.mall_id, 10), I = v.mall_name || "", U = v.link_url || "", E = parseInt(v.count, 10) || 1, O = {
            key: v.coupon_id.toString(),
            expiredTime: F,
            startTime: p.default.formatTime(new Date(1e3 * x), "yyyy.M.d"),
            endTime: p.default.formatTime(new Date(1e3 * F), "yyyy.M.d"),
            leftTime: 0 != s || M != n && M != i ? "" : F - m,
            discount: o.default.price(h, 100),
            batchName: T(v.batch_name) || "",
            minAmount: o.default.price(N, 100),
            orderSN: v.order_sn || "",
            type: A,
            isFree: A === t.default.CouponBatchType.GroupFreeCoupon || M === t.default.CouponBatchType.GroupFreeCoupon,
            isMall: A === t.default.CouponBatchType.MallCoupon,
            isCategory: M === t.default.CouponDisplayType.Category,
            isApp: M === t.default.CouponDisplayType.App || M === t.default.CouponDisplayType.AppMobile,
            isWxappCoupons: M === t.default.CouponDisplayType.WxappCoupons,
            goodsType: v.goods_type,
            mallId: B,
            mallName: I,
            scope: v.rules_desc || (v.display_type == t.default.CouponBatchType.GroupFreeCoupon ? l.ChiefFree : l.Unlimited),
            linkUrl: U,
            count: E,
            receiveTime: v.receive_time,
            displayType: M,
            status: v.status,
            sourceType: S
        };
        if (0 == s && (M == n || M == i)) {
            var R = F - x, G = Math.floor(R / 3600);
            O.timeInUseHours = G;
        }
        if (O.isMobileFare = A === t.default.CouponBatchType.CategoryCoupon && O.goodsType.toString() == u.default.GoodsType.MOBILE_FARE, 
        O.isMobileFare && (O.isCategory = !0), b(O.goodsType) ? O.scope = l.VirtualGoods : C(O.goodsType) && (O.scope = l.Overseas), 
        D || O.orderSN || 1 == s && E > 0 ? (O.style = r.Used, O.couponStatus = f.Used) : F < m || 5 == O.status ? (O.style = r.Out, 
        O.couponStatus = f.Expired) : x > m ? (O.style = r.Available, O.couponStatus = f.Frozen, 
        O.isFrozen = !0) : (O.style = r.Available, h === N || A === t.default.CouponBatchType.GoodsCoupon ? O.couponStatus = f.Cash : O.couponStatus = f.Bound), 
        O.style === s) {
            if (O.style === r.Out) {
                if (O.couponStatus === f.Used && !D && !O.orderSN) continue;
                if (O.couponStatus === f.Expired && F >= m && 5 != O.status) continue;
            }
            if (O.isMall ? (O.couponTypeName = d.Mall, O.scope = l.Mall + I, M == t.default.CouponDisplayType.Exclusive ? (O.couponTypeName = d.Exclusive, 
            O.batchName = O.discount + "元专属优惠券", O.scope = l.Mall + I + "店内指定商品使用") : M == t.default.CouponDisplayType.SpecificGoods && (O.couponTypeName = "商品券", 
            O.batchName = O.discount + "元无门槛商品券", O.scope = "仅限" + I + "专营店店内指定商品使用")) : O.isCategory ? (O.couponTypeName = d.Category, 
            O.isMobileFare && (O.scope = l.MobileFare)) : O.isApp ? O.couponTypeName = d.App : O.isWxappCoupons ? O.couponTypeName = d.WxappCoupons : 18 == O.type && 30 == O.sourceType ? 0 == s ? (O.couponTypeName = "持有" + O.count + "张", 
            O.labelStyle = "coupon_label_618_avi") : 1 == s && (O.couponTypeName = "已使用" + O.count + "张", 
            O.labelStyle = "coupon_label_618_used") : M == t.default.CouponDisplayType.Shuang11 && O.count > 0 ? (O.couponTypeName = d.Shuang11, 
            0 == s ? (O.couponTypeName = "持有" + O.count + "张", O.labelStyle = "coupon_label_super_avi") : 1 == s && (O.couponTypeName = "已使用" + O.count + "张", 
            O.labelStyle = "coupon_label_super_used")) : M == t.default.CouponDisplayType.Anniversary ? O.couponTypeName = d.Anniversary : h === N || A === t.default.CouponBatchType.GoodsCoupon ? (O.couponTypeName = d.Cash, 
            O.batchName = T(v.batch_name, "cash", h) || "") : O.couponTypeName = d.Bound, O.bgUrl = c.CouponBgNew, 
            O.style === r.Out || O.style === r.Used ? (O.bgColor = y.Out, O.isOut = !0) : O.isMall ? O.bgColor = y.Mall : O.isCategory ? O.bgColor = y.Bound : O.isApp || O.isWxappCoupons ? O.bgColor = y.App : O.couponTypeName === d.Bound || O.couponTypeName === d.Cash || O.couponTypeName === d.Anniversary ? O.bgColor = y.Bound : M == t.default.CouponDisplayType.Shuang11 ? O.bgColor = y.Superimposed : O.bgColor = y.Out, 
            0 == s && M == i && (O.batchName = O.discount + "元无门槛红包", O.couponTypeName = "现金红包"), 
            A != t.default.CouponBatchType.superimposedCoupon && M != t.default.CouponDisplayType.Shuang11 || (O.isFrozen = !1, 
            !O.isOut && O.count > 1 ? O.bgUrl = c.Superimposed : O.isOut && O.count > 1 && (O.bgUrl = c.SuperimposedUsed)), 
            O.scopeClass = O.isOut || O.isFrozen ? "scope-out" : "scope-available", 0 == s) {
                p.default.formatTime(O.receiveTime, "yyyy/MM/dd") == p.default.formatTime(m, "yyyy/MM/dd") && (O.labelStyle = "coupon_label_today_got");
                var L = Math.ceil((F - m) / 86400);
                L > 0 && L <= 3 && (O.leftDays = L, O.labelStyle = "coupon_label_to_expired"), x > m && (O.labelStyle = "coupon_label_not_use");
            }
            g.push(O);
        }
    }
    return g;
};

var o = e(require("../../common/std_format")), a = e(require("../../common/data_util")), p = e(require("../../common/time_util")), t = e(require("../../constants/coupons")), u = e(require("../../constants/goods")), s = e(require("../../common/image_util")), l = {
    None: "",
    Unlimited: "全场通用(除话费等特殊商品)",
    Cash: "仅限指定商品",
    Free: "点击选择团免商品",
    Mall: "仅限",
    MobileFare: "仅限话费商品使用",
    Overseas: "仅限海淘商品（包括进口、直供、直邮商品）",
    VirtualGoods: "仅限话费流量使用",
    ChiefFree: "仅限特权免单商品可用"
}, n = 32, i = 27, r = {
    Available: 0,
    Used: 1,
    Out: 2
}, d = {
    Cash: "现金券",
    Bound: "通用券",
    Category: "类目券",
    Free: "团免券",
    Mall: "店铺券",
    App: "App专享券",
    Anniversary: "周年庆",
    Shuang11: "双旦礼",
    Exclusive: "专属券",
    WxappCoupons: "小程序专享"
}, c = {
    BoundAvailable: s.default.getCDNImgURL("coupons/v2/bound_available_bg.png"),
    BoundExpired: s.default.getCDNImgURL("coupons/v2/bound_expired_bg.png"),
    CategoryAvailable: s.default.getCDNImgURL("coupons/v2/category_available_bg.png"),
    CategoryExpired: s.default.getCDNImgURL("coupons/v2/category_expired_bg.png"),
    FreeAvailable: s.default.getCDNImgURL("coupons/v2/free_available_bg.png"),
    FreeExpired: s.default.getCDNImgURL("coupons/v2/free_expired_bg.png"),
    MallAvailable: s.default.getCDNImgURL("coupons/v2/mall_available_bg.png"),
    MallExpired: s.default.getCDNImgURL("coupons/v2/mall_expired_bg.png"),
    AppAvailable: s.default.getCDNImgURL("coupons/v2/app_available_bg.png"),
    AppExpired: s.default.getCDNImgURL("coupons/v2/app_expired_bg.png"),
    Superimposed: "http://minipinduoduo.oss-cn-shanghai.aliyuncs.com/coupon/superimposed_avi_bg.png",
    SuperimposedUsed: "http://minipinduoduo.oss-cn-shanghai.aliyuncs.com/coupon/superimposed_used_bg.png",
    CouponBgNew: "http://minipinduoduo.oss-cn-shanghai.aliyuncs.com/coupon/coupon__bg_new.png"
}, y = {
    Bound: "#FF7472",
    Category: "#5ccaf7",
    Free: "#FFAB5B",
    Mall: "#FFAB5B",
    App: "#68D162",
    Out: "#D2D2D2",
    Superimposed: "#E02E24"
}, m = [ u.default.GoodsType.IMPORTS, u.default.GoodsType.OVERSEAS_TRANSSHIP, u.default.GoodsType.OVERSEAS_DM ], g = [ u.default.GoodsType.MOBILE_DATA, u.default.GoodsType.MOBILE_FARE, u.default.GoodsType.TRADE_COUPON ], f = {
    Available: {
        label: "立即使用",
        class: "status-available",
        stamp: ""
    },
    Cash: {
        label: "立即使用",
        class: "status-cash",
        stamp: ""
    },
    Bound: {
        label: "立即使用",
        class: "status-bound",
        stamp: ""
    },
    Frozen: {
        label: "未激活",
        class: "status-frozen",
        stamp: "stamp-frozen"
    },
    Used: {
        label: "已使用",
        class: "status-used",
        stamp: "stamp-used"
    },
    Expired: {
        label: "已过期",
        class: "status-expired",
        stamp: "stamp-expired"
    }
}, _ = function(e, o) {
    if (!a.default.isArray(e) || !a.default.isArray(o)) return !1;
    if (0 === e.length || 0 === o.length || e.length < o.length) return !1;
    for (var p = 0; p < o.length; p++) if (-1 === e.indexOf(o[p])) return !1;
    return !0;
}, b = function(e) {
    return _(g, e);
}, C = function(e) {
    return _(m, e);
}, T = function(e, a, p) {
    var t = void 0, u = e.length;
    return u > 3 && "优惠券" === e.substring(u - 3) && (t = e.substring(0, u - 3)), a && "cash" === a && p && (t = "满" + o.default.price(p + 1, 100) + "减" + o.default.price(p, 100)), 
    "团长免单券" === e && (t = "1次免单机会"), void 0 === t ? e : t;
};