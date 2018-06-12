!function() {
    require("./../../../../common.js"), wx.webpackJsonp.apply(null, arguments);
}([ 35 ], {
    308: function(t, e, i) {
        var n, a, c, o = i(107), s = i(3), r = [ "A", "B", "C", "D", "E", "F", "G", "H", "J", "K", "L", "M", "N", "P", "Q", "R", "S", "T", "W", "X", "Y", "Z" ], y = getApp(), h = [], l = [];
        Page(s({}, o, (n = {
            data: {
                searchLetter: [],
                isShowLetter: !1,
                scrollTopId: "",
                city: "杭州市",
                recentlyCityList: [],
                cityList: [],
                isfocus: !1,
                isShowCityList: !0,
                kdtId: ""
            },
            searchCancel: function() {
                this.cancelFrontView();
            },
            searchAction: function() {
                console.log("搜索");
            },
            lower: function() {},
            searchDone: function(t) {
                return this.setData({
                    keyword: t.value,
                    page: 1
                }), 0 == this.data.keyword.length ? void this.setData({
                    products: []
                }) : void console.log("搜索");
            },
            onLoad: function(t) {
                this.getNetworkingCityList(), this.getRecentlyCity(), this.setData({
                    kdtId: t.kdtId
                }), "undefined" == t.city ? (a = "全国", c = 0, this.setData({
                    city: "全国"
                })) : (a = t.city, c = t.cityCode, this.setData({
                    city: t.city,
                    code: t.cityCode
                }));
            },
            onReady: function() {},
            onShow: function() {},
            onHide: function() {},
            onUnload: function() {},
            onPullDownRefresh: function() {},
            onReachBottom: function() {},
            onShareAppMessage: function() {},
            clickLetter: function(t) {
                var e = t.currentTarget.dataset.letter;
                this.setData({
                    showLetter: e,
                    isShowLetter: !0,
                    scrollTopId: e
                });
                var i = this;
                setTimeout(function() {
                    i.setData({
                        isShowLetter: !1
                    });
                }, 1e3);
            }
        }, n.clickLetter = function(t) {
            var e = t.currentTarget.dataset.letter;
            this.setData({
                showLetter: e,
                isShowLetter: !0,
                scrollTopId: e
            });
            var i = this;
            setTimeout(function() {
                i.setData({
                    isShowLetter: !1
                });
            }, 1e3);
        }, n.getCityList = function(t) {
            h = [];
            for (var e, i = [], n = t.response, a = 0; a < r.length; a++) for (var c in e = r[a], 
            n) if (e == c) {
                var o = n[c], s = [], y = {};
                y.initial = e;
                for (var l = 0; l < o.length; l++) {
                    var u = o[l], d = {
                        city: u.cityName,
                        code: u.cityCode,
                        initial: c,
                        id: l
                    };
                    s.push(d);
                }
                y.cityInfo = s, i.push(y), h.push(e);
            }
            return i;
        }, n.getNetworkingCityList = function() {
            var t = this;
            y.carmen({
                api: "weapp.wsc.selffetch/1.0.0/getcitymap",
                data: {
                    kdt_id: this.data.kdtId
                },
                success: function(e) {
                    l = t.getCityList({
                        response: e
                    });
                    for (var i, n = wx.getSystemInfoSync().windowHeight / h.length, a = [], c = 0; c < h.length; c++) (i = {}).name = h[c], 
                    i.tHeight = c * n, i.bHeight = (c + 1) * n, i.index = c, a.push(i);
                    t.setData({
                        indexH: n,
                        searchLetter: a,
                        cityList: l
                    });
                },
                complete: function() {}
            });
        }, n.bindCity = function(t) {
            console.log("bindCity");
            var e = t.currentTarget.dataset.city, i = t.currentTarget.dataset.code;
            this.saveRecentlyCity(i, e), this.setData({
                city: t.currentTarget.dataset.city
            });
        }, n.bindRecentlyCity = function(t) {
            console.log("bindRecentlyCity");
            var e = t.currentTarget.dataset.name, i = t.currentTarget.dataset.code;
            console.log("查看最近访问的数据" + e + i), this.backFrontView(i, e), this.setData({
                city: t.currentTarget.dataset.city
            });
        }, n.recentlyCityTap = function() {
            this.setData({
                scrollTop: 0
            });
        }, n.saveRecentlyCity = function(t, e) {
            for (var i = wx.getStorageSync("RecentlyCity"), n = [], a = 0; a < i.length; a++) c = i[a], 
            n.push(c);
            for (a = 0; a < i.length && (c = i[a]).code != t; a++) ;
            a >= i.length && n.push({
                city: e,
                code: t
            }), wx.setStorageSync("RecentlyCity", n);
            var c = {
                city: e,
                code: t
            };
            wx.setStorageSync("RecentlyData", c), this.backFrontView(t, e);
        }, n.getRecentlyCity = function() {
            var t = wx.getStorageSync("RecentlyCity");
            this.setData({
                recentlyCityList: t
            });
        }, n.backFrontView = function(t, e) {
            var i = getCurrentPages();
            i[i.length - 2].setData({
                cityModel: {
                    code: t,
                    name: e
                }
            }), wx.navigateBack({
                delta: 1
            });
        }, n.presentCityName = function() {
            var t = getCurrentPages();
            t[t.length - 2].setData({
                cityModel: {
                    code: c,
                    name: a
                }
            }), wx.navigateBack({
                delta: 1
            });
        }, n.cancelFrontView = function() {
            this.setData({
                isShowCityList: !0
            });
        }, n.searchDone = function(t) {
            for (var e = [], i = t.value, n = 0; n < l.length; n++) {
                for (var a = l[n].cityInfo, c = [], o = 0; o < a.length; o++) {
                    var s = a[o], r = s.initial.indexOf(i), y = s.city.indexOf(i);
                    (0 <= r || 0 <= y) && c.push(s);
                }
                if (0 != c.length) {
                    var h = {
                        initial: l[n].initial,
                        cityInfo: c
                    };
                    e.push(h);
                } else wx.showToast({
                    title: "暂无数据"
                });
            }
            this.setData({
                searchCityList: e
            });
        }, n.searchCityTap = function() {
            this.setData({
                isShowCityList: !1
            });
        }, n)));
    }
}, [ 308 ]);