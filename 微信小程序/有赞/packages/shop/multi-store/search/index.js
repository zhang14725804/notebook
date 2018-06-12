!function(t) {
    function a(n) {
        if (e[n]) return e[n].exports;
        var i = global.installedModules[n] = e[n] = {
            i: n,
            l: !1,
            exports: {}
        };
        return t[n].call(i.exports, i, i.exports, a), i.l = !0, i.exports;
    }
    t = Object.assign(require("../../../../commons.js").modules, t);
    var e = {};
    e = global.installedModules = global.installedModules || {}, a.m = t, a.c = e, a.d = function(t, e, n) {
        a.o(t, e) || Object.defineProperty(t, e, {
            configurable: !1,
            enumerable: !0,
            get: n
        });
    }, a.r = function(t) {
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
    }, a.n = function(t) {
        var e = t && t.__esModule ? function() {
            return t.default;
        } : function() {
            return t;
        };
        return a.d(e, "a", e), e;
    }, a.o = function(t, a) {
        return Object.prototype.hasOwnProperty.call(t, a);
    }, a.p = "", a(a.s = 164);
}({
    164: function(t, a, e) {
        var n, i = (n = e(0)) && n.__esModule ? n : {
            default: n
        }, o = function(t) {
            if (t && t.__esModule) return t;
            var a = {};
            if (null != t) for (var e in t) Object.prototype.hasOwnProperty.call(t, e) && (a[e] = t[e]);
            return a.default = t, a;
        }(e(1)), s = e(9), r = e(60), l = e(46), c = e(12), d = c.tryLocation, u = c.gcjToBaidu, h = e(45), g = h.fetchShops, f = h.saveLocation, p = h.saveStoreAndJumpBack, v = h.tryLocationAgain, y = {
            data: {
                themeClass: getApp().themeClass,
                rangeIndex: 0,
                keyword: "",
                placeholder: "可搜索区县、商圈、路名等",
                list: []
            },
            onLoad: function(t) {
                this.map = new l({
                    key: "P4PBZ-M6FCS-DUPOZ-6DMNA-SLPRJ-MOFFS"
                }), this.autoSearch = r(this._search, 1e3), t.title && wx.setNavigationBarTitle({
                    title: t.title
                }), t.range && this.setData({
                    rangeIndex: +t.range
                });
            },
            pickerChange: function(t) {
                this.setData({
                    rangeIndex: t.detail.value,
                    placeholder: 0 == t.detail.value ? "可搜索区县、商圈、路名等" : "你要配送的小区、大楼等"
                }), wx.setNavigationBarTitle({
                    title: 0 == t.detail.value ? "按名称、地址搜索门店" : "按收货地址搜索门店"
                }), this.data.keyword && this._search(this.data.keyword);
            },
            clearInput: function() {
                this.setData({
                    keyword: ""
                });
            },
            cancelSearch: function() {
                wx.navigateBack();
            },
            inputChange: function(t) {
                this.setData({
                    keyword: t.detail.value
                }), this.autoSearch(t.detail.value);
            },
            search: function(t) {
                this.setData({
                    keyword: t.detail.value
                }), this._search(t.detail.value), this.autoSearch.cancel();
            },
            onToLower: function() {
                this.data.nomore || this.data.loading || 1 == +this.data.rangeIndex || (this.setData({
                    loading: !0
                }), this.lastQuery.page = this.lastQuery.page + 1, this.searchShops(this.lastQuery));
            },
            navigateBack: function(t) {
                var a = t.target.dataset.itemIndex;
                if (0 == +a || a) {
                    var e = this.data.list[a];
                    if (0 === this.data.rangeIndex) return e.image = e.image.split(","), void p.call(this, e, 2);
                    var n = u(e.location.lng, e.location.lat), i = n.lng, o = n.lat;
                    wx.navigateTo({
                        url: s.add("/packages/shop/multi-store/index/index", {
                            address: e.name,
                            lng: i,
                            lat: o
                        })
                    });
                }
            },
            chooseCloseShop: function() {
                var t = this;
                d(function(a) {
                    var e = a.lng, n = a.lat;
                    f({
                        lng: e,
                        lat: n
                    }), t.setData({
                        rangeIndex: 0,
                        isUsedLocation: !0
                    }), t.searchShops({
                        lat: n,
                        lng: e,
                        page: 1,
                        page_size: 20
                    });
                }, function() {
                    return t.showZanToast("获取位置失败");
                }, v);
            },
            _search: function(t) {
                t && !this.loading && (this.setData({
                    loading: !0,
                    isUsedLocation: !1,
                    nomore: !1,
                    nodata: !1,
                    list: [],
                    scrollPosition: 0
                }), 1 == +this.data.rangeIndex ? this.searchKeyword(t) : this.searchShops({
                    keyword: t,
                    page: 1,
                    page_size: 20
                }));
            },
            searchKeyword: function(t) {
                var a = this;
                this.map.getSuggestion({
                    keyword: t,
                    policy: 1,
                    success: function(t) {
                        var e = t.data.map(function(t) {
                            return {
                                name: t.title,
                                address: t.address,
                                location: t.location
                            };
                        });
                        a.setData({
                            list: e,
                            loading: !1,
                            nodata: 0 === e.length
                        });
                    },
                    fail: function(t) {
                        a.setData({
                            loading: !1
                        }), a.showZanToast(t.message || "获取地址失败");
                    }
                });
            }
        };
        y.searchShops = g, (0, i.default)(y, o.Toast);
    }
});