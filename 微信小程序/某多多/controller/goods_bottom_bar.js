function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = e(require("../common/time_util")), r = e(require("../configs/app_config")), i = e(require("../constants/groups")), o = {
    default: "更多¥  0.01抢好货",
    freeTrial: "更多¥  0.01抢好货"
}, s = {
    default: "待公布抽奖结果",
    freeTrial: "免费试用活动已结束"
}, a = function(e, t) {
    for (var r = (t = t || 2) - (e = (e || "").toString()).length, i = 0; i < r; i++) e = "0" + e;
    return e;
}, u = function(e, r, i) {
    var o = [];
    if (e >= r) return o;
    var s = t.default.getTimeMaterialFromTimePoint(e), u = t.default.getTimeMaterialFromTimePoint(r), l = [ s.year, a(s.month), a(s.date) ].join(""), n = [ u.year, a(u.month), a(u.date) ].join("");
    return l === n ? r - e >= 180 && (o[0] = [ u.hours, a(u.minutes) ].join(":")) : o[0] = n - l == 1 ? "明日 " + [ u.hours, a(u.minutes) ].join(":") : u.month + "月" + u.date + "日 " + [ u.hours, a(u.minutes) ].join(":"), 
    o[1] = i, o;
};

exports.default = function(e, t) {
    var a = r.default.logo, l = (t = t || {}).status, n = t.group_role, p = t.show_sku_selector, g = {
        goodsId: e.goodsId,
        goodsName: e.goodsName,
        thumbUrl: e.thumbUrl,
        normalPrice: e.minOnsaleNormalPrice,
        groupPrice: e.minOnsaleGroupPrice,
        totalPrice: e.groupTypes ? e.groupTypes[1].totalPrice : "",
        soldQuantity: e.sales + "",
        customerNumber: e.groupTypes ? e.groupTypes[1].requireNum : "",
        guestAvatar: a,
        guestName: "游客",
        luckyId: e.luckyId,
        luckyStatus: e.luckyStatus,
        isOnSale: !1,
        isFreeTrial: !1,
        isLottery: !1,
        spikeComing: !1,
        lotteryComing: !1,
        resultOn: "",
        resultLabel: "",
        lotteryWaitingLabel: "",
        eventComingLabel: "",
        canContact: !1,
        hasFreeCoupons: !1,
        hasCaptainCoupons: !1,
        hasAssociatedGroup: !1,
        isCapitalGift: !1,
        isCapitalGiftLottery: !1,
        isSpike: !1,
        isSuperSpike: !1,
        groupbuyDesc: "",
        inGroup: !1,
        showSkuSelector: !1,
        hasLocalGroup: e.hasLocalGroup ? "1" : "0",
        eventType: e.eventType
    };
    if (g.isOnSale = e.isOnSale, g.isFreeTrial = e.isFreeTrial, g.isLottery = e.isLottery || e.isCapitalGiftLottery, 
    g.isSpike = e.isSpike, g.isSuperSpike = e.isSuperSpike, g.isCapitalGift = e.isCapitalGift, 
    g.isCapitalGiftLottery = e.isCapitalGiftLottery, (e.isSpike || e.isSuperSpike) && e.eventComing && (g.spikeComing = !0, 
    e.groupTypes && e.groupTypes[1])) if (e.groupTypes[1].startTime - e.serverTime > 177) {
        var m = e.reminded ? "开抢 已设提醒" : "提醒我";
        g.eventComingLabel = u(e.serverTime, e.groupTypes[1].startTime, m);
    } else g.eventComingLabel = [];
    return (g.isLottery || g.isFreeTrial) && e.eventComing && (g.lotteryComing = !0, 
    g.eventComingLabel = u(e.serverTime, e.luckyStartTime, "开团购买")), e.isGroupFree && e.freeCoupon && e.freeCoupon.length > 0 && (g.hasFreeCoupons = !0), 
    e.isTZYY && (g.hasCaptainCoupons = !0), e.isFreeTrial ? (g.resultLabel = o.freeTrial, 
    g.lotteryWaitingLabel = s.freeTrial) : (g.resultLabel = o.default, g.lotteryWaitingLabel = s.default), 
    (g.isFreeTrial || g.isLottery) && e.luckyEndTime < e.serverTime && (2 === e.luckyStatus || 3 === e.luckyStatus ? g.resultOn = "on" : g.resultOn = "waiting"), 
    g.groupbuyDesc = "开团购买", e.isFreeTrial ? g.groupbuyDesc = "开团购买" : e.isCapitalGift || e.isCapitalGiftLottery ? g.groupbuyDesc = "开团送礼" : g.groupbuyDesc = "开团购买", 
    l == i.default.GroupStatus.OnGoing ? (g.hasAssociatedGroup = !0, n == i.default.GroupRole.Member || n == i.default.GroupRole.Lead ? (g.inGroup = !0, 
    g.groupRoleDesc = "邀请好友参团") : (g.groupRoleDesc = "立即参团", g.isOnSale && (g.showSkuSelector = !0))) : (g.hasAssociatedGroup = !1, 
    l != i.default.GroupStatus.Success && l != i.default.GroupStatus.Failed && "1" !== p || !g.isOnSale || "on" == g.resultOn || "waiting" == g.resultOn || (g.showSkuSelector = !0)), 
    g;
};