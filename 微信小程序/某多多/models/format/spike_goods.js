Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = require("../../common/index"), e = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../../storage/ram_manager")), r = {
    on: "ts-on-btn",
    coming: "ts-coming-btn",
    off: "ts-off-btn",
    remind: "ts-remind-btn"
}, i = {
    onsales: {
        title: "正在疯抢",
        timerText: "距结束"
    },
    rightSales: {
        title: "即将开抢",
        timerText: "距开始"
    },
    tomorrowSales: {
        timeDay: "明日",
        title: "即将开抢",
        timerText: "距开始"
    },
    afterTomorrowSales: {
        timeDay: "后日",
        title: "即将开抢",
        timerText: "距开始"
    }
}, o = {
    0: "getTomorrow",
    1: "getAfterTomorrow",
    2: "getBigAfterTomorrow"
}, s = {
    todayIcon: "icon-daily-berserk",
    tomorrowIcon: "icon-pending"
}, a = {
    formatGoodsData: function(i, o) {
        var s = {
            goodsId: i.goods_id,
            isApp: i.is_app,
            startTime: parseInt(i.start_time, 10) || 0,
            quantity: parseInt(i.quantity, 10) || 0,
            soldQuantity: parseInt(i.sold_quantity, 10) || 0,
            imgUrl: t.ImageUtil.cdnCompress(i.hd_thumb_url || i.thumb_url, i.hd_thumb_wm || i.thumb_wm),
            goodsName: i.goods_name || "",
            salePrice: t.StdFormat.price(i.price, 100),
            marketPrice: t.StdFormat.price(i.market_price, 100),
            allQuantity: parseInt(i.all_quantity, 10) || 1e3,
            buttonClass: r.coming,
            buttonType: "coming",
            spikeStatus: "coming",
            isListLastOne: i.isListLastOne,
            currentCanBuy: !0
        };
        s.progressValue = Math.floor(parseInt(100 * s.soldQuantity, 10) / parseInt(s.allQuantity, 10));
        var a = s.progressValue;
        if (s.progressWidth = a > 0 && a <= 4 ? "11%" : a > 4 && a <= 12 ? "15%" : a > 70 ? "100%" : s.progressValue + "%", 
        s.progressType = a > 0 && a <= 4 ? "ts-progress-five-percent" : a > 4 && a <= 12 ? "ts-progress-ten-percent" : "", 
        o) {
            for (var n = o.length - 1; n >= 0 && o[n] && o[n].time > s.startTime; ) n--;
            n < 0 && (n = 0), s.timesIndex = n, e.default.spikeRemindGoodsIds.indexOf(s.goodsId.toString()) >= 0 && (s.buttonClass = r.remind, 
            s.buttonType = "remind"), o[n].isPast && (s.buttonClass = r.on, s.buttonType = "on", 
            s.spikeStatus = "on");
        }
        return s.quantity <= 0 && (s.buttonClass = r.off, s.buttonType = "off", s.spikeStatus = "off", 
        s.isSalesOut = !0, s.currentCanBuy = !1), s.isFarFuture = t.TimeUtil.checkTimeDay(s.startTime) < 0, 
        (s.isFarFuture || s.isApp) && (s.isForbidden = !0), s.onlyKey = "" + s.goodsId + s.startTime, 
        s;
    },
    formatTimeData: function(r, a, n) {
        var m = [];
        (r = r || []).sort(function(t, e) {
            return 1 * t - 1 * e;
        });
        var l = parseInt((Date.now() + e.default.timeDiff) / 1e3);
        return r.forEach(function(e, u) {
            var T = {
                time: e *= 1,
                title: i.rightSales.title,
                timerText: i.rightSales.timerText
            };
            if (T.timeLine = t.TimeUtil.formatTime(e, "hh:mm"), n) n *= 1, T.isPast = l > e && l < n, 
            T.isPast ? (T.title = i.onsales.title, T.timerText = i.onsales.timerText, T.timerNumObj = t.TimeUtil.transferToTime(1e3 * (n - l), {
                needObj: !0
            }), T.salesOut = []) : l < e && (T.timerNumObj = t.TimeUtil.transferToTime(1e3 * (e - l), {
                needObj: !0
            })); else {
                T.isPast = l > e;
                var d = 0, c = l, p = {};
                T.isPast ? (T.title = i.onsales.title, T.timerText = i.onsales.timerText, u < r.length - 1 ? d = r[u + 1] : (p[o[a]] = !0, 
                d = t.TimeUtil.getTodayTime(p))) : d = e, T.timerNumObj = t.TimeUtil.transferToTime(1e3 * (d - c), {
                    needObj: !0
                });
            }
            var f = t.TimeUtil.checkTimeDay(e);
            if (!(f < 0)) {
                switch (f) {
                  case 2:
                    T.spikeTitleIcon = s.todayIcon;
                    break;

                  case 3:
                    T.spikeTitleIcon = s.tomorrowIcon, T.title = i.tomorrowSales.title, T.timerText = i.tomorrowSales.timerText, 
                    T.timeDay = i.tomorrowSales.timeDay;
                    break;

                  case 4:
                    T.spikeTitleIcon = s.tomorrowIcon, T.title = i.afterTomorrowSales.title, T.timerText = i.afterTomorrowSales.timerText, 
                    T.timeDay = i.afterTomorrowSales.timeDay;
                }
                T.spikeTitleIcon = 0 == a ? s.todayIcon : s.tomorrowIcon, m.push(T);
            }
        }), m;
    }
};

exports.default = a;