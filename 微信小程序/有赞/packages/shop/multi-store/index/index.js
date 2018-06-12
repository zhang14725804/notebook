!function(t) {
    function e(o) {
        if (s[o]) return s[o].exports;
        var a = global.installedModules[o] = s[o] = {
            i: o,
            l: !1,
            exports: {}
        };
        return t[o].call(a.exports, a, a.exports, e), a.l = !0, a.exports;
    }
    t = Object.assign(require("../../../../commons.js").modules, t);
    var s = {};
    s = global.installedModules = global.installedModules || {}, e.m = t, e.c = s, e.d = function(t, s, o) {
        e.o(t, s) || Object.defineProperty(t, s, {
            configurable: !1,
            enumerable: !0,
            get: o
        });
    }, e.r = function(t) {
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
    }, e.n = function(t) {
        var s = t && t.__esModule ? function() {
            return t.default;
        } : function() {
            return t;
        };
        return e.d(s, "a", s), s;
    }, e.o = function(t, e) {
        return Object.prototype.hasOwnProperty.call(t, e);
    }, e.p = "", e(e.s = 165);
}({
    165: function(t, e, s) {
        var o, a = (o = s(0)) && o.__esModule ? o : {
            default: o
        }, i = function(t) {
            if (t && t.__esModule) return t;
            var e = {};
            if (null != t) for (var s in t) Object.prototype.hasOwnProperty.call(t, s) && (e[s] = t[s]);
            return e.default = t, e;
        }(s(1)), n = s(9), r = s(46), l = s(12).tryLocation, c = s(45), d = c.tryLocationAgain, h = c.saveLocation, u = c.fetchShops, p = c.saveStoreAndJumpBack, f = getApp(), g = {
            data: {
                themeClass: f.themeClass,
                activeTab: "default",
                shop: f.globalData.shopInfo,
                list: []
            },
            onLoad: function(t) {
                this.queryAddress = t.address, this.redirectto = t.to, delete t.address, this.map = new r({
                    key: "P4PBZ-M6FCS-DUPOZ-6DMNA-SLPRJ-MOFFS"
                }), this.query = Object.assign({}, t, {
                    page: 1,
                    page_size: 20
                }), t.useLocationTab && this.chooseCloseShop();
            },
            onReady: function() {
                var t = this;
                f.getShopInfo().then(function() {
                    t.setData({
                        shop: f.globalData.shopInfo,
                        copyright: f.globalData.copyright,
                        is_big_shop: f.globalData.is_big_shop
                    });
                }), this.queryAddress && (this.queryAddress = decodeURIComponent(this.queryAddress), 
                this.setData({
                    activeTab: "location",
                    scrollPosition: 0,
                    queryAddress: this.queryAddress
                })), this.fetchShops(this.query);
            },
            onHide: function() {
                f.__doingSwitchStore = !1;
            },
            onUnload: function() {
                f.__doingSwitchStore = !1;
            },
            chooseDefaultShop: function() {
                this.setData({
                    activeTab: "default",
                    scrollPosition: 0,
                    loading: !0
                }), this.query = {
                    page: 1,
                    page_size: 20
                }, this.fetchShops({
                    page: 1,
                    page_size: 20
                });
            },
            chooseCloseShop: function() {
                var t = this;
                l(function(e, s) {
                    var o = e.lat, a = e.lng, i = {
                        lng: a,
                        lat: o,
                        page: 1,
                        page_size: 20
                    };
                    t.query = i, h({
                        lat: o,
                        lng: a
                    }), t.setData({
                        activeTab: "location",
                        scrollPosition: 0,
                        loading: !0,
                        list: []
                    }), t.fetchShops(i), t.getAddressByLocation(s);
                }, function(e) {
                    if (/auth deny/.test(e.errMsg)) return t.tryAlign = !0, t.chooseCloseShop();
                    t.showZanToast("位置获取失败，无法推荐你附近的店");
                }, this.tryAlign ? d : null);
            },
            navigateBack: function(t) {
                var e = t.target.dataset.itemIndex;
                if (0 == +e || e) {
                    var s = Object.assign({}, this.data.list[e]);
                    try {
                        s.business_hours_advanced = JSON.parse(s.business_hours_advanced);
                    } catch (t) {
                        s.business_hours_advanced = [];
                    }
                    s.image = s.image.split(",").map(function(t) {
                        return !/http[s]/i.test(t) || /^upload_files/.test(t) ? "https://img.yzcdn.cn/" + t : t;
                    }), p.call(this, s);
                }
            },
            navToSearchPage: function() {
                wx.navigateTo({
                    url: n.add("/packages/shop/multi-store/search/index", {
                        range: 1,
                        keyword: this.data.queryAddress
                    })
                });
            },
            onScroll: function(t) {
                var e = t.detail.scrollTop;
                e > 120 && !this.data.isFixed ? this.setData({
                    isFixed: !0
                }) : e < 120 && this.data.isFixed && this.setData({
                    isFixed: !1
                }), e >= 1136 && !this.data.showToTopBtn ? this.setData({
                    showToTopBtn: !0
                }) : e < 1136 && this.data.showToTopBtn && this.setData({
                    showToTopBtn: !1
                });
            },
            onToLower: function() {
                this.data.loading || this.data.nomore || (this.setData({
                    loading: !0
                }), this.query.page = this.query.page + 1, this.fetchShops(this.query));
            },
            onScrollToTop: function() {
                this.setData({
                    scrollPosition: 0,
                    showToTopBtn: !1
                });
            },
            getAddressByLocation: function(t) {
                var e = this;
                this.map.reverseGeocoder({
                    location: t,
                    poi_options: "policy=2",
                    success: function(t) {
                        var s = t.result;
                        e.setData({
                            queryAddress: s.formatted_addresses.recommend || s.address || ""
                        });
                    },
                    fail: function(t) {
                        console.log(t);
                    }
                });
            }
        };
        g.fetchShops = u, (0, a.default)(g, i.Toast);
    }
});