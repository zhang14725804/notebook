module.exports = {
    gpsLocation: function() {
        var t = this;
        return new Promise(function(i, e) {
            wx.getLocation({
                type: "wgs84",
                success: function(e) {
                    return t.request(t.pathData.USER_LOCATION, {
                        latitude: e.latitude,
                        longitude: e.longitude,
                        thirdKey: t.getThirdKey()
                    }).then(function(n) {
                        var a = JSON.parse(n.data);
                        t.storage.setSync(t.constData.STORAGE_GPS_LOCATION_KEY, Object.assign({}, e, a), 864e5), 
                        i(JSON.parse(n.data));
                    });
                },
                fail: function(t) {
                    i({});
                }
            });
        });
    },
    citySwitch: function(t, i) {
        var e = this.storage.getSync(this.constData.STORAGE_CITY_KEY);
        e && i && e.cityId && i.cityId && e.cityId != i.cityId && this.confirm("提示", "当前定位城市：" + i.cityName + "，是否切换?", t)();
    }
};