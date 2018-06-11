Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = require("../../common/index"), t = [ "gridItemV1", "SmallMixinPromotion", "subjectItem", "gridItemV3", "gridItemV2" ], a = [ "LargeMixinPromotion", "subejct-scroll", "brand-recommend-title", "subject-scroll-item-new", "image-map", "SingleListItemV2", "superSpikeListItemV2" ], o = {
    execMix: function(e, t, a, o, i) {
        t = t || [], a = a || [];
        var n = "gridItemV1", r = !1;
        e && (1 === e.columnNum && (n = "SingleListItemV2", r = !0), (1 === e.style && 1 !== e.columnNum || 2 === e.style && 1 !== e.columnNum || 3 === e.style && 1 !== e.columnNum || 4 === e.style && 1 !== e.columnNum) && (n = "subjectItem")), 
        i && (n = i);
        var s = [];
        t.forEach(function(e) {
            e.itemName = n, e.withLocalGroups = r, s.push(e);
        });
        var l = [], u = function(e, t, a) {
            e.position >= t.length || ("subject-scroll-item-new" === a.itemName ? l.push(a) : isNaN(e.position) || (t[e.position].isMixInfoBefore = !0, 
            t.splice(e.position, 0, a)));
        };
        if (a.forEach(function(e) {
            var t = o[e.type];
            e.position = parseInt(e.position, 10);
            var a = e.value;
            t ? (a.itemName = t, u(e, s, a)) : u(e, s, a);
        }), s = l.concat(s), "gridItemV3" === i && t.length) {
            var m = s.indexOf(t[0]), c = e && 109 == e.tabId;
            s.splice(m, 0, {
                itemName: "brand-recommend-title",
                showContent: c
            });
        }
        return s;
    },
    filterMixGoods: function(e, t, a) {
        var o = [];
        return e.forEach(function(e) {
            var t = a[e.type];
            if (t && e.value) {
                e.position = parseInt(e.position, 10);
                var i = e.value;
                i.itemName = t, o.push(i);
            }
        }), o;
    },
    listPositionAdjust: function(e) {
        var o = 0, i = {}, n = [];
        return e.forEach(function(e) {
            a.indexOf(e.itemName) >= 0 && n.push(e), t.indexOf(e.itemName) >= 0 && (e.doubleIndex = o++, 
            "{}" == JSON.stringify(i) ? i = e : (n.push(i, e), i = {}));
        }), Object.keys(i).length > 0 && (n.push(i), i = {}), n;
    },
    formatMixInfo: function(t, a, i) {
        return (t = t || []).map(function(t) {
            switch (parseInt(t.type, 10)) {
              case 3:
                if (t.value = t.value || {}, t.value.subjectName = t.value.subject, t.value.subjectID = t.value.subject_id, 
                i) {
                    t.value.homeBanner = t.value.home_banner, t.value.homeBanner2 = e.ImageUtil.cdnCompress(t.value.home_banner_2), 
                    t.value.showItem = !1, t.value.goodsList = (t.value.goods_list || []).slice(0, 5);
                    var n = t.value.start_time, r = t.value.end_time, s = Math.max(1e3 * (r - a), 0), l = Math.max(1e3 * (a - n), 0);
                    if (s) if (t.value.showItem = !0, t.value.newGoods = l < 864e5, t.value.newGoods) t.value.brandClass = "new-goods"; else {
                        var u = e.TimeUtil.getPackagedTimeFromTimeBucket(s);
                        u.days > 0 ? (t.value.moreThanOneDay = !0, t.value.preDesc = "距下架仅剩", t.value.leftTime = u.days, 
                        t.value.followDesc = "天", t.value.brandClass = "more-than-one-day") : u.hours > 0 ? (t.value.lessThanOneDay = !0, 
                        t.value.preDesc = "距下架仅剩", t.value.leftTime = u.hours, t.value.followDesc = "小时", 
                        t.value.brandClass = "less-than-one-day") : (t.value.lessThanOneDay = !0, t.value.preDesc = "距下架不足1小时", 
                        t.value.brandClass = "less-than-one-day");
                    }
                } else t.value.goodsList = t.value.goods_list || [];
                t.value.goodsList.map(function(t) {
                    return t.goodsID = t.goods_id, t.thumbUrl = e.ImageUtil.cdnCompress(t.hd_thumb_url || t.thumb_url, t.hd_thumb_wm || t.thumb_wm), 
                    t.price = e.StdFormat.price(t.price, 100), t.marketPrice = e.StdFormat.price(t.market_price, 100), 
                    t.goodsName = t.short_name, t.isApp = t.is_app, t.eventType = t.event_type, t;
                }), t.value.goodsList = e.DataUtil.objectArrayDuplicateRemove(t.value.goodsList, "goodsID", function(e) {
                    return 1 == e.isApp;
                }), delete t.value.goods_list;
                break;

              case 99:
                o.formatImageMap(t.value.picture_layers);
            }
            return t;
        }), t.sort(function(e, t) {
            return e && t ? e.position - t.position : 0;
        }), t;
    },
    formatImageMap: function(t) {
        var a = e.SystemInfo.getWindowWidthSync();
        t.forEach(function(t) {
            var o = parseInt(t.width), i = parseInt(t.height) / o;
            t.imgHeight = Math.floor(i * a), t.mapWidth = a / t.column_num, t.image_url = e.ImageUtil.cdnCompress(t.image_url);
        });
    },
    mapClick: function(t, a) {
        if (t && t.currentTarget && t.currentTarget.dataset) {
            var o = t.currentTarget.dataset.link, i = t.currentTarget.dataset.layerId, n = t.currentTarget.dataset.zoneId;
            if ("subjects" == a.$pageName) {
                var r = a.getCurrentIndex(), s = a.data.topTab[r];
                (0, e.TrackingRecord)({
                    op: "click",
                    page_sn: 10046,
                    page_el_sn: 98953,
                    subject_id: s.subjectId,
                    subjects_id: a.subjectsCollectionId,
                    tab_id: s.tabId ? s.tabId : r,
                    to_url: encodeURIComponent(o),
                    zone_id: n,
                    panel_id: i
                });
            } else "subject" == a.$pageName && (0, e.TrackingRecord)({
                op: "click",
                page_sn: 10026,
                page_el_sn: 98953,
                to_url: encodeURIComponent(o),
                zone_id: n,
                panel_id: i,
                subject_id: a.$urlQueryObj.subject_id
            });
            if (!o) return;
            var l = e.UrlUtil.filterLink(o, !0), u = e.UrlUtil.urlDraw(o);
            u.refer_page_el_sn = 98953, this.urlMapped(l, u, {}, a);
        }
    },
    urlMapped: function(e, t, a, o) {
        return "subject" == e ? (o.$forward(e, t), a.page_element = "subject", a.element_id = t.subject_id) : "subjects" == e ? (o.$forward(e, t), 
        a.page_element = "subjects", a.element_id = t.subjects_id) : "goods" == e ? (o.$forward(e, t), 
        a.page_element = "goods", a.element_id = t.goods_id) : "mall_page" == e ? (o.$forward(e, t), 
        a.page_element = "mall_page", a.element_id = t.mall_id) : "promotion" == e ? (t.activity = "618", 
        o.$forward("web", t), a.page_element = "promotion", a.element_id = t.promotion_id) : (o.$forward(e, t), 
        a.page_element = "spike"), a;
    }
};

exports.default = o;