var e = require("../../../util/util.js"), a = require("../../../util/tracker.js"), t = getApp();

Page({
    data: {
        list: [],
        isHideLoadMore: !0,
        needToPay: void 0,
        offset: 0,
        hasMore: !1
    },
    currentPage: 1,
    cardIds: [],
    parameterCardIds: [],
    onLoad: function(e) {
        this.parameterCardIds = e.ids ? e.ids.split(",") : [];
    },
    onShow: function() {
        a.push(), this.loadData("update");
    },
    loadData: function(a) {
        var r = this;
        t.request("ecard/usablelist", {
            page: this.currentPage,
            size: 20
        }, function(t, d) {
            if (d) e.showError(d.desc || "数据加载失败"); else {
                var s = t.data, c = r.data.list, i = s.data || [], n = r.parameterCardIds.concat();
                if (s) if ("add" === a) {
                    if (0 === i.length) return void r.setData({
                        hasMore: !1
                    });
                    i.forEach(function(e) {
                        e.end_time && (e.end_time = new Date(1e3 * e.end_time).format("yyyy-MM-dd"));
                    }), r.currentPage = s.current_page + 1, c = c.concat(i), r.setData({
                        list: c,
                        hasMore: !(i.length < 20)
                    });
                } else i.forEach(function(e) {
                    e.end_time && (e.end_time = new Date(1e3 * e.end_time).format("yyyy-MM-dd").replace(/(\d+)-(\d+)-(\d+)/, "$1年$2月$3日"));
                    for (var a = 0; a < n.length; a++) n[a] == e.card_id && (e.hasBeenSelected = !0, 
                    r.cardIds.push(e.card_id), n.splice(a, 1), a--);
                }), r.cardIds && r.cardIds.length && r.caclulatePrice(r.cardIds), r.currentPage = s.current_page + 1, 
                r.setData({
                    list: i,
                    hasMore: !(i.length < 20)
                });
            }
        });
    },
    loadMore: function() {
        this.data.hasMore && this.loadData("add");
    },
    chooseItem: function(e) {
        for (var a = e.currentTarget.dataset.cardid, t = this.cardIds, r = -1, d = this.data.list, s = 0; s < d.length; s++) if (d[s].card_id == a) {
            d[s].hasBeenSelected ? (d[s].hasBeenSelected = !1, -1 != (r = t.findIndex(function(e) {
                return e == a;
            })) && t.splice(r, 1)) : (d[s].hasBeenSelected = !0, t.push(a)), this.caclulatePrice(t);
            break;
        }
        this.cardIds = t, this.setData({
            list: d
        });
    },
    caclulatePrice: function(a) {
        var r = this;
        t.request("order/ecardpay", {
            ecard: a.join(",")
        }, function(a, t) {
            if (t) e.showError(t.desc || "数据加载失败"); else {
                var d = a.data;
                r.setData({
                    offset: d.ecards && d.ecards.ecard_amount ? d.ecards.ecard_amount : 0,
                    needToPay: d.need_pay_amount || "0"
                });
            }
        });
    },
    submit: function() {
        var e = getCurrentPages(), a = e[e.length - 2];
        a && a.setData({
            cardIds: ""
        }), wx.setStorageSync("checkout:cardIds", this.cardIds.join(",")), wx.navigateBack();
    }
});