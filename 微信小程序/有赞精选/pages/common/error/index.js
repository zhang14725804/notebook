!function() {
    require("./../../../common.js"), wx.webpackJsonp.apply(null, arguments);
}([ 48 ], {
    330: function(t, e, o) {
        var n = function(t) {
            return t && t.__esModule ? t : {
                default: t
            };
        }(o(1)), a = getApp(), d = o(0);
        o(3);
        (0, n.default)({
            data: {
                text: "",
                code: 0
            },
            onLoad: function(t) {
                var e = a.db.get(t.dbid) || {};
                this.setData({
                    text: e.text || "哎呀，出错了",
                    code: e.code || 0
                });
            },
            onShow: function() {
                d.page.show(), this.isShowed && wx.switchTab({
                    url: "/pages/home/dashboard/index"
                }), this.isShowed = !0;
            }
        });
    }
}, [ 330 ]);