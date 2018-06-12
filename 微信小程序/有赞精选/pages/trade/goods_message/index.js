!function() {
    require("./../../../common.js"), wx.webpackJsonp.apply(null, arguments);
}([ 33 ], {
    302: function(e, t, a) {
        function n(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        var o = n(a(2)), s = n(a(1)), r = a(6), u = a(0), i = getApp(), g = (0, o.default)({}, {
            data: {
                goods: {}
            },
            onLoad: function(e) {
                var t = e.goods, a = i.db.get(t);
                a.message = this.formatMessage(a.message), this.setData({
                    goods: a
                });
            },
            onShow: function() {
                u.page.show();
            },
            formatMessage: function() {
                var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : [];
                return e.forEach(function(e) {
                    var t = e.value, a = /^\s*http(s)*:\/\/.+/.test(t) ? "image" : "text";
                    e.type = a, "image" == a && (e.preview = r(t, "!200x200.jpg"));
                }), e;
            },
            previewImg: function(e) {
                var t = e.currentTarget.dataset.src;
                wx.previewImage({
                    current: t,
                    urls: [ t ]
                });
            },
            navigateBack: function() {
                wx.navigateBack();
            }
        });
        (0, s.default)(g);
    }
}, [ 302 ]);