function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
}, o = e(require("../storage/ram_manager")), a = e(require("../components/sku_selector/sku_selector_v2")), t = e(require("../constants/goods")), u = e(require("./navigation")), n = require("../common/index"), l = e(require("../controller/formid_controller")), s = {
    LANG_SHOULD_BUY_IN_APP: "该商品在拼多多app中才能购买",
    LANG_NOT_SUPPORT_BUY: "在小程序中暂不支持购买该类商品",
    LANG_LOTTERY_CANNOT_SINGLE_BUY: "抽奖活动暂不支持单独购买",
    LANG_FREE_TRIAL_CANNOT_SINGLE_BUY: "免费试用活动暂不支持单独购买",
    LANG_CAPITAL_CANNOT_SINGLE_BUY: "团长送礼活动暂不支持单独购买"
}, _ = {
    getPriceRange: function(e, r) {
        var o = {
            normal: [ r.minOnsaleNormalPrice ],
            group: [ r.minOnsaleGroupPrice ]
        };
        return r.minOnsaleNormalPrice !== r.maxOnsaleNormalPrice && o.normal.push(r.maxOnsaleNormalPrice), 
        r.minOnsaleGroupPrice !== r.maxOnsaleGroupPrice && o.group.push(r.maxOnsaleGroupPrice), 
        e.requireNum > 1 ? o.group : o.normal;
    },
    showSkuSelector: function() {
        try {
            var e = o.default.CPPage, t = e.data.goodsInfo, u = e.$pageName;
            if (!t) return;
            var n = e.data.selectedGroup || t.groupTypes[1], l = t.hdThumbUrl || t.thumbUrl, s = "object" === r(e.data.currentSelect) ? JSON.parse(JSON.stringify(e.data.currentSelect)) : {}, _ = {
                discount: t.discount,
                goodsId: t.goodsId,
                eventType: t.eventType,
                hasLocalGroup: t.hasLocalGroup ? "1" : "0",
                skus: t.skus,
                defaultImg: l,
                priceRange: e.getPriceRange(n, t),
                selectedGroup: n,
                orderLimit: n.orderLimit,
                lastSelectSku: s,
                lastSelectGoodsNumber: e.data.goodsNumber || 1,
                isGroupBuy: n.requireNum > 1,
                pageName: u
            };
            a.default.load(_);
        } catch (e) {
            console.error(e);
        }
    },
    groupBuy: function(e) {
        var r = o.default.CPPage, u = r.data.goodsInfo;
        u && u.isOnSale && (u.isApp ? r.$showToast(s.LANG_SHOULD_BUY_IN_APP) : (r.referPageElement = "open_btn", 
        r.setData({
            selectedGroup: u.groupTypes[1],
            selectedLocalGroupOrderId: null
        }), r.$urlQueryObj.source_channel == t.default.SourceChannel.GROUP_DETAIL_TO_GOODS_DETAIL ? r.sourceChannel = r.$urlQueryObj.source_channel : r.sourceChannel = t.default.SourceChannel.GOODS_DETAIL_BOTTOM_BUY, 
        r.hasSkuSelector ? r.showSkuSelector() : a.default.confirmOrder(), e && e.detail && e.detail.formId && l.default.uploadFormIdToSH(e.detail.formId, !1), 
        u.isLottery ? _.clickTracking("going_draw") : _.clickTracking("open_btn")));
    },
    singleBuy: function(e) {
        var r = o.default.CPPage, u = r.data.goodsInfo;
        u && u.isOnSale && (u.isApp ? r.$showToast(s.LANG_SHOULD_BUY_IN_APP) : u.isLottery ? r.$showToast(s.LANG_LOTTERY_CANNOT_SINGLE_BUY) : u.isFreeTrial ? r.$showToast(s.LANG_FREE_TRIAL_CANNOT_SINGLE_BUY) : u.isCapitalGift || u.isCapitalGiftLottery ? r.$showToast(s.LANG_CAPITAL_CANNOT_SINGLE_BUY) : (r.referPageElement = "single_buy", 
        r.setData({
            selectedGroup: u.groupTypes[0],
            selectedLocalGroupOrderId: null,
            hideSkuActivityTitle: !0
        }), r.$urlQueryObj.source_channel == t.default.SourceChannel.GROUP_DETAIL_TO_GOODS_DETAIL ? r.sourceChannel = r.$urlQueryObj.source_channel : r.sourceChannel = t.default.SourceChannel.GOODS_DETAIL_BOTTOM_BUY, 
        r.hasSkuSelector ? r.showSkuSelector() : a.default.confirmOrder(), e && e.detail && e.detail.formId && l.default.uploadFormIdToSH(e.detail.formId, !1), 
        _.clickTracking("single_buy")));
    },
    clickTracking: function(e) {
        var r = o.default.CPPage, a = r.data.goodsInfo || {}, t = {
            op: "click",
            page_section: "bottom_bar",
            page_element: e,
            goods_id: a.goodsId,
            event_type: a.eventType,
            has_local_group: a.hasLocalGroup ? "1" : "0",
            sku_num: (a.skus || []).length
        };
        "goods" === r.$pageName && ("single_buy" === t.page_element && (t.page_el_sn = 99809), 
        "open_btn" === t.page_element && (t.page_el_sn = 99811)), "goods_comments" === r.$pageName && ("single_buy" === t.page_element && (t.page_el_sn = 99817), 
        "open_btn" === t.page_element && (t.page_el_sn = 99816)), (0, n.TrackingRecord)(t);
    },
    groupBuyOrPromptShare: function() {
        var e = o.default.CPPage, r = e.goodsBottomBarData;
        if (r && r.inGroup) {
            var a = e.$urlQueryObj.group_order_id;
            if (a) {
                var t = getCurrentPages();
                return void (t.length >= 2 && "pages/group/group" == t[t.length - 2].__route__ ? u.default.back() : u.default.forward("/pages/group/group?group_order_id=" + a));
            }
        }
        e.groupBuy && e.groupBuy();
    }
};

exports.default = _;