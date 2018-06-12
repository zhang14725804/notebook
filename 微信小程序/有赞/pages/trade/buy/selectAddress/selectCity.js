!function(t) {
    function e(i) {
        if (n[i]) return n[i].exports;
        var a = global.installedModules[i] = n[i] = {
            i: i,
            l: !1,
            exports: {}
        };
        return t[i].call(a.exports, a, a.exports, e), a.l = !0, a.exports;
    }
    t = Object.assign(require("../../../../commons.js").modules, t);
    var n = {};
    n = global.installedModules = global.installedModules || {}, e.m = t, e.c = n, e.d = function(t, n, i) {
        e.o(t, n) || Object.defineProperty(t, n, {
            configurable: !1,
            enumerable: !0,
            get: i
        });
    }, e.r = function(t) {
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
    }, e.n = function(t) {
        var n = t && t.__esModule ? function() {
            return t.default;
        } : function() {
            return t;
        };
        return e.d(n, "a", n), n;
    }, e.o = function(t, e) {
        return Object.prototype.hasOwnProperty.call(t, e);
    }, e.p = "", e(e.s = 204);
}({
    204: function(t, e, n) {
        function i(t, e, n) {
            return e in t ? Object.defineProperty(t, e, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : t[e] = n, t;
        }
        var a, o, c, r, s = (o = n(0)) && o.__esModule ? o : {
            default: o
        }, l = n(48), u = [ "A", "B", "C", "D", "E", "F", "G", "H", "J", "K", "L", "M", "N", "P", "Q", "R", "S", "T", "W", "X", "Y", "Z" ], y = getApp(), f = [], h = [];
        (0, s.default)(l, (i(a = {
            data: {
                searchLetter: [],
                isShowLetter: !1,
                scrollTopId: "",
                city: "杭州市",
                recentlyCityList: [],
                cityList: [],
                isfocus: !1,
                isShowCityList: !0
            },
            searchCancel: function() {
                this.cancelFrontView();
            },
            searchAction: function() {
                console.log("搜索");
            },
            lower: function() {},
            searchDone: function(t) {
                this.setData({
                    keyword: t.value,
                    page: 1
                }), 0 != this.data.keyword.length ? console.log("搜索") : this.setData({
                    products: []
                });
            },
            onLoad: function(t) {
                this.getNetworkingCityList(), this.getRecentlyCity(), "undefined" != t.city ? (c = t.city, 
                r = t.cityCode, this.setData({
                    city: t.city,
                    code: t.cityCode
                })) : (c = "全国", r = 0, this.setData({
                    city: "全国"
                }));
            },
            onReady: function() {},
            onShow: function() {},
            onHide: function() {},
            onUnload: function() {},
            onPullDownRefresh: function() {},
            onReachBottom: function() {},
            clickLetter: function(t) {
                var e = t.currentTarget.dataset.letter;
                this.setData({
                    showLetter: e,
                    isShowLetter: !0,
                    scrollTopId: e
                });
                var n = this;
                setTimeout(function() {
                    n.setData({
                        isShowLetter: !1
                    });
                }, 1e3);
            },
            getCityList: function(t) {
                f = [];
                for (var e = [], n = t.response, i = 0; i < u.length; i++) {
                    var a = u[i];
                    for (var o in n) if (a == o) {
                        var c = n[o], r = [], s = {};
                        s.initial = a;
                        for (var l = 0; l < c.length; l++) {
                            var y = c[l], h = {
                                city: y.cityName,
                                code: y.cityCode,
                                initial: o,
                                id: l
                            };
                            r.push(h);
                        }
                        s.cityInfo = r, e.push(s), f.push(a);
                    }
                }
                return e;
            },
            getNetworkingCityList: function() {
                var t = this;
                y.carmen({
                    api: "weapp.wsc.selffetch/1.0.0/getcitymap",
                    success: function(e) {
                        var n = {
                            response: e
                        };
                        h = t.getCityList(n);
                        for (var i = wx.getSystemInfoSync().windowHeight / f.length, a = [], o = 0; o < f.length; o++) {
                            var c = {};
                            c.name = f[o], c.tHeight = o * i, c.bHeight = (o + 1) * i, c.index = o, a.push(c);
                        }
                        t.setData({
                            indexH: i,
                            searchLetter: a,
                            cityList: h
                        });
                    },
                    complete: function() {}
                });
            },
            bindCity: function(t) {
                console.log("bindCity");
                var e = t.currentTarget.dataset.city, n = t.currentTarget.dataset.code;
                this.saveRecentlyCity(n, e), this.setData({
                    city: t.currentTarget.dataset.city
                });
            },
            bindRecentlyCity: function(t) {
                console.log("bindRecentlyCity");
                var e = t.currentTarget.dataset.name, n = t.currentTarget.dataset.code;
                console.log("查看最近访问的数据" + e + n), this.backFrontView(n, e), this.setData({
                    city: t.currentTarget.dataset.city
                });
            },
            recentlyCityTap: function() {
                this.setData({
                    scrollTop: 0
                });
            },
            saveRecentlyCity: function(t, e) {
                for (var n = wx.getStorageSync("RecentlyCity"), i = [], a = 0; a < n.length; a++) {
                    var o = n[a];
                    i.push(o);
                }
                for (a = 0; a < n.length && (o = n[a]).code != t; a++) ;
                if (a >= n.length) {
                    var c = {
                        city: e,
                        code: t
                    };
                    i.push(c);
                }
                wx.setStorageSync("RecentlyCity", i), o = {
                    city: e,
                    code: t
                }, wx.setStorageSync("RecentlyData", o), this.backFrontView(t, e);
            },
            getRecentlyCity: function() {
                var t = wx.getStorageSync("RecentlyCity");
                this.setData({
                    recentlyCityList: t
                });
            },
            backFrontView: function(t, e) {
                var n = getCurrentPages();
                n[n.length - 2].setData({
                    cityModel: {
                        code: t,
                        name: e
                    }
                }), wx.navigateBack({
                    delta: 1
                });
            },
            presentCityName: function() {
                var t = getCurrentPages();
                t[t.length - 2].setData({
                    cityModel: {
                        code: r,
                        name: c
                    }
                }), wx.navigateBack({
                    delta: 1
                });
            },
            cancelFrontView: function() {
                this.setData({
                    isShowCityList: !0
                });
            }
        }, "searchDone", function(t) {
            for (var e = [], n = t.value, i = 0; i < h.length; i++) {
                for (var a = h[i].cityInfo, o = [], c = 0; c < a.length; c++) {
                    var r = a[c], s = r.initial.indexOf(n), l = r.city.indexOf(n);
                    (s >= 0 || l >= 0) && o.push(r);
                }
                if (0 != o.length) {
                    var u = {
                        initial: h[i].initial,
                        cityInfo: o
                    };
                    e.push(u);
                } else wx.showToast({
                    title: "暂无数据"
                });
            }
            this.setData({
                searchCityList: e
            });
        }), i(a, "searchCityTap", function() {
            this.setData({
                isShowCityList: !1
            });
        }), a));
    }
});