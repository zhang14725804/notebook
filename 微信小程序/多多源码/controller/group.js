function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var r = e(require("../configs/api")), t = e(require("../common/request")), o = e(require("../common/time_util")), l = e(require("../common/data_util")), a = e(require("../libs/co/we-index")), n = e(require("../libs/regenerator-runtime/runtime")), u = {
    loadLocalGroups: a.default.wrap(n.default.mark(function e(o, a, u) {
        var i, s, d, c, f;
        return n.default.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (!((o = o || []).length <= 0)) {
                    e.next = 3;
                    break;
                }
                return e.abrupt("return");

              case 3:
                if (e.prev = 3, l.default.isArray(o) && !(o.length <= 0)) {
                    e.next = 6;
                    break;
                }
                return e.abrupt("return");

              case 6:
                return i = t.default.requestDataWithUrl("POST", r.default.goodsLocalGroups, {
                    goods_ids: o
                }, !0), e.next = 9, t.default.runSecondaryRequestForPage(i, u);

              case 9:
                s = e.sent, d = a || {};
                for (c in s) s.hasOwnProperty(c) && (isNaN(parseInt(c, 10)) || ((f = s[c]).list = f.list.reverse(), 
                d[c] = f));
                return e.abrupt("return", d);

              case 15:
                e.prev = 15, e.t0 = e.catch(3), console.error(e.t0);

              case 18:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 3, 15 ] ]);
    })),
    setupLocalGroup: function(e, r, t) {
        r = r || t.data.localGroups || [];
        var l = function(e, r) {
            var l = [], a = null;
            (r = r || []).map(function(r) {
                null == r.deltaMillisecond && (r.deltaMillisecond = Math.max(1e3 * (parseInt(r.expireTime) - t.serverTime), 0)), 
                !e && r.deltaMillisecond >= 1e3 && (r.deltaMillisecond -= 1e3);
                var n = o.default.transferToTime(r.deltaMillisecond);
                return r.leftTimeStr = "", parseInt(n.days) > 0 && (r.leftTimeStr = n.days + "天:"), 
                r.leftTimeStr = n, r.deltaMillisecond > 0 && r.deltaMillisecond <= 216e5 && (t.data.minLeftTimeLocalGroup && r.groupOrderId == t.data.minLeftTimeLocalGroup.groupOrderId && (a = r), 
                l.push(r)), r;
            }), !a && l.length > 0 && (l.length > 5 ? a = l[Math.floor(Math.random() * l.length)] : (l.sort(function(e, r) {
                return e.deltaMillisecond && r.deltaMillisecond ? e.deltaMillisecond - r.deltaMillisecond : 0;
            }), a = l[0])), t.setData({
                localGroups: r,
                minLeftTimeLocalGroup: a,
                refreshCountDown: !t.data.refreshCountDown
            });
        };
        l(e, r), null != t.localGroupCountdown && clearTimeout(t.localGroupCountdown), t.localGroupCountdown = null;
        !function e() {
            t.localGroupCountdown = setTimeout(function() {
                l(!1, r), e();
            }, 1e3);
        }();
    }
};

exports.default = u;