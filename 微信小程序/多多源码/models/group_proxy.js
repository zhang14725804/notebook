function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = e(require("../constants/groups")), r = e(require("../constants/goods")), a = e(require("../constants/app_constant")), o = e(require("../constants/lottery")), s = e(require("../models/format/group_order_goods")), i = require("../common/index"), u = [ {
    TITLE: [ "快来入团吧", "入团成功", "开团成功" ],
    DETAIL: [ "就差你了", "快去邀请好友加入吧", "快去邀请好友加入吧" ]
}, {
    TITLE: [ "来晚了一步！该团已被挤爆", "团购成功", "团购成功" ],
    DETAIL: [ "求人不如求自己，自己当团长吧！", "我们会尽快为您发货，请耐心等待", "我们会尽快为您发货，请耐心等待" ]
}, {
    TITLE: [ "来晚了一步！", "团购失败", "团购失败" ],
    DETAIL: [ "", "", "" ]
} ], l = {
    Default: "",
    Success: "tm_succ",
    Fail: "tm_err"
}, n = {
    GROUP: {
        DESC: "{0}，优质商品新鲜直供，一起实惠一起拼",
        UNCOMPLETE_WITH_FREE_TRAIL_GOODS: "我免费拼到了{0}，大家快来拼多多吧！",
        UNCOMPLETE_WITH_GOODS: "快来{0}元拼{1}",
        UNCOMPLETE_WITH_GOODS_AND_NUMBER: "我参加了{0}拼单，还差{1}个人！",
        COMPLETE_WITH_FREE_TRAL_GOODS: "我免费拼到了{0}，大家快来拼单吧！",
        COMPLETE_WITH_GOODS: "我{0}元拼了{1}，大家快来拼单吧！"
    },
    UNGROUP: {
        UNCOMPLETE_WITH_GOODS: "快来{0}元拼{1}，大家一起来玩吧！",
        UNCOMPLETE_WITH_FREE_TRAIL_GOODS: "快来免费拼{0}，大家一起来玩吧! ",
        UNCOMPLETE_WITH_GOODS_AND_NUMBER: "快来免费拼{0}，还差{1}个人！",
        COMPLETE_WITH_GOODS: "快来{0}元拼{1}，大家快来拼单吧！",
        COMPLETE_WITH_FREE_TRAIL_GOODS: "快来免费拼{0},大家快来拼单吧！",
        COMPLETE_WITH_GOODS_NOT_NUMBER: "{0}拼单，大家一起来玩吧！"
    }
}, p = [ {
    title: "拼团须知",
    textArr: [ "人不满退款", "人满发货", "好友参团" ]
}, {
    title: "拼团须知",
    textArr: [ "抽中发货", "0元参团" ]
}, {
    title: "拼团须知",
    textArr: [ "二等奖退款赠券", "一等奖发货", "好友参团" ]
}, {
    title: "团长送礼玩法",
    textArr: [ "分享送礼", "全部领取成团发货", "分享好友" ]
} ], d = {
    Default: "",
    Out: "img-out",
    Success: "img-succ",
    Fail: "img-fail",
    LotteryWait: "img-lottery-wait",
    LotteryEnd: "img-lottery-end"
}, _ = {
    Default: "我也要参团",
    FreeTrial: "申请试用",
    CapitalGift: "立即领取"
}, f = {
    Default: {
        title: "拼团玩法",
        steps: [ [ "选择", "心仪商品" ], [ "支付开团", "或参团" ], [ "等待好友", "参团支付" ], [ "达到人数", "团购成功" ] ]
    },
    CapitalGift: {
        title: "团长送礼玩法",
        steps: [ [ "团长", "支付包团" ], [ "分享好友", "赠送礼物" ], [ "全部领取", "成团发货" ] ]
    },
    CapitalGiftLottery: {
        title: "团长送礼玩法",
        steps: [ [ "团长", "支付开团" ], [ "分享好友", "免费领取" ], [ "拼团成功", "抽取奖品" ], [ "团员中奖", "团长必中" ] ]
    }
}, c = {
    0: {
        actTagIcon: "限时秒杀",
        actTagClass: "act-tag-icon act-spike"
    },
    1: {
        actTagIcon: "名品折扣",
        actTagClass: "act-tag-icon act-brand"
    },
    2: {
        actTagIcon: "爱逛街",
        actTagClass: "act-tag-icon act-shopping"
    },
    3: {
        actTagIcon: "品质水果",
        actTagClass: "act-tag-icon act-fruit"
    },
    4: {
        actTagIcon: "品牌清仓",
        actTagClass: "act-tag-icon act-brand-clean"
    }
}, T = {
    isLottery: "【抽奖】",
    isFreeTrial: "【免费试用】"
}, m = [ r.default.GoodsType.IMPORTS, r.default.GoodsType.OVERSEAS_TRANSSHIP, r.default.GoodsType.OVERSEAS_DM ], g = function(e) {
    var t = p[0];
    return e.isFreeTrial && !e.lotteryRuleTitle ? t = p[1] : e.isLottery ? t = p[2] : e.isCaptialGift && (t = p[3]), 
    t;
}, I = function(e) {
    var t = e.actTag;
    return c[t] ? c[t] : null;
}, O = function(e) {
    var t = "";
    return i.User.getShowGroupTitlePrefix() && (e.isFreeTrial ? t = T.isFreeTrial : e.isLottery && (t = T.isLottery)), 
    t;
}, G = function(e, r, a, o) {
    var s = {
        shareTitle: "",
        shareDesc: ""
    }, u = e.goodsName, l = e.price;
    if (a !== t.default.GroupRole.NotInGroup ? r > 0 ? o.isFreeTrial ? s.shareTitle = i.DataUtil.formatByPos(n.GROUP.UNCOMPLETE_WITH_FREE_TRAIL_GOODS, u) : s.shareTitle = i.DataUtil.formatByPos(n.GROUP.UNCOMPLETE_WITH_GOODS, l, u) : o.isFreeTrial ? s.shareTitle = i.DataUtil.formatByPos(n.GROUP.COMPLETE_WITH_FREE_TRAL_GOODS, u) : s.shareTitle = i.DataUtil.formatByPos(n.GROUP.COMPLETE_WITH_GOODS, l, u) : r > 0 ? o.isFreeTrial ? s.shareTitle = i.DataUtil.formatByPos(n.UNGROUP.UNCOMPLETE_WITH_FREE_TRAIL_GOODS, u) : s.shareTitle = i.DataUtil.formatByPos(n.UNGROUP.UNCOMPLETE_WITH_GOODS, l, u) : o.isFreeTrial ? s.shareTitle = i.DataUtil.formatByPos(n.UNGROUP.COMPLETE_WITH_FREE_TRAIL_GOODS, u) : s.shareTitle = i.DataUtil.formatByPos(n.UNGROUP.COMPLETE_WITH_GOODS, l, u), 
    s.shareDesc = i.DataUtil.formatByPos(n.GROUP.DESC, "拼多多"), e.shareDesc) {
        var p = e.shareDesc.replace("%%num", e.requireNum);
        p.replace("%%price", e.price), s.shareDesc = p;
    }
    return (o.isCapitalGift || o.isCapitalGiftLottery) && (s.shareTitle = o.ownerName + "送你一份礼物，快来领取吧！" + u), 
    s;
}, y = function(e) {
    var r = {
        server_time: e.server_time,
        group_order: {
            users: [],
            order: {
                order_goods: [],
                mall: {}
            }
        },
        location: e.location || "",
        mallServices: e.service_promise,
        selfOrderInfo: e.self_order_info,
        resourceFile: e.resource_file,
        marketPrice: (e.goods_info || {}).market_price,
        maxOnsalePrice: (e.goods_info || {}).goods_price || (e.goods_info || {}).max_on_sale_group_price,
        is_new_buyer: e.is_new_buyer,
        promotions: e.promotions
    }, a = r.group_order, o = e.group_order_info;
    Object.keys(o).forEach(function(e) {
        switch (e) {
          case "uid":
            a.owner_id = o[e];
            break;

          case "group_status":
            a.status = o[e];
            break;

          default:
            a[e] = o[e];
        }
    }), a.is_app = e.goods_info.is_app;
    var s = e.self_order_info, i = e.leader_order_info, u = t.default.GroupRole;
    a.group_role = s && s.uid === i.uid ? u.Lead : s ? u.Member : u.NotInGroup, e.self_order_info && (a.uid = e.self_order_info.uid), 
    a.users = e.order_list, a.users.forEach(function(e) {
        e && (e.join_time = e.pay_time);
    }), a.is_pre_sale = e.goods_info.is_pre_sale;
    var l = a.order.order_goods, n = e.goods_info;
    return n.lucky_draw = e.lucky_draw, n.skus = n.sku.map(function(e) {
        return {
            id: e.sku_id,
            quantity: e.quantity
        };
    }), Object.keys(n).forEach(function(e) {
        "number" == typeof n[e] && (n[e] += "");
    }), l.push(e.goods_info), r;
}, E = function(e) {
    var t = [];
    return e.map(function(e) {
        t.push({
            avatar: e.avatar,
            nickname: e.nickname || "游客",
            uid: e.uid,
            joinTime: parseInt(e.join_time, 10)
        });
    }), t.sort(function(e, t) {
        return e.joinTime - t.joinTime;
    }), t;
}, S = function(e, t) {
    return {
        mallName: e.mall_name,
        mallDesc: e.mall_desc,
        logo: e.logo,
        mallId: t,
        mallSales: e.mall_sales || 0,
        mallIconSmall: a.default.CDNImgHostName + "mall/mall_icon_small.png"
    };
}, v = function(e) {
    return e.goodsInfo.isOut ? d.Out : e.groupClass === l.Fail ? d.Fail : e.groupClass === l.Success ? e.hasLotteryRule && (parseInt(e.goodsInfo.luckyDraw.status, 10) || o.default.LotteryStatus.Start) === o.default.LotteryStatus.Complete ? d.LotteryEnd : d.Success : d.Default;
}, L = {
    receiveGroupOrderData: function(e) {
        var r = void 0;
        e = y(e);
        var n = parseInt(e.server_time, 10) || 0, p = e.is_new_buyer, d = parseInt(e.init_num, 10) || 0, c = parseInt(e.order_type || e.group_order.order_type, 10) || t.default.GroupOrderType.Default;
        r = {
            tips: {},
            serverTime: n,
            location: e.location || "",
            isNewBuyer: p,
            promotions: e.promotions
        };
        var T = e.group_order;
        r.marketPrice = e.marketPrice, r.maxOnsalePrice = e.maxOnsalePrice, T.order && T.order.order_goods || (r = null);
        var m = s.default.formatData({
            goods: T.order.order_goods[0],
            isOnsale: T.is_onsale || "1",
            isDeleted: T.is_deleted || "0"
        }), L = I(m);
        if (L) for (var C in L) L.hasOwnProperty(C) && (m[C] = L[C]);
        m.mallServices = e.mallServices || [];
        var R = parseInt(T.status, 10);
        parseInt(m.luckyDraw.status, 10) !== o.default.LotteryStatus.Start && [ t.default.EventType.LUCKY_DRAW, t.default.EventType.FREE_TRIAL ].indexOf(m.eventType) >= 0 && R === t.default.GroupStatus.OnGoing && (R = t.default.GroupStatus.Failed);
        var D = {
            userId: T.caller_id || T.uid || T.user_id || 0,
            requireNum: parseInt(T.customer_num, 10) + d,
            expireTime: parseInt(T.expire_time, 10),
            groupOrderId: T.group_order_id || "" || "0",
            groupRole: T.group_role,
            ownerId: T.owner_id,
            status: R,
            successTime: T.success_time,
            users: E(T.users),
            orderGoods: m,
            mallInfo: S(T.order.mall, T.order.mall_id),
            groupId: T.group_id,
            isApp: 1 === parseInt(T.is_app, 10),
            isPreSale: 1 === parseInt(T.is_pre_sale, 10),
            groupOrderType: c
        };
        r.customerNum = T.customer_num, r.groupOrderType = D.groupOrderType, r.goodsPreSaleClass = D.isPreSale ? "goods-pre-sale" : "", 
        r.isPreSale = D.isPreSale, D.status === t.default.GroupStatus.OnGoing && n > D.expireTime && (D.status = t.default.GroupStatus.Failed), 
        r.tips.groupTitleVisibility = "visible", r.tips.groupTitleDisplay = "block", r.status = D.status, 
        r.groupRole = D.groupRole;
        var P = 0;
        switch (r.status !== t.default.GroupStatus.OnGoing && (r.status === t.default.GroupStatus.Success ? r.groupRole === t.default.GroupRole.NotInGroup && (P = 1) : P = 2), 
        r.tips.titleStatus = P, r.tips.title = u[r.status].TITLE[r.groupRole], r.tips.txt = u[r.status].DETAIL[r.groupRole], 
        r.tips["titleStatus_" + P] = !0, r.status) {
          case t.default.GroupStatus.Success:
            r.groupClass = l.Success;
            break;

          case t.default.GroupStatus.Failed:
            r.groupClass = l.Fail;
            break;

          default:
            r.groupClass = l.Default;
        }
        r.goodsInfo = D.orderGoods, r.hasLotteryRule = [ t.default.EventType.LUCKY_DRAW, t.default.EventType.FREE_TRIAL, t.default.EventType.CAPITAL_GIFT_LOTTERY ].indexOf(r.goodsInfo.eventType) >= 0, 
        r.isFreeTrial = r.goodsInfo.eventType === t.default.EventType.FREE_TRIAL, r.isCapitalGift = r.goodsInfo.eventType === t.default.EventType.CAPITAL_GIFT, 
        r.isCapitalGiftLottery = r.goodsInfo.eventType === t.default.EventType.CAPITAL_GIFT_LOTTERY, 
        r.isLottery = r.goodsInfo.eventType === t.default.EventType.LUCKY_DRAW, r.isSoldOut = !r.goodsInfo.isOnSale, 
        r.soldOutStr = r.isSoldOut ? "1" : "0", r.goodsInfo.requireNum = D.requireNum, r.goodsInfo.isOut = r.isSoldOut && r.status === t.default.GroupStatus.OnGoing, 
        r.users = D.users, r.userAvatars = {};
        var N = D.users.length, U = Math.max(D.requireNum, N);
        r.leftUserNum = U - N, r.joinNum = N;
        for (var h = 0; h < U; h++) {
            var A = void 0, F = r.users[h];
            A = F ? {
                avatarImg: i.DataUtil.dealWithAvatarURL(F.avatar),
                avatarClass: "pp_users_normal"
            } : {
                avatarImg: a.default.BaseAvatar,
                avatarClass: "pp_users_blank"
            }, r.hasLotteryRule && (A.avatarClass2 = "pp_users_lottery2"), r.userAvatars[h] = A, 
            F && (F.avatarImg = A.avatarImg), 0 === h && F && (F.isLeader = !0);
        }
        r.usersJson = JSON.stringify(r.users), r["status_" + r.status] = !0, r.expireTime = D.expireTime, 
        r.mallInfo = D.mallInfo, r.status !== t.default.GroupStatus.OnGoing || r.isCapitalGiftLottery || r.isCapitalGift ? r.stepItemOn_3 = "" : r.stepItemOn_3 = "step_item_on", 
        r.status !== t.default.GroupStatus.Success || r.isCapitalGiftLottery || r.isCapitalGift ? r.stepItemOn_4 = "" : r.stepItemOn_4 = "step_item_on", 
        r.bottomStatus = 0;
        var x = O(r);
        r.goodsInfo.goodsName = x + r.goodsInfo.goodsName, r.status === t.default.GroupStatus.OnGoing && (r.groupRole > t.default.GroupRole.NotInGroup && r.leftUserNum > 0 ? r.bottomStatus = 1 : r.bottomStatus = 2, 
        r.isSoldOut && (r.bottomStatus = 0)), r["bottomStatus_" + r.bottomStatus] = !0, 
        r.groupOrderId = D.groupOrderId, r.skuNum = Object.keys(r.goodsInfo.skus).length, 
        r.skuNum > 0 && (r.skuId = r.goodsInfo.skus[0].skuId || 0), r.groupId = D.groupId || 0, 
        r.isSoldOut ? r.soldOutStr = "1" : r.soldOutStr = "0", r.ppwrap = "", r.status === t.default.GroupStatus.Success && (r.ppwrap = "ppwrap"), 
        r.goExclusiveGroup = "0", D.isApp && (r.goExclusiveGroup = "1"), D.isApp ? r.isApp = "1" : r.isApp = "0", 
        r.code = D.code, r.userId = D.userId, r.stampClass = v(r), r.isNewUserGroup = r.goodsInfo.eventType === t.default.EventType.NEW_USER_GROUP, 
        r.lotteryRuleTitle = r.hasLotteryRule ? i.User.getLotteryRule() : "", r.showShareTimeline = i.User.getShowShareTimeline(), 
        r.GroupBuyButtonText = i.User.getGroupBuyButtonText(), r.joinGroupText = r.isFreeTrial ? _.Default : r.isCapitalGift || r.isCapitalGiftLottery ? _.CapitalGift : _.Default, 
        r.groupRuleText = r.isCapitalGift ? f.CapitalGift : r.isCapitalGiftLottery ? f.CapitalGiftLottery : f.Default, 
        r.createGroupText = "我也开个团", r.successTime = parseInt(D.successTime, 10), r.goodsInfo = i.ObjectUtil.assign(r.goodsInfo, this.getImportInfo(r.goodsInfo)), 
        r.selfOrderInfo = e.selfOrderInfo, r.audioInfo = e.resourceFile && e.resourceFile.url ? {
            url: e.resourceFile.url,
            duration: e.resourceFile.audio_duration
        } : null;
        var k = G(r.goodsInfo, r.leftUserNum, r.groupRole, {
            isFreeTrial: r.isFreeTrial,
            expireTime: r.expireTime,
            serverTime: r.serverTime,
            isCapitalGift: r.isCapitalGift,
            isCapitalGiftLottery: r.isCapitalGiftLottery,
            ownerName: r.users[0].nickname,
            isLottery: r.isLottery
        });
        return r.shareInfo = k, r.groupNoticeBarText = g(r), r;
    },
    isImportGoods: function(e) {
        return e = +e, m.indexOf(e) >= 0;
    },
    isOverseaGoods: function(e) {
        return e = +e, m.indexOf(e) > 0;
    },
    getImportInfo: function(e) {
        var t = this.isImportGoods(e.goodsType), o = this.isOverseaGoods(e.goodsType), s = e.country || "", i = {
            countryImg: "",
            goodsCountry: ""
        };
        return t && (i.countryImg = [ a.default.CDNImgHostName, "nation/rect/", s.trim(), ".png" ].join(""), 
        i.goodsCountry = s + "进口", e.warehouse && (i.goodsWarehouse = e.warehouse + "发货"), 
        o && (i.goodsCountry = s + (parseInt(e.goodsType, 10) === r.default.GoodsType.OVERSEAS_DM ? "直邮" : "直供"), 
        i.goodsWarehouse = e.warehouse + "发货")), i;
    },
    receiveLocalGroupData: function(e, t, r) {
        if (t = parseInt(t) || 0, e && i.DataUtil.isArray(e)) {
            for (var a = [], o = 0; o < e.length; o++) {
                var s = {};
                try {
                    s = JSON.parse(e[o]) || {};
                } catch (e) {
                    console.log(e);
                }
                !s.group_order_id || parseInt(s.expire_time) < t || a.push({
                    groupOrderId: s.group_order_id,
                    cityName: s.city_name,
                    nickname: s.nickname || "游客",
                    avatar: i.DataUtil.dealWithAvatarURL(s.avatar),
                    requireNum: parseInt(s.require_num || 1, 10),
                    usersNum: parseInt(s.users_num || 1, 10),
                    expireTime: s.expire_time
                });
            }
            return {
                localGroups: a,
                serverTime: t,
                total: r
            };
        }
    }
};

exports.default = L;