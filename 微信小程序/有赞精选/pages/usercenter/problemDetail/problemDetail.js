!function() {
    require("./../../../common.js"), wx.webpackJsonp.apply(null, arguments);
}([ 16 ], {
    268: function(t, n, e) {
        function o(t) {
            return t && t.__esModule ? t : {
                default: t
            };
        }
        var i = o(e(2)), a = o(e(4)), l = o(e(1)), c = e(44), d = getApp(), h = e(0), u = (0, 
        i.default)({}, {
            data: {
                windowHeight: 0,
                windowWidth: 0,
                title: "",
                rich_info: [],
                clickInterface: {
                    helpPhoneCall: "helpPhoneCall"
                }
            },
            onLoad: function(t) {
                c(this);
                var n = t.title, e = t.dbId, o = JSON.parse(d.db.get(e));
                this.setData({
                    title: n,
                    richInfo: o
                });
            },
            onReady: function() {},
            onShow: function() {
                h.page.show();
            },
            onHide: function() {},
            onUnload: function() {},
            helpPhoneCall: function() {
                wx.showModal({
                    title: "0571-89988550",
                    cancelText: "取消",
                    confirmText: "拨打",
                    cancelColor: "#333",
                    success: function(t) {
                        t.confirm && wx.makePhoneCall({
                            phoneNumber: "0571-89988550"
                        });
                    }
                });
            },
            onLoadImageFinish: function(t) {
                var n = (0, a.default)(t);
                console.log(n);
                var e = t.detail.height, o = t.detail.width, i = t.currentTarget.dataset.idx, l = JSON.parse((0, 
                a.default)(this.data.richInfo));
                l[i].imgHeight = e * (this.data.windowWidth / o), this.setData({
                    richInfo: l
                });
            }
        });
        (0, l.default)(u);
    }
}, [ 268 ]);