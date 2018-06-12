function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function t(e) {
    var t = n.default.formatTime(new Date(1e3 * e), "yyyy/MM/dd");
    f = Math.floor(new Date(t).getTime() / 1e3), c = f - 86400, y = f + 86400, T = f + 172800;
}

function r(e) {
    return e >= c && e < f;
}

function o(e) {
    return e >= y && e < T;
}

function a(e) {
    return e >= T && e < T + 86400;
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var s = e(require("../../common/image_util")), i = e(require("../../common/std_format")), n = e(require("../../common/time_util")), m = e(require("../../storage/ram_manager")), d = {
    On: "spike-button-on",
    Coming: "spike-button-coming",
    Off: "spike-button-off",
    Remind: "spike-button-remind"
}, u = {
    tomorrow: "明日",
    afterTomorrow: "后天"
}, l = {
    tomorrow: "明日",
    afterTomorrow: "后日"
}, p = {
    On: "正在进行中",
    Coming: "即将开抢",
    Off: "",
    ComingFuture: "开抢"
}, f = void 0, c = void 0, y = void 0, T = void 0, g = {
    formatData: function(e, f) {
        var c = (f = f || {}).beforeGoodsTime, y = f.serverTime;
        t(y);
        var T = {
            key: "spike_goods_" + e.goods_id,
            goodsId: e.goods_id,
            isApp: e.is_app,
            startTime: parseInt(e.start_time, 10) || 0,
            quantity: parseInt(e.quantity, 10) || 0,
            soldQuantity: parseInt(e.sold_quantity, 10) || 0,
            imgUrl: s.default.cdnCompress(e.hd_thumb_url || e.thumb_url, e.hd_thumb_wm || e.thumb_wm),
            goodsName: e.goods_name || "",
            salePrice: i.default.price(e.price, 100),
            marketPrice: i.default.price(e.market_price, 100),
            allQuantity: parseInt(e.all_quantity, 10) || 1e3,
            finalGood: f.isFinalGood
        };
        if (T.startTime === c && (T.addClock = !1), T.btnClass = "btnClass", T.startTime > y) {
            T.coming = !0, T.addClock = !0, T.leftTime = T.startTime - y;
            var g = c;
            T.startTime === g && (T.addClock = !1), T.spikeText = p.Coming, o(T.startTime) && (T.day = u.tomorrow, 
            T.day2 = l.tomorrow, T.btnTomorrow = !0, n.default.formatTime(new Date(1e3 * T.startTime), "yyyy-MM-dd") !== n.default.formatTime(new Date(1e3 * g), "yyyy-MM-dd") && (T.Foreshow = !0), 
            T.spikeText = p.ComingFuture), a(T.startTime) && (T.day = u.afterTomorrow, T.day2 = l.afterTomorrow, 
            T.btnAfterTomorrow = !0, n.default.formatTime(new Date(1e3 * T.startTime), "yyyy-MM-dd") !== n.default.formatTime(new Date(1e3 * g), "yyyy-MM-dd") && (T.Foreshow = !0), 
            T.spikeText = p.ComingFuture), T.time = n.default.formatTime(new Date(1e3 * T.startTime), "hh:mm"), 
            T.buttonClass = d.Coming, T.buttonType = "coming", m.default.spikeRemindGoodsIds.indexOf(T.goodsId.toString()) >= 0 && (T.buttonClass = d.Remind, 
            T.buttonType = "remind");
        } else T.addClock = !0, new Date(parseInt(1e3 * T.startTime, 10)) <= new Date(parseInt(1e3 * y, 10)) && (!f.isPageFirstGoods || parseInt(c) <= parseInt(y)) && (T.addClock = !1), 
        r(T.startTime) && (T.time = ""), T.current = !0, T.spikeText = p.On, T.buttonClass = d.On, 
        T.buttonType = "on", T.currentCanBuy = !0, T.quantity <= 0 && (T.buttonClass = d.Off, 
        T.buttonType = "off", T.currentCanBuy = !1);
        T.salesRate = Math.floor(parseInt(100 * T.soldQuantity, 10) / parseInt(T.allQuantity, 10));
        var _ = T.salesRate;
        return T.fivePercent = _ <= 6 && _ > 0, T.percentileMore = _ > 6 && _ <= 12, T.statusWidth = _ > 12 ? _ + "%" : "", 
        T.statusWidth = _ > 12 ? _ + "%" : "", T.statusProgressClass = "status-progress", 
        T.fivePercent && (T.statusProgressClass += " status-five-percent"), T.percentileMore && (T.statusProgressClass += " status-more"), 
        f && f.isFirstGoods && (T.addClock = !0), T.onlyKey = "" + T.goodsId + T.startTime, 
        T.transData = {
            goodsId: T.goodsId,
            preGroupPrice: parseInt(e.price, 10),
            preSinglePrice: parseInt(e.normal_price, 10),
            preMarketPrice: parseInt(e.market_price, 10),
            goodsName: T.goodsName,
            customerNum: e.customer_num,
            ad: e.ad,
            p_rec: e.p_rec,
            p_search: e.p_search
        }, T;
    }
};

exports.default = g.formatData;