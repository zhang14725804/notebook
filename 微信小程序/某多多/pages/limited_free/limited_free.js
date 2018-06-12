function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var i = e(require("../../configs/api")), t = (e(require("../../libs/es6-promise.min")), 
e(require("../../libs/co/we-index"))), r = e(require("../../libs/regenerator-runtime/runtime")), n = require("../../common/index"), a = {
    data: {
        limRuleLine: "http://minipinduoduo.oss-cn-shanghai.aliyuncs.com/goods/free_line_icon%402x.png",
        goodsId: "",
        activityId: "",
        userInfos: []
    },
    loadPage: function() {
        var e = this;
        e.getFreeWinner(e);
    },
    getFreeWinner: t.default.wrap(r.default.mark(function e(t) {
        var a, s, o;
        return r.default.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                return e.prev = 0, a = t.data.goodsId, s = t.data.activityId, e.next = 5, n.Request.apiRequest("GET", i.default.getFreeWinnerList, {
                    activity_id: s,
                    goods_id: a
                }, !0);

              case 5:
                return o = e.sent, t.processFreeWinner(o), e.abrupt("return", o);

              case 10:
                e.prev = 10, e.t0 = e.catch(0), console.error(e.t0);

              case 13:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 0, 10 ] ]);
    })),
    processFreeWinner: function(e) {
        var i = {};
        if (e.activity_begin_time && e.activity_end_time) {
            var t = e.activity_begin_time, r = e.activity_end_time, a = n.TimeUtil.formatTime(t, "MM.dd hh:mm"), s = n.TimeUtil.formatTime(r, "MM.dd hh:mm");
            i.startTimeDesc = a, i.endTimeDesc = s;
        }
        if (e.user_infos) {
            var o = e.user_infos ? e.user_infos : [];
            o = this.parseData(o), i.userInfos = o;
        } else this.$showToast(e.error_msg);
        this.setData(i);
    },
    parseData: function(e) {
        if (e.length > 0) {
            for (var i in e) {
                var t = e[i].order_sn.split("-");
                e[i].order_sn_head = t[0] + "-", e[i].order_sn_end = t[1];
            }
            return e;
        }
    },
    onLoad: function(e) {
        var i = e.goods_id, t = e.activity_id;
        i && t && this.setData({
            goodsId: i,
            activityId: t
        }), this.loadPage();
    }
};

(0, n.PddPage)(a, {
    pageName: "limited_free",
    pageSn: 10136
});