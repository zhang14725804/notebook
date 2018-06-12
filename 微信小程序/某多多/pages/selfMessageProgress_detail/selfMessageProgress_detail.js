function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var r = require("../../common/index"), t = e(require("../../configs/api")), a = e(require("../../libs/co/we-index")), s = e(require("../../libs/regenerator-runtime/runtime")), i = e(require("../../common/util")), n = {
    requestServiceMessage: a.default.wrap(s.default.mark(function e(a, i) {
        var n, o;
        return s.default.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                return e.prev = 0, n = t.default.selfServiceMessage + "?ticket_id=" + i, e.next = 4, 
                r.Request.apiRequest("GET", n);

              case 4:
                if (o = e.sent, a.$hideLoading(), !o.errorCode) {
                    e.next = 9;
                    break;
                }
                return a.$showToast(o.errorMsg), e.abrupt("return");

              case 9:
                a.requestOrderInfo(a, o.order_sn), o.created_time = r.TimeUtil.formatTime(o.created_at, "yyyy-MM-dd hh:mm:ss"), 
                o.history_record.forEach(function(e) {
                    e.created_time = r.TimeUtil.formatTime(e.created_at, "yyyy-MM-dd hh:mm:ss");
                }), a.setData({
                    message: o
                }), e.next = 18;
                break;

              case 15:
                e.prev = 15, e.t0 = e.catch(0), console.error(e.t0);

              case 18:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 0, 15 ] ]);
    })),
    requestOrderInfo: a.default.wrap(s.default.mark(function e(t, a) {
        var i, n;
        return s.default.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (e.prev = 0, a) {
                    e.next = 3;
                    break;
                }
                return e.abrupt("return");

              case 3:
                return i = "order/" + a, e.next = 6, r.Request.apiRequest("GET", i);

              case 6:
                if (n = e.sent, t.$hideLoading(), !n.errorCode) {
                    e.next = 11;
                    break;
                }
                return t.$showToast(n.errorMsg), e.abrupt("return");

              case 11:
                n && n.after_sales && n.after_sales.after_sales_id && t.setData({
                    after_sales_id: n.after_sales.after_sales_id
                }), e.next = 17;
                break;

              case 14:
                e.prev = 14, e.t0 = e.catch(0), console.error(e.t0);

              case 17:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 0, 14 ] ]);
    })),
    toSelfMessage: function() {
        this.$forward("self_message", {
            ticketId: this.ticketId
        });
    },
    toAfterSales: function() {
        i.default.toWeb({
            page_name: "after_sales_status_detail",
            after_sales_id: this.data.after_sales_id
        }, this);
    },
    previewImg: function(e) {
        var r = e.currentTarget.dataset.url;
        wx.previewImage({
            current: r,
            urls: [ r ]
        });
    },
    onLoad: function(e) {
        var r = this, t = e.ticketId;
        r.ticketId = t, r.requestServiceMessage(r, t), r.$showLoading();
    }
};

(0, r.PddPage)(n, {
    pageName: "selfMessageProgress_detail",
    pageSn: 10147
});