!function() {
    require("./../../../common.js"), wx.webpackJsonp.apply(null, arguments);
}([ 18 ], {
    278: function(n, t, e) {
        function o(n) {
            return n && n.__esModule ? n : {
                default: n
            };
        }
        var a = o(e(2)), i = o(e(1)), c = e(158), s = e(44), u = e(0), r = getApp(), l = (0, 
        a.default)({}, {
            data: {
                isShowEmpty: !1,
                trackInfo: []
            },
            cellClick: function(n) {
                var t = n.currentTarget.dataset.itemAlias, e = n.currentTarget.dataset.shopname;
                wx.redirectTo({
                    url: "../../goods/detail/index?alias=" + t + "&teamName=" + e
                }), console.log();
            },
            onLoad: function() {
                s(this);
                var n = c.getTrackStorage();
                this.setData({
                    trackInfo: n
                }), 0 == n.length && this.setData({
                    isShowEmpty: !0
                });
            },
            gohome: function() {
                wx.switchTab({
                    url: "/pages/venue/home/index",
                    success: function() {
                        r.initVenuesTabData({
                            reset: !0
                        });
                    }
                });
            },
            onReady: function() {},
            onShow: function() {
                u.page.show();
            },
            onHide: function() {},
            onUnload: function() {},
            onPullDownRefresh: function() {},
            onReachBottom: function() {},
            onShareAppMessage: function() {}
        });
        (0, i.default)(l);
    }
}, [ 278 ]);