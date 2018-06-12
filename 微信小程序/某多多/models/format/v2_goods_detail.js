function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = e(require("../../common/std_format")), r = e(require("../../common/data_util")), i = e(require("../../common/time_util")), a = e(require("../../constants/image")), s = e(require("../../constants/goods")), n = e(require("../../constants/groups")), o = e(require("../../constants/promotion")), u = e(require("../../common/image_util")), l = {
    min: .625,
    max: 1
}, p = {
    getGroupTypes: function(e, r) {
        e = e || [];
        for (var i = [], a = {}, s = 0; s < e.length; s++) {
            var n = e[s];
            "0" == n.is_open || a[n.customer_num] || (i.push({
                requireNum: n.customer_num.toString(),
                price: t.default.price(n.price, 100),
                totalPrice: t.default.price(n.price * n.customer_num, 100),
                marketPriceDeltaPrice: t.default.price(r - n.price, 100),
                groupId: n.group_id,
                startTime: parseInt(n.start_time),
                endTime: parseInt(n.end_time),
                orderLimit: parseInt(n.order_limit || "1")
            }), a[n.customer_num] = !0);
        }
        return i.sort(function(e, t) {
            return e.requireNum - t.requireNum;
        }), i;
    },
    getSkus: function(e, r, i) {
        for (var a = [], s = 0; s < e.length; s++) {
            var n = e[s], o = parseInt(n.is_onsale) || 0;
            if (0 !== o) {
                var l = parseInt(n.limit_quantity, 10) || 0;
                a.push({
                    skuId: n.sku_id,
                    quantity: parseInt(n.quantity),
                    initQuantity: parseInt(n.init_quantity),
                    isOnSale: o,
                    soldQuantity: parseInt(n.sold_quantity),
                    specs: n.specs,
                    thumbUrl: u.default.cdnCompress(n.thumb_url || r, n.thumb_wm || i),
                    limitQuantity: l,
                    normalPrice: t.default.price(n.normal_price, 100),
                    groupPrice: t.default.price(n.group_price, 100)
                });
            }
        }
        return a;
    },
    getGallery: function(e) {
        if (!e) return {};
        var t = [], r = [];
        e = e.sort(function(e, t) {
            return e.priority - t.priority;
        });
        var i = 375 * l.max;
        return e.forEach(function(e) {
            e.downloadUrl = e.url, e.url = u.default.cdnCompress(e.url);
            var s = e.type + "";
            if (s === a.default.GalleryType.Top && (t.push(e), e.height > 0 && e.width > 0)) {
                var n = 0;
                (n = e.height / e.width >= l.max ? 375 * l.max : 375 * l.min) < i && (i = n);
            }
            s === a.default.GalleryType.Detail && r.push(e);
        }), {
            detailGallery: r,
            topGallery: t,
            bannerHeight: i
        };
    },
    getHaitaoStatus: function(e) {
        return (e = parseInt(e) || 0) === s.default.GoodsType.IMPORTS || e === s.default.GoodsType.OVERSEAS_TRANSSHIP || e === s.default.GoodsType.OVERSEAS_DM;
    },
    getGroupEventTypeData: function(e, t, r, i) {
        e = parseInt(e, 10) || 0;
        var a = !1, s = !1, o = !1, u = !1, l = !1, p = !1, c = !1, m = !1, _ = !1, d = !1, f = !1;
        switch (t.length > 1 && t[1].startTime > i && (a = !0), e) {
          case n.default.EventType.NEW_USER_GROUP:
            s = !0;
            break;

          case n.default.EventType.LUCKY_DRAW:
            r > 0 && (o = !0);
            break;

          case n.default.EventType.FREE_TRIAL:
            r > 0 && (u = !0);
            break;

          case n.default.EventType.SPIKE:
            l = !0;
            break;

          case n.default.EventType.SUPER_SPIKE:
            p = !0;
            break;

          case n.default.EventType.FREE_GROUP:
            c = !0;
            break;

          case n.default.EventType.CAPITAL_GIFT:
            m = !0;
            break;

          case n.default.EventType.CAPITAL_GIFT_LOTTERY:
            r > 0 && (_ = !0);
            break;

          case n.default.EventType.TZYY:
            d = !0;
            break;

          case n.default.EventType.LIMIT_TIME_DISCOUNT:
            f = !0;
        }
        return {
            eventComing: a,
            isNewUserGroup: s,
            isLottery: o,
            isFreeTrial: u,
            isSpike: l,
            isSuperSpike: p,
            isGroupFree: c,
            isCapitalGift: m,
            isCapitalGiftLottery: _,
            isTZYY: d,
            isLimitDiscount: f
        };
    },
    getShipmentLimitHour: function(e) {
        return (parseInt(e.shipment_limit_second) || 0) / 3600;
    },
    getPromotionsFromData: function(e) {
        var t = [];
        return r.default.isArray(e) ? (e.forEach(function(e) {
            t.push({
                id: parseInt(e.id, 10),
                type: e.type,
                startTime: parseInt(e.start_time, 10),
                endTime: parseInt(e.end_time, 10)
            });
        }), t) : t;
    },
    getMallServiceData: function(e) {
        var t = parseInt(e.goodsType) || 0, r = e.country || "", i = e.warehouse || "", a = !!e.isHaitao;
        if (a) {
            switch (t) {
              case s.default.GoodsType.IMPORTS:
                r += "进口";
                break;

              case s.default.GoodsType.OVERSEAS_TRANSSHIP:
                r += "直供";
                break;

              case s.default.GoodsType.OVERSEAS_DM:
                r += "直邮";
            }
            "" !== i && (i += "发货");
        }
        return {
            isHaitao: a,
            goodsCountry: r,
            goodsWarehouse: i,
            service: e.servicePromise
        };
    },
    getShowMallRecommendStatus: function(e, t, r) {
        if (r) return !0;
        t = t || parseInt(Date.now() / 1e3, 10), e = e || [];
        for (var i = 0; i < e.length; i++) {
            var a = e[i];
            if (a.type === o.default.PromotionType.Event618 && a.startTime <= t && a.endTime >= t) return !0;
        }
        return !1;
    },
    processUseOnSalePrice: function(e, t) {
        var r = !1;
        return (e || t.eventComing && (t.isSpike || t.isSuperSpike || t.isLottery || t.isCapitalGiftLottery || t.isFreeTrial || t.isDepositeGroup)) && (r = !0), 
        r;
    },
    getDeltaPrice: function(e, r, i, a) {
        return a ? t.default.price(i - r, 100) : t.default.price(i - e, 100);
    },
    processSaleStatus: function(e, t) {
        var r = t.length, i = !1, a = e;
        t = t || [];
        for (var s = 0; s < r; s++) {
            var n = t[s];
            i = i || n.is_onsale && n.quantity > 0;
        }
        return a && !i && (a = !1), a;
    },
    getChannelSign: function(e) {
        var t = s.default.ChannelSign[e];
        return void 0 === t && (t = {
            tag: -1,
            fontColor: "#e02e24",
            backgroundColor: "#fafafa",
            iconClass: ""
        }), t;
    },
    formatData: function(e) {
        var r = e.server_time || 0, a = p.getGallery(e.gallery), s = p.getGroupTypes(e.group, e.market_price), n = p.getHaitaoStatus(e.goods_type), o = n ? u.default.getCDNImgURL("nation/rect/" + e.country.trim() + ".png") : "", l = p.getGroupEventTypeData(e.event_type, s, e.lucky_id, r), c = p.getShipmentLimitHour(e), m = s.length > 1 ? s[1].marketPriceDeltaPrice : "0", _ = p.processSaleStatus("0" != e.is_onsale, e.sku), d = p.processUseOnSalePrice(_, l), f = p.getChannelSign(e.tag), g = 0, y = 0;
        s.length > 1 && (g = t.default.price(e.min_on_sale_group_price * s[1].requireNum, 100), 
        y = p.getDeltaPrice(e.min_group_price, e.min_on_sale_group_price, e.market_price, d));
        var T = {
            allowedRegion: e.allowed_region,
            catId: e.cat_id,
            catId1: e.cat_id_1,
            catId2: e.cat_id_2,
            catId3: e.cat_id_3,
            country: e.country,
            countryLogo: o,
            detailGallery: a.detailGallery,
            marketPriceDeltaPrice: m,
            eventType: parseInt(e.event_type, 10),
            eventComing: l.eventComing,
            freeCoupon: [],
            promotions: p.getPromotionsFromData(e.promotions),
            topGallery: a.topGallery,
            bannerHeight: a.bannerHeight,
            goodsDesc: (e.goods_desc || "").replace(/\n/g, ""),
            goodsId: e.goods_id,
            goodsName: e.goods_name,
            goodsType: parseInt(e.goods_type),
            groupTypes: s,
            hdThumbUrl: e.hd_thumb_url,
            images: e.images ? e.images[0] : {},
            isApp: 1 == e.is_app,
            isOnSale: _,
            isPreSale: 1 == e.is_pre_sale,
            isRefundable: 1 == e.is_refundable,
            isNewUserGroup: l.isNewUserGroup,
            isDepositeGroup: l.isDepositeGroup,
            isLottery: l.isLottery,
            isFreeTrial: l.isFreeTrial,
            isSpike: l.isSpike,
            isSuperSpike: l.isSuperSpike,
            isGroupFree: l.isGroupFree,
            isCapitalGift: l.isCapitalGift,
            isCapitalGiftLottery: l.isCapitalGiftLottery,
            isTZYY: l.isTZYY,
            isLimitDiscount: l.isLimitDiscount,
            isHaitao: n,
            isMallRec: parseInt(e.is_mall_rec, 10) || 0,
            localGroups: [],
            luckyId: e.lucky_id,
            luckyEndTime: parseInt(e.lucky_end_time),
            luckyStartTime: parseInt(e.lucky_start_time),
            luckyStatus: parseInt(e.lucky_status, 10) || 0,
            hasLocalGroup: !1,
            mallId: e.mall_id,
            preSaleTime: e.pre_sale_time,
            quickRefund: 1 === parseInt(e.quick_refund, 10),
            rv: 1 === parseInt(e.rv, 10),
            sales: e.sales,
            serverTime: r,
            servicePromise: e.service_promise,
            shareDesc: e.share_desc,
            shipmentLimitSecond: e.shipment_limit_second,
            shipmentLimitHour: c,
            skipGoods: e.skip_goods,
            thumbUrl: u.default.cdnCompress(e.thumb_url || e.thumb_wm),
            warehouse: e.warehouse,
            marketPrice: t.default.price(e.market_price, 100),
            useOnSalePrice: d,
            deltaPrice: y,
            maxGroupPrice: t.default.price(e.max_group_price, 100),
            minGroupPrice: t.default.price(e.min_group_price, 100),
            maxNormalPrice: t.default.price(e.max_normal_price, 100),
            minNormalPrice: t.default.price(e.min_normal_price, 100),
            maxOnsaleGroupPrice: t.default.price(e.max_on_sale_group_price, 100),
            minOnsaleGroupPrice: t.default.price(e.min_on_sale_group_price, 100),
            maxOnsaleNormalPrice: t.default.price(e.max_on_sale_normal_price, 100),
            minOnsaleNormalPrice: t.default.price(e.min_on_sale_normal_price, 100),
            minTotalGroupPrice: g,
            channelSign: f,
            soldQuantity: null,
            allQuantity: null,
            redEnvelopes: e.red_envelopes
        };
        if (e.spike_group && e.spike_group.length > 0) {
            T.soldQuantity = t.default.sales(e.spike_group[0].sold_quantity, 100), T.allQuantity = t.default.sales(e.spike_group[0].all_quantity, 100), 
            T.spikeLimitQuantity = e.spike_group[0].limit_quantity, T.spikeStart = Date.parse(new Date()) - 1e3 * parseInt(e.spike_group[0].start_time) > 0, 
            T.spikeOver = parseInt(e.spike_group[0].sold_quantity) >= parseInt(e.spike_group[0].all_quantity);
            var S = 36e5 - (Date.now() - 1e3 * parseInt(e.spike_group[0].start_time));
            T.spikeLeftTime = S, T.spikePackagedTime = S > 0 ? i.default.getPackagedTimeFromTimeBucket(S, "HMS") : null;
        }
        T.marketPriceDeltaPrice = T.marketPrice - T.minGroupPrice;
        var k = p.getMallServiceData(T), v = p.getShowMallRecommendStatus(T.promotions, r, T.isMallRec);
        return T.mallService = k, T.showMallRecommend = v, T.isShowBanner = !0, e.icon && (T.icon = e.icon), 
        T;
    }
};

exports.default = p;