var t = getApp();

module.exports = {
    getCityList: function() {
        var i = this;
        t.request(t.pathData.CITY_PATH).then(function(t) {
            if (!t.error) {
                var a = t.data ? JSON.parse(t.data) : [];
                i.setDataLazy({
                    cityList: a
                });
            }
        });
    },
    $e_cityItem: function(t) {
        var i = t.currentTarget.dataset;
        -1 != i.cityId && this._citySwitchSucc(i);
    },
    getCityListByIndex: function() {
        return console.log("this.pageIndex" + this.pageIndex), this.cityList.slice(0, this.pageIndex * this.pageNum);
    },
    _citySwitchSucc: function(i) {
        t.globalData.cityId = i.cityId, t.globalData.dispCityId = i.dispCityId, this.setDataLazy({
            currDispCityId: i.dispCityId,
            citySouList: []
        }), this.setCityStorage(i), t.goto("/pages/index/index", !1);
    },
    getCitySearchList: function(i) {
        var a = this;
        t.request(t.pathData.CITY_SUGGEST, {
            key: i
        }).then(function(t) {
            t.error || a.setDataLazy({
                citySouList: a.dataAssembly(t.data && t.data.w || [])
            });
        });
    },
    dataAssembly: function(t) {
        for (var i = [], a = this.data.cityList, e = 0; e < t.length; e++) for (var s = 0; s < a.length; s++) if (t[e].k === a[s].cityName) {
            i.push(a[s]);
            break;
        }
        return i;
    },
    setCityStorage: function(i) {
        t.storage.setSync(t.constData.STORAGE_CITY_KEY, {
            cityName: i.cityName || i.name,
            cityId: i.cityId,
            dispCityId: i.dispCityId
        });
    }
};