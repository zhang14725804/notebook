function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var t = require("../../common/index"), n = e(require("../../libs/co/we-index")), r = e(require("../../libs/regenerator-runtime/runtime")), a = e(require("../../controller/config_controller")), o = [ {
    key: "bless",
    title: [ "新", "春", "祝", "福" ],
    goTo: "newyear_heka",
    pageElement: "newyear_card"
}, {
    key: "open_env",
    title: [ "拆", "红", "包" ],
    goTo: "open_envelope",
    pageElement: "open_envelope"
} ];

(0, t.PddPage)({
    data: {},
    onShareAppMessage: function() {
        return this.$generateShareContent({
            title: "新年到，财神到，多种新年红包让你乐不停！"
        });
    },
    onLoad: function() {
        this.loadPage();
    },
    loadPage: function() {
        var e = this;
        (0, n.default)(r.default.mark(function t() {
            var n, i, c, s, l, u, d, g, f;
            return r.default.wrap(function(t) {
                for (;;) switch (t.prev = t.next) {
                  case 0:
                    return t.next = 2, [ a.default.getConfig("Entrance_New_spring_blessings"), a.default.getConfig("Entrance_red_pocket_to_promotion"), a.default.getConfig("Entrance_Red_envelopes") ];

                  case 2:
                    for (n = t.sent, i = 0, c = [], s = !0, l = !1, u = void 0, t.prev = 8, d = n[Symbol.iterator](); !(s = (g = d.next()).done); s = !0) (f = g.value) && c.push(o[i]), 
                    i++;
                    t.next = 16;
                    break;

                  case 12:
                    t.prev = 12, t.t0 = t.catch(8), l = !0, u = t.t0;

                  case 16:
                    t.prev = 16, t.prev = 17, !s && d.return && d.return();

                  case 19:
                    if (t.prev = 19, !l) {
                        t.next = 22;
                        break;
                    }
                    throw u;

                  case 22:
                    return t.finish(19);

                  case 23:
                    return t.finish(16);

                  case 24:
                    e.setData({
                        activityList: c
                    });

                  case 25:
                  case "end":
                    return t.stop();
                }
            }, t, this, [ [ 8, 12, 16, 24 ], [ 17, , 19, 23 ] ]);
        }));
    },
    onShow: function() {},
    onUnload: function() {},
    onHide: function() {},
    goToActivity: function(e) {
        var n = void 0;
        if (e && e.detail && e.detail.target && e.detail.target.dataset) {
            var r = e.detail.target.dataset, a = r.goTo;
            n = r.pageElement, a && this.$forward(a);
        }
        this.$uploadFormId(e, !1);
        var o = {
            op: "click",
            page_section: "item_list",
            page_element: n
        };
        (0, t.TrackingRecord)(o);
    }
}, {
    pageName: "activity_entrance"
});