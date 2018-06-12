!function() {
    require("./../../../common.js"), wx.webpackJsonp.apply(null, arguments);
}([ 1, 5 ], {
    338: function(e, t, a) {
        function n(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        var s = n(a(2)), i = n(a(1)), o = a(55);
        (o = (0, s.default)({}, o)).handleZanTabChange = function(e, t) {
            var a = e.selectedId, n = e.type, s = e.name, i = e.alias, o = this.filterSelectedTab(a, this.data.venuesTab && this.data.venuesTab.list || []).data, d = o.subTab && 0;
            if (a != this.data.venuesTab.selectedId) if ("all" !== a) {
                var u;
                this.setData((u = {}, u["venuesTab.selectedId"] = a, u["venuesTab.selectedType"] = n, 
                u["venuesTab.selectedName"] = s, u["venuesTab.selectedAlias"] = i, u["subTab.list"] = o.subTab || {}, 
                u["subTab.selectedId"] = d, u.actionSubTab = !1, u)), this.onTapScroll(t), this.onTabChange();
            } else wx.switchTab({
                url: "/pages/venue/home/index"
            });
        }, (0, i.default)(o);
    },
    55: function(e, t, a) {
        function n(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        var s = n(a(4)), i = n(a(2)), o = n(a(1)), d = a(100), u = a(101), l = a(102), c = a(103), h = a(66), r = a(20), b = a(0), T = a(54), p = a(23), f = a(42), v = a(24), g = a(43), m = a(12), w = a(17), x = getApp(), I = {
            data: (0, i.default)({
                pages: {}
            }, d.data, u.data, l.data, c.data, h.data, r.data, p.data),
            onLoad: function(e) {
                var t = {};
                try {
                    t = e.id ? e : w.decode("venues", e.scene), m("pages/venues/index/index onload(decode) " + (0, 
                    s.default)(t));
                } catch (a) {
                    t = {}, m("pages/venues/index/index onload(catch) " + (0, s.default)(e));
                }
                this.options = t, x.initVenuesTabData = this.initTabData, this.initTabData(t), this.imgLoader = new T(this), 
                m("pages/venues/index/index options " + (0, s.default)(e)), m("pages/venues/index/index scene " + (0, 
                s.default)(e.scene));
            },
            onShow: function() {
                this.setThreshold();
                var e = this.data.venuesTab.selectedId || this.options.id || "all";
                b.setGlobalData({
                    channel: e
                }), b.cleanData([ "topic" ]);
                var t = "all" === e ? 0 : e;
                b.page.show({
                    id: t
                });
            },
            onShareAppMessage: function() {
                var e = {
                    id: this.data.venuesTab.selectedId,
                    subId: this.data.subTab.selectedId
                }, t = f[e.id].title || "推荐你看看，精选好货限时让利！", a = f[e.id].url || "", n = {
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
                g().then(function(t) {
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
        }, D = (0, i.default)({}, v, I, d.component, r.component, u.component, l.component, c.component, h.component, p.component);
        (0, o.default)(D), e.exports = D;
    }
}, [ 338 ]);