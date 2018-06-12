!function() {
    require("./../../../common.js"), wx.webpackJsonp.apply(null, arguments);
}([ 2, 5 ], {
    336: function(e, t, a) {
        function n(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        var i = n(a(4)), s = n(a(2)), o = n(a(1)), d = a(55), u = a(54), l = a(12), c = a(17), h = a(42), r = getApp();
        (d = (0, s.default)({}, d)).onLoad = function(e) {
            var t = this, a = {};
            try {
                a = e.id ? e : c.decode("venues", e.scene), l("pages/venues/index2/index onload(decode) " + (0, 
                i.default)(a));
            } catch (t) {
                a = {}, l("pages/venues/index2/index onload(catch) " + (0, i.default)(e));
            }
            this.options = a, r.initVenuesTabData = this.initTabData, this.imgLoader = new u(this), 
            this.initTabData(a).then(function() {
                wx.setNavigationBarTitle({
                    title: t.data.allTabData[a.id].alias
                });
            }), console.log(this.data.allTabData), l("pages/venues/index2/index options " + (0, 
            i.default)(e)), l("pages/venues/index2/index scene " + (0, i.default)(e.scene));
        }, d.onShareAppMessage = function() {
            var e = {
                id: this.data.venuesTab.selectedId,
                subId: this.data.subTab.selectedId
            }, t = h[e.id].title || "推荐你看看，精选好货限时让利！", a = h[e.id].url || "", n = {
                title: t,
                path: "pages/venues/index2/index?is_share=1&id=" + e.id + "&subId=" + e.subId
            };
            return a && (n.imageUrl = a), n;
        }, (0, o.default)(d);
    },
    55: function(e, t, a) {
        function n(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        var i = n(a(4)), s = n(a(2)), o = n(a(1)), d = a(100), u = a(101), l = a(102), c = a(103), h = a(66), r = a(20), p = a(0), f = a(54), v = a(23), b = a(42), g = a(24), T = a(43), x = a(12), m = a(17), w = getApp(), D = {
            data: (0, s.default)({
                pages: {}
            }, d.data, u.data, l.data, c.data, h.data, r.data, v.data),
            onLoad: function(e) {
                var t = {};
                try {
                    t = e.id ? e : m.decode("venues", e.scene), x("pages/venues/index/index onload(decode) " + (0, 
                    i.default)(t));
                } catch (a) {
                    t = {}, x("pages/venues/index/index onload(catch) " + (0, i.default)(e));
                }
                this.options = t, w.initVenuesTabData = this.initTabData, this.initTabData(t), this.imgLoader = new f(this), 
                x("pages/venues/index/index options " + (0, i.default)(e)), x("pages/venues/index/index scene " + (0, 
                i.default)(e.scene));
            },
            onShow: function() {
                this.setThreshold();
                var e = this.data.venuesTab.selectedId || this.options.id || "all";
                p.setGlobalData({
                    channel: e
                }), p.cleanData([ "topic" ]);
                var t = "all" === e ? 0 : e;
                p.page.show({
                    id: t
                });
            },
            onShareAppMessage: function() {
                var e = {
                    id: this.data.venuesTab.selectedId,
                    subId: this.data.subTab.selectedId
                }, t = b[e.id].title || "推荐你看看，精选好货限时让利！", a = b[e.id].url || "", n = {
                    title: t,
                    path: "pages/venues/index/index?is_share=1&id=" + e.id + "&subId=" + e.subId
                };
                return a && (n.imageUrl = a), n;
            },
            onPullDownRefresh: function() {
                var e = {
                    id: this.data.venuesTab.selectedId,
                    subId: this.data.subTab.selectedId
                };
                this.initTabData(e), wx.stopPullDownRefresh();
            },
            onTabChange: function() {
                this.initContent();
            },
            initUserLogo: function() {
                var e = this;
                T().then(function(t) {
                    e.setData({
                        userLogo: t
                    });
                });
            },
            initContent: function() {
                var e = this, t = {
                    home: "initHome",
                    1: "initCustom",
                    2: "initHold",
                    3: "initActivity"
                }[this.data.venuesTab.selectedType];
                if (t) return this[t]().catch(function() {
                    e.showZanToast("网络开小差了，请下拉刷新");
                });
            },
            initPageData: function() {
                var e = {}, t = this.data.venuesTab && this.data.venuesTab.list;
                t && t.forEach(function(t) {
                    e[t.id] = {
                        data: {
                            page: 1,
                            pageSize: 10,
                            loading: !1,
                            nodata: !1,
                            nomore: !1,
                            isRequest: !1
                        },
                        content: []
                    };
                }), this.initUserLogo(), this.setData({
                    pages: e
                });
            },
            onReachBottom: function() {
                var e = this, t = {
                    home: "handleHomeScrollToLower",
                    1: "handleCustomScrollToLower",
                    2: "handleHoldScrollToLower",
                    3: "handleActivityScrollToLower"
                }[this.data.venuesTab.selectedType];
                t && this[t]().catch(function() {
                    e.showZanToast("网络开小差了，请下拉刷新");
                });
            }
        }, I = (0, s.default)({}, g, D, d.component, r.component, u.component, l.component, c.component, h.component, v.component);
        (0, o.default)(I), e.exports = I;
    }
}, [ 336 ]);