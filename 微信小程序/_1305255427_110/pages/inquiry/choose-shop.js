function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

var e = t(require("../../utils/api.js")), i = t(require("../../libs/lodash.core.min.js")), n = getApp();

Page({
    data: {
        piwikSource: "",
        allRegionList: [],
        supportShopRegionList: [],
        allShopList: [],
        regionShopMappingList: [],
        currentRegionIndex: 0,
        status: {
            didInited: !1
        },
        tracking: {
            scene: "",
            from: ""
        }
    },
    onLoad: function(t) {
        var e = "";
        t && t.from && (e = t.from), this.setData({
            "tracking.scene": getApp().globalData.scene,
            "tracking.from": e
        }), this.initRegionNav(t.currentCity);
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    initRegionNav: function(t) {
        var e = this;
        e.fetchShopList(t).then(function(i) {
            return e.setData({
                allShopList: i.data
            }), e.fetchRegionList(t);
        }).then(function(t) {
            e.setData({
                allRegionList: t.data
            }), 0 == t.data.length || e.mapRegionAndShop(e.data.allShopList);
        }).then(function(t) {
            e.setData({
                "status.didInited": !0
            });
        }).catch(function(t) {});
    },
    fetchRegionList: function(t) {
        return n.request(e.default.fetchChildRegions, {
            cityId: +t
        });
    },
    fetchShopList: function(t) {
        return n.request(e.default.fetchShops, {
            cityId: +t
        });
    },
    setCurrentCity: function(t) {
        var e = this, n = i.default.find(e.data.supportShopCityList, {
            id: +t
        });
        e.setData({
            currentCity: n
        });
    },
    mapRegionAndShop: function(t) {
        var e = this, n = [], a = [];
        i.default.forEach(e.data.allRegionList, function(o) {
            var s = i.default.filter(t, {
                regionId: +o.id
            });
            s.length > 0 && (n.push(s), a.push(o)), e.setData({
                regionShopMappingList: n,
                supportShopRegionList: a
            });
        });
    },
    filterRegionSupportShop: function() {
        var t = this;
        i.default.filter(t.data.allCityList, {
            supportShop: !0
        });
        t.setData({
            supportShopCityList: _supportShopCityList
        });
    },
    handleOnTapRegionItem: function(t) {
        var e = this, i = t.target.dataset.index;
        e.setData({
            currentRegionIndex: i
        });
    },
    handleOnSelectShop: function(t) {
        var e = t.target.dataset.shop;
        n.saveCache("status.didPageChanged", !0);
        var i = getCurrentPages();
        i.length > 1 && i[i.length - 2].setData({
            "shop.data": e
        }), wx.navigateBack();
    }
});