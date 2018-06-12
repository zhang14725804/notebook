function a(a, t, o) {
    return t in a ? Object.defineProperty(a, t, {
        value: o,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : a[t] = o, a;
}

var t = require("../../../util/util.js"), o = require("../../../util/tracker.js"), e = require("../common/index.js"), r = getApp();

Page({
    data: {
        loaded: !1,
        data: "",
        page: 1,
        listShowLens: 3,
        showMore: !1,
        adInfo: [],
        showDrawPop: !1
    },
    onLoad: function(a) {
        var t = this;
        t.setData({
            projectId: a.p || "",
            period: a.pe || "",
            groupId: a.g || ""
        }), t.init();
    },
    onShow: function() {
        o.push();
    },
    onShareAppMessage: function() {},
    init: function() {
        var a = this;
        r.request("groupon/lottery", {
            project_id: a.data.projectId,
            group_id: a.data.groupId,
            period: a.data.period,
            page: a.data.page
        }, function(o, r) {
            !r && o.data ? (o.data.project_info.savePrice = (Number(o.data.project_info.market_price) - Number(o.data.project_info.price.replace("元", ""))).toFixed(2), 
            e.book({
                action: "query"
            }).then(function(t) {
                a.setData({
                    bookInfo: t,
                    bookAction: 1 == t.status ? "unsub" : "sub",
                    loaded: !0,
                    projectInfo: o.data.project_info,
                    list: o.data.lottery_list,
                    title: o.data.head_desc,
                    isWin: o.data.is_lottery,
                    adInfo: o.data.ad_info,
                    canDrawPrize: o.data.can_draw_prize,
                    couponFlag: o.data.project_info && o.data.project_info.coupon_flag,
                    fanscard: o.data.fanscard
                });
            }).catch(function(t) {
                a.setData({
                    loaded: !0,
                    projectInfo: o.data.project_info,
                    list: o.data.lottery_list,
                    title: o.data.head_desc,
                    isWin: o.data.is_lottery,
                    adInfo: o.data.ad_info,
                    canDrawPrize: o.data.can_draw_prize,
                    couponFlag: o.data.project_info && o.data.project_info.coupon_flag,
                    fanscard: o.data.fanscard
                });
            }), a.gerRecomment()) : t.showError(r.desc || "数据加载失败");
        });
    },
    gerRecomment: function() {
        var a = this;
        r.request("groupon/recommend", {
            is_lottery: a.data.isWin
        }, function(t, o) {
            !o && t.data && a.setData({
                recommend: t.data.product_list
            });
        });
    },
    showMore: function() {
        var a = this, t = a.data.list.length;
        a.setData({
            listShowLens: t > a.data.listShowLens + 3 ? a.data.listShowLens + 3 : t
        });
    },
    tapStat: function(a) {
        var t = this, e = a.currentTarget.dataset.index;
        o.push({
            logCode: "wx#bid=3197431." + e + "&page=pinwinners",
            analyse: "tap",
            extra: {
                project_id: t.data.projectId
            }
        });
    },
    bindTapAd: function(a) {
        var t = this, r = a.currentTarget.dataset.item, n = "wx#bid=3200622." + a.currentTarget.dataset.index + "&page=pinwinners";
        o.push({
            logCode: r.action.log_code || n,
            analyse: "tap",
            extra: {
                project_id: t.data.projectId
            }
        }), e.bannerGo(r.action);
    },
    getDraw: function() {
        var a = this;
        t.showLoading(), r.request("groupon/draw", {
            project_id: this.data.projectId,
            group_id: this.data.groupId
        }, function(o, e) {
            if (t.hideLoading(), e) t.showError(e.desc || "服务异常请稍后再试,或下载小米商城APP"); else {
                var r = o.data, n = {};
                "string" == typeof r ? n.prize_name = r : n = r, a.setData({
                    showDrawPop: !0,
                    prizeInfo: n,
                    canDrawPrize: !r.is_lottery
                });
            }
        });
    },
    closePop: function(t) {
        var o = t.currentTarget.dataset.type;
        o && this.setData(a({}, o, !1));
    },
    toggleBook: function(a) {
        var t = this, o = (this.data.hasBooked, {
            bookInfo: this.data.bookInfo,
            action: this.data.bookAction
        });
        e.toggleBook(o).then(function(a) {
            a && (wx.showToast({
                title: "sub" == a.action ? "已开启订阅" : "已关闭订阅",
                icon: "none",
                duration: 2e3
            }), t.setData({
                bookInfo: a.bookInfo,
                bookAction: "sub" == a.action ? "unsub" : "sub"
            }));
        });
    },
    goMicard: function() {
        var a = this.data.fanscard || {};
        e.goMicard(a.url);
    },
    getMicard: function() {
        var a = "";
        this.data.fanscard && this.data.fanscard.order_id && (a = this.data.fanscard.order_id, 
        r.request("groupon/fanscard", {
            order_id: a
        }, function(a, o) {
            if (!o && a.data) switch (a.data.status) {
              case 0:
                t.showError("领取失败");
                break;

              case 1:
                e.goMicard(a.data.url);
                break;

              default:
                t.showError("已领过啦～");
            } else t.showError(o.desc || "数据加载失败");
        }));
    }
});