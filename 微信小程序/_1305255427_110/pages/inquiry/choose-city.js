function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

function e(t, e, a) {
    return e in t ? Object.defineProperty(t, e, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = a, t;
}

var a = t(require("../../utils/api.js")), i = t(require("../../libs/lodash.core.min.js")), r = require("../../utils/util.js"), n = getApp();

Page({
    data: {
        piwikSource: "",
        scroll_top: 1e3,
        letter_before: 0,
        isShow_IndexLetter: !1,
        index_letter: "",
        toView: "",
        index_Top: 0,
        selectType: "",
        allCityList: [],
        supportShopCityList: [],
        supportCityIndexItem: {
            id: "",
            name: ""
        },
        supportCityIndexList: [],
        currentCity: {},
        currentTab: "",
        selectedCity: {},
        location: {}
    },
    onLoad: function(t) {
        var e = this;
        t.selectType && e.setData({
            selectType: t.selectType
        }), t.currentTab && e.setData({
            currentTab: t.currentTab
        }), t.currentCity && e.setData({
            selectedCity: t.currentCity
        }), e.initCityList(t.currentCity);
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    initCityList: function() {
        var t = this;
        t.fetchCityList().then(function(e) {
            t.setData({
                allCityList: e.data
            }), 1 == t.data.currentTab ? t.setData({
                supportShopCityList: t.data.allCityList
            }) : 0 == t.data.currentTab ? t.filterCitySupportShop() : 2 == t.data.currentTab && t.filterCitySupportondoor(), 
            t.filterShortAllCityList(), t.fileterCityLetterIndex(), t.setCurrentCity();
        });
    },
    fetchCityList: function() {
        return n.request(a.default.fetchAllCities);
    },
    setCurrentCity: function() {
        var t = this, e = this.data.allCityList;
        wx.getLocation({
            type: "wgs84",
            success: function(r) {
                var o = r.latitude, s = r.longitude;
                n.saveCache("curLocation", {
                    code: r
                });
                var u = {
                    longitude: s,
                    latitude: o
                };
                t.setData({
                    location: u
                });
                var d = o + "," + s;
                n.request(a.default.searchCurrentCity, {
                    location: d
                }).then(function(a) {
                    var r = a.result.ad_info.city;
                    n.saveCache("CurCity", r);
                    var o = i.default.find(e, function(t) {
                        return r.includes(t.name);
                    });
                    o && o.id && t.setData({
                        currentCity: o
                    });
                });
            },
            fail: function(t) {
                wx.openSetting({
                    success: function(t) {
                        t.authSetting["scope.userLocation"] && wx.redirectTo({
                            url: "./choose-city"
                        });
                    }
                });
            }
        });
    },
    filterCitySupportShop: function() {
        var t = this, e = i.default.filter(t.data.allCityList, {
            supportShop: !0
        });
        t.setData({
            supportShopCityList: e
        });
    },
    filterCitySupportondoor: function() {
        var t = this, e = i.default.filter(t.data.allCityList, {
            supportOnDoor: !0
        });
        t.setData({
            supportShopCityList: e
        });
    },
    fileterCityLetterIndex: function() {
        var t = this, e = 0, a = {}, r = "";
        i.default.forEach(t.data.supportShopCityList, function(i) {
            e++, r = n.Pinyin("Camel", i.name[0]), "重" == i.name[0] && (r = "C"), "长" == i.name[0] && (r = "C"), 
            a.name != r && (t.data.supportCityIndexItem = {
                id: e,
                name: r
            }, a = t.data.supportCityIndexItem, t.data.supportCityIndexList.push(t.data.supportCityIndexItem));
        }), t.setData({
            supportCityIndexList: t.data.supportCityIndexList
        });
    },
    filterShortAllCityList: function() {
        if (!String.prototype.localeCompare) return null;
        var t = this, e = [], a = t.data.supportShopCityList;
        i.default.forEach(t.data.supportShopCityList, function(t) {
            var a = n.Pinyin("Camel", t.name[0]);
            "重" == t.name[0] && (a = "C"), "长" == t.name[0] && (a = "C"), e.push(a);
        });
        var r = e.length, o = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""), s = (o.length, []);
        i.default.forEach(o, function(t, i) {
            for (var n = 0; n < r; n++) t > e[n] && (o[i - 1] ? o[i - 1] : o[i]) <= e[n] && s.push(a[n]);
        }), t.setData({
            supportShopCityList: s
        });
    },
    filterIndexOfLetter: function(t) {
        var e = 0, a = this.data.supportCityIndexList;
        return i.default.forEach(a, function(a, i) {
            a.name == t && (e = i);
        }), e;
    },
    fileterMoveIndexOfLetter: function(t, e) {
        var a = this, i = t + e;
        return i < a.data.supportCityIndexList.length && i >= 0 ? a.data.supportCityIndexList[t + e].name : "err";
    },
    handleOnSearchbarIndexTouchStar: function(t) {
        var e = this, a = t.target.dataset.item;
        a.id, e.filterIndexOfLetter(a.name);
        e.setData({
            index_letter: a.name,
            toView: t.target.id + "_view",
            indexY: t.touches[0].pageY,
            isShow_IndexLetter: !0
        });
    },
    handleOnSearchbarIndexTouchEnd: function(t) {
        var e = this;
        t.target.dataset;
        e.setData({
            isShow_IndexLetter: !1
        });
    },
    handleOnSearchbarIndexTouchMove: function(t) {
        var a = this, i = t.target.dataset.item, r = a.filterIndexOfLetter(i.name), n = t.touches[0].pageY - a.data.indexY, o = a.fileterMoveIndexOfLetter(Math.round(n / 20), r);
        if ("err" != o && o != a.data.letter_before) {
            var s;
            a.setData((s = {
                index_letter: i.name,
                toView: o + "_view"
            }, e(s, "index_letter", o), e(s, "letter_before", o), s));
        }
    },
    handleOnSelectCity: function(t) {
        var e = this, a = this.data.location, i = a.longitude, o = a.latitude, s = t.target.dataset.city;
        n.saveCache("status.didPageChanged", !0), n.saveCache("choose_city", s);
        var u = getCurrentPages();
        if (u.length > 1) {
            var d = u[u.length - 2], c = !0;
            e.data.selectedCity == s.id.toString() && (c = !c), d.isCurCity(s), d.getSupportRecycleType(s.id), 
            "B" == r.ABTEST.get("recommendType") && d.getRecommendType(s.id, i, o), d.setData({
                "city.data": s,
                "city.props.hasShop": s.supportShop,
                "city.props.isByGPSLocated": !1,
                "city.props.hasChanged": c
            }), d.fetchCurrentCityShopsByGivenCity(s).then(function(t) {
                var e = d.getNearestShop(t.data, i, o);
                e >= 0 && d.setData({
                    "shop.data": t.data[e]
                }), n.removeCache("userSelectOndoorMapInfo"), n.removeCache("ondoorMapInfo"), n.removeCache("metroInfo"), 
                wx.navigateBack();
            });
        }
    }
});