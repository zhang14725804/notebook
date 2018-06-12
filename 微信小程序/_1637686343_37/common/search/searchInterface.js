function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
}, i = e(require("../../pages/library/common/config")), o = e(require("../utils/util"));

exports.default = {
    init: function(e) {
        this.currentCid = e.cid || 2, this.searchNum = e.searchNum, this.imgH = e.imgH;
    },
    getFormatData: function(e) {
        var i = {};
        e && "object" == (void 0 === e ? "undefined" : t(e)) && (e.result_num && e.result_num > 0 && e.docinfos ? (i.success = !0, 
        e.docinfos && 0 === e.docinfos.length ? i.isFinal = !0 : e.docinfos && e.page_size && e.page_size > e.docinfos.length || e.result_num / e.page_size <= e.page_num ? i.isFinal = !0 : i.isFinal = !1) : (i.success = !1, 
        i.isFinal = !0));
        var o = [], r = this;
        return e.docinfos && e.docinfos.forEach(function(e) {
            var t = r.dataFormat(e);
            t && o.push(t);
        }), 0 == o.length ? i.isEmpty = !0 : o.length != e.docinfos.length && (r.searchNum % 2 == 0 ? o.length = o.length - o.length % 2 : r.searchNum % 3 == 0 && (o.length = o.length - o.length % 3), 
        o.length < 1 && (i.isEmpty = !0)), i.results = o || {}, i.eventId = e.event_id, 
        i.bkt = e.bkt, i.search_time = e.search_time, i.docinfos = e.docinfos, i.pageNum = e.page_num, 
        i;
    },
    dataFormat: function(e) {
        var t = {}, i = e.albumDocInfo;
        if (!Array.isArray(i.videoinfos)) return null;
        var o = i.channel.split(","), r = (o[0], o[1]);
        return i.categoryId = r, t.docId = e.doc_id, t.siteId = i.siteId, t.channelId = r, 
        t.albumId = i.albumId, t.pageUrl = i.videoinfos[0] && i.videoinfos[0].itemLink || i.albumLink, 
        t.isExclusive = i.is_exclusive, t.isQiyiProduced = i.is_qiyi_produced, t.isPaikeType = !!i.special_content_type, 
        t.imageUrl = this.getImageUrl(i, this.imgH), Object.assign(t, this.getShowContent(i), this.getTitles(i, this.currentCid), this.getPayType(i.paymark));
    },
    getShowContent: function(e) {
        e.categoryId;
        var t, i = e.videoinfos[0];
        if (1 == e.videoDocType) if (1 == e.album_type) t = i.year ? (i.year + "").replace(/\d{4}(\d{2})(\d{2})/, "$1-$2") + "期" : ""; else if (0 == e.album_type && e.series || e.series) {
            var r = e.newest_item_number || i.itemNumber;
            t = r != e.itemTotalNumber ? "更新至" + r + "集" : r + "集全";
        } else {
            var n = 0 != e.score && e.score ? e.score : 8;
            t = n == Math.floor(n) ? n + ".0" : Number(n).toFixed(1);
            var s = !0;
        } else 2 == e.videoDocType && (t = o.default.time.formatSecond(i.timeLength));
        return {
            rbContent: t,
            isMovie: s
        };
    },
    getTitles: function(e, t) {
        var o, r, n = e.categoryId, s = e.videoinfos[0], a = this;
        return 1 == e.videoDocType ? 1 == e.album_type ? (o = t == i.default.channelMap.ZONG_YI || t == i.default.channelMap.TUO_KOU_XIU ? e.albumTitle : s.itemshortTitle || s.itemTitle || e.albumTitle, 
        r = s.itemshortTitle || s.itemTitle) : 0 == e.album_type && e.series || e.series ? (o = e.albumTitle, 
        r = s.subTitle || a.getThreeCategory(e.threeCategory, 2)) : (o = e.albumTitle, r = s.subtitle || a.getThreeCategory(e.threeCategory, 2)) : 2 == e.videoDocType && (o = 16 == n ? s.itemshortTitle || s.itemTitle : s.itemTitle || s.itemshortTitle, 
        r = s.subTitle || a.getThreeCategory(e.threeCategory, 2)), t != i.default.channelMap.ZONG_YI && t != i.default.channelMap.TUO_KOU_XIU && (r = ""), 
        {
            mainTitle: o,
            subTitle: r
        };
    },
    getPayType: function(e) {
        if (e) {
            var t = {};
            return 1 == e ? t.isVip = !0 : 2 == e ? t.isBill = !0 : 3 == e && (t.isPaid = !0), 
            t;
        }
    },
    getImageUrl: function(e, t) {
        var i = "", o = e.videoinfos[0];
        return 1 == e.videoDocType ? i = 1 == e.album_type ? o.itemHImage : e.albumImg : 2 == e.videoDocType && (i = o.itemHImage), 
        i = t ? this.fixImage(i, "_284_160") : this.fixImage(i, "_195_260");
    },
    fixImage: function(e, t) {
        return t && -1 == t.indexOf(".jpg") && (t += ".jpg"), /_\d{3}_\d{3}\.jpg$/i.test(e) ? e.replace(/_\d{3}_\d{3}\.jpg$/i, t) : /\.jpg/i.test(e) ? e.replace(/\.jpg/i, t) : void 0;
    },
    getThreeCategory: function(e, t) {
        if ("string" != typeof e) return "";
        var i = [];
        return e.split(" ").forEach(function(e) {
            var t = e ? e.split(",") : [];
            t.length > 0 && i.push(t[0]);
        }), i.slice(0, t).join(" ");
    }
};