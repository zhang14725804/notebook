function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var t = require("../../common/index"), r = e(require("../../configs/api")), a = e(require("../../common/gotop_util")), o = e(require("../../libs/co/we-index")), s = e(require("../../libs/regenerator-runtime/runtime")), i = e(require("../../storage/ram_manager")), n = {
    page: 0,
    inRequest: {},
    data: {
        ticketList: [],
        canLoadMore: null,
        goTopClass: !1,
        isShowRecCls: "",
        recIsRequest: !1,
        recNoMoreText: "",
        recOffset: 0,
        recCount: 20,
        recDataList: [],
        recCanLoadMore: !0,
        loadingVisibility: !0
    },
    requestServiceTicketList: o.default.wrap(s.default.mark(function e(a) {
        var o, i, n, c, u, d;
        return s.default.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (e.prev = 0, o = a.page || 0, i = 20, n = [ o, 20 ].join("$"), !a.inRequest[n]) {
                    e.next = 6;
                    break;
                }
                return e.abrupt("return");

              case 6:
                return a.inRequest[n] = !0, c = t.DataUtil.formatByPos(r.default.selfServiceTicketList, o, i), 
                e.next = 10, t.Request.apiRequest("GET", c);

              case 10:
                if (u = e.sent, a.inRequest[n] = !1, a.$hideLoading(), a.setData({
                    loadingVisibility: !1
                }), !u.errorCode) {
                    e.next = 17;
                    break;
                }
                return a.$showToast(u.errorMsg), e.abrupt("return");

              case 17:
                u && u.ticket_list.length > 0 && u.ticket_list.forEach(function(e) {
                    e.created_time = a.formatTime(e.created_at);
                }), d = u.ticket_list.length < i, u.ticket_list.length > 0 ? (a.requestRecommend(), 
                a.page = d ? a.page : a.page + 1, a.setData({
                    ticketList: [],
                    canLoadMore: !d
                })) : (a.setData({
                    canLoadMore: !1,
                    isShowRecCls: "show"
                }), a.requestRecommend()), e.next = 25;
                break;

              case 22:
                e.prev = 22, e.t0 = e.catch(0), console.error(e.t0);

              case 25:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 0, 22 ] ]);
    })),
    onReachBottom: function() {
        this.requestRecommend();
    },
    requestRecommend: function() {
        var e = this, r = this.data, a = "rec_order_list?offset=" + r.recOffset + "&count=" + r.recCount;
        if (!r.recIsRequest && r.recCanLoadMore) {
            this.setData({
                recIsRequest: !0
            });
            var o = t.Request.requestDataWithUrl("GET", a);
            t.Request.runSecondaryRequestForPage(o, this).then(function(t) {
                var a = e.formatRecData(t.list), o = !0;
                a.length < r.recCount && (o = !1), e.$hideLoading(), e.setData({
                    recCanLoadMore: o,
                    recIsRequest: !1,
                    recOffset: r.recOffset + r.recCount,
                    recDataList: r.recDataList.concat(a),
                    loadingVisibility: !1
                });
            }, function() {
                e.setData({
                    recIsRequest: !1
                });
            });
        }
    },
    formatRecData: function(e) {
        var r = [];
        return e instanceof Array ? (e.forEach(function(e) {
            r.push({
                goodsId: e.goods_id,
                imgUrl: t.ImageUtil.cdnCompress(e.hd_thumb_url || e.thumb_url, e.hd_thumb_wm || e.thumb_wm),
                goodsName: e.goods_name,
                price: t.StdFormat.price(e.price, 100),
                soldQuantity: t.StdFormat.sales(e.sales),
                customerNum: parseInt(e.customer_num, 10)
            });
        }), r) : r;
    },
    goodTap: function(e) {
        var t = e.currentTarget.dataset.goodsId;
        this.$forward("goods", {
            goods_id: t
        });
    },
    formatTime: function(e) {
        var t = new Date(1e3 * e), r = t.getMonth() + 1, a = t.getDate(), o = t.getHours(), s = t.getMinutes();
        return r = r < 10 ? "0" + r : r, a = a < 10 ? "0" + a : a, o = o < 10 ? "0" + o : o, 
        s = s < 10 ? "0" + s : s, r + "月" + a + "日 " + o + ":" + s;
    },
    loadMoreList: function() {
        var e = this;
        e.data.canLoadMore && (e.requestServiceTicketList(e), e.loadMoreList());
    },
    onPageScroll: function(e) {
        var t = parseInt(e.scrollTop, 10);
        a.default.showGoTopBtn(t, this);
    },
    toDetail: function(e) {
        var t = this, r = e.currentTarget.dataset.ticketId;
        r && t.$forward("selfMessageProgress_detail", {
            ticketId: r
        });
    },
    onLoad: function() {
        var e = this;
        e.requestServiceTicketList(e), e.$showLoading();
    },
    onShow: function() {
        i.default.isLastPageService = !0;
    },
    onUnload: function() {
        i.default.isLastPageService = !1;
    }
};

(0, t.PddPage)(n, {
    pageName: "self_message_progress",
    pageSn: 10052
});